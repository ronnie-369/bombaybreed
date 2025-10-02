import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { hasUserConsented, setConsentPreference } from "@/utils/cookieConsent";
import { X } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    if (!hasUserConsented()) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsentPreference(true);
    setIsVisible(false);
  };

  const handleClose = () => {
    setConsentPreference(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-in-right">
      <div className="bg-card border-t border-border shadow-lg">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-foreground mb-2">
                We use cookies to enhance your experience and analyze site usage. 
                By continuing to browse, you agree to our use of cookies.
              </p>
              <Link 
                to="/privacy-policy" 
                className="text-sm text-primary hover:underline"
              >
                Learn more in our Privacy Policy
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleAccept}
                variant="default"
                size="default"
              >
                Accept All
              </Button>
              <Button
                onClick={handleClose}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
