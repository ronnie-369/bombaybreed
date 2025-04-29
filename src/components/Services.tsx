import React from 'react';
import { Award, MessageCircle, Users, TrendingUp, Database, AlertTriangle } from 'lucide-react';
const ServiceCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  return <div className="glass-card rounded-xl p-6 transform transition-all hover:translate-y-[-5px]">
      <div className="flex items-start">
        <div className="bg-bombay-accent/20 p-3 rounded-full mr-4">
          <Icon className="h-6 w-6 text-bombay" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-foreground/70">{description}</p>
        </div>
      </div>
    </div>;
};
const Services = () => {
  const services = [{
    icon: MessageCircle,
    title: "Strategic Communications",
    description: "Expert guidance in translating sustainability initiatives into clear, compelling narratives."
  }, {
    icon: Award,
    title: "Reputation Management",
    description: "Advisory on brand reputation management, fostering trust and loyalty among stakeholders."
  }, {
    icon: Users,
    title: "Stakeholder Engagement",
    description: "Tailored messaging to engage diverse audiences internally and externally."
  }, {
    icon: TrendingUp,
    title: "Measurable Impact",
    description: "Establish metrics that demonstrate the effectiveness of your sustainability communications."
  }, {
    icon: Database,
    title: "Data and Metrics",
    description: "Transform complex sustainability data into compelling narratives and reports."
  }, {
    icon: AlertTriangle,
    title: "Crisis Management",
    description: "Prepare and respond to sustainability-related challenges with strategic communications."
  }];
  return <section id="services" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What the CMO Needs</h2>
          <p className="text-foreground/80 text-base font-medium">In today's business environment, ESG & sustainability communication is non-negotiable. We provide the expertise you need to communicate effectively.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} />)}
        </div>
      </div>
    </section>;
};
export default Services;