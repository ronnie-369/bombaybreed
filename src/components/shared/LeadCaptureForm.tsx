import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Mail, Phone, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LeadCaptureFormProps {
  reportTitle: string;
  reportDescription: string;
  onSuccess?: () => void;
}

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
    consent: true // Pre-selected as requested
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.consent) return;

    setIsLoading(true);
    
    try {
      // Sanitize input data
      const sanitizedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        designation: formData.designation.trim(),
        company_name: formData.company_name.trim(),
        phone: formData.phone.trim().replace(/\s+/g, ''), // Remove spaces
        consent: formData.consent
      };

      // Email validation
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(sanitizedData.email)) {
        toast({
          title: 'Invalid email format',
          description: 'Please enter a valid email address.',
          variant: 'destructive',
        });
        return;
      }

      // Optional phone validation (only if provided)
      if (sanitizedData.phone && sanitizedData.phone.length > 0) {
        const phoneRegex = /^\+?[\d\s-()]{7,}$/;
        if (!phoneRegex.test(formData.phone)) {
          toast({
            title: 'Invalid phone format',  
            description: 'Please enter a valid phone number.',
            variant: 'destructive',
          });
          return;
        }
      }

      const { data: submissionData, error: submissionError } = await supabase
        .from('contact_submissions')
        .insert({
          name: sanitizedData.name,
          email: sanitizedData.email,
          designation: sanitizedData.designation || null,
          company_name: sanitizedData.company_name || null,
          phone: sanitizedData.phone || null,
          marketing_consent: sanitizedData.consent,
          report_requested: reportTitle
        })
        .select()
        .single();

      if (submissionError) throw submissionError;

      // Generate download URL via Edge Function
      const { data, error } = await supabase.functions.invoke('generate-download', {
        body: { 
          leadId: submissionData.id,
          reportTitle: reportTitle 
        }
      });

      if (error) throw error;

      // Track the download in database
      await supabase
        .from('report_downloads')
        .insert({
          lead_id: submissionData.id,
          report_name: reportTitle
        });

      setDownloadUrl(data.downloadUrl);
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your report is ready for download.",
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Report Sent Successfully!
          </h3>
          <p className="text-green-700 mb-4">
            Check your email for the download link to access "{reportTitle}".
          </p>
          <Button 
            onClick={() => window.open(downloadUrl, '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader className="text-center">
        <Download className="h-12 w-12 text-bombay mx-auto mb-2" />
        <CardTitle className="text-xl">Download {reportTitle}</CardTitle>
        <CardDescription className="text-sm">
          {reportDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="focus:ring-bombay focus:border-bombay"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="focus:ring-bombay focus:border-bombay"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation" className="text-sm font-medium">
              Designation
            </Label>
            <Input
              id="designation"
              type="text"
              placeholder="Sustainability Manager"
              value={formData.designation}
              onChange={(e) => handleInputChange('designation', e.target.value)}
              className="focus:ring-bombay focus:border-bombay"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name" className="text-sm font-medium">
              Company Name
            </Label>
            <Input
              id="company_name"
              type="text"
              placeholder="Company Ltd."
              value={formData.company_name}
              onChange={(e) => handleInputChange('company_name', e.target.value)}
              className="focus:ring-bombay focus:border-bombay"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="focus:ring-bombay focus:border-bombay"
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
              I agree to receive communications about sustainability insights, reports, and updates from BombayBreed. I understand I can unsubscribe at any time.
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formData.name || !formData.email || !formData.consent}
            className="w-full bg-bombay hover:bg-bombay-light text-white py-3 mt-6"
          >
            {isLoading ? (
              'Sending Report...'
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </>
            )}
          </Button>

          <p className="text-xs text-foreground/60 text-center mt-4">
            Your information is secure and will only be used to send you the report and related sustainability insights.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;