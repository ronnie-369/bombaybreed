import React from 'react';

const HeroIntro = () => {
  return (
    <section className="pt-32 md:pt-40 pb-4 md:pb-8 bg-gradient-to-b from-background to-bombay-background/30">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        <div className="text-center max-w-5xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 gradient-accent">
            Welcome to Bombay Breed Consulting
          </h2>
          <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto px-4">
            A strong history of C-suite advisory, Bombay Breed Consulting is the quiet leadership brand leaders depend on. <span className="font-semibold shine-text">We are India's only strategic carbon communications advisory and consulting firm</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
