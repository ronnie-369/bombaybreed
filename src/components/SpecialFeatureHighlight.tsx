import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <SectionLabel label="Carbon Markets · New" />
          <h2 className="text-section font-serif tracking-tight mt-4 mb-5 max-w-[600px]">
            The Market That Ran on One Buyer
          </h2>
          <p className="text-body text-muted-foreground max-w-[580px] mb-3">
            Microsoft accounted for 90% of all durable CDR contracted volume in 2025. Its purchasing pause is not a surprise - it is the consequence of documented concentration risk. We map the data, the regulatory divergence, and why India's compliance market may be the structural answer.
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono tracking-wide uppercase mb-7">
            Intelligence Brief · April 2026 · The Climate Desk
          </p>
          <Link
            to="/insights/microsoft-cdr-market-pause"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Read the Analysis <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SpecialFeatureHighlight;
