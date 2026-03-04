import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const FeaturedInsight = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <SectionLabel label="Latest Intelligence" />
          <h2 className="text-section font-serif tracking-tight mt-4 mb-5 max-w-[600px]">
            The 2026 Carbon Playbook for Indian Boards
          </h2>
          <p className="text-body text-muted-foreground max-w-[580px] mb-7">
            India's carbon regulatory landscape has shifted decisively. This brief maps the CCTS framework, BRSR assurance requirements, and EU CBAM implications for board-level decision makers.
          </p>
          <Link
            to="/carbon-playbook"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Read the Brief <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturedInsight;
