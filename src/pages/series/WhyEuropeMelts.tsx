import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHead from '@/components/PageHead';
import { persistFormSubmissionAsync } from '@/lib/formPersistence';
import heroImg from '@/assets/trocadero-paris-heatwave.jpg';
import './europe-india.css';

const FORMSPREE_URL = 'https://formspree.io/f/myknnoea';

const ROLES = [
  'Climate investor / fund',
  'Policy advisor / think tank',
  'Journalist / editor',
  'Sustainability consultant',
  'Government / regulator',
  'Academic / researcher',
  'Other',
];

const WhyEuropeMelts: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const name = form.name.trim();
    const email = form.email.trim();
    const company = form.company.trim();
    const role = form.role;
    if (!name || !email || !company || !role) { setErr('Please fill the required fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('Please enter a valid email.'); return; }

    setLoading(true);
    const payload = {
      name, email,
      company_name: company,
      organisation: company,
      designation: role,
      role,
      message: form.notes.trim() || undefined,
      report_requested: 'Why Europe Melts (Article 01 - Europe-India series)',
      form_type: 'report_download',
      source_tag: 'article1-europe-melts',
      marketing_consent: true,
      _subject: `New brief download: ${name}, ${company}`,
      _replyto: email,
    };
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submission failed');
      persistFormSubmissionAsync(payload);
      try { sessionStorage.setItem('bb_eu_unlocked', '1'); } catch {}
      navigate('/series/europe-india/why-europe-melts/read');
    } catch (e: any) {
      setErr(e?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <PageHead
        title="Why Europe Melts at 41°C When the Gulf Works at 50°C | Bombay Breed"
        description="Europe is failing at temperatures the Gulf treats as routine. A Bombay Breed climate brief on what is breaking in Europe this fortnight and why."
        path="/series/europe-india/why-europe-melts"
        ogType="article"
        ogImage="og-europe-melts"
      />
      <div className="bb-eu">
        <div className="col">
          <div className="crumb">Climate Series / 01 of 05</div>
          <h1 className="bb-head">Why Europe melts at 41°C when the Gulf works at 50°C.</h1>
          <p className="dek">A short study on what is breaking in Europe this fortnight, why, and what hotter regions know about heat that Europe never had to learn.</p>
          <div className="meta">
            <span><b>Date</b>30 June 2026</span>
            <span><b>Published by</b>Bombay Breed Consulting</span>
            <span><b>Read</b>6 minutes</span>
          </div>

          <img src={heroImg} alt="Parisians cooling off in the Trocadero Fountain during the June 2026 European heat dome" className="hero-img" width={1536} height={1024} />
          <p className="caption">
            Parisians cooling off in the Trocadero Fountain by the Eiffel Tower, 24 June 2026. France lost over 1,000 people in the heat dome between 21 and 29 June 2026. Photo: REUTERS / Gonzalo Fuentes.
          </p>

          <div className="body">
            <p className="lead">Asia, the Gulf and Africa absorbed 45°C and 50°C this fortnight without the kind of collapse Europe is now showing at 41°C and 44°C. People keep asking me how that is possible.</p>
            <p>The premise is partly wrong. Heat kills in the hotter regions too. India lost USD 194 billion in labour productivity last year. Mecca lost over 1,300 pilgrims at the 2024 Hajj. The Sahel is warming faster than anywhere inhabited.</p>
            <p>But the sharper question is still there: why is Europe dying, and why is its physical infrastructure failing, at temperatures that the Gulf treats as routine? The World Health Organization has now put the death toll across Europe since 21 June at over 1,300. Germany set a new national record at 41.7°C this weekend. Leipzig's entire tram network was suspended on 27 June. Traffic lights in Verona and Berlin started to sag and deform. The Eiffel Tower closed early for four days running. France's SNCF cancelled 71 intercity trains in a single day.</p>
            <p>I have written a short study answering the question. Five reasons, in order of weight. None of them is the temperature itself.</p>

            <ul className="preview">
              <li>Europe's homes are insulation systems pointed the wrong way. Built for two centuries to keep January warmth in, they now trap June heat overnight. The Gulf solves the problem differently.</li>
              <li>The traffic lights are not melting in the chemistry sense. Polycarbonate has a melting point of 225°C and nothing in Europe came close. What is failing is something else, and it explains why the same product specification works fine in Dubai.</li>
              <li>Steel rails buckle in Leipzig but not in Riyadh for a procurement reason that dates to a decision made in the 1960s.</li>
              <li>The single deadliest variable in a European heatwave is not the temperature on the thermometer. It is the median age of the people standing under it. Italy lost 19,000 people last summer alone.</li>
              <li>The atmospheric trigger behind this heat dome is partly Greenland's meltwater, by a route most readers will not have heard.</li>
            </ul>

            <p style={{ marginTop: 32 }}>
              The full study includes sourced figures from World Weather Attribution, The Lancet Public Health, Nature Medicine, the International Energy Agency and the World Health Organization. It runs to about six minutes of reading. It is published below.
            </p>
          </div>

          <hr className="div" />

          <h2 className="bb-sec">Read the full brief</h2>
          <p className="sub">Tell me who you are. The brief opens immediately after you submit, and lands in your inbox so you have it later.</p>

          <form className="form-card" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="bb-name">Full name</label>
              <input id="bb-name" type="text" required value={form.name} onChange={handle('name')} placeholder="Theresa Ronnie" />
            </div>
            <div className="form-row">
              <label htmlFor="bb-email">Work email</label>
              <input id="bb-email" type="email" required value={form.email} onChange={handle('email')} placeholder="you@yourcompany.com" />
            </div>
            <div className="form-row">
              <label htmlFor="bb-company">Company or publication</label>
              <input id="bb-company" type="text" required value={form.company} onChange={handle('company')} placeholder="Bombay Breed Consulting" />
            </div>
            <div className="form-row">
              <label htmlFor="bb-role">Role</label>
              <select id="bb-role" required value={form.role} onChange={handle('role')}>
                <option value="" disabled>Select your role</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="bb-notes">What you would like to discuss with Bombay Breed</label>
              <textarea id="bb-notes" rows={3} value={form.notes} onChange={handle('notes')} placeholder="Leave blank if you just want to read." />
            </div>
            {err && <p style={{ color: '#a23', fontSize: 13, margin: '0 0 12px' }}>{err}</p>}
            <button type="submit" className="bb-submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send me the brief'}
            </button>
            <p className="privacy">I will only use these details to send you the brief and to follow up directly. No mailing list, no resale.</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default WhyEuropeMelts;
