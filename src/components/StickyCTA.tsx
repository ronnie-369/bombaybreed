import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SticyCTAProps {
  variant?: 'contact' | 'download' | 'schedule';
  scrollThreshold?: number;
}

const StickyCTA: React.FC<SticyCTAProps> = ({ 
  variant = 'contact',
  scrollThreshold = 400 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getContent = () => {
    switch (variant) {
      case 'download':
        return {
          text: 'Download Free Report',
          icon: <ArrowRight className="h-4 w-4" />,
          action: () => scrollToSection('reports')
        };
      case 'schedule':
        return {
          text: 'Schedule Consultation',
          icon: <Phone className="h-4 w-4" />,
          action: () => scrollToSection('contact')
        };
      default:
        return {
          text: 'Get In Touch',
          icon: <ArrowRight className="h-4 w-4" />,
          action: () => scrollToSection('contact')
        };
    }
  };

  const content = getContent();

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-gradient-to-r from-primary via-primary/95 to-primary backdrop-blur-md border-t border-primary/20 shadow-2xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto">
            <div className="hidden md:block">
              <p className="text-white font-semibold text-sm">
                Ready to transform your sustainability strategy?
              </p>
              <p className="text-white/80 text-xs">
                Join 50+ leading organizations building credible climate narratives
              </p>
            </div>
            <Button 
              onClick={content.action}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ml-auto"
            >
              {content.text}
              {content.icon}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
