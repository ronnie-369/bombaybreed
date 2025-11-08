import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface BookingDialogProps {
  trigger?: React.ReactNode;
  triggerText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const BookingDialog = ({ 
  trigger, 
  triggerText = "Book a Consultation",
  open,
  onOpenChange 
}: BookingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const controlled = open !== undefined;
  const dialogOpen = controlled ? open : isOpen;

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button 
            variant="gradient" 
            size="lg"
            className="gap-2"
          >
            <Calendar className="h-5 w-5" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[800px] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-heading">Schedule Your Consultation</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[500px] md:h-[600px] overflow-hidden">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0VlsC59Ru2epymKRluDWQHDZ_o-VJjPeszg3XknmVv_VkuSrl0o1saJiHzMa1hh9abYGKvJkig?gv=true"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            title="Book a Consultation"
            className="rounded-b-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
