import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const capabilities = [
  { name: 'Energy Optimisation', slug: 'energy-optimisation-consulting', description: 'Strategic energy efficiency consulting' },
  { name: 'Industrial Decarbonisation', slug: 'industrial-decarbonisation-strategy', description: 'Decarbonisation roadmaps for industry' },
  { name: 'Article 6 Advisory', slug: 'article-6-advisory', description: 'Carbon markets & Paris Agreement guidance' },
  { name: 'Climate Investment', slug: 'climate-investment-readiness', description: 'Climate finance readiness' },
  { name: 'DMRV Integrity', slug: 'dmrv-integrity-due-diligence', description: 'Verification & due diligence' },
];

const industries = [
  { name: 'Steel Industry', slug: 'steel-industry' },
  { name: 'Cement Industry', slug: 'cement-industry' },
  { name: 'Oil & Gas', slug: 'oil-gas' },
  { name: 'Power & Utilities', slug: 'power-utilities' },
  { name: 'Data Centres', slug: 'data-centres' },
];

const regions = [
  { name: 'India', slug: 'india' },
  { name: 'Gujarat', slug: 'gujarat' },
  { name: 'Maharashtra', slug: 'maharashtra' },
  { name: 'UAE', slug: 'uae' },
  { name: 'Singapore', slug: 'singapore' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMobileServicesOpen(false);
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

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors story-link">
            Home
          </Link>
          
          {/* Services Mega Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-muted-foreground hover:text-foreground bg-transparent">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-4 grid grid-cols-3 gap-4">
                    {/* Capabilities Column */}
                    <div>
                      <h4 className="text-xs font-medium text-primary uppercase tracking-wider mb-3">
                        Capabilities
                      </h4>
                      <ul className="space-y-2">
                        {capabilities.map((cap) => (
                          <li key={cap.slug}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/${cap.slug}`}
                                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                              >
                                {cap.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Industries Column */}
                    <div>
                      <h4 className="text-xs font-medium text-primary uppercase tracking-wider mb-3">
                        Industries
                      </h4>
                      <ul className="space-y-2">
                        {industries.map((ind) => (
                          <li key={ind.slug}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/${ind.slug}`}
                                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                              >
                                {ind.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Regions Column */}
                    <div>
                      <h4 className="text-xs font-medium text-primary uppercase tracking-wider mb-3">
                        Regions
                      </h4>
                      <ul className="space-y-2">
                        {regions.map((reg) => (
                          <li key={reg.slug}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/${reg.slug}`}
                                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                              >
                                {reg.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 border-t border-border/50">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services"
                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            View All Services →
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
            
            {/* Mobile Services Accordion */}
            <div>
              <button 
                className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              >
                Services
                <ChevronDown className={cn("w-4 h-4 transition-transform", isMobileServicesOpen && "rotate-180")} />
              </button>
              {isMobileServicesOpen && (
                <div className="pl-4 mt-2 space-y-3 border-l border-border/50">
                  <div>
                    <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">Capabilities</p>
                    {capabilities.slice(0, 3).map((cap) => (
                      <Link 
                        key={cap.slug} 
                        to={`/${cap.slug}`} 
                        className="block text-sm text-muted-foreground hover:text-foreground py-1"
                        onClick={toggleMenu}
                      >
                        {cap.name}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">Industries</p>
                    {industries.slice(0, 3).map((ind) => (
                      <Link 
                        key={ind.slug} 
                        to={`/${ind.slug}`} 
                        className="block text-sm text-muted-foreground hover:text-foreground py-1"
                        onClick={toggleMenu}
                      >
                        {ind.name}
                      </Link>
                    ))}
                  </div>
                  <Link 
                    to="/services" 
                    className="block text-sm font-medium text-primary hover:text-primary/80 py-1"
                    onClick={toggleMenu}
                  >
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

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
