import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Document, Earth, ChartLineSmooth } from '@carbon/icons-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import SponsorInquiryDialog from '@/components/SponsorInquiryDialog';
import { trackSponsorEvent } from '@/utils/sponsorAnalytics';
import { trackOutboundClick } from '@/utils/outboundAnalytics';
import { useCurrency } from '@/intelligence/lib/useCurrency';
import CurrencyToggle from '@/components/insights/CurrencyToggle';
import {
  getVariant,
  logAssignmentOnce,
  logClick,
  type Variant,
} from '@/lib/abTest';
import {
  TIERS,
  JOBS,
  TIER_BY_ID,
  SPONSOR_OPEN_PROJECTS,
  type SponsorOpenProject,
  formatTierCtaLabel,
  type LadderTier,
} from '@/intelligence/lib/valueLadder';
import TierPriceText from '@/components/insights/TierPriceText';

/**
 * A/B test config for the two tier CTAs. Control = 'A' = current copy.
 * Challenger = 'B' = new copy. Variants are sticky per visitor (localStorage)
 * and 50/50 randomised. See src/lib/abTest.ts for the wiring.
 */
const CTA_COPY: Record<
  'industry_reader' | 'analyst_lens',
  Record<Variant, string>
> = {
  industry_reader: {
    A: 'Join Market Makers',
    B: 'Read the market with us',
  },
  analyst_lens: {
    A: 'Join Investment Intelligence',
    B: 'Exclusive access awaits',
  },
};

/**
 * Premium Access Lounge — the conversion stack on top of /insights.
 *
 * Stacked above the existing editorial hub. Five sections, each with its own
 * scroll-target id so the existing sticky in-page nav can deep-link into them:
 *   #lounge          — header + dual CTA (past reports / sign up)
 *   #what-you-get    — 4-row checklist
 *   #industry        — 3 placeholder testimonial cards
 *   #readers         — investor / company logo grids (placeholder)
 *   #sponsor         — INR 6L/yr corporate sponsorship offer
 *
 * Quotes block uses placeholder strings — replace the QUOTES array below
 * with real copy as it lands. Logos read from the LOGOS manifest, drop files
 * into public/logos/intelligence-readers/ to populate.
 */

const QUOTES: { quote: string; name: string; title: string; org: string; orgHref?: string }[] = [
  {
    quote: 'Brilliantly insightful.',
    name: 'Chris Sherwood',
    title: 'Chairman',
    org: 'Negative Emissions Platform',
    orgHref: 'https://www.negative-emissions.org/',
  },
  {
    quote: 'Wonderful writing. Deep analysis. Highly insightful.',
    name: 'Mitchell Beer',
    title: 'Founder',
    org: 'The Energy Mix',
    orgHref: 'https://www.theenergymix.com',
  },
  {
    quote: 'Excellent reporting from India.',
    name: 'Christian Haberli',
    title: 'Climate lawyer',
    org: 'EU',
  },
];

/**
 * Readership groups, sourced verbatim from The Climate Desk Media Deck
 * (slides 5 and 11) and the 2026 One Pager. The bloc structure mirrors
 * the partnership material so any reader cross-checking sees the same
 * categorisation.
 */
const READERSHIP: { group: string; names: { label: string; href?: string }[] }[] = [
  {
    group: 'Multilateral',
    names: [
      { label: 'United Nations', href: 'https://www.un.org' },
      { label: 'FAO', href: 'https://www.fao.org' },
      { label: 'IFC / World Bank', href: 'https://www.ifc.org' },
      { label: 'WHO', href: 'https://www.who.int' },
      { label: 'Asian Development Bank', href: 'https://www.adb.org' },
      { label: 'UNDP', href: 'https://www.undp.org' },
      { label: 'AKDN', href: 'https://the.akdn' },
    ],
  },
  {
    group: 'Global Corporates',
    names: [
      { label: 'ArcelorMittal', href: 'https://corporate.arcelormittal.com' },
      { label: 'Oracle', href: 'https://www.oracle.com' },
      { label: 'Unilever', href: 'https://www.unilever.com' },
      { label: 'H&M', href: 'https://hmgroup.com' },
      { label: 'Infosys', href: 'https://www.infosys.com' },
      { label: 'Siemens Energy', href: 'https://www.siemens-energy.com' },
      { label: 'Volkswagen', href: 'https://www.volkswagen-group.com' },
      { label: 'BASF', href: 'https://www.basf.com' },
      { label: 'ABB', href: 'https://global.abb' },
      { label: 'GE', href: 'https://www.ge.com' },
      { label: 'Meta', href: 'https://about.meta.com' },
      { label: 'S&P Global', href: 'https://www.spglobal.com' },
    ],
  },
  {
    group: 'Indian Industry',
    names: [
      { label: 'JSW Group', href: 'https://www.jsw.in' },
      { label: 'Tata Motors', href: 'https://www.tatamotors.com' },
      { label: 'Mahindra', href: 'https://www.mahindra.com' },
      { label: 'Adani', href: 'https://www.adani.com' },
      { label: 'Axis Bank', href: 'https://www.axisbank.com' },
      { label: 'IREDA', href: 'https://www.ireda.in' },
      { label: 'Dr Reddy\u2019s', href: 'https://www.drreddys.com' },
      { label: 'Welspun', href: 'https://www.welspun.com' },
      { label: 'Apollo Hospitals', href: 'https://www.apollohospitals.com' },
    ],
  },
  {
    group: 'Government',
    names: [
      { label: 'Government of India (central ministries)', href: 'https://www.india.gov.in' },
      { label: 'Japan Ministry of the Environment', href: 'https://www.env.go.jp/en/' },
    ],
  },
  {
    group: 'Media & Intelligence',
    names: [
      { label: 'Argus Media', href: 'https://www.argusmedia.com' },
      { label: 'BBC', href: 'https://www.bbc.com' },
      { label: 'Bloomberg', href: 'https://www.bloomberg.com' },
      { label: 'Singapore Press Holdings', href: 'https://sph.com.sg' },
      { label: 'France Televisions', href: 'https://www.francetelevisions.fr' },
    ],
  },
  {
    group: 'Climate & ESG',
    names: [
      { label: 'SBTi', href: 'https://sciencebasedtargets.org' },
      { label: 'Ellen MacArthur Foundation', href: 'https://www.ellenmacarthurfoundation.org' },
      { label: 'ClimateImpactX', href: 'https://www.climateimpactx.com' },
      { label: '3Degrees', href: 'https://3degreesinc.com' },
      { label: 'ReNew Energy', href: 'https://www.renew.com' },
    ],
  },
  {
    group: 'Investors & Climate Finance',
    names: [
      { label: 'Development Finance Institutions' },
      { label: 'Climate & Carbon Investment funds' },
      { label: 'Venture Capital' },
      { label: 'Wealth Management & Family Offices' },
      { label: 'Financial Advisory & Services' },
    ],
  },
];

/**
 * Section 03 - Commission a bespoke study or deep-dive. Team BB does the
 * work; the sponsoring organisation gets its name attached to the
 * published output. Deliverables span video assets, due-diligence studies,
 * MRV / dMRV reviews, and feasibility / viability work. Pricing is
 * indicative: INR 6L to 45L depending on scope and intensity.
 */
const SPONSOR_DELIVERABLES: string[] = [
  'Due diligence on projects, developers and portfolios - including Article 6 and JCM-bound pipelines',
  'MRV and dMRV reviews, with site-level scoping, ground-truthing and methodology audit',
  'Sector reads on CBAM exposure, EU-ETS pass-through, and FTA-linked carbon clauses',
  'Feasibility and viability work on energy transition assets - generation, grid, storage, data-centre load',
  'Editorial write-ups and video assets, usable internally and for external publication',
];

const SPONSOR_HOW_IT_WORKS: string[] = [
  'You bring the question or thesis - we scope the work in conversation',
  'Team BB executes the research, fieldwork and writing end to end',
  'Your business name is attached to the report as the sponsor',
  'Editorial control, methodology and conclusions remain entirely with Team BB',
];

type SponsorProject = SponsorOpenProject;

const PremiumAccessLounge: React.FC = () => {
  const sponsorRef = useRef<HTMLElement | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState<SponsorProject | { title: string } | null>(null);
  const [currency] = useCurrency();
  // Canonical Value Ladder pricing (USD 10 / USD 20 per month, FX 85 INR/USD).
  // Single source of truth lives in src/intelligence/lib/valueLadder.ts and
  // the create-razorpay-order edge function. Keep numbers in lock-step.
  const tier1Price = currency === 'USD' ? 'USD 10' : 'INR 850';
  const tier1Secondary = currency === 'USD' ? 'INR 850' : 'USD 10';
  const tier2Price = currency === 'USD' ? 'USD 20' : 'INR 1,700';
  const tier2Secondary = currency === 'USD' ? 'INR 1,700' : 'USD 20';

  const openInquiry = (project: SponsorProject) => {
    setInquiryProject(project);
    setInquiryOpen(true);
    trackSponsorEvent('sponsor_open_project_click', {
      location: 'premium_access_lounge',
      project: project.title,
    });
  };

  // Deep-link support: open the inquiry dialog when the URL contains
  // ?project=<slug-or-text>. Slug match (case/punct insensitive) is preferred
  // so links stay short - free text falls through as the project name itself.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('project');
    if (!raw) return;

    const toSlug = (s: string) =>
      s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const wanted = toSlug(raw);
    const matched = SPONSOR_OPEN_PROJECTS.find((p) => toSlug(p.title) === wanted);
    const project: SponsorProject | { title: string } | null = matched ?? (raw.trim()
      ? { title: raw.trim().slice(0, 300) }
      : null);
    if (!project) return;

    setInquiryProject(project);
    setInquiryOpen(true);
    trackSponsorEvent('sponsor_open_project_click', {
      location: 'premium_access_lounge_deeplink',
      project: project.title,
    });
    // Scroll the sponsor section into view so the dialog has context behind it.
    window.requestAnimationFrame(() => {
      document.getElementById('sponsor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Clean the param so a refresh does not re-trigger the dialog.
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.replaceState({}, '', url.toString());
  }, []);

  // Fire a one-shot 'sponsor_section_view' event when #sponsor scrolls into view.
  useEffect(() => {
    const node = sponsorRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired) {
            fired = true;
            trackSponsorEvent('sponsor_section_view', {
              location: 'premium_access_lounge',
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Sticky variant assignment for the two subscribe-CTA experiments.
  // useMemo so we read localStorage exactly once per mount; getVariant itself
  // is idempotent for the same visitor.
  const industryVariant = useMemo<Variant>(
    () => getVariant('subscribe_cta_industry_reader'),
    []
  );
  const analystVariant = useMemo<Variant>(
    () => getVariant('subscribe_cta_analyst_lens'),
    []
  );

  // Log a one-per-session 'assignment' event for each tier the visitor sees.
  useEffect(() => {
    logAssignmentOnce('subscribe_cta_industry_reader', industryVariant);
    logAssignmentOnce('subscribe_cta_analyst_lens', analystVariant);
  }, [industryVariant, analystVariant]);

  // Active-tier highlight: hover/focus on desktop, scroll-spy on mobile.
  // Defaults to 'analyst-lens' since it is the recommended (capacity-capped) tier.
  const [activeTier, setActiveTier] = useState<'industry-reader' | 'analyst-lens'>('analyst-lens');
  const industryCardRef = useRef<HTMLDivElement | null>(null);
  const analystCardRef = useRef<HTMLDivElement | null>(null);

  // Deep-link target for the 5-tier strip. When the URL hash matches
  // #tier-card-<id>, briefly highlight that card so the visitor lands
  // straight on the buy panel from the comparison-table column header.
  const [highlightTierId, setHighlightTierId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const match = hash.match(/^tier-card-(.+)$/);
      if (!match) return;
      const id = match[1];
      if (!TIERS.some((t) => t.id === id)) return;
      setHighlightTierId(id);
      window.requestAnimationFrame(() => {
        document.getElementById(`tier-card-${id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
      // Drop the highlight after 2.4s; keep the hash so back-button works.
      window.setTimeout(() => setHighlightTierId(null), 2400);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Click handler for the comparison-table column headers - drives the
  // visitor straight from "compare" to "buy" with a single click.
  const handleTierDeepLink = (tierId: LadderTier['id']) => {
    setHighlightTierId(tierId);
    const el = document.getElementById(`tier-card-${tierId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `#tier-card-${tierId}`);
      try {
        const w = window as unknown as {
          gtag?: (...args: unknown[]) => void;
          dataLayer?: unknown[];
        };
        const payload = {
          surface: 'comparison_table',
          tier_id: tierId,
        };
        if (typeof w.gtag === 'function') w.gtag('event', 'tier_compare_deeplink', payload);
        if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: 'tier_compare_deeplink', ...payload });
      } catch {
        /* analytics never break UX */
      }
    }
    window.setTimeout(() => setHighlightTierId(null), 2400);
  };


  useEffect(() => {
    // Only run scroll-spy on narrow viewports where cards stack vertically.
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    if (!mql.matches) return;

    const cards: Array<[HTMLDivElement | null, 'industry-reader' | 'analyst-lens']> = [
      [industryCardRef.current, 'industry-reader'],
      [analystCardRef.current, 'analyst-lens'],
    ];
    const observed = cards.filter(([el]) => el) as Array<[HTMLDivElement, 'industry-reader' | 'analyst-lens']>;
    if (!observed.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the card with the largest intersection ratio currently in view.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const top = visible[0].target as HTMLDivElement;
        const match = observed.find(([el]) => el === top);
        if (match) setActiveTier(match[1]);
      },
      { root: null, rootMargin: '-30% 0px -30% 0px', threshold: [0.25, 0.5, 0.75] },
    );

    observed.forEach(([el]) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── HEADER + DUAL CTA ────────────────────────────────────────── */}
      <section id="lounge" className="px-6 md:px-8 pt-8 pb-12 scroll-mt-32">
        <div className="container mx-auto max-w-[900px]">
          <ScrollReveal direction="up">
            <SectionLabel label="Premium Access Lounge" />
            <h2 className="text-section font-serif tracking-tight mt-6 mb-5">
              Executive Access Lounge
            </h2>
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed max-w-[680px] mb-4">
              Most of what moves carbon prices does not get published. It moves
              between desks - in CCTS drafting rooms, around Article 6.2
              bilaterals, inside CBAM exposure spreadsheets, across CORSIA
              eligibility lists, before it ever shows up as a price.
            </p>
            <p className="text-body text-muted-foreground max-w-[640px] mb-10">
              Welcome to the Lounge. The same desk that tracks the EU-ETS
              auction floor, the FTA carbon clauses, and the load curves of
              India&rsquo;s data-centre build-out - briefing you before the
              consensus catches up. Explore our past work before you sign up.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* View past reports — anchors down to the existing library */}
            <a
              href="#all-intelligence"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('all-intelligence');
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.pageYOffset - 140;
                window.scrollTo({ top, behavior: 'smooth' });
                history.replaceState(null, '', '#all-intelligence');
              }}
              className="group block bg-secondary/30 border border-border rounded-xl p-8 transition-colors hover:border-primary/30"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                The open shelf - free
              </span>
              <h3 className="font-serif text-xl text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
                Read what we have already published
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Every flagship report, intelligence brief, regulatory alert, and
                perspective we have released to the public.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Open the library <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            {/* Sign up for reports — into the paid tier funnel */}
            <a
              href="#tiers"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('tiers');
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.pageYOffset - 140;
                window.scrollTo({ top, behavior: 'smooth' });
                history.replaceState(null, '', '#tiers');
              }}
              className="group block bg-foreground text-background rounded-xl p-6 sm:p-7 md:p-8 transition-colors hover:bg-foreground/90"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase text-background/60">
                Members only zone
              </span>
              <h3 className="font-serif text-[1.35rem] sm:text-2xl md:text-[1.6rem] leading-[1.2] tracking-tight mt-4 mb-3 [text-wrap:balance]">
                One insight can make the portfolio call of the year
              </h3>
              <p className="text-[15px] sm:text-base text-background/75 leading-relaxed mb-6 [text-wrap:pretty] max-w-[46ch]">
                Carbon markets are hard. And the right call is harder. We give you deep insights consistently. So that you can move capital with confidence.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                Enter the members&rsquo; room <ArrowRight className="w-4 h-4 shrink-0" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT THE INDUSTRY HAS TO SAY ─────────────────────────────── */}
      <section id="industry" className="px-6 md:px-8 py-12 md:py-14 bg-secondary/30 scroll-mt-32">
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="01 — What the industry has to say" />
          <h2 className="text-section font-serif tracking-tight mt-6 mb-8 md:mb-10 [text-wrap:balance]">
            Quotes from readers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {QUOTES.map((q, i) => (
              <figure
                key={i}
                className="bg-background border border-border rounded-xl p-5 sm:p-6 flex flex-col"
              >
                <blockquote className="font-serif text-[15px] sm:text-base text-foreground leading-relaxed mb-5 sm:mb-6 flex-1 [text-wrap:pretty]">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="text-xs text-muted-foreground border-t border-border/60 pt-4 leading-snug">
                  <div className="font-semibold text-foreground [text-wrap:balance]">{q.name}</div>
                  <div className="[text-wrap:balance]">{q.title}</div>
                  <div className="text-muted-foreground/70 [text-wrap:balance]">
                    {q.orgHref ? (
                      <a
                        href={q.orgHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackOutboundClick({
                            location: 'lounge_quotes',
                            org_name: q.org,
                            link_url: q.orgHref!,
                          })
                        }
                        className="text-foreground/80 no-underline hover:text-foreground hover:underline focus-visible:underline decoration-foreground/30 decoration-[0.5px] underline-offset-[5px] transition-colors duration-200"
                      >
                        {q.org}
                      </a>
                    ) : (
                      q.org
                    )}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TIERS — Five tiers, transparent jobs comparison, conversion stack */}
      <section id="tiers" className="px-6 md:px-8 py-14 md:py-16 border-t border-border scroll-mt-32">
        <div className="container mx-auto max-w-[1100px]">
          <SectionLabel label="Choose your tier" />
          <h2 className="text-section font-serif tracking-tight mt-6 mb-4">
            It will take all of us, to do this for all of us.
          </h2>
          <p className="font-serif text-lg text-foreground/80 leading-relaxed max-w-[720px] mb-4">
            There is something here for everyone interested in carbon markets.
            Free readers can follow the public conversation, enthusiasts can
            go deeper for USD 1 a month, market participants can use
            research-grade intelligence, investors can study risk and allocation,
            and sponsors can underwrite the reports this market needs.
          </p>
          <p className="text-body text-muted-foreground max-w-[720px] mb-10">
            Study the plans below and sign up to the one most suited to your
            needs before you leave this page. The prices, audiences and access
            levels are transparent so the right next step is easy to choose.
          </p>

          {/* ── 5-TIER STRIP ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-14">
            {TIERS.map((tier) => {
              const isSponsor = tier.ladder === 'B2B';
              const isEnthusiast = tier.id === 'tcd-paid';
              const isHighlighted = highlightTierId === tier.id;
              const cardClass = `rounded-xl border p-4 flex flex-col h-full transition scroll-mt-32 ${
                isSponsor
                  ? 'border-primary/30 bg-primary/5'
                  : isEnthusiast
                  ? 'border-accent/50 bg-accent/5 ring-1 ring-accent/30'
                  : 'border-border bg-background hover:border-primary/30'
              } ${
                isHighlighted ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg' : ''
              }`;
              const ladderTag =
                tier.ladder === 'TCD'
                  ? 'The Climate Desk'
                  : tier.ladder === 'BB'
                  ? 'Bombay Breed'
                  : 'B2B';
              return (
                <div key={tier.id} id={`tier-card-${tier.id}`} className={cardClass}>
                  {isEnthusiast && (
                    <span className="self-start mb-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-widest uppercase bg-accent text-accent-foreground">
                      Easiest entry
                    </span>
                  )}
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {ladderTag}
                  </div>
                  <div className="mt-1 font-serif text-[17px] leading-tight tracking-tight text-foreground">
                    {tier.name}
                  </div>
                  <div className="mt-1 text-[12px] font-medium text-foreground/85">
                    <TierPriceText tier={tier} currency={currency} />
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground leading-snug flex-1">
                    {tier.audience}
                  </p>
                  {tier.cta.kind === 'internal' ? (
                    <Link
                      to={tier.cta.href}
                      className="mt-3 inline-flex items-center justify-center h-9 px-3 rounded-md text-[12px] font-medium bg-foreground text-background hover:bg-foreground/90 transition"
                    >
                      {formatTierCtaLabel(tier, currency)}
                    </Link>
                  ) : tier.cta.kind === 'outbound' ? (
                    <a
                      href={tier.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackOutboundClick({
                          location: 'lounge_tiers_strip',
                          org_name: tier.name,
                          link_url: tier.cta.kind === 'outbound' ? tier.cta.href : '',
                        })
                      }
                      className="mt-3 inline-flex items-center justify-center h-9 px-3 rounded-md text-[12px] font-medium border border-border text-foreground hover:bg-foreground/5 transition"
                    >
                      {formatTierCtaLabel(tier, currency)}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setInquiryOpen(true)}
                      className="mt-3 inline-flex items-center justify-center h-9 px-3 rounded-md text-[12px] font-medium border border-border text-foreground hover:bg-foreground/5 transition"
                    >
                      {formatTierCtaLabel(tier, currency)}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── 8 JOBS · WHAT EACH TIER DELIVERS (FOMO + transparency) ── */}
          <div className="mb-14">
            <SectionLabel label="What you get vs what you miss" />
            <h3 className="font-serif text-2xl md:text-3xl tracking-tight mt-4 mb-3">
              The eight jobs subscribers come to us to get done
            </h3>
            <p className="text-sm text-muted-foreground max-w-[680px] mb-6">
              Scored by tier. The cells with &ldquo;No&rdquo; or
              &ldquo;Limited&rdquo; are exactly what you give up at the lower
              tier - and exactly what unlocks at the next one.
            </p>
            <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
              <table className="w-full min-w-[820px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold align-bottom w-[28%]">
                      Job to be done
                    </th>
                    {TIERS.map((t) => (
                      <th
                        key={t.id}
                        className={`py-3 px-2 text-[10px] uppercase tracking-widest font-semibold align-bottom ${
                          t.id === 'tcd-paid'
                            ? 'text-accent'
                            : 'text-foreground'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleTierDeepLink(t.id)}
                          className="block w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                          aria-label={`Jump to ${t.name} signup panel`}
                        >
                          <span className="block group-hover:underline underline-offset-4 decoration-dotted">
                            {t.name}
                          </span>
                          <span className="mt-1 block text-[9.5px] font-medium normal-case tracking-normal text-primary group-hover:text-primary/80">
                            Sign up →
                          </span>
                        </button>
                      </th>
                    ))}

                  </tr>
                </thead>
                <tbody>
                  {JOBS.map((job) => (
                    <tr key={job.n} className="border-b border-border/40 align-top">
                      <td className="py-3 pr-4 text-[12.5px] font-medium text-foreground leading-snug">
                        <span className="text-muted-foreground/60 mr-1">{job.n}.</span>
                        {job.title}
                      </td>
                      {TIERS.map((t) => {
                        const cell = job.byTier[t.id];
                        const isNo = /^no(\s|\.|$)/i.test(cell.trim());
                        const isLimited = /^limited/i.test(cell.trim());
                        return (
                          <td
                            key={t.id}
                            className={`py-3 px-2 text-[11.5px] leading-snug ${
                              isNo
                                ? 'text-muted-foreground/60 italic'
                                : isLimited
                                ? 'text-muted-foreground'
                                : t.id === 'tcd-paid'
                                ? 'text-foreground/90 bg-accent/5'
                                : 'text-foreground/85'
                            }`}
                          >
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground/80">
              Source: published comparison sheet. Same table the team uses
              internally to scope tiers.
            </p>
          </div>

          {/* ── DON'T LEAVE WITHOUT ACTING — Enthusiast funnel ──────── */}
          <div className="mb-14 rounded-xl border border-accent/40 bg-accent/5 p-6 md:p-8 grid md:grid-cols-[1.4fr_1fr] gap-6 items-center">
            <div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent text-accent-foreground mb-3">
                Easiest way to start
              </span>
              <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-foreground mb-2">
                Not ready for the research tier? Read the analysis for USD 1.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[520px]">
                When Substack gives you the first 500 words, Enthusiasts gets
                you the full analytical read - broad-based, explanatory, and
                written for a wider audience than the institutional reports
                below. Cancel anytime from your account. Monthly billing via
                Razorpay.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-foreground">
                <span className="font-serif text-3xl">USD 1</span>
                <span className="text-sm text-muted-foreground"> / month (INR 85)</span>
              </div>
              <Link
                to="/intelligence/signup?tier=enthusiasts&billing=monthly&ref=insights_tiers"
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-md bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition"
              >
                Start Enthusiasts - USD 1 / mo <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={TIER_BY_ID['tcd-free'].cta.kind === 'outbound' ? TIER_BY_ID['tcd-free'].cta.href : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-border text-foreground text-[12.5px] hover:bg-foreground/5 transition"
              >
                Or subscribe free on Substack first
              </a>
            </div>
          </div>

          {/* ── DETAILED RESEARCH TIERS — Market Makers / Investment Intelligence ── */}
          <SectionLabel label="Research-grade tiers" />
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight mt-4 mb-4">
            Bombay Breed Intelligence
          </h3>
          <p className="font-serif text-lg text-foreground/80 leading-relaxed max-w-[680px] mb-4">
            Signal over noise. Short reports that take a position - on the
            CCTS auction, the next CBAM step-down, the EU-ETS spread, the
            Article 6.2 bilaterals India is actually closing. Non-partisan,
            sharply angled towards India as the global south leader on
            high-integrity projects and the energy transition.
          </p>
          <p className="text-body text-muted-foreground max-w-[680px] mb-12">
            One tier is built for those <em>building</em> in the carbon and
            energy transition economy - founders, developers and SMEs stepping
            into compliance markets for the first time. The other is built for
            those <em>backing</em> it - investors, analysts and committees
            pricing the risk before policy moves.
          </p>

          {/* What you get — shared editorial line. No deliverables here; those live in the cards. */}
          <div className="border-y border-border/60 py-8 md:py-7 mb-12 md:mb-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Document,
                k: 'Compliance markets',
                v: 'CCTS, EU-ETS, CORSIA, Article 6.2 and 6.4 - tracked from inside the drafting rooms, not from press releases.',
              },
              {
                Icon: Earth,
                k: 'Trade & policy',
                v: 'CBAM step-downs, FTA carbon clauses, the political economy of climate policy - and what it means for Indian exporters.',
              },
              {
                Icon: ChartLineSmooth,
                k: 'Energy & resources',
                v: 'Generation, distribution, storage and the rising load from data centres against tightening water and land budgets.',
              },
            ].map(({ Icon, k, v }) => (
              <div key={k} className="flex flex-col gap-3">
                <Icon size={20} className="text-accent" aria-hidden="true" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-foreground leading-snug">
                    {k}
                  </span>
                  <span className="text-[15px] md:text-sm text-foreground/75 leading-snug">
                    {v}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
            {/* Tier 1 — Market Makers (supply side) */}
            <div
              ref={industryCardRef}
              data-active={activeTier === 'industry-reader'}
              onMouseEnter={() => setActiveTier('industry-reader')}
              onFocus={() => setActiveTier('industry-reader')}
              tabIndex={-1}
              className="group bg-background border border-border rounded-xl p-7 md:p-8 flex flex-col transition-all duration-300 ease-out outline-none data-[active=true]:border-accent data-[active=true]:shadow-[0_8px_30px_-12px_hsl(var(--accent)/0.35)] data-[active=true]:-translate-y-0.5"
            >
              <div className="pb-5 border-b border-border/60 mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                  Tier 01
                </span>
                <h3 className="font-serif text-2xl text-foreground mt-3 mb-1">
                  Market Makers
                </h3>
                <p className="text-sm text-muted-foreground italic leading-snug">
                  Built for the people building the supply - project developers,
                  founders and SMEs walking into the carbon market for the first time.
                </p>
              </div>

              <div className="mb-6">
                <div className="font-serif text-2xl sm:text-3xl text-foreground whitespace-nowrap leading-tight">
                  {tier1Price}<span className="text-sm sm:text-base text-muted-foreground font-sans"> / month</span>
                  <span className="text-xs sm:text-sm text-muted-foreground font-sans ml-2">({tier1Secondary})</span>
                </div>
                <div className="text-xs text-muted-foreground tracking-wide mt-1 leading-snug">
                  Billed monthly. Cancel anytime.
                </div>
              </div>

              <ul className="space-y-2.5 md:space-y-3 mb-8 flex-1">
                {[
                  'A weekly read on the CCTS auction, allowance prices and the regulation actually moving them',
                  'The desk view on EU-ETS, CORSIA and Article 6 - what is signalling, in plain language',
                  'Field notes from live engagements - generation, distribution, and project-side ground truth',
                  'Quarterly State of Carbon Markets tracker - India in global context, with the trade overlay',
                ].map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground leading-snug">
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline">
                <Link
                  to={`/intelligence/membership?tier=industry-reader&v=${industryVariant}&ref=insights`}
                  className="inline-flex items-center justify-center gap-2"
                  onClick={() =>
                    logClick('subscribe_cta_industry_reader', industryVariant, {
                      tier: 'industry-reader',
                    })
                  }
                >
                  {CTA_COPY.industry_reader[industryVariant]}{' '}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Tier 2 — Investment Intelligence (demand side / money) */}
            <div
              ref={analystCardRef}
              data-active={activeTier === 'analyst-lens'}
              onMouseEnter={() => setActiveTier('analyst-lens')}
              onFocus={() => setActiveTier('analyst-lens')}
              tabIndex={-1}
              className="group bg-foreground text-background border border-foreground rounded-xl p-7 md:p-8 flex flex-col relative transition-all duration-300 ease-out outline-none data-[active=true]:border-accent data-[active=true]:shadow-[0_12px_40px_-12px_hsl(var(--accent)/0.55)] data-[active=true]:-translate-y-0.5"
            >
              <span className="absolute -top-2.5 sm:-top-3 right-4 sm:right-6 inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase bg-accent text-accent-foreground shadow-md whitespace-nowrap">
                Capacity capped
              </span>
              <div className="pb-5 border-b border-background/20 mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-background/60">
                  Tier 02
                </span>
                <h3 className="font-serif text-2xl mt-3 mb-1">
                  Investment Intelligence
                </h3>
                <p className="text-sm text-background/70 italic leading-snug">
                  Built for the people pricing the risk - investors, family
                  offices and committees who need the read before the allowance
                  price moves.
                </p>
              </div>

              <div className="mb-6">
                <div className="font-serif text-2xl sm:text-3xl whitespace-nowrap leading-tight">
                  {tier2Price}<span className="text-sm sm:text-base text-background/60 font-sans"> / month</span>
                  <span className="text-xs sm:text-sm text-background/60 font-sans ml-2">({tier2Secondary})</span>
                </div>
                <div className="text-xs text-background/60 tracking-wide mt-1 leading-snug">
                  Billed monthly. Cancel anytime.
                </div>
              </div>

              <ul className="space-y-2.5 md:space-y-3 mb-8 flex-1">
                {[
                  'Every flagship report on the day it is filed - no embargo, no waiting room',
                  'Sector deep-dives across compliance markets, energy transition assets and resource-stress geographies',
                  'Regulatory alerts before the news cycle - CCTS, CBAM step-downs, EU-ETS, Article 6.2 bilaterals, BRSR, NDC 3.0',
                  'Trade and policy reads on FTA carbon clauses and the geopolitics moving allowance prices',
                  'A quarterly 30-minute scheduled call with Theresa - to talk through any vital aspect of your investment',
                ].map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-snug">
                    <span className="text-background/50 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="secondary">
                <Link
                  to={`/intelligence/membership?tier=analyst-lens&v=${analystVariant}&ref=insights`}
                  className="inline-flex items-center justify-center gap-2"
                  onClick={() =>
                    logClick('subscribe_cta_analyst_lens', analystVariant, {
                      tier: 'analyst-lens',
                    })
                  }
                >
                  {CTA_COPY.analyst_lens[analystVariant]}{' '}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground/80 mt-8 max-w-[680px] leading-relaxed">
            Institutional desks, regulated entities, and teams that want to
            underwrite a year of research should see the{' '}
            <a
              href="#sponsor"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('sponsor');
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top, behavior: 'smooth' });
                history.replaceState(null, '', '#sponsor');
              }}
              className="text-foreground/80 no-underline hover:text-foreground hover:underline focus-visible:underline decoration-foreground/30 decoration-[0.5px] underline-offset-[5px] transition-colors duration-200"
            >
              sponsorship block below
            </a>{' '}
            - it is bespoke and scoped in conversation.
          </p>
        </div>
      </section>

      {/* ── WHO IS READING OUR REPORTS ────────────────────────────── */}
      <section id="readers" className="px-6 md:px-8 py-12 md:py-14 border-t border-border/50 scroll-mt-32">
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="02 - Who is reading" />
          <h2 className="text-section font-serif tracking-tight mt-6 mb-4">
            Investors and companies on the list
          </h2>
          <p className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed mb-12 max-w-[680px]">
            14,946 subscribers across 81 countries.
            <span className="text-muted-foreground"> 1,270+ in investor and climate finance.</span>
          </p>

          <div className="space-y-8">
            {READERSHIP.map((bloc) => (
              <div
                key={bloc.group}
                className="grid md:grid-cols-[200px_1fr] gap-3 md:gap-8 pb-8 border-b border-border/40 last:border-b-0 last:pb-0"
              >
                <h3 className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground pt-1">
                  {bloc.group}
                </h3>
                <p className="font-serif text-[15px] md:text-lg text-foreground leading-[1.9] [text-wrap:pretty]">
                  {bloc.names.map((item, idx) => (
                    <React.Fragment key={item.label}>
                      {idx > 0 && (
                        <span
                          aria-hidden="true"
                          className="mx-2 text-muted-foreground/50 select-none"
                        >
                          ·
                        </span>
                      )}
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackOutboundClick({
                              location: 'lounge_readership',
                              org_name: item.label,
                              link_url: item.href!,
                              group: bloc.group,
                            })
                          }
                          className="inline whitespace-nowrap text-foreground/80 no-underline hover:text-foreground hover:underline focus-visible:underline decoration-foreground/30 decoration-[0.5px] underline-offset-[5px] transition-colors duration-200"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="inline whitespace-nowrap text-foreground/85">
                          {item.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground/70 mt-10 italic">
            Source: The Climate Desk Partnership Deck, 2026. Organisations
            listed have confirmed institutional readership.
          </p>
        </div>
      </section>

      {/* ── SPONSOR THE RESEARCH ──────────────────────────────────── */}
      <section
        ref={sponsorRef}
        id="sponsor"
        className="px-6 md:px-8 py-14 md:py-16 border-t border-border/50 bg-secondary/20 scroll-mt-32"
      >
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="03 — Sponsor a study" />
          <div className="mt-6 mb-10">
            <h2 className="text-section font-serif tracking-tight mb-5">
              Commission the work. Put your name on the report.
            </h2>
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed max-w-[680px]">
              If your work requires running diligence on Article 6 pipelines,
              CBAM-exposed portfolios, energy transition assets or the resource
              footprint of the next data centre - Team BB does the work end to
              end: methodology audit, fieldwork, ground-truthing, writing. Your
              business name is attached to the published report as the sponsor.
            </p>
          </div>

          {/* What it delivers + how it works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <div className="bg-background border border-border rounded-xl p-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                What it delivers
              </span>
              <h3 className="font-serif text-lg text-foreground mt-3 mb-4 pb-3 border-b border-border/60">
                The output
              </h3>
              <ul className="space-y-3">
                {SPONSOR_DELIVERABLES.map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground">
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                How it works
              </span>
              <h3 className="font-serif text-lg text-foreground mt-3 mb-4 pb-3 border-b border-border/60">
                The arrangement
              </h3>
              <ul className="space-y-3">
                {SPONSOR_HOW_IT_WORKS.map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground">
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Currently open projects */}
          <div className="mb-12">
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">
              Currently open projects
            </h3>
            <div className="mb-5 max-w-[62ch] text-[13px] sm:text-xs leading-relaxed text-muted-foreground/90">
              <p className="text-foreground/80 mb-3">
                What sets the price within each range
              </p>
              <dl className="space-y-3 sm:space-y-2">
                <div className="sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-x-3">
                  <dt className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground/70 mb-1 sm:mb-0 sm:pt-0.5">
                    Lower end
                  </dt>
                  <dd className="break-words">
                    Desk research, 6-10 expert interviews, one site visit, single review cycle.
                  </dd>
                </div>
                <div className="sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-x-3">
                  <dt className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground/70 mb-1 sm:mb-0 sm:pt-0.5">
                    Upper end
                  </dt>
                  <dd className="break-words">
                    Multi-state fieldwork, 20-30 interviews, primary data collection, peer-reviewed methodology, compressed timeline.
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-muted-foreground/70">
                Final scope is agreed in writing before work begins.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPONSOR_OPEN_PROJECTS.map((proj, i) => (
                <button
                  key={proj.title}
                  type="button"
                  onClick={() => openInquiry(proj)}
                  className="group text-left border border-border/60 rounded-lg p-4 transition-colors hover:border-foreground/70 hover:bg-foreground/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                  aria-label={`Register interest in: ${proj.title}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-muted-foreground/70 font-mono text-xs pt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-base text-foreground leading-snug mb-2">
                        {proj.title}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {proj.angle}
                      </p>
                      <div className="flex items-center justify-between gap-3 text-[11px]">
                        <span className="text-muted-foreground/80 font-mono">
                          {proj.effort}
                        </span>
                        <span className="text-foreground/70 group-hover:text-foreground transition-colors">
                          Register interest →
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing CTA removed - the price band and "register interest"
              flow already lives above on each open-project card, so the
              standalone sponsorship card was redundant. */}

        </div>
      </section>


      <SponsorInquiryDialog
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        project={inquiryProject?.title ?? ''}
        projectDetails={
          inquiryProject && 'angle' in inquiryProject ? inquiryProject : undefined
        }
      />
    </>
  );
};

export default PremiumAccessLounge;
