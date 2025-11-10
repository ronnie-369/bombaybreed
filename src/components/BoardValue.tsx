import React from 'react';
import { Shield, TrendingUp, Users, MessageSquare } from 'lucide-react';

const BoardValue = () => {
  const competencies = [
    {
      icon: Shield,
      title: "Carbon & ESG Governance Oversight",
      description: "Navigate CCTS, CBAM, and ESG disclosure frameworks with strategic foresight. Provide board-level guidance on carbon regulatory compliance, risk assessment, and long-term strategic positioning in evolving carbon markets."
    },
    {
      icon: TrendingUp,
      title: "Risk & Opportunity Assessment",
      description: "Identify carbon-related business risks and competitive advantages. Translate regulatory requirements into strategic business opportunities, ensuring carbon strategy aligns with shareholder value creation and competitive positioning."
    },
    {
      icon: Users,
      title: "Stakeholder & Investor Relations",
      description: "Credible communication with rating agencies, institutional investors, and regulators. Bridge technical ESG requirements with stakeholder expectations, ensuring transparent disclosure and maintaining investor confidence."
    },
    {
      icon: MessageSquare,
      title: "Strategic Communications Oversight",
      description: "Ensure sustainability messaging aligns with governance standards. Provide board-level oversight on ESG communications, preventing greenwashing risks while building authentic stakeholder trust and corporate credibility."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            What I Bring to the Boardroom
          </h2>
          <p className="text-body text-foreground/70 max-w-3xl mx-auto">
            Board-level strategic oversight on carbon markets, ESG governance, and stakeholder credibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {competencies.map((competency, index) => {
            const IconComponent = competency.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-xl bg-gradient-to-br from-background to-secondary/10 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-heading font-semibold text-foreground">
                      {competency.title}
                    </h3>
                    <p className="text-body-sm text-foreground/70 leading-relaxed">
                      {competency.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BoardValue;
