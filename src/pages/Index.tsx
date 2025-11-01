import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Building2, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      
      {/* Minimal Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Brief Welcome */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-accent">
            Bombay Breed Consulting
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-16 max-w-2xl mx-auto">
            Strategic advisory for carbon markets and business growth
          </p>
          
          {/* Two Service Path Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Card 1: Carbon Markets */}
            <Link to="/climate-communications" className="block h-full">
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 hover:border-green-500/50">
                <CardContent className="p-10 text-center flex flex-col items-center justify-center min-h-[320px]">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Leaf className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Carbon Markets & Climate
                  </h2>
                  <p className="text-foreground/60 mb-6 text-base md:text-lg">
                    Strategic communications for carbon markets and energy transition
                  </p>
                  <ArrowRight className="w-6 h-6 mx-auto text-green-600 dark:text-green-400 group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>
            
            {/* Card 2: Business Consulting */}
            <Link to="/business-strategy" className="block h-full">
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 hover:border-blue-500/50">
                <CardContent className="p-10 text-center flex flex-col items-center justify-center min-h-[320px]">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Business Strategy Consulting
                  </h2>
                  <p className="text-foreground/60 mb-6 text-base md:text-lg">
                    Cross-industry consulting for growth and operational excellence
                  </p>
                  <ArrowRight className="w-6 h-6 mx-auto text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>
            
          </div>
        </div>
      </section>
      
      {/* Minimal Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-foreground/40">
        <Link to="/climate-communications" className="hover:text-foreground/60 transition-colors">Contact</Link>
        <span className="mx-2">•</span>
        <Link to="/privacy-policy" className="hover:text-foreground/60 transition-colors">Privacy</Link>
      </footer>
    </div>
  );
};

export default Index;
