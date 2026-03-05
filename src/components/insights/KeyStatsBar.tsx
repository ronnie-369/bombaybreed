import React from 'react';

interface KeyStatsBarProps {
  stats: { value: string; label: string }[];
  source?: string;
}

const KeyStatsBar: React.FC<KeyStatsBarProps> = ({ stats, source }) => {
  return (
    <section className="py-14 md:py-16 px-6 md:px-8 bg-accent/10">
      <div className="container mx-auto max-w-[900px]">
        <div className={`grid grid-cols-2 ${stats.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
          {stats.map((stat, i) => (
            <div key={i} className={`text-center ${i < stats.length - 1 ? 'md:border-r md:border-accent/20' : ''}`}>
              <div className="font-serif text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
              <p className="text-[12px] text-foreground/60 leading-snug max-w-[200px] mx-auto uppercase tracking-[0.08em] font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        {source && (
          <p className="text-[11px] text-muted-foreground/50 text-center mt-8">Source: {source}</p>
        )}
      </div>
    </section>
  );
};

export default KeyStatsBar;