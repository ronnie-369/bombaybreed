
import React from 'react';
import Header from '@/components/Header';
import ExecutiveHero from '@/components/ExecutiveHero';
import BoardValue from '@/components/BoardValue';
import TrackRecord from '@/components/TrackRecord';
import DirectContact from '@/components/DirectContact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ExecutiveHero />
      <BoardValue />
      <TrackRecord />
      <DirectContact />
    </div>
  );
};

export default Index;
