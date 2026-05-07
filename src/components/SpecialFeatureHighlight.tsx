import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <SectionLabel label="Flagship Report · New" />
          <h2 className="text-section font-serif tracking-tight mt-4 mb-5 max-w-[640px]">
            Mitigation and Adaptation, Working as One: An Investor's View of Himachal Pradesh
          </h2>
          <p className="text-body text-muted-foreground max-w-[600px] mb-3">
            Why Himachal Pradesh's climate exposure is India's exposure. The umbrella synthesis to The Climate Desk's Himachal investigation - linking produce economics, crop hardiness, tourism, and the restoration-economy thesis for capital allocators.
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono tracking-wide uppercase mb-7">
            Investor Synthesis · May 2026 · The Climate Desk
          </p>
          <a
            href="/special-features/tcd-hp-investor-synthesis.html"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Read the Synthesis <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SpecialFeatureHighlight;
