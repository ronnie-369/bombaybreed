import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  threshold?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  className
}: ScrollRevealProps) => {
  const { ref, isInView } = useInView({ 
    threshold, 
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true 
  });

  const animationClass = {
    up: 'animate-reveal-up',
    down: 'animate-reveal-down',
    left: 'animate-reveal-left',
    right: 'animate-reveal-right',
    scale: 'animate-reveal-scale'
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(
        'scroll-reveal',
        isInView && `in-view ${animationClass} reveal-delay-${delay}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
