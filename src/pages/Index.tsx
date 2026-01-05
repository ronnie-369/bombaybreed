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
