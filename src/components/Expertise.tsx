
import React from 'react';
import { Check, Info, Package, Users, Target, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Expertise = () => {
  const complexities = [
    "Competitors",
    "Industry Standards",
    "Trends and Innovations",
    "Digital Platforms",
    "Corporate Reports",
    "Public Relations",
    "Communication Channels"
  ];

  const stakeholders = {
    internal: [
      "Executive Leadership",
      "CFO/Finance Team",
      "COO/Operations",
      "CSO/Sustainability Office",
      "Corporate Communications",
      "Product Development/R&D"
    ],
    external: [
      "Investors & Analysts",
      "Board of Directors",
      "Regulators and Policymakers",
      "Customers",
      "Suppliers & Partners",
      "Community and NGOs"
    ],
    dynamics: [
      "CSRD (Corporate Sustainability Reporting Directive) & SEC (Securities and Exchange Commission) Climate Rules",
      "BRSR (Business Responsibility and Sustainability Reporting) & CCTS (Carbon Credit Trading Scheme) Compliance",
      "CBAM (Carbon Border Adjustment Mechanism)",
      "JCM (Joint Crediting Mechanism)",
      "Investor ESG (Environmental, Social, and Governance) Expectations",
      "Regulatory Scrutiny"
    ]
  };

  return (
    <section id="expertise" className="py-28 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-subtle/20 animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title gradient-accent">Navigating the Complexity</h2>
          <p className="section-description">
            Sustainability communications span multiple stakeholders, evolving regulations, and dynamic markets—requiring specialized expertise to orchestrate effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stakeholders Section */}
          <div className="glass-card rounded-2xl p-8 hover-scale">
            <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full w-fit mb-4 shadow-sm">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-3">12+ Stakeholder Groups</h3>
            <p className="mb-6 text-foreground/70 leading-relaxed">
              Each with distinct priorities, timelines, and communication preferences requiring tailored messaging strategies.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-primary mb-2">Internal Stakeholders</p>
                <div className="flex flex-wrap gap-2">
                  {stakeholders.internal.map((item, index) => (
                    <span key={index} className="text-xs py-1.5 px-3 bg-primary/10 text-primary rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-primary mb-2">External Stakeholders</p>
                <div className="flex flex-wrap gap-2">
                  {stakeholders.external.map((item, index) => (
                    <span key={index} className="text-xs py-1.5 px-3 bg-accent/10 text-accent rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Dynamics Section */}
          <div className="glass-card rounded-2xl p-8 hover-scale">
            <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full w-fit mb-4 shadow-sm">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-3">6 Major Compliance Regimes</h3>
            <p className="mb-6 text-foreground/70 leading-relaxed">
              Global and Indian frameworks with overlapping but distinct requirements demanding unified reporting strategies.
            </p>
            <div className="space-y-3">
              {stakeholders.dynamics.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg border border-border/20 hover:border-primary/20 transition-colors">
                  <BarChart className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl px-8 py-6 max-w-3xl mx-auto">
            <p className="text-xl font-heading font-medium gradient-accent mb-2">
              Strategic Sustainability Communications Expertise Required
            </p>
            <p className="text-foreground/70 text-sm">
              Coordinating this complexity is where a dedicated advisor delivers measurable ROI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
