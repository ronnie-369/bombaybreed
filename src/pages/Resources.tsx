import React, { useState, useRef, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCarousel from '@/components/BlogCarousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, ExternalLink, FileText, Video, Calendar, ChevronRight, Search, X } from 'lucide-react';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import { format } from 'date-fns';

interface Publication {
  title: string;
  description: string;
  type: string;
  topics: string[];
  publishedDate: string;
}

// Topic filter categories with their matching keywords
const TOPIC_CATEGORIES = [
  { label: "Carbon Markets", keywords: ["Carbon", "Credits", "Trading", "CCTS", "CBAM", "Emissions", "Market"] },
  { label: "Energy & Renewables", keywords: ["Energy", "Solar", "Wind", "Grid", "Hydrogen", "Storage", "Renewable"] },
  { label: "Mining & Minerals", keywords: ["Mining", "Lithium", "Cobalt", "Nickel", "Copper", "Tailings", "Critical Minerals"] },
  { label: "Policy & Regulation", keywords: ["Policy", "Article 6", "CBAM", "CCTS", "Compliance", "EU", "Paris Agreement"] },
  { label: "Jobs & Skills", keywords: ["Jobs", "Workforce", "Skills", "Salary", "Training", "Employment"] },
  { label: "Investment", keywords: ["Investment", "Investor", "Portfolio", "ESG", "Green Bonds", "Market Sizing"] },
  { label: "India Focus", keywords: ["India", "Gujarat", "Maharashtra", "Tamil Nadu", "Asia"] },
  { label: "Industrial Sectors", keywords: ["Steel", "Cement", "Textiles", "Chemicals", "Automotive", "Aluminum"] },
];

// Dynamic search prompts that cycle in the placeholder
const SEARCH_PROMPTS = [
  "Search for lithium mining risks...",
  "Search for carbon credits investment...",
  "Search for green jobs salary...",
  "Search for CBAM compliance...",
  "Search for Article 6 policy...",
  "Search for steel decarbonization...",
  "Search for tailings dam risk...",
  "Search for renewable energy grid...",
  "Search for ESG portfolio screening...",
  "Search for Gujarat solar jobs...",
];

const Resources = () => {
  // Publications ordered from newest to oldest
  const publications: Publication[] = [
    {
      title: "Mining the Transition: A Climate-Critical Minerals Risk Framework for Investors",
      description: "Comprehensive risk framework for climate-critical minerals investment, covering lithium, cobalt, nickel, copper, and rare earths with ESG portfolio screening tools",
      type: "Investor Framework",
      topics: [
        "Critical Minerals", "Lithium", "Cobalt", "Nickel", "Copper", "Rare Earths",
        "Tailings Dams", "Water Risk", "Aquifer Depletion", "ESG Investing",
        "Mining Risk", "Portfolio Screening", "SDGs", "Investor Intelligence"
      ],
      publishedDate: "2025-01-10"
    },
    {
      title: "Asia Climate Emissions and Article 6: Comparative Policy Grade",
      description: "Comprehensive analysis of Asia's climate emissions landscape and comparative policy grading under Article 6 of the Paris Agreement",
      type: "Policy Analysis",
      topics: [
        "Article 6", "Paris Agreement", "Emissions Trading", "Climate Policy",
        "Asia Markets", "Carbon Credits", "NDCs", "Policy Comparison", "UNFCCC"
      ],
      publishedDate: "2025-01-05"
    },
    {
      title: "India's Climate Inflection Point",
      description: "Critical analysis of India's pivotal moment in climate transition and the strategic decisions shaping the nation's sustainable future",
      type: "Strategic Analysis",
      topics: [
        "India", "Net Zero", "Climate Strategy", "Policy Inflection",
        "Decarbonization", "Strategic Analysis", "2070 Targets", "NDC"
      ],
      publishedDate: "2024-12-15"
    },
    {
      title: "From Compliance to Credibility: A CXO Guide to CCTS & CBAM",
      description: "Strategic frameworks to transform carbon compliance into competitive advantage and market leadership",
      type: "CXO Strategic Guide",
      topics: [
        "CCTS", "CBAM", "EU Regulations", "Export Compliance", "Steel",
        "Textiles", "Chemicals", "Automotive", "Carbon Intensity", "Scope 3",
        "CXO Strategy", "Trade Policy"
      ],
      publishedDate: "2024-11-20"
    },
    {
      title: "Carbon Market Outlook 2025-2030: An Investor's Deep Dive",
      description: "Complete investor's guide to India's $1.4B carbon market opportunity with financial models and risk analysis",
      type: "Investor's Deep Dive",
      topics: [
        "Carbon Credits", "Carbon Trading", "Investment Analysis", "Market Sizing",
        "Renewable Energy Credits", "Green Bonds", "Net Zero", "Carbon Tax",
        "ESG Reporting", "Forestry", "Agriculture", "Transportation", "India"
      ],
      publishedDate: "2024-10-15"
    },
    {
      title: "Green Jobs in India: Workforce and Investment Outlook 2025-2030",
      description: "Complete workforce & investment outlook for India's green economy transformation",
      type: "Workforce Outlook",
      topics: [
        "Green Jobs", "Workforce", "Skills Gap", "Salary Benchmarks",
        "Solar", "Wind", "Battery Storage", "Manufacturing",
        "Gujarat", "Maharashtra", "Tamil Nadu", "Training", "Employment"
      ],
      publishedDate: "2024-09-01"
    },
    {
      title: "Energy Transition Playbook",
      description: "Strategic roadmap for India's energy transition and decarbonization pathways",
      type: "Strategic Playbook",
      topics: [
        "Energy Transition", "Renewable Energy", "Solar", "Wind",
        "Smart Grid", "Energy Storage", "Green Hydrogen", "Carbon Capture",
        "Steel Decarbonization", "Cement", "Aluminum", "Industrial Policy",
        "PLI Scheme", "Grid Integration", "India"
      ],
      publishedDate: "2024-07-15"
    }
  ];

  const [selectedReport, setSelectedReport] = useState(publications[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const formSectionRef = useRef<HTMLDivElement>(null);

  // Cycle through search prompts every 3 seconds when not focused
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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM yyyy');
  };

  // Check if a publication matches a topic category
  const matchesCategory = (pubTopics: string[], category: string) => {
    const categoryConfig = TOPIC_CATEGORIES.find(c => c.label === category);
    if (!categoryConfig) return false;
    return pubTopics.some(topic => 
      categoryConfig.keywords.some(keyword => 
        topic.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  // Toggle topic filter
  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  // Filter publications based on search query and selected topics
  const filteredPublications = useMemo(() => {
    let results = publications;
    
    // Apply topic filters (OR logic between selected topics)
    if (selectedTopics.length > 0) {
      results = results.filter(pub => 
        selectedTopics.some(category => matchesCategory(pub.topics, category))
      );
    }
    
    // Apply search filter
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

  // Split publications: featured (newest) + recent (next 2) + archive (rest)
  const featuredPublication = filteredPublications[0];
  const recentPublications = filteredPublications.slice(1, 3);
  const archivePublications = filteredPublications.slice(3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 md:px-8 bg-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <p className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase mb-4">
            Research & Insights
          </p>
          <h1 className="text-display font-heading tracking-tight mb-6 text-primary-foreground">
            Resources & Thought Leadership
          </h1>
          <p className="text-lede text-primary-foreground/80">
            Published insights on carbon markets, ESG governance, and India's climate transition
          </p>
        </div>
      </section>

      {/* Search & Publications */}
      <section className="py-20 px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={SEARCH_PROMPTS[placeholderIndex]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-11 pr-10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-center text-sm text-muted-foreground mt-3">
                {filteredPublications.length} {filteredPublications.length === 1 ? 'result' : 'results'} found
              </p>
            )}
          </div>

          {/* Topic Filter Chips */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {TOPIC_CATEGORIES.map((category) => {
                const isActive = selectedTopics.includes(category.label);
                return (
                  <button
                    key={category.label}
                    onClick={() => toggleTopic(category.label)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
              {selectedTopics.length > 0 && (
                <button
                  onClick={() => setSelectedTopics([])}
                  className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* No Results State */}
          {filteredPublications.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No publications found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Section Header */}
              {!isFiltering && (
                <div className="text-center mb-12">
                  <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
                    Latest Publication
                  </p>
                  <h2 className="text-section font-heading tracking-tight">
                    Featured Report
                  </h2>
                </div>
              )}

              {isFiltering && (
                <h3 className="text-lg font-medium mb-6 text-muted-foreground">
                  {filteredPublications.length} {filteredPublications.length === 1 ? 'result' : 'results'} found
                </h3>
              )}

          {/* Featured Card - Full Width */}
          <Card className="border-primary/30 bg-gradient-to-br from-card to-secondary/20 mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wide">
                    {featuredPublication.type}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(featuredPublication.publishedDate)}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4">
                  {featuredPublication.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredPublication.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPublication.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-2.5 py-1 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <Button 
                  onClick={() => handleDownloadClick(featuredPublication)}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
              <div className="hidden md:flex items-center justify-center p-8 bg-primary/5 rounded-r-lg">
                <FileText className="h-24 w-24 text-primary/30" />
              </div>
            </div>
          </Card>

          {/* Recent Publications Grid */}
          {recentPublications.length > 0 && (
          <div className="mb-16">
            <h3 className="text-lg font-medium mb-6 text-muted-foreground">Recent Publications</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {recentPublications.map((pub, index) => (
                <Card 
                  key={index} 
                  className={`transition-colors hover:border-border ${
                    selectedReport.title === pub.title ? 'border-primary' : 'border-border/50'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-accent" />
                        <span className="text-xs font-medium text-accent uppercase tracking-wide">{pub.type}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(pub.publishedDate)}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-medium">
                      {pub.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {pub.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {pub.topics.slice(0, 3).map((topic, topicIndex) => (
                          <span 
                            key={topicIndex}
                            className="px-2.5 py-1 bg-muted text-muted-foreground rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <Button 
                        onClick={() => handleDownloadClick(pub)}
                        variant="outline" 
                        size="sm"
                        className="w-full gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          )}

          {/* Archive List */}
          {archivePublications.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-6 text-muted-foreground">All Publications</h3>
            <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
              {archivePublications.map((pub, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer group ${
                    index !== archivePublications.length - 1 ? 'border-b border-border/30' : ''
                  }`}
                  onClick={() => handleDownloadClick(pub)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-accent uppercase tracking-wide">
                        {pub.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(pub.publishedDate)}
                      </span>
                    </div>
                    <h4 className="font-medium text-foreground truncate pr-4">
                      {pub.title}
                    </h4>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  >
                    Download
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          )}
            </>
          )}
        </div>
      </section>

      {/* Blog Insights */}
      <BlogCarousel />

      {/* Additional Resources */}
      <section className="py-20 px-6 md:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              More Resources
            </p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              Additional Insights
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Explore more research and analysis on carbon governance and sustainability strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50 hover:border-border transition-colors">
              <CardHeader>
                <CardTitle className="text-base font-medium">The Climate Desk</CardTitle>
                <CardDescription className="text-sm">
                  Regular insights and analysis on carbon markets and climate policy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm" className="w-full gap-2">
                  <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer">
                    Visit Blog
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-border transition-colors">
              <CardHeader>
                <CardTitle className="text-base font-medium">LinkedIn Profile</CardTitle>
                <CardDescription className="text-sm">
                  Connect for professional updates and industry insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm" className="w-full gap-2">
                  <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer">
                    Connect
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-border transition-colors">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Video className="h-4 w-4 text-accent" />
                  Video Assets
                </CardTitle>
                <CardDescription className="text-sm">
                  Watch presentations, webinars, and educational content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm" className="w-full gap-2">
                  <a href="https://www.youtube.com/@theresaronnie" target="_blank" rel="noopener noreferrer">
                    Watch Videos
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section ref={formSectionRef} className="py-20 px-6 md:px-8 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              Download
            </p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              {selectedReport.title}
            </h2>
            <p className="text-body text-muted-foreground">
              {selectedReport.description}
            </p>
          </div>
          
          <LeadCaptureForm
            reportTitle={selectedReport.title}
            reportDescription={selectedReport.description}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
