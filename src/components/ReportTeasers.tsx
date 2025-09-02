import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, TrendingUp, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportTeasers = () => {
  const navigate = useNavigate();

  const reports = [
    {
      id: 'workforce',
      title: 'Green Jobs in India',
      subtitle: 'Workforce & Investment Outlook 2025–2030',
      icon: Users,
      bullets: [
        'Jobs, skills, salaries mapping',
        'Gender gaps analysis',
        '1 million jobs by 2030 projection'
      ],
      route: '/green-jobs-report',
      color: 'from-teal-700 to-emerald-600'
    },
    {
      id: 'investor', 
      title: 'Carbon Market Outlook',
      subtitle: 'An Investor\'s Deep Dive 2025–2030',
      icon: TrendingUp,
      bullets: [
        '$250B RE deployment opportunity',
        '$1.4B carbon trading market',
        'Subsector CAGR projections'
      ],
      route: '/carbon-market-outlook',
      color: 'from-blue-700 to-cyan-600'
    },
    {
      id: 'policy',
      title: 'India\'s Carbon Playbook', 
      subtitle: 'PAT Lessons, CCTS Rules & Article 6',
      icon: FileText,
      bullets: [
        'How CCTS works explained',
        'PAT mechanism lessons',
        'India\'s Article 6 opportunity'
      ],
      route: '/carbon-playbook',
      color: 'from-purple-700 to-indigo-600'
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-background animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="section-title gradient-accent">
            India's Green Economy Reports 2025–2030
          </h2>
          <p className="section-description">
            Workforce. Carbon Markets. Policy Playbook. Three deep dives shaping India's climate future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report) => {
            const IconComponent = report.icon;
            return (
              <Card key={report.id} className="glass-card group hover-scale border-0 animate-fade-in">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${report.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-display font-semibold">
                    {report.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/60">
                    {report.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {report.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-foreground/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => navigate(report.route)}
                    variant="gradient" 
                    className="w-full"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReportTeasers;