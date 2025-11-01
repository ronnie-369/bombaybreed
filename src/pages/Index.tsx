import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Building2, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Minimal Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Brief Welcome */}
          <h1 className="text-4xl md:text-6xl font-bold mb-16 text-white">
            Bombay Breed Consulting
          </h1>
          <p className="text-lg md:text-xl font-semibold tracking-wide bg-gradient-to-r from-teal-400 via-purple-500 to-purple-600 bg-clip-text text-transparent mt-8 mb-20 max-w-2xl mx-auto drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]">
            Transforming Strategy into Results with Embedded Oversight and KPI-Driven ROI
          </p>
          
          {/* Two Service Path Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            
            {/* Card 1: Carbon Markets */}
            <Link to="/climate-communications" className="block h-full">
              <Card className="group bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.4)] transition-all duration-300 cursor-pointer h-full border border-teal-300/30 hover:border-teal-200/50">
                <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[200px]">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-teal-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Leaf className="w-7 h-7 text-teal-800" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-white group-hover:text-teal-50 transition-colors">
                    Carbon Markets & Climate
                  </h2>
                  <p className="text-white/90 mb-4 text-sm md:text-base">
                    Strategic communications for carbon markets and energy transition
                  </p>
                  <ArrowRight className="w-5 h-5 mx-auto text-white group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>
            
            {/* Card 2: Business Consulting */}
            <Link to="/business-strategy" className="block h-full">
              <Card className="group bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 hover:shadow-[0_20px_40px_-10px_rgba(139,92,246,0.4)] transition-all duration-300 cursor-pointer h-full border border-purple-400/30 hover:border-purple-300/50">
                <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[200px]">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-purple-800" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-white group-hover:text-purple-50 transition-colors">
                    Business Strategy Consulting
                  </h2>
                  <p className="text-white/90 mb-4 text-sm md:text-base">
                    Cross-industry consulting for growth and operational excellence
                  </p>
                  <ArrowRight className="w-5 h-5 mx-auto text-white group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>
            
          </div>
        </div>
      </section>
      
      {/* Minimal Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400">
        <Link to="/climate-communications" className="hover:text-gray-300 transition-colors">Contact</Link>
        <span className="mx-2">•</span>
        <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy</Link>
      </footer>
    </div>
  );
};

export default Index;
