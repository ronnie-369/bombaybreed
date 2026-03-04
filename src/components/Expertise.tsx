import React from 'react';

const Expertise = () => {
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
      "CBAM (Carbon Border Adjustment Mechanism)",
      "JCM (Joint Crediting Mechanism)",
      "Investor ESG Expectations",
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
            <h3 className="text-xl font-heading font-semibold mb-4">Key Stakeholders</h3>
            <p className="mb-6 text-foreground/80">
              Effective sustainability communications require coordinating diverse groups with distinct priorities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[...stakeholders.internal, ...stakeholders.external].map((item, index) => (
                <div 
                  key={index} 
                  className="text-sm py-2 px-3 bg-white/50 rounded-lg border border-border/20"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Market Dynamics Section */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-heading font-semibold mb-4">Regulatory Landscape</h3>
            <p className="mb-6 text-foreground/80">
              Navigate global frameworks alongside Indian compliance requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stakeholders.dynamics.map((item, index) => (
                <div key={index} className="p-4 bg-white/50 rounded-lg border border-border/20">
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