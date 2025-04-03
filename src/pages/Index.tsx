
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Characteristics from '@/components/Characteristics';
import CaseStudies from '@/components/CaseStudies';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      <Hero />
      <About />
      <Characteristics />
      <CaseStudies />
      <Contact />
    </div>
  );
};

export default Index;
