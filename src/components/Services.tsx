
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

const Services = ({ id }: { id?: string } = {}) => {
  const services = [{
    icon: Zap,
    title: "Disclosure & Reporting Alignment",
    description: "Align global and Indian frameworks seamlessly."
  }, {
    icon: Trophy,
    title: "Executive Risk Management",
    description: "Protect reputation through strategic risk communication."
  }, {
    icon: Star,
    title: "Multi-Stakeholder Orchestration",
    description: "Coordinate messaging across all key stakeholder groups."
  }, {
    icon: Rocket,
    title: "Performance Translation",
    description: "Transform ESG metrics into executive insights."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
