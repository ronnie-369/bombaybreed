import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Mail, Phone, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    email: '',
    phone: '',
    consent: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.phone || !formData.consent) return;

    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "Your download link has been sent to your email.",
      });
      onSuccess?.();
    }, 1500);
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
            onClick={() => window.location.href = 'mailto:'}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Mail className="mr-2 h-4 w-4" />
            Open Email
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
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@company.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="focus:ring-bombay focus:border-bombay"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
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
            disabled={isLoading || !formData.email || !formData.phone || !formData.consent}
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