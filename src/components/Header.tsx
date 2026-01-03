import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToContact = () => {
    if (location.pathname !== '/') {
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
    <header className="fixed w-full bg-background/90 backdrop-blur-sm z-50 border-b border-border/50">
      <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 bg-transparent">
            <AnimatedLogo 
              alt="BOMBAY BREED – Strategic Sustainability Communications Advisory"
              className="h-9 md:h-10 block bg-transparent object-cover"
              fallbackSrc="/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-medium text-foreground tracking-tight leading-none whitespace-nowrap">
                BOMBAY BREED
              </h1>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-10">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors story-link">
            Home
          </Link>
          <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors story-link">
            Resources
          </Link>
          <Link to="/credentials" className="text-sm text-muted-foreground hover:text-foreground transition-colors story-link">
            Credentials
          </Link>
          <ThemeToggle />
          {location.pathname === '/' ? (
            <Button variant="default" size="sm" onClick={scrollToContact}>
              Contact
            </Button>
          ) : (
            <Link to="/#contact">
              <Button variant="default" size="sm">
                Contact
              </Button>
            </Link>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="text-foreground" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 absolute top-full left-0 right-0 z-40 animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={toggleMenu}>
              Resources
            </Link>
            <Link to="/credentials" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2" onClick={toggleMenu}>
              Credentials
            </Link>
            {location.pathname === '/' ? (
              <Button variant="default" className="w-full" onClick={scrollToContact}>
                Contact
              </Button>
            ) : (
              <Link to="/#contact">
                <Button variant="default" className="w-full" onClick={toggleMenu}>
                  Contact
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
