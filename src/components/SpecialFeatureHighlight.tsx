import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <SectionLabel label="Intelligence Brief" />
          <h2 className="text-section font-serif tracking-tight mt-4 mb-5 max-w-[600px]">
            India's Renewable Grid at Breaking Point —{' '}
            <em className="italic">Strategic Analysis of the 203 GW Crisis</em>
          </h2>
          <p className="text-body text-muted-foreground max-w-[580px] mb-3">
            India's grid is buckling under 203 GW of renewable capacity with no storage backbone. This analysis maps the crisis across five dimensions — and what it means for energy strategy.
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono tracking-wide uppercase mb-7">
            Intelligence Brief · February 2026 · Bombay Breed Intelligence
          </p>
          <a
            href="/insights/india-renewable-grid-analysis"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Read the Analysis <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SpecialFeatureHighlight;
