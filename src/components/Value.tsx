
import React from 'react';
import { BadgeCheck } from 'lucide-react';

const Value = () => {
  const benefits = [
    "Strategic Leadership with C-Suite Experience",
    "Deep Government & International Relations Expertise",
    "Solution-Oriented Approach to Complex Business Challenges",
    "Proven Track Record Across Sustainability, Communications & Business Transformation"
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-subtle/20 to-white animate-fade-in">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title gradient-accent">Why CXOs Choose <span className="whitespace-nowrap">Bombay Breed</span></h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6"></div>
            <p className="text-body-sm text-foreground/80 mb-8">
              For over two decades, Bombay Breed has partnered with CXOs, governments, bureaucrats, and international organizations to solve complex business challenges. Our solution-oriented approach and problem-solving expertise at the core enable leaders to navigate regulatory landscapes, align stakeholder expectations, and transform strategic imperatives into measurable outcomes across sustainability, communications, and business transformation
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full mr-3 shadow-sm">
                    <BadgeCheck className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-body-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value;
