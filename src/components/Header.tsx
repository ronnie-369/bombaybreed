import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      // Navigation will be handled by Link component
      return;
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 bg-transparent">
            <AnimatedLogo 
              alt="BOMBAY BREED – Strategic Sustainability Communications Advisory"
              className="h-10 md:h-12 block bg-transparent object-cover scale-150 -mx-3"
              fallbackSrc="/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-logo text-foreground tracking-tight leading-none whitespace-nowrap">
                BOMBAY BREED
              </h1>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#services" className="text-foreground/80 hover:text-bombay story-link transition-colors">
            Services
          </Link>
          <Link to="/#expertise" className="text-foreground/80 hover:text-bombay story-link transition-colors">
            Expertise
          </Link>
          <Link to="/#cases" className="text-foreground/80 hover:text-bombay story-link transition-colors">
            Case Studies
          </Link>
          <Link to="/#about" className="text-foreground/80 hover:text-bombay story-link transition-colors">
            About
          </Link>
          <div className="flex space-x-4">
            <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay story-link transition-colors">
              Climate Desk
            </a>
            <span className="text-foreground/40">|</span>
            <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay story-link transition-colors">
              LinkedIn
            </a>
          </div>
          {location.pathname === '/' ? (
            <Button variant="gradient" className="px-6" onClick={scrollToContact}>
              Contact Us
            </Button>
          ) : (
            <Link to="/#contact">
              <Button variant="gradient" className="px-6">
                Contact Us
              </Button>
            </Link>
          )}
        </nav>

        <button className="md:hidden text-foreground" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/#services" className="text-foreground/80 hover:text-bombay transition-colors py-2" onClick={toggleMenu}>
              Services
            </Link>
            <Link to="/#expertise" className="text-foreground/80 hover:text-bombay transition-colors py-2" onClick={toggleMenu}>
              Expertise
            </Link>
            <Link to="/#cases" className="text-foreground/80 hover:text-bombay transition-colors py-2" onClick={toggleMenu}>
              Case Studies
            </Link>
            <Link to="/#about" className="text-foreground/80 hover:text-bombay transition-colors py-2" onClick={toggleMenu}>
              About
            </Link>
            <div className="flex space-x-4 py-2">
              <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay transition-colors">
                Climate Desk
              </a>
              <span className="text-foreground/40">|</span>
              <a href="https://www.linkedin.com/in/theresaronnie/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay transition-colors">
                LinkedIn
              </a>
            </div>
            {location.pathname === '/' ? (
              <Button variant="gradient" className="w-full px-6" onClick={scrollToContact}>
                Contact Us
              </Button>
            ) : (
              <Link to="/#contact">
                <Button variant="gradient" className="w-full px-6" onClick={toggleMenu}>
                  Contact Us
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;