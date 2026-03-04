import React from 'react';

interface ContentTypeBadgeProps {
  type: 'Flagship Report' | 'Intelligence Brief' | 'Regulatory Alert' | 'Perspective';
}

const badgeStyles: Record<string, string> = {
  'Flagship Report': 'bg-primary text-primary-foreground',
  'Intelligence Brief': 'bg-foreground text-background',
  'Regulatory Alert': 'bg-destructive text-destructive-foreground',
  'Perspective': 'bg-accent text-accent-foreground',
};

const ContentTypeBadge: React.FC<ContentTypeBadgeProps> = ({ type }) => {
  return (
    <span className={`inline-block px-3 py-1 rounded text-[11px] font-semibold uppercase tracking-wider ${badgeStyles[type]}`}>
      {type}
    </span>
  );
};

export default ContentTypeBadge;
