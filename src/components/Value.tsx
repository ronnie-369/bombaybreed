
import React from 'react';
import { BadgeCheck } from 'lucide-react';

const Value = () => {
  const benefits = [
    "Accelerate Compliance and Disclosure Readiness",
    "Strengthen Investor Confidence and Capital Access",
    "Align Global Strategy with Local Execution",
    "Mitigate Regulatory and Reputational Risk"
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-subtle/20 to-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why CXOs Choose Bombay Breed</h2>
            <p className="text-lg text-foreground/80 mb-8">
              Global companies with Indian operations trust us to align their sustainability communications with international expectations while navigating local regulatory landscapes.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-bombay-accent/20 p-2 rounded-full mr-3">
                    <BadgeCheck className="h-5 w-5 text-bombay" />
                  </div>
                  <span className="text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-bombay-accent/30 to-bombay-subtle/40 rounded-3xl transform rotate-3 scale-105 blur-xl"></div>
            <div className="relative">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6">The Imperative of Sustainability</h3>
                <p className="mb-6 text-foreground/80">
                  In today's business environment, ESG and therefore sustainability is non-negotiable. Stakeholders expect transparency and accountability, necessitating a robust approach to communicate your sustainability initiatives effectively.
                </p>
                <p className="mb-6 text-foreground/80">
                  Governance frameworks and regulatory standards are continuously evolving, creating a challenging landscape for companies to navigate effectively. Excessive reporting can expose your business to accusations of greenwashing, while insufficient reporting may alienate key stakeholders.
                </p>
                <p className="text-foreground/80">
                  As the climate action landscape evolves with demanding targets and complex objectives, businesses must exhibit integrity, agility, and strategic foresight in their sustainability reporting to maintain a competitive edge.
                </p>
                <div className="mt-8 text-center">
                  <div className="inline-block bg-bombay text-white font-medium px-6 py-3 rounded-full">
                    Effective sustainability communication is a strategic advantage
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value;
