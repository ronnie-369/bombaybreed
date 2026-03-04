import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useNavigate } from 'react-router-dom';

interface ContentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  route: string;
  image: string;
  gradient: string;
}

const reports: ContentItem[] = [
  {
    id: 'working-for-the-earth',
    title: 'Working for the Earth',
    subtitle: 'A Dialectic Discourse',
    description: 'The planet\'s most urgent crisis demands its most essential workers. A deep exploration of the green labour paradox and just transition pathways.',
    cta: 'Read the Analysis',
    route: '/working-for-the-earth',
    image: '/lovable-uploads/pexels-veeterzy-38136.jpg',
    gradient: 'from-emerald-800 to-teal-700'
  },
  {
    id: 'wef-global-risks-2026',
    title: 'WEF Global Risks 2026',
    subtitle: 'Davos Analysis',
    description: 'Strategic interpretation of the World Economic Forum\'s flagship risk report for climate leaders.',
    cta: 'Download Executive Briefing',
    route: '/wef-global-risks-2026',
    image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
    gradient: 'from-slate-800 to-blue-900'
  },
  {
    id: 'energy-transition-playbook',
    title: 'The Energy Transition',
    subtitle: 'Playbook for India',
    description: 'Strategic frameworks and implementation pathways for India\'s clean energy transformation.',
    cta: 'Download the Playbook',
    route: '/energy-transition-playbook',
    image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
    gradient: 'from-orange-700 to-red-600'
  },
  {
    id: 'compliance-credibility',
    title: 'From Compliance to Credibility',
    subtitle: 'A CXO Guide to CCTS & CBAM',
    description: 'How Indian businesses can turn carbon compliance into trust, market access, and leadership.',
    cta: 'Download the Guide',
    route: '/compliance-to-credibility',
    image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
    gradient: 'from-slate-800 to-black'
  },
  {
    id: 'carbon-playbook',
    title: "India's Carbon Playbook",
    subtitle: 'CCTS & Article 6',
    description: 'PAT Lessons, CCTS Rules & Article 6 Opportunity',
    cta: 'Download Policy Guide',
    route: '/carbon-playbook',
    image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
    gradient: 'from-purple-700 to-indigo-600'
  },
  {
    id: 'carbon-market',
    title: "India's Carbon Market", 
    subtitle: '$1.4B Opportunity',
    description: 'An Investor\'s Deep Dive 2025–2030',
    cta: 'Download Investor Outlook',
    route: '/carbon-market-outlook',
    image: '/lovable-uploads/e3db2d3c-99b5-412e-a31f-127be1e22543.png',
    gradient: 'from-blue-700 to-cyan-600'
  },
  {
    id: 'green-jobs',
    title: 'Green Jobs in India',
    subtitle: '1 Million by 2030',
    description: 'Workforce & Investment Outlook 2025–2030',
    cta: 'Download Workforce Report',
    route: '/green-jobs-report',
    image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
    gradient: 'from-teal-700 to-emerald-600'
  }
];

const ReportsCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24 px-6 md:px-8 bg-gradient-to-b from-bombay-background to-white overflow-hidden">
      <div className="container mx-auto">
        <Carousel 
          className="w-full"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }) as any,
          ]}
        >
          <CarouselContent>
            {reports.map((item) => (
              <CarouselItem key={item.id}>
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="md:w-1/2 space-y-6 text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight animate-fade-in break-words">
                      <span className="text-gradient">{item.title}</span>
                      {item.subtitle && (
                        <>
                          <br />
                          <span className={`bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                            {item.subtitle}
                          </span>
                        </>
                      )}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl animate-fade-in break-words hyphens-auto leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-4 animate-fade-in">
                      <Button 
                        onClick={() => navigate(item.route)}
                        variant="gradient"
                        className="px-8 py-6 text-lg"
                      >
                        {item.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/2 mt-8 md:mt-0 relative">
                    <div className={`absolute -inset-4 bg-gradient-to-br ${item.gradient} opacity-20 rounded-full blur-3xl`}></div>
                    <div className="relative">
                      <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl shadow-xl">
                        <img 
                          alt={item.title}
                          className="w-full h-full object-cover object-center scale-90" 
                          src={item.image}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default ReportsCarousel;
