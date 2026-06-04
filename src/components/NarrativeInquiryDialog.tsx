import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getSlotsForDate, isBookableDate, formatSlotTime } from '@/utils/booking-slots';
import { toast } from '@/hooks/use-toast';
import { persistFormSubmissionAsync } from '@/lib/formPersistence';

const FORMSPREE_URL = 'https://formspree.io/f/myknnoea';
const LEAD_KEY = 'nhg_lead_v1';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

type Step = 'inquiry' | 'calendar' | 'confirmed';

interface InquiryForm {
  name: string;
  email: string;
  company: string;
  designation: string;
  issue: string;
}

const NarrativeInquiryDialog: React.FC<Props> = ({ open, onOpenChange, source = "Narrative Hiring Gap" }) => {
  const [step, setStep] = useState<Step>('inquiry');
  const [form, setForm] = useState<InquiryForm>({ name: '', email: '', company: '', designation: '', issue: '' });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [readAt, setReadAt] = useState<string | null>(null);

  // Pre-fill from Gate submission if available
  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(LEAD_KEY);
      if (raw) {
        const lead = JSON.parse(raw);
        setForm(f => ({
          name: f.name || lead.name || '',
          email: f.email || lead.email || '',
          company: f.company || lead.company || '',
          designation: f.designation || lead.role || '',
          issue: f.issue,
        }));
        if (lead.unlocked_at) setReadAt(lead.unlocked_at);
      }
    } catch {}
  }, [open]);

  useEffect(() => {
    if (!selectedDate) { setAvailableSlots([]); setSelectedSlot(null); return; }
    setAvailableSlots(getSlotsForDate(selectedDate));
    setSelectedSlot(null);
  }, [selectedDate]);

  const reset = () => {
    setStep('inquiry');
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setSubmitting(false);
  };

  const handleClose = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleInquiryContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim() || !form.designation.trim() || !form.issue.trim()) {
      toast({ title: 'Please complete all fields', variant: 'destructive' });
      return;
    }
    setStep('calendar');
  };

  const handleFinalSubmit = async () => {
    if (!selectedDate || !selectedSlot) return;
    setSubmitting(true);
    try {
      const bookedFor = `${format(selectedDate, 'EEEE, d MMM yyyy')} at ${formatSlotTime(selectedSlot)}`;
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.company.trim(),
        designation: form.designation.trim(),
        issue_at_hand: form.issue.trim(),
        source_report: source,
        report_read_at: readAt || 'unknown',
        inquiry_submitted_at: new Date().toISOString(),
        preferred_date: format(selectedDate, 'yyyy-MM-dd'),
        preferred_time: selectedSlot,
        booked_for_human: bookedFor,
        form_type: 'narrative_inquiry_booking',
        _subject: `[${source}] ${form.name.trim()}, ${form.designation.trim()} at ${form.company.trim()} - booked ${bookedFor}`,
        _replyto: form.email.trim().toLowerCase(),
      };
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submission failed');
      persistFormSubmissionAsync(payload);
      setStep('confirmed');
    } catch (err: any) {
      toast({ title: 'Could not confirm', description: err?.message || 'Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[92vw] md:max-w-[560px] max-h-[92vh] p-0 overflow-y-auto">
        {step === 'inquiry' && (
          <>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-lg font-medium">Write to Theresa</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Tell me what's on your desk. Next step picks a time on my calendar.
              </p>
            </DialogHeader>
            <form onSubmit={handleInquiryContinue} className="px-6 pb-6 space-y-3">
              <Input placeholder="Full name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              <Input type="email" placeholder="Work email *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              <Input placeholder="Company *" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} required />
              <Input placeholder="Designation *" value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} required />
              <Textarea
                placeholder="The issue at hand - what should we solve in 30 minutes? *"
                value={form.issue}
                onChange={e => setForm(f => ({ ...f, issue: e.target.value }))}
                rows={4}
                required
              />
              <Button type="submit" className="w-full">Pick a time on my calendar</Button>
            </form>
          </>
        )}

        {step === 'calendar' && (
          <>
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setStep('inquiry')} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <DialogTitle className="text-lg font-medium">Block a slot</DialogTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-1">30 minutes, working session, no pitch.</p>
            </DialogHeader>
            <div className="px-6 pb-6 flex flex-col items-center gap-4">
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
                    <div className="flex flex-wrap gap-2">
                      {availableSlots.map(slot => (
                        <Button key={slot} variant={selectedSlot === slot ? 'default' : 'outline'} size="sm" onClick={() => setSelectedSlot(slot)}>
                          {formatSlotTime(slot)}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <Button className="w-full" disabled={!selectedSlot || submitting} onClick={handleFinalSubmit}>
                {submitting ? 'Confirming…' : 'Confirm working session'}
              </Button>
            </div>
          </>
        )}

        {step === 'confirmed' && (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
            <div>
              <h3 className="text-lg font-semibold">Session blocked</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedDate && selectedSlot && (<>{format(selectedDate, 'EEEE, MMMM d, yyyy')} at {formatSlotTime(selectedSlot)}</>)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Theresa will reply from her inbox with the calendar invite and a short prep note.</p>
            <Button variant="outline" onClick={() => handleClose(false)}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NarrativeInquiryDialog;
