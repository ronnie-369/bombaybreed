import React, { useState } from 'react';
import { FileDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';
import ScrollReveal from '@/components/ui/ScrollReveal';

const sectors = [
  {
    name: 'Iron & Steel',
    reportTitle: 'CCTS Exposure Snapshot - Steel Sector',
    entities: '253',
    geiSpread: '64%',
    description: 'GEI baselines, FY2027 targets, and credit exposure for all 253 obligated steel entities.',
  },
  {
    name: 'Cement',
    reportTitle: 'CCTS Exposure Snapshot - Cement Sector',
    entities: '90+',
    geiSpread: '45%',
    description: 'Compliance exposure profile across cement plants with GEI intensity benchmarking.',
  },
  {
    name: 'Petrochemicals',
    reportTitle: 'CCTS Exposure Snapshot - Petrochemicals Sector',
    entities: '40+',
    geiSpread: '52%',
    description: 'Carbon liability mapping for petrochemical facilities under CCTS obligations.',
  },
  {
    name: 'Petroleum Refineries',
    reportTitle: 'CCTS Exposure Snapshot - Refinery Sector',
    entities: '23',
    geiSpread: '38%',
    description: 'Refinery-specific GEI analysis with credit surplus/deficit projections.',
  },
];

const SectorSnapshotDownloads: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  return (
    <section className="py-16 px-6 md:px-8">
      <div className="container mx-auto max-w-[680px]">
        <ScrollReveal direction="up">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Sector Intelligence
            </p>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-foreground mb-3">
              CCTS Exposure Snapshots by Sector
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Confidential intelligence briefs mapping GEI baselines, FY2027 targets, and credit exposure 
              for obligated entities - sourced from MoEFCC gazette notifications.
            </p>
          </div>
        </ScrollReveal>

        <div className="border-t border-border/50">
          {sectors.map((sector) => (
            <ScrollReveal key={sector.name} direction="up">
              <div className="py-5 border-b border-border/50 group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="font-serif text-lg text-foreground">{sector.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {sector.entities} entities
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{sector.description}</p>
                  </div>
                  <Dialog open={openDialog === sector.name} onOpenChange={(open) => setOpenDialog(open ? sector.name : null)}>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors whitespace-nowrap mt-1 group-hover:gap-2.5">
                        <FileDown className="h-3.5 w-3.5" />
                        Download
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-xl">
                          {sector.name} - CCTS Exposure Snapshot
                        </DialogTitle>
                      </DialogHeader>
                      <LeadCaptureForm
                        reportTitle={sector.reportTitle}
                        reportDescription={sector.description}
                        onSuccess={() => {}}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
          Data sourced from MoEFCC gazette notifications, October 2025 and January 2026. 
          Your details go directly to Theresa Ronnie. Confidential - not shared with other entities in your sector.
        </p>
      </div>
    </section>
  );
};

export default SectorSnapshotDownloads;
