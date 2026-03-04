import React from 'react';

interface UrgencyBannerProps {
  publishedDate: string;
  complianceDeadline?: string;
}

const UrgencyBanner: React.FC<UrgencyBannerProps> = ({ publishedDate, complianceDeadline }) => {
  return (
    <div className="bg-destructive/5 border-b-2 border-destructive py-3 px-6 text-center">
      <p className="text-[13px] font-semibold text-destructive">
        REGULATORY ALERT · Published {publishedDate}
        {complianceDeadline && ` · Compliance deadline: ${complianceDeadline}`}
      </p>
    </div>
  );
};

export default UrgencyBanner;
