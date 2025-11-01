import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CardNav.css';

const CardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      if (isOpen) {
        navRef.current.style.height = '400px';
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
              src="/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png" 
              alt="BOMBAY BREED"
              className="logo"
            />
          </Link>

          <button className="card-nav-cta-button" onClick={closeMenu}>
            <Link to="/climate-communications#contact" style={{ color: 'inherit', textDecoration: 'none' }}>
              Get Started
            </Link>
          </button>
        </div>

        <div className="card-nav-content">
          <div className="nav-card" style={{ backgroundColor: '#10b981' }}>
            <div className="nav-card-label" style={{ color: 'white' }}>Climate</div>
            <div className="nav-card-links">
              <Link 
                to="/climate-communications" 
                className="nav-card-link" 
                style={{ color: 'white' }}
                onClick={closeMenu}
              >
                Communications
              </Link>
              <Link 
                to="/climate-communications#case-studies" 
                className="nav-card-link" 
                style={{ color: 'white' }}
                onClick={closeMenu}
              >
                Case Studies
              </Link>
            </div>
          </div>

          <div className="nav-card" style={{ backgroundColor: '#8b5cf6' }}>
            <div className="nav-card-label" style={{ color: 'white' }}>Business</div>
            <div className="nav-card-links">
              <Link 
                to="/business-strategy" 
                className="nav-card-link" 
                style={{ color: 'white' }}
                onClick={closeMenu}
              >
                Strategy
              </Link>
              <Link 
                to="/business-strategy#services" 
                className="nav-card-link" 
                style={{ color: 'white' }}
                onClick={closeMenu}
              >
                Services
              </Link>
            </div>
          </div>

          <div className="nav-card" style={{ backgroundColor: '#f59e0b' }}>
            <div className="nav-card-label" style={{ color: 'white' }}>Resources</div>
            <div className="nav-card-links">
              <Link 
                to="/climate-communications#blog" 
                className="nav-card-link" 
                style={{ color: 'white' }}
                onClick={closeMenu}
              >
                Blog
              </Link>
              <Link 
                to="/climate-communications#about" 
                className="nav-card-link" 
                style={{ color: 'white' }}
                onClick={closeMenu}
              >
                About
              </Link>
            </div>
          </div>

          <div className="nav-card" style={{ backgroundColor: '#ef4444' }}>
            <div className="nav-card-label" style={{ color: 'white' }}>Connect</div>
            <div className="nav-card-links">
              <Link 
                to="/climate-communications#contact" 
                className="nav-card-link" 
                style={{ color: 'white' }}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <a 
                href="https://www.linkedin.com/in/saahilmehta/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-card-link" 
                style={{ color: 'white' }}
                onClick={closeMenu}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNav;
