import React from 'react';

interface SectionLabelProps {
  number?: string;
  label: string;
  className?: string;
}

const SectionLabel = ({ label, className = '' }: SectionLabelProps) => {
  return (
    <span 
      className={`inline-block text-[11px] font-semibold tracking-[4px] uppercase text-accent mb-4 ${className}`}
    >
      {label}
    </span>
  );
};

export default SectionLabel;
