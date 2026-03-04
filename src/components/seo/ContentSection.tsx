import { ReactNode } from 'react';
import DOMPurify from 'dompurify';

interface ContentSectionProps {
  title: string;
  content: string | ReactNode;
  id?: string;
  variant?: 'default' | 'highlight' | 'warning';
}

const ContentSection = ({ title, content, id, variant = 'default' }: ContentSectionProps) => {
  const variantStyles = {
    default: 'bg-transparent',
    highlight: 'bg-secondary/30 rounded-xl p-6',
    warning: 'bg-destructive/5 rounded-xl p-6 border border-destructive/20'
  };

  const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span', 'div'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
      ALLOW_DATA_ATTR: false,
    });
  };

  const sectionId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <section id={sectionId} className={`py-8 ${variantStyles[variant]}`}>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{title}</h2>
      {typeof content === 'string' ? (
        <div 
          className="prose prose-lg max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      ) : (
        <div className="text-muted-foreground">{content}</div>
      )}
    </section>
  );
};

export default ContentSection;
