
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
      "Marketing Team",
      "Corporate Communications",
      "Finance Department",
      "Product Development/R&D"
    ],
    external: [
      "Customers",
      "Investors",
      "Regulators and Policymakers",
      "Suppliers",
      "Community and NGOs"
    ],
    dynamics: [
      "Reputation Risks",
      "Stakeholder Communication",
      "KPIs and Metrics",
      "Data Sources"
    ]
  };

  return (
    <section id="expertise" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-subtle/20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Complexity of Sustainability Communications</h2>
          <p className="text-lg text-foreground/80">
            Navigating the complex landscape of sustainability communications requires strategic expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Complexities Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Package className="h-5 w-5 mr-2 text-bombay" />
              Complexities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complexities.map((item, index) => (
                <Card key={index} className="border-bombay-subtle/20 hover:shadow-md transition-all">
                  <CardContent className="p-4 flex items-center">
                    <Package className="h-4 w-4 text-bombay mr-2 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Stakeholders Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-bombay" />
              Stakeholders
            </h3>
            <p className="mb-4 text-foreground/80 text-sm">
              Effective communication with diverse stakeholder groups requires tailored strategies and messaging.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {[...stakeholders.internal, ...stakeholders.external].map((item, index) => (
                <Toggle 
                  key={index} 
                  variant="outline" 
                  className="h-auto py-2 px-3 justify-start gap-2 data-[state=on]:bg-bombay-subtle data-[state=on]:text-bombay border-bombay-subtle/30 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Users className="h-3.5 w-3.5 text-bombay shrink-0" />
                  <span className="text-xs truncate">{item}</span>
                </Toggle>
              ))}
            </div>
          </div>
          
          {/* Market Dynamics Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2 text-bombay" />
              Market Dynamics
            </h3>
            <p className="mb-4 text-foreground/80 text-sm">
              Governance frameworks and regulatory standards are continuously evolving, creating a challenging landscape for companies to navigate effectively.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {stakeholders.dynamics.map((item, index) => (
                <Card key={index} className="border-bombay-subtle/20 hover:shadow-md transition-all">
                  <CardContent className="p-3 flex items-center">
                    <BarChart className="h-4 w-4 text-bombay mr-2 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block bg-bombay-accent/10 rounded-lg px-6 py-3 text-lg font-medium text-bombay">
            This is precisely where a Sustainability Communications Strategic Advisor adds significant value
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
