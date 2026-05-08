import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

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

// Fallback static posts in case RSS fetch fails
const staticBlogPosts: BlogPost[] = [
  {
    id: 'circular-business-models',
    title: 'Why Circular Business Models Keep Failing',
    subtitle: '(and How to Fix Them)',
    description: "We've heard the promise before: circular business models can unlock new revenue, reduce risk, and cut emissions. But implementation keeps failing. Here's why - and how to scale them right.",
    date: 'Oct 2, 2025',
    url: 'https://theclimatedesk.substack.com/p/how-circular-business-models-fail',
    image: 'https://images.unsplash.com/photo-1571377160222-7b1043110482?w=800&auto=format&fit=crop',
    gradient: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'carbon-credits',
    title: "Everyone Wants India's Carbon Credits",
    subtitle: 'Few Want the Truth',
    description: "India's carbon credit market is attracting global attention, but the reality behind the hype reveals systemic challenges that need urgent addressing.",
    date: 'Sep 15, 2025',
    url: 'https://theclimatedesk.substack.com/p/everyone-wants-indias-carbon-credits',
    image: 'https://images.unsplash.com/photo-1512759925926-28b2607d28fe?w=800&auto=format&fit=crop',
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'carbon-sequestration',
    title: 'Unlock the Potential in Carbon Sequestration',
    subtitle: 'Join Our Free Webinar',
    description: 'Discover breakthrough strategies for scaling carbon sequestration projects and creating high-quality carbon credits that drive real climate impact.',
    date: 'Oct 3, 2025',
    url: 'https://theclimatedesk.substack.com/p/what-will-it-take-to-create-high',
    image: 'https://substackcdn.com/image/fetch/w_800,h_600,c_fill,f_auto,q_auto:good/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11cce985-6213-4548-bc0c-013569608030_1518x1600.jpeg',
    gradient: 'from-green-600 to-emerald-600'
  }
];

const BlogCarouselSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
    <div className="space-y-4">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-8 w-full max-w-md" />
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <Skeleton className="h-10 w-36 mt-4" />
    </div>
    <Skeleton className="aspect-[4/3] w-full rounded-lg" />
  </div>
);

const BlogCarousel = () => {
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase.functions.invoke('fetch-blog-posts');
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      if (!data?.success || !data?.posts?.length) {
        console.warn('No posts returned from RSS, using fallback');
        return staticBlogPosts;
      }
      return data.posts;
    },
    staleTime: 1000 * 60 * 60,
    placeholderData: staticBlogPosts,
    retry: 2,
  });

  const posts = blogPosts || staticBlogPosts;

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sm font-medium text-accent tracking-wide uppercase mb-3 block">
            From The Climate Desk
          </span>
          <h2 className="text-section font-heading tracking-tight text-foreground mb-4">
            Latest Articles
          </h2>
          <p className="text-body text-muted-foreground max-w-xl mx-auto">
            Insights and analysis on India's climate economy
          </p>
        </div>

        {isLoading ? (
          <BlogCarouselSkeleton />
        ) : (
          <Carousel 
            className="w-full"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 6000,
                stopOnInteraction: true,
              }) as any,
            ]}
          >
            <CarouselContent>
              {posts.map((post) => (
                <CarouselItem key={post.id}>
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-4 order-2 md:order-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-subsection font-heading font-medium text-foreground leading-tight">
                        {post.title}
                        {post.subtitle && (
                          <span className="block text-muted-foreground font-normal text-lg mt-1">
                            {post.subtitle}
                          </span>
                        )}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed">
                        {post.description}
                      </p>
                      <Button
                        onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
                        variant="default"
                        className="mt-2"
                      >
                        Read Article
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Image */}
                    <div className="order-1 md:order-2">
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/50 bg-muted">
                        <img 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]" 
                          src={post.image}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            onClick={() => window.open('https://theclimatedesk.substack.com/', '_blank', 'noopener,noreferrer')}
            variant="outline"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
