import React from 'react';
import Header from '@/components/Header';
import ClimateHero from '@/components/ClimateHero';
import DifferentiationBanner from '@/components/DifferentiationBanner';
import WhyDifferent from '@/components/WhyDifferent';
import ReportsCarousel from '@/components/ReportsCarousel';
import ComplianceToCredibilitySection from '@/components/ComplianceToCredibilitySection';
import Services from '@/components/Services';
import CTABanner from '@/components/CTABanner';
import Expertise from '@/components/Expertise';
import CaseStudies from '@/components/CaseStudies';
import Value from '@/components/Value';
import About from '@/components/About';
import StakeholderEcosystemWheel from '@/components/StakeholderEcosystemWheel';
import Endorsements from '@/components/Endorsements';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';

const ClimateStrategicCommunications = () => {
  return (
    <div className="min-h-screen bg-bombay-background">
      <Header />
      <ClimateHero />
      <DifferentiationBanner />
      <WhyDifferent />
      <ReportsCarousel />
      <ComplianceToCredibilitySection />
      <Services id="services" />
      <CTABanner variant="services" />
      <Expertise />
      <CTABanner variant="expertise" />
      <CaseStudies />
      <CTABanner variant="case-studies" />
      <Value />
      <About />
      <StakeholderEcosystemWheel />
      <Endorsements />
      <Newsletter id="newsletter" />
      <Contact />
    </div>
  );
};

export default ClimateStrategicCommunications;
