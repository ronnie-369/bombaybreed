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
    if (!formData.name || !formData.email || !formData.consent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields and give consent for marketing communications.",
      });
      return;
    }

    // Validate email format
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
      console.log('Submitting lead data and generating download URL...');

      // Call the Edge Function to submit lead and generate signed URL
      const { data: functionResult, error: functionError } = await supabase.functions.invoke('submit-lead-and-generate-download', {
        body: {
          name: formData.name,
          email: formData.email,
          designation: formData.designation,
          company_name: formData.company_name,
          phone: formData.phone,
          marketing_consent: formData.consent,
          reportTitle: reportTitle,
          form_type: 'download_report_form'
        }
      });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error('Failed to process request');
      }

      if (!functionResult?.downloadUrl) {
        console.error('No download URL received:', functionResult);
        throw new Error('Failed to generate download link');
      }

      console.log('Lead submitted and download URL generated successfully');
      setDownloadUrl(functionResult.downloadUrl);
      setIsSubmitted(true);
      
      toast({
        title: "Success!",
        description: "Thank you for your request. Your report is ready for download.",
      });

      if (onSuccess) {
        onSuccess();
      }
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

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Thank you for your request. Your report is ready for download.
          </h3>
          <p className="text-green-700 mb-4">
            Your download is ready! Access "{reportTitle}" using the button below.
          </p>
          <div className="space-y-3">
            <a 
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </a>
            <p className="text-xs text-green-600">
              If the download doesn't start automatically, {' '}
              <a 
                href={downloadUrl}
                download
                className="underline hover:text-green-800"
              >
                click here for direct download
              </a>
            </p>
          </div>
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