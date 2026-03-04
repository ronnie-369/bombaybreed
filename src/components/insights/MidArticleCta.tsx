import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MidArticleCtaProps {
  type: 'consultation' | 'flagship';
  topic?: string;
  flagshipSlug?: string;
  flagshipTitle?: string;
}

const MidArticleCta: React.FC<MidArticleCtaProps> = ({ type, topic, flagshipSlug, flagshipTitle }) => {
  if (type === 'flagship' && flagshipSlug) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 my-12 max-w-[680px] mx-auto">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-primary mb-2">
          Flagship Report
        </p>
        <h3 className="font-serif text-xl text-foreground mb-2">{flagshipTitle}</h3>
        <p className="text-sm text-muted-foreground mb-4">The complete analysis behind this brief.</p>
        <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
          <Link to={`/insights/${flagshipSlug}`}>Download the Report →</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8 my-12 max-w-[680px] mx-auto">
      <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-2">
        Go Deeper
      </p>
      <h3 className="font-serif text-xl text-foreground mb-2">
        Schedule a focused conversation about {topic || 'this topic'}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">30 minutes with Theresa Ronnie.</p>
      <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
        <Link to="/#contact">Book a Call →</Link>
      </Button>
    </div>
  );
};

export default MidArticleCta;
