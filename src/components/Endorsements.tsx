
import React from 'react';
import { Star, Building2 } from 'lucide-react';

const Endorsements = () => {
  const cmos = [
    "Volkswagen Malaysia Bhd",
    "PETRONAS",
    "United Breweries",
    "Tripsy Games",
    "Bharti AXA",
    "TVS Motors",
    "Ford Motor Co",
    "Microsoft India"
  ];

  const ceos = [
    "KPMG India",
    "Microsoft India",
    "ITC Foods",
    "Publicis India",
    "Machani Group",
    "GUVNL",
    "ProClime",
    "Quess Corp",
    "Bharatiya.org",
    "Gh2 Org"
  ];

  const expertisePoints = [
    {
      title: "Proven Track Record",
      description: "Over 18 years of experience in leading strategic communications, focused on building brand value and equity"
    },
    {
      title: "Corporate Advisory Experience",
      description: "Senior Advisor to KPMG India for 2 years and active advisor and consultant to a Singapore based Climate Action company"
    },
    {
      title: "Climate Action Focus",
      description: "Continued tracking and studying the in climate action space helps you benefit from impactful strategies that effectively promote your environmental initiatives"
    },
    {
      title: "Strategic Mindset",
      description: "Analytical rigour and a scientific approach to communication. Two key requirements for effectiveness in stakeholder messaging"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-subtle/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Trusted by Leaders</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-bombay-accent" />
                CXO leaders at:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...cmos, ...ceos].map((company, index) => (
                  <div 
                    key={index} 
                    className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover-scale animate-fade-in"
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-full">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-foreground/90 font-medium text-sm group-hover:text-primary transition-colors duration-300">
                        {company}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Right Expertise</h2>
            <p className="text-lg mb-6">
              For Sustainability Strategic Communications
            </p>
            
            <div className="space-y-6">
              {expertisePoints.map((point, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                  <p className="text-foreground/80">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Endorsements;
