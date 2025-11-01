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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Card 1: Carbon Markets */}
            <Link to="/climate-communications" className="block h-full">
              <Card className="group bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 hover:shadow-[0_20px_60px_-10px_rgba(20,184,166,0.5)] transition-all duration-300 cursor-pointer h-full border-2 border-teal-300/50 hover:border-teal-200">
                <CardContent className="p-10 text-center flex flex-col items-center justify-center min-h-[320px]">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Leaf className="w-10 h-10 text-teal-800" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white group-hover:text-teal-50 transition-colors">
                    Carbon Markets & Climate
                  </h2>
                  <p className="text-white/90 mb-6 text-base md:text-lg">
                    Strategic communications for carbon markets and energy transition
                  </p>
                  <ArrowRight className="w-6 h-6 mx-auto text-white group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>
            
            {/* Card 2: Business Consulting */}
            <Link to="/business-strategy" className="block h-full">
              <Card className="group bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 hover:shadow-[0_20px_60px_-10px_rgba(139,92,246,0.5)] transition-all duration-300 cursor-pointer h-full border-2 border-purple-400/50 hover:border-purple-300">
                <CardContent className="p-10 text-center flex flex-col items-center justify-center min-h-[320px]">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-10 h-10 text-purple-800" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white group-hover:text-purple-50 transition-colors">
                    Business Strategy Consulting
                  </h2>
                  <p className="text-white/90 mb-6 text-base md:text-lg">
                    Cross-industry consulting for growth and operational excellence
                  </p>
                  <ArrowRight className="w-6 h-6 mx-auto text-white group-hover:translate-x-2 transition-transform" />
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
