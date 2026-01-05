import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  url: string;
  image: string;
  date: string;
  gradient: string;
}

interface ContentItem {
  id: string;
  type: 'report' | 'blog';
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  route?: string;
  url?: string;
  image: string;
  gradient: string;
  date?: string;
}

// Static reports that don't change
const staticReports: ContentItem[] = [
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

// Convert blog posts to content items
const blogToContentItem = (post: BlogPost): ContentItem => ({
  id: post.id,
  type: 'blog',
  title: post.title,
  subtitle: post.subtitle || '',
  description: post.description,
  cta: 'Read Full Article',
  url: post.url,
  image: post.image,
  gradient: post.gradient,
  date: post.date
});

// Interleave reports and blog posts
const interleaveContent = (reports: ContentItem[], blogs: ContentItem[]): ContentItem[] => {
  const result: ContentItem[] = [];
  const maxLength = Math.max(reports.length, blogs.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < reports.length) result.push(reports[i]);
    if (i < blogs.length) result.push(blogs[i]);
  }
  
  return result;
};

const ReportsCarousel = () => {
  const navigate = useNavigate();
  
  const { data: blogPosts } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase.functions.invoke('fetch-blog-posts');
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      if (!data?.success || !data?.posts?.length) {
        return [];
      }
      return data.posts;
    },
    staleTime: 1000 * 60 * 60, // 1 hour cache
    placeholderData: [],
    retry: 2,
  });

  // Convert blog posts to content items and take only the first 4
  const blogContentItems = (blogPosts || []).slice(0, 4).map(blogToContentItem);
  
  // Interleave reports and blog posts for variety
  const content = interleaveContent(staticReports, blogContentItems);

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
                        onClick={() => item.type === 'blog' 
                          ? window.open(item.url, '_blank', 'noopener,noreferrer')
                          : navigate(item.route!)
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
