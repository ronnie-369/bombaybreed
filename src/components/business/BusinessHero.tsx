import React from 'react';

const BusinessHero = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 bg-gradient-to-b from-background to-purple-50/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-4">
            <p className="text-sm font-semibold text-purple-700">
              Trusted by Industry Leaders for Over Two Decades
            </p>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Business Transformation Consulting
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-4 font-medium">
            Transform strategy into measurable results through proven execution frameworks
          </p>
          
          <p className="section-description max-w-3xl mx-auto mb-6">
            With over two decades in integrated strategic communications and 15+ years of C-suite management, 
            we deliver tangible ROI through in-house skill building, AI-enabled marketing, and systems-driven execution. 
            Unlike traditional consultancies, we combine creative excellence with business acumen—working deeply 
            with your teams to solve complex challenges that drive growth.
          </p>
          
          <p className="text-base text-foreground/70 max-w-2xl mx-auto">
            Our strength: A network of accomplished leaders who bring a systems approach to every engagement
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessHero;
