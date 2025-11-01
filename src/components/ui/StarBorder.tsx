import React from 'react';
import { cn } from '@/lib/utils';

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  color?: 'cyan' | 'purple';
  speed?: string;
  children: React.ReactNode;
}

const StarBorder = ({
  as: Component = 'div',
  className,
  color = 'cyan',
  speed = '5s',
  children,
}: StarBorderProps) => {
  const colorMap = {
    cyan: {
      from: 'rgba(20, 184, 166, 0.8)',
      to: 'rgba(6, 182, 212, 0.8)',
    },
    purple: {
      from: 'rgba(147, 51, 234, 0.8)',
      to: 'rgba(99, 102, 241, 0.8)',
    },
  };

  const selectedColor = colorMap[color];

  return (
    <Component className={cn('relative rounded-lg', className)}>
      <style>{`
        @keyframes rotate-border {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .star-border-wrapper::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            ${selectedColor.from} 60deg,
            ${selectedColor.to} 120deg,
            transparent 180deg,
            transparent 360deg
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate-border ${speed} linear infinite;
          pointer-events: none;
        }
      `}</style>
      <div className="star-border-wrapper relative h-full">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
