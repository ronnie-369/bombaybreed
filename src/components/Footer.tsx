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

  return (
    <footer className="bg-muted/30 border-t border-border/50 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Theresa Ronnie
            </h3>
            <p className="text-sm text-muted-foreground">
              Strategic Advisory for Climate & Sustainability
            </p>
          </div>

          {/* Content Channels */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
              Stay Connected
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <link.icon className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                      {link.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="/credentials" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Credentials
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Theresa Ronnie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
