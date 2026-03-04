import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <SectionLabel label="Special Investigation" />
          <h2 className="text-section font-serif tracking-tight mt-4 mb-5 max-w-[600px]">
            The One Emitter the Paris Agreement{' '}
            <em className="italic">Forgot to Name</em>
          </h2>
          <p className="text-body text-muted-foreground max-w-[580px] mb-3">
            Every climate treaty ever signed has a missing line. The world's militaries collectively emit more greenhouse gases than all but two nations on earth — and appear in none of them.
          </p>
          <p className="text-xs text-muted-foreground/60 font-mono tracking-wide uppercase mb-7">
            5,800 Words · Bombay Breed Intelligence
          </p>
          <a
            href="/special-features/war-climate.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Read the Investigation <ArrowRight className="w-4 h-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SpecialFeatureHighlight;
