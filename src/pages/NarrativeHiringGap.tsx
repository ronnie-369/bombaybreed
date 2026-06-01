import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import NarrativeInquiryDialog from '@/components/NarrativeInquiryDialog';
import './NarrativeHiringGap.css';
import narrativeChangeVideo from '@/assets/narrative-hiring-change.mp4.asset.json';
import climatePartyWorkshop from '@/assets/climate-party-workshop.jpg.asset.json';
import testimonial1 from '@/assets/testimonial-1.mp4.asset.json';
import testimonial2 from '@/assets/testimonial-2.mp4.asset.json';

// Same Formspree endpoint used elsewhere in the project — delivers to
// theresa.ronnie@bombaybreed.com. Lead-capture and booking both route here.
const FORMSPREE_URL = 'https://formspree.io/f/myknnoea';
const STORAGE_KEY = 'nhg_unlocked_v1';
const CHART_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';

// ----------- Chart loader (one-shot, idempotent) ------------
let chartLoaderPromise: Promise<any> | null = null;
const loadChartJs = (): Promise<any> => {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));
  const w = window as any;
  if (w.Chart) return Promise.resolve(w.Chart);
  if (chartLoaderPromise) return chartLoaderPromise;
  chartLoaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHART_CDN}"]`);
    const handle = (el: HTMLScriptElement) => {
      el.addEventListener('load', () => resolve((window as any).Chart));
      el.addEventListener('error', () => reject(new Error('Chart.js failed to load')));
    };
    if (existing) { handle(existing); return; }
    const s = document.createElement('script');
    s.src = CHART_CDN; s.async = true; handle(s);
    document.head.appendChild(s);
  });
  return chartLoaderPromise;
};

// ----------- Landing / gate ------------
const Gate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          company: form.company.trim(),
          role: form.role.trim(),
          form_type: 'report_download',
          report: 'India\'s Narrative Hiring Gap',
          _subject: `Report download - Narrative Hiring Gap (${form.name.trim()})`,
          _replyto: form.email.trim().toLowerCase(),
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Submission failed. Please try again.');
      try {
        localStorage.setItem(STORAGE_KEY, '1');
        localStorage.setItem('nhg_lead_v1', JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          company: form.company.trim(),
          role: form.role.trim(),
          unlocked_at: new Date().toISOString(),
        }));
      } catch {}
      onUnlock();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="nhg-main">
      <div className="nhg-hero">
        <div className="nhg-hero-eyebrow">Special Report</div>
        <h1>Business storytelling is a skill the market does not have. <em>We can prove it.</em></h1>
        <p className="nhg-hero-sub">
          Narrative architecture for business is a nuanced, experience-based discipline. We audited
          32 live LinkedIn job postings across India to prove the market cannot supply it.
        </p>
        <div className="nhg-hero-stat-row">
          <div className="nhg-hero-stat">
            <div className="nhg-hero-stat-num">32</div>
            <div className="nhg-hero-stat-label">Listings audited</div>
          </div>
          <div className="nhg-hero-stat">
            <div className="nhg-hero-stat-num">96%</div>
            <div className="nhg-hero-stat-label">Had 100+ applicants</div>
          </div>
          <div className="nhg-hero-stat">
            <div className="nhg-hero-stat-num">0</div>
            <div className="nhg-hero-stat-label">Hired the right person</div>
          </div>
        </div>
        <div className="nhg-hero-line" />
      </div>

      <div className="nhg-gate">
        <h2>Read the full analysis</h2>
        <p>Data, charts and a diagnostic checklist for your next comms hire.</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" required value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} autoComplete="name" />
          <input type="email" placeholder="Work email" required value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} autoComplete="email" />
          <input type="text" placeholder="Company" required value={form.company}
            onChange={e => setForm(f => ({ ...f, company: e.target.value }))} autoComplete="organization" />
          <input type="text" placeholder="Your role" required value={form.role}
            onChange={e => setForm(f => ({ ...f, role: e.target.value }))} autoComplete="organization-title" />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Unlocking…' : 'Unlock the research'}
          </button>
        </form>
        {error && <p className="nhg-gate-error">{error}</p>}
        <p className="nhg-gate-note">No spam. We just want to know who finds this useful.</p>
      </div>
    </div>
  );
};

// ----------- Study (full report) ------------
const Study: React.FC = () => {
  const refStatus = useRef<HTMLCanvasElement | null>(null);
  const refOrgType = useRef<HTMLCanvasElement | null>(null);
  const refAge = useRef<HTMLCanvasElement | null>(null);
  const refAIDamage = useRef<HTMLCanvasElement | null>(null);
  const refSector = useRef<HTMLCanvasElement | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    let charts: any[] = [];
    let cancelled = false;
    loadChartJs().then((Chart: any) => {
      if (cancelled) return;
      Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
      Chart.defaults.font.size = 12;
      Chart.defaults.color = 'rgba(10,10,10,0.4)';
      const grid = { color: 'rgba(10,10,10,0.05)' };

      if (refStatus.current) charts.push(new Chart(refStatus.current, {
        type: 'bar',
        data: {
          labels: ['Active / Promoted', 'Freshly Posted', 'Reposted (failed hire)', 'Unfulfilled (2+ months)'],
          datasets: [{ data: [18, 5, 5, 4], backgroundColor: ['#1A3D5C', 'rgba(26,61,92,0.5)', '#C5A059', '#9B2C2C'], borderRadius: 1, barThickness: 24 }],
        },
        options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => c.raw + ' listings' } } }, scales: { x: { grid, ticks: { stepSize: 5 } }, y: { grid: { display: false } } } },
      }));

      if (refOrgType.current) charts.push(new Chart(refOrgType.current, {
        type: 'doughnut',
        data: {
          labels: ['Unicorn / Scale-up', 'Startup / Early-stage', 'Foundation / NGO', 'MNC / Consulting', 'Government'],
          datasets: [{ data: [8, 6, 7, 5, 1], backgroundColor: ['#1A3D5C', '#C5A059', '#6B7280', 'rgba(26,61,92,0.4)', 'rgba(197,160,89,0.4)'], borderWidth: 2, borderColor: '#FDFCFB' }],
        },
        options: { responsive: true, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true, pointStyle: 'rect', font: { size: 11 } } }, tooltip: { callbacks: { label: (c: any) => c.label + ': ' + c.raw + ' listings' } } } },
      }));

      if (refAge.current) charts.push(new Chart(refAge.current, {
        type: 'bar',
        data: {
          labels: ['< 1 week', '1-2 weeks', '2-4 weeks', '1-2 months', '2-4 months', '4+ months'],
          datasets: [{ data: [10, 9, 4, 3, 4, 2], backgroundColor: (ctx: any) => ['#276749','#276749','#C5A059','#C5A059','#9B2C2C','#9B2C2C'][ctx.dataIndex], borderRadius: 1, barThickness: 32 }],
        },
        options: { responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => c.raw + ' listings' } } }, scales: { x: { grid: { display: false } }, y: { grid, ticks: { stepSize: 2 }, beginAtZero: true } } },
      }));

      if (refAIDamage.current) charts.push(new Chart(refAIDamage.current, {
        type: 'bar',
        data: {
          labels: ['Organic search / SEO', 'Website traffic', 'Email marketing', 'Social engagement', 'Brand differentiation'],
          datasets: [{ data: [31.4, 21.7, 21.4, 14.2, 11.3], backgroundColor: '#9B2C2C', borderRadius: 1, barThickness: 20 }],
        },
        options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => c.raw + '% of marketers' } } }, scales: { x: { grid, ticks: { callback: (v: any) => v + '%' }, max: 40 }, y: { grid: { display: false } } } },
      }));

      if (refSector.current) charts.push(new Chart(refSector.current, {
        type: 'bar',
        data: {
          labels: ['Media & Entertainment', 'Social Impact', 'Technology', 'Consulting', 'Agency', 'Government'],
          datasets: [{ data: [9, 7, 5, 4, 3, 1], backgroundColor: '#1A3D5C', borderRadius: 1, barThickness: 20 }],
        },
        options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => c.raw + ' listings' } } }, scales: { x: { grid, ticks: { stepSize: 2 }, beginAtZero: true }, y: { grid: { display: false } } } },
      }));

    }).catch(() => {/* Chart.js failed; charts simply won't render */});

    return () => {
      cancelled = true;
      charts.forEach(c => { try { c.destroy(); } catch {} });
    };
  }, []);

  return (
    <>
      <div className="nhg-study-header">
        <div className="nhg-study-eyebrow">Special Report</div>
        <h1>Business storytelling is a skill the market does not have. <em>We can prove it.</em></h1>
        <p className="nhg-study-sub">
          Narrative architecture for business is a nuanced, experience-based discipline. India's
          talent market has communicators. It does not have narrative architects. We audited 32
          live LinkedIn job postings to prove it.
        </p>
        <div className="nhg-study-line" />
      </div>

      <div className="nhg-container">
        {/* 00 - The Thesis */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">The Thesis</div>
          <h2 className="nhg-section-title">Storytelling for business is not a communications skill. It is a strategic discipline. And almost nobody in India's talent market can do it.</h2>
          <p className="nhg-section-lead" style={{ maxWidth: 640 }}>
            Every company in this study knows it needs narrative depth. Their job descriptions say
            so. Their applicant pools are enormous. And yet the roles stay open for months, or get
            filled and fail. The reason is structural: business narrative architecture requires the
            ability to excavate an organisation's underlying truth and build a story system from
            it. That is not copywriting. It is not content marketing. It is not "brand
            communications." It is a distinct, experience-based discipline that sits at the
            intersection of strategy, storytelling and business acumen. The market has plenty of
            people who can write. It has almost nobody who can think this way.
          </p>
          <div className="nhg-callout">
            <strong>What this study proves:</strong> across 32 live job postings, 21 organisations,
            and 6 sectors, India's hiring market is signalling a single, structural gap. The talent
            pool can execute communications. It cannot architect narratives. And generative AI is
            making this worse, not better, by flooding the market with content that sounds right
            but means nothing.
          </div>
          <p style={{ fontSize: 14, color: 'var(--nhg-gray)', lineHeight: 1.6, marginTop: 24 }}>
            <strong style={{ color: 'var(--nhg-text)' }}>The payoff for reading this:</strong> a
            data-backed diagnostic of why your communications hire is stuck, a 7-point checklist to
            audit your own brief, and a proven 3-week programme that trains your existing team to
            do the work the market cannot supply.
          </p>
        </section>

        {/* 01 */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">01 / The Evidence</div>
          <h2 className="nhg-section-title">3,200 Applicants. Zero Narrative Architects.</h2>
          <p className="nhg-section-lead">
            Every listing attracted massive volume. Yet roles stay open for weeks, months, or get
            reposted after a failed hire. The data confirms the thesis: the supply of communicators
            is high. The supply of narrative talent is near zero.
          </p>
          <div className="nhg-kpi-row">
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">3,200+</div><div className="nhg-kpi-label">Total applicants across 32 listings</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">19%</div><div className="nhg-kpi-label">Unfulfilled or reposted (failed hire)</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">21</div><div className="nhg-kpi-label">Unique organisations</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">6</div><div className="nhg-kpi-label">Sectors represented</div></div>
          </div>
          <div className="nhg-chart-container">
            <div className="nhg-chart-label">Exhibit 1 / Listing status distribution</div>
            <canvas ref={refStatus} />
          </div>
        </section>

        {/* 02 */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">02 / The Breadth</div>
          <h2 className="nhg-section-title">Every Type of Organisation. The Same Gap.</h2>
          <p className="nhg-section-lead">
            This is not a startup problem or an NGO problem. Unicorns, MNCs, consulting firms,
            government bodies and foundations are all failing to fill the same type of role. The
            skill does not exist at scale in the market.
          </p>
          <div className="nhg-chart-container">
            <div className="nhg-chart-label">Exhibit 2 / Listings by organisation type</div>
            <canvas ref={refOrgType} />
          </div>
          <table className="nhg-data-table">
            <thead><tr><th>Organisation</th><th>Role</th><th>Applicants</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Social Alpha</td><td>Communications Lead</td><td>100+</td><td><span className="nhg-status-chip nhg-status-unfulfilled">Unfulfilled (113d)</span></td></tr>
              <tr><td>Kuku FM</td><td>Head of Content</td><td>100+</td><td><span className="nhg-status-chip nhg-status-unfulfilled">Unfulfilled (4mo)</span></td></tr>
              <tr><td>Edelman India</td><td>SVP Communications</td><td>100+</td><td><span className="nhg-status-chip nhg-status-reposted">Reposted</span></td></tr>
              <tr><td>Crossing Hurdles</td><td>Journalist + Lang. Specialist</td><td>100+</td><td><span className="nhg-status-chip nhg-status-reposted">Reposted</span></td></tr>
              <tr><td>Deloitte India</td><td>Growth & Purpose Comms</td><td>100+</td><td><span className="nhg-status-chip nhg-status-reposted">Reposted</span></td></tr>
              <tr><td>smarthyre</td><td>Brand & Content Manager</td><td>100+</td><td><span className="nhg-status-chip nhg-status-reposted">Reposted</span></td></tr>
              <tr><td>JioStar</td><td>Narrative Storytelling Lead</td><td>100+</td><td><span className="nhg-status-chip nhg-status-active">Active (2wk)</span></td></tr>
              <tr><td>Swiggy</td><td>Head of Content, India Next</td><td>100+</td><td><span className="nhg-status-chip nhg-status-active">Active (1wk)</span></td></tr>
              <tr><td>Lenovo India</td><td>Head of Communications</td><td>100+</td><td><span className="nhg-status-chip nhg-status-active">Active (2d)</span></td></tr>
              <tr><td>Pocket FM</td><td>Editor (Fiction)</td><td>100+</td><td><span className="nhg-status-chip nhg-status-active">Active (6d)</span></td></tr>
            </tbody>
          </table>
          <p className="nhg-table-note">Showing 10 of 32 listings. Selection weighted toward signal-rich postings.</p>
        </section>

        {/* 03 */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">03 / Why Hiring Fails</div>
          <h2 className="nhg-section-title">The Market Cannot Supply What You Actually Need.</h2>
          <p className="nhg-section-lead">
            Three failure modes, one root cause: organisations are hiring for communications but
            expecting narrative architecture. That skill does not come from a degree, a portfolio
            of campaigns, or fluency in AI tools. It comes from experience in excavating structural
            business truths.
          </p>
          <div className="nhg-chart-container">
            <div className="nhg-chart-label">Exhibit 3 / Listing age at time of audit</div>
            <canvas ref={refAge} />
          </div>
          <div className="nhg-callout">
            <strong>The root cause:</strong> organisations are writing job descriptions for
            communicators but expecting narrative architects. The talent pool can write. It cannot
            excavate.
          </div>
          <div className="nhg-mode-row">
            <div className="nhg-mode-card">
              <div className="nhg-mode-label" style={{ color: 'var(--nhg-red)' }}>Unfulfilled</div>
              <div className="nhg-mode-desc">Open 2+ months. The brief attracted the wrong pool. Hiring manager keeps searching.</div>
            </div>
            <div className="nhg-mode-card">
              <div className="nhg-mode-label" style={{ color: 'var(--nhg-amber)' }}>Repost</div>
              <div className="nhg-mode-desc">Someone was hired. They didn't work out. The hire could execute but not excavate.</div>
            </div>
            <div className="nhg-mode-card">
              <div className="nhg-mode-label" style={{ color: 'var(--nhg-green)' }}>Volume Trap</div>
              <div className="nhg-mode-desc">100+ applicants in days. High supply of communicators, not high supply of the right talent.</div>
            </div>
          </div>
        </section>

        {/* 04 */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">04 / The AI Complication</div>
          <h2 className="nhg-section-title">AI Gave Every Team a Voice. It Did Not Give Them a Story.</h2>
          <p className="nhg-section-lead">
            Generative AI was supposed to close the communications gap. Instead, it made narrative
            architecture the only skill that matters. Every team can now produce content at speed.
            Almost no team can ensure that content says something structurally true about the
            business. That is the new competitive divide.
          </p>
          <div className="nhg-kpi-row">
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">74%</div><div className="nhg-kpi-label">Of new web pages contain detectable AI-generated content</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">85%</div><div className="nhg-kpi-label">Of marketers now use AI content tools</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">25%</div><div className="nhg-kpi-label">Predicted drop in search volume by 2026 (Gartner)</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">29%</div><div className="nhg-kpi-label">Of marketers say AI content flooding is their top concern</div></div>
          </div>
          <div className="nhg-callout">
            <strong>The paradox:</strong> every organisation now has the tools to produce more
            content, faster, at lower cost. The result is not better storytelling. It is more noise,
            more sameness, and a market where the structural narrative beneath the content matters
            more than it ever has.
          </div>
          <div className="nhg-mode-row">
            <div className="nhg-mode-card">
              <div className="nhg-mode-label" style={{ color: 'var(--nhg-red)' }}>Homogenisation</div>
              <div className="nhg-mode-desc">Same tools, same training data, same output. 85% of marketers use AI content tools. Brand voice converges toward a generic mean. Companies with documented voice guidelines see 23% higher engagement precisely because everyone else now sounds identical.</div>
            </div>
            <div className="nhg-mode-card">
              <div className="nhg-mode-label" style={{ color: 'var(--nhg-amber)' }}>Brand drift</div>
              <div className="nhg-mode-desc">AI-generated content sounds plausible and on-brand but subtly distorts positioning over time. Researchers call it "AI brand drift": loss of coherence, loss of relevance, loss of truthfulness. Without a defined narrative architecture, AI amplifies inconsistencies at scale.</div>
            </div>
            <div className="nhg-mode-card">
              <div className="nhg-mode-label" style={{ color: 'var(--nhg-navy)' }}>False confidence</div>
              <div className="nhg-mode-desc">Hiring managers now see "AI-fluent" on CVs and mistake prompt engineering for narrative depth. The talent pool has expanded in volume but not in the dimension that matters: the ability to excavate a structural truth that no AI can generate from training data.</div>
            </div>
          </div>
          <div className="nhg-chart-container">
            <div className="nhg-chart-label">Exhibit 4 / Where marketers report the greatest performance decline</div>
            <canvas ref={refAIDamage} />
          </div>
          <div className="nhg-callout" style={{ marginTop: 24 }}>
            <strong>The implication is urgent:</strong> you cannot hire your way out of this gap,
            and AI will not fill it for you. The only viable path is to train your existing teams
            to think in narrative architecture. To give them the frameworks, the strategic muscles,
            and the practice of excavating business truth, so that every piece of content your
            organisation produces is structurally sound, not just competently written. This is the
            new baseline for business communications in the age of AI.
          </div>
        </section>

        {/* Field note - visual relief */}
        <figure className="nhg-field-note" aria-labelledby="nhg-field-note-label">
          <div className="nhg-field-note-media">
            <img
              src={climatePartyWorkshop.url}
              alt="Theresa Ronnie facilitating a workshop for The Climate Party from ProClime, standing before participants in a session room in Chennai"
              loading="lazy"
              aria-describedby="nhg-field-note-caption"
            />
          </div>
          <figcaption>
            <span id="nhg-field-note-label" className="nhg-field-note-label">Field Note</span>
            <p id="nhg-field-note-caption">
              The difference between being authentic and being real in climate action - leading
              the workshop session for The Climate Party from ProClime. The room kept returning
              to one question: when does a climate story stop being a brand exercise and start
              being institutional truth? That distinction is the same one a comms hire is asked
              to navigate on Day 1.
            </p>
          </figcaption>
        </figure>

        {/* 05 */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">05 / Your Readiness</div>
          <h2 className="nhg-section-title">Is Your Organisation Ready for Narrative-Led Communications?</h2>
          <p className="nhg-section-lead">Seven questions. If you answer "no" to three or more, no hire will fix this. Your team needs the architecture first.</p>
          <ol className="nhg-checklist">
            <li>Do you have a narrative architecture, or just a brand platform?<span className="nhg-check-sub">A brand platform says what you stand for. A narrative architecture defines the structural truth your organisation owns that no competitor can credibly claim.</span></li>
            <li>Can you articulate that truth in one sentence?<span className="nhg-check-sub">If the CEO, CMO and Head of Comms would each say something different, your new hire has no foundation to build from.</span></li>
            <li>Does your JD describe narrative depth or execution tasks?<span className="nhg-check-sub">"Manage social media calendars" attracts managers. "Excavate and articulate our institutional story" attracts architects. Most JDs do the former and hope for the latter.</span></li>
            <li>Is the role reporting to someone who can evaluate narrative quality?<span className="nhg-check-sub">If the hiring manager's strength is operations or marketing execution, they will optimise for output volume, not story depth.</span></li>
            <li>Have you separated "communications" from "storytelling" in your org chart?<span className="nhg-check-sub">JioStar did this. Most organisations conflate the two. They are different disciplines with different talent profiles.</span></li>
            <li>Does the brief include a benchmark for what "great" looks like?<span className="nhg-check-sub">Without a reference point, interview panels default to credentials and confidence. Neither predicts narrative ability.</span></li>
            <li>Will the new hire build from a defined foundation or start from scratch?<span className="nhg-check-sub">Starting from scratch adds 6 to 9 months of alignment time. A pre-defined narrative architecture makes Day 1 productive.</span></li>
          </ol>
        </section>

        {/* 06 */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">06 / The Sector Map</div>
          <h2 className="nhg-section-title">Where the Gap Hits Hardest</h2>
          <p className="nhg-section-lead">
            Media and entertainment leads. But MNCs and consulting firms face the same problem with
            higher stakes and slower feedback loops.
          </p>
          <div className="nhg-chart-container">
            <div className="nhg-chart-label">Exhibit 5 / Listings by sector</div>
            <canvas ref={refSector} />
          </div>
        </section>

        {/* Methodology */}
        <section className="nhg-content-block" style={{ borderBottom: 'none' }}>
          <div className="nhg-methodology">
            <strong>Methodology.</strong> Bombay Breed audited 32 live LinkedIn job postings in
            India between February and June 2026 across communications, content, storytelling and
            editorial roles. Listings were identified through LinkedIn search and filtered for
            relevance to narrative and strategic communications. Company type, applicant count,
            listing age, status and hiring manager were recorded. Analysis reflects publicly
            available data as of 1 June 2026.
          </div>
        </section>
      </div>

      {/* 07 - The Sprint */}
      <div className="nhg-container">
        <section className="nhg-content-block">
          <div className="nhg-section-num">07 / Train Your Team</div>
          <h2 className="nhg-section-title">You Cannot Hire This Skill. You Can Build It.</h2>
          <p className="nhg-section-lead">The Creative Effectiveness Sprint is a 3-week, 7-day programme that trains your existing team to think in narrative architecture. Not a workshop about storytelling. A forcing function that moves your team from producing content to owning the business narrative.</p>

          <div className="nhg-sprint-week">
            <div className="nhg-sprint-week-num">01</div>
            <div className="nhg-sprint-week-body">
              <div className="nhg-sprint-week-title">Discovery and Creative Audit</div>
              <div className="nhg-sprint-week-desc">We map your current narrative capability across 8 pillars: creative thinking, problem solving, pushing beyond first ideas, craft cohesion, business impact, strategic thinking, knowing the why, and stakeholder alignment. Each pillar is scored before and after with proof examples. This is not a survey. It is an audit of live work.</div>
              <div className="nhg-sprint-week-output">Output: Capability baseline + opportunity map</div>
            </div>
          </div>

          <div className="nhg-sprint-week">
            <div className="nhg-sprint-week-num">02</div>
            <div className="nhg-sprint-week-body">
              <div className="nhg-sprint-week-title">2-Day Creative Power Workshop</div>
              <div className="nhg-sprint-week-desc">Your team cracks live briefs, pushes past obvious ideas, runs a Craft Dojo on copy and design cohesion, pitches with business impact front and centre, and navigates a stakeholder simulation under real-world pressure. This is not a lecture. It is a forcing function.</div>
              <div className="nhg-sprint-week-output">Output: 2 campaigns uplifted in real time + 3 briefs sharpened in real time</div>
            </div>
          </div>

          <div className="nhg-sprint-week">
            <div className="nhg-sprint-week-num">03</div>
            <div className="nhg-sprint-week-body">
              <div className="nhg-sprint-week-title">Campaign Action Cycle</div>
              <div className="nhg-sprint-week-desc">Live feedback on active campaigns. Presentation polish for stakeholder communications. Success metrics tracked across all 8 pillars. Leadership showcase at the end of the cycle: your team presents the transformation proof to senior stakeholders.</div>
              <div className="nhg-sprint-week-output">Output: Measurable improvement inside your own systems + leadership showcase</div>
            </div>
          </div>

          <div className="nhg-callout" style={{ marginTop: 36 }}>
            <strong>What changes:</strong> your team stops producing assets and starts producing outcomes. They stop waiting for external agencies to define the narrative and start owning it. The Sprint gives them the frameworks and the confidence. The result is less external dependence, faster alignment, and campaigns that move the business.
          </div>

          <figure className="nhg-video-container">
            <video
              src={narrativeChangeVideo.url}
              controls
              playsInline
              preload="metadata"
            />
          </figure>

          <div className="nhg-kpi-row" style={{ marginTop: 32 }}>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">8</div><div className="nhg-kpi-label">Creative capability pillars scored before and after</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">7</div><div className="nhg-kpi-label">Working days of engagement</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">2</div><div className="nhg-kpi-label">Live campaigns uplifted in real time</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">3</div><div className="nhg-kpi-label">Briefs sharpened in real time</div></div>
          </div>
        </section>

        {/* 08 - The Proof */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">08 / The Proof</div>
          <h2 className="nhg-section-title">Organisations That Have Done This</h2>
          <p className="nhg-section-lead">The Sprint has been delivered across corporates, agencies and climate organisations. The pattern holds: teams already have the talent. They need the architecture.</p>

          <div className="nhg-proof-card">
            <div className="nhg-proof-org">WeWork India</div>
            <div className="nhg-proof-result">Creative Effectiveness Sprint delivered to WeWork India's in-house creative team. Moved the team from execution-focused campaign delivery to strategy-led, business-aligned output. 8 capability pillars scored before and after with proof examples.</div>
            <div className="nhg-proof-quote">
              "Your team already has the talent. They need capability frameworks and strategic thinking muscles to move from execution to ownership."
              <span className="nhg-proof-attribution">- Sprint programme brief, WeWork India engagement</span>
            </div>
          </div>

          <div className="nhg-proof-card">
            <div className="nhg-proof-org">GH2 India (Green Hydrogen Organisation)</div>
            <div className="nhg-proof-result">Strategic carbon communications advisory for GH2 India's operations. Defined the narrative architecture for India's green hydrogen economy positioning at CETFiS.</div>
            <div className="nhg-proof-quote">
              "Theresa is a calm, experienced hand that steers the working team gently in the right direction. She is all about results"
              <span className="nhg-proof-attribution">- Sanmit Ahuja</span>
            </div>
          </div>

          <div className="nhg-proof-card">
            <div className="nhg-proof-org">ProClime</div>
            <div className="nhg-proof-result">Runs the brand and marketing department for ProClime, a full stack Climate company headquartered in Singapore. Managing 7 stakeholders, over 39 different project communications, industry and policy narrative, community outreach and internal employee communications streamlining.</div>
            <div className="nhg-proof-quote">
              "The most trustworthy person on the Subcontinent"
              <span className="nhg-proof-attribution">- Erik Solheim</span>
            </div>
          </div>

          <div className="nhg-proof-card">
            <div className="nhg-proof-org">FCB Ulka</div>
            <div className="nhg-proof-result">Under Theresa Ronnie's leadership as Head of Office, Bengaluru, the team won ITC Foods' business and delivered work recognised at the IMA Awards 2019. Brands shaped: Ford, Volkswagen, Citibank, Heineken, Kingfisher.</div>
            <div className="nhg-proof-quote">
              "Absolutely delighted to have Theresa on board. She has the right attitude and aptitude for her role. I am sure our clients and our people will benefit a lot from her experience."
              <span className="nhg-proof-attribution">- Nitin Karkare, CEO, FCB Ulka</span>
            </div>
          </div>

          <div className="nhg-proof-card">
            <div className="nhg-proof-org">Publicis Worldwide</div>
            <div className="nhg-proof-result">Theresa Ronnie led Publicis Bengaluru operations, delivering Effies-winning work across FMCG, automotive and premium lifestyle brands including PETRONAS, Heineken, Amstel and MontBlanc.</div>
            <div className="nhg-proof-quote">
              "A razor sharp mind, an insatiable appetite for learning, deep knowledge of diverse fields including business, strategy, marketing, communication, technology and consumers - an asset to whichever team she belongs."
              <span className="nhg-proof-attribution">- CMO, United Breweries</span>
            </div>
          </div>

          {/* Video testimonials - balanced two-up, stacks on mobile */}
          <div className="nhg-video-testimonials" aria-label="Video testimonials from WeWork India team">
            <figure className="nhg-vt-card">
              <div className="nhg-vt-media">
                <video
                  src={testimonial1.url}
                  controls
                  playsInline
                  preload="metadata"
                  controlsList="nodownload"
                />
              </div>
              <figcaption className="nhg-vt-caption">
                <span className="nhg-vt-label">In his words / 01</span>
                <span className="nhg-vt-attribution">Social Media Lead, WeWork India</span>

              </figcaption>
            </figure>
            <figure className="nhg-vt-card">
              <div className="nhg-vt-media">
                <video
                  src={testimonial2.url}
                  controls
                  playsInline
                  preload="metadata"
                  controlsList="nodownload"
                />
              </div>
              <figcaption className="nhg-vt-caption">
                <span className="nhg-vt-label">In her words / 02</span>
                <span className="nhg-vt-attribution">Art Director Lead, WeWork India</span>

              </figcaption>
            </figure>
          </div>
        </section>
      </div>

      {/* CTA */}

      <div className="nhg-cta-section">
        <h2>The market cannot supply this skill. But your team can learn it.</h2>
        <p>21 days. 7 working sessions. Your team stops executing other people's briefs and starts authoring the narrative your board, your category and your customers respond to. In the age of AI, the only durable advantage left is the story only you can tell - and the people inside your building who know how to tell it.</p>
        <button type="button" className="nhg-cta-btn" onClick={() => setBookingOpen(true)}>
          Write to Theresa - book a 30-min working session
        </button>
        <p className="nhg-cta-subnote">Private. No pitch deck. You bring the brief, I bring the diagnosis.</p>
      </div>

      <NarrativeInquiryDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        source="Narrative Hiring Gap"
      />
    </>
  );
};

// ----------- Page shell ------------
const NarrativeHiringGap: React.FC = () => {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try { return typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1'; }
    catch { return false; }
  });

  useEffect(() => {
    if (unlocked && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [unlocked]);

  return (
    <>
      <Helmet>
        <title>India's Narrative Hiring Gap | Bombay Breed</title>
        <meta
          name="description"
          content="32 live LinkedIn job postings. 96% had 100+ applicants. 0 hired the right person. Bombay Breed's audit of India's communications talent market."
        />
        <meta name="author" content="Theresa Ronnie, Bombay Breed" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
        />
      </Helmet>

      <div className="nhg-root">
        <div className="nhg-topbar">
          <a href="/" className="nhg-topbar-logo" aria-label="Bombay Breed home">
            <img
              src="/lovable-uploads/d154fe5b-5dc7-48e1-ae7b-30fb4291f03c.png"
              alt="Bombay Breed"
              className="nhg-topbar-logo-mark"
              decoding="async"
            />
            <span className="nhg-topbar-logo-wordmark">BOMBAY BREED</span>
          </a>
          <span className="nhg-topbar-tag">Research / June 2026</span>

        </div>

        {unlocked ? <Study /> : <Gate onUnlock={() => setUnlocked(true)} />}

        <div className="nhg-footer">
          &copy; 2026 Bombay Breed &middot; <a href="https://bombaybreed.com">bombaybreed.com</a>
        </div>
      </div>
    </>
  );
};

export default NarrativeHiringGap;
