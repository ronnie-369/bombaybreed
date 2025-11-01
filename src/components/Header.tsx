import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

const Header = () => {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-center">
        <Link to="/" className="flex items-center gap-2 bg-transparent">
          <AnimatedLogo 
            alt="BOMBAY BREED – Strategic Sustainability Communications Advisory"
            className="h-10 md:h-12 block bg-transparent object-cover scale-150 -mx-3"
            fallbackSrc="/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
          />
          <h1 className="text-xl md:text-2xl font-logo text-foreground tracking-tight leading-none whitespace-nowrap">
            BOMBAY BREED
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;