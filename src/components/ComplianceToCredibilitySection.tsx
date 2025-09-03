import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, CheckCircle, Building, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LeadCaptureForm from '@/components/shared/LeadCaptureForm';

const ComplianceToCredibilitySection = () => {
  const navigate = useNavigate();
  const [showDownloadForm, setShowDownloadForm] = useState(false);

  const handleVisitLandingPage = () => {
    navigate('/compliance-to-credibility');
  };

  const handleDownloadSuccess = () => {
    setShowDownloadForm(false);
  };

  if (showDownloadForm) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowDownloadForm(false)}
              className="mb-4"
            >
              ← Back to Report Details
            </Button>
          </div>
          <LeadCaptureForm
            reportTitle="From Compliance to Credibility: A CXO Guide to CCTS & CBAM"
            reportDescription="How Indian businesses can turn carbon compliance into trust, market access, and leadership."
            onSuccess={handleDownloadSuccess}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-orange-50 to-amber-50 animate-fade-in">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Featured Guide
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent leading-tight">
                From Compliance to Credibility
              </h2>
              <h3 className="text-xl md:text-2xl text-foreground/80 font-medium">
                A CXO Guide to CCTS & CBAM
              </h3>
              <p className="text-lg text-foreground/70 leading-relaxed">
                India's carbon economy is here. CBAM and CCTS are reshaping trade. 
                This playbook shows how to turn compliance into competitive advantage.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">What you'll discover:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">Sector-specific case studies</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">EU market access strategies</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">CXO action checklist</span>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">Strategic storytelling frameworks</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleVisitLandingPage}
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Visit Landing Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={() => setShowDownloadForm(true)}
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Guide
              </Button>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-orange-100">
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                      <Building className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-lg font-bold">CCTS & CBAM</h5>
                      <p className="text-sm opacity-90">CXO Guide</p>
                      <p className="text-xs opacity-75">2025 Edition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceToCredibilitySection;