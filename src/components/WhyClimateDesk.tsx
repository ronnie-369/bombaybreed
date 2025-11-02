import React from 'react';
import { TrendingUp, FileText, Globe, Star } from 'lucide-react';

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
    <section id="cxo-companion" className="relative py-20 px-4 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Message */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full mb-6">
            <Star className="w-8 h-8 text-teal-600" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            The Climate Desk: Your Strategic CXO Companion
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
            As your organization navigates its net zero goals, strategic carbon and energy communications become the <span className="font-semibold text-foreground shine-text">new value multiplier</span> with your stakeholders
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            We combine <span className="font-semibold text-foreground">behavioral science insights</span> with <span className="font-semibold text-foreground">market intelligence</span> to craft communications that drive stakeholder action—not just awareness
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
                <p className="text-sm font-medium text-muted-foreground mb-4 italic">
                  {reg.fullName}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {reg.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Strategic Advantage Statement with Market-Driven Focus */}
        <div className="relative bg-gradient-to-r from-teal-600/10 via-cyan-600/10 to-emerald-600/10 border border-teal-600/20 rounded-2xl p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 via-transparent to-emerald-600/5 rounded-2xl" />
          <div className="relative">
            <p className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
              Market-Driven Communications = Strategic Competitive Advantage
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-teal-600/20">
                <h4 className="font-bold text-lg mb-3 text-foreground">From Compliance to Credibility</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transform regulatory requirements (CCTS, BRSR, CBAM) into compelling narratives that build investor confidence and market differentiation
                </p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-teal-600/20">
                <h4 className="font-bold text-lg mb-3 text-foreground">Behavioral Science Meets Markets</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Design messages that trigger stakeholder action—from investor decisions to consumer choices—using proven decision-making frameworks
                </p>
              </div>
            </div>
            
            <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              Strategic carbon communications aren't about greenwashing or CSR fluff—they're about translating complex market dynamics into clear stakeholder value
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyClimateDesk;
