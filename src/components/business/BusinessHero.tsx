import React from 'react';

const BusinessHero = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 bg-gradient-to-b from-background to-bombay-background/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-accent">
            Business Strategy Consulting
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8">
            Partnering across industries to deliver strategic growth solutions
          </p>
          <p className="section-description max-w-3xl mx-auto">
            With over two decades in integrated strategic communications and over 15 years of C-suite management, 
            Bombay Breed brings a unique blend of creative excellence and business acumen to drive your organization forward. 
            Our strength lies in our network of highly accomplished leaders who work deeply to solve business challenges 
            with a systems approach to ROI.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;
