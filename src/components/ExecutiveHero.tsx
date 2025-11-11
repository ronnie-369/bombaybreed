import React from 'react';
import { Button } from '@/components/ui/button';
import BookingDialog from './BookingDialog';
import { ArrowDown } from 'lucide-react';

import theresaPortrait from '@/assets/theresa-portrait.jpg';

const ExecutiveHero = () => {
  const portraitUrl = theresaPortrait;

  const scrollToTrackRecord = () => {
    const section = document.getElementById('track-record');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-28 md:pt-40 pb-20 px-4 md:px-8 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <p className="text-sm font-medium text-primary">Board Advisory & Strategic Governance</p>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Theresa Ronnie
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-heading text-foreground/70">
                Strategic advisor to CEOs/CXOs including Microsoft, KPMG India & founders
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto lg:mx-0"></div>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Carbon/ESG Governance | Strategic Oversight | Regulatory Compliance
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-body text-foreground/80 max-w-xl mx-auto lg:mx-0">
                Bridging carbon regulatory compliance, ESG strategy, and board governance — enabling companies to turn sustainability challenges into strategic advantage and credible governance.
              </p>
              
              <p className="text-note text-foreground/60">
                <span className="font-medium text-foreground">Bombay Breed Consulting</span> - Strategic Communications Advisory
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <BookingDialog triggerText="Schedule Board Advisory Consultation" />
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToTrackRecord}
                className="gap-2"
              >
                View Credentials
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - Portrait */}
          <div className="relative group order-first lg:order-last">
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
            
            {/* Professional Quote */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-lg border max-w-sm animate-fade-in">
              <p className="text-note font-medium text-card-foreground italic">
                "Strategic governance oversight on carbon markets, ESG compliance, and stakeholder credibility."
              </p>
              <div className="w-3 h-3 bg-card transform rotate-45 absolute -top-1.5 left-8 border-l border-t"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveHero;
