import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from 'lucide-react';

const ClimateHero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-bombay/10 rounded-full mb-4">
                <p className="text-sm font-semibold text-bombay">
                  India's Only Strategic Carbon Communications Advisory
                </p>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">Strategic Carbon &</span>
                <br />
                Energy Transition
                <br />
                Communications
              </h1>
              
              <p className="text-lede text-foreground/80 max-w-lg">
                We enable climate, carbon & energy-transition leaders to <span className="font-semibold">communicate, transform and scale</span>.
              </p>
              
              <p className="text-base text-foreground/70 max-w-lg">
                Serving carbon market intermediaries, energy corporates, and global NGOs with science-backed, market-driven communications strategies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Button 
                  onClick={() => scrollToSection('services')}
                  className="bg-bombay hover:bg-bombay-light text-white px-8 py-6 rounded-full text-lg"
                >
                  Discover Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('newsletter')}
                  variant="outline" 
                  className="border-bombay text-bombay hover:bg-bombay/10 px-8 py-6 rounded-full text-lg"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Subscribe to The Climate Desk
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-bombay-accent/20 to-bombay-subtle/40 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl shadow-xl">
                  {/* Note: Replace with climate-relevant imagery - energy infrastructure, carbon markets visualization, network effects */}
                  <img 
                    alt="Strategic Carbon & Energy Communications - Climate change solutions and carbon market strategies" 
                    className="w-full h-full object-cover object-center scale-90" 
                    src="/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png" 
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-xs">
                  <p className="text-sm font-medium text-bombay">
                    "Turn complex carbon markets into investor-ready narratives"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro/Context Section */}
      <section className="py-12 bg-gradient-to-b from-white to-bombay-background/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="section-title gradient-accent mb-6">
              Welcome to Bombay Breed Consulting
            </h2>
            <p className="section-description">
              A strong history of C-suite advisory, Bombay Breed Consulting is the quiet leadership brand leaders depend on. <span className="font-semibold shine-text">We are India's only strategic carbon communications advisory and consulting firm</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClimateHero;
