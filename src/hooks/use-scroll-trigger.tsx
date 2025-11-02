import { useState, useEffect } from 'react';

interface UseScrollTriggerOptions {
  threshold?: number;
  onTrigger?: () => void;
}

export const useScrollTrigger = ({ 
  threshold = 0, 
  onTrigger 
}: UseScrollTriggerOptions = {}) => {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      
      if (scrolled && !isTriggered) {
        setIsTriggered(true);
        onTrigger?.();
      } else if (!scrolled && isTriggered) {
        setIsTriggered(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, isTriggered, onTrigger]);

  return isTriggered;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollable = documentHeight - windowHeight;
      const scrollProgress = (scrollTop / scrollable) * 100;
      
      setProgress(Math.min(Math.max(scrollProgress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};
