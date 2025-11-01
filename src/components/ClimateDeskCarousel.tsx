import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ExternalLink } from 'lucide-react';

const ClimateDeskCarousel = () => {
  const navigate = useNavigate();

  const content = [
    {
      id: 1,
      type: 'report',
      title: 'The Energy Transition Playbook',
      subtitle: 'Featured Report',
      description: 'A comprehensive guide to navigating India\'s energy transition with strategic insights for business leaders.',
      cta: 'Explore the Playbook',
      route: '/energy-transition-playbook',
      image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
      gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20'
    },
    {
      id: 2,
      type: 'blog',
      title: 'Unlock the Potential in Carbon Sequestration',
      subtitle: 'The Climate Desk • Oct 3, 2025',
      description: 'Exploring how carbon sequestration technologies are reshaping climate action and creating new market opportunities in India.',
      cta: 'Read Article',
      url: 'https://theclimatedesk.substack.com/p/unlock-the-potential-in-carbon-sequestration',
      image: 'https://substackcdn.com/image/fetch/w_800,h_600,c_fill,f_auto,q_auto:good/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11cce985-6213-4548-bc0c-013569608030_1518x1600.jpeg',
      gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20'
    },
    {
      id: 3,
      type: 'report',
      title: 'Compliance to Credibility',
      subtitle: 'Strategic Report',
      description: 'Transform your sustainability reporting from checkbox compliance into a powerful credibility asset.',
      cta: 'Learn More',
      route: '/compliance-to-credibility',
      image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
      gradient: 'from-teal-500/20 via-green-500/20 to-emerald-500/20'
    },
    {
      id: 4,
      type: 'blog',
      title: 'Why Circular Business Models Keep Failing',
      subtitle: 'The Climate Desk • Oct 2, 2025',
      description: 'An in-depth analysis of the barriers preventing circular economy success and practical solutions for businesses.',
      cta: 'Read Article',
      url: 'https://theclimatedesk.substack.com/p/why-circular-business-models-keep-failing',
      image: 'https://images.unsplash.com/photo-1571377160222-7b1043110482?w=800&auto=format&fit=crop',
      gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20'
    },
    {
      id: 5,
      type: 'report',
      title: 'India\'s Carbon Playbook',
      subtitle: 'Essential Guide',
      description: 'Strategic guidance for navigating India\'s evolving carbon markets and regulatory landscape.',
      cta: 'Access the Playbook',
      route: '/carbon-playbook',
      image: '/lovable-uploads/44d63597-9200-4941-8375-9a5a0aa338fe.png',
      gradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20'
    },
    {
      id: 6,
      type: 'blog',
      title: 'Everyone Wants India\'s Carbon Credits',
      subtitle: 'The Climate Desk • Sep 15, 2025',
      description: 'Why global markets are turning to India for carbon credits and what this means for Indian businesses.',
      cta: 'Read Article',
      url: 'https://theclimatedesk.substack.com/p/everyone-wants-indias-carbon-credits',
      image: 'https://images.unsplash.com/photo-1512759925926-28b2607d28fe?w=800&auto=format&fit=crop',
      gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20'
    }
  ];

  const handleClick = (item: typeof content[0]) => {
    if (item.type === 'report' && item.route) {
      navigate(item.route);
    } else if (item.type === 'blog' && item.url) {
      window.open(item.url, '_blank');
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            Latest Reports & Insights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay ahead with our newest research, playbooks, and perspectives from The Climate Desk
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {content.map((item) => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <div 
                    className={`relative h-full rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                    onClick={() => handleClick(item)}
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
                          {item.subtitle}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                        {item.description}
                      </p>

                      <button className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:gap-3 transition-all">
                        {item.cta}
                        {item.type === 'report' ? (
                          <ArrowRight className="w-4 h-4" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative left-0 translate-x-0" />
            <CarouselNext className="relative right-0 translate-x-0" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-12">
          <a
            href="https://theclimatedesk.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ backgroundColor: '#4A4642' }}
          >
            Subscribe to The Climate Desk
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClimateDeskCarousel;
