import React from 'react';
import { Check, Award, Star, LinkedinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const expertise = ["Proven Expertise", "Strategic Insighting", "Data-Led Approach", "Risk Management", "Stakeholder Engagement", "Innovation in Communication", "Tracking Compliance & Standards", "Cross-Functional Collaboration", "Long-term Vision"];
  const experience = [{
    area: "Integrated Marketing Communications & Brand Stewardship",
    years: "18 years"
  }, {
    area: "C-Suite Management & Strategic Business Leadership",
    years: "11 years"
  }, {
    area: "Climate Marketing",
    years: "1.5 years"
  }, {
    area: "Motherhood",
    years: "13 years"
  }, {
    area: "Creative Expression",
    years: "22 years"
  }];
  return <section id="about" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">A Strong History of C-suite Advisory</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-lg text-foreground/80 mb-6">
              Theresa has been a steady yet dynamic influence with CEOs and CMOs for over a decade. She has led advertising agencies, consulted with KPMG India, worked with the senior leadership at Microsoft India, before shifting her focus to Climate Action.
            </p>
            
            <p className="text-lg text-foreground/80 mb-6">
              Possessing an easy-going yet highly professional demeanour, Theresa is heavy on impact to bottomline and hard on effectiveness metrics. She is a student of climate sciences, mythology, behaviour studies, socio-economics, business movements, cultural trends and an active investor in the stock market.
            </p>
            
            <p className="text-lg text-foreground/80 mb-8">
              A mother, writer, futurist, philosopher, social scientist and free spirit, Theresa believes that businesses can build for sustainability and convert it to their competitive advantage.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <Button asChild className="flex items-center space-x-2 bg-[#0077B5] hover:bg-[#0077B5]/80">
                <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="h-5 w-5 mr-2" />
                  <span>Connect on LinkedIn</span>
                </a>
              </Button>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Experience</h3>
              <div className="space-y-3">
                {experience.map((item, index) => <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-medium">{item.area}</span>
                    <span className="text-bombay">{item.years}</span>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-bombay-accent/30 to-bombay-subtle/40 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1573497491208-6b1acb260507" alt="Theresa Ronnie" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 right-8 bg-white p-4 rounded-xl shadow-md max-w-xs">
                <p className="text-sm font-medium">
                  "High value, high impact engagement for sustainability communications excellence"
                </p>
              </div>
            </div>
            
            <div className="mt-16">
              <h3 className="text-xl font-bold mb-4">The X Factor</h3>
              <div className="grid grid-cols-2 gap-3">
                {expertise.map((item, index) => <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-bombay mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;
