import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

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
    <section className="py-20 bg-gradient-to-b from-purple-50/20 to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100/50 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-900">Proven Results</span>
          </div>
          <h2 className="section-title bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="section-description max-w-3xl mx-auto">
            Measurable outcomes from strategic partnerships with leading organizations—delivering growth, efficiency, and competitive advantage
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-purple-100/50 hover:border-purple-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-sm border-purple-200 text-purple-700">
                    {study.industry}
                  </Badge>
                  <ArrowUpRight className="h-5 w-5 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      Challenge
                    </h4>
                    <p className="text-foreground/70 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      Solution
                    </h4>
                    <p className="text-foreground/70 leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      Results
                    </h4>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-purple-600 dark:text-purple-400 mr-2 mt-0.5">✓</span>
                          <span className="text-sm text-foreground/80 font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center glass-card rounded-2xl p-8 max-w-3xl mx-auto border-l-4 border-purple-600">
          <p className="text-lg text-foreground/80">
            <span className="font-semibold text-purple-600">Ready for similar results?</span> Let's discuss how our proven frameworks can accelerate your business growth
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessCaseStudies;
