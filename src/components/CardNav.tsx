import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CardNav.css';

interface NavLink {
  label: string;
  to?: string;
  href?: string;
  ariaLabel?: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logo: string;
  logoAlt: string;
  items: NavItem[];
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ctaText?: string;
  ctaLink?: string;
}

const CardNav = ({
  logo,
  logoAlt,
  items,
  baseColor = '#fff',
  menuColor = '#000',
  buttonBgColor = '#111',
  buttonTextColor = '#fff',
  ctaText = 'Get Started',
  ctaLink = '/climate-communications#contact'
}: CardNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      if (isOpen) {
        navRef.current.style.height = '320px';
      } else {
        navRef.current.style.height = '60px';
      }
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="card-nav-container">
      <div ref={navRef} className={`card-nav ${isOpen ? 'open' : ''}`}>
        <div className="card-nav-top">
          <div 
            className={`hamburger-menu ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>

          <Link to="/" className="logo-container" onClick={closeMenu}>
            <img 
              src={logo} 
              alt={logoAlt}
              className="logo"
            />
          </Link>

          <button 
            className="card-nav-cta-button" 
            onClick={closeMenu}
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            <Link to={ctaLink} style={{ color: 'inherit', textDecoration: 'none' }}>
              {ctaText}
            </Link>
          </button>
        </div>

        <div className="card-nav-content">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="nav-card" 
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="nav-card-label" style={{ color: item.textColor }}>
                {item.label}
              </div>
              <div className="nav-card-links">
                {item.links.map((link, linkIndex) => (
                  link.to ? (
                    <Link 
                      key={linkIndex}
                      to={link.to}
                      className="nav-card-link"
                      style={{ color: item.textColor }}
                      aria-label={link.ariaLabel}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      key={linkIndex}
                      href={link.href}
                      className="nav-card-link"
                      style={{ color: item.textColor }}
                      aria-label={link.ariaLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardNav;
