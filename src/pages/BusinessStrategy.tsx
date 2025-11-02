import React from 'react';
import Header from '@/components/Header';
import BusinessHero from '@/components/business/BusinessHero';
import BusinessServices from '@/components/business/BusinessServices';
import IndustryExperience from '@/components/business/IndustryExperience';
import BusinessCaseStudies from '@/components/business/BusinessCaseStudies';
import BusinessAbout from '@/components/business/BusinessAbout';
import TrustSignals from '@/components/TrustSignals';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import StickyCTA from '@/components/StickyCTA';
import VideoSection from '@/components/VideoSection';
import ROICalculator from '@/components/tools/ROICalculator';

const BusinessStrategy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-background">
      <Header />
      <BusinessHero />
      <BusinessServices />
      <IndustryExperience />
      <BusinessCaseStudies />
      <TrustSignals />
      
      <VideoSection
        videoId="dQw4w9WgXcQ"
        provider="youtube"
        title="Strategic Transformation in Action"
        subtitle="Executive Advisory"
        description="See how we partner with business leaders to navigate complex transformations and unlock sustainable growth opportunities."
        benefits={[
          'Executive-level strategic guidance',
          'Cross-functional transformation support',
          'Results-driven implementation roadmaps'
        ]}
        ctaText="Schedule Executive Consultation"
        ctaLink="#contact"
        layout="right"
      />
      
      <ROICalculator />
      
      <BusinessAbout />
      <Contact />
      <Newsletter />
      <StickyCTA variant="schedule" />
    </div>
  );
};

export default BusinessStrategy;
