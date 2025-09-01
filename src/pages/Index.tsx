
import React from 'react';
import Header from '@/components/Header';
import ReportsCarousel from '@/components/ReportsCarousel';
import ReportTeasers from '@/components/ReportTeasers';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import CaseStudies from '@/components/CaseStudies';
import Value from '@/components/Value';
import About from '@/components/About';
import Endorsements from '@/components/Endorsements';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      <ReportsCarousel />
      <ReportTeasers />
      <Services />
      <Expertise />
      <CaseStudies />
      <Value />
      <About />
      <Endorsements />
      <Newsletter />
      <Contact />
    </div>
  );
};

export default Index;
