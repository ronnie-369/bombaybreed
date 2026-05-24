import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'The Climate Desk',
      description: 'Weekly insights on climate strategy',
      url: 'https://theclimatedesk.substack.com/',
      icon: Mail,
    },
    {
      name: 'LinkedIn',
      description: 'Professional updates & commentary',
      url: 'https://www.linkedin.com/in/theresaronnie/',
      icon: Linkedin,
    },
    {
      name: 'YouTube',
      description: 'Presentations & thought leadership',
      url: 'https://www.youtube.com/@theresaronnie',
      icon: Youtube,
    },
  ];

  const serviceLinks = [
    { name: 'Carbon Communications', slug: 'carbon-communications-strategy-india' },
    { name: 'Sustainability Reporting', slug: 'sustainability-reporting-india' },
    { name: 'Carbon Market Advisory', slug: 'carbon-market-advisory-india' },
    { name: 'ESG Communications', slug: 'esg-communications-consultant' },
    { name: 'Climate Strategy', slug: 'climate-strategy-india-enterprises' },
  ];

  return (
    <footer className="bg-foreground text-background/70 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-background mb-2">
              Theresa Ronnie
            </h3>
            <p className="text-sm text-background/50">
              Strategic Advisory for Climate & Sustainability
            </p>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-medium text-background/80 mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.slug}>
                  <Link 
                    to={`/${service.slug}`} 
                    className="text-sm text-background/50 hover:text-background transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/services" 
                  className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Content Channels */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-medium text-background/80 mb-4 uppercase tracking-wider">
              Stay Connected
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-3 rounded-lg border border-background/10 hover:border-background/25 transition-all duration-300"
                >
                  <link.icon className="w-5 h-5 text-accent mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-sm font-medium text-background/80 group-hover:text-background transition-colors flex items-center gap-1">
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <p className="text-xs text-background/40 mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-medium text-background/80 mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-background/50 hover:text-background transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-background/50 hover:text-background transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-background/50 hover:text-background transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/insights" className="text-sm text-background/50 hover:text-background transition-colors">Insights</Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-sm text-background/50 hover:text-background transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/intelligence/value-ladder" className="text-sm text-background/50 hover:text-background transition-colors">Membership</Link>
              </li>
            </ul>

            <h4 className="text-sm font-medium text-background/80 mt-6 mb-3 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm text-background/50 hover:text-background transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-background/50 hover:text-background transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm text-background/50 hover:text-background transition-colors">Refund &amp; Cancellation</Link>
              </li>
              <li>
                <Link to="/grievance-redressal" className="text-sm text-background/50 hover:text-background transition-colors">Grievance Redressal</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-background/10 text-center">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Bombay Breed Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
