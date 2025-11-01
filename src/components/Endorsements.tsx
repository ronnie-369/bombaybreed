
import React, { useState, useEffect } from 'react';
import { Star, Building2, ChevronDown } from 'lucide-react';
import { preloadLogos } from '@/utils/storage-logos';
import Logo from '@/components/ui/Logo';
import { Skeleton } from '@/components/ui/skeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Endorsements = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <section className="py-28 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-subtle/20">
      <div className="container mx-auto">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full group">
            <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all mb-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                <span className="text-gradient">Trusted by Leaders</span>
              </h2>
              <ChevronDown className={`w-8 h-8 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mb-8">
              <h3 className="text-lg font-heading font-semibold mb-4 flex items-center justify-center">
                <Star className="h-5 w-5 mr-2 text-bombay-accent" />
                CXO leaders at:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {[...cmos, ...ceos].slice(0, 8).map((company, index) => (
                  <div 
                    key={index} 
                    className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded bg-white/50 p-1 flex items-center justify-center">
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
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className="text-foreground/90 font-medium text-card group-hover:text-primary transition-colors duration-300">
                        {company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default Endorsements;
