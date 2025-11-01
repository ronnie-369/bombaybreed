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
            With 18 years of integrated strategic communications experience and 11 years of C-suite management, 
            we bring a unique blend of creative excellence and business acumen to drive your organization forward.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;
