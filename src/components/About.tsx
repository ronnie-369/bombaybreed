
import React from 'react';
import { Heart, Award, Star } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About The Bombay Breed</h2>
          <p className="text-lg text-foreground/80">
            The Bombay cat is an elegant breed with a distinctive appearance and affectionate personality. 
            Created through selective breeding to resemble a miniature black panther, these cats have become 
            beloved companions worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 transform transition-all hover:translate-y-[-5px]">
                <div className="flex items-start">
                  <div className="bg-bombay-accent/20 p-3 rounded-full mr-4">
                    <Heart className="h-6 w-6 text-bombay" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Loving Temperament</h3>
                    <p className="text-foreground/70">
                      Bombays are known for their extreme affection and deep attachment to their human companions. 
                      They thrive on interaction and will follow you from room to room.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 transform transition-all hover:translate-y-[-5px]">
                <div className="flex items-start">
                  <div className="bg-bombay-accent/20 p-3 rounded-full mr-4">
                    <Award className="h-6 w-6 text-bombay" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Distinctive Appearance</h3>
                    <p className="text-foreground/70">
                      Their sleek, patent-leather black coat and striking copper to gold eyes 
                      make them stand out among other breeds. Their medium-sized bodies are muscular yet elegant.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 transform transition-all hover:translate-y-[-5px]">
                <div className="flex items-start">
                  <div className="bg-bombay-accent/20 p-3 rounded-full mr-4">
                    <Star className="h-6 w-6 text-bombay" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Playful Intelligence</h3>
                    <p className="text-foreground/70">
                      Bombays are intelligent and highly trainable. They enjoy interactive play and can even 
                      learn to walk on a leash. Their playful nature persists well into adulthood.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-bombay-accent/30 to-bombay-subtle/40 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1564083772902-8a2ce3927e7b" 
                  alt="Bombay Cat Close-up" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-8 bg-white p-4 rounded-xl shadow-md">
                <p className="text-sm font-medium">
                  "Their copper eyes are windows to their loving souls."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
