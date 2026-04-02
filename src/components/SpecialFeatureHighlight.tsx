import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <SectionLabel label="Visual Intelligence" />
          <h2 className="text-section font-serif tracking-tight mt-4 mb-5 max-w-[600px]">
            India NDC 3.0 —{' '}
            <em className="italic">What India Promised the World</em>
          </h2>
          <p className="text-body text-muted-foreground max-w-[580px] mb-3">
            India's third Nationally Determined Contribution decoded in charts and data. Targets, timelines, sector pledges, and what it means for corporate India's climate strategy.
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono tracking-wide uppercase mb-7">
            Visual Analysis · April 2026 · Bombay Breed Intelligence
          </p>
          <a
            href="/special-features/india-ndc3.html"
            target="_blank"
            rel="noopener noreferrer"
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
