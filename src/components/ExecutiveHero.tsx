import React from 'react';
import { Button } from '@/components/ui/button';
import BookingDialog from './BookingDialog';
import { ArrowDown } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const ExecutiveHero = () => {
  const scrollToTrackRecord = () => {
    const section = document.getElementById('track-record');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-32 md:pt-44 lg:pt-48 pb-20 md:pb-28 px-6 md:px-8 bg-background">
      <div className="container mx-auto max-w-3xl text-center">
        <ScrollReveal direction="up" delay={0}>
          <SectionLabel number="01" label="Strategic Carbon Advisory" />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={1}>
          <h1 className="text-display font-serif tracking-tight text-foreground mt-6 mb-8 max-w-[700px] mx-auto">
            I ensure climate transition strategy is credible, compliant, and investable in India.
          </h1>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={2}>
          <p className="text-lede text-muted-foreground max-w-lg mx-auto mb-10">
            Strategic advisor to CEOs & boards including Microsoft, KPMG India, Ford & Volkswagen
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <BookingDialog triggerText="Schedule Consultation" />
            <Button 
              variant="ghost" 
              size="lg"
              onClick={scrollToTrackRecord}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              View Credentials
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ExecutiveHero;
