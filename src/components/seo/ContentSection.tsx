import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ContentSectionProps {
  title: string;
  content: string | ReactNode;
  icon?: LucideIcon;
  variant?: 'default' | 'highlight' | 'warning';
}

const ContentSection = ({ title, content, icon: Icon, variant = 'default' }: ContentSectionProps) => {
  const variantStyles = {
    default: 'bg-transparent',
    highlight: 'bg-secondary/30 rounded-xl p-6',
    warning: 'bg-destructive/5 rounded-xl p-6 border border-destructive/20'
  };

  return (
    <section className={`py-8 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="h-6 w-6 text-primary" />}
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
      </div>
      {typeof content === 'string' ? (
        <div 
          className="prose prose-lg max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className="text-muted-foreground">{content}</div>
      )}
    </section>
  );
};

export default ContentSection;
