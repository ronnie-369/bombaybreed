
import React from 'react';
import { Shield, Zap, Trophy, Rocket, Star, ShieldCheck } from 'lucide-react';

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  outcomes
}: {
  icon: any;
  title: string;
  description: string;
  outcomes: string[];
}) => {
  return (
    <div className="glass-card rounded-xl p-8 hover-scale animate-fade-in group">
      <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full w-fit mb-4 shadow-sm group-hover:shadow-md transition-shadow">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-heading font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70 mb-4 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {outcomes.map((outcome, idx) => (
          <li key={idx} className="flex items-start text-sm text-foreground/80">
            <span className="text-primary mr-2 mt-0.5">→</span>
            <span>{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Services = ({ id }: { id?: string } = {}) => {
  const services = [{
    icon: Zap,
    title: "Disclosure & Reporting Alignment",
    description: "Bridge international standards (CSRD, SEC Climate Rules) with Indian mandates (BRSR, CCTS) for unified reporting.",
    outcomes: [
      "Unified reporting across CSRD, SEC, BRSR, CCTS frameworks",
      "Reduced compliance complexity and reporting time",
      "Enhanced stakeholder confidence through consistency"
    ]
  }, {
    icon: Trophy,
    title: "Executive Risk Management",
    description: "Anticipate regulatory shifts and market expectations to protect reputation and shareholder value.",
    outcomes: [
      "Proactive risk identification and mitigation strategies",
      "Crisis-ready communication protocols",
      "Board-level reporting frameworks that demonstrate oversight"
    ]
  }, {
    icon: Star,
    title: "Multi-Stakeholder Orchestration",
    description: "Harmonize complex messaging for investors, regulators, customers, and communities simultaneously.",
    outcomes: [
      "Tailored communication strategies per stakeholder group",
      "Streamlined approval processes across departments",
      "Consistent brand positioning on sustainability initiatives"
    ]
  }, {
    icon: Rocket,
    title: "Performance Translation",
    description: "Convert technical ESG data into strategic narratives that resonate with C-suite and board priorities.",
    outcomes: [
      "Executive dashboards linking ESG to business performance",
      "Investment-grade sustainability storytelling",
      "Competitive positioning through credible climate leadership"
    ]
  }];
  return (
    <section id={id || "services"} className="py-28 px-4 md:px-8 bg-white animate-fade-in">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="section-title gradient-accent">What the CXO Suite Needs</h2>
          <p className="section-description">
            Strategic sustainability communications that align international standards with Indian operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description}
              outcomes={service.outcomes}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
