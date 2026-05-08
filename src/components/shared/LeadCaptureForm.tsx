import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatPhoneInput, normalizePhone } from '@/lib/phoneFormat';

interface LeadCaptureFormProps {
  reportTitle: string;
  reportDescription: string;
  onSuccess?: () => void;
}

const REPORT_FILE_MAP: Record<string, string> = {
  'CCTS Exposure Snapshot - Steel Sector': '/reports/BB_Steel_CCTS_Exposure_Snapshot.pdf',
  'CCTS Exposure Snapshot - Cement Sector': '/reports/BB_Cement_CCTS_Exposure_Snapshot.pdf',
  'CCTS Exposure Snapshot - Petrochemicals Sector': '/reports/BB_Petrochemicals_CCTS_Exposure_Snapshot.pdf',
  'CCTS Exposure Snapshot - Refinery Sector': '/reports/BB_Refinery_CCTS_Exposure_Snapshot.pdf',
};

const FORMSPREE_URL = 'https://formspree.io/f/myknnoea';

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  reportTitle, 
  reportDescription, 
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    company_name: '',
    phone: '',
    consent: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const getDownloadUrl = () => {
    return REPORT_FILE_MAP[reportTitle] || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.consent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields and give consent for marketing communications.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          designation: formData.designation || undefined,
          company_name: formData.company_name || undefined,
          phone: formData.phone || undefined,
          marketing_consent: formData.consent,
          report_requested: reportTitle,
          form_type: 'report_download',
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed. Please try again.');
      }

      setIsSubmitted(true);

      toast({
        title: "Success!",
        description: "Your report is ready for download.",
      });

      onSuccess?.();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const downloadUrl = getDownloadUrl();

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Thank you! Your report is ready.
          </h3>
          <p className="text-green-700 mb-4">
            Click below to download "{reportTitle}".
          </p>
          {downloadUrl ? (
            <Button
              asChild
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <a href={downloadUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </a>
            </Button>
          ) : (
            <p className="text-sm text-green-600">
              The report will be sent to your email shortly.
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader className="text-center">
        <Download className="h-12 w-12 text-accent mx-auto mb-2" />
        <CardTitle className="text-xl">Download {reportTitle}</CardTitle>
        <CardDescription className="text-sm">
          {reportDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation" className="text-sm font-medium">Designation</Label>
            <Input
              id="designation"
              type="text"
              placeholder="Sustainability Manager"
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name" className="text-sm font-medium">Company Name</Label>
            <Input
              id="company_name"
              type="text"
              placeholder="Company Ltd."
              value={formData.company_name}
              onChange={(e) => handleInputChange('company_name', e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              maxLength={20}
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
              I agree to receive communications about sustainability insights, reports, and updates from BombayBreed. I understand I can unsubscribe at any time. See our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email || !formData.consent}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 mt-6 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </>
            )}
          </Button>

          <p className="text-xs text-foreground/60 text-center mt-4">
            Your information is secure and will only be used to send you the report and related sustainability insights. Read our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;
