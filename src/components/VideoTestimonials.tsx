import React from 'react';
import VideoPlayer from './ui/video-player';
import { Quote } from 'lucide-react';

interface VideoTestimonial {
  videoId: string;
  provider: 'youtube' | 'vimeo';
  thumbnail?: string;
  name: string;
  title: string;
  company: string;
  quote: string;
}

const testimonials: VideoTestimonial[] = [
  {
    videoId: 'dQw4w9WgXcQ', // Replace with actual video IDs
    provider: 'youtube',
    name: 'Sarah Chen',
    title: 'Chief Sustainability Officer',
    company: 'Global Energy Corp',
    quote: 'ClimateDesk transformed our sustainability narrative from compliance checkbox to competitive advantage.'
  },
  {
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    name: 'Michael Rodriguez',
    title: 'VP of Communications',
    company: 'Tech Innovations Ltd',
    quote: 'The strategic guidance was exactly what we needed to cut through the greenwashing noise.'
  },
  {
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    name: 'Priya Sharma',
    title: 'Director of ESG',
    company: 'Manufacturing Alliance',
    quote: 'Finally, a partner who understands both climate science and business strategy.'
  }
];

const VideoTestimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Quote className="h-4 w-4" />
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hear From Our Clients
          </h2>
          <p className="text-xl text-muted-foreground">
            Real stories from leaders who've transformed their climate communications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <VideoPlayer
                videoId={testimonial.videoId}
                provider={testimonial.provider}
                thumbnail={testimonial.thumbnail}
                title={`${testimonial.name} - ${testimonial.company}`}
                aspectRatio="16/9"
                className="mb-6"
              />
              
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Join 50+ organizations building credible climate narratives
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
