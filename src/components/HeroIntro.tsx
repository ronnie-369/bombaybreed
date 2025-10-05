import React from 'react';

const HeroIntro = () => {
  return (
    <section className="pt-24 pb-8 px-4 bg-gradient-to-b from-bombay-cream/30 to-transparent">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-bombay-teal mb-4 animate-fade-in">
          Welcome to Bombay Breed Consulting
        </h1>
        <p className="text-body text-bombay-charcoal/80 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          A strong history of C-suite advisory, Bombay Breed Consulting is the quiet leadership brand leaders depend on. We are India's only strategic carbon communications advisory and consulting firm.
        </p>
      </div>
    </section>
  );
};

export default HeroIntro;
