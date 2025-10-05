
import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { Link } from 'react-router-dom';

const Value = () => {
  const { ref: glowRef, isInView: glowInView } = useInView();
  
  const benefits = [
    "Accelerate Compliance and Disclosure Readiness",
    "Strengthen Investor Confidence and Capital Access",
    "Align Global Strategy with Local Execution",
    "Mitigate Regulatory and Reputational Risk"
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-bombay-subtle/20 to-white animate-fade-in">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title gradient-accent">Why CXOs Choose <span className="whitespace-nowrap">Bombay Breed</span></h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6"></div>
            <p className="text-body text-foreground/80 mb-8">
              Global companies with Indian operations trust us to align their sustainability communications with international expectations while navigating local regulatory landscapes.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full mr-3 shadow-sm">
                    <BadgeCheck className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-body font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl transform rotate-3 scale-105 blur-xl"></div>
            <div className="relative">
              <div className="glass-card rounded-3xl overflow-hidden shadow-xl p-8 hover-scale">
                <h3 className="text-2xl font-heading font-bold mb-6 gradient-accent">The Imperative of Sustainability</h3>
                <div className="space-y-4 text-body text-foreground/80">
                  <p>
                    In today's business environment, ESG and therefore sustainability is non-negotiable. Stakeholders expect transparency and accountability, necessitating a robust approach to communicate your sustainability initiatives effectively.
                  </p>
                  <p>
                    Governance frameworks and regulatory standards are continuously evolving, creating a challenging landscape for companies to navigate effectively. Excessive reporting can expose your business to accusations of greenwashing, while insufficient reporting may alienate key stakeholders.
                  </p>
                  <p>
                    As the climate action landscape evolves with demanding targets and complex objectives, businesses must exhibit integrity, agility, and strategic foresight in their sustainability reporting to maintain a competitive edge.
                  </p>
                </div>
                <div className="mt-8 text-center" ref={glowRef}>
                  <Link 
                    to="/compliance-to-credibility"
                    className={`inline-block bg-gradient-to-r from-primary to-accent text-white font-medium px-6 py-3 rounded-full shadow-sm glow-card hover-scale transition-all duration-300 ${glowInView ? 'active' : ''}`}
                  >
                    Effective sustainability communication is a strategic advantage
                  </Link>
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
