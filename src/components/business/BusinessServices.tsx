import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, FileText, Target } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Building In-House Creative Departments',
    description: 'Strategic team structuring, hiring frameworks, and creative operations setup to build high-performing creative departments from the ground up.',
    highlights: [
      'Team structure & hiring strategies',
      'Creative operations playbooks',
      'Culture development frameworks',
      'Tools & process optimization'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Strengthening Performance Marketing',
    description: 'Data-driven marketing strategies that deliver measurable ROI through multi-channel campaign optimization and analytics.',
    highlights: [
      'Channel strategy development',
      'ROI optimization frameworks',
      'Campaign performance analytics',
      'Attribution modeling'
    ]
  },
  {
    icon: FileText,
    title: 'Creating Marketing Assets',
    description: 'End-to-end brand and content development that resonates with your audience and drives business outcomes.',
    highlights: [
      'Brand identity development',
      'Content strategy & creation',
      'Campaign collateral design',
      'Digital asset management'
    ]
  },
  {
    icon: Target,
    title: 'CEO Growth Advisory',
    description: 'Strategic growth planning and executive coaching to identify opportunities and navigate business transformation.',
    highlights: [
      'Strategic growth planning',
      'Market opportunity identification',
      'Business model innovation',
      'Executive leadership coaching'
    ]
  }
];

const BusinessServices = () => {
  return (
    <section className="py-20 bg-purple-50/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="section-title bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="section-description max-w-3xl mx-auto">
            Comprehensive consulting services designed to accelerate your business growth and operational excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-purple-100/50">
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-purple-100/50 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl mb-3">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessServices;
