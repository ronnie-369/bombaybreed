import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import BookingDialog from '@/components/BookingDialog';
import './NarrativeHiringGap.css';
import narrativeChangeVideo from '@/assets/narrative-hiring-change.mp4.asset.json';
import climatePartyWorkshop from '@/assets/climate-party-workshop.jpg.asset.json';

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
          subject: 'Report download: Narrative Hiring Gap',
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Submission failed. Please try again.');
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
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
        <div className="nhg-hero-eyebrow">A 32-Listing Audit</div>
        <h1>India Has a Communications Talent Surplus <em>and a Narrative Talent Deficit</em></h1>
        <p className="nhg-hero-sub">
          We audited 32 live LinkedIn job postings across India's top organisations hiring for
          communications, content and storytelling roles. The data tells one story.
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
          labels: ['Active / Promoted', 'Freshly Posted', 'Reposted (failed hire)', 'Zombie (2+ months)'],
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
        <div className="nhg-study-eyebrow">A 32-Listing Audit</div>
        <h1>India Has a Communications Talent Surplus <em>and a Narrative Talent Deficit</em></h1>
        <p className="nhg-study-sub">
          We audited 32 live LinkedIn job postings across India's top organisations hiring for
          communications, content and storytelling roles. The data tells one story.
        </p>
        <div className="nhg-study-line" />
      </div>

      <div className="nhg-container">
        {/* 01 */}
        <section className="nhg-content-block">
          <div className="nhg-section-num">01 / The Paradox</div>
          <h2 className="nhg-section-title">Plenty of Applicants. No Hires.</h2>
          <p className="nhg-section-lead">
            Every listing attracted massive applicant volume. Yet roles stay open for weeks, months,
            or get reposted after a failed hire. The supply of communicators is high. The supply of
            narrative talent is near zero.
          </p>
          <div className="nhg-kpi-row">
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">3,200+</div><div className="nhg-kpi-label">Total applicants across 32 listings</div></div>
            <div className="nhg-kpi-card"><div className="nhg-kpi-num">19%</div><div className="nhg-kpi-label">Zombie or reposted (failed hire)</div></div>
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
          <div className="nhg-section-num">02 / Who Is Hiring</div>
          <h2 className="nhg-section-title">This Isn't a Startup Problem. It's Structural.</h2>
          <p className="nhg-section-lead">
            The gap spans unicorns, MNCs, consulting firms, government bodies and social-impact
            foundations. When Edelman India reposts an SVP communications role, the signal is
            sector-wide.
          </p>
          <div className="nhg-chart-container">
            <div className="nhg-chart-label">Exhibit 2 / Listings by organisation type</div>
            <canvas ref={refOrgType} />
          </div>
          <table className="nhg-data-table">
            <thead><tr><th>Organisation</th><th>Role</th><th>Applicants</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Social Alpha</td><td>Communications Lead</td><td>100+</td><td><span className="nhg-status-chip nhg-status-zombie">Zombie (113d)</span></td></tr>
              <tr><td>Kuku FM</td><td>Head of Content</td><td>100+</td><td><span className="nhg-status-chip nhg-status-zombie">Zombie (4mo)</span></td></tr>
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
          <div className="nhg-section-num">03 / The Pattern</div>
          <h2 className="nhg-section-title">Three Failure Modes. One Root Cause.</h2>
          <p className="nhg-section-lead">Across all 32 listings, the same structural problem repeats.</p>
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
              <div className="nhg-mode-label" style={{ color: 'var(--nhg-red)' }}>Zombie</div>
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
          <div className="nhg-section-num">04 / The Accelerant</div>
          <h2 className="nhg-section-title">GenAI Made This Worse, Not Better.</h2>
          <p className="nhg-section-lead">
            Generative AI was supposed to close the communications talent gap. Instead, it widened
            the narrative one. Here is what the data shows.
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
          <p style={{ fontSize: 14, color: 'var(--nhg-gray)', lineHeight: 1.6, marginTop: 24 }}>
            The organisations that will stand out in 2026 are not the ones with better AI. They are
            the ones with a narrative architecture that AI cannot replicate, because it was
            excavated from institutional truth, not generated from a prompt. That is the work that
            needs to happen before the hire, not after.
          </p>
        </section>

        {/* Field note - visual relief */}
        <figure className="nhg-field-note" aria-labelledby="nhg-field-note-label">
          <img
            src={climatePartyWorkshop.url}
            alt="Theresa Ronnie facilitating a workshop for The Climate Party from ProClime, standing before participants in a session room in Chennai"
            loading="lazy"
            aria-describedby="nhg-field-note-caption"
          />
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
          <div className="nhg-section-num">05 / The Diagnostic</div>
          <h2 className="nhg-section-title">Before You Hire: 7 Questions</h2>
          <p className="nhg-section-lead">If you answer "no" to three or more, the hire will underperform regardless of the candidate.</p>
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
          <div className="nhg-section-num">07 / The Solution</div>
          <h2 className="nhg-section-title">The Creative Effectiveness Sprint</h2>
          <p className="nhg-section-lead">3 weeks. 7 working days. Your team goes from executing briefs to owning narratives. Here is what each week delivers.</p>

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
          </div>

          <div className="nhg-proof-card">
            <div className="nhg-proof-org">ProClime</div>
            <div className="nhg-proof-result">Strategic advisory for ProClime's positioning as GH2's Carbon Partner in India. Narrative architecture for the intersection of carbon markets and the green hydrogen economy.</div>
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
          </div>
        </section>
      </div>

      {/* CTA */}

      <div className="nhg-cta-section">
        <h2>Don't hire without the architecture.</h2>
        <p>A 3-week Creative Effectiveness Sprint defines the narrative your new hire builds from. Not a retainer. A foundation.</p>
        <button type="button" className="nhg-cta-btn" onClick={() => setBookingOpen(true)}>
          Talk to Bombay Breed
        </button>
      </div>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        subject="Creative Effectiveness Sprint - Narrative Hiring Gap"
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
          <a href="/" className="nhg-topbar-logo">Bombay Breed</a>
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
