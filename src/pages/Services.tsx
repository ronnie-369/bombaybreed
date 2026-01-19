import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Filter, Zap, Factory, Globe, FileText, MapPin, Landmark, Building2, Sprout, Sparkles, Megaphone, TrendingUp, MessageSquare, Target } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Primary Services - Tier 1 Money Keywords
const primaryServices = [
  {
    slug: 'carbon-communications-strategy-india',
    icon: Megaphone,
    name: 'Carbon Communications Strategy',
    description: 'Strategic communications for carbon market positioning and stakeholder engagement in India.',
    keyword: 'carbon communications strategy India',
  },
  {
    slug: 'sustainability-reporting-india',
    icon: FileText,
    name: 'Sustainability Reporting',
    description: 'BRSR, GRI, and integrated reporting advisory for Indian enterprises navigating disclosure requirements.',
    keyword: 'sustainability reporting India',
  },
  {
    slug: 'carbon-market-advisory-india',
    icon: TrendingUp,
    name: 'Carbon Market Advisory',
    description: 'Navigate India carbon markets including CCTS, VCM, and international mechanisms with expert guidance.',
    keyword: 'carbon market advisory India',
  },
  {
    slug: 'esg-communications-consultant',
    icon: MessageSquare,
    name: 'ESG Communications',
    description: 'Authentic ESG narratives that build stakeholder trust and help you avoid greenwashing pitfalls.',
    keyword: 'ESG communications consultant',
  },
  {
    slug: 'climate-strategy-india-enterprises',
    icon: Target,
    name: 'Climate Strategy',
    description: 'Net zero roadmaps and transition planning designed for Indian corporate realities.',
    keyword: 'climate strategy India enterprises',
  },
];

// Client intent segments with industry mappings
const clientSegments = [
  {
    id: 'governments',
    icon: Landmark,
    title: 'Governments & Agencies',
    description: 'Looking for bankable Article 6 projects, ITMO structuring, and bilateral carbon agreements. We help structure projects that meet international standards and attract investment.',
    industries: ['power', 'oil-gas', 'steel'],
    cta: 'Develop bankable projects',
    link: '/article-6-advisory',
  },
  {
    id: 'corporates',
    icon: Building2,
    title: 'Corporates & Credit Buyers',
    description: 'Seeking high-quality credits through ITMOs or EACs with robust procurement strategy and due diligence. We help navigate carbon markets with confidence.',
    industries: ['steel', 'cement', 'data-centres', 'fmcg', 'fashion'],
    cta: 'Secure quality credits',
    link: '/climate-investment-readiness',
  },
  {
    id: 'climate-ventures',
    icon: Sprout,
    title: 'Climate Ventures',
    description: 'Build visibility and brand premium through systems thinking narrative development. We help climate companies articulate their value proposition and market positioning.',
    industries: ['data-centres', 'fashion', 'fmcg'],
    cta: 'Build your narrative',
    link: '/services',
  },
  {
    id: 'visibility',
    icon: Sparkles,
    title: 'Visibility & Thought Leadership',
    description: 'Get featured on The Climate Desk, build credibility through case studies, and establish thought leadership in the energy transition space.',
    industries: [],
    cta: 'Get featured',
    link: '/resources',
  },
];

const Services = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'capability' | 'industry' | 'geography' | 'regulation'>('all');

  useEffect(() => {
    document.title = "Climate Advisory Services | Bombay Breed India";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Strategic carbon market advisory, ESG communications, and industrial decarbonisation services for Indian enterprises. Expert climate strategy consulting.");
    }
  }, []);

  const { data: capabilities } = useQuery({
    queryKey: ['seo-capabilities-full'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_capabilities')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  const { data: industries } = useQuery({
    queryKey: ['seo-industries-full'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_industries')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  const { data: geographies } = useQuery({
    queryKey: ['seo-geographies-full'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_geographies')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  const { data: regulations } = useQuery({
    queryKey: ['seo-regulations-full'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_regulations')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  const { data: seoPages } = useQuery({
    queryKey: ['seo-pages-all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_pages')
        .select('slug, h1_headline, meta_description, page_type')
        .eq('is_published', true)
        .order('priority', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Create a map of slug to name for industry display
  const industryMap = industries?.reduce((acc, ind) => {
    acc[ind.slug] = ind.name;
    return acc;
  }, {} as Record<string, string>) || {};

  const filterButtons = [
    { key: 'all', label: 'All Services', icon: Filter },
    { key: 'capability', label: 'Capabilities', icon: Zap },
    { key: 'industry', label: 'Industries', icon: Factory },
    { key: 'geography', label: 'Regions', icon: Globe },
    { key: 'regulation', label: 'Regulations', icon: FileText },
  ] as const;

  const filteredPages = seoPages?.filter(page => 
    activeFilter === 'all' || page.page_type === activeFilter || page.page_type === 'combined' || page.page_type === 'problem'
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 md:px-8 mb-12">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
                  Strategic Advisory Services
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive climate strategy, carbon markets advisory, and ESG governance services 
                  tailored for boards, CXOs, and investors navigating India's energy transition.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Primary Services Section */}
        <section className="px-6 md:px-8 mb-16 bg-primary/5 py-12 -mx-6 md:-mx-8">
          <div className="container mx-auto max-w-6xl px-6 md:px-8">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                <Megaphone className="w-6 h-6 text-primary" />
                Primary Services
              </h2>
              <p className="text-muted-foreground mb-8">
                High-impact advisory services for India's climate transition
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {primaryServices.map((service) => (
                  <Link key={service.slug} to={`/${service.slug}`}>
                    <Card className="h-full group cursor-pointer border-primary/30 hover:border-primary hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg group-hover:text-primary transition-colors">
                          <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <service.icon className="w-5 h-5" />
                          </span>
                          {service.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="secondary" className="text-xs mb-3">
                          {service.keyword}
                        </Badge>
                        <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                          Get started <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Core Capabilities Section */}
        <section className="px-6 md:px-8 mb-16">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Specialized Capabilities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {capabilities?.map((cap) => (
                  <Link key={cap.id} to={`/${cap.slug}`}>
                    <Card className="h-full group cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {cap.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {cap.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          {cap.decision_maker && (
                            <Badge variant="secondary" className="text-xs">
                              {cap.decision_maker}
                            </Badge>
                          )}
                          {cap.buyer_intent && (
                            <Badge variant="outline" className="text-xs">
                              {cap.buyer_intent} intent
                            </Badge>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                          Learn more <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Who We Work With Section */}
        <section className="px-6 md:px-8 mb-16 bg-secondary/20 py-12">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Who We Work With
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {clientSegments.map((segment) => (
                  <Link key={segment.id} to={segment.link}>
                    <Card className="h-full group cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg group-hover:text-primary transition-colors">
                          <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <segment.icon className="w-5 h-5" />
                          </span>
                          {segment.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {segment.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {segment.industries.length > 0 ? (
                            segment.industries.map((slug) => (
                              <Badge key={slug} variant="secondary" className="text-xs">
                                {industryMap[slug] || slug}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary" className="text-xs">
                              All sectors
                            </Badge>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                          {segment.cta} <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* All Industries Section (for SEO) */}
        <section className="px-6 md:px-8 mb-16">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Factory className="w-6 h-6 text-primary" />
                Industry Expertise
              </h2>
              <p className="text-muted-foreground mb-6">
                While we're transition-intent focused rather than industry-specialized, we bring deep expertise across these sectors:
              </p>
              <div className="flex flex-wrap gap-3">
                {industries?.map((ind) => (
                  <Link
                    key={ind.id}
                    to={`/${ind.slug}`}
                    className="px-4 py-2 rounded-full bg-card border border-border/50 text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Geographies Section */}
        <section className="px-6 md:px-8 mb-16 bg-secondary/20 py-12">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Regional Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {geographies?.map((geo) => (
                  <Link key={geo.id} to={`/${geo.slug}`}>
                    <Card className="h-full group cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {geo.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {geo.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {geo.geo_type}
                          </Badge>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                          View regional services <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Regulations Section */}
        <section className="px-6 md:px-8 mb-16">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Regulatory Expertise
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regulations?.map((reg) => (
                  <Link key={reg.id} to={`/${reg.slug}`}>
                    <Card className="h-full group cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {reg.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {reg.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          {reg.urgency && (
                            <Badge 
                              variant={reg.urgency === 'high' ? 'destructive' : 'secondary'} 
                              className="text-xs"
                            >
                              {reg.urgency} urgency
                            </Badge>
                          )}
                          {reg.jurisdiction && (
                            <Badge variant="outline" className="text-xs">
                              {reg.jurisdiction}
                            </Badge>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                          Compliance guidance <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* All Pages Browser */}
        <section className="px-6 md:px-8 bg-secondary/20 py-12">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                Browse All Service Pages
              </h2>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {filterButtons.map((btn) => (
                  <Button
                    key={btn.key}
                    variant={activeFilter === btn.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter(btn.key)}
                    className="gap-2"
                  >
                    <btn.icon className="w-4 h-4" />
                    {btn.label}
                  </Button>
                ))}
              </div>

              {/* Pages Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPages?.map((page) => (
                  <Link key={page.slug} to={`/${page.slug}`}>
                    <div className="p-4 rounded-lg border border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {page.h1_headline}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {page.meta_description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs capitalize">
                        {page.page_type}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPages?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No pages found for this filter.
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;