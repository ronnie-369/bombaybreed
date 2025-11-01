import { Link } from 'react-router-dom';
import { Leaf, Building2, FileText, Newspaper, User, Mail, Linkedin } from 'lucide-react';

interface BentoItemProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  to?: string;
  className?: string;
  children?: React.ReactNode;
}

const BentoItem = ({ title, subtitle, icon, to, className, children }: BentoItemProps) => {
  const content = (
    <div className={`group relative overflow-hidden h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/30 hover:shadow-2xl ${className}`}>
      <div className="p-6 h-full flex flex-col justify-between relative z-10">
        <div>
          {icon && (
            <div className="mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
              {icon}
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/80 text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};

const BentoGrid = () => {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          
          {/* Box 1: Header */}
          <BentoItem
            title="Transforming Strategy into Results"
            subtitle="Embedded Oversight and KPI-Driven ROI"
            className="md:col-span-2 md:row-span-2"
          >
            <div className="mt-4 text-white/60 text-xs md:text-sm">
              India's Premier Consulting Firm
            </div>
          </BentoItem>

          {/* Box 2: Carbon Markets */}
          <BentoItem
            title="Carbon Markets"
            subtitle="Strategic climate communications"
            icon={<Leaf className="w-8 h-8 text-teal-400" />}
            to="/climate-communications"
            className="md:row-span-2"
          />

          {/* Box 3: Business Strategy */}
          <BentoItem
            title="Business Strategy"
            subtitle="Cross-industry consulting"
            icon={<Building2 className="w-8 h-8 text-purple-400" />}
            to="/business-strategy"
            className="md:row-span-2"
          />

          {/* Box 4: Case Studies */}
          <BentoItem
            title="Case Studies"
            subtitle="Proven success stories"
            icon={<FileText className="w-8 h-8 text-amber-400" />}
            to="/climate-communications#case-studies"
          />

          {/* Box 5: Blog */}
          <BentoItem
            title="Blog"
            subtitle="Latest insights & reports"
            icon={<Newspaper className="w-8 h-8 text-blue-400" />}
            to="/climate-communications#blog"
          />

          {/* Box 6: About */}
          <BentoItem
            title="About"
            subtitle="Our story & expertise"
            icon={<User className="w-8 h-8 text-emerald-400" />}
            to="/climate-communications#about"
          />

          {/* Box 7: Contact */}
          <BentoItem
            title="Contact"
            subtitle="Let's connect"
            icon={<Mail className="w-8 h-8 text-rose-400" />}
            to="/climate-communications#contact"
          >
            <a 
              href="https://www.linkedin.com/in/saahilmehta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </BentoItem>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-400">
          <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default BentoGrid;
