
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-bombay">
            BOMBAY BREED
          </a>
          <span className="hidden md:block text-xs text-bombay-light ml-2 mt-2">
            Strategic Communications<br />Advisory Services
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-foreground/80 hover:text-bombay transition-colors">
            Services
          </a>
          <a href="#expertise" className="text-foreground/80 hover:text-bombay transition-colors">
            Expertise
          </a>
          <a href="#cases" className="text-foreground/80 hover:text-bombay transition-colors">
            Case Studies
          </a>
          <a href="#about" className="text-foreground/80 hover:text-bombay transition-colors">
            About
          </a>
          <div className="flex space-x-4">
            <a href="https://blog.bombaybreed.com" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay transition-colors">
              Blog
            </a>
            <span className="text-foreground/40">|</span>
            <a href="https://linkedin.com/in/theresa-ronnie" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay transition-colors">
              LinkedIn
            </a>
          </div>
          <Button className="bg-bombay hover:bg-bombay-light text-white">
            Contact Us
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 z-40 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#services" 
              className="text-foreground/80 hover:text-bombay transition-colors py-2"
              onClick={toggleMenu}
            >
              Services
            </a>
            <a 
              href="#expertise" 
              className="text-foreground/80 hover:text-bombay transition-colors py-2"
              onClick={toggleMenu}
            >
              Expertise
            </a>
            <a 
              href="#cases" 
              className="text-foreground/80 hover:text-bombay transition-colors py-2"
              onClick={toggleMenu}
            >
              Case Studies
            </a>
            <a 
              href="#about" 
              className="text-foreground/80 hover:text-bombay transition-colors py-2"
              onClick={toggleMenu}
            >
              About
            </a>
            <div className="flex space-x-4 py-2">
              <a href="https://blog.bombaybreed.com" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay transition-colors">
                Blog
              </a>
              <span className="text-foreground/40">|</span>
              <a href="https://linkedin.com/in/theresa-ronnie" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-bombay transition-colors">
                LinkedIn
              </a>
            </div>
            <Button 
              className="bg-bombay hover:bg-bombay-light text-white w-full"
              onClick={toggleMenu}
            >
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
