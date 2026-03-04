import React from 'react';
import { ArrowRight } from 'lucide-react';
import warClimateBanner from '@/assets/war-climate-banner.jpg';

const SpecialFeatureHighlight = () => {
  return (
    <section className="py-8 md:py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <a
          href="/special-features/war-climate.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative overflow-hidden rounded-sm border border-border/40 hover:border-border transition-all duration-500"
        >
          {/* Banner Image */}
          <div className="relative w-full aspect-[16/7] md:aspect-[16/5] overflow-hidden">
            <img
              src={warClimateBanner}
              alt="The One Emitter the Paris Agreement Forgot to Name — Special Investigation by Bombay Breed"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,60%,12%)] via-transparent to-transparent opacity-60" />
          </div>

          {/* Bottom bar */}
          <div className="bg-[hsl(215,60%,12%)] px-5 md:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-6 flex-wrap">
              <span className="text-[10px] md:text-xs font-mono tracking-[3px] uppercase text-[hsl(0,72%,40%)]">
                Special Investigation
              </span>
              <span className="hidden md:inline text-[10px] font-mono tracking-[2px] uppercase text-[hsl(215,20%,55%)]">
                5,800 Words
              </span>
              <span className="hidden md:inline text-[10px] font-mono tracking-[2px] uppercase text-[hsl(215,20%,55%)]">
                Bombay Breed Intelligence
              </span>
            </div>
            <span className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[hsl(40,30%,85%)] group-hover:text-[hsl(40,30%,95%)] transition-colors">
              Read
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default SpecialFeatureHighlight;
