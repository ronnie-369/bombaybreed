import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, AlertTriangle, Clock, Users, TrendingDown } from 'lucide-react';
import BookingDialog from '@/components/BookingDialog';

interface WhoHiresUsProps {
  roles?: string[];
  industry?: string;
}

export const WhoHiresUs = ({ roles = ['CEO', 'COO', 'CSO', 'CFO'], industry }: WhoHiresUsProps) => {
  const roleDescriptions: Record<string, string> = {
    'CEO': 'Strategic positioning, investor relations, regulatory risk',
    'COO': 'Operational efficiency, energy costs, process optimization',
    'CSO': 'Sustainability strategy, reporting frameworks, stakeholder engagement',
    'CFO': 'Capital allocation, green financing, risk quantification'
  };

  return (
    <section className="py-12 border-t border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Who Hires Us For This</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <Card key={role} className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{role}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {roleDescriptions[role] || `${industry || 'Industry'} leadership seeking strategic climate advisory`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

interface UrgencyTriggersProps {
  triggers?: string[];
}

export const UrgencyTriggers = ({ triggers }: UrgencyTriggersProps) => {
  const defaultTriggers = [
    'CBAM reporting deadline approaching',
    'Investor due diligence on climate risk',
    'Board mandate for net-zero pathway',
    'Rising energy costs impacting margins',
    'Regulatory enforcement action imminent'
  ];

  const displayTriggers = triggers || defaultTriggers;

  return (
    <section className="py-12 border-t border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">When This Becomes Urgent</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {displayTriggers.map((trigger, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="py-2 px-4 text-sm bg-secondary/30 border-primary/20"
          >
            {trigger}
          </Badge>
        ))}
      </div>
    </section>
  );
};

interface FailureConsequencesProps {
  consequences?: {
    title: string;
    description: string;
  }[];
}

export const FailureConsequences = ({ consequences }: FailureConsequencesProps) => {
  const defaultConsequences = [
    {
      title: 'Lost Capital Access',
      description: 'Climate-unready assets face exclusion from institutional investment pipelines and green financing mechanisms.'
    },
    {
      title: 'Reputational Risk',
      description: 'Greenwashing allegations and integrity failures destroy stakeholder trust and market positioning.'
    },
    {
      title: 'Compliance Breach',
      description: 'Regulatory penalties, import restrictions, and market access barriers compound rapidly.'
    },
    {
      title: 'Stranded Value',
      description: 'Assets without credible transition pathways face accelerating write-downs and divestment pressure.'
    }
  ];

  const displayConsequences = consequences || defaultConsequences;

  return (
    <section className="py-12 border-t border-border/50">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="h-6 w-6 text-destructive" />
        <h2 className="text-2xl font-bold text-foreground">What Failure Looks Like</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {displayConsequences.map((item, index) => (
          <Card key={index} className="bg-destructive/5 border-destructive/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

interface DiagnosticCTAProps {
  ctaText?: string;
  ctaDescription?: string;
  capability?: string;
}

export const DiagnosticCTA = ({ 
  ctaText = 'Request an Integrity Review',
  ctaDescription = 'A focused diagnostic to identify gaps, quantify risk exposure, and map your path to climate-ready operations.',
}: DiagnosticCTAProps) => {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="bg-gradient-to-br from-primary/10 via-secondary/20 to-primary/5 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Ready to Move Forward?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          {ctaDescription}
        </p>
        <BookingDialog 
          trigger={
            <Button size="lg" className="group">
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          }
        />
      </div>
    </section>
  );
};
