import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Globe, Factory, Briefcase, Scale } from 'lucide-react';

interface RelatedPage {
  slug: string;
  title: string;
  type: 'capability' | 'industry' | 'geography' | 'regulation' | 'problem';
}

interface RelatedPagesProps {
  pages: RelatedPage[];
}

const typeIcons = {
  capability: Briefcase,
  industry: Factory,
  geography: Globe,
  regulation: Scale,
  problem: ArrowRight
};

const typeLabels = {
  capability: 'Service',
  industry: 'Industry',
  geography: 'Region',
  regulation: 'Regulation',
  problem: 'Solution'
};

const RelatedPages = ({ pages }: RelatedPagesProps) => {
  if (!pages || pages.length === 0) return null;

  return (
    <section className="py-12 border-t border-border/50">
      <h2 className="text-2xl font-bold text-foreground mb-6">Related Services & Insights</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => {
          const Icon = typeIcons[page.type];
          return (
            <Link key={page.slug} to={`/${page.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-colors group">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    <Icon className="h-3 w-3" />
                    {typeLabels[page.type]}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center justify-between">
                    {page.title}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent />
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedPages;
