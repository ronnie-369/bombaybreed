import React from 'react';
import { ArrowRight } from 'lucide-react';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-8 md:py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <a
          href="/special-features/war-climate.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative overflow-hidden rounded-sm border border-border/20 hover:border-border/40 transition-all duration-500"
        >
          {/* Cover — matches the original HTML cover block exactly */}
          <div
            className="relative px-8 md:px-12 pt-12 md:pt-16 pb-10 md:pb-14 overflow-hidden"
            style={{ background: '#0f1f3d' }}
          >
            {/* Subtle red radial glow top-right */}
            <div
              className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle at top right, rgba(185,28,28,0.12), transparent 70%)',
              }}
            />

            {/* Label */}
            <div className="flex items-center gap-2.5 mb-6 md:mb-8">
              <span className="block w-9 h-[1.5px]" style={{ background: '#b91c1c' }} />
              <span
                className="font-mono text-[10px] md:text-[11px] tracking-[3.5px] uppercase"
                style={{ color: '#b91c1c' }}
              >
                Special Investigation
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.04] tracking-tight max-w-[680px] mb-5 md:mb-6"
              style={{ color: '#f7f3ec', letterSpacing: '-1.5px' }}
            >
              The One Emitter<br />
              the Paris Agreement<br />
              <em className="italic" style={{ color: '#b91c1c' }}>Forgot to Name</em>
            </h2>

            {/* Deck */}
            <p
              className="font-sans text-base md:text-[17px] font-light leading-relaxed max-w-[600px] mb-8 md:mb-9"
              style={{ color: 'rgba(247,243,236,0.72)' }}
            >
              Every climate treaty ever signed has a missing line. The world's militaries collectively emit more greenhouse gases than all but two nations on earth — and appear in none of them. This is not an oversight. It was a choice. And the world is paying for it.
            </p>

            {/* Meta bar */}
            <div
              className="flex items-center gap-4 md:gap-6 flex-wrap font-mono text-[10px] tracking-[2px] uppercase pt-5"
              style={{
                color: 'rgba(247,243,236,0.4)',
                borderTop: '1px solid rgba(247,243,236,0.1)',
              }}
            >
              <span style={{ color: 'rgba(247,243,236,0.65)' }}>Bombay Breed Intelligence</span>
              <span>·</span>
              <span style={{ color: 'rgba(247,243,236,0.65)' }}>5,800 Words</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline" style={{ color: 'rgba(247,243,236,0.45)' }}>
                Sources: CEOBS · Brown University · IEA · SIPRI · UNEP · Belfer Center · Ember · Queen Mary University
              </span>
            </div>

            {/* Read CTA — appears on hover */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'rgba(247,243,236,0.7)' }}>
              Read
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default SpecialFeatureHighlight;
