import { useState, useEffect } from 'react';

interface UsePreloaderOptions {
  minimumDuration?: number;
  respectReducedMotion?: boolean;
}

export const usePreloader = (options: UsePreloaderOptions = {}) => {
  const { 
    minimumDuration = 1800, 
    respectReducedMotion = true 
  } = options;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use shorter duration if user prefers reduced motion
    const duration = prefersReducedMotion ? 500 : minimumDuration;

    // Check if this is a return visit in the same session
    const hasSeenPreloader = sessionStorage.getItem('preloader-shown');
    const actualDuration = hasSeenPreloader ? Math.min(duration, 800) : duration;

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('preloader-shown', 'true');
    }, actualDuration);

    return () => clearTimeout(timer);
  }, [minimumDuration, respectReducedMotion]);

  return { isLoading };
};
