import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const caseStudies = [
  {
    industry: 'Technology',
    title: 'Scaling Creative Operations for a SaaS Leader',
    challenge: 'Rapid growth necessitated building an in-house creative department from scratch',
    solution: 'Developed comprehensive hiring framework, established creative operations processes, and implemented collaboration tools',
    results: [
      '30% reduction in external agency costs',
      '50% faster campaign turnaround time',
      'Built a team of 12 creative professionals in 6 months'
    ]
  },
  {
    industry: 'Financial Services',
    title: 'Performance Marketing Transformation',
    challenge: 'Declining ROI on digital marketing spend with no clear attribution model',
    solution: 'Implemented data-driven attribution framework, optimized channel mix, and established performance KPIs',
    results: [
      '45% improvement in marketing ROI',
      '2.3x increase in qualified leads',
      'Reduced customer acquisition cost by 35%'
    ]
  },
  {
    industry: 'Retail',
    title: 'CEO Advisory for Market Expansion',
    challenge: 'Executive team seeking guidance on entering new geographic markets',
    solution: 'Conducted market analysis, developed go-to-market strategy, and provided executive coaching on expansion readiness',
    results: [
      'Successfully launched in 3 new markets',
      '120% revenue growth in year one',
      'Established repeatable expansion playbook'
    ]
  }
];

const BusinessCaseStudies = () => {
  return (
    <section className="py-20 bg-bombay-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="section-title gradient-accent">
            Success Stories
          </h2>
          <p className="section-description max-w-3xl mx-auto">
            Real results from our partnerships with leading organizations across industries
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="text-sm">
                    {study.industry}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                    <p className="text-foreground/70">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-foreground/70">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Results</h4>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-purple-600 dark:text-purple-400 mr-2">✓</span>
                          <span className="text-foreground/80">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessCaseStudies;
