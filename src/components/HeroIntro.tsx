import React from 'react';

const HeroIntro = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-bombay-background/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Welcome to Bombay Breed Consulting
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            A strong history of C-suite advisory, Bombay Breed Consulting is the quiet leadership brand leaders depend on. We are India's only strategic carbon communications advisory and consulting firm.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
