import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from '@/components/ui/Logo';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <Logo 
              src="/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
              alt="BOMBAY BREED – Strategic Sustainability Communications Advisory"
              className="h-10 md:h-12"
            />
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-foreground/80 hover:text-bombay story-link transition-colors">
            Services
          </a>
          <a href="#expertise" className="text-foreground/80 hover:text-bombay story-link transition-colors">
            Expertise
          </a>
          <a href="#cases" className="text-foreground/80 hover:text-bombay story-link transition-colors">
            Case Studies
          </a>
          <a href="#about" className="text-foreground/80 hover:text-bombay story-link transition-colors">
            About
          </a>
          <div className="flex space-x-4">
            <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay story-link transition-colors">
              Blog
            </a>
            <span className="text-foreground/40">|</span>
            <a href="https://linkedin.com/in/theresa-ronnie" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay story-link transition-colors">
              LinkedIn
            </a>
          </div>
          <Button variant="gradient" className="px-6">
            Contact Us
          </Button>
        </nav>

        <button className="md:hidden text-foreground" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && <div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#services" className="text-foreground/80 hover:text-bombay transition-colors py-2" onClick={toggleMenu}>
              Services
            </a>
            <a href="#expertise" className="text-foreground/80 hover:text-bombay transition-colors py-2" onClick={toggleMenu}>
              Expertise
            </a>
            <a href="#cases" className="text-foreground/80 hover:text-bombay transition-colors py-2" onClick={toggleMenu}>
              Case Studies
            </a>
            <a href="#about" className="text-foreground/80 hover:text-bombay transition-colors py-2" onClick={toggleMenu}>
              About
            </a>
            <div className="flex space-x-4 py-2">
              <a href="https://theclimatedesk.substack.com/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay transition-colors">
                Blog
              </a>
              <span className="text-foreground/40">|</span>
              <a href="https://linkedin.com/in/theresa-ronnie" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay transition-colors">
                LinkedIn
              </a>
            </div>
            <Button variant="gradient" className="w-full px-6" onClick={toggleMenu}>
              Contact Us
            </Button>
          </div>
        </div>}
    </header>;
};
export default Header;