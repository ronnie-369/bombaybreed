import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import FeaturedReportsCarousel from '@/components/FeaturedReportsCarousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, TrendingUp, Newspaper, ExternalLink, Search, X, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import SpecialFeatureHighlight from '@/components/SpecialFeatureHighlight';
import { format } from 'date-fns';
import wefCoverImage from '@/assets/wef-global-risks-2026-cover.jpg';
import greenJobsCoverImage from '@/assets/green-jobs-india-2026-cover.jpg';
import miningTransitionCover from '@/assets/mining-transition-cover.jpg';
import asiaClimateArticle6Cover from '@/assets/asia-climate-article6-cover.jpg';
import indiaClimateInflectionCover from '@/assets/india-climate-inflection-cover.jpg';
import complianceCredibilityCover from '@/assets/compliance-credibility-cover.jpg';
import carbonMarketOutlookCover from '@/assets/carbon-market-outlook-cover.jpg';
import energyTransitionPlaybookCover from '@/assets/energy-transition-playbook-cover.jpg';
import indiaPowerSectorCover from '@/assets/india-power-sector-cover.jpg';

interface Publication {
  title: string;
  description: string;
  type: string;
  topics: string[];
  publishedDate: string;
  coverImage?: string;
}

const TOPIC_CATEGORIES = [
  { label: "Carbon Markets", keywords: ["Carbon", "Credits", "Trading", "CCTS", "CBAM", "Emissions", "Market"] },
  { label: "Energy & Renewables", keywords: ["Energy", "Solar", "Wind", "Grid", "Hydrogen", "Storage", "Renewable"] },
  { label: "Policy & Regulation", keywords: ["Policy", "Article 6", "CBAM", "CCTS", "Compliance", "EU", "Paris Agreement"] },
  { label: "Jobs & Skills", keywords: ["Jobs", "Workforce", "Skills", "Salary", "Training", "Employment", "Green Jobs"] },
  { label: "Investment", keywords: ["Investment", "Investor", "Portfolio", "ESG", "Green Bonds", "Market Sizing"] },
  { label: "Industrial Sectors", keywords: ["Steel", "Cement", "Textiles", "Chemicals", "Automotive", "Aluminum", "Mining"] },
];

const topicClusters = [
  {
    title: "Energy Transition",
    description: "Grid infrastructure and RE integration",
    topics: ["Renewable Energy", "Grid Stability", "Energy Storage", "Transmission"],
    serviceLink: "/energy-optimisation-consulting",
    serviceName: "Energy Optimisation"
  },
  {
    title: "Carbon Markets",
    description: "Understanding India's carbon trading landscape",
    topics: ["CCTS", "Carbon Credits", "VCM", "Article 6"],
    serviceLink: "/carbon-market-advisory-india",
    serviceName: "Carbon Market Advisory"
  },
  {
    title: "Sustainability Reporting",
    description: "Navigating disclosure requirements",
    topics: ["BRSR", "GRI", "TCFD", "Integrated Reporting"],
    serviceLink: "/sustainability-reporting-india",
    serviceName: "Sustainability Reporting"
  },
  {
    title: "Climate Policy",
    description: "Regulatory landscape and compliance",
    topics: ["CBAM", "PAT Scheme", "NDCs", "Climate Finance"],
    serviceLink: "/climate-strategy-india-enterprises",
    serviceName: "Climate Strategy"
  }
];

const featuredInsights = [
  {
    title: "The One Emitter the Paris Agreement Forgot to Name",
    description: "Every climate treaty ever signed has a missing line. The world's militaries collectively emit more greenhouse gases than all but two nations — and appear in none of them.",
    category: "Special Investigation",
    readTime: "25 min read",
    date: "March 2026",
    link: "/special-features/war-climate.html",
    external: true
  },
  {
    title: "India's Renewable Grid at Breaking Point",
    description: "Strategic analysis of the 203 GW grid crisis, thermal-RE gaps, and the ₹3.4 lakh crore infrastructure investment required for stabilization.",
    category: "Energy Transition",
    readTime: "15 min read",
    date: "9 February 2026",
    link: "/india-renewable-grid-analysis"
  },
  {
    title: "Working for the Earth — A Dialectic Discourse",
    description: "The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected themselves.",
    category: "Green Jobs",
    readTime: "12 min read",
    date: "6 February 2026",
    link: "/working-for-the-earth"
  },
  {
    title: "Beyond Compliance: Turning BRSR Into Competitive Advantage",
    description: "India's mandatory sustainability reporting isn't just a checkbox exercise—it's an opportunity to differentiate in investor communications.",
    category: "Sustainability Reporting",
    readTime: "5 min read",
    date: "Coming Soon",
    link: "/sustainability-reporting-india"
  }
];

const SEARCH_PROMPTS = [
  "Search for carbon credits investment...",
  "Search for CBAM compliance...",
  "Search for green jobs salary...",
  "Search for steel decarbonization...",
  "Search for renewable energy grid...",
];

const Insights = () => {
  const publications: Publication[] = [
    {
      title: "India Power Sector Investment Presentation",
      description: "India's ₹4.5 lakh crore ($49B) power revolution: Analysis of the generation transition from coal to renewables, 100 GW nuclear target by 2047, distribution reform under the Electricity Amendment Bill 2025, and grid-scale storage opportunities.",
      type: "Investment Analysis",
      topics: ["Power Sector", "India", "Investment", "Renewable Energy", "Nuclear Energy", "Grid Infrastructure", "Energy Transition"],
      publishedDate: "2026-01-22",
      coverImage: indiaPowerSectorCover
    },
    {
      title: "Jobs on the Rise 2026: India Green Jobs Outlook",
      description: "Comprehensive analysis of India's green jobs landscape aligned with Net-Zero 2070 goals and 500 GW renewable energy targets.",
      type: "Workforce Analysis",
      topics: ["Green Jobs", "Workforce", "Solar Jobs", "Wind Jobs", "Battery Storage", "Skills Gap", "Net Zero 2070", "Renewable Energy", "India", "Employment"],
      publishedDate: "2026-01-17",
      coverImage: greenJobsCoverImage
    },
    {
      title: "WEF Global Risks Report 2026: Climate & Geopolitical Volatility",
      description: "Analysis of the World Economic Forum's Global Risks Report 2026, examining the intersection of climate risks, geopolitical instability, and economic uncertainty.",
      type: "WEF Analysis",
      topics: ["WEF", "Davos", "Global Risks", "Geopolitical Risk", "Climate Risk", "Strategic Planning"],
      publishedDate: "2026-01-17",
      coverImage: wefCoverImage
    },
    {
      title: "Mining the Transition: A Climate-Critical Minerals Risk Framework for Investors",
      description: "Comprehensive risk framework for climate-critical minerals investment, covering lithium, cobalt, nickel, copper, and rare earths with ESG portfolio screening tools.",
      type: "Investor Framework",
      topics: ["Critical Minerals", "Lithium", "Cobalt", "Mining Risk", "ESG Investing", "Portfolio Screening"],
      publishedDate: "2025-12-15",
      coverImage: miningTransitionCover
    },
    {
      title: "Asia Climate Emissions and Article 6: Comparative Policy Grade",
      description: "Comprehensive analysis of Asia's climate emissions landscape and comparative policy grading under Article 6 of the Paris Agreement.",
      type: "Policy Analysis",
      topics: ["Article 6", "Paris Agreement", "Emissions Trading", "Climate Policy", "Asia Markets", "Carbon Credits"],
      publishedDate: "2025-12-10",
      coverImage: asiaClimateArticle6Cover
    },
    {
      title: "India's Climate Inflection Point",
      description: "Critical analysis of India's pivotal moment in climate transition and the strategic decisions shaping the nation's sustainable future.",
      type: "Strategic Analysis",
      topics: ["India", "Net Zero", "Climate Strategy", "Decarbonization"],
      publishedDate: "2025-11-15",
      coverImage: indiaClimateInflectionCover
    },
    {
      title: "From Compliance to Credibility: A CXO Guide to CCTS & CBAM",
      description: "Strategic frameworks to transform carbon compliance into competitive advantage and market leadership.",
      type: "CXO Strategic Guide",
      topics: ["CCTS", "CBAM", "EU Regulations", "Export Compliance", "Steel", "Textiles", "Chemicals", "CXO Strategy"],
      publishedDate: "2025-10-20",
      coverImage: complianceCredibilityCover
    },
    {
      title: "Carbon Market Outlook 2025-2030: An Investor's Deep Dive",
      description: "Complete investor's guide to India's $1.4B carbon market opportunity with financial models and risk analysis.",
      type: "Investor's Deep Dive",
      topics: ["Carbon Credits", "Carbon Trading", "Investment Analysis", "Market Sizing", "ESG Reporting", "India"],
      publishedDate: "2025-10-15",
      coverImage: carbonMarketOutlookCover
    },
    {
      title: "Energy Transition Playbook",
      description: "Strategic roadmap for India's energy transition and decarbonization pathways.",
      type: "Strategic Playbook",
      topics: ["Energy Transition", "Renewable Energy", "Solar", "Wind", "Green Hydrogen", "Steel", "Cement", "India"],
      publishedDate: "2025-08-15",
      coverImage: energyTransitionPlaybookCover
    }
  ];

  const [selectedReport, setSelectedReport] = useState(publications[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Climate Insights & Research | Bombay Breed";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Expert analysis on India's carbon markets, sustainability reporting, and climate policy. Strategic insights and deep-dive reports for C-suite executives.");
    }
  }, []);

  useEffect(() => {
    if (isSearchFocused || searchQuery) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PROMPTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isSearchFocused, searchQuery]);

  const handleDownloadClick = (pub: Publication) => {
    setSelectedReport(pub);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const formatDate = (dateString: string) => format(new Date(dateString), 'MMMM yyyy');

  const matchesCategory = (pubTopics: string[], category: string) => {
    const categoryConfig = TOPIC_CATEGORIES.find(c => c.label === category);
    if (!categoryConfig) return false;
    return pubTopics.some(topic => 
      categoryConfig.keywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const filteredPublications = useMemo(() => {
    let results = publications;
    if (selectedTopics.length > 0) {
      results = results.filter(pub => selectedTopics.some(category => matchesCategory(pub.topics, category)));
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(pub => 
        pub.title.toLowerCase().includes(query) ||
        pub.description.toLowerCase().includes(query) ||
        pub.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }
    return results;
  }, [searchQuery, selectedTopics]);

  const isFiltering = searchQuery.trim().length > 0 || selectedTopics.length > 0;
  const archivePublications = filteredPublications.slice(3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-20 px-6 md:px-8 bg-primary">
          <div className="container mx-auto text-center max-w-3xl">
            <p className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase mb-4">
              Insights & Research
            </p>
            <h1 className="text-display font-heading tracking-tight mb-6 text-primary-foreground">
              Climate Intelligence for Decision Makers
            </h1>
            <p className="text-lede text-primary-foreground/80">
              Strategic analysis on carbon markets, ESG governance, and India's energy transition—translated for the boardroom.
            </p>
          </div>
        </section>

        {/* Special Feature Banner */}
        <SpecialFeatureHighlight />

        {/* Featured Insights */}
        <section className="py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="mb-8">
                <h2 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Featured Analysis
                </h2>
                <p className="text-muted-foreground">Latest research and strategic analysis</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {featuredInsights.filter(i => !(i as any).external).map((insight, index) => (
                  <Link key={index} to={insight.link}>
                    <Card className="h-full group cursor-pointer hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">{insight.category}</Badge>
                          <span className="text-xs text-muted-foreground">{insight.readTime}</span>
                          {insight.date && <span className="text-xs text-muted-foreground ml-auto">{insight.date}</span>}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">{insight.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{insight.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Reports Archive with Search */}
        <section className="py-20 px-6 md:px-8 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="text-center mb-8">
                <h2 className="text-section font-heading tracking-tight mb-4">Reports & Publications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Deep-dive reports on India's carbon markets, green jobs, energy transition, and climate policy</p>
              </div>

              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={SEARCH_PROMPTS[placeholderIndex]}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="pl-11 pr-10"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Topic Filter Chips */}
              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2">
                  {TOPIC_CATEGORIES.map((category) => (
                    <button
                      key={category.label}
                      onClick={() => toggleTopic(category.label)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTopics.includes(category.label)
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                  {selectedTopics.length > 0 && (
                    <button onClick={() => setSelectedTopics([])} className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                      <X className="h-3.5 w-3.5" /> Clear
                    </button>
                  )}
                </div>
              </div>

              {filteredPublications.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No publications found</h3>
                  <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedTopics([]); }}>Clear Filters</Button>
                </div>
              ) : (
                <>
                  {/* Featured Reports Carousel */}
                  <div className="mb-12">
                    <FeaturedReportsCarousel publications={publications} onDownloadClick={handleDownloadClick} />
                  </div>

                  {/* Archive List */}
                  {archivePublications.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-6 text-muted-foreground">All Publications</h3>
                      <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
                        {archivePublications.map((pub, index) => (
                          <div 
                            key={index}
                            className={`flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors cursor-pointer group ${
                              index !== archivePublications.length - 1 ? 'border-b border-border/30' : ''
                            }`}
                            onClick={() => handleDownloadClick(pub)}
                          >
                            {pub.coverImage ? (
                              <div className="shrink-0 w-16 h-20 rounded overflow-hidden bg-muted">
                                <img src={pub.coverImage} alt={pub.title} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="shrink-0 w-16 h-20 rounded bg-muted flex items-center justify-center">
                                <FileText className="h-6 w-6 text-muted-foreground/50" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs font-medium text-accent uppercase tracking-wide">{pub.type}</span>
                                <span className="text-xs text-muted-foreground">{formatDate(pub.publishedDate)}</span>
                              </div>
                              <h4 className="font-medium text-foreground truncate pr-4">{pub.title}</h4>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              Download <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* Topic Clusters */}
        <section className="py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Explore by Topic</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Deep-dive into specific areas of climate strategy</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {topicClusters.map((cluster, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{cluster.title}</CardTitle>
                      <CardDescription>{cluster.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cluster.topics.map((topic, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{topic}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">Related service:</span>
                        <Link to={cluster.serviceLink} className="text-sm text-primary hover:underline flex items-center gap-1">
                          {cluster.serviceName} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>


        {/* The Climate Desk Newsletter */}
        <section className="py-20 px-6 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="bg-primary rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Newspaper className="w-6 h-6 text-primary-foreground" />
                      <span className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wide">Newsletter</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary-foreground mb-4">The Climate Desk</h2>
                    <p className="text-primary-foreground/80 mb-6">
                      Weekly intelligence on India's energy transition, carbon markets, and climate policy. Written for decision-makers who need signal, not noise.
                    </p>
                    <Button variant="secondary" asChild>
                      <a href="https://thecliamtedesk.substack.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        Subscribe on Substack <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-primary-foreground">What subscribers get:</h3>
                    <ul className="space-y-3">
                      {["Weekly carbon market analysis", "Policy change breakdowns", "Industry transition updates", "Investment signal tracking", "Exclusive deep-dives"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-primary-foreground/80">
                          <FileText className="w-4 h-4 shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Download CTA */}
        <section ref={formSectionRef} className="py-20 px-6 md:px-8 bg-card">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">Download</p>
              <h2 className="text-section font-heading tracking-tight mb-4">{selectedReport.title}</h2>
              <p className="text-body text-muted-foreground">{selectedReport.description}</p>
            </div>
            <LeadCaptureForm reportTitle={selectedReport.title} reportDescription={selectedReport.description} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
