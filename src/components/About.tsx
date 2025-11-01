import React from 'react';
import { Check, LinkedinIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { climateDesk } from '@/config/stats';


const About = () => {
  const expertise = ["Proven Expertise", "Strategic Insighting", "Data-Led Approach", "Risk Management", "Stakeholder Engagement", "Innovation in Communication", "Tracking Compliance & Standards", "Cross-Functional Collaboration", "Long-term Vision"];
  
  const experience = [{
    area: "Creative Expression",
    years: 12,
    label: "12 yrs"
  }, {
    area: "Brand Marketing",
    years: 23,
    label: "23 yrs"
  }, {
    area: "Business Leadership",
    years: 15,
    label: "15 yrs"
  }, {
    area: "Motherhood",
    years: 15,
    label: "15 yrs"
  }, {
    area: "Climate Marketing",
    years: 2.5,
    label: "2.5 yrs"
  }];

  const maxYears = 30;

  // Use award ceremony image
  const portraitUrl = "https://zjiwmdrtuhsrymsuvpfb.supabase.co/storage/v1/object/public/brand%20assets/5Q2A8758.jpg";

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Editorial Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start mb-24">
          {/* Left Column - Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                A Strong History of{' '}
                <span className="text-gradient">C-suite Advisory</span>
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent"></div>
              
              <p className="text-lede text-muted-foreground">
                Strategic leadership across sustainability, communications, and business transformation
              </p>
            </div>

            <div className="space-y-6 max-w-none">
              <p className="text-body-sm text-foreground/80">
                Theresa has been a steady yet dynamic influence with CEOs and CXOs (CFOs, COOs, CSOs, CMOs) for over a greater part of two decades. She has led advertising agencies, consulted with KPMG India, worked with the senior leadership at Microsoft India, before shifting her focus to Climate Action. Today, she leads the brand and marketing department of a full stack carbon company while also serving as the steady journalistic partner of a global climate ambassador with a focus on India.
              </p>
              
              <p className="text-body-sm text-foreground/80">
                Possessing an easy-going yet highly professional demeanour, <span className="font-bold shine-text">Theresa is heavy on impact to bottomline and hard on effectiveness metrics</span>. She is a student of climate sciences, mythology, behaviour studies, socio-economics, business movements, cultural trends and an active investor in the stock market.
              </p>

              <p className="text-body-sm text-foreground/80">
                Through The Climate Desk publication, she reaches <span className="font-bold shine-text">{climateDesk.subscriberText} subscribers from around the world</span>, sharing insights and driving thought leadership in sustainability communications. She regularly holds webinars and facilitates industry knowledge sharing and ecosystem building efforts, connecting stakeholders across the sustainability landscape.
              </p>
              
              <p className="text-body-sm text-foreground/80">
                A mother, writer, futurist, philosopher, social scientist and free spirit, Theresa believes that businesses can build for sustainability and convert it to their competitive advantage.
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
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={portraitUrl}
                    alt="Theresa Ronnie receiving award - Professional recognition"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 40%', transform: 'scale(1.3)' }}
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      e.currentTarget.src = "/public/lovable-uploads/placeholder-portrait.jpg";
                    }}
                  />
                  
                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Quote Bubble */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-lg border max-w-sm animate-fade-in">
                <p className="text-note font-medium text-card-foreground italic">
                  "If we don't get it right now, we are not going to be able to retain what we have..."
                </p>
                <div className="w-3 h-3 bg-card transform rotate-45 absolute -top-1.5 left-8 border-l border-t"></div>
              </div>
            </div>
          </div>
        </div>

        {/* The Name Section */}
        <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Left Column - Logo */}
            <div className="lg:col-span-2">
              <div className="relative group">
                {/* Background Elements */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/30 rounded-3xl blur-2xl"></div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-3xl"></div>
                
                {/* Main Logo Container */}
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[3/4] relative">
                    <img 
                      src="https://zjiwmdrtuhsrymsuvpfb.supabase.co/storage/v1/object/public/brand%20assets/466784065_10159926171046216_7796875165911313074_n.jpg"
                      alt="Bombay Breed Consulting"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
                  </div>
                </div>
                
                {/* Quote Bubble */}
                <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-lg border max-w-sm animate-fade-in">
                  <p className="text-note font-medium text-card-foreground italic">
                    "We do this for the children"
                  </p>
                  <div className="w-3 h-3 bg-card transform rotate-45 absolute -top-1.5 right-8 border-r border-t"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                  What's{' '}
                  <span className="text-gradient">in a name</span>?
                </h1>
                
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent"></div>
                
                <p className="text-lede text-muted-foreground">
                  A tribute to an unlikely guardian and a reminder that true strength can come in unexpected forms
                </p>
              </div>

              <div className="space-y-6 max-w-none">
                <p className="text-body-sm text-foreground/80">
                  Named after the Bombay Breed—a cat known for natural curiosity, remarkable adaptability, and fierce protectiveness. This consulting practice embodies those same traits.
                </p>

                <p className="text-body-sm text-foreground/80 font-medium text-primary">
                  Curious by nature. Adaptable in approach. Fiercely protective of what matters—your reputation, your stakeholders, your future.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Expertise Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Section */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              <span className="text-gradient">Experience</span>
            </h2>
            <div className="space-y-6">
              {experience.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-foreground min-w-[200px] text-sm">{item.area}</span>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 bg-muted/30 rounded-full h-8 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 flex items-center justify-end px-3"
                          style={{ width: `${(item.years / maxYears) * 100}%` }}
                        >
                          <span className="text-xs font-semibold text-white whitespace-nowrap">{item.label}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The X Factor Section */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              <span className="text-gradient">The X Factor</span>
            </h2>
            
            {/* Flow Diagram */}
            <div className="space-y-6 overflow-x-auto">
              {/* Top Row - Main Process Flow */}
              <div className="flex items-center justify-start md:justify-center gap-2 md:gap-3 text-center min-w-max px-4">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm md:text-base lg:text-lg font-semibold text-foreground whitespace-nowrap">Insight</span>
                </div>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm md:text-base lg:text-lg font-semibold text-foreground whitespace-nowrap">Strategy</span>
                </div>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm md:text-base lg:text-lg font-semibold text-foreground whitespace-nowrap">Innovation</span>
                </div>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm md:text-base lg:text-lg font-semibold text-foreground whitespace-nowrap">Execution</span>
                </div>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm md:text-base lg:text-lg font-semibold text-foreground whitespace-nowrap">Governance</span>
                </div>
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm md:text-base lg:text-lg font-semibold text-foreground whitespace-nowrap">Impact</span>
                </div>
              </div>
              
              {/* Second Row - Descriptions */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 text-center px-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs md:text-sm text-muted-foreground">Strategic</span>
                  <span className="text-xs md:text-sm text-muted-foreground">Thinking</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs md:text-sm text-muted-foreground">Proven</span>
                  <span className="text-xs md:text-sm text-muted-foreground">Expertise</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs md:text-sm text-muted-foreground">Communication</span>
                  <span className="text-xs md:text-sm text-muted-foreground">Innovation</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs md:text-sm text-muted-foreground">Cross-Func</span>
                  <span className="text-xs md:text-sm text-muted-foreground">Collab</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs md:text-sm text-muted-foreground">Compliance</span>
                  <span className="text-xs md:text-sm text-muted-foreground">& Risk</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs md:text-sm text-muted-foreground">Long-term</span>
                  <span className="text-xs md:text-sm text-muted-foreground">Vision</span>
                </div>
              </div>
              
              {/* Bottom - Stakeholder Trust */}
              <div className="flex justify-center pt-2">
                <span className="text-sm md:text-base font-semibold text-primary">Stakeholder Trust</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
