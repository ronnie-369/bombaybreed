import React from 'react';

interface TopicTagProps {
  topic: string;
  clickable?: boolean;
  onClick?: () => void;
}

const TopicTag: React.FC<TopicTagProps> = ({ topic, clickable = false, onClick }) => {
  const base = 'inline-block px-3 py-1 rounded-full border border-border text-[11px] font-medium text-muted-foreground transition-colors';
  const interactive = clickable ? 'cursor-pointer hover:border-foreground hover:text-foreground' : '';

  return (
    <span className={`${base} ${interactive}`} onClick={clickable ? onClick : undefined}>
      {topic}
    </span>
  );
};

export default TopicTag;
