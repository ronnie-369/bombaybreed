import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Factory, Globe, FileText, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ServicesHubSkeleton from '@/components/skeletons/ServicesHubSkeleton';

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
        .eq('is_active', true)
        .limit(6);
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

        {/* Core Capabilities */}
        <ScrollReveal direction="up" delay={1}>
          <div className="mb-12">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
              Core Capabilities
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

        {/* Browse by Industry & Geography */}
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal direction="left" delay={2}>
            <div className="p-6 rounded-xl bg-card border border-border/50">
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                Browse by Industry
              </h3>
              <div className="flex flex-wrap gap-2">
                {industries?.map((industry) => (
                  <Link
                    key={industry.slug}
                    to={`/${industry.slug}`}
                    className="px-4 py-2 rounded-full bg-secondary/50 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mt-4 transition-colors"
              >
                View all industries <ChevronRight className="w-4 h-4" />
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
