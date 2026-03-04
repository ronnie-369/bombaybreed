import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const pillars = [
  {
    num: '01',
    title: 'Carbon Strategy',
    description: 'Carbon transition roadmapping, BRSR & CCTS compliance frameworks, decarbonisation pathway design, and carbon credit monetisation strategy.',
    link: '/services#carbon',
  },
  {
    num: '02',
    title: 'Board Governance',
    description: 'ESG board readiness, climate risk oversight frameworks, SEBI compliance preparation, and non-executive advisory for listed companies.',
    link: '/services#governance',
  },
  {
    num: '03',
    title: 'ESG Communications',
    description: 'Sustainability narrative strategy, investor-grade ESG reporting, stakeholder communications, and climate transition storytelling.',
    link: '/services#comms',
  },
];

const ServicePillars = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/50">
      <div className="container mx-auto max-w-[900px]">
        <ScrollReveal direction="up">
          <SectionLabel label="What We Do" />
          <h2 className="text-section font-serif tracking-tight mt-4 mb-12 max-w-[480px]">
            Three pillars of strategic advisory
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.num} direction="up" delay={i as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className="bg-card border border-border rounded-xl p-8 h-full flex flex-col transition-colors duration-200 hover:border-muted-foreground/30">
                <span className="text-xs font-semibold tracking-widest text-accent mb-5">
                  {pillar.num}
                </span>
                <h3 className="font-serif text-xl font-normal leading-snug text-foreground mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6 flex-1">
                  {pillar.description}
                </p>
                <Link
                  to={pillar.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
