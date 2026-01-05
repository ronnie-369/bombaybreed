import React from 'react';
import Header from '@/components/Header';
import ExecutiveHero from '@/components/ExecutiveHero';
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
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';

const Index = () => {
  const { isLoading } = useContentLoading({ delay: 600 });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <ContentLoader isLoading={isLoading} skeleton={<HeroSkeleton />}>
        <ExecutiveHero />
      </ContentLoader>
      <ContentLoader isLoading={isLoading} skeleton={<BoardValueSkeleton />}>
        <BoardValue />
      </ContentLoader>
      <ReportsCarousel />
      
      {/* Personal Quote Section */}
      <section className="py-12 md:py-16 px-6 md:px-8 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal direction="up">
            <blockquote className="text-xl md:text-2xl lg:text-3xl italic text-primary/80 font-serif leading-relaxed">
              "It will take all of us, to do this for all of us"
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground tracking-wide">
              — Theresa Ronnie
            </p>
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
    </div>
  );
};

export default Index;
