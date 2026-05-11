import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import SpotlightCard from '@/components/ui/SpotlightCard';

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

// Subtle magnetic tilt - kept low to stay on-brand (editorial, restrained).
const TILT_MAX = 4;
const TILT_SPRING = { stiffness: 300, damping: 28 } as const;

interface PillarCardProps {
  pillar: typeof pillars[number];
}

const PillarCard: React.FC<PillarCardProps> = ({ pillar }) => {
  const ref = useRef<HTMLDivElement>(null);
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const rx = useSpring(useTransform(ny, [0, 1], [TILT_MAX, -TILT_MAX]), TILT_SPRING);
  const ry = useSpring(useTransform(nx, [0, 1], [-TILT_MAX, TILT_MAX]), TILT_SPRING);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    nx.set((e.clientX - r.left) / r.width);
    ny.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    nx.set(0.5);
    ny.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="h-full [transform-style:preserve-3d]"
    >
      <SpotlightCard tone="gold" className="rounded-xl h-full">
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
      </SpotlightCard>
    </motion.div>
  );
};

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1000px]">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.num} direction="up" delay={i as 0 | 1 | 2 | 3 | 4 | 5}>
              <PillarCard pillar={pillar} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
