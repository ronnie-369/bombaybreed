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
    <section className="pt-28 md:pt-36 lg:pt-40 pb-20 md:pb-28 px-6 md:px-8 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-5">
              <p className="text-sm font-medium text-accent tracking-wide uppercase">
                Board Advisory & Strategic Governance
              </p>
              
              <h1 className="text-display font-heading tracking-tight text-foreground">
                Theresa Ronnie
              </h1>
              
              <p className="text-lede text-muted-foreground">
                Strategic advisor to CEOs/CXOs including Microsoft, KPMG India & founders
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-body text-foreground/80 max-w-lg mx-auto lg:mx-0">
                Bridging carbon regulatory compliance, ESG strategy, and board governance — enabling companies to turn sustainability challenges into strategic advantage.
              </p>
              
              <p className="text-sm text-muted-foreground">
                Carbon/ESG Governance · Strategic Oversight · Regulatory Compliance
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <BookingDialog triggerText="Schedule Consultation" />
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
          <div className="relative order-first lg:order-last">
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
            
            {/* Professional Quote */}
            <div className="absolute -bottom-4 -left-4 bg-card p-5 rounded-lg shadow-sm border border-border max-w-xs animate-fade-in">
              <p className="text-sm text-card-foreground italic leading-relaxed">
                "Theresa won't oversell. She doesn't simplify irresponsibly. She is trustworthy to find the right answers."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveHero;
