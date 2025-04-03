
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 bg-gradient-to-b from-bombay-background to-white overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">Elegant, Sleek</span>
              <br />
              Bombay Cats
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-lg">
              Discover the charm of the Bombay breed, with their sleek black coats and copper eyes.
              These affectionate companions bring mystery and elegance into your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button className="bg-bombay hover:bg-bombay-light text-white px-8 py-6 rounded-full text-lg">
                Explore Bombay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-bombay text-bombay hover:bg-bombay-subtle px-8 py-6 rounded-full text-lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-bombay-accent/20 to-bombay-subtle/40 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1601880348117-25c1127a95df" 
                  alt="Bombay Cat" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-xs">
                <p className="text-sm font-medium text-bombay">
                  "Bombay cats combine the mystique of a miniature black panther with the heart of a loving companion."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
