import React from 'react';
import { Badge } from '@/components/ui/badge';

const industries = [
  'Technology',
  'Financial Services',
  'Healthcare',
  'Retail & E-commerce',
  'Professional Services',
  'Manufacturing',
  'Media & Entertainment',
  'Telecommunications',
  'Real Estate',
  'Education',
  'Non-Profit',
  'Hospitality'
];

const IndustryExperience = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="section-title gradient-accent">
            Cross-Industry Expertise
          </h2>
          <p className="section-description max-w-3xl mx-auto">
            Our diverse industry experience enables us to bring fresh perspectives and proven strategies 
            to your unique business challenges
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {industries.map((industry, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-base py-2 px-6 hover:scale-105 transition-transform cursor-default"
            >
              {industry}
            </Badge>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Our adaptable frameworks and methodologies have been successfully applied across these sectors, 
            delivering measurable results and sustainable growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustryExperience;
