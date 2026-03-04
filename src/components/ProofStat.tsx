import React from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const ProofStat = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 bg-background">
      <div className="container mx-auto max-w-3xl text-center">
        <ScrollReveal direction="up">
          <p className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4">
            18 Years
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            of C-suite advisory across carbon strategy, ESG governance, and sustainability communications
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProofStat;
