import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getSlotsForDate, isBookableDate, formatSlotTime } from '@/utils/booking-slots';
import { toast } from '@/hooks/use-toast';
import { formatPhoneInput, normalizePhone } from '@/lib/phoneFormat';
import { persistFormSubmissionAsync } from '@/lib/formPersistence';

const FORMSPREE_URL = 'https://formspree.io/f/myknnoea';

interface BookingDialogProps {
  trigger?: React.ReactNode;
  triggerText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  subject?: string;
}

type Step = 'calendar' | 'form' | 'confirmed';

const BookingDialog = ({ 
  trigger, 
  triggerText = "Book a Consultation",
  open,
  onOpenChange,
  subject,
}: BookingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setStep('calendar');
      setSelectedDate(undefined);
      setSelectedSlot(null);
      setForm({ name: '', email: '', phone: '', message: '' });
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const controlled = open !== undefined;
  const dialogOpen = controlled ? open : isOpen;

  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      setSelectedSlot(null);
      return;
    }
    const slots = getSlotsForDate(selectedDate);
    setAvailableSlots(slots);
    setSelectedSlot(null);
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;

    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: normalizePhone(form.phone) || null,
        message: form.message.trim() || null,
        preferred_date: format(selectedDate, 'yyyy-MM-dd'),
        preferred_time: selectedSlot,
        form_type: 'booking',
        subject: subject || null,
        _subject: `Consultation booking - ${form.name.trim()} (${format(selectedDate, 'd MMM yyyy')} ${selectedSlot})`,
        _replyto: form.email.trim().toLowerCase(),
      };
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Booking failed');
      persistFormSubmissionAsync(payload);
      setStep('confirmed');
    } catch (err: any) {
      toast({
        title: 'Booking failed',
        description: err.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" size="lg" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[520px] max-h-[90vh] p-0 overflow-hidden">
        {step === 'calendar' && (
          <>
            <DialogHeader className="p-6 pb-3">
              <DialogTitle className="text-lg font-medium">Schedule Your Consultation</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">Select a date and time - limited slots available.</p>
            </DialogHeader>
            <div className="px-6 pb-4 flex flex-col items-center gap-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => !isBookableDate(date)}
                className={cn("p-3 pointer-events-auto")}
                fromDate={new Date()}
              />

              {selectedDate && (
                <div className="w-full space-y-2">
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {format(selectedDate, 'EEEE, MMMM d')}
                  </p>
                  {availableSlots.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No slots available - try another date.</p>
                  ) : (
                    <div className="flex gap-2">
                      {availableSlots.map(slot => (
                        <Button
                          key={slot}
                          variant={selectedSlot === slot ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {formatSlotTime(slot)}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Button
                className="w-full"
                disabled={!selectedSlot}
                onClick={() => setStep('form')}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {step === 'form' && (
          <>
            <DialogHeader className="p-6 pb-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setStep('calendar')} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <DialogTitle className="text-lg font-medium">Your Details</DialogTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDate && selectedSlot && (
                  <>{format(selectedDate, 'EEEE, MMMM d')} at {formatSlotTime(selectedSlot)}</>
                )}
              </p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
              <Input placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              <Input type="email" placeholder="Email *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              <Input type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone (optional) - +91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: formatPhoneInput(e.target.value) }))} />
              <Textarea placeholder="Brief message (optional)" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} />
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Booking…' : 'Confirm Booking'}
              </Button>
            </form>
          </>
        )}

        {step === 'confirmed' && (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Booking Confirmed</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDate && selectedSlot && (
                  <>{format(selectedDate, 'EEEE, MMMM d, yyyy')} at {formatSlotTime(selectedSlot)}</>
                )}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              You'll receive a confirmation email shortly.
            </p>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
