import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <SectionLabel label="Policy Analysis · New" />
          <h2 className="text-section font-serif tracking-tight mt-4 mb-5 max-w-[600px]">
            India's CCUS Gap Is Not About Money -{' '}
            <em className="italic">Five Regulatory Instruments the ₹20,000 Crore Mission Cannot Substitute</em>
          </h2>
          <p className="text-body text-muted-foreground max-w-[580px] mb-3">
            The budget allocated ₹20,000 crore. The roadmap was published. The sector still cannot move. This policy analysis maps the five regulatory gaps blocking CCUS deployment - and the global precedents to close them.
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono tracking-wide uppercase mb-7">
            Policy Analysis · April 2026 · The Climate Desk
          </p>
          <a
            href="/insights/ccus-policy-gap"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Download the Report <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SpecialFeatureHighlight;
