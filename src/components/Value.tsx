
import React from 'react';
import { BadgeCheck } from 'lucide-react';

const Value = () => {
  const benefits = [
    {
      title: "C-Suite Strategic Leadership",
      description: "20+ years navigating boardroom priorities and executive decision-making",
      metric: "2 decades"
    },
    {
      title: "Government & Policy Expertise",
      description: "Direct experience with regulators, bureaucrats, and international organizations",
      metric: "Multi-sector"
    },
    {
      title: "Solution-Oriented Problem Solving",
      description: "Proven frameworks that transform complexity into executable strategies",
      metric: "Results-driven"
    },
    {
      title: "Cross-Domain Integration",
      description: "Seamlessly bridge sustainability, communications, and business transformation",
      metric: "Integrated approach"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-bombay-subtle/20 to-white animate-fade-in">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-accent">Why CXOs Choose <span className="whitespace-nowrap">Bombay Breed</span></h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4 mb-6"></div>
          <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto px-4">
            For over two decades, we've partnered with CXOs, governments, and international organizations to solve complex business challenges—delivering measurable outcomes across sustainability, communications, and business transformation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 hover-scale animate-fade-in group"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full shadow-sm group-hover:shadow-md transition-shadow shrink-0">
                  <BadgeCheck className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-heading font-semibold">{benefit.title}</h3>
                    <span className="text-xs font-medium text-primary/70 bg-primary/10 px-2 py-1 rounded-full">
                      {benefit.metric}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;
