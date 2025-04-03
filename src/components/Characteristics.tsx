
import React from 'react';
import { Check, Info } from 'lucide-react';

const CharacteristicItem = ({ title, rating, description }: { title: string; rating: number; description: string }) => {
  return (
    <div className="apple-card p-6">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        {title}
        <span className="ml-2 text-xs text-foreground/60">
          {Array(5).fill(0).map((_, i) => (
            <span 
              key={i}
              className={`inline-block w-3 h-3 rounded-full mx-0.5 ${i < rating ? 'bg-bombay' : 'bg-gray-200'}`}
            />
          ))}
        </span>
      </h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  );
};

const Characteristics = () => {
  const traits = [
    { 
      title: "Affection Level", 
      rating: 5,
      description: "Extremely affectionate and forms strong bonds with family members."
    },
    { 
      title: "Energy Level", 
      rating: 4,
      description: "Playful and active, but also enjoys quiet time and cuddles."
    },
    { 
      title: "Social Needs", 
      rating: 5,
      description: "Thrives on attention and doesn't do well when left alone for long periods."
    },
    { 
      title: "Child Friendly", 
      rating: 4,
      description: "Generally good with children who treat them respectfully."
    },
    { 
      title: "Pet Friendly", 
      rating: 3,
      description: "Usually gets along with other pets, especially when introduced young."
    },
    { 
      title: "Intelligence", 
      rating: 5,
      description: "Highly intelligent and can be trained to do various tricks and behaviors."
    },
    { 
      title: "Vocal", 
      rating: 3,
      description: "Moderately vocal with a distinct voice, but not overly talkative."
    },
    { 
      title: "Grooming", 
      rating: 2,
      description: "Low-maintenance coat requires minimal grooming."
    }
  ];

  return (
    <section id="characteristics" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-bombay-subtle/20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Breed Characteristics</h2>
          <p className="text-lg text-foreground/80">
            Understand the unique traits that make Bombay cats special companions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {traits.map((trait, index) => (
            <CharacteristicItem 
              key={index}
              title={trait.title}
              rating={trait.rating}
              description={trait.description}
            />
          ))}
        </div>

        <div className="mt-16 bg-bombay-accent/10 rounded-2xl p-6 md:p-8 flex items-start">
          <div className="bg-white p-3 rounded-full mr-4 shrink-0">
            <Info className="h-6 w-6 text-bombay" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Care Notes</h3>
            <p className="text-foreground/80 mb-4">
              Bombay cats are generally healthy, but as with all breeds, they can be prone to certain health issues. Regular veterinary checkups are essential.
            </p>
            <ul className="space-y-2">
              {[
                "Regular play sessions to keep them physically and mentally stimulated",
                "Balanced diet to maintain a healthy weight",
                "Occasional brushing to keep their coat glossy",
                "Dental care to prevent periodontal disease"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-bombay mr-2 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Characteristics;
