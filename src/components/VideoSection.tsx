import React from 'react';
import VideoPlayer from './ui/video-player';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface VideoSectionProps {
  videoId: string;
  provider?: 'youtube' | 'vimeo';
  thumbnail?: string;
  title: string;
  subtitle?: string;
  description: string;
  benefits?: string[];
  ctaText?: string;
  ctaLink?: string;
  layout?: 'left' | 'right';
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoId,
  provider = 'youtube',
  thumbnail,
  title,
  subtitle,
  description,
  benefits = [],
  ctaText = 'Learn More',
  ctaLink = '#contact',
  layout = 'left'
}) => {
  const handleCTA = () => {
    const element = document.querySelector(ctaLink);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto ${layout === 'right' ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content */}
          <div className={`space-y-6 ${layout === 'right' ? 'lg:order-2' : ''}`}>
            {subtitle && (
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                {subtitle}
              </div>
            )}
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {title}
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>

            {benefits.length > 0 && (
              <ul className="space-y-3 pt-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            <Button
              size="lg"
              onClick={handleCTA}
              className="mt-8 group"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Video */}
          <div className={layout === 'right' ? 'lg:order-1' : ''}>
            <VideoPlayer
              videoId={videoId}
              provider={provider}
              thumbnail={thumbnail}
              title={title}
              aspectRatio="16/9"
              className="shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
