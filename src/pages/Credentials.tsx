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
      area: "Climate Marketing & Carbon Market Specialization",
      years: "2 years"
    }
  ];

  const portraitUrl = import.meta.env.VITE_PORTRAIT_URL || "/lovable-uploads/76901386-d547-4a2e-b06b-2b2f1420a922.png";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            Professional Credentials
          </h1>
          <p className="text-lede text-foreground/70">
            Board-level strategic advisor with proven track record in C-suite advisory, carbon governance, and ESG oversight
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Editorial Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start mb-24">
            {/* Left Column - Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                  A Strong History of{' '}
                  <span className="gradient-accent">C-suite Advisory</span>
                </h2>
                
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent"></div>
                
                <p className="text-lede text-muted-foreground">
                  Strategic leadership across sustainability, communications, and business transformation
                </p>
              </div>

              <div className="space-y-6 max-w-none">
                <p className="text-body text-foreground/80">
                  Theresa has been a steady yet dynamic influence with CEOs and CXOs (CFOs, COOs, CSOs, CMOs) for over a decade. She has led advertising agencies, consulted with KPMG India, worked with the senior leadership at Microsoft India, before shifting her focus to Climate Action.
                </p>
                
                <p className="text-body text-foreground/80">
                  Possessing an easy-going yet highly professional demeanour, Theresa brings bottom-line impact and effectiveness metrics to board-level oversight. She is a student of climate sciences, mythology, behaviour studies, socio-economics, business movements, cultural trends and an active investor in the stock market.
                </p>
                
                <p className="text-body text-foreground/80">
                  Theresa believes that businesses can build for sustainability and convert it to their competitive advantage through strategic governance, credible communications, and board-level oversight on carbon/ESG compliance.
                </p>
              </div>
              
              <div className="pt-4">
                <Button asChild size="lg" className="bg-[#0077B5] hover:bg-[#0077B5]/90 text-white">
                  <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
                    <LinkedinIcon className="h-5 w-5" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Portrait */}
            <div className="lg:col-span-2">
              <div className="relative group">
                {/* Background Elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/30 rounded-3xl blur-2xl"></div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-3xl"></div>
                
                {/* Main Portrait Container */}
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/5] relative">
                    <img 
                      src={portraitUrl}
                      alt="Theresa Ronnie - Independent Director & Board Advisor"
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                  </div>
                </div>
                
                {/* Quote Bubble */}
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-lg border max-w-sm animate-fade-in">
                  <p className="text-note font-medium text-card-foreground italic">
                    "Strategic governance oversight on carbon markets, ESG compliance, and stakeholder credibility."
                  </p>
                  <div className="w-3 h-3 bg-card transform rotate-45 absolute -top-1.5 left-8 border-l border-t"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience & Expertise Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Experience Section */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-heading font-bold">
                <span className="gradient-accent">Experience</span>
              </h3>
              <div className="space-y-4">
                {experience.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-border/50 hover:border-border transition-colors">
                    <span className="font-medium text-foreground pr-4">{item.area}</span>
                    <span className="text-primary font-semibold whitespace-nowrap">{item.years}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise Section */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-heading font-bold">
                <span className="gradient-accent">Core Competencies</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="mt-1 p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    </div>
                    <span className="text-foreground group-hover:text-primary transition-colors">{item}</span>
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
