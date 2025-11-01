import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Building2, FileText, Newspaper, User, Mail, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BentoItemProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  to?: string;
  className?: string;
  gradient?: string;
  children?: React.ReactNode;
}

const BentoItem = ({ title, subtitle, icon, to, className, gradient, children }: BentoItemProps) => {
  const content = (
    <Card className={cn(
      "group relative overflow-hidden h-full border-white/10 transition-all duration-300 hover:border-white/30",
      gradient,
      className
    )}>
      <CardContent className="p-6 h-full flex flex-col justify-between">
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
      </CardContent>
    </Card>
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
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          
          {/* Box 1: Header - Large, spans 2 columns */}
          <BentoItem
            title="Transforming Strategy into Results"
            subtitle="Embedded Oversight and KPI-Driven ROI"
            className="md:col-span-2 md:row-span-2"
            gradient="bg-gradient-to-br from-purple-900/50 via-purple-800/50 to-indigo-900/50"
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
            gradient="bg-gradient-to-br from-teal-900/50 via-teal-800/50 to-cyan-900/50 hover:from-teal-800/60 hover:via-teal-700/60 hover:to-cyan-800/60"
          />

          {/* Box 3: Business Strategy */}
          <BentoItem
            title="Business Strategy"
            subtitle="Cross-industry consulting"
            icon={<Building2 className="w-8 h-8 text-purple-400" />}
            to="/business-strategy"
            className="md:row-span-2"
            gradient="bg-gradient-to-br from-purple-900/50 via-purple-800/50 to-indigo-900/50 hover:from-purple-800/60 hover:via-purple-700/60 hover:to-indigo-800/60"
          />

          {/* Box 4: Case Studies */}
          <BentoItem
            title="Case Studies"
            subtitle="Proven success stories"
            icon={<FileText className="w-8 h-8 text-amber-400" />}
            to="/climate-communications#case-studies"
            gradient="bg-gradient-to-br from-amber-900/50 via-orange-900/50 to-red-900/50 hover:from-amber-800/60 hover:via-orange-800/60 hover:to-red-800/60"
          />

          {/* Box 5: Blog */}
          <BentoItem
            title="Blog"
            subtitle="Latest insights & reports"
            icon={<Newspaper className="w-8 h-8 text-blue-400" />}
            to="/climate-communications#blog"
            gradient="bg-gradient-to-br from-blue-900/50 via-indigo-900/50 to-violet-900/50 hover:from-blue-800/60 hover:via-indigo-800/60 hover:to-violet-800/60"
          />

          {/* Box 6: About */}
          <BentoItem
            title="About"
            subtitle="Our story & expertise"
            icon={<User className="w-8 h-8 text-emerald-400" />}
            to="/climate-communications#about"
            gradient="bg-gradient-to-br from-emerald-900/50 via-green-900/50 to-teal-900/50 hover:from-emerald-800/60 hover:via-green-800/60 hover:to-teal-800/60"
          />

          {/* Box 7: Contact */}
          <BentoItem
            title="Contact"
            subtitle="Let's connect"
            icon={<Mail className="w-8 h-8 text-rose-400" />}
            to="/climate-communications#contact"
            gradient="bg-gradient-to-br from-rose-900/50 via-pink-900/50 to-fuchsia-900/50 hover:from-rose-800/60 hover:via-pink-800/60 hover:to-fuchsia-800/60"
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
