
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

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
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-bombay" />
              Complexities
            </h3>
            <ul className="space-y-3">
              {complexities.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-bombay mr-2 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-bombay" />
              Stakeholders
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Internal Stakeholders</h4>
                <ul className="space-y-2">
                  {stakeholders.internal.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-bombay mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">External Stakeholders</h4>
                <ul className="space-y-2">
                  {stakeholders.external.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-bombay mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-bombay" />
              Market Dynamics
            </h3>
            <p className="mb-4 text-foreground/80">
              Governance frameworks and regulatory standards are continuously evolving, creating a challenging landscape for companies to navigate effectively.
            </p>
            <ul className="space-y-3">
              {stakeholders.dynamics.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-bombay mr-2 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
