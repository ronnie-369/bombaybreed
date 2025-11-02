
import React, { useState, useEffect } from 'react';
import { Star, Building2 } from 'lucide-react';
import { preloadLogos } from '@/utils/storage-logos';
import Logo from '@/components/ui/Logo';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Endorsements = () => {
  const [logos, setLogos] = useState<Map<string, string | null>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  const cmos = [
    "Volkswagen Malaysia Bhd",
    "PETRONAS",
    "United Breweries",
    "Tripsy Games",
    "Bharti AXA",
    "TVS Motors",
    "Ford Motor Co",
    "Microsoft India"
  ];

  const ceos = [
    "KPMG India",
    "Microsoft India",
    "ITC Foods",
    "Publicis India",
    "Machani Group",
    "GUVNL",
    "ProClime",
    "Quess Corp",
    "Bharatiya.org",
    "Gh2 Org"
  ];

  // Load logos on component mount
  useEffect(() => {
    const loadLogos = async () => {
      try {
        const allCompanies = [...cmos, ...ceos];
        const logoMap = await preloadLogos(allCompanies);
        setLogos(logoMap);
      } catch (error) {
        console.error('Error loading logos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogos();
  }, []);

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-[rgba(245,158,11,0.15)]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100/50 px-4 py-2 rounded-full mb-6">
            <Star className="h-5 w-5 text-amber-600" fill="currentColor" />
            <span className="text-sm font-semibold text-amber-900">Trusted by Industry Leaders</span>
          </div>
          <h2 className="section-title gradient-accent mb-4">20+ Years of Executive Partnerships</h2>
          <p className="section-description max-w-3xl mx-auto">
            Proven track record with Fortune 500 enterprises, government organizations, and climate-focused innovators across multiple sectors
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="glass-card rounded-xl p-6 text-center hover-scale">
            <div className="text-3xl font-bold gradient-accent mb-2">20+</div>
            <div className="text-sm text-foreground/70">Years Experience</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center hover-scale">
            <div className="text-3xl font-bold gradient-accent mb-2">50+</div>
            <div className="text-sm text-foreground/70">CXO Partnerships</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center hover-scale">
            <div className="text-3xl font-bold gradient-accent mb-2">12+</div>
            <div className="text-sm text-foreground/70">Industries Served</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center hover-scale">
            <div className="text-3xl font-bold gradient-accent mb-2">$15M+</div>
            <div className="text-sm text-foreground/70">Client Value Created</div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="trusted-leaders" className="border rounded-lg px-6 bg-card shadow-sm">
            <AccordionTrigger className="text-base md:text-lg font-heading hover:no-underline py-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary" />
                <span>View Client Portfolio</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-6 pb-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                    Strategic Partnerships With
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...cmos, ...ceos].map((company, index) => (
                      <div 
                        key={index} 
                        className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-primary/20 border border-transparent transition-all duration-300 animate-fade-in"
                        style={{animationDelay: `${index * 30}ms`}}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {isLoading ? (
                              <Skeleton className="w-full h-full rounded" />
                            ) : logos.get(company) ? (
                              <Logo 
                                src={logos.get(company)!} 
                                alt={`${company} logo`}
                                className="w-full h-full object-contain"
                                fallbackSrc=""
                              />
                            ) : (
                              <Building2 className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-foreground font-semibold text-sm block group-hover:text-primary transition-colors duration-300">
                              {company}
                            </span>
                            <span className="text-xs text-foreground/50">
                              {cmos.includes(company) ? 'Marketing Leadership' : 'Executive Partnership'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
                  <p className="text-sm text-foreground/80 text-center">
                    <span className="font-semibold text-foreground">Confidential client work:</span> Additional partnerships with government ministries, multinational corporations, and climate organizations under NDA
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Endorsements;
