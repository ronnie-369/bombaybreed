import React from 'react';
import { TrendingUp, FileText, Globe, Award } from 'lucide-react';

const WhyClimateDesk = () => {
  const regulations = [
    {
      title: "CCTS",
      fullName: "Carbon Credit Trading Scheme",
      description: "Navigate India's emerging carbon trading landscape with strategic communications that position your organization as a market leader.",
      icon: TrendingUp,
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      title: "BRSR",
      fullName: "Business Responsibility & Sustainability Reporting",
      description: "Transform mandatory sustainability disclosures into compelling narratives that build stakeholder trust and credibility.",
      icon: FileText,
      gradient: "from-cyan-500 to-emerald-500"
    },
    {
      title: "CBAM",
      fullName: "Carbon Border Adjustment Mechanism",
      description: "Turn EU's carbon border requirements into competitive advantages for Indian exporters through strategic positioning.",
      icon: Globe,
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Message */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full mb-6">
            <Award className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            Why The Climate Desk is a CXO's Vital Companion
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            As your organization navigates its net zero goals, strategic carbon and energy communications become the new <span className="font-semibold text-foreground">value multiplier</span> with your stakeholders.
          </p>
        </div>

        {/* Regulatory Framework Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {regulations.map((reg, index) => {
            const Icon = reg.icon;
            return (
              <div
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center p-4 bg-gradient-to-br ${reg.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {reg.title}
                </h3>
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {reg.fullName}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {reg.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Strategic Advantage Statement */}
        <div className="relative bg-gradient-to-r from-teal-600/10 via-cyan-600/10 to-emerald-600/10 border border-teal-600/20 rounded-2xl p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 via-transparent to-emerald-600/5 rounded-2xl" />
          <div className="relative">
            <p className="text-xl md:text-2xl font-bold text-foreground mb-4">
              Investing in the right carbon communications is a strategic advantage
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              With CCTS, BRSR, and CBAM disclosures reshaping the competitive landscape, strategic carbon communications transform compliance obligations into opportunities for differentiation and stakeholder value creation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyClimateDesk;
