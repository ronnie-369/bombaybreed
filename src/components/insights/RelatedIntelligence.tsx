import React from 'react';
import { Link } from 'react-router-dom';
import ContentTypeBadge from './ContentTypeBadge';
import type { InsightData } from '@/data/insights';

interface RelatedIntelligenceProps {
  items: InsightData[];
}

const RelatedIntelligence: React.FC<RelatedIntelligenceProps> = ({ items }) => {
  if (!items.length) return null;

  return (
    <section className="py-16 px-6 md:px-8">
      <div className="container mx-auto max-w-[900px]">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">
          Related Intelligence
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`/insights/${item.slug}`}
              className="block bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <ContentTypeBadge type={item.contentType} />
              <h3 className="font-semibold text-[15px] text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-[13px] text-muted-foreground line-clamp-2">
                {item.subtitle || item.executiveSummary.slice(0, 100) + '...'}
              </p>
              <p className="text-[11px] text-muted-foreground/60 mt-3">{item.publishedDate}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedIntelligence;
