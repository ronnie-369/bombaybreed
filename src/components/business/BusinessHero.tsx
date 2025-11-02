import React from 'react';

const BusinessHero = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-gradient-to-b from-background to-purple-50/30">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-4 md:mb-6">
            <p className="text-xs md:text-sm font-semibold text-purple-700">
              Trusted by Industry Leaders for Over Two Decades
            </p>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent leading-tight px-4">
            Business Transformation Consulting
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-4 md:mb-6 font-medium px-4">
            Transform strategy into measurable results through proven execution frameworks
          </p>
          
          <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto mb-6 px-4">
            With over two decades in integrated strategic communications and 15+ years of C-suite management, 
            we deliver tangible ROI through in-house skill building, AI-enabled marketing, and systems-driven execution. 
            Unlike traditional consultancies, we combine creative excellence with business acumen—working deeply 
            with your teams to solve complex challenges that drive growth.
          </p>
          
          <p className="text-sm md:text-base text-foreground/70 max-w-2xl mx-auto px-4">
            Our strength: A network of accomplished leaders who bring a systems approach to every engagement
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;
