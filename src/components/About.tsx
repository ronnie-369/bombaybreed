import React from 'react';
import { Check, LinkedinIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { climateDesk } from '@/config/stats';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


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
                Snowballing Competence Now in{' '}
                <span className="text-gradient">Carbon Markets and Energy Transition</span>
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
        <Accordion type="single" collapsible className="mb-24">
          <AccordionItem value="name" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-xl md:text-2xl font-heading hover:no-underline">
              What's in a name?
            </AccordionTrigger>
            <AccordionContent>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start mt-8">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Experience Section */}
        <Accordion type="single" collapsible className="mb-16">
          <AccordionItem value="experience" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-xl md:text-2xl font-heading hover:no-underline">
              Experience
            </AccordionTrigger>
            <AccordionContent>
            <div className="space-y-6 mt-8">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* The X Factor Section */}
        <Accordion type="single" collapsible className="mb-24">
          <AccordionItem value="xfactor" className="border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-xl md:text-2xl font-heading hover:no-underline">
              The X Factor
            </AccordionTrigger>
            <AccordionContent>
              {/* Flow Diagram */}
              <div className="space-y-8 py-8">
                {/* Top Row - Main Process Boxes */}
                <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap px-4">
                  <div className="flex flex-col items-center gap-3">
                    <div className="border-2 border-foreground rounded-xl px-6 py-3 bg-background">
                      <span className="text-sm md:text-base font-bold text-foreground whitespace-nowrap">INSIGHT</span>
                    </div>
                    <div className="w-px h-8 bg-foreground/30"></div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="border-2 border-foreground rounded-xl px-6 py-3 bg-background">
                      <span className="text-sm md:text-base font-bold text-foreground whitespace-nowrap">STRATEGY</span>
                    </div>
                    <div className="w-px h-8 bg-foreground/30"></div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="border-2 border-foreground rounded-xl px-6 py-3 bg-background">
                      <span className="text-sm md:text-base font-bold text-foreground whitespace-nowrap">INNOVATION</span>
                    </div>
                    <div className="w-px h-8 bg-foreground/30"></div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="border-2 border-foreground rounded-xl px-6 py-3 bg-background">
                      <span className="text-sm md:text-base font-bold text-foreground whitespace-nowrap">EXECUTION</span>
                    </div>
                    <div className="w-px h-8 bg-foreground/30"></div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="border-2 border-foreground rounded-xl px-6 py-3 bg-background">
                      <span className="text-sm md:text-base font-bold text-foreground whitespace-nowrap">GOVERNANCE</span>
                    </div>
                    <div className="w-px h-8 bg-foreground/30"></div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="border-2 border-foreground rounded-xl px-6 py-3 bg-background">
                      <span className="text-sm md:text-base font-bold text-foreground whitespace-nowrap">IMPACT</span>
                    </div>
                    <div className="w-px h-8 bg-foreground/30"></div>
                  </div>
                </div>
                
                {/* Middle Row - Chevron Flow with Methodology */}
                <div className="relative overflow-x-auto px-4">
                  <div className="flex items-center justify-center gap-0 min-w-max mx-auto">
                    {/* Chevron 1 */}
                    <div className="relative flex items-center justify-center border-2 border-foreground bg-background px-6 py-4 min-w-[140px] md:min-w-[180px]"
                         style={{clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)'}}>
                      <span className="text-xs md:text-sm font-semibold text-foreground text-center whitespace-nowrap">Strategic<br/>Thinking</span>
                    </div>
                    
                    {/* Chevron 2 */}
                    <div className="relative flex items-center justify-center border-2 border-l-0 border-foreground bg-background px-6 py-4 min-w-[140px] md:min-w-[180px] -ml-5"
                         style={{clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)'}}>
                      <span className="text-xs md:text-sm font-semibold text-foreground text-center whitespace-nowrap">Proven<br/>Expertise</span>
                    </div>
                    
                    {/* Chevron 3 */}
                    <div className="relative flex items-center justify-center border-2 border-l-0 border-foreground bg-background px-6 py-4 min-w-[140px] md:min-w-[180px] -ml-5"
                         style={{clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)'}}>
                      <span className="text-xs md:text-sm font-semibold text-foreground text-center whitespace-nowrap">Communicati-<br/>on Innovation</span>
                    </div>
                    
                    {/* Chevron 4 */}
                    <div className="relative flex items-center justify-center border-2 border-l-0 border-foreground bg-background px-6 py-4 min-w-[140px] md:min-w-[180px] -ml-5"
                         style={{clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)'}}>
                      <span className="text-xs md:text-sm font-semibold text-foreground text-center whitespace-nowrap">Compliance<br/>& Risk</span>
                    </div>
                    
                    {/* Final Arrow */}
                    <div className="relative flex items-center justify-center border-2 border-l-0 border-foreground bg-background px-4 py-4 w-[60px] md:w-[80px] -ml-5"
                         style={{clipPath: 'polygon(0 0, 60% 0, 100% 50%, 60% 100%, 0 100%, 20px 50%)'}}>
                      <ArrowRight className="h-5 w-5 text-foreground ml-2" />
                    </div>
                  </div>
                </div>
                
                {/* Bottom Row - Supporting Elements with Connections */}
                <div className="flex items-start justify-center gap-4 md:gap-8 flex-wrap px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-px h-6 bg-foreground/30"></div>
                    <span className="text-xs md:text-sm text-muted-foreground text-center whitespace-nowrap">Strategic<br/>Thinking</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-px h-6 bg-foreground/30"></div>
                    <span className="text-xs md:text-sm text-muted-foreground text-center whitespace-nowrap">Proven<br/>Expertise</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-px h-6 bg-foreground/30"></div>
                    <div className="text-xs md:text-sm text-muted-foreground text-center">
                      <div>• Cross-Func Collab</div>
                      <div>• Stakeholder Trust</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-px h-6 bg-foreground/30"></div>
                    <span className="text-xs md:text-sm text-muted-foreground text-center whitespace-nowrap">Compliance<br/>& Risk</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-px h-6 bg-foreground/30"></div>
                    <span className="text-xs md:text-sm text-muted-foreground text-center whitespace-nowrap">Long-term<br/>Vision</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default About;
