import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Document, Earth, ChartLineSmooth } from '@carbon/icons-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import SponsorInquiryDialog from '@/components/SponsorInquiryDialog';
import { trackSponsorEvent } from '@/utils/sponsorAnalytics';
import {
  getVariant,
  logAssignmentOnce,
  logClick,
  type Variant,
} from '@/lib/abTest';

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
    A: 'Join the Industry Reader',
    B: 'Read the market with us',
  },
  analyst_lens: {
    A: 'Take the Analyst Lens',
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

const QUOTES: { quote: string; name: string; title: string; org: string }[] = [
  {
    quote: 'Brilliantly insightful.',
    name: 'Chris Sherwood',
    title: 'Chairman',
    org: 'Negative Emissions Platform',
  },
  {
    quote: 'Wonderful writing. Deep analysis. Highly insightful.',
    name: 'Mitchell Beer',
    title: 'Founder',
    org: 'The Energy Mix',
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
const READERSHIP: { group: string; names: string[] }[] = [
  {
    group: 'Multilateral',
    names: [
      'United Nations',
      'FAO',
      'IFC / World Bank',
      'WHO',
      'Asian Development Bank',
      'UNDP',
      'AKDN',
    ],
  },
  {
    group: 'Global Corporates',
    names: [
      'ArcelorMittal',
      'Oracle',
      'Unilever',
      'H&M',
      'Infosys',
      'Siemens Energy',
      'Volkswagen',
      'BASF',
      'ABB',
      'GE',
      'Meta',
      'S&P Global',
    ],
  },
  {
    group: 'Indian Industry',
    names: [
      'JSW Group',
      'Tata Motors',
      'Mahindra',
      'Adani',
      'Axis Bank',
      'IREDA',
      'Dr Reddy\u2019s',
      'Welspun',
      'Apollo Hospitals',
    ],
  },
  {
    group: 'Government',
    names: [
      'Government of India (central ministries)',
      'Japan Ministry of the Environment',
    ],
  },
  {
    group: 'Media & Intelligence',
    names: [
      'Argus Media',
      'BBC',
      'Bloomberg',
      'Singapore Press Holdings',
      'France Televisions',
    ],
  },
  {
    group: 'Climate & ESG',
    names: [
      'SBTi',
      'Ellen MacArthur Foundation',
      'ClimateImpactX',
      '3Degrees',
      'ReNew Energy',
    ],
  },
  {
    group: 'Investors & Climate Finance',
    names: [
      'Development Finance Institutions',
      'Climate & Carbon Investment funds',
      'Venture Capital',
      'Wealth Management & Family Offices',
      'Financial Advisory & Services',
    ],
  },
];

/**
 * Section 03 - Commission a bespoke study or deep-dive. Team BB does the
 * work; the sponsoring organisation gets its name attached to the
 * published output. Deliverables span video assets, due-diligence studies,
 * MRV / dMRV reviews, and feasibility / viability work. Pricing is
 * indicative: INR 6L to 48L depending on scope and intensity.
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
  'Methodology and findings stay with us - editorial independence is the point',
];

const SPONSOR_OPEN_PROJECTS: string[] = [
  'CCUS technologies investigation in India',
  'Carbon projects for JCM and Article 6.2 readiness',
  'Data-centre water and power footprint - the hidden load on the grid',
  'CBAM exposure for Indian exporters - steel, aluminium, cement, fertiliser',
  'Wetlands conservation and waste management at Chandrataal Lake, Himachal Pradesh',
];

const PremiumAccessLounge: React.FC = () => {
  const sponsorRef = useRef<HTMLElement | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProject, setInquiryProject] = useState('');

  const openInquiry = (project: string) => {
    setInquiryProject(project);
    setInquiryOpen(true);
    trackSponsorEvent('sponsor_open_project_click', {
      location: 'premium_access_lounge',
      project,
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
    const matched = SPONSOR_OPEN_PROJECTS.find((p) => toSlug(p) === wanted);
    const project = matched ?? raw.trim().slice(0, 300);
    if (!project) return;

    setInquiryProject(project);
    setInquiryOpen(true);
    trackSponsorEvent('sponsor_open_project_click', {
      location: 'premium_access_lounge_deeplink',
      project,
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
              className="group block bg-foreground text-background rounded-xl p-8 transition-colors hover:bg-foreground/90"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase text-background/60">
                Members only zone
              </span>
              <h3 className="font-serif text-xl mt-3 mb-2">
                Carbon markets and energy transition, decoded for you - starting at INR 10,000 per month
              </h3>
              <p className="text-sm text-background/70 mb-6">
                Two tiers. From INR 10,000 a month. The same desk that briefs
                boards and committees, on retainer to your inbox.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                Enter the members&rsquo; room <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* TIERS — Industry Reader vs Analyst Lens */}
      <section id="tiers" className="px-6 md:px-8 py-20 md:py-16 border-t border-border/50 scroll-mt-32 bg-secondary/20">
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="The two tiers" />
          <h2 className="text-section font-serif tracking-tight mt-6 mb-4">
            One desk. Two ways to read the market.
          </h2>
          <p className="font-serif text-lg text-foreground/80 leading-relaxed max-w-[680px] mb-4">
            Signal over noise. Short reports that take a position - on the
            CCTS auction, the next CBAM step-down, the EU-ETS spread, the
            Article 6.2 bilaterals India is actually closing. No hype cycles,
            no PR rewrites, no house view dressed up as research.
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
            {/* Tier 1 — Industry Reader (supply side) */}
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
                  The Industry Reader
                </h3>
                <p className="text-sm text-muted-foreground italic leading-snug">
                  Built for the people making the carbon - founders, developers,
                  SMEs walking into the market for the first time.
                </p>
              </div>

              <div className="mb-6">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent/15 text-accent border border-accent/30 mb-3 leading-snug">
                  Launch offer - 30% off year one
                </span>
                <div className="text-xs text-muted-foreground/70 font-sans line-through mb-1 leading-snug">
                  INR 10,000 / month
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-foreground whitespace-nowrap leading-tight">
                  INR 7,000<span className="text-sm sm:text-base text-muted-foreground font-sans"> / month</span>
                </div>
                <div className="text-xs text-muted-foreground tracking-wide mt-1 leading-snug">
                  INR 84,000 / year - founding rate, locked while your subscription stays active
                </div>
              </div>

              <ul className="space-y-2.5 md:space-y-3 mb-8 flex-1">
                {[
                  'A weekly read on the carbon market - news, with the regulation that actually moves it',
                  'The desk view - what the price is signalling, in plain language',
                  'Field notes from live engagements, anonymised but unvarnished',
                  'Quarterly State of Carbon Markets tracker - India in global context',
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

            {/* Tier 2 — Analyst Lens (demand side / money) */}
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
                  The Analyst Lens
                </h3>
                <p className="text-sm text-background/70 italic leading-snug">
                  Built for the people pricing the carbon - investors, family
                  offices, and committees who need the read before the price
                  moves.
                </p>
              </div>

              <div className="mb-6">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent/20 text-accent border border-accent/40 mb-3 leading-snug">
                  Launch offer - 30% off year one
                </span>
                <div className="text-xs text-background/45 font-sans line-through mb-1 leading-snug">
                  INR 50,000 / month
                </div>
                <div className="font-serif text-2xl sm:text-3xl whitespace-nowrap leading-tight">
                  INR 35,000<span className="text-sm sm:text-base text-background/60 font-sans"> / month</span>
                </div>
                <div className="text-xs text-background/60 tracking-wide mt-1 leading-snug">
                  INR 4.2 lakh / year - founding rate, locked while your subscription stays active
                </div>
              </div>

              <ul className="space-y-2.5 md:space-y-3 mb-8 flex-1">
                {[
                  'Every flagship report on the day it is filed - no embargo, no waiting room',
                  'Sector deep-dives across the verticals you allocate to, with the underlying working',
                  'Regulatory alerts before the news cycle catches up - CCTS, BRSR, NDC 3.0',
                  'A monthly 30-minute call with Theresa, scheduled on your terms',
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
            underwrite a year of research should see the sponsorship block
            below - it is bespoke and scoped in conversation.
          </p>
        </div>
      </section>

      {/* ── 2. WHAT THE INDUSTRY HAS TO SAY ──────────────────────────── */}
      <section id="industry" className="px-6 md:px-8 py-16 border-t border-border/50 scroll-mt-32">
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="01 — What the industry has to say" />
          <h2 className="text-section font-serif tracking-tight mt-6 mb-10">
            Quotes from readers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {QUOTES.map((q, i) => (
              <figure
                key={i}
                className="bg-secondary/30 border border-border rounded-xl p-6 flex flex-col"
              >
                <blockquote className="font-serif text-[15px] text-foreground leading-relaxed mb-6 flex-1">
                  “{q.quote}”
                </blockquote>
                <figcaption className="text-xs text-muted-foreground border-t border-border/60 pt-4">
                  <div className="font-semibold text-foreground">{q.name}</div>
                  <div>{q.title}</div>
                  <div className="text-muted-foreground/70">{q.org}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHO IS READING OUR REPORTS ────────────────────────────── */}
      <section id="readers" className="px-6 md:px-8 py-16 border-t border-border/50 scroll-mt-32">
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
                <p className="font-serif text-base md:text-lg text-foreground leading-relaxed">
                  {bloc.names.join(' · ')}
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

      {/* ── 4. SPONSOR THE RESEARCH ──────────────────────────────────── */}
      <section
        ref={sponsorRef}
        id="sponsor"
        className="px-6 md:px-8 py-20 border-t border-border/50 bg-secondary/20 scroll-mt-32"
      >
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="03 — Sponsor a study" />
          <div className="mt-6 mb-10">
            <h2 className="text-section font-serif tracking-tight mb-5">
              Commission the work. Put your name on the report.
            </h2>
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed max-w-[680px]">
              Commission a study or deep-dive bespoke to your requirements.
              Team BB does the work end to end - research, fieldwork, writing.
              Your business name is attached to the published report as the
              sponsor.
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
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Currently open projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPONSOR_OPEN_PROJECTS.map((line, i) => (
                <button
                  key={line}
                  type="button"
                  onClick={() => openInquiry(line)}
                  className="group text-left text-sm text-foreground border-l-2 border-foreground/40 pl-3 py-1 transition-colors hover:border-foreground hover:bg-foreground/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 rounded-r"
                  aria-label={`Register interest in: ${line}`}
                >
                  <span className="text-muted-foreground/70 mr-2 font-mono text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {line}
                  <span className="ml-2 text-xs text-muted-foreground/60 group-hover:text-foreground transition-colors">
                    Register interest →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA - price band disclosed, scope by conversation */}
          <div className="bg-background border border-border rounded-xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-[520px]">
                <div className="font-serif text-2xl text-foreground mb-1">
                  INR 6,00,000 - 48,00,000
                  <span className="text-base text-muted-foreground font-sans"> + GST</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Indicative range. Each engagement is scoped to the depth of
                  fieldwork, methodology and final output. Tell us what you
                  want investigated and we will come back with a shape and a
                  number.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <Button asChild>
                  <Link
                    to="/contact?topic=intelligence-sponsorship"
                    className="inline-flex items-center gap-2"
                    onClick={() =>
                      trackSponsorEvent('sponsor_cta_click', {
                        location: 'premium_access_lounge',
                        link_url: '/contact?topic=intelligence-sponsorship',
                        link_text: 'Open a sponsorship conversation',
                      })
                    }
                  >
                    Open a sponsorship conversation <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <span className="text-xs text-muted-foreground">
                  Reply within two business days.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SPONSOR A STUDY ───────────────────────────────────────── */}
      {/*
        Project-level due diligence for companies and investors:
        MRV / dMRV, on-ground scoping, ground-truthing, report writing.
        Distinct from the year-long research underwriting above. Output is
        usable internally and as external communications material. Case-
        by-case, starting at INR 6 lakh + GST.
      */}
      <section
        id="sponsor-a-study"
        className="px-6 md:px-8 py-20 border-t border-border/50 scroll-mt-32"
      >
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="04 — Sponsor a study" />
          <div className="mt-6 mb-10">
            <h2 className="text-section font-serif tracking-tight mb-5">
              Due diligence on a project, written up to publish.
            </h2>
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed max-w-[680px]">
              For companies and investors who need a project-level read - MRV
              and dMRV review, initial boots-on-ground scoping, ground-truthing,
              and a written report. Usable internally for an investment
              committee, and externally as communications material.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-background border border-border rounded-xl p-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                What we do
              </span>
              <h3 className="font-serif text-lg text-foreground mt-3 mb-4 pb-3 border-b border-border/60">
                The fieldwork
              </h3>
              <ul className="space-y-3">
                {[
                  'MRV / dMRV review of the project methodology and data',
                  'Initial scoping with boots on the ground at the project site',
                  'Ground-truthing the developer&rsquo;s claims against what the site shows',
                  'A written report you can hand to an IC or publish under your name',
                ].map((line) => (
                  <li
                    key={line}
                    className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground"
                  >
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Who it is for
              </span>
              <h3 className="font-serif text-lg text-foreground mt-3 mb-4 pb-3 border-b border-border/60">
                Companies and investors
              </h3>
              <ul className="space-y-3">
                {[
                  'Buyers running diligence on a project before purchase or offtake',
                  'Investors and funds underwriting a developer or a portfolio',
                  'Corporates needing a credible third-party read for the annual report',
                  'Communications teams who need findings written for an external audience',
                ].map((line) => (
                  <li
                    key={line}
                    className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground"
                  >
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA - case-by-case, with starting price disclosed */}
          <div className="bg-secondary/30 border border-border rounded-xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-[520px]">
                <div className="font-serif text-2xl text-foreground mb-1">
                  From INR 6,00,000<span className="text-base text-muted-foreground font-sans"> + GST</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each study is scoped case by case - the project, the depth of
                  fieldwork, and what the report needs to do. Tell us what you
                  are looking at and we will come back with a scope and a
                  number.
                </p>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <Button asChild>
                  <Link
                    to="/contact?topic=sponsor-a-study"
                    className="inline-flex items-center gap-2"
                    onClick={() =>
                      trackSponsorEvent('sponsor_cta_click', {
                        location: 'sponsor_a_study',
                        link_url: '/contact?topic=sponsor-a-study',
                        link_text: 'Inquire about a study',
                      })
                    }
                  >
                    Inquire about a study <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <span className="text-xs text-muted-foreground">
                  Reply within two business days.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SponsorInquiryDialog
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        project={inquiryProject}
      />
    </>
  );
};

export default PremiumAccessLounge;
