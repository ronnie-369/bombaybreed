import React from 'react';
import { Shield, TrendingUp, Users, MessageSquare } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const BoardValue = () => {
  const competencies = [
    {
      icon: Shield,
      title: "Carbon & ESG Governance Oversight",
      description: "Navigate CCTS, CBAM, and ESG disclosure frameworks with strategic foresight. Provide board-level guidance on carbon regulatory compliance, risk assessment, and long-term strategic positioning."
    },
    {
      icon: TrendingUp,
      title: "Risk & Opportunity Assessment",
      description: "Identify carbon-related business risks and competitive advantages. Translate regulatory requirements into strategic business opportunities aligned with shareholder value creation."
    },
    {
      icon: Users,
      title: "Stakeholder & Investor Relations",
      description: "Credible communication with rating agencies, institutional investors, and regulators. Bridge technical ESG requirements with stakeholder expectations and investor confidence."
    },
    {
      icon: MessageSquare,
      title: "Strategic Communications Oversight",
      description: "Ensure sustainability messaging aligns with governance standards. Provide board-level oversight on ESG communications, preventing greenwashing risks."
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-3">
              Core Competencies
            </p>
            <h2 className="text-section font-heading tracking-tight mb-4">
              What I Bring to the Boardroom
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Board-level strategic oversight on carbon markets, ESG governance, and stakeholder credibility
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competencies.map((competency, index) => {
            const IconComponent = competency.icon;
            return (
              <ScrollReveal key={index} direction="up" delay={index as 0 | 1 | 2 | 3}>
                <div className="group p-8 rounded-lg bg-card border border-border/50 hover:border-border hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 ease-out h-full">
                  <div className="flex items-start gap-5">
                    <div className="p-2.5 bg-primary/10 rounded-md icon-highlight">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-medium text-foreground">
                        {competency.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {competency.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BoardValue;
