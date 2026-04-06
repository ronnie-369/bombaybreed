import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FORMSPREE_URL = 'https://formspree.io/f/myknnoea';

const REPORT_FILE_MAP: Record<string, string> = {
  'CCTS Exposure Snapshot - Steel Sector': '/reports/BB_Steel_CCTS_Exposure_Snapshot.pdf',
  'CCTS Exposure Snapshot - Cement Sector': '/reports/BB_Cement_CCTS_Exposure_Snapshot.pdf',
  'CCTS Exposure Snapshot - Refinery Sector': '/reports/BB_Refinery_CCTS_Exposure_Snapshot.pdf',
  'CCTS Exposure Snapshot - Petrochemicals Sector': '/reports/BB_Petrochemicals_CCTS_Exposure_Snapshot.pdf',
  "India's CCUS Gap Is Not About Money": '/reports/TCD_CCUS_Policy_April2026.pdf',
};

interface ReportDownloadFormProps {
  reportTitle: string;
}

const ReportDownloadForm: React.FC<ReportDownloadFormProps> = ({ reportTitle }) => {
  const [formData, setFormData] = useState({ name: '', email: '', org: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const downloadPath = REPORT_FILE_MAP[reportTitle] || Object.values(REPORT_FILE_MAP)[0] || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.org) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          organisation: formData.org.trim(),
          report_requested: reportTitle,
          form_type: 'report_download',
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsSuccess(true);

      // Auto-trigger download
      const link = document.createElement('a');
      link.href = downloadPath;
      link.download = downloadPath.split('/').pop() || 'report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err instanceof Error ? err.message : 'Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-serif text-xl text-foreground mb-2">Your report is ready.</h3>
        <p className="text-sm text-muted-foreground mb-4">Download should start automatically.</p>
        <Button onClick={() => window.open(downloadPath, '_blank')} className="bg-foreground text-background hover:bg-foreground/90">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-[560px] mx-auto">
      <h2 className="font-serif text-[28px] text-foreground mb-2">Download the Full Report</h2>
      <p className="text-[15px] text-muted-foreground mb-8">Enter your details to receive the PDF immediately.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="dl-name" className="text-[13px] font-medium text-foreground">Full Name</Label>
          <Input id="dl-name" type="text" placeholder="Jane Smith" value={formData.name} onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))} required className="mt-1.5 h-12 text-[15px]" />
        </div>
        <div>
          <Label htmlFor="dl-email" className="text-[13px] font-medium text-foreground">Work Email</Label>
          <Input id="dl-email" type="email" placeholder="jane@company.com" value={formData.email} onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))} required className="mt-1.5 h-12 text-[15px]" />
        </div>
        <div>
          <Label htmlFor="dl-org" className="text-[13px] font-medium text-foreground">Organisation</Label>
          <Input id="dl-org" type="text" placeholder="Company Ltd." value={formData.org} onChange={(e) => setFormData(d => ({ ...d, org: e.target.value }))} required className="mt-1.5 h-12 text-[15px]" />
        </div>

        <Button type="submit" disabled={isLoading || !formData.name || !formData.email || !formData.org} className="w-full h-[52px] bg-foreground text-background hover:bg-foreground/90 text-[14px] font-semibold uppercase tracking-wider rounded-lg mt-2">
          {isLoading ? 'Processing...' : 'Download Report →'}
        </Button>

        <p className="text-[12px] text-muted-foreground/60 text-center">We respect your privacy. No spam, ever.</p>
      </form>
    </div>
  );
};

export default ReportDownloadForm;
