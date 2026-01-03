import React from 'react';
import AnimatedLogo from './AnimatedLogo';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background",
        "transition-opacity duration-500 ease-out",
        !isLoading && "opacity-0 pointer-events-none"
      )}
      aria-busy={isLoading}
      aria-live="polite"
    >
      {/* Logo Container */}
      <div className="preloader-logo-entrance flex flex-col items-center gap-6">
        <AnimatedLogo 
          className="h-20 w-auto md:h-24" 
          alt="Bombay Breed Logo"
        />
        
        {/* Brand Name */}
        <div className="preloader-text-reveal">
          <span className="text-sm md:text-base font-medium tracking-[0.3em] text-foreground/80 uppercase">
            Bombay Breed
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-32 md:w-40">
        <div className="h-px bg-border overflow-hidden rounded-full">
          <div className="preloader-progress h-full bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
