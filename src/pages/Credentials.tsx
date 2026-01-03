import React from 'react';
import Header from '@/components/Header';
import { Check, LinkedinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Credentials = () => {
  const expertise = [
    "Proven Expertise", 
    "Strategic Insighting", 
    "Data-Led Approach", 
    "Risk Management", 
    "Stakeholder Engagement", 
    "Innovation in Communication", 
    "Tracking Compliance & Standards", 
    "Cross-Functional Collaboration", 
    "Long-term Vision"
  ];
  
  const experience = [
    {
      area: "Integrated Strategic Communications & Brand Stewardship",
      years: "18 years"
    },
    {
      area: "C-Suite Management & Strategic Business Leadership",
      years: "11 years"
    },
    {
      area: "Carbon Markets & Energy Transition",
      years: "10,000 hours"
    }
  ];

  const portraitUrl = import.meta.env.VITE_PORTRAIT_URL || "/lovable-uploads/76901386-d547-4a2e-b06b-2b2f1420a922.png";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 md:px-8 bg-primary">
        <div className="container mx-auto text-center max-w-3xl">
          <p className="text-sm font-medium text-primary-foreground/70 tracking-wide uppercase mb-4">
            Background
          </p>
          <h1 className="text-display font-heading tracking-tight mb-6 text-primary-foreground">
            Professional Credentials
          </h1>
          <p className="text-lede text-primary-foreground/80">
            Board-level strategic advisor with proven track record in C-suite advisory, carbon governance, and ESG oversight
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Editorial Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-20">
            {/* Left Column - Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-4">
                <h2 className="text-section font-heading tracking-tight">
                  A Strong History of C-suite Advisory
                </h2>
                
                <p className="text-lede text-muted-foreground">
                  Strategic leadership across sustainability, communications, and business transformation
                </p>
              </div>

              <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
                <p>
                  Theresa has been a steady yet dynamic influence with CEOs and CXOs (CFOs, COOs, CSOs, CMOs) for over a decade. She has led advertising agencies, consulted with KPMG India, worked with the senior leadership at Microsoft India, before shifting her focus to Climate Action.
                </p>
                
                <p>
                  Possessing an easy-going yet highly professional demeanour, Theresa brings bottom-line impact and effectiveness metrics to board-level oversight. She is a student of climate sciences, mythology, behaviour studies, socio-economics, business movements, cultural trends and an active investor in the stock market.
                </p>
                
                <p>
                  Theresa believes that businesses can build for sustainability and convert it to their competitive advantage through strategic governance, credible communications, and board-level oversight on carbon/ESG compliance.
                </p>
              </div>
              
              <div className="pt-2">
                <Button asChild variant="outline">
                  <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <LinkedinIcon className="h-4 w-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Portrait */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Main Portrait Container */}
                <div className="relative bg-muted rounded-lg overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <img 
                      src={portraitUrl}
                      alt="Theresa Ronnie - Independent Director & Board Advisor"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                
                {/* Quote */}
                <div className="absolute -bottom-4 -left-4 bg-card p-5 rounded-lg shadow-sm border border-border max-w-xs">
                  <p className="text-sm text-card-foreground italic leading-relaxed">
                    "The most trustworthy person on the Subcontinent"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">— Erik Solheim</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience & Expertise Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-primary">
                Experience
              </h3>
              <div className="space-y-0">
                {experience.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-border/50">
                    <span className="text-sm text-foreground pr-4">{item.area}</span>
                    <span className="text-sm text-primary font-medium whitespace-nowrap">{item.years}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-primary">
                Core Competencies
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Credentials;
