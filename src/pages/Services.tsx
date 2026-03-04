import React, { useEffect } from 'react';
import { setOGMeta } from '@/utils/og-meta';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import BookingDialog from '@/components/BookingDialog';

const servicePillars = [
  {
    number: "01",
    label: "Carbon Strategy",
    headline: "Your BRSR filing is due and your board isn't prepared.",
    scope: [
      "Carbon transition roadmapping",
      "BRSR/CCTS compliance frameworks",
      "Decarbonisation pathway design",
      "Carbon credit monetisation strategy",
    ],
    outcome: "A top-10 cement manufacturer achieved 11% energy cost reduction within 14 months of engagement.",
    audience: "Publicly listed companies navigating SEBI's BRSR framework.",
    link: "/carbon-communications-strategy-india",
  },
  {
    number: "02",
    label: "Board Governance",
    headline: "Your ESG committee meets quarterly but changes nothing.",
    scope: [
      "Board-level ESG oversight design",
      "Climate risk integration into strategy",
      "Stakeholder engagement frameworks",
      "Independent director advisory",
    ],
    outcome: "Board engagement on climate risk increased from reactive to proactive within two quarters.",
    audience: "Boards and CXOs seeking strategic oversight on sustainability.",
    link: "/esg-communications-consultant",
  },
  {
    number: "03",
    label: "ESG Communications",
    headline: "Your sustainability report reads like a compliance document.",
    scope: [
      "Sustainability narrative strategy",
      "Investor communications on ESG",
      "Greenwashing risk assessment",
      "Climate thought leadership positioning",
    ],
    outcome: "Transformed compliance-first ESG reporting into investor-grade strategic narrative for a Fortune 500 client.",
    audience: "Companies that need their climate story to resonate with investors and regulators.",
    link: "/sustainability-reporting-india",
  },
];

const engagementModels = [
  {
    number: "01",
    title: "Retainer Advisory",
    description: "Ongoing strategic counsel. Quarterly board briefings.",
  },
  {
    number: "02",
    title: "Project Engagement",
    description: "Scoped deliverable. 8–16 week timeline.",
  },
  {
    number: "03",
    title: "Board Advisory Seat",
    description: "Non-executive advisory role. Annual commitment.",
  },
];

const Services = () => {
  useEffect(() => {
    document.title = "Bombay Breed: Advisory Services";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Strategic carbon market advisory, ESG communications, and board governance services for Indian enterprises. Expert climate strategy consulting.");
    }
    const cleanup = setOGMeta({
      title: 'Bombay Breed: Advisory Services',
      description: 'Carbon Strategy · Board Governance · ESG Communications for Indian enterprises.',
      image: 'https://bombaybreed.com/og/og-services.png',
      url: 'https://bombaybreed.com/services',
    });
    return cleanup;
  }, []);

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="pt-16 pb-20 md:pt-20 md:pb-28 px-6 md:px-8">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="00" label="Advisory Services" />
              <h1 className="text-display font-serif tracking-tight mt-6 mb-6">
                Strategic Advisory Services
              </h1>
              <p className="text-lede text-muted-foreground">
                Comprehensive climate strategy, carbon markets advisory, and ESG governance 
                tailored for boards, CXOs, and investors navigating India's energy transition.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Three Service Pillars */}
        {servicePillars.map((pillar) => (
          <section key={pillar.number} className="py-16 md:py-24 px-6 md:px-8 border-t border-border/50">
            <div className="container mx-auto max-w-[680px]">
              <ScrollReveal direction="up">
                <SectionLabel number={pillar.number} label={pillar.label} />
                <h2 className="text-section font-serif tracking-tight mt-6 mb-6">
                  {pillar.headline}
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-3">Scope</h3>
                    <ul className="space-y-2">
                      {pillar.scope.map((item, i) => (
                        <li key={i} className="text-foreground/80 flex items-start gap-2">
                          <span className="text-accent mt-1">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2">Outcome</h3>
                    <p className="text-foreground/80 italic">"{pillar.outcome}"</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground mb-2">Who this is for</h3>
                    <p className="text-foreground/80">{pillar.audience}</p>
                  </div>

                  <Link to={pillar.link}>
                    <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80 p-0">
                      Book a Focused Conversation <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        ))}

        {/* Engagement Model */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-[680px]">
            <ScrollReveal direction="up">
              <SectionLabel number="04" label="How We Work" />
              <h2 className="text-section font-serif tracking-tight mt-6 mb-10">
                Engagement Models
              </h2>
              <div className="space-y-8">
                {engagementModels.map((model) => (
                  <div key={model.number} className="flex gap-6 items-start">
                    <span className="text-sm font-semibold text-accent tracking-wider mt-1">{model.number}</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{model.title}</h3>
                      <p className="text-sm text-muted-foreground">{model.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* All SEO Pages Browser */}
        {seoPages && seoPages.length > 0 && (
          <section className="py-16 px-6 md:px-8 border-t border-border/50">
            <div className="container mx-auto max-w-4xl">
              <ScrollReveal direction="up">
                <SectionLabel number="05" label="All Services" className="text-center block" />
                <h2 className="text-section font-serif tracking-tight text-center mt-6 mb-10">
                  Browse All Service Pages
                </h2>
                <div className="space-y-1">
                  {seoPages.map((page) => (
                    <Link 
                      key={page.slug} 
                      to={`/${page.slug}`}
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="min-w-0">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {page.h1_headline}
                        </h3>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 ml-4" />
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
          <div className="container mx-auto max-w-3xl text-center">
            <ScrollReveal direction="up">
              <h2 className="text-section font-serif tracking-tight mb-6">
                Ready to build a credible carbon strategy for your board?
              </h2>
              <BookingDialog triggerText="Schedule a Consultation" />
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
