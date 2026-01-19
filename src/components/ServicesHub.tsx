import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Factory, Globe, FileText, ChevronRight, Landmark, Building2, Sprout, Sparkles, Megaphone, TrendingUp, MessageSquare, Target } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ServicesHubSkeleton from '@/components/skeletons/ServicesHubSkeleton';

// Primary Services - Tier 1 Money Keywords
const primaryServices = [
  {
    slug: 'carbon-communications-strategy-india',
    icon: Megaphone,
    name: 'Carbon Communications Strategy',
    description: 'Strategic communications for carbon market positioning and stakeholder engagement.',
  },
  {
    slug: 'sustainability-reporting-india',
    icon: FileText,
    name: 'Sustainability Reporting',
    description: 'BRSR, GRI, and integrated reporting advisory for Indian enterprises.',
  },
  {
    slug: 'carbon-market-advisory-india',
    icon: TrendingUp,
    name: 'Carbon Market Advisory',
    description: 'Navigate India carbon markets including CCTS, VCM, and international mechanisms.',
  },
  {
    slug: 'esg-communications-consultant',
    icon: MessageSquare,
    name: 'ESG Communications',
    description: 'Authentic ESG narratives that build stakeholder trust and avoid greenwashing.',
  },
  {
    slug: 'climate-strategy-india-enterprises',
    icon: Target,
    name: 'Climate Strategy',
    description: 'Net zero roadmaps and transition planning for Indian corporates.',
  },
];

// Intent signaller segments with mapped industries
const clientSegments = [
  {
    id: 'governments',
    icon: Landmark,
    title: 'Governments & Agencies',
    description: 'Bankable Article 6 projects, ITMO structuring, bilateral agreements',
    industries: ['power', 'oil-gas', 'steel'],
    cta: 'Develop bankable projects',
    link: '/article-6-advisory',
  },
  {
    id: 'corporates',
    icon: Building2,
    title: 'Corporates & Credit Buyers',
    description: 'High-quality credits through ITMOs or EACs, procurement strategy',
    industries: ['steel', 'cement', 'data-centres', 'fmcg', 'fashion'],
    cta: 'Secure quality credits',
    link: '/climate-investment-readiness',
  },
  {
    id: 'climate-ventures',
    icon: Sprout,
    title: 'Climate Ventures',
    description: 'Visibility, brand premium, systems thinking narrative',
    industries: ['data-centres', 'fashion', 'fmcg'],
    cta: 'Build your narrative',
    link: '/services',
  },
  {
    id: 'visibility',
    icon: Sparkles,
    title: 'Visibility & Thought Leadership',
    description: 'Featured on The Climate Desk, case studies, credibility building',
    industries: [], // All sectors
    cta: 'Get featured',
    link: '/resources',
  },
];

const ServicesHub = () => {
  const { data: capabilities, isLoading: capabilitiesLoading } = useQuery({
    queryKey: ['seo-capabilities-hub'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_capabilities')
        .select('name, slug, description')
        .eq('is_active', true)
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const { data: industries, isLoading: industriesLoading } = useQuery({
    queryKey: ['seo-industries-hub'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_industries')
        .select('name, slug')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  const { data: geographies, isLoading: geographiesLoading } = useQuery({
    queryKey: ['seo-geographies-hub'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_geographies')
        .select('name, slug')
        .eq('is_active', true)
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const capabilityIcons: Record<string, React.ReactNode> = {
    'energy-optimisation': <Zap className="w-5 h-5" />,
    'industrial-decarbonisation': <Factory className="w-5 h-5" />,
    'article-6-advisory': <FileText className="w-5 h-5" />,
    'climate-investment-readiness': <Globe className="w-5 h-5" />,
    'dmrv-integrity': <FileText className="w-5 h-5" />,
  };

  // Create a map of slug to name for industry display
  const industryMap = industries?.reduce((acc, ind) => {
    acc[ind.slug] = ind.name;
    return acc;
  }, {} as Record<string, string>) || {};

  const isLoading = capabilitiesLoading || industriesLoading || geographiesLoading;

  if (isLoading) {
    return <ServicesHubSkeleton />;
  }

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              Strategic Advisory Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert guidance across climate strategy, carbon markets, and ESG governance for boards, CXOs, and investors.
            </p>
          </div>
        </ScrollReveal>

        {/* Primary Services */}
        <ScrollReveal direction="up" delay={1}>
          <div className="mb-12">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
              Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {primaryServices.map((service) => (
                <Link key={service.slug} to={`/${service.slug}`}>
                  <Card className="h-full group cursor-pointer border-primary/20 hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-3 text-base">
                        <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <service.icon className="w-5 h-5" />
                        </span>
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 group-hover:gap-2 transition-all">
                        Get started <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Specialized Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities?.map((capability) => (
                <Link key={capability.slug} to={`/${capability.slug}`}>
                  <Card className="h-full group cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-3 text-base">
                        <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {capabilityIcons[capability.slug] || <Zap className="w-5 h-5" />}
                        </span>
                        {capability.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {capability.description || 'Strategic advisory for sustainable business transformation.'}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Who We Work With & Browse by Region */}
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal direction="left" delay={2}>
            <div className="p-6 rounded-xl bg-card border border-border/50">
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                Who We Work With
              </h3>
              <div className="space-y-4">
                {clientSegments.map((segment) => (
                  <Link key={segment.id} to={segment.link} className="block group">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <span className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                        <segment.icon className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                          {segment.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {segment.description}
                        </p>
                        {segment.industries.length > 0 ? (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {segment.industries.slice(0, 4).map((slug) => (
                              <span 
                                key={slug} 
                                className="px-2 py-0.5 text-xs rounded-full bg-secondary/80 text-muted-foreground"
                              >
                                {industryMap[slug] || slug}
                              </span>
                            ))}
                            {segment.industries.length > 4 && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-secondary/80 text-muted-foreground">
                                +{segment.industries.length - 4} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary/80 text-muted-foreground mt-2">
                            All sectors
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mt-4 transition-colors"
              >
                View all services <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={2}>
            <div className="p-6 rounded-xl bg-card border border-border/50">
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                Browse by Region
              </h3>
              <div className="flex flex-wrap gap-2">
                {geographies?.map((geo) => (
                  <Link
                    key={geo.slug}
                    to={`/${geo.slug}`}
                    className="px-4 py-2 rounded-full bg-secondary/50 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {geo.name}
                  </Link>
                ))}
              </div>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mt-4 transition-colors"
              >
                View all regions <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal direction="up" delay={3}>
          <div className="mt-12 text-center">
            <Link to="/services">
              <Button size="lg" variant="outline" className="group">
                Explore All Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesHub;