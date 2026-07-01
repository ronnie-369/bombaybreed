import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PageHead from '@/components/PageHead';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

// Paid-tier components (LadderStickyPill, TierFinder, sponsor analytics) removed
// from the editorial hub. They remain in the repo under /src/components/insights/
// and can be restored when the subscription product goes live.


type ContentType = 'Flagship Report' | 'Intelligence Brief' | 'Regulatory Alert' | 'Perspective';
type Topic = 'Carbon Markets' | 'Board Governance' | 'ESG Communications' | 'Regulatory Intel';
// Optional second-level grouping inside an oversized cluster (currently
// only used to split the Carbon Markets shelf into two readable sub-shelves).
type SubCluster = 'Markets & Compliance' | 'Power & Transition';

interface Publication {
  title: string;
  description: string;
  contentType: ContentType;
  topic: Topic;
  subCluster?: SubCluster;
  publishedDate: string;
  readTimeMinutes: number;
  link?: string;
  external?: boolean;
}

const contentTypeColors: Record<ContentType, string> = {
  'Flagship Report': 'text-primary border-primary/30',
  'Intelligence Brief': 'text-foreground border-border',
  'Regulatory Alert': 'text-destructive border-destructive/30',
  'Perspective': 'text-accent border-accent/30',
};

const allTopics: Topic[] = ['Carbon Markets', 'Board Governance', 'ESG Communications', 'Regulatory Intel'];

// A publication is treated as "new" for 14 days after its publishedDate.
// This drives a visual highlight (accent border + pulsing badge) so
// freshly published reports break visually from the back catalogue.
const NEW_WINDOW_DAYS = 14;
const isNewPublication = (publishedDate: string): boolean => {
  const published = new Date(publishedDate).getTime();
  if (Number.isNaN(published)) return false;
  const ageMs = Date.now() - published;
  return ageMs >= 0 && ageMs <= NEW_WINDOW_DAYS * 24 * 60 * 60 * 1000;
};
const allContentTypes: ContentType[] = ['Flagship Report', 'Intelligence Brief', 'Regulatory Alert', 'Perspective'];

const publications: Publication[] = [
  {
    title: "Why Europe melts at 41°C when the Gulf works at 50°C",
    description: "Article 01 of the Europe-India Climate Series. A 1,200-word brief on why European infrastructure and bodies are failing in heat that the Gulf and South Asia absorb routinely, and what that means for Indian boards, insurers and investors over the next decade.",
    contentType: 'Intelligence Brief',
    topic: 'Board Governance',
    publishedDate: "2026-06-30",
    readTimeMinutes: 6,
    link: "/series/europe-india/why-europe-melts",
  },
  {
    title: "Before the Peak: a super El Nino is forming",
    description: "A super El Nino is forming with 90% certainty per the UN. For richer economies it is a financial event - food inflation, supply chains and insurance - with an eight-month window to act before the peak.",
    contentType: 'Flagship Report',
    topic: 'Board Governance',
    publishedDate: "2026-06-06",
    readTimeMinutes: 18,
    link: "/insights/before-the-peak",
  },
  {
    title: "Raising the Renaissance Child",
    description: "A reading curriculum of twenty-four books for the 21st century Indian family. A white paper circulated as part of a study for NIAS, Bangalore.",
    contentType: 'Perspective',
    topic: 'ESG Communications',
    publishedDate: "2026-06-20",
    readTimeMinutes: 20,
    link: "/insights/raising-the-renaissance-child",
  },
  {
    title: "India's Narrative Hiring Gap: A 32-Listing Audit",
    description: "32 live LinkedIn job postings. 96% had 100+ applicants. 0 hired the right person. A data-led audit of India's communications talent market, the failure modes, and a 7-question diagnostic before your next hire.",
    contentType: 'Flagship Report',
    topic: 'ESG Communications',
    publishedDate: "2026-06-01",
    readTimeMinutes: 14,
    link: "/insights/narrative-hiring-gap",
  },
  {
    title: "Mitigation and Adaptation, Working as One: An Investor's View of Himachal Pradesh",
    description: "Why Himachal Pradesh's climate exposure is India's exposure. A restoration-economy thesis linking produce, tourism, and capital - the umbrella synthesis to The Climate Desk's Himachal investigation.",
    contentType: 'Flagship Report',
    topic: 'Board Governance',
    publishedDate: "2026-05-05",
    readTimeMinutes: 24,
    link: "/special-features/tcd-hp-investor-synthesis.html",
    external: true,
  },
  {
    title: "India Heat Intelligence Report: The World's Hottest Country, Two Weeks Before Peak Summer",
    description: "A board-level intelligence report on India's accelerating heat exposure - what it means for productivity, capital, supply chains, and corporate climate strategy ahead of the 2026 peak summer.",
    contentType: 'Flagship Report',
    topic: 'Board Governance',
    publishedDate: "2026-04-27",
    readTimeMinutes: 22,
    link: "/special-features/india-heat-intelligence.html",
    external: true,
  },
  {
    title: "The Market That Ran on One Buyer",
    description: "Microsoft's pause on carbon removal purchases is not a corporate anomaly. The data show the concentration risk was documented, quantified, and reported for three years before it arrived.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    subCluster: 'Markets & Compliance',
    publishedDate: "2026-04-12",
    readTimeMinutes: 7,
    link: "/insights/microsoft-cdr-market-pause",
  },
  {
    title: "India's CCUS Gap Is Not About Money",
    description: "Five regulatory instruments the ₹20,000 crore CCUS Mission cannot substitute - policy analysis on pore space law, sequestration incentives, and test infrastructure.",
    contentType: 'Flagship Report',
    topic: 'Regulatory Intel',
    publishedDate: "2026-04-06",
    readTimeMinutes: 10,
    link: "/insights/ccus-policy-gap",
  },
  {
    title: "India NDC 3.0 - Complete Visual Analysis",
    description: "India's third Nationally Determined Contribution decoded in charts and data - targets, timelines, sector pledges, and what it means for corporate India.",
    contentType: 'Intelligence Brief',
    topic: 'Regulatory Intel',
    publishedDate: "2026-04-01",
    readTimeMinutes: 12,
    link: "/special-features/india-ndc3.html",
    external: true,
  },
  {
    title: "India's Carbon Playbook: PAT Lessons, CCTS Rules & the Article 6 Opportunity",
    description: "The definitive strategic guide for Indian boards navigating carbon compliance and international market opportunities.",
    contentType: 'Flagship Report',
    topic: 'Carbon Markets',
    publishedDate: "2026-03-01",
    readTimeMinutes: 12,
    link: "/insights/carbon-playbook",
  },
  {
    title: "WEF Global Risks Report 2026: Climate & Geopolitical Volatility",
    description: "How the intersection of climate, geopolitics, and economic fragility reshapes risk for Indian enterprises.",
    contentType: 'Flagship Report',
    topic: 'Board Governance',
    publishedDate: "2026-01-20",
    readTimeMinutes: 10,
    link: "/insights/wef-global-risks-2026",
  },
  {
    title: "The One Emitter the Paris Agreement Forgot to Name",
    description: "Every climate treaty ever signed has a missing line - the world's militaries collectively emit more greenhouse gases than all but two nations.",
    contentType: 'Perspective',
    topic: 'Regulatory Intel',
    publishedDate: "2026-03-01",
    readTimeMinutes: 18,
    link: "/special-features/war-climate.html",
    external: true,
  },
  {
    title: "India's Renewable Grid at Breaking Point",
    description: "Strategic analysis of the 203 GW grid crisis, thermal-RE gaps, and the ₹3.4 lakh crore infrastructure investment required.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    subCluster: 'Power & Transition',
    publishedDate: "2026-02-09",
    readTimeMinutes: 8,
    link: "/insights/india-renewable-grid-analysis",
  },
  {
    title: "Working for the Earth: A Dialectic Discourse",
    description: "The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected.",
    contentType: 'Intelligence Brief',
    topic: 'ESG Communications',
    publishedDate: "2026-02-06",
    readTimeMinutes: 14,
    link: "/insights/working-for-the-earth",
  },
  {
    title: "Jobs on the Rise 2026: India Green Jobs Outlook",
    description: "Comprehensive analysis of India's green jobs landscape aligned with Net-Zero 2070 goals.",
    contentType: 'Intelligence Brief',
    topic: 'ESG Communications',
    publishedDate: "2026-01-17",
    readTimeMinutes: 9,
    link: "/insights/green-jobs-india-2026",
  },
  {
    title: "From Compliance to Credibility: A CXO Guide to CCTS & CBAM",
    description: "Strategic frameworks to transform carbon compliance into competitive advantage.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    subCluster: 'Markets & Compliance',
    publishedDate: "2025-10-20",
    readTimeMinutes: 8,
    link: "/insights/compliance-to-credibility",
  },
  {
    title: "Carbon Market Outlook 2025-2030: An Investor's Deep Dive",
    description: "Complete investor's guide to India's $1.4B carbon market opportunity.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    subCluster: 'Markets & Compliance',
    publishedDate: "2025-10-15",
    readTimeMinutes: 10,
    link: "/insights/carbon-market-outlook",
  },
  {
    title: "Energy Transition Playbook",
    description: "Strategic roadmap for India's energy transition and decarbonisation pathways.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    subCluster: 'Power & Transition',
    publishedDate: "2025-08-15",
    readTimeMinutes: 9,
    link: "/insights/energy-transition-playbook",
  },
];

const ITEMS_PER_PAGE = 6;

const Insights = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ContentType | 'All Types'>('All Types');
  const [currentPage, setCurrentPage] = useState(1);


  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTopic, selectedType]);

  const flagshipReports = publications.filter(p => p.contentType === 'Flagship Report');

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      if (selectedTopic !== 'All' && pub.topic !== selectedTopic) return false;
      if (selectedType !== 'All Types' && pub.contentType !== selectedType) return false;
      return true;
    });
  }, [selectedTopic, selectedType]);

  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredPublications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Section-level navigation: define IDs and labels.
  // "flagship" is conditionally rendered (only when no filters active),
  // so the nav adapts to whichever sections are currently in the DOM.
  const showFlagship = selectedTopic === 'All' && selectedType === 'All Types';
  const sections = useMemo(() => {
    const s: { id: string; label: string }[] = [];
    // Premium Access Lounge — paid funnel sits at the top of the page.
    // These ids exist regardless of search/filter state.
    s.push({ id: 'lounge', label: 'Lounge' });
    s.push({ id: 'tier-finder', label: 'Find your plan' });
    s.push({ id: 'industry', label: 'Readers say' });
    s.push({ id: 'tiers', label: 'Tiers' });
    s.push({ id: 'readers', label: 'Who reads' });
    s.push({ id: 'sponsor', label: 'Sponsor' });
    // Editorial hub below — flagship is conditional on no active filter.
    if (showFlagship) s.push({ id: 'flagship', label: 'Flagship' });
    s.push({ id: 'all-intelligence', label: 'All Intelligence' });
    s.push({ id: 'subscribe', label: 'Subscribe' });
    return s;
  }, [showFlagship]);

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Default to first section on mount / when section list changes
    setActiveSection(sections[0]?.id || '');

    const getElements = () =>
      sections
        .map(s => document.getElementById(s.id))
        .filter((el): el is HTMLElement => el !== null);

    // Scroll-based active detection: the active section is the last one
    // whose top has crossed below the sticky-nav offset. This avoids the
    // duplicate / flicker behaviour of an IntersectionObserver when several
    // sections overlap the viewport at the same time.
    const OFFSET = 200; // sticky header (~64px) + nav (~44px) + buffer
    let raf = 0;
    const update = () => {
      raf = 0;
      const els = getElements();
      if (els.length === 0) return;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - OFFSET <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 140;
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
    setActiveSection(id);
  }, []);


  /**
   * Static-asset paths (e.g. /special-features/foo.html) MUST be served by
   * the hosting layer, not by React Router. Detect them so we render a real
   * <a> tag and a full document load - this is correct for both same-tab
   * clicks AND modifier-key (cmd/ctrl/middle-click) "open in new tab".
   *
   * A path is treated as a static asset when:
   *  - the publication is flagged `external: true`, OR
   *  - the link starts with /special-features/, OR
   *  - the link ends with .html / .pdf
   */
  const isStaticAssetLink = (pub: Publication): boolean => {
    if (!pub.link) return false;
    if (pub.external) return true;
    if (pub.link.startsWith('/special-features/')) return true;
    return /\.(html?|pdf)$/i.test(pub.link);
  };

  const renderListingCard = (pub: Publication, index: number | string) => {
    const fresh = isNewPublication(pub.publishedDate);
    const inner = (
      <div className={`flex items-start justify-between py-5 border-b transition-colors ${fresh ? 'border-accent/40 group-hover:border-accent' : 'border-border/30 group-hover:border-primary/30'}`}>
        <div className="min-w-0 pr-6">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2 py-0.5 border rounded text-[10px] font-semibold tracking-wider uppercase ${contentTypeColors[pub.contentType]}`}>
              {pub.contentType}
            </span>
            <span className="px-2 py-0.5 border border-border rounded text-[10px] text-muted-foreground">
              {pub.topic}
            </span>
            {fresh && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-accent text-accent-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-foreground opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-foreground"></span>
                </span>
                New
              </span>
            )}
          </div>
          <h3 className="font-semibold text-[15px] text-foreground group-hover:text-primary transition-colors">
            {pub.title}
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1 line-clamp-1">{pub.description}</p>
        </div>
        <div className="flex-shrink-0 text-right text-[11px] text-muted-foreground/60 pl-5">
          {pub.readTimeMinutes} min read
        </div>
      </div>
    );

    if (!pub.link) {
      return <div key={index} className="block group cursor-default">{inner}</div>;
    }

    if (isStaticAssetLink(pub)) {
      // Real <a>: triggers a full document load so the hosting layer serves
      // the static file. target="_blank" keeps the synthesis page intact.
      return (
        <a
          key={index}
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          {inner}
        </a>
      );
    }

    // Internal SPA route - use React Router for client-side navigation.
    return <Link key={index} to={pub.link} className="block group">{inner}</Link>;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHead
        title="Insights: India research on carbon markets, governance and regulation | Bombay Breed"
        description="Editorial briefs and long-form research from Bombay Breed on India's carbon markets, board governance, ESG communications, and regulatory intelligence. Curated by Theresa Ronnie."
        path="/insights"
        ogImage="og-insights"
      />
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Editor's note. Personal, first-person, framing the hub. Follows the
            About page voice: measured, specific, no marketing filler. */}
        <section className="pt-12 pb-8 md:pt-16 md:pb-10 px-6 md:px-8">
          <div className="container mx-auto max-w-[720px]">
            <ScrollReveal direction="up">
              <SectionLabel label="Editor's note  ·  Theresa Ronnie" />
              <h1 className="mt-6 font-serif text-4xl md:text-6xl tracking-tight leading-[1.05] text-foreground [text-wrap:balance]">
                Insights from Bombay Breed.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed [text-wrap:pretty]">
                India research on carbon markets, board governance, ESG communications, and regulatory
                intelligence. Every brief here is written to be useful to a board that has to make a decision
                this quarter, not next year. Sourced, dated, and short enough to read on a plane.
              </p>
              <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            </ScrollReveal>
          </div>
        </section>

        {/* Climate Series highlight — surfaces the 5-piece Europe-India series
            as a dedicated set so readers see it as a series, not scattered pieces. */}
        <section className="px-6 md:px-8 py-10 md:py-14 border-t border-border/60 bg-secondary/30">
          <div className="container mx-auto max-w-[900px] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-[560px]">
              <SectionLabel label="Climate Series  ·  Article 01 of 05 live" />
              <h2 className="mt-4 font-serif text-2xl md:text-3xl tracking-tight leading-tight text-foreground [text-wrap:balance]">
                What Europe got wrong that India must not repeat.
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed [text-wrap:pretty]">
                A five-piece investor and policy brief on why European infrastructure and bodies are failing at
                temperatures the Gulf and South Asia absorb routinely. Published fortnightly through mid-September.
              </p>
            </div>
            <Link
              to="/series/europe-india"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Open the series
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>


        {/* Featured spotlight — the newest flagship as a single large card.
            Modelled on how Bain and McKinsey open their Insights hubs with a
            hero piece rather than a grid. */}
        {showFlagship && flagshipReports[0] && (() => {
          const spotlight = flagshipReports[0];
          const fresh = isNewPublication(spotlight.publishedDate);
          const inner = (
            <article className="group relative bg-secondary/40 border border-border rounded-2xl p-8 md:p-12 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="text-[10px] font-bold tracking-widest uppercase text-accent">
                  Featured  ·  {spotlight.contentType}
                </span>
                {fresh && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent text-accent-foreground">
                    New
                  </span>
                )}
                <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
                  {spotlight.topic}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors [text-wrap:balance]">
                {spotlight.title}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[70ch] mb-6 [text-wrap:pretty]">
                {spotlight.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono uppercase tracking-wider">
                <span>{spotlight.readTimeMinutes} minute read</span>
                <span className="text-border">/</span>
                <span>Read the brief →</span>
              </div>
            </article>
          );
          if (!spotlight.link) return null;
          const wrapped = isStaticAssetLink(spotlight) ? (
            <a href={spotlight.link} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
          ) : (
            <Link to={spotlight.link} className="block">{inner}</Link>
          );
          return (
            <section id="featured" className="px-6 md:px-8 py-10 md:py-14 border-t border-border/50">
              <div className="container mx-auto max-w-[900px]">
                {wrapped}
              </div>
            </section>
          );
        })()}

        {/* Explore by theme — thematic buckets. Each pillar shows 3 top pieces
            and a "View all in [topic]" link that scrolls to the full library
            filtered to that topic. Modelled on how KPMG and Bain group by
            Capability/Industry so a visitor can browse editorially. */}
        {showFlagship && (
          <section id="by-theme" className="px-6 md:px-8 py-14 md:py-20 border-t border-border/50 bg-secondary/20">
            <div className="container mx-auto max-w-[1200px]">
              <div className="max-w-[720px] mb-10 md:mb-14">
                <SectionLabel label="Explore by theme" />
                <h2 className="mt-5 font-serif text-3xl md:text-4xl tracking-tight leading-tight text-foreground [text-wrap:balance]">
                  Four ways to read the year.
                </h2>
                <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed [text-wrap:pretty]">
                  Every brief here lives in one of four themes. Pick the one that maps to the decision on your desk.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {allTopics.map(topic => {
                  const themeCopy: Record<Topic, string> = {
                    'Carbon Markets': "How Indian enterprises price, trade and disclose carbon. Compliance mechanisms and international opportunity, from CCTS to Article 6.",
                    'Board Governance': "Climate risk as a board-level decision. Fiduciary duty, transition planning, and the compound risks the C-suite is still under-pricing.",
                    'ESG Communications': "Making sustainability strategy legible to investors, employees, regulators and the public without greenwashing.",
                    'Regulatory Intel': "What Indian and international regulators are about to require. BRSR, EPBD, CBAM, and the policy signals that shape corporate plans.",
                  };
                  const pieces = publications.filter(p => p.topic === topic).slice(0, 3);
                  const clusterAnchor = `cluster-${topic.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <div key={topic} className="bg-background border border-border rounded-2xl p-6 md:p-8 flex flex-col">
                      <div className="mb-6 pb-6 border-b border-border/60">
                        <div className="text-[10px] font-bold tracking-widest uppercase text-accent mb-3">
                          {topic}
                        </div>
                        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed [text-wrap:pretty]">
                          {themeCopy[topic]}
                        </p>
                      </div>
                      <ul className="space-y-4 flex-1">
                        {pieces.map((p, i) => (
                          <li key={i}>
                            <Link
                              to={p.external ? '#' : (p.link || '#')}
                              {...(p.external && p.link ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              className="group block"
                            >
                              <div className="font-serif text-base md:text-lg text-foreground leading-snug group-hover:text-primary transition-colors [text-wrap:balance]">
                                {p.title}
                              </div>
                              <div className="mt-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                                {p.contentType}  ·  {p.readTimeMinutes} min
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={`#${clusterAnchor}`}
                        onClick={() => setSelectedTopic(topic)}
                        className="mt-6 pt-6 border-t border-border/60 inline-flex items-center gap-2 text-sm font-medium text-primary group hover:gap-3 transition-all"
                      >
                        View all in {topic}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* All Intelligence Listing — topic-clustered when unfiltered, flat list when filtered */}
        <section id="all-intelligence" className="py-8 px-6 md:px-8 border-t border-border/50 scroll-mt-32">
          <div className="container mx-auto max-w-[900px]">
            {/* JSON-LD ItemList for the brief library — helps search engines see the cluster structure */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'ItemList',
                  name: 'Bombay Breed Intelligence Briefs',
                  description:
                    'India-focused research and analysis on carbon markets, board governance, ESG communications, and regulatory intelligence.',
                  itemListElement: filteredPublications
                    .filter(p => !!p.link)
                    .map((p, i) => ({
                      '@type': 'ListItem',
                      position: i + 1,
                      url: p.external ? p.link : `https://bombaybreed.com${p.link}`,
                      name: p.title,
                    })),
                }),
              }}
            />

            {/* Full library — the scroll target for "View all in [topic]" jumps
                from the Explore by theme grid above. Clustered by topic so a
                visitor lands directly on the theme they want. */}
            <header className="mb-8 max-w-[640px] pt-4">
              <SectionLabel label="Full library" />
              <h2 className="mt-5 font-serif text-3xl md:text-4xl tracking-tight leading-[1.1] text-foreground mb-3 [text-wrap:balance]">
                Every brief, indexed by theme.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed [text-wrap:pretty]">
                Use the theme jumps above, or scroll the archive. Each brief carries its topic, publication date and read time.
              </p>
            </header>

            {/* Filter bar removed per editorial direction. */}

            {/* In the clustered (unfiltered) view, flagships live exclusively in
                the Flagship band above. The cluster shelves below show only the
                non-flagship library to avoid double-listing. */}
            {(() => {
              const clusterPool = showFlagship
                ? filteredPublications.filter(p => p.contentType !== 'Flagship Report')
                : filteredPublications;
              return (
                <div className="flex items-baseline justify-between mb-3 pl-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    All Intelligence · {clusterPool.length} {clusterPool.length === 1 ? 'item' : 'items'}
                  </span>
                  {showFlagship && (
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/70 hidden md:block">
                      Grouped by topic cluster
                    </span>
                  )}
                </div>
              );
            })()}

            {filteredPublications.length === 0 ? (
              <div className="border border-border/60 bg-secondary/20 px-6 py-12 md:py-16 text-center">
                <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  No matches
                </div>
                <h2 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                  Nothing in the library matches that combination.
                </h2>
                <p className="text-sm text-muted-foreground max-w-[52ch] mx-auto mb-6">
                  The current topic and type combination has no published briefs yet. Reset filters to see the full archive, or pick a different topic.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => { setSelectedTopic('All'); setSelectedType('All Types'); }}
                    className="inline-flex items-center px-4 py-2 text-[12px] font-medium tracking-wide bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-full"
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            ) : showFlagship ? (
              // Topic-cluster grouping for SEO - each cluster gets a real H2.
              // Flagships are excluded here (rendered in the band above).
              <div className="space-y-10">
                {allTopics.map(topic => {
                  const clusterItems = filteredPublications.filter(
                    p => p.topic === topic && p.contentType !== 'Flagship Report'
                  );
                  if (clusterItems.length === 0) return null;
                  const clusterId = `cluster-${topic.toLowerCase().replace(/\s+/g, '-')}`;

                  // Carbon Markets is large enough to warrant sub-shelves.
                  // Other topics render as a single ordered list.
                  const subOrder: SubCluster[] = ['Markets & Compliance', 'Power & Transition'];
                  const hasSubClusters =
                    topic === 'Carbon Markets' &&
                    clusterItems.some(p => !!p.subCluster);

                  return (
                    <div key={topic} id={clusterId} className="scroll-mt-32">
                      <div className="flex items-baseline justify-between border-b border-border/60 pb-2 mb-3">
                        <h2 className="text-[15px] md:text-base font-serif text-foreground">
                          {topic}
                        </h2>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                          {clusterItems.length} {clusterItems.length === 1 ? 'brief' : 'briefs'}
                        </span>
                      </div>

                      {hasSubClusters ? (
                        <div className="space-y-5">
                          {subOrder.map(sub => {
                            const subItems = clusterItems.filter(p => p.subCluster === sub);
                            if (subItems.length === 0) return null;
                            return (
                              <div key={sub}>
                                <h3 className="text-[12px] italic font-serif text-muted-foreground mb-1 mt-2">
                                  {sub}
                                </h3>
                                <div>
                                  {subItems.map((pub, index) =>
                                    renderListingCard(pub, `${topic}-${sub}-${index}`)
                                  )}
                                </div>
                              </div>
                            );
                          })}
                          {/* Any briefs in Carbon Markets without an explicit sub-cluster */}
                          {(() => {
                            const orphans = clusterItems.filter(p => !p.subCluster);
                            if (orphans.length === 0) return null;
                            return (
                              <div>
                                {orphans.map((pub, index) =>
                                  renderListingCard(pub, `${topic}-orphan-${index}`)
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        <div>
                          {clusterItems.map((pub, index) => renderListingCard(pub, `${topic}-${index}`))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                {paginatedItems.map((pub, index) => renderListingCard(pub, index))}
              </div>
            )}

            {/* Pagination — only relevant for the flat filtered view */}
            {!showFlagship && totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8 text-sm text-muted-foreground">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  ← Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-2 ${currentPage === i + 1 ? 'text-foreground font-semibold' : 'hover:text-foreground'} transition-colors`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter — free. Substack. Same door as every other reader. */}
        <section className="mt-16 md:mt-20 px-6 md:px-8">
          <div className="container mx-auto max-w-[720px] border-t border-border pt-12 md:pt-16 text-center">
            <SectionLabel label="Stay close" />
            <h2 className="mt-5 font-serif text-3xl md:text-4xl tracking-tight leading-tight text-foreground">
              The Climate Desk newsletter.
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed [text-wrap:balance]">
              Free. Every brief here lands in your inbox on the morning it goes live. Read by climate investors,
              policy leads, and sustainability heads across India, the UK, and the Gulf.
            </p>
            <a
              href="https://www.theclimatedesk.earth"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 font-sans text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Subscribe on Substack
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Insights;
