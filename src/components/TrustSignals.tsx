import React from 'react';
import { Award, TrendingUp, Users, CheckCircle } from 'lucide-react';

const TrustSignals = () => {
  const signals = [
    {
      icon: Award,
      metric: "Featured Speaker",
      description: "IIT Roorkee environmental campaigns and industry forums"
    },
    {
      icon: Users,
      metric: "4,000+ Subscribers",
      description: "Global audience for The Climate Desk publication"
    },
    {
      icon: TrendingUp,
      metric: "$15M Revenue Impact",
      description: "Documented client revenue growth from strategic projects"
    },
    {
      icon: CheckCircle,
      metric: "Multi-Sector Validation",
      description: "Trusted by Fortune 500, government bodies, and NGOs"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold gradient-accent mb-4">
            Results You Can Trust
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Independent validation of our impact across multiple dimensions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((signal, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-6 hover-scale animate-fade-in text-center"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <signal.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                {signal.metric}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 glass-card rounded-2xl p-8 md:p-12 border-l-4 border-primary">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                AR
              </div>
            </div>
            <div className="flex-1">
              <p className="text-lg md:text-xl text-foreground/90 italic mb-4 leading-relaxed">
                "The ProClime campaign reached 300,000+ engagements and was showcased to the Minister of Environment. Theresa's ability to translate complex climate science into relatable narratives is unmatched."
              </p>
              <div>
                <p className="font-semibold text-foreground">Campaign Recognition</p>
                <p className="text-sm text-foreground/60">Featured at IIT Roorkee • Presented to A.R. Rahman</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
