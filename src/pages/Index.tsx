
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import GreenJobsReport from '@/components/GreenJobsReport';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import CaseStudies from '@/components/CaseStudies';
import Value from '@/components/Value';
import About from '@/components/About';
import Endorsements from '@/components/Endorsements';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      <Hero />
      <GreenJobsReport />
      <Services />
      <Expertise />
      <CaseStudies />
      <Value />
      <About />
      <Endorsements />
      <Contact />
    </div>
  );
};

export default Index;
