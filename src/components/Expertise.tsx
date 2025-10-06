
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
      "CSRD & SEC Climate Rules",
      "BRSR & CCTS Compliance",
      "Investor ESG Expectations",
      "Regulatory Scrutiny"
    ]
  };

  return (
    <section id="expertise" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-subtle/20 animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title gradient-accent">The Complexity of Sustainability Communications</h2>
          <p className="section-description">
            Navigating the complex landscape of sustainability communications requires strategic expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Complexities Section */}
          <div className="glass-card rounded-2xl p-6 md:p-8 hover-scale">
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full mr-3">
                <Package className="h-5 w-5 text-white" />
              </div>
              Complexities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complexities.map((item, index) => (
                <Card key={index} className="border-border/20 hover:shadow-md transition-all">
                  <CardContent className="p-4 flex items-center">
                    <Package className="h-4 w-4 text-primary mr-2 shrink-0" />
                    <span className="text-card">{item}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Stakeholders Section */}
          <div className="glass-card rounded-2xl p-6 md:p-8 hover-scale">
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              Stakeholders
            </h3>
            <p className="mb-4 text-foreground/80 text-card">
              Effective communication with diverse stakeholder groups requires tailored strategies and messaging.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {[...stakeholders.internal, ...stakeholders.external].map((item, index) => (
                <Toggle 
                  key={index} 
                  variant="outline" 
                  className="h-auto py-2 px-3 justify-start gap-2 data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground border-border/30 animate-fade-in rounded-full"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Users className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-note truncate">{item}</span>
                </Toggle>
              ))}
            </div>
          </div>
          
          {/* Market Dynamics Section */}
          <div className="glass-card rounded-2xl p-6 md:p-8 hover-scale">
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full mr-3">
                <Target className="h-5 w-5 text-white" />
              </div>
              Market Dynamics
            </h3>
            <p className="mb-4 text-foreground/80 text-card">
              Global regulatory frameworks like CSRD and SEC Climate Rules require alignment with Indian standards.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {stakeholders.dynamics.map((item, index) => (
                <Card key={index} className="border-border/20 hover:shadow-md transition-all">
                  <CardContent className="p-3 flex items-center">
                    <BarChart className="h-4 w-4 text-primary mr-2 shrink-0" />
                    <span className="text-card">{item}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block glass-card rounded-lg px-6 py-3 text-body font-medium gradient-accent">
            This is precisely where a Sustainability Communications Strategic Advisor adds significant value
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
