import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { trackConversion } from '@/utils/analytics';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ 
  open, 
  onOpenChange,
  source = 'unknown'
}) => {
  React.useEffect(() => {
    if (open) {
      trackConversion.ctaClick('Open Booking Calendar', source);
    }
  }, [open, source]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] md:h-[700px] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Schedule Your Consultation</DialogTitle>
          <DialogDescription>
            Choose a time that works best for you
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 px-6 pb-6 overflow-hidden">
          <iframe 
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0VlsC59Ru2epymKRluDWQHDZ_o-VJjPeszg3XknmVv_VkuSrl0o1saJiHzMa1hh9abYGKvJkig?gv=true"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            title="Schedule Consultation"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
