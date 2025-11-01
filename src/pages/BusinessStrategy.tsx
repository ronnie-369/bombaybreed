import React from 'react';
import Header from '@/components/Header';
import BusinessHero from '@/components/business/BusinessHero';
import BusinessServices from '@/components/business/BusinessServices';
import IndustryExperience from '@/components/business/IndustryExperience';
import BusinessCaseStudies from '@/components/business/BusinessCaseStudies';
import BusinessAbout from '@/components/business/BusinessAbout';
import Contact from '@/components/Contact';

const BusinessStrategy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-background">
      <Header />
      <BusinessHero />
      <BusinessServices />
      <IndustryExperience />
      <BusinessCaseStudies />
      <BusinessAbout />
      <Contact />
    </div>
  );
};

export default BusinessStrategy;
