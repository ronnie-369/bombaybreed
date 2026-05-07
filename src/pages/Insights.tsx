import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PageHead from '@/components/PageHead';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

import { trackSponsorEvent } from '@/utils/sponsorAnalytics';
import LadderHero from '@/components/insights/LadderHero';
import LadderStickyPill from '@/components/insights/LadderStickyPill';
import TierFinder from '@/components/insights/TierFinder';


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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ContentType | 'All Types'>('All Types');
  const [currentPage, setCurrentPage] = useState(1);


  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTopic, selectedType]);

  /**
   * Search-query intelligence: when the user types a meaningful query (>= 3 chars)
   * and stops for 1.2s, log the query + active filters + result count to Formspree.
   * This gives Theresa a feed of what readers are actually trying to find -
   * surfacing demand for new briefs and content gaps - without storing PII or
   * spamming an event per keystroke.
   *
   * Re-fires only when the (query, topic, type) tuple changes.
   */
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myknnoea';
  const lastLoggedRef = React.useRef<string>('');
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 3) return;

    const signature = `${trimmed.toLowerCase()}|${selectedTopic}|${selectedType}`;
    if (signature === lastLoggedRef.current) return;

    const timer = window.setTimeout(() => {
      // Recompute result count locally to avoid coupling to render order
      const q = trimmed.toLowerCase();
      const matches = publications.filter(pub => {
        if (!pub.title.toLowerCase().includes(q) && !pub.description.toLowerCase().includes(q)) return false;
        if (selectedTopic !== 'All' && pub.topic !== selectedTopic) return false;
        if (selectedType !== 'All Types' && pub.contentType !== selectedType) return false;
        return true;
      }).length;

      lastLoggedRef.current = signature;

      // Fire-and-forget; failures are silent (this is observability, not UX).
      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Insights search: "${trimmed}" (${matches} results)`,
          form_type: 'insights_search_query',
          query: trimmed,
          topic: selectedTopic,
          content_type: selectedType,
          result_count: matches,
          page_path: typeof window !== 'undefined' ? window.location.pathname : '/insights',
          referrer: typeof document !== 'undefined' ? document.referrer || '(direct)' : '',
          logged_at: new Date().toISOString(),
        }),
      }).catch(() => { /* silent */ });
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [searchQuery, selectedTopic, selectedType]);

  const flagshipReports = publications.filter(p => p.contentType === 'Flagship Report');

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!pub.title.toLowerCase().includes(q) && !pub.description.toLowerCase().includes(q)) return false;
      }
      if (selectedTopic !== 'All' && pub.topic !== selectedTopic) return false;
      if (selectedType !== 'All Types' && pub.contentType !== selectedType) return false;
      return true;
    });
  }, [searchQuery, selectedTopic, selectedType]);

  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredPublications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Section-level navigation: define IDs and labels.
  // "flagship" is conditionally rendered (only when no filters/search active),
  // so the nav adapts to whichever sections are currently in the DOM.
  const showFlagship = selectedTopic === 'All' && selectedType === 'All Types' && !searchQuery;
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
        title="TCD Intelligence — Premium Access Lounge & Briefs"
        description="Membership and corporate sponsorship for original India-focused research on carbon markets, regulation, and climate exposure. Plus the full library of intelligence briefs."
        path="/insights"
        ogImage="og-insights"
      />
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero - H1 only. Search + filters now sit directly above the
            "All Intelligence" library, where readers actually scan resources. */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-8 px-6 md:px-8">
          <div className="container mx-auto max-w-[900px]">
            <ScrollReveal direction="up">
              <h1 className="text-display font-serif tracking-tight mb-2">
                Intelligence Briefs
              </h1>
              <p className="text-sm text-muted-foreground max-w-[60ch]">
                India research on carbon markets, governance, and regulation.
              </p>
              <p className="mt-3 text-[12px] sm:text-[13px] leading-snug text-foreground/80 max-w-[36ch] sm:max-w-[60ch]">
                <span className="sm:hidden">Browse reports below, or take the 3-question quiz to find your tier.</span>
                <span className="hidden sm:inline">Browse the full library of reports and briefs below, or take the 3-question quiz to find the membership tier that fits.</span>
              </p>
            </ScrollReveal>
          </div>
        </section>


        {/* Guided tier selector - 3 questions to a recommended plan with
            direct routing to signup. Sits between the ladder strip and the
            sticky section nav so visitors can self-qualify before browsing. */}
        <TierFinder />

        {/* Section Navigation - sticky, highlights active section on scroll */}
        <nav
          aria-label="Insights sections"
          className="sticky top-16 z-30 bg-background/85 backdrop-blur-md border-y border-border/40 px-6 md:px-8"
        >
          <div className="container mx-auto max-w-[900px]">
            <ul className="flex gap-1 overflow-x-auto py-2 -mx-1 px-1 scrollbar-none">
              {sections.map(s => {
                const isActive = activeSection === s.id;
                return (
                  <li key={s.id} className="flex-shrink-0">
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => handleNavClick(e, s.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`inline-block px-3 py-1.5 rounded-full text-[12px] font-medium tracking-wide transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        isActive
                          ? 'bg-foreground text-background'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>


        {/* Flagship Research */}
        {showFlagship && (
          <section id="flagship" className="px-6 md:px-8 pb-8 pt-8 scroll-mt-32 border-t border-border/50">
            <div className="container mx-auto max-w-[900px]">
              <span className="text-[10px] font-bold tracking-widest uppercase text-accent mb-3 block pl-1">
                Flagship Research
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {flagshipReports.map((report, i) => {
                  const fresh = isNewPublication(report.publishedDate);
                  const content = (
                    <div className={`relative bg-secondary/30 border rounded-xl p-8 h-full flex flex-col justify-between transition-colors ${fresh ? 'border-accent ring-1 ring-accent/30 shadow-[0_8px_24px_-12px_hsl(var(--accent)/0.4)] group-hover:border-accent group-hover:ring-accent/50' : 'border-border group-hover:border-primary/30'}`}>
                      {fresh && (
                        <span className="absolute -top-2.5 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent text-accent-foreground shadow-md">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-foreground opacity-60"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-foreground"></span>
                          </span>
                          New
                        </span>
                      )}
                      <div>
                        <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {report.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">{report.description}</p>
                      </div>
                      <div className="text-[11px] text-muted-foreground/50 mt-4">
                        {report.readTimeMinutes} min read
                      </div>
                    </div>
                  );
                  if (!report.link) {
                    return <div key={i} className="group">{content}</div>;
                  }
                  if (isStaticAssetLink(report)) {
                    return (
                      <a
                        key={i}
                        href={report.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        {content}
                      </a>
                    );
                  }
                  return <Link key={i} to={report.link} className="block group">{content}</Link>;
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

            {/* Section header - this is the scroll target for the
                "Free library" CTA, so readers need a clear anchor on arrival. */}
            <header className="mb-8 max-w-[640px]">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-3">
                Free library
              </p>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-[1.1] text-foreground mb-3 [text-wrap:balance]">
                The full library, open to all
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed [text-wrap:pretty]">
                Every brief and report. Search or filter by topic and format.
              </p>
            </header>

            {/* Search + filter bar - sticky below the section nav so readers
                can keep filtering as they scroll the resources below. */}
            <div className="sticky top-[6.75rem] md:top-[7rem] z-20 -mx-6 md:-mx-8 px-6 md:px-8 py-3 mb-6 bg-background/90 backdrop-blur-md border-y border-border/40 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="insights-search"
                  aria-label="Search intelligence briefs"
                  placeholder="Search the library - title, topic, or theme..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background h-9"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-muted-foreground tracking-wider uppercase mr-1">Quick search:</span>
                {['NDC', 'Article 6', 'CBAM', 'CCTS', 'Energy', 'Steel', 'Cement', 'Removal', 'CDR'].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setSearchQuery(kw)}
                    className={`px-2 py-0.5 rounded-full border transition-colors ${
                      searchQuery.toLowerCase() === kw.toLowerCase()
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-foreground/80 hover:bg-secondary'
                    }`}
                  >
                    {kw}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex gap-1.5 flex-wrap">
                  <button
                    onClick={() => setSelectedTopic('All')}
                    className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
                      selectedTopic === 'All'
                        ? 'bg-foreground text-background'
                        : 'border border-border text-foreground hover:bg-secondary'
                    }`}
                  >
                    All topics
                  </button>
                  {allTopics.map(topic => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
                        selectedTopic === topic
                          ? 'bg-foreground text-background'
                          : 'border border-border text-foreground hover:bg-secondary'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                <span className="hidden md:inline text-border" aria-hidden>·</span>

                <div className="flex gap-1.5 flex-wrap">
                  <button
                    onClick={() => setSelectedType('All Types')}
                    className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
                      selectedType === 'All Types'
                        ? 'bg-foreground text-background'
                        : 'border border-border text-foreground hover:bg-secondary'
                    }`}
                  >
                    All types
                  </button>
                  {allContentTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
                        selectedType === type
                          ? 'bg-foreground text-background'
                          : `border border-border hover:bg-secondary ${contentTypeColors[type]}`
                      }`}
                    >
                      {type === 'Flagship Report' ? 'Flagship' :
                       type === 'Intelligence Brief' ? 'Brief' :
                       type === 'Regulatory Alert' ? 'Alert' : 'Perspective'}
                    </button>
                  ))}
                </div>

                {(searchQuery || selectedTopic !== 'All' || selectedType !== 'All Types') && (
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedTopic('All'); setSelectedType('All Types'); }}
                    className="ml-auto text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

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

            {/* Sponsored research callout — non-duplicating link to the existing #sponsor block */}
            <a
              href="#sponsor"
              onClick={() =>
                trackSponsorEvent('sponsor_callout_click', {
                  location: 'insights_grid',
                  link_url: '#sponsor',
                  link_text: 'Sponsored research callout',
                })
              }
              className="group flex items-center justify-between gap-4 mb-6 px-4 py-3 border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-0.5">
                  Sponsored research
                </div>
                <div className="text-[13px] text-foreground line-clamp-1">
                  Underwrite a topic - your name on a year of India research.
                </div>
              </div>
              <span className="flex-shrink-0 text-[12px] text-foreground/80 group-hover:text-foreground transition-colors">
                See sponsor terms →
              </span>
            </a>

            {filteredPublications.length === 0 ? (
              <div className="border border-border/60 bg-secondary/20 px-6 py-12 md:py-16 text-center">
                <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  No matches
                </div>
                <h2 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                  Nothing in the library matches that combination.
                </h2>
                <p className="text-sm text-muted-foreground max-w-[52ch] mx-auto mb-6">
                  {searchQuery
                    ? <>We could not find a brief for <span className="text-foreground">"{searchQuery}"</span>{(selectedTopic !== 'All' || selectedType !== 'All Types') && ' under the current filters'}. Try a broader keyword, or reset to browse the full archive.</>
                    : <>The current topic and type combination has no published briefs yet. Reset filters to see the full archive, or pick a different topic.</>}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedTopic('All'); setSelectedType('All Types'); }}
                    className="inline-flex items-center px-4 py-2 text-[12px] font-medium tracking-wide bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-full"
                  >
                    Reset search & filters
                  </button>
                  <a
                    href="#tier-finder"
                    className="inline-flex items-center px-4 py-2 text-[12px] font-medium tracking-wide border border-border text-foreground hover:bg-secondary transition-colors rounded-full"
                  >
                    Find your plan
                  </a>
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

      </main>

      <Footer />
      <LadderStickyPill />
    </div>
  );
};

export default Insights;
