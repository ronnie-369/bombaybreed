import React from 'react';
import BookingDialog from './LazyBookingDialog';

const ServiceCard = ({
  num,
  title,
  description
}: {
  num: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="glass-card rounded-xl p-6 hover-scale animate-fade-in">
      <div className="flex items-start gap-4">
        <span className="text-xs font-semibold tracking-widest text-primary/60 mt-1">{num}</span>
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
    num: '01',
    title: "Disclosure & Reporting Alignment",
    description: "Align global and Indian frameworks seamlessly."
  }, {
    num: '02',
    title: "Executive Risk Management",
    description: "Protect reputation through strategic risk communication."
  }, {
    num: '03',
    title: "Multi-Stakeholder Orchestration",
    description: "Coordinate messaging across all key stakeholder groups."
  }, {
    num: '04',
    title: "Performance Translation",
    description: "Transform ESG metrics into executive insights."
  }];
  return (
    <section id="services" className="py-28 px-4 md:px-8 bg-white animate-fade-in">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title gradient-accent">Strategic Advisory Services</h2>
          <p className="section-description">
            Expert advisory across climate strategy, carbon markets, and ESG governance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.num} 
              num={service.num}
              title={service.title} 
              description={service.description} 
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <BookingDialog triggerText="Book a Strategy Consultation" />
        </div>
      </div>
    </section>
  );
};

export default Services;