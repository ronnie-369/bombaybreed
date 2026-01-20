import { useState, useEffect } from 'react';

interface UseContentLoadingOptions {
  delay?: number;
}

export const useContentLoading = ({ delay = 150 }: UseContentLoadingOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Respect reduced motion preference - skip loading state entirely
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { isLoading };
};
