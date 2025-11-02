import React from 'react';
import { Lightbulb, Users, TrendingUp } from 'lucide-react';

const DifferentiationBanner = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 border-y border-amber-200/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Not PR. Not CSR.
          </h3>
          <p className="text-lg text-foreground/80">
            We work where science, policy, markets and behaviour meet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-bombay/10 flex items-center justify-center mb-4">
              <Lightbulb className="w-7 h-7 text-bombay" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Science</h4>
            <p className="text-sm text-foreground/70">
              Evidence-based strategies rooted in climate science and carbon market fundamentals
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-bombay/10 flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-bombay" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Behaviour</h4>
            <p className="text-sm text-foreground/70">
              Stakeholder psychology and decision-making frameworks that drive action
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-bombay/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-bombay" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Markets</h4>
            <p className="text-sm text-foreground/70">
              Policy frameworks and market dynamics that unlock business value
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiationBanner;
