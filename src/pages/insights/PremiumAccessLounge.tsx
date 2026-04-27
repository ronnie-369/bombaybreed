import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
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
    B: 'Get the read before the price moves',
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
 * Sponsorship is bespoke, not packaged. The two columns below describe
 * what a sponsor's name attaches to (left) and what we build alongside
 * the public research stream for the sponsor's own use (right). No
 * price - every sponsorship is scoped in conversation.
 */
const SPONSOR_NAME_ON: string[] = [
  'A year-long topic cluster - your name on every brief in the series',
  'Flagship reports published into the public record, not behind your gate',
  'Methodology and data choices stay with us - editorial independence is the point',
  'Co-presentation at the report launch, on stage with the analyst',
];

const SPONSOR_FOR_YOU: string[] = [
  'Bespoke research scoped to your portfolio or thesis - not a SKU',
  'A standing line to the desk for follow-ups, sized to the engagement',
  'Closed-door briefings for your team or LPs around each release',
  'First read on findings before they hit the public archive',
];

const SPONSOR_WHY: string[] = [
  'Independent of bank or consultancy incentives',
  'India-specific regulatory depth',
  'Published research with a public track record',
  'Direct analyst access, not a relationship manager',
];

const PremiumAccessLounge: React.FC = () => {
  const sponsorRef = useRef<HTMLElement | null>(null);

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
              The room behind the room.
            </h2>
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed max-w-[680px] mb-4">
              Most of what we know about India&rsquo;s carbon markets does not get
              published. It moves between desks, before committees, inside drafting
              rooms - and then it shows up, six weeks later, as a price.
            </p>
            <p className="text-body text-muted-foreground max-w-[640px] mb-10">
              The Lounge is the small, paid list that gets the read first. Two
              tiers. No advertising. No house view dressed up as research. The
              library below is open - the next brief is not.
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
                The closed list - members
              </span>
              <h3 className="font-serif text-xl mt-3 mb-2">
                Get the next brief before it goes public
              </h3>
              <p className="text-sm text-background/70 mb-6">
                Two tiers. From INR 10,000 a month. The same desk that briefs
                boards and committees, on retainer to your inbox.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                See the two tiers <ArrowRight className="w-4 h-4" />
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
            One desk. Invest, or be invested in.
          </h2>
          <p className="font-serif text-lg text-foreground/80 leading-relaxed max-w-[680px] mb-12">
            One tier is built for the people <em>making</em> the carbon - founders,
            developers, SMEs walking into the market for the first time. The other
            is built for the people <em>pricing</em> it - investors, analysts, and
            committees who need the read before the price moves.
          </p>

          {/* What you get — shared editorial line. No deliverables here; those live in the cards. */}
          <div className="border-y border-border/60 py-8 md:py-5 mb-12 md:mb-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {[
              {
                k: 'One desk',
                v: 'Every word is written by Theresa. No syndication, no ghostwriters, no advertising.',
              },
              {
                k: 'India first',
                v: 'Independent research from inside the market, not retold from a London or New York desk.',
              },
              {
                k: 'Two depths',
                v: 'Pick the read that fits the seat you sit in - the cards below set out what each delivers.',
              },
            ].map((item) => (
              <div key={item.k} className="flex flex-col gap-2 md:grid md:grid-cols-[auto_1fr] md:gap-3 md:items-baseline">
                <span className="text-[10px] font-bold tracking-widest uppercase text-accent whitespace-nowrap">
                  {item.k}
                </span>
                <span className="text-[15px] md:text-sm text-foreground/80 leading-relaxed md:leading-snug">
                  {item.v}
                </span>
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
                  Tier 01 - Supply side
                </span>
                <h3 className="font-serif text-2xl text-foreground mt-3 mb-1">
                  The Industry Reader
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  Built for the people making the carbon - founders, developers,
                  SMEs walking into the market for the first time.
                </p>
              </div>

              <div className="mb-6">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent/15 text-accent border border-accent/30 mb-3">
                  Launch offer - 30% off year one
                </span>
                <div className="text-xs text-muted-foreground/70 font-sans line-through mb-1">
                  INR 10,000 / month
                </div>
                <div className="font-serif text-3xl text-foreground whitespace-nowrap">
                  INR 7,000<span className="text-base text-muted-foreground font-sans"> / month</span>
                </div>
                <div className="text-xs text-muted-foreground tracking-wide mt-1">
                  INR 84,000 / year - founding rate, locked while your subscription stays active
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'A weekly read on the carbon market - news, with the regulation that actually moves it',
                  'The desk view - what the price is signalling, in plain language',
                  'Field notes from live engagements, anonymised but unvarnished',
                  'Quarterly State of Carbon Markets tracker - India in global context',
                ].map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground">
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
              <span className="absolute -top-3 right-6 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent text-accent-foreground shadow-md">
                Capacity capped
              </span>
              <div className="pb-5 border-b border-background/20 mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-background/60">
                  Tier 02 - Demand side
                </span>
                <h3 className="font-serif text-2xl mt-3 mb-1">
                  The Analyst Lens
                </h3>
                <p className="text-sm text-background/70 italic">
                  Built for the people pricing the carbon - investors, family
                  offices, and committees who need the read before the price
                  moves.
                </p>
              </div>

              <div className="mb-6">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent/20 text-accent border border-accent/40 mb-3">
                  Launch offer - 30% off year one
                </span>
                <div className="text-xs text-background/45 font-sans line-through mb-1">
                  INR 50,000 / month
                </div>
                <div className="font-serif text-2xl sm:text-3xl whitespace-nowrap">
                  INR 35,000<span className="text-sm sm:text-base text-background/60 font-sans"> / month</span>
                </div>
                <div className="text-xs text-background/60 tracking-wide mt-1">
                  INR 4.2 lakh / year - founding rate, locked while your subscription stays active
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Every flagship report on the day it is filed - no embargo, no waiting room',
                  'Sector deep-dives across the verticals you allocate to, with the underlying working',
                  'Regulatory alerts before the news cycle catches up - CCTS, BRSR, NDC 3.0',
                  'A monthly 30-minute call with Theresa, scheduled on your terms',
                ].map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm">
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
          <SectionLabel label="03 — Sponsor a year of research" />
          <div className="mt-6 mb-10">
            <h2 className="text-section font-serif tracking-tight mb-5">
              Put your name on the work, not the conclusion.
            </h2>
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed max-w-[680px]">
              For institutions that want to underwrite a year of original India
              research - a topic cluster, a regulatory beat, a sector under
              transition. Distinct from the membership tiers above. Bespoke,
              sales-led, and scoped in conversation.
            </p>
          </div>

          {/* What sponsorship actually buys - two columns, no price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <div className="bg-background border border-border rounded-xl p-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                What your name attaches to
              </span>
              <h3 className="font-serif text-lg text-foreground mt-3 mb-4 pb-3 border-b border-border/60">
                The public research stream
              </h3>
              <ul className="space-y-3">
                {SPONSOR_NAME_ON.map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground">
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                What we build alongside
              </span>
              <h3 className="font-serif text-lg text-foreground mt-3 mb-4 pb-3 border-b border-border/60">
                The work scoped to you
              </h3>
              <ul className="space-y-3">
                {SPONSOR_FOR_YOU.map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground">
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why us */}
          <div className="mb-12">
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Why us
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SPONSOR_WHY.map((line) => (
                <div key={line} className="text-sm text-foreground border-l-2 border-foreground/40 pl-3">
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* CTA - bespoke, no price */}
          <div className="bg-background border border-border rounded-xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-[520px]">
                <h3 className="font-serif text-xl text-foreground mb-2">
                  Sponsorship is bespoke.
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We take on a small number of sponsors each year so the work
                  stays independent. Tell us the beat you want underwritten and
                  we will come back with a shape and a number.
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
    </>
  );
};

export default PremiumAccessLounge;
