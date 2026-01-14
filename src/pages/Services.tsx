import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Filter, Zap, Factory, Globe, FileText, Building, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const Services = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'capability' | 'industry' | 'geography' | 'regulation'>('all');

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

        {/* Core Capabilities Section */}
        <section className="px-6 md:px-8 mb-16">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Core Capabilities
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

        {/* Industries Section */}
        <section className="px-6 md:px-8 mb-16 bg-secondary/20 py-12">
          <div className="container mx-auto max-w-6xl">
            <ScrollReveal direction="up">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                <Building className="w-6 h-6 text-primary" />
                Industries We Serve
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries?.map((ind) => (
                  <Link key={ind.id} to={`/${ind.slug}`}>
                    <Card className="h-full group cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {ind.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {ind.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          {ind.energy_intensity && (
                            <Badge variant="secondary" className="text-xs">
                              {ind.energy_intensity} energy intensity
                            </Badge>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                          Explore solutions <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Geographies Section */}
        <section className="px-6 md:px-8 mb-16">
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
        <section className="px-6 md:px-8 mb-16 bg-secondary/20 py-12">
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
        <section className="px-6 md:px-8">
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
                    <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
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
