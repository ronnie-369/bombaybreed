
import React from 'react';
import Header from '@/components/Header';
import HeroIntro from '@/components/HeroIntro';
import ReportsCarousel from '@/components/ReportsCarousel';
import ComplianceToCredibilitySection from '@/components/ComplianceToCredibilitySection';
import Services from '@/components/Services';
import Expertise from '@/components/Expertise';
import CaseStudies from '@/components/CaseStudies';
import Value from '@/components/Value';
import About from '@/components/About';
import StakeholderEcosystemWheel from '@/components/StakeholderEcosystemWheel';
import Endorsements from '@/components/Endorsements';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      <HeroIntro />
      <ReportsCarousel />
      <ComplianceToCredibilitySection />
      <Services />
      <Expertise />
      <CaseStudies />
      <Value />
      <About />
      <StakeholderEcosystemWheel />
      <Endorsements />
      <Newsletter />
      <Contact />
    </div>
  );
};

export default Index;
