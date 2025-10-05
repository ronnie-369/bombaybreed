
import React from 'react';
import { Shield, Zap, Trophy, Rocket, Star, ShieldCheck } from 'lucide-react';

const ServiceCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  return (
    <div className="glass-card rounded-xl p-6 hover-scale animate-fade-in">
      <div className="flex items-start">
        <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full mr-4 shadow-sm">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
          <p className="text-note text-foreground/70">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [{
    icon: Zap,
    title: "Disclosure & Reporting Alignment",
    description: "Bridge global standards (CSRD, SEC Climate Rules) with Indian frameworks (BRSR, CCTS) for seamless compliance."
  }, {
    icon: Trophy,
    title: "Executive Risk Management",
    description: "Strategic advisory on sustainability risk communication to protect organizational reputation and stakeholder confidence."
  }, {
    icon: Star,
    title: "Multi-Stakeholder Orchestration",
    description: "Coordinate messaging across investors, regulators, boards, and operational teams for consistent sustainability narrative."
  }, {
    icon: Rocket,
    title: "Performance Translation",
    description: "Convert complex ESG metrics into executive-ready insights that drive strategic decision-making."
  }, {
    icon: Shield,
    title: "Integrated Reporting Strategy",
    description: "Develop comprehensive sustainability communication frameworks that satisfy both global and local requirements."
  }, {
    icon: ShieldCheck,
    title: "Regulatory Response Readiness",
    description: "Prepare executive teams for sustainability-related regulatory inquiries and stakeholder challenges."
  }];
  return (
    <section id="services" className="py-20 px-4 md:px-8 bg-white animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title gradient-accent">What the CXO Suite Needs</h2>
          <p className="section-description">
            Global companies with Indian operations need strategic sustainability communications that align with international standards while building for India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
