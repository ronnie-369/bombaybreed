import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { trackSponsorEvent } from '@/utils/sponsorAnalytics';

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

const WHAT_YOU_GET: { title: string; body: string }[] = [
  {
    title: 'Flagship reports as they publish',
    body: 'Original research on carbon markets, regulatory shifts, and India-specific climate exposure — delivered the day they go live.',
  },
  {
    title: 'Sectoral analysis on demand',
    body: 'Deep-dive briefs on the sectors you allocate to, with the regulatory + policy frame that public reporting leaves out.',
  },
  {
    title: 'Regulatory alerts ahead of the news cycle',
    body: 'Pore space law, CCTS rules, NDC 3.0, BRSR amendments. We flag what moves before it moves the price.',
  },
  {
    title: 'Direct line to the analyst',
    body: 'Members can ask follow-ups on any brief. Sponsors get scheduled time with the team (see corporate deal below).',
  },
];

const QUOTES: { quote: string; name: string; title: string; org: string }[] = [
  {
    quote:
      'Replace this quote with a real one from a reader. Three to four sentences works best — keep it specific to a report or a decision the reader made.',
    name: 'Reader name',
    title: 'Title',
    org: 'Organisation',
  },
  {
    quote:
      'A second placeholder quote. Aim for testimonials that name the brief and the outcome — generic praise reads like marketing.',
    name: 'Reader name',
    title: 'Title',
    org: 'Organisation',
  },
  {
    quote:
      'A third placeholder quote. If you only have two real quotes at launch, drop this card and the grid will reflow to two columns.',
    name: 'Reader name',
    title: 'Title',
    org: 'Organisation',
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

const SPONSOR_ANALYST: string[] = [
  'A dedicated analyst on call for your team',
  'Bespoke research on your portfolio or sector',
  'Investment thesis vetting before committee',
  'Co-branded research where it makes sense',
];

const SPONSOR_READER: string[] = [
  'Every report, every brief, every regulatory alert',
  'Sectoral deep-dives shipped to your team',
  'Quarterly briefings with the lead analyst',
  'Priority access to flagship research embargoes',
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
      <section id="tiers" className="px-6 md:px-8 py-16 border-t border-border/50 scroll-mt-32 bg-secondary/20">
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="The two tiers" />
          <h2 className="text-section font-serif tracking-tight mt-6 mb-4">
            One desk. Two ways in.
          </h2>
          <p className="font-serif text-lg text-foreground/80 leading-relaxed max-w-[680px] mb-12">
            One tier is built for the people <em>making</em> the carbon - founders,
            developers, SMEs walking into the market for the first time. The other
            is built for the people <em>pricing</em> it - investors, analysts, and
            committees who need the read before the price moves.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tier 1 — Industry Reader (supply side) */}
            <div className="bg-background border border-border rounded-xl p-8 flex flex-col">
              <div className="pb-5 border-b border-border/60 mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                  Tier 01 - Supply side
                </span>
                <h3 className="font-serif text-2xl text-foreground mt-3 mb-1">
                  The Industry Reader
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  For founders, SMEs, and carbon project developers learning the
                  market on the way in.
                </p>
              </div>

              <div className="mb-6">
                <div className="font-serif text-3xl text-foreground">
                  INR 10,000<span className="text-base text-muted-foreground font-sans"> / month</span>
                </div>
                <div className="text-xs text-muted-foreground tracking-wide mt-1">
                  INR 1.2 lakh / year - billed annually
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Carbon market news, with the regulatory frame attached',
                  'Views from the desk - what we think the price is telling you',
                  'Working insights from inside live engagements (anonymised)',
                  'Quarterly State of Carbon Markets tracker - India + global',
                ].map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground">
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline">
                <Link
                  to="/intelligence/membership?tier=industry-reader"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Join the Industry Reader <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Tier 2 — Analyst Lens (demand side / money) */}
            <div className="bg-foreground text-background border border-foreground rounded-xl p-8 flex flex-col relative">
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
                  For investors, family offices, and committees pricing the
                  market - and for teams who would otherwise hire a junior to do
                  this work.
                </p>
              </div>

              <div className="mb-6">
                <div className="font-serif text-3xl">
                  INR 50,000<span className="text-base text-background/60 font-sans"> / month</span>
                </div>
                <div className="text-xs text-background/60 tracking-wide mt-1">
                  INR 6 lakh / year - one named user - cheaper than a junior analyst
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Every flagship report on publication - no embargo wait',
                  'Sectoral analysis across the verticals you allocate to',
                  'Regulatory alerts ahead of the news cycle (CCTS, BRSR, NDC 3.0)',
                  '30-minute direct line each month - scheduled on the BB site',
                  'Quarterly State of Carbon Markets tracker included',
                ].map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm">
                    <span className="text-background/50 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="secondary">
                <Link
                  to="/intelligence/membership?tier=analyst-lens"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Take the Analyst Lens <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground/80 mt-8 max-w-[680px] leading-relaxed">
            Teams of three or more, regulated entities, and corporate desks should
            see the sponsorship block below - the structure is different and the
            access is wider.
          </p>
        </div>
      </section>

      <section id="what-you-get" className="px-6 md:px-8 py-16 border-t border-border/50 scroll-mt-32">
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="01 — What you get" />
          <h2 className="text-section font-serif tracking-tight mt-6 mb-10">
            What members receive
          </h2>
          <div className="divide-y divide-border/60 border-y border-border/60">
            {WHAT_YOU_GET.map((item) => (
              <div key={item.title} className="py-6 grid grid-cols-[auto_1fr] gap-6 items-start">
                <span className="text-xs font-mono text-muted-foreground/70 pt-1">✓</span>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. WHAT THE INDUSTRY HAS TO SAY ──────────────────────────── */}
      <section id="industry" className="px-6 md:px-8 py-16 border-t border-border/50 scroll-mt-32">
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="02 — What the industry has to say" />
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
          <p className="text-xs text-muted-foreground/60 mt-6 italic">
            Placeholder quotes. Replace strings in PremiumAccessLounge.tsx as real
            testimonials come in.
          </p>
        </div>
      </section>

      {/* ── 3. WHO IS READING OUR REPORTS ────────────────────────────── */}
      <section id="readers" className="px-6 md:px-8 py-16 border-t border-border/50 scroll-mt-32">
        <div className="container mx-auto max-w-[900px]">
          <SectionLabel label="03 - Who is reading" />
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
          <SectionLabel label="04 — Sponsor the research" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-6 mb-10">
            <h2 className="text-section font-serif tracking-tight">
              Corporate sponsorship
            </h2>
            <div className="text-right">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                From
              </div>
              <div className="font-serif text-2xl text-foreground">
                INR 6 lakh / year
              </div>
            </div>
          </div>

          {/* Analyst | Reader columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg text-foreground mb-4 pb-3 border-b border-border/60">
                For the analyst side
              </h3>
              <ul className="space-y-3">
                {SPONSOR_ANALYST.map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground">
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-serif text-lg text-foreground mb-4 pb-3 border-b border-border/60">
                For the reader side
              </h3>
              <ul className="space-y-3">
                {SPONSOR_READER.map((line) => (
                  <li key={line} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-foreground">
                    <span className="text-muted-foreground/70 pt-0.5">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why? row */}
          <div className="mb-12">
            <h3 className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Why?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SPONSOR_WHY.map((line) => (
                <div key={line} className="text-sm text-foreground border-l-2 border-foreground/40 pl-3">
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* How much — Corporate deal */}
          <div className="bg-background border border-border rounded-xl p-8">
            <div className="flex items-baseline justify-between gap-4 mb-6 pb-4 border-b border-border/60">
              <h3 className="font-serif text-xl text-foreground">
                How much: Corporate deal
              </h3>
              <span className="font-serif text-lg text-foreground whitespace-nowrap">
                INR 6 lakh / year
              </span>
            </div>
            <ol className="space-y-4 mb-8">
              <li className="grid grid-cols-[auto_1fr] gap-4 text-sm">
                <span className="font-serif text-base text-muted-foreground/80">a)</span>
                <div>
                  <span className="font-semibold text-foreground">Reports.</span>{' '}
                  <span className="text-muted-foreground">
                    Every flagship report and intelligence brief, distributed across your team.
                  </span>
                </div>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-4 text-sm">
                <span className="font-serif text-base text-muted-foreground/80">b)</span>
                <div>
                  <span className="font-semibold text-foreground">Sectoral analysis.</span>{' '}
                  <span className="text-muted-foreground">
                    Sector deep-dives on the verticals you allocate to, scoped to your portfolio.
                  </span>
                </div>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-4 text-sm">
                <span className="font-serif text-base text-muted-foreground/80">c)</span>
                <div>
                  <span className="font-semibold text-foreground">
                    1-on-1 access to our team for any investment thesis you want vetted —
                    30 mins per month.
                  </span>{' '}
                  <span className="text-muted-foreground">
                    Scheduled directly with the lead analyst, recurring monthly for the year.
                  </span>
                </div>
              </li>
            </ol>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button asChild>
                <Link
                  to="/contact?topic=intelligence-sponsorship"
                  className="inline-flex items-center gap-2"
                  onClick={() =>
                    trackSponsorEvent('sponsor_cta_click', {
                      location: 'premium_access_lounge',
                      link_url: '/contact?topic=intelligence-sponsorship',
                      link_text: 'Talk to us about sponsorship',
                    })
                  }
                >
                  Talk to us about sponsorship <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <span className="text-xs text-muted-foreground">
                Sponsorship is sales-led. We will reply within two business days.
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PremiumAccessLounge;
