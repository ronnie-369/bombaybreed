import React, { useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface CaseStudy {
  id: number;
  name: string;
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
    type: "Head of Marketing",
    duration: "Ongoing",
    impact: "300K+ engagement",
    brief: "Make climate action conversational and accessible to the general public.",
    challenge: "Climate action is typically presented in opaque, dense, and technical language that alienates the average person.",
    solution: "Created engaging conversations about climate with key stakeholders: governments, bureaucrats, media outlets, scientists, and academicians.",
    result: "YouTube engagement: 300,000+ likes, Campaign felicitated at IIT Rourkee, Showcased to the Minister of Environment, Featured track played to A.R. Rahman",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9"
  }];
  const [activeCase, setActiveCase] = useState<CaseStudy>(cases[0]);
  return (
    <section id="cases" className="py-20 px-4 md:px-8 bg-white animate-fade-in">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title gradient-accent">Success Stories That Define Us</h2>
          <p className="section-description">
            A proven track record of delivering impactful results for leading brands across various sectors.
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
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium block mb-1">{String(caseItem.id).padStart(2, '0')}</span>
                  <h3 className="text-xl font-sans font-semibold mb-1">{caseItem.name}</h3>
                </div>
                <div className={`text-right ${activeCase.id === caseItem.id ? 'text-white/80' : 'text-foreground/70'}`}>
                  <p className="text-sm">{caseItem.type}</p>
                  <p className="text-sm">{caseItem.duration}</p>
                  <p className="font-medium">{caseItem.impact}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className={`text-sm ${activeCase.id === caseItem.id ? 'text-white/90' : 'text-foreground/60'}`}>
                  View case
                </span>
                <ArrowRight className={`h-4 w-4 ${activeCase.id === caseItem.id ? 'text-white' : 'text-primary'}`} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
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
                <h3 className="text-2xl md:text-3xl font-sans font-medium mb-4">{activeCase.name}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-primary">Brief:</h4>
                    <p className="text-foreground/80">{activeCase.brief}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">Challenge:</h4>
                    <p className="text-foreground/80">{activeCase.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">Solution:</h4>
                    <p className="text-foreground/80">{activeCase.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">Result:</h4>
                    <p className="text-foreground/80">{activeCase.result}</p>
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