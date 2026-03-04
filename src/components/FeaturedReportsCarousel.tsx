import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Calendar, FileText } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { Card } from "@/components/ui/card";
import { format } from 'date-fns';

interface Publication {
  title: string;
  description: string;
  type: string;
  topics: string[];
  publishedDate: string;
  coverImage?: string;
}

interface FeaturedReportsCarouselProps {
  publications: Publication[];
  onDownloadClick: (pub: Publication) => void;
}

const FeaturedReportsCarousel: React.FC<FeaturedReportsCarouselProps> = ({ 
  publications, 
  onDownloadClick 
}) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM yyyy');
  };

  // Get the 3 featured reports: latest + 2 featured (WEF and From Compliance to Credibility)
  const getFeaturedReports = (): Publication[] => {
    const latest = publications[0];
    const wef = publications.find(p => p.title.includes('WEF'));
    const compliance = publications.find(p => p.title.includes('Compliance to Credibility'));
    
    const featured: Publication[] = [latest];
    if (wef && wef !== latest) featured.push(wef);
    if (compliance && compliance !== latest && compliance !== wef) featured.push(compliance);
    
    // Fill remaining slots with next publications if needed
    let index = 1;
    while (featured.length < 3 && index < publications.length) {
      if (!featured.includes(publications[index])) {
        featured.push(publications[index]);
      }
      index++;
    }
    
    return featured.slice(0, 3);
  };

  const featuredReports = getFeaturedReports();

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-card to-secondary/20">
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
          {featuredReports.map((pub, index) => (
            <CarouselItem key={index}>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Content */}
                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium uppercase tracking-wide">
                      {pub.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(pub.publishedDate)}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4 text-foreground">
                    {pub.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {pub.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pub.topics.slice(0, 6).map((topic, topicIndex) => (
                      <span 
                        key={topicIndex}
                        className="px-2.5 py-1 bg-muted text-muted-foreground rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                    {pub.topics.length > 6 && (
                      <span className="px-2.5 py-1 text-muted-foreground text-xs">
                        +{pub.topics.length - 6} more
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={() => onDownloadClick(pub)}
                    className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
                  >
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                </div>
                
                {/* Image */}
                <div className="hidden md:block relative overflow-hidden rounded-r-lg">
                  {pub.coverImage ? (
                    <img 
                      src={pub.coverImage} 
                      alt={`${pub.title} Cover`} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/20" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-2 py-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </Card>
  );
};

export default FeaturedReportsCarousel;
