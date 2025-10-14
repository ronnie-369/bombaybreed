
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
      <div className="container mx-auto max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="section-title gradient-accent">The Complexity of Sustainability Communications</h2>
          <p className="section-description">
            Strategic expertise across stakeholders, regulations, and market dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {/* Stakeholders Section */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              Key Stakeholders
            </h3>
            <p className="mb-6 text-foreground/80">
              Effective sustainability communications require coordinating diverse groups with distinct priorities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[...stakeholders.internal, ...stakeholders.external].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 text-sm py-2 px-3 bg-white/50 rounded-lg border border-border/20"
                >
                  <Users className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Market Dynamics Section */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full mr-3">
                <Target className="h-5 w-5 text-white" />
              </div>
              Regulatory Landscape
            </h3>
            <p className="mb-6 text-foreground/80">
              Navigate global frameworks alongside Indian compliance requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stakeholders.dynamics.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/50 rounded-lg border border-border/20">
                  <BarChart className="h-4 w-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block glass-card rounded-lg px-8 py-4 text-lg font-medium gradient-accent">
            This is where a Sustainability Communications Strategic Advisor adds significant value
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
