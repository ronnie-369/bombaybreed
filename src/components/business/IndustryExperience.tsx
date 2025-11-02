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
    <section className="py-20 bg-gradient-to-b from-background to-purple-50/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100/50 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-900">12+ Industries</span>
          </div>
          <h2 className="section-title bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Cross-Industry Expertise
          </h2>
          <p className="section-description max-w-3xl mx-auto">
            Diverse experience across sectors enables us to bring fresh perspectives, proven strategies, 
            and cross-pollinated insights to your unique business challenges
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-4 text-center hover-scale group animate-fade-in"
              style={{animationDelay: `${index * 40}ms`}}
            >
              <span className="text-sm font-medium text-foreground group-hover:text-purple-600 transition-colors">
                {industry}
              </span>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto border-l-4 border-purple-600">
          <p className="text-lg text-center text-foreground/80 leading-relaxed">
            Our adaptable frameworks and proven methodologies have delivered{' '}
            <span className="font-semibold text-purple-600">measurable results and sustainable growth</span>{' '}
            across Fortune 500 enterprises, fast-growing startups, and mission-driven organizations
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustryExperience;
