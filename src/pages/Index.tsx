import React, { useEffect } from 'react';
import { setOGMeta } from '@/utils/og-meta';
import Header from '@/components/Header';
import ExecutiveHero from '@/components/ExecutiveHero';
import ClientLogoStrip from '@/components/ClientLogoStrip';
import ProofStat from '@/components/ProofStat';
import BoardValue from '@/components/BoardValue';
import TrackRecord from '@/components/TrackRecord';
import DirectContact from '@/components/DirectContact';
import ContentLoader from '@/components/ui/ContentLoader';
import { useContentLoading } from '@/hooks/use-content-loading';
import HeroSkeleton from '@/components/skeletons/HeroSkeleton';
import BoardValueSkeleton from '@/components/skeletons/BoardValueSkeleton';
import TrackRecordSkeleton from '@/components/skeletons/TrackRecordSkeleton';
import DirectContactSkeleton from '@/components/skeletons/DirectContactSkeleton';
import ReportsCarousel from '@/components/ReportsCarousel';
import SpecialFeatureHighlight from '@/components/SpecialFeatureHighlight';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ServicesHub from '@/components/ServicesHub';
import StickyCtaBar from '@/components/StickyCtaBar';

const Index = () => {
  const { isLoading } = useContentLoading({ delay: 600 });

  useEffect(() => {
    document.title = "Bombay Breed — Strategic Carbon Advisory for Indian Boards";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "I ensure climate transition strategy is credible, compliant, and investable in India. Strategic advisor to CEOs & boards including Microsoft, KPMG India, Ford & Volkswagen.");
    }
    const cleanup = setOGMeta({
      title: 'Bombay Breed — Strategic Carbon Advisory for Indian Boards',
      description: 'I ensure climate transition strategy is credible, compliant, and investable in India.',
      image: 'https://bombaybreed.com/og/og-home.png',
      url: 'https://bombaybreed.com/',
    });
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <ContentLoader isLoading={isLoading} skeleton={<HeroSkeleton />}>
        <ExecutiveHero />
      </ContentLoader>
      
      <ClientLogoStrip />
      <ProofStat />
      
      <ContentLoader isLoading={isLoading} skeleton={<BoardValueSkeleton />}>
        <BoardValue />
      </ContentLoader>
      <SpecialFeatureHighlight />
      <ReportsCarousel />
      
      <ServicesHub />
      
      {/* Testimonial Quote Section */}
      <section className="py-16 md:py-24 px-6 md:px-8 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <ScrollReveal direction="up">
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl italic text-foreground/80 leading-relaxed">
              "Theresa won't oversell. She doesn't simplify irresponsibly. She is trustworthy to find the right answers."
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      <ContentLoader isLoading={isLoading} skeleton={<TrackRecordSkeleton />}>
        <TrackRecord />
      </ContentLoader>
      <ContentLoader isLoading={isLoading} skeleton={<DirectContactSkeleton />}>
        <DirectContact />
      </ContentLoader>
      <Footer />
      <StickyCtaBar />
    </div>
  );
};

export default Index;
