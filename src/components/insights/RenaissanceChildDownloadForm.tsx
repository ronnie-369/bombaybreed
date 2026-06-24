import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatPhoneInput, normalizePhone } from '@/lib/phoneFormat';
import { persistFormSubmissionAsync } from '@/lib/formPersistence';

const FORMSPREE_URL = 'https://formspree.io/f/myknnoea';
const REPORT_TITLE = 'Raising the Renaissance Child: A reading curriculum for the 21st century Indian family';
const DOWNLOAD_PATH = '/reports/raising-the-renaissance-child.pdf';

const RenaissanceChildDownloadForm: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    childAge: '',
    location: '',
    profession: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const update = (k: keyof typeof data, v: string) => setData(d => ({ ...d, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, childAge, location, profession } = data;
    if (!name || !email || !phone || !childAge || !location || !profession) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ variant: 'destructive', title: 'Invalid email', description: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    try {
      const normalizedPhone = normalizePhone(phone);
      const studyContext = `NIAS Bangalore study | Child age: ${childAge.trim()} | Location: ${location.trim()} | Parent profession: ${profession.trim()}`;

      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: normalizedPhone || undefined,
        organisation: location.trim(),
        designation: profession.trim(),
        child_age: childAge.trim(),
        location: location.trim(),
        parent_profession: profession.trim(),
        study: 'NIAS Bangalore',
        report_requested: `${REPORT_TITLE} — ${studyContext}`,
        form_type: 'report_download',
        _subject: `Renaissance Child download — ${name.trim()} (${location.trim()})`,
        _replyto: email.trim().toLowerCase(),
      };

      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Submission failed');

      persistFormSubmissionAsync(payload);
      setSuccess(true);

      const link = document.createElement('a');
      link.href = DOWNLOAD_PATH;
      link.download = 'Raising-the-Renaissance-Child.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Something went wrong', description: err instanceof Error ? err.message : 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card border border-border rounded-xl p-10 text-center max-w-[560px] mx-auto">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-serif text-xl text-foreground mb-2">Thank you.</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Your download should have started. Your responses contribute to our study with NIAS, Bangalore.
        </p>
        <Button onClick={() => window.open(DOWNLOAD_PATH, '_blank')} className="bg-foreground text-background hover:bg-foreground/90">
          <Download className="w-4 h-4 mr-2" />
          Download the white paper
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-[640px] mx-auto">
      <h2 className="font-serif text-[28px] text-foreground mb-2">Download the white paper</h2>
      <p className="text-[14px] text-muted-foreground mb-2">
        Please share a few details. We collect this information as part of a study being undertaken
        for the <span className="font-medium text-foreground">National Institute of Advanced Studies (NIAS), Bangalore</span>.
      </p>
      <p className="text-[12px] text-muted-foreground/70 mb-8">All fields are required.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="rc-name" className="text-[13px] font-medium text-foreground">Full name</Label>
            <Input id="rc-name" type="text" placeholder="Jane Smith" value={data.name}
              onChange={(e) => update('name', e.target.value)} required className="mt-1.5 h-12 text-[15px]" />
          </div>
          <div>
            <Label htmlFor="rc-email" className="text-[13px] font-medium text-foreground">Email</Label>
            <Input id="rc-email" type="email" placeholder="jane@example.com" value={data.email}
              onChange={(e) => update('email', e.target.value)} required className="mt-1.5 h-12 text-[15px]" />
          </div>
          <div>
            <Label htmlFor="rc-phone" className="text-[13px] font-medium text-foreground">Phone</Label>
            <Input id="rc-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210"
              value={data.phone} onChange={(e) => update('phone', formatPhoneInput(e.target.value))}
              maxLength={30} required className="mt-1.5 h-12 text-[15px]" />
          </div>
          <div>
            <Label htmlFor="rc-age" className="text-[13px] font-medium text-foreground">Age of your child</Label>
            <Input id="rc-age" type="text" inputMode="numeric" placeholder="e.g. 8 years" value={data.childAge}
              onChange={(e) => update('childAge', e.target.value)} required maxLength={40}
              className="mt-1.5 h-12 text-[15px]" />
          </div>
          <div>
            <Label htmlFor="rc-location" className="text-[13px] font-medium text-foreground">Location</Label>
            <Input id="rc-location" type="text" placeholder="City, Country" value={data.location}
              onChange={(e) => update('location', e.target.value)} required maxLength={120}
              className="mt-1.5 h-12 text-[15px]" />
          </div>
          <div>
            <Label htmlFor="rc-profession" className="text-[13px] font-medium text-foreground">Parent&rsquo;s profession</Label>
            <Input id="rc-profession" type="text" placeholder="e.g. Architect" value={data.profession}
              onChange={(e) => update('profession', e.target.value)} required maxLength={120}
              className="mt-1.5 h-12 text-[15px]" />
          </div>
        </div>

        <Button type="submit" disabled={loading}
          className="w-full h-[52px] bg-foreground text-background hover:bg-foreground/90 text-[14px] font-semibold uppercase tracking-wider rounded-lg mt-2">
          {loading ? 'Submitting...' : 'Submit & download →'}
        </Button>

        <p className="text-[12px] text-muted-foreground/60 text-center">
          Your information is kept confidential and used only for this study.
        </p>
      </form>
    </div>
  );
};

export default RenaissanceChildDownloadForm;
