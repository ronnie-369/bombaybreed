import React, { useState, useEffect } from 'react';
import BookingDialog from './LazyBookingDialog';

const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-t border-border/50 transition-all duration-200 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <p className="hidden md:block text-sm text-muted-foreground">
          Theresa Ronnie: Strategic Carbon Advisory
        </p>
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <BookingDialog triggerText="Schedule Consultation →" />
        </div>
      </div>
    </div>
  );
};

export default StickyCtaBar;
