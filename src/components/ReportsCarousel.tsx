import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useNavigate } from 'react-router-dom';

const ReportsCarousel = () => {
  const navigate = useNavigate();
  
  const content = [
    {
      id: 'energy-transition-playbook',
      type: 'report',
      title: 'The Energy Transition',
      subtitle: 'Playbook for India',
      description: 'Strategic frameworks and implementation pathways for India\'s clean energy transformation.',
      cta: 'Download the Playbook',
      route: '/energy-transition-playbook',
      image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
      gradient: 'from-orange-700 to-red-600'
    },
    {
      id: 'circular-business-models',
      type: 'blog',
      title: 'Why Circular Business Models Keep Failing',
      subtitle: '(and How to Fix Them)',
      description: "We've heard the promise before: circular business models can unlock new revenue, reduce risk, and cut emissions. But implementation keeps failing. Here's why—and how to scale them right.",
      cta: 'Read Full Article',
      url: 'https://theclimatedesk.substack.com/p/how-circular-business-models-fail',
      image: 'https://images.unsplash.com/photo-1571377160222-7b1043110482?w=800&auto=format&fit=crop',
      gradient: 'from-emerald-600 to-teal-600',
      date: 'Oct 2, 2025'
    },
    {
      id: 'compliance-credibility',
      type: 'report',
      title: 'From Compliance to Credibility',
      subtitle: 'A CXO Guide to CCTS & CBAM',
      description: 'How Indian businesses can turn carbon compliance into trust, market access, and leadership.',
      cta: 'Download the Guide',
      route: '/compliance-to-credibility',
      image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
      gradient: 'from-slate-800 to-black'
    },
    {
      id: 'carbon-credits',
      type: 'blog',
      title: "Everyone Wants India's Carbon Credits",
      subtitle: 'Few Want the Truth',
      description: "India's carbon credit market is attracting global attention, but the reality behind the hype reveals systemic challenges that need urgent addressing.",
      cta: 'Read Full Article',
      url: 'https://theclimatedesk.substack.com/p/everyone-wants-indias-carbon-credits',
      image: 'https://images.unsplash.com/photo-1512759925926-28b2607d28fe?w=800&auto=format&fit=crop',
      gradient: 'from-blue-600 to-indigo-600',
      date: 'Sep 15, 2025'
    },
    {
      id: 'carbon-playbook',
      type: 'report',
      title: "India's Carbon Playbook",
      subtitle: 'CCTS & Article 6',
      description: 'PAT Lessons, CCTS Rules & Article 6 Opportunity',
      cta: 'Download Policy Guide',
      route: '/carbon-playbook',
      image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
      gradient: 'from-purple-700 to-indigo-600'
    },
    {
      id: 'carbon-sequestration',
      type: 'blog',
      title: 'Unlock the Potential in Carbon Sequestration',
      subtitle: 'Join Our Free Webinar',
      description: 'Discover breakthrough strategies for scaling carbon sequestration projects and creating high-quality carbon credits that drive real climate impact.',
      cta: 'Read Full Article',
      url: 'https://theclimatedesk.substack.com/p/what-will-it-take-to-create-high',
      image: 'https://substackcdn.com/image/fetch/w_800,h_600,c_fill,f_auto,q_auto:good/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11cce985-6213-4548-bc0c-013569608030_1518x1600.jpeg',
      gradient: 'from-green-600 to-emerald-600',
      date: 'Oct 3, 2025'
    },
    {
      id: 'carbon-market',
      type: 'report',
      title: "India's Carbon Market", 
      subtitle: '$1.4B Opportunity',
      description: 'An Investor\'s Deep Dive 2025–2030',
      cta: 'Download Investor Outlook',
      route: '/carbon-market-outlook',
      image: '/lovable-uploads/e3db2d3c-99b5-412e-a31f-127be1e22543.png',
      gradient: 'from-blue-700 to-cyan-600'
    },
    {
      id: 'energy-gdp',
      type: 'blog',
      title: 'We Need Energy to Drive the GDP',
      subtitle: 'This decade holds the clues to our GDP growth',
      description: "India's energy transition is not just an environmental imperative—it's the key to unlocking sustainable economic growth this decade.",
      cta: 'Read Full Article',
      url: 'https://theclimatedesk.substack.com/p/the-world-is-watching-indias-energy',
      image: 'https://substackcdn.com/image/fetch/w_800,h_600,c_fill,f_auto,q_auto:good/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4fc920e7-74df-4d70-95e0-14f73369265a_2528x870.png',
      gradient: 'from-orange-600 to-red-600',
      date: 'Sep 14, 2025'
    },
    {
      id: 'green-jobs',
      type: 'report',
      title: 'Green Jobs in India',
      subtitle: '1 Million by 2030',
      description: 'Workforce & Investment Outlook 2025–2030',
      cta: 'Download Workforce Report',
      route: '/green-jobs-report',
      image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
      gradient: 'from-teal-700 to-emerald-600'
    }
  ];

  return (
    <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-6 md:px-8 bg-gradient-to-b from-bombay-background to-white overflow-hidden">
      <div className="container mx-auto">
        <Carousel 
          className="w-full"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent>
            {content.map((item) => (
              <CarouselItem key={item.id}>
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="md:w-1/2 space-y-6 text-center md:text-left">
                    {item.type === 'blog' && (
                      <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider">
                        Latest from The Climate Desk • {item.date}
                      </p>
                    )}
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight animate-fade-in break-words">
                      <span className="text-gradient">{item.title}</span>
                      <br />
                      <span className={`bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                        {item.subtitle}
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl animate-fade-in break-words hyphens-auto leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-4 animate-fade-in">
                      <Button 
                        onClick={() => item.type === 'blog' 
                          ? window.open(item.url, '_blank', 'noopener,noreferrer')
                          : navigate(item.route)
                        }
                        variant="gradient"
                        className="px-8 py-6 text-lg"
                      >
                        {item.cta}
                        {item.type === 'blog' ? (
                          <ExternalLink className="ml-2 h-5 w-5" />
                        ) : (
                          <ArrowRight className="ml-2 h-5 w-5" />
                        )}
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