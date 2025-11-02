import React from 'react';
import { Brain, TrendingUp, Users, ChartBar, Target, Lightbulb } from 'lucide-react';

const WhyDifferent = () => {
  const differentiators = [
    {
      icon: Brain,
      title: "Behavioral Science Foundation",
      description: "We don't just communicate—we design messages that change stakeholder behavior. Rooted in psychology and decision-making frameworks.",
      highlights: ["Stakeholder psychology", "Decision triggers", "Action frameworks"]
    },
    {
      icon: ChartBar,
      title: "Market-Driven Messaging",
      description: "Your communications reflect carbon market dynamics, policy shifts, and investor expectations—not generic CSR platitudes.",
      highlights: ["Market intelligence", "Policy analysis", "Investor language"]
    },
    {
      icon: Lightbulb,
      title: "Science-Backed Strategies",
      description: "Every recommendation is grounded in climate science, carbon accounting principles, and regulatory frameworks—ensuring credibility.",
      highlights: ["Climate science", "Carbon accounting", "Regulatory compliance"]
    }
  ];

  const notThisList = [
    { label: "PR Agencies", reason: "We're not spinning stories—we're building credible market positions" },
    { label: "CSR Consultants", reason: "We go beyond compliance to create strategic business value" },
    { label: "Marketing Firms", reason: "We work where science, policy, and markets intersect—not just brand aesthetics" }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-amber-100 rounded-full mb-4">
            <p className="text-sm font-semibold text-amber-900">
              Our Unique Positioning
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why We're <span className="text-gradient">Different</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            We operate at the intersection of three critical domains that traditional agencies miss
          </p>
        </div>

        {/* Three Pillars Deep Dive */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-8 hover:shadow-xl hover:border-amber-300 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bombay to-bombay-light flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {item.title}
                </h3>
                <p className="text-base text-foreground/70 mb-6 leading-relaxed">
                  {item.description}
                </p>
                <div className="space-y-2">
                  {item.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-sm text-foreground/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-bombay mr-2" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Not This - But This */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              We're <span className="text-red-600">Not</span> Your Traditional Consultancy
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {notThisList.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200/30"
                >
                  <div className="flex items-start mb-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm font-bold">✗</span>
                    </div>
                    <h4 className="font-bold text-lg text-foreground">
                      {item.label}
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-full border border-bombay/30 shadow-sm">
                <Target className="w-6 h-6 text-bombay" />
                <p className="font-semibold text-lg text-foreground">
                  We work where <span className="text-bombay">science, policy, markets and behaviour</span> meet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferent;
