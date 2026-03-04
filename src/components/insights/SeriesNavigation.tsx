import React from 'react';
import { Link } from 'react-router-dom';

interface SeriesNavigationProps {
  seriesName: string;
  items: { slug: string; title: string; year: string }[];
  currentSlug: string;
}

const SeriesNavigation: React.FC<SeriesNavigationProps> = ({ seriesName, items, currentSlug }) => {
  return (
    <section className="py-12 px-6 md:px-8 border-t border-border">
      <div className="container mx-auto max-w-[900px]">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">
          More from this Series
        </p>
        <h3 className="font-serif text-lg text-foreground mb-6">{seriesName}</h3>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`/insights/${item.slug}`}
              className={`flex-shrink-0 border rounded-lg p-4 min-w-[200px] transition-colors ${
                item.slug === currentSlug
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.year}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeriesNavigation;
