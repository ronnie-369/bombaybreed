import React, { useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface CaseStudy {
  id: number;
  name: string;
  anchor?: string;
  type: string;
  duration: string;
  impact: string;
  brief: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
}
const CaseStudies = () => {
  const cases: CaseStudy[] = [{
    id: 1,
    name: "Microsoft India",
    type: "Strategic Consulting",
    duration: "4 months",
    impact: "$15M impact",
    brief: "Identify 25 ISV (Independent Software Vendor) clients of Microsoft India to increase revenue for the PSU division.",
    challenge: "MSFT had over 27,000 ISVs onboard and no systematic way to identify the right 25 targets.",
    solution: "Created an elaborate matrix to determine a recommendation engine that streamlined the selection from 27,000 companies down to 25 top ISVs.",
    result: "Targeted approach to strategic pathways into GOI sectoral focus, leading to $15 million revenue uptick for Microsoft Azure cloud.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095"
  }, {
    id: 2,
    name: "Shoppers Stop",
    type: "Strategic Consulting",
    duration: "1 month",
    impact: "80% growth",
    brief: "\"All our physical stores are shut down and our online presence is not e-commerce ready. Help.\"",
    challenge: "Shoppersstop.com was both unattractive and non-supportive of full e-commerce, unable to compete with Myntra and Ajio.",
    solution: "Identified growing demand for comfort wear during COVID lockdowns and built a dedicated storefront for tops, bottoms, and loungewear.",
    result: "Reversed 10% revenue decline by achieving 80% growth in online shopping with INR 67 Lacs revenue in Q1 2020.",
    image: "https://images.unsplash.com/photo-1573164574001-518897fd0e8d"
  }, {
    id: 3,
    name: "ProClime",
    anchor: "proclime",
    type: "Head of Marketing",
    duration: "Ongoing",
    impact: "300K+ engagement",
    brief: "India is home to 1.55 lakh species. And 1 species celebrates its Independence Day. How do we bring awareness to the fact that India has 1.55 lakh species of birds, insects, fish, mammals, and plants that call India their home?",
    challenge: "Climate action remains opaque, technical, and distant for everyday people. It lives in policy papers, boardrooms, and scientific journals — not in everyday conversations. If we can't make it relatable, we can't build the mass awareness and action we desperately need.",
    solution: "India celebrates 1 Independence Day. But 1.55 lakh species call this land home. Every bird, insect, fish, mammal, and plant depends on the same earth we do. When we talk about climate action, we're talking about them too — and about us. Let's make it personal.",
    result: "YouTube engagement: 300,000+ likes, Campaign felicitated at IIT Rourkee, Showcased to the Minister of Environment, Featured track played to A.R. Rahman",
    image: "/lovable-uploads/pexels-veeterzy-38136.jpg"
  }];
  const [activeCase, setActiveCase] = useState<CaseStudy>(cases[cases.length - 1]);
  return (
    <section id="cases" className="py-20 px-4 md:px-8 bg-white animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title gradient-accent">Proven Results Across Sectors</h2>
          <p className="section-description">
            Strategic consulting that delivers measurable impact—from Fortune 500 enterprises to climate-focused startups
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {cases.map(caseItem => (
            <button 
              key={caseItem.id} 
              onClick={() => setActiveCase(caseItem)} 
              className={`text-left p-6 rounded-2xl transition-all hover-scale ${
                activeCase.id === caseItem.id 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                  : 'glass-card hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <span className={`text-xs font-medium block mb-2 ${activeCase.id === caseItem.id ? 'text-white/70' : 'text-foreground/50'}`}>
                    CASE {String(caseItem.id).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-heading font-semibold mb-2">{caseItem.name}</h3>
                  <p className={`text-sm ${activeCase.id === caseItem.id ? 'text-white/80' : 'text-foreground/70'}`}>
                    {caseItem.type}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-4 mb-4 pb-4 border-b ${activeCase.id === caseItem.id ? 'border-white/20' : 'border-border/20'}`}>
                <div>
                  <p className={`text-xs ${activeCase.id === caseItem.id ? 'text-white/70' : 'text-foreground/50'}`}>Duration</p>
                  <p className="text-sm font-medium">{caseItem.duration}</p>
                </div>
                <div className={`w-px h-8 ${activeCase.id === caseItem.id ? 'bg-white/20' : 'bg-border/20'}`}></div>
                <div>
                  <p className={`text-xs ${activeCase.id === caseItem.id ? 'text-white/70' : 'text-foreground/50'}`}>Impact</p>
                  <p className="text-sm font-semibold">{caseItem.impact}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${activeCase.id === caseItem.id ? 'text-white' : 'text-primary'}`}>
                  View full case study
                </span>
                <ArrowRight className={`h-4 w-4 ${activeCase.id === caseItem.id ? 'text-white' : 'text-primary'}`} />
              </div>
            </button>
          ))}
        </div>

        <div id="proclime" className="mt-12 md:mt-16">
          <div className="glass-card rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-full">
                <img 
                  src={activeCase.image} 
                  alt={`${activeCase.name} case study`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="bg-gradient-to-r from-primary to-accent inline-flex p-3 rounded-full mb-6 shadow-sm">
                  <Quote className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4">{activeCase.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-primary text-card">Brief:</h4>
                    <p className="text-foreground/80 text-card">{activeCase.brief}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary text-card">Challenge:</h4>
                    <p className="text-foreground/80 text-card">{activeCase.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary text-card">Solution:</h4>
                    <p className="text-foreground/80 text-card">{activeCase.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary text-card">Result:</h4>
                    <p className="text-foreground/80 text-card">{activeCase.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CaseStudies;