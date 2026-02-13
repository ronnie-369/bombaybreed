import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

const personalities = [
  { emoji: '🔧', label: 'Builder' },
  { emoji: '🌱', label: 'Earth Keeper' },
  { emoji: '📊', label: 'Systems Thinker' },
  { emoji: '🤝', label: 'Catalyst' },
];

const GreenJobsTeaser = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 px-6 md:px-8"
      style={{
        background: 'linear-gradient(170deg, hsl(153, 40%, 18%) 0%, hsl(153, 42%, 28%) 60%, hsl(153, 38%, 38%) 100%)',
      }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <ScrollReveal direction="up">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-emerald-300 mb-4">
            A Climate Digest Career Guide
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-5">
            Your Future is Green.<br />Here's the Map.
          </h2>

          <p className="text-base md:text-lg text-emerald-200/80 leading-relaxed max-w-xl mx-auto mb-8">
            <span className="font-semibold text-white">375 million net new jobs</span> are coming by 2035.
            Find the climate career that fits your personality — not a generic list, but <em>your</em> path.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={1}>
          {/* Personality emoji row */}
          <div className="flex justify-center gap-3 mb-8">
            {personalities.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-1.5">
                <span className="text-2xl bg-white/10 rounded-full w-12 h-12 flex items-center justify-center">
                  {p.emoji}
                </span>
                <span className="text-[11px] text-emerald-300/70 font-medium">{p.label}</span>
              </div>
            ))}
          </div>

          <Link to="/green-jobs-guide">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold px-8 py-6 rounded-xl shadow-lg shadow-accent/30 btn-micro"
            >
              Take the Free Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <p className="text-xs text-white/40 mt-5 tracking-wide">
            30 seconds · Personalised career matches · Based on WRI data
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GreenJobsTeaser;
