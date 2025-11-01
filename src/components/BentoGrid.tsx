import { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Leaf, Building2, FileText, Newspaper, User, Mail, Linkedin } from 'lucide-react';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = '132, 0, 255';

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  glowColor?: string;
}

const ParticleCard = ({ children, className = '', particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR }: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles]);

  return (
    <div ref={cardRef} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

const GlobalSpotlight = ({ gridRef, glowColor = DEFAULT_GLOW_COLOR }: { gridRef: React.RefObject<HTMLDivElement>; glowColor?: string }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef?.current) return;

    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current;
      const rect = section.getBoundingClientRect();
      const mouseInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.bento-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      let hasNearbyCard = false;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const maxDistance = 300;

        if (distance < maxDistance) {
          hasNearbyCard = true;
          const intensity = 1 - distance / maxDistance;
          const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
          const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

          cardElement.style.setProperty('--glow-x', `${relativeX}%`);
          cardElement.style.setProperty('--glow-y', `${relativeY}%`);
          cardElement.style.setProperty('--glow-intensity', intensity.toString());
        } else {
          cardElement.style.setProperty('--glow-intensity', '0');
        }
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        opacity: hasNearbyCard ? 0.6 : 0,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, glowColor]);

  return null;
};

interface BentoItemProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  to?: string;
  className?: string;
  children?: React.ReactNode;
}

const BentoItem = ({ title, subtitle, icon, to, className, children }: BentoItemProps) => {
  const content = (
    <ParticleCard className={`bento-card group relative overflow-hidden h-full backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl transition-all duration-300 hover:border-white/30 ${className}`}>
      <div className="p-6 h-full flex flex-col justify-between relative z-10">
        <div>
          {icon && (
            <div className="mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
              {icon}
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/80 text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(132, 0, 255, 0.15), transparent 40%)`,
          opacity: 'var(--glow-intensity, 0)'
        }}
      />
    </ParticleCard>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};

const BentoGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <GlobalSpotlight gridRef={gridRef} />
      <div className="max-w-7xl mx-auto">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          
          {/* Box 1: Header */}
          <BentoItem
            title="Transforming Strategy into Results"
            subtitle="Embedded Oversight and KPI-Driven ROI"
            className="md:col-span-2 md:row-span-2"
          >
            <div className="mt-4 text-white/60 text-xs md:text-sm">
              India's Premier Consulting Firm
            </div>
          </BentoItem>

          {/* Box 2: Carbon Markets */}
          <BentoItem
            title="Carbon Markets"
            subtitle="Strategic climate communications"
            icon={<Leaf className="w-8 h-8 text-teal-400" />}
            to="/climate-communications"
            className="md:row-span-2"
          />

          {/* Box 3: Business Strategy */}
          <BentoItem
            title="Business Strategy"
            subtitle="Cross-industry consulting"
            icon={<Building2 className="w-8 h-8 text-purple-400" />}
            to="/business-strategy"
            className="md:row-span-2"
          />

          {/* Box 4: Case Studies */}
          <BentoItem
            title="Case Studies"
            subtitle="Proven success stories"
            icon={<FileText className="w-8 h-8 text-amber-400" />}
            to="/climate-communications#case-studies"
          />

          {/* Box 5: Blog */}
          <BentoItem
            title="Blog"
            subtitle="Latest insights & reports"
            icon={<Newspaper className="w-8 h-8 text-blue-400" />}
            to="/climate-communications#blog"
          />

          {/* Box 6: About */}
          <BentoItem
            title="About"
            subtitle="Our story & expertise"
            icon={<User className="w-8 h-8 text-emerald-400" />}
            to="/climate-communications#about"
          />

          {/* Box 7: Contact */}
          <BentoItem
            title="Contact"
            subtitle="Let's connect"
            icon={<Mail className="w-8 h-8 text-rose-400" />}
            to="/climate-communications#contact"
          >
            <a 
              href="https://www.linkedin.com/in/saahilmehta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </BentoItem>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-400">
          <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default BentoGrid;
