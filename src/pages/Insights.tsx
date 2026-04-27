import React, { useState, useRef, useMemo, useEffect } from 'react';
import PageHead from '@/components/PageHead';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';


type ContentType = 'Flagship Report' | 'Intelligence Brief' | 'Regulatory Alert' | 'Perspective';
type Topic = 'Carbon Markets' | 'Board Governance' | 'ESG Communications' | 'Regulatory Intel';

interface Publication {
  title: string;
  description: string;
  contentType: ContentType;
  topic: Topic;
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
    description: "Why Himachal Pradesh's climate exposure is India's exposure. A restoration-economy thesis with four supporting interactive briefs on produce, crop hardiness, compounding losses, and the vanishing winter.",
    contentType: 'Flagship Report',
    topic: 'Carbon Markets',
    publishedDate: "2026-04-25",
    readTimeMinutes: 18,
    link: "/special-features/tcd-hp-investor-synthesis.html",
    external: true,
  },
  {
    title: "The Market That Ran on One Buyer",
    description: "Microsoft's pause on carbon removal purchases is not a corporate anomaly. The data show the concentration risk was documented, quantified, and reported for three years before it arrived.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
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
    title: "India Power Sector Investment Presentation",
    description: "India's ₹4.5 lakh crore power revolution: generation transition, nuclear targets, and grid-scale storage opportunities.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    publishedDate: "2026-01-22",
    readTimeMinutes: 7,
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
    title: "Mining the Transition: A Climate-Critical Minerals Risk Framework",
    description: "Risk framework for climate-critical minerals investment - lithium, cobalt, nickel, copper, and rare earths.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    publishedDate: "2025-12-15",
    readTimeMinutes: 6,
  },
  {
    title: "Asia Climate Emissions and Article 6: Comparative Policy Grade",
    description: "Asia's climate emissions landscape and comparative policy grading under Article 6 of the Paris Agreement.",
    contentType: 'Intelligence Brief',
    topic: 'Regulatory Intel',
    publishedDate: "2025-12-10",
    readTimeMinutes: 7,
  },
  {
    title: "India's Climate Inflection Point",
    description: "Critical analysis of India's pivotal moment in climate transition.",
    contentType: 'Perspective',
    topic: 'Board Governance',
    publishedDate: "2025-11-15",
    readTimeMinutes: 5,
  },
  {
    title: "From Compliance to Credibility: A CXO Guide to CCTS & CBAM",
    description: "Strategic frameworks to transform carbon compliance into competitive advantage.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    publishedDate: "2025-10-20",
    readTimeMinutes: 8,
    link: "/insights/compliance-to-credibility",
  },
  {
    title: "Carbon Market Outlook 2025-2030: An Investor's Deep Dive",
    description: "Complete investor's guide to India's $1.4B carbon market opportunity.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    publishedDate: "2025-10-15",
    readTimeMinutes: 10,
    link: "/insights/carbon-market-outlook",
  },
  {
    title: "Energy Transition Playbook",
    description: "Strategic roadmap for India's energy transition and decarbonisation pathways.",
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
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
  const formSectionRef = useRef<HTMLDivElement>(null);


  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
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

  const renderListingCard = (pub: Publication, index: number) => {
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
        title="Bombay Breed: Intelligence Briefs"
        description="Original research and strategic analysis on carbon markets, ESG governance, and sustainability communications in India."
        path="/insights"
        ogImage="og-insights"
      />
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 px-6 md:px-8">
          <div className="container mx-auto max-w-[900px]">
            <ScrollReveal direction="up">
              <SectionLabel label="Research & Analysis" />
              <h1 className="text-display font-serif tracking-tight mt-6 mb-6">
                Intelligence Briefs
              </h1>
              <p className="text-lede text-muted-foreground max-w-[560px]">
                Original research and strategic analysis on carbon markets, ESG governance,
                and sustainability communications in India.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search */}
        <section className="px-6 md:px-8 pb-4">
          <div className="container mx-auto max-w-[900px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search intelligence briefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 md:px-8 pb-8">
          <div className="container mx-auto max-w-[900px] space-y-3">
            {/* Topic filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTopic('All')}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  selectedTopic === 'All'
                    ? 'bg-foreground text-background'
                    : 'border border-border text-foreground hover:bg-secondary'
                }`}
              >
                All
              </button>
              {allTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    selectedTopic === topic
                      ? 'bg-foreground text-background'
                      : 'border border-border text-foreground hover:bg-secondary'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Content type filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedType('All Types')}
                className={`px-3 py-1 rounded-2xl text-xs font-medium transition-colors ${
                  selectedType === 'All Types'
                    ? 'bg-foreground text-background'
                    : 'border border-border text-foreground hover:bg-secondary'
                }`}
              >
                All Types
              </button>
              {allContentTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-2xl text-xs font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-foreground text-background'
                      : `border border-border hover:bg-secondary ${contentTypeColors[type]}`
                  }`}
                >
                  {type === 'Flagship Report' ? 'Flagship Reports' :
                   type === 'Intelligence Brief' ? 'Intelligence Briefs' :
                   type === 'Regulatory Alert' ? 'Regulatory Alerts' : 'Perspectives'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Flagship Research */}
        {selectedTopic === 'All' && selectedType === 'All Types' && !searchQuery && (
          <section className="px-6 md:px-8 pb-8">
            <div className="container mx-auto max-w-[900px]">
              <span className="text-[10px] font-bold tracking-widest uppercase text-accent mb-3 block pl-1">
                Flagship Research
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {flagshipReports.map((report, i) => {
                  const content = (
                    <div className="bg-secondary/30 border border-border rounded-xl p-8 h-full flex flex-col justify-between group-hover:border-primary/30 transition-colors">
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-primary text-primary-foreground mb-3`}>
                          Flagship Report
                        </span>
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

        {/* All Intelligence Listing */}
        <section className="py-8 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[900px]">
            <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 block pl-1">
              All Intelligence · {filteredPublications.length} items
            </span>

            <div>
              {paginatedItems.map((pub, index) => renderListingCard(pub, index))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
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

        {/* Newsletter CTA */}
        <section className="py-16 md:py-24 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[900px] text-center">
            <ScrollReveal direction="up">
              <h2 className="text-section font-serif tracking-tight mb-3">
                Subscribe to Intelligence Briefs
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Original research on carbon markets and ESG governance. Published monthly.
              </p>
              <Button asChild>
                <a href="https://theclimatedesk.substack.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  Subscribe on Substack <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </ScrollReveal>
          </div>
        </section>

        {/* Download CTA - CCUS Report */}
        <section ref={formSectionRef} className="py-20 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[680px]">
            <div className="text-center mb-12">
              <SectionLabel label="Download Report" className="text-center block" />
              <h2 className="text-section font-serif tracking-tight mt-6 mb-4">India's CCUS Gap Is Not About Money</h2>
              <p className="text-body text-muted-foreground">Five regulatory instruments the ₹20,000 crore CCUS Mission cannot substitute - a policy analysis by The Climate Desk.</p>
            </div>
            <LeadCaptureForm reportTitle="India's CCUS Gap Is Not About Money" reportDescription="Five regulatory instruments the ₹20,000 crore CCUS Mission cannot substitute." />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
