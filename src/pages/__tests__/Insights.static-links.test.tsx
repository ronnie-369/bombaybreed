/**
 * Behavioural test: middle-click and Cmd/Ctrl+click on Insights cards that
 * point at a static HTML file MUST open the real static asset, not be
 * intercepted by React Router.
 *
 * Why this matters: React Router's <Link> attaches a click handler that
 * calls history.push() and preventDefault() on plain clicks. It correctly
 * lets the browser handle modifier-key clicks, but if we accidentally use
 * <Link to="/special-features/foo.html"> the URL still goes through the
 * SPA shell when opened same-tab, which 404s. The fix - and the contract
 * we test here - is that static-asset cards render as plain <a target="_blank">
 * tags. Plain anchors are 100% browser-handled for every click variant:
 *
 *   - left-click            → browser GET /special-features/foo.html (new tab)
 *   - middle-click          → browser GET /special-features/foo.html (new tab)
 *   - cmd+click / ctrl+click → browser GET /special-features/foo.html (new tab)
 *   - shift+click           → browser GET /special-features/foo.html (new window)
 *
 * None of those go through React Router, so the hosting layer serves the
 * real static file in every case.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Insights from '@/pages/Insights';

// ───────────────────────────────────────────────
// Mocks: keep the test scoped to link behaviour.
// ───────────────────────────────────────────────
vi.mock('@/components/Header',     () => ({ default: () => <header data-testid="mock-header" /> }));
vi.mock('@/components/Footer',     () => ({ default: () => <footer data-testid="mock-footer" /> }));
vi.mock('@/components/PageHead',   () => ({ default: () => null }));
vi.mock('@/components/ui/ScrollReveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Track navigations triggered by react-router (i.e. by <Link>).
const navigateSpy = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateSpy,
  };
});

// Static-asset paths we expect to see rendered as plain <a target="_blank">.
// We intentionally pick paths that appear on page 1 of the listing AND in the
// "Flagship Research" grid - the test must not depend on user paginating.
// The contract being tested is identical for every static asset, so two
// representative paths are sufficient.
const STATIC_ASSET_PATHS = [
  '/special-features/tcd-hp-investor-synthesis.html',
  '/special-features/india-ndc3.html',
];

function renderInsights() {
  return render(
    <MemoryRouter initialEntries={['/insights']}>
      <Insights />
    </MemoryRouter>,
  );
}

describe('Insights → static-HTML cards: open the real static file on every click variant', () => {
  beforeEach(() => {
    navigateSpy.mockClear();
  });

  it.each(STATIC_ASSET_PATHS)(
    'renders %s as a plain <a target="_blank"> (not a React Router Link)',
    (path) => {
      renderInsights();
      const anchors = screen
        .getAllByRole('link')
        .filter((el) => (el as HTMLAnchorElement).getAttribute('href') === path);

      expect(anchors.length).toBeGreaterThan(0);

      for (const a of anchors) {
        expect(a.tagName).toBe('A');
        expect(a).toHaveAttribute('href', path);
        expect(a).toHaveAttribute('target', '_blank');
        const rel = a.getAttribute('rel') ?? '';
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
    },
  );

  it.each(STATIC_ASSET_PATHS)(
    'middle-click on %s does not invoke React Router navigation',
    (path) => {
      renderInsights();
      const a = screen
        .getAllByRole('link')
        .find((el) => (el as HTMLAnchorElement).getAttribute('href') === path)!;

      // button: 1 == middle mouse button
      const evt = fireEvent.mouseDown(a, { button: 1 });
      fireEvent.mouseUp(a, { button: 1 });
      fireEvent.click(a, { button: 1 });

      expect(evt).toBe(true); // event dispatched
      expect(navigateSpy).not.toHaveBeenCalled();
    },
  );

  it.each(STATIC_ASSET_PATHS)(
    'Cmd/Ctrl+click on %s does not invoke React Router navigation and is not preventDefault-ed',
    (path) => {
      renderInsights();
      const a = screen
        .getAllByRole('link')
        .find((el) => (el as HTMLAnchorElement).getAttribute('href') === path)!;

      // metaKey covers Cmd (macOS); ctrlKey covers Ctrl (Win/Linux). Both behave
      // identically for our purposes - "open in new tab".
      for (const modifiers of [{ metaKey: true }, { ctrlKey: true }]) {
        navigateSpy.mockClear();
        const wasNotCancelled = fireEvent.click(a, { button: 0, ...modifiers });
        // fireEvent returns false when an event handler called preventDefault().
        expect(wasNotCancelled).toBe(true);
        expect(navigateSpy).not.toHaveBeenCalled();
      }
    },
  );

  it('plain left-click on a static-HTML card also bypasses React Router (browser handles target=_blank)', () => {
    renderInsights();
    const a = screen
      .getAllByRole('link')
      .find(
        (el) =>
          (el as HTMLAnchorElement).getAttribute('href') ===
          '/special-features/tcd-hp-investor-synthesis.html',
      )!;

    fireEvent.click(a, { button: 0 });
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});

describe('Insights → internal SPA cards (control case): React Router still owns navigation', () => {
  beforeEach(() => {
    navigateSpy.mockClear();
  });

  it('renders an internal /insights/<slug> card as a React Router Link (anchor without target=_blank)', () => {
    renderInsights();

    // Pick a known internal SPA card from src/pages/Insights.tsx.
    const internalPath = '/insights/microsoft-cdr-market-pause';
    const a = screen
      .getAllByRole('link')
      .find((el) => (el as HTMLAnchorElement).getAttribute('href') === internalPath);

    expect(a).toBeDefined();
    // Internal links must NOT carry target="_blank" - they are SPA navigations.
    expect(a).not.toHaveAttribute('target', '_blank');
  });
});
