import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RelatedPage {
  slug?: string;
  url?: string;
  title?: string;
  type?: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
}

const typeLabels: Record<string, string> = {
  capability: 'Service',
  industry: 'Industry',
  geography: 'Region',
  regulation: 'Regulation',
  problem: 'Solution',
  report: 'Report',
  tool: 'Tool',
  page: 'Page',
};

const getTypeLabel = (type: string | undefined): string => {
  if (!type) return 'Related';
  return typeLabels[type] || 'Related';
};

const RelatedPages = ({ pages }: RelatedPagesProps) => {
  if (!pages || !Array.isArray(pages) || pages.length === 0) return null;

  const validPages = pages.filter(page => 
    page && typeof page === 'object' && page.title && (page.slug || page.url)
  );

  if (validPages.length === 0) return null;

  return (
    <section className="py-12 border-t border-border/50">
      <h2 className="text-xl font-serif tracking-tight text-foreground mb-6">Related Services & Insights</h2>
      <div className="space-y-4">
        {validPages.map((page, index) => {
          const href = page.slug || page.url || '#';
          const normalizedHref = href.startsWith('/') ? href : `/${href}`;
          const label = getTypeLabel(page.type);
          
          return (
            <Link key={page.slug || page.url || index} to={normalizedHref} className="group block">
              <div className="flex items-center justify-between py-3 border-b border-border/30 group-hover:border-primary/30 transition-colors">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                  <h3 className="text-foreground group-hover:text-primary transition-colors font-medium">
                    {page.title}
                  </h3>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedPages;