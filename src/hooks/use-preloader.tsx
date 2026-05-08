import { useState, useEffect } from 'react';
import { getSafeStorage } from '@/lib/safeStorage';

interface UsePreloaderOptions {
  minimumDuration?: number;
  respectReducedMotion?: boolean;
}

export const usePreloader = (options: UsePreloaderOptions = {}) => {
  const { 
    minimumDuration = 800, // Reduced from 1800ms
    respectReducedMotion = true 
  } = options;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference - skip preloader entirely
    const prefersReducedMotion = respectReducedMotion && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsLoading(false);
      return;
    }

    // Check if this is a return visit in the same session
    const sessionStore = getSafeStorage('sessionStorage');
    const hasSeenPreloader = sessionStore.getItem('preloader-shown');
    
    // Use shorter duration for return visitors (300ms vs 800ms)
    const actualDuration = hasSeenPreloader ? 300 : minimumDuration;

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStore.setItem('preloader-shown', 'true');
    }, actualDuration);

    return () => clearTimeout(timer);
  }, [minimumDuration, respectReducedMotion]);

  return { isLoading };
};
