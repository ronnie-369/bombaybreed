import React from 'react';

interface AnimatedLogoProps {
  className?: string;
  alt: string;
  fallbackSrc?: string;
}

/**
 * Static logo component. The previous Supabase-hosted animated video path
 * returned 400s, which could make the page appear stuck while loading assets.
 */
const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className = "", 
  alt,
  fallbackSrc = "/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
}) => {
  return (
    <img
      src={fallbackSrc}
      alt={alt}
      className={className}
      decoding="async"
    />
  );
};

export default AnimatedLogo;
