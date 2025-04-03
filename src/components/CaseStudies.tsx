
import React, { useState } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CaseStudy {
  id: number;
  name: string;
  location: string;
  quote: string;
  story: string;
  image: string;
}

const CaseStudies = () => {
  const cases: CaseStudy[] = [
    {
      id: 1,
      name: "Midnight",
      location: "San Francisco, CA",
      quote: "A panther at heart, a lap cat by choice.",
      story: "Midnight was adopted by the Johnson family in 2019. Initially shy, he quickly became the heart of the home, bonding especially with their daughter Emma who has autism. His gentle presence has had a remarkable impact on Emma's communication skills.",
      image: "https://images.unsplash.com/photo-1586042091284-bd35c8c1d917"
    },
    {
      id: 2,
      name: "Luna",
      location: "Boston, MA",
      quote: "Elegance and playfulness in perfect harmony.",
      story: "Luna joined Sarah's apartment after her previous owner passed away. Despite being 7 years old, Luna adapted quickly to her new environment and has become known in the building as the cat who greets visitors at the door with a friendly chirp.",
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6"
    },
    {
      id: 3,
      name: "Shadow",
      location: "Austin, TX",
      quote: "The therapy cat nobody knew they needed.",
      story: "Shadow works as a therapy cat at a senior living facility, where his calm demeanor and affectionate nature have made him a favorite among residents. Research has shown that his visits coincide with improved mood and decreased anxiety among patients.",
      image: "https://images.unsplash.com/photo-1556582305-528bffcf7af0"
    }
  ];

  const [activeCase, setActiveCase] = useState<CaseStudy>(cases[0]);

  return (
    <section id="cases" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-foreground/80">
            Real stories of Bombay cats and the families they've transformed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {cases.map((caseItem) => (
            <button
              key={caseItem.id}
              onClick={() => setActiveCase(caseItem)}
              className={`text-left p-6 rounded-2xl transition-all ${
                activeCase.id === caseItem.id
                  ? 'bg-bombay text-white'
                  : 'bg-bombay-subtle hover:bg-bombay-subtle/70'
              }`}
            >
              <h3 className="text-xl font-semibold mb-1">{caseItem.name}</h3>
              <p className={`${
                activeCase.id === caseItem.id ? 'text-white/80' : 'text-foreground/70'
              }`}>
                {caseItem.location}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className={`text-sm ${
                  activeCase.id === caseItem.id ? 'text-white/90' : 'text-foreground/60'
                }`}>
                  Read story
                </span>
                <ArrowRight className={`h-4 w-4 ${
                  activeCase.id === caseItem.id ? 'text-white' : 'text-bombay'
                }`} />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 md:mt-16">
          <div className="bg-bombay-subtle/30 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-full">
                <img
                  src={activeCase.image}
                  alt={activeCase.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="bg-white inline-flex p-3 rounded-full mb-6">
                  <Quote className="h-6 w-6 text-bombay" />
                </div>
                <h3 className="text-2xl md:text-3xl font-medium mb-4">{activeCase.quote}</h3>
                <p className="text-foreground/80 mb-8">{activeCase.story}</p>
                <div>
                  <Button className="bg-bombay hover:bg-bombay-light text-white">
                    Read Full Story
                  </Button>
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
