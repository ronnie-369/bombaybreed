import React from 'react';
import CardNav from '@/components/CardNav';
import BentoGrid from '@/components/BentoGrid';

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-black relative"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        backgroundPosition: 'center'
      }}
    >
      <CardNav />
      <BentoGrid />
    </div>
  );
};

export default Index;
