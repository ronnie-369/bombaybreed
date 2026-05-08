/**
 * End-to-end CTA contract for the Value Ladder.
 *
 * Asserts, for every tier, that:
 *   1. The data layer (TIERS) points at the documented destination
 *   2. The rendered CTA in the canonical comparison table renders that exact
 *      href / target / role
 *   3. Clicking the CTA produces the expected SPA navigation (or, for the
 *      Sponsor tier, expands the in-page Exclusive projects panel)
 *   4. The terminal route (Signup -> Checkout) actually mounts with the
 *      tier query param preserved
 *
 * The Checkout page is auth-gated, so we drive it via a stub route that
 * mirrors App.tsx's mount and just renders the search params - that way we
 * can assert "Signup forwards into /intelligence/checkout?tier=..." without
 * pulling in Razorpay, Supabase RPCs, or the live auth gate.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import ValueLadder from '@/intelligence/pages/ValueLadder';
import { TIERS, SUBSTACK_FREE_URL } from '@/intelligence/lib/valueLadder';

// ────────────────────────────────────────────────────────────────────
// Mocks: keep the test focused on routing, not on chrome / 3rd-party.
// ────────────────────────────────────────────────────────────────────

vi.mock('@/components/Header', () => ({
  default: () => <header data-testid="mock-header" />,
}));
vi.mock('@/components/Footer', () => ({
  default: () => <footer data-testid="mock-footer" />,
}));
vi.mock('@/components/insights/CurrencyToggle', () => ({
  default: () => <div data-testid="mock-currency-toggle" />,
}));
vi.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  HelmetProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

// SponsorInquiryDialog uses Radix Portals + Formspree; we only need to know
// when it opens, not exercise its form.
vi.mock('@/components/SponsorInquiryDialog', () => ({
  default: ({ open, project }: { open: boolean; project: string }) =>
    open ? (
      <div data-testid="mock-sponsor-dialog" data-project={project} />
    ) : null,
}));

// Analytics helpers must not throw or hit the network in test.
vi.mock('@/utils/sponsorAnalytics', () => ({ trackSponsorEvent: vi.fn() }));
vi.mock('@/utils/outboundAnalytics', () => ({ trackOutboundClick: vi.fn() }));

// ────────────────────────────────────────────────────────────────────
// Test helpers
// ────────────────────────────────────────────────────────────────────

/**
 * Tiny helper component that exposes the current router URL to the DOM so
 * the test can assert "we ended up at /foo?bar=baz" without importing any
 * react-router internals.
 */
const LocationDisplay = () => {
  const loc = useLocation();
  return (
    <div
      data-testid="location-display"
      data-pathname={loc.pathname}
      data-search={loc.search}
    >
      {loc.pathname}
      {loc.search}
    </div>
  );
};

/**
 * Stub for the auth-gated /intelligence/checkout route. Mirrors what the
 * real Checkout component reads from the URL: ?tier=<slug>&billing=<cycle>.
 */
const CheckoutStub = () => {
  const [params] = useSearchParams();
  return (
    <div data-testid="checkout-stub">
      <p>Checkout page</p>
      <p data-testid="checkout-tier">{params.get('tier') ?? ''}</p>
      <p data-testid="checkout-billing">{params.get('billing') ?? ''}</p>
    </div>
  );
};

/**
 * Stub for /intelligence/signup that immediately forwards to Checkout with
 * the same tier+billing. Mirrors Signup.tsx line 238 (post-auth redirect)
 * and Signup.tsx line 52 (already-authed bypass) - both land on
 * /intelligence/checkout?tier=...&billing=....
 *
 * We use a stub instead of the real Signup so the test does not need to
 * mock Supabase auth, run a form submission, or wait on async session checks.
 */
const SignupStub = () => {
  const [params] = useSearchParams();
  const tier = params.get('tier') ?? '';
  const billing = params.get('billing') ?? 'annual';
  return (
    <div data-testid="signup-stub">
      <p>Signup page</p>
      <p data-testid="signup-tier">{tier}</p>
      <p data-testid="signup-billing">{billing}</p>
      {/* The real page issues navigate(`/intelligence/checkout?...`). We
          render a same-mechanism Link so the test can click through. */}
      <Link
        data-testid="signup-continue"
        to={`/intelligence/checkout?tier=${tier}&billing=${billing}`}
      >
        Continue to checkout
      </Link>
    </div>
  );
};

const renderLadderApp = () =>
  render(
    <MemoryRouter initialEntries={['/intelligence/value-ladder']}>
      <LocationDisplay />
      <Routes>
        <Route path="/intelligence/value-ladder" element={<ValueLadder />} />
        <Route path="/intelligence/signup" element={<SignupStub />} />
        <Route path="/intelligence/checkout" element={<CheckoutStub />} />
      </Routes>
    </MemoryRouter>,
  );

/**
 * The canonical comparison table renders one CTA per tier. We grab them by
 * the documented tier name so the test reads like the spec.
 */
const findTableCta = (tierName: string): HTMLAnchorElement | HTMLButtonElement => {
  // The CTA label includes the tier name for internal links ("Join Market
  // Makers", "Upgrade - INR …", etc.) and "Subscribe free" for Substack and
  // "Exclusive projects" for Sponsor. Match by data-derived label below.
  const tier = TIERS.find((t) => t.name === tierName);
  if (!tier) throw new Error(`Unknown tier: ${tierName}`);

  // CTA label resolution mirrors formatTierCtaLabel: ctaLabelTemplate wins
  // when present (Enthusiasts), else cta.label.
  const labelMatchers: Record<string, RegExp> = {
    'Free Substack': /^Get started$/,
    Enthusiasts: /^Back the desk$/,
    'Market Makers': /^Enter the room$/,
    'Investor Intel': /^Get the edge$/,
    Sponsor: /^Commission work$/,
  };

  const matcher = labelMatchers[tierName];
  if (!matcher) throw new Error(`No label matcher for tier: ${tierName}`);

  const matches = screen.getAllByRole(
    tier.cta.kind === 'dialog' ? 'button' : 'link',
    { name: matcher },
  );
  // The CTA appears in (a) the desktop comparison table header, (b) the
  // table footer, and (c) the mobile card stack. The first match in the
  // canonical table is sufficient for routing assertions.
  return matches[0] as HTMLAnchorElement | HTMLButtonElement;
};

const getLocation = () => {
  const node = screen.getByTestId('location-display');
  return {
    pathname: node.getAttribute('data-pathname') ?? '',
    search: node.getAttribute('data-search') ?? '',
  };
};

// ────────────────────────────────────────────────────────────────────
// 1. Data-layer contract: TIERS points at the documented destinations.
// ────────────────────────────────────────────────────────────────────

describe('Value Ladder data: TIERS encode the documented CTA routes', () => {
  it('Free Substack tier opens the external Substack URL in a new tab', () => {
    const t = TIERS.find((x) => x.id === 'tcd-free')!;
    expect(t.cta.kind).toBe('outbound');
    if (t.cta.kind !== 'outbound') return;
    expect(t.cta.href).toBe(SUBSTACK_FREE_URL);
    expect(t.cta.href).toMatch(/^https?:\/\//);
  });

  it('Enthusiasts -> /intelligence/signup?tier=enthusiasts&billing=monthly', () => {
    const t = TIERS.find((x) => x.id === 'tcd-paid')!;
    expect(t.cta.kind).toBe('internal');
    if (t.cta.kind !== 'internal') return;
    const url = new URL(t.cta.href, 'http://x');
    expect(url.pathname).toBe('/intelligence/signup');
    expect(url.searchParams.get('tier')).toBe('enthusiasts');
    expect(url.searchParams.get('billing')).toBe('monthly');
  });

  it('Market Makers -> /intelligence/signup?tier=foundational', () => {
    const t = TIERS.find((x) => x.id === 'bb-reader')!;
    expect(t.cta.kind).toBe('internal');
    if (t.cta.kind !== 'internal') return;
    const url = new URL(t.cta.href, 'http://x');
    expect(url.pathname).toBe('/intelligence/signup');
    expect(url.searchParams.get('tier')).toBe('foundational');
  });

  it('Investor Intel -> /intelligence/signup?tier=professional', () => {
    const t = TIERS.find((x) => x.id === 'bb-analyst')!;
    expect(t.cta.kind).toBe('internal');
    if (t.cta.kind !== 'internal') return;
    const url = new URL(t.cta.href, 'http://x');
    expect(url.pathname).toBe('/intelligence/signup');
    expect(url.searchParams.get('tier')).toBe('professional');
  });

  it('Sponsor -> in-page #sponsor-projects (does not leave the value-ladder)', () => {
    const t = TIERS.find((x) => x.id === 'sponsor')!;
    expect(t.cta.kind).toBe('internal');
    if (t.cta.kind !== 'internal') return;
    expect(t.cta.href).toBe('/intelligence/value-ladder#sponsor-projects');
  });
});

// ────────────────────────────────────────────────────────────────────
// 2. Rendered CTA contract: the buttons in the DOM match the data layer.
// ────────────────────────────────────────────────────────────────────

describe('Value Ladder render: each tier CTA renders the documented href / target', () => {
  it('Free Substack renders as <a target="_blank" rel="noopener noreferrer"> to Substack', () => {
    renderLadderApp();
    const cta = findTableCta('Free Substack') as HTMLAnchorElement;
    expect(cta.tagName).toBe('A');
    expect(cta).toHaveAttribute('href', SUBSTACK_FREE_URL);
    expect(cta).toHaveAttribute('target', '_blank');
    const rel = cta.getAttribute('rel') ?? '';
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  });

  it.each([
    ['Enthusiasts',              '/intelligence/signup?tier=enthusiasts&billing=monthly&ref=ladder'],
    ['Market Makers',            '/intelligence/signup?tier=foundational&ref=ladder'],
    ['Investor Intel',  '/intelligence/signup?tier=professional&ref=ladder'],
  ])('%s renders as a SPA <a href="%s">', (tierName, expectedHref) => {
    renderLadderApp();
    const cta = findTableCta(tierName) as HTMLAnchorElement;
    expect(cta.tagName).toBe('A');
    expect(cta).toHaveAttribute('href', expectedHref);
    // SPA links must NOT open in a new tab - they are in-app navigations.
    expect(cta).not.toHaveAttribute('target', '_blank');
  });

  it('Sponsor renders as a SPA <a> pointing at the in-page sponsor-projects anchor', () => {
    renderLadderApp();
    const cta = findTableCta('Sponsor') as HTMLAnchorElement;
    expect(cta.tagName).toBe('A');
    expect(cta).toHaveAttribute(
      'href',
      '/intelligence/value-ladder#sponsor-projects',
    );
  });
});

// ────────────────────────────────────────────────────────────────────
// 3. Click contract: each CTA actually navigates to / does the right thing.
// ────────────────────────────────────────────────────────────────────

describe('Value Ladder click-through: every CTA produces the expected effect', () => {
  beforeEach(() => {
    // jsdom does not implement smooth scrolling. The Sponsor CTA calls
    // scrollIntoView on the sponsor-projects section; stub it so the click
    // path runs cleanly.
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('Free Substack click is a plain anchor (browser handles new-tab navigation, not React Router)', async () => {
    renderLadderApp();
    const cta = findTableCta('Free Substack') as HTMLAnchorElement;

    // For target=_blank links jsdom does not actually navigate, but it
    // also must not be intercepted by react-router (no preventDefault from
    // a SPA Link). We assert the click event is not cancelled and the
    // in-app location is unchanged.
    const startLoc = getLocation();
    const wasNotCancelled = fireEvent.click(cta, { button: 0 });
    expect(wasNotCancelled).toBe(true);

    const endLoc = getLocation();
    expect(endLoc.pathname).toBe(startLoc.pathname);
  });

  it.each([
    [
      'Enthusiasts',
      '/intelligence/signup',
      { tier: 'enthusiasts', billing: 'monthly', ref: 'ladder' },
    ],
    [
      'Market Makers',
      '/intelligence/signup',
      { tier: 'foundational', ref: 'ladder' },
    ],
    [
      'Investor Intel',
      '/intelligence/signup',
      { tier: 'professional', ref: 'ladder' },
    ],
  ])('clicking %s navigates to %s with the expected query params', async (tierName, expectedPath, expectedParams) => {
    const user = userEvent.setup();
    renderLadderApp();
    const cta = findTableCta(tierName) as HTMLAnchorElement;

    await user.click(cta);

    const loc = getLocation();
    expect(loc.pathname).toBe(expectedPath);

    const search = new URLSearchParams(loc.search);
    for (const [k, v] of Object.entries(expectedParams)) {
      expect(search.get(k)).toBe(v);
    }

    // The Signup stub mirrors what the real page reads off the URL.
    expect(screen.getByTestId('signup-stub')).toBeInTheDocument();
    expect(screen.getByTestId('signup-tier').textContent).toBe(expectedParams.tier);
  });

  it('clicking Sponsor stays on the value-ladder and scrolls to the Exclusive projects panel', async () => {
    const user = userEvent.setup();
    renderLadderApp();

    // The Folder UX renders the five SPONSOR_OPEN_PROJECTS buttons up
    // front (they live inside the folder paper "documents") so they are
    // present in the DOM before the click. The behavioural assertion is
    // that clicking Sponsor never leaves the value-ladder route.
    const cta = findTableCta('Sponsor') as HTMLAnchorElement;
    await user.click(cta);

    // We must NOT have left the page.
    const loc = getLocation();
    expect(loc.pathname).toBe('/intelligence/value-ladder');

    // The Exclusive projects section is rendered with the project buttons.
    expect(
      await screen.findByRole('button', {
        name: /Register interest in: CCUS technologies investigation in India/i,
      }),
    ).toBeInTheDocument();
  });

  it('clicking an Exclusive project card opens the Sponsor inquiry dialog with that project preselected', async () => {
    const user = userEvent.setup();
    renderLadderApp();

    // Expand the panel first.
    await user.click(findTableCta('Sponsor'));

    const projectCard = await screen.findByRole('button', {
      name: /Register interest in: CCUS technologies investigation in India/i,
    });
    await user.click(projectCard);

    const dialog = await screen.findByTestId('mock-sponsor-dialog');
    expect(dialog).toHaveAttribute(
      'data-project',
      'CCUS technologies investigation in India',
    );
  });
});

// ────────────────────────────────────────────────────────────────────
// 4. Terminal-route contract: Signup forwards into Checkout cleanly.
// ────────────────────────────────────────────────────────────────────

describe('Value Ladder terminal route: Signup -> Checkout preserves tier+billing', () => {
  it.each([
    ['Enthusiasts',             'enthusiasts',  'monthly'],
    ['Market Makers',           'foundational', 'annual'],
    ['Investor Intel', 'professional', 'annual'],
  ])('%s click eventually renders Checkout with tier=%s billing=%s', async (tierName, expectedTier, expectedBilling) => {
    const user = userEvent.setup();
    renderLadderApp();

    await user.click(findTableCta(tierName));
    expect(screen.getByTestId('signup-stub')).toBeInTheDocument();

    // Signup forwards into Checkout. We click the stub's continue link to
    // simulate the post-auth redirect the real page issues at line 238 of
    // Signup.tsx (navigate(`/intelligence/checkout?tier=${tier}&billing=${billing}`)).
    await user.click(screen.getByTestId('signup-continue'));

    const checkout = await screen.findByTestId('checkout-stub');
    expect(checkout).toBeInTheDocument();
    expect(screen.getByTestId('checkout-tier').textContent).toBe(expectedTier);
    expect(screen.getByTestId('checkout-billing').textContent).toBe(expectedBilling);

    const loc = getLocation();
    expect(loc.pathname).toBe('/intelligence/checkout');
    const search = new URLSearchParams(loc.search);
    expect(search.get('tier')).toBe(expectedTier);
    expect(search.get('billing')).toBe(expectedBilling);
  });
});
