import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { motion } from 'framer-motion';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="inline-block text-[11px] font-semibold tracking-[4px] uppercase text-accent">
              Flagship Report
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-accent"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-accent">
                New
              </span>
            </span>
          </div>
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
