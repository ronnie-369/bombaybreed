import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// ── Color palette ──
const COLORS = {
  cream: '#FFF8F0',
  warmWhite: '#FEFCF8',
  forest: '#1B4332',
  sage: '#52796F',
  mint: '#95D5B2',
  coral: '#E07A5F',
  sun: '#F2CC8F',
  sky: '#81B4D8',
  lavender: '#B8A9C9',
  charcoal: '#2D3436',
  softGray: '#DFE6E9',
};

// ── Personality data ──
interface Job {
  title: string;
  growth: string;
  salary: string;
  desc: string;
  skills: string[];
  training: string;
  where: string;
}

interface Personality {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  academicFit: string;
  color: string;
  lightBg: string;
  traits: string[];
  vibe: string;
  sectors: Job[];
  bigNumber: string;
  bigNumberLabel: string;
  source: string;
}

const PERSONALITIES: Personality[] = [
  {
    id: 'builder', emoji: '🔧', name: 'The Builder',
    tagline: 'You love making things with your hands',
    academicFit: 'Engineering, vocational/trades, applied sciences',
    color: COLORS.coral, lightBg: '#FFF0EC',
    traits: ['Hands-on', 'Practical', 'Physical stamina', 'Detail-oriented'],
    vibe: "You'd rather fix a roof than write an email. You find satisfaction in seeing tangible results of your work by end of day.",
    sectors: [
      { title: 'Solar Panel Installer', growth: '+340%', salary: '$25-55K', desc: 'Install, maintain and repair solar energy systems on rooftops and ground mounts.', skills: ['Electrical basics', 'Safety certification', 'Physical fitness'], training: '6-12 month certification', where: '🌍 Everywhere - massive global demand' },
      { title: 'Heat Pump Technician', growth: '+175%', salary: '$35-65K', desc: 'Install and service heat pumps for buildings transitioning away from gas heating.', skills: ['HVAC fundamentals', 'Refrigeration', 'Customer service'], training: '1-2 year apprenticeship', where: '🏙️ Urban & suburban areas' },
      { title: 'Wind Turbine Technician', growth: '+45%', salary: '$40-70K', desc: 'Maintain and repair wind turbines. Involves climbing, heights, and travel.', skills: ['Mechanical aptitude', 'Electrical systems', 'Heights comfort'], training: '2-year technical degree', where: '🌊 Coastal & rural wind corridors' },
      { title: 'Retrofit Insulation Specialist', growth: '+280%', salary: '$30-50K', desc: 'Upgrade buildings for energy efficiency - walls, roofs, floors.', skills: ['Building science', 'Material knowledge', 'Precision work'], training: '3-6 month certification', where: '🏠 Residential & commercial buildings' },
      { title: 'EV Battery Assembler', growth: '+200%', salary: '$35-60K', desc: 'Assemble and test battery packs for electric vehicles in manufacturing plants.', skills: ['Electronics basics', 'Quality control', 'Clean room protocols'], training: 'On-the-job + 3-month module', where: '🏭 Manufacturing hubs' },
    ],
    bigNumber: '175M', bigNumberLabel: 'net new construction jobs by 2035',
    source: 'WRI/Systemiq 2025, based on ILO, WEF, C40 Cities estimates',
  },
  {
    id: 'earthkeeper', emoji: '🌱', name: 'The Earth Keeper',
    tagline: 'You feel alive outdoors and in nature',
    academicFit: 'Life sciences, agriculture, ecology, geography',
    color: '#52796F', lightBg: '#F0F7F4',
    traits: ['Nature-loving', 'Patient', 'Observant', 'Community-minded'],
    vibe: "Office walls feel like a cage. You want soil under your nails, the sky as your ceiling, and work that actually heals the planet.",
    sectors: [
      { title: 'Regenerative Agriculture Specialist', growth: '+195M jobs globally', salary: '$25-50K', desc: 'Transform farming practices to restore soil health, sequester carbon, and boost yields sustainably.', skills: ['Soil science', 'Crop rotation', 'Water management'], training: 'Agricultural diploma + field training', where: '🌾 Rural farming communities worldwide' },
      { title: 'Ecosystem Restoration Worker', growth: '25% increase by 2030', salary: '$28-45K', desc: 'Restore degraded forests, wetlands, and coastal ecosystems.', skills: ['Ecology basics', 'GIS mapping', 'Species ID'], training: 'Environmental certificate + fieldwork', where: '🌳 Forests, wetlands, coastlines' },
      { title: 'Park Ranger / Conservation Officer', growth: 'Steady + expanding', salary: '$30-55K', desc: 'Protect biodiversity hotspots, manage natural areas, educate visitors.', skills: ['Wildlife management', 'Law enforcement', 'First aid'], training: 'Forestry/ecology degree or certificate', where: '🦁 National parks & protected areas' },
      { title: 'Agroforestry Technician', growth: 'High demand in tropical regions', salary: '$20-40K', desc: 'Integrate trees with crops and livestock for resilient, productive landscapes.', skills: ['Tree science', 'Farming systems', 'Community engagement'], training: 'Agronomy training + apprenticeship', where: '🌴 Sub-Saharan Africa, Latin America, SE Asia' },
      { title: 'Marine Conservation Technician', growth: 'Growing with blue economy', salary: '$28-48K', desc: 'Monitor ocean health, restore coral reefs, manage sustainable fisheries.', skills: ['Marine biology basics', 'Diving certification', 'Data collection'], training: 'Marine science certificate + dive training', where: '🌊 Coastal regions worldwide' },
    ],
    bigNumber: '195M', bigNumberLabel: 'net new agriculture & land use jobs by 2035',
    source: 'WRI/Systemiq 2025, based on ILO 2018, 2020; WEF 2020',
  },
  {
    id: 'analyst', emoji: '📊', name: 'The Systems Thinker',
    tagline: 'You love data, strategy and solving puzzles',
    academicFit: 'STEM, economics, finance, data science, MBA',
    color: COLORS.sky, lightBg: '#F0F6FA',
    traits: ['Analytical', 'Strategic', 'Tech-savvy', 'Detail-driven'],
    vibe: "You see patterns where others see chaos. You want to use your brain to decode the climate crisis and design solutions at scale.",
    sectors: [
      { title: 'Climate Data Scientist', growth: 'Exploding demand', salary: '$55-120K', desc: 'Analyze climate datasets, model risks, and build predictive tools.', skills: ['Python/R', 'Machine learning', 'Climate science basics'], training: 'STEM degree + data science specialization', where: '💻 Remote-friendly / global consultancies' },
      { title: 'Sustainability Reporting Analyst', growth: '+46% hiring growth', salary: '$45-85K', desc: 'Help companies measure, report and improve their environmental impact.', skills: ['GHG accounting', 'ISSB/CSRD frameworks', 'Excel/data tools'], training: 'Business/environment degree + certification', where: '🏢 Corporate offices (often hybrid/remote)' },
      { title: 'Carbon Markets Analyst', growth: 'Rapid expansion', salary: '$50-100K', desc: 'Trade, verify and analyze carbon credits. Navigate CBAM, ETS, and voluntary markets.', skills: ['Financial modeling', 'Environmental law', 'Market analysis'], training: 'Economics/finance degree + green specialization', where: '🌐 Financial centers & remote' },
      { title: 'Environmental Auditor', growth: 'Mandatory for EU supply chains by 2026', salary: '$45-90K', desc: "Inspect and verify companies' environmental claims and compliance.", skills: ['ISO standards', 'Supply chain knowledge', 'Critical thinking'], training: 'Environmental management degree + auditor certification', where: '✈️ Travel-intensive - global sites' },
      { title: 'Green Finance Structurer', growth: 'Green bonds doubled since 2020', salary: '$60-130K', desc: 'Design and structure green bonds, sustainability-linked loans, and climate investment products.', skills: ['Financial structuring', 'ESG frameworks', 'Deal origination'], training: 'Finance/MBA + sustainability specialization', where: '🏦 Investment banks & development finance institutions' },
    ],
    bigNumber: '12%', bigNumberLabel: 'annual green talent demand growth (2x the rate of supply)',
    source: 'LinkedIn Economic Graph 2024/2025',
  },
  {
    id: 'connector', emoji: '🤝', name: 'The Community Catalyst',
    tagline: 'You energize people and spark change',
    academicFit: 'Social sciences, humanities, law, development studies, education',
    color: COLORS.lavender, lightBg: '#F5F0FA',
    traits: ['Empathetic', 'Charismatic', 'Adaptable', 'Purpose-driven'],
    vibe: "You believe change happens through people, not spreadsheets. You want to organize, inspire, and help communities thrive through the transition.",
    sectors: [
      { title: 'Just Transition Coordinator', growth: 'New and fast-growing', salary: '$35-70K', desc: 'Help communities dependent on fossil fuels navigate the shift to clean economies.', skills: ['Stakeholder engagement', 'Policy knowledge', 'Conflict resolution'], training: 'Social science/development degree + policy experience', where: '🏘️ Coal regions, industrial towns' },
      { title: 'Climate Adaptation Planner', growth: '280M adaptation jobs projected', salary: '$40-75K', desc: 'Design community resilience plans for floods, droughts, heat waves.', skills: ['Urban planning', 'Community engagement', 'Risk assessment'], training: 'Urban planning/geography degree', where: '🌊 Climate-vulnerable regions' },
      { title: 'Green Entrepreneur / Social Enterprise', growth: 'Limitless', salary: '$Variable', desc: 'Launch businesses in waste-to-value, clean cookstoves, e-mobility, sustainable food.', skills: ['Business planning', 'Fundraising', 'Local market knowledge'], training: 'Entrepreneurship programs + incubators', where: '🌍 Anywhere there\'s a gap to fill' },
      { title: 'Climate Education Trainer', growth: '65% of civil servants untrained', salary: '$30-55K', desc: 'Train workers, farmers, officials in climate-smart practices and green skills.', skills: ['Teaching', 'Curriculum design', 'Subject expertise'], training: 'Education + environmental specialization', where: '🏫 Training centers, farms, community halls' },
      { title: 'Sustainable Supply Chain Manager', growth: 'EU DPP mandatory by 2027', salary: '$45-85K', desc: 'Redesign supply chains for circularity, traceability and lower emissions.', skills: ['Logistics', 'Sustainability standards', 'Vendor management'], training: 'Supply chain/business degree + sustainability certification', where: '🌐 Global - manufacturing & retail companies' },
    ],
    bigNumber: '280M', bigNumberLabel: 'adaptation-related jobs possible over the next decade',
    source: 'WRI/Systemiq 2025, new modeling using EXIOBASE3',
  },
];

// ── Chart components ──

const SectorJobsChart = () => {
  const data = [
    { sector: 'Agriculture & Land Use', jobs: 195, color: '#52796F', icon: '🌾' },
    { sector: 'Construction', jobs: 175, color: '#E07A5F', icon: '🏗️' },
    { sector: 'Energy & Fuels', jobs: 20, color: '#F2CC8F', icon: '⚡' },
    { sector: 'Services', jobs: 15, color: '#81B4D8', icon: '📋' },
    { sector: 'Manufacturing', jobs: -30, color: '#B8A9C9', icon: '🏭' },
  ];
  const maxJobs = 195;
  return (
    <div className="px-2 md:px-5">
      {data.map((d, i) => (
        <div key={i} className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">{d.icon}</span>
            <span className="text-sm font-semibold text-foreground">{d.sector}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex-1 bg-muted rounded-full h-7 overflow-hidden relative">
              {d.jobs > 0 ? (
                <div
                  className="h-full rounded-full transition-all duration-[1.5s] ease-out"
                  style={{ width: `${(d.jobs / maxJobs) * 100}%`, background: d.color }}
                />
              ) : (
                <div
                  className="absolute right-0 h-full rounded-full opacity-30"
                  style={{ width: `${(Math.abs(d.jobs) / maxJobs) * 100}%`, background: d.color }}
                />
              )}
            </div>
            <span className="text-sm font-bold min-w-[70px] text-right"
              style={{ color: d.jobs < 0 ? '#C0392B' : COLORS.forest }}>
              {d.jobs > 0 ? '+' : ''}{d.jobs}M
            </span>
          </div>
        </div>
      ))}
      <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
        Source: WRI/Systemiq 2025 - midpoint estimates of net job gains/losses to 2035
      </p>
    </div>
  );
};

const ChurnDonut = () => {
  const r = 70, stroke = 20;
  const churnPct = 18;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (churnPct / 100) * circumference;
  return (
    <div className="text-center">
      <svg width={200} height={200} viewBox="0 0 200 200">
        <circle cx={100} cy={100} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
        <circle cx={100} cy={100} r={r} fill="none" stroke={COLORS.coral} strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 100 100)" className="transition-all duration-[1.5s] ease-out" />
        <text x={100} y={90} textAnchor="middle" className="fill-foreground font-serif text-[32px] font-bold">630M</text>
        <text x={100} y={115} textAnchor="middle" className="fill-muted-foreground text-[11px]">workers in</text>
        <text x={100} y={130} textAnchor="middle" className="fill-muted-foreground text-[11px]">"churn" (18%)</text>
      </svg>
    </div>
  );
};

const AdaptationROI = () => (
  <div className="flex items-end justify-center gap-10 py-5">
    <div className="text-center">
      <div className="w-[50px] h-[30px] rounded-t-lg mx-auto" style={{ background: COLORS.sage }} />
      <p className="text-xs font-semibold text-foreground mt-1.5">Mitigation</p>
      <p className="text-[10px] text-muted-foreground">1x jobs/$</p>
    </div>
    <div className="text-center">
      <div className="w-[50px] h-[180px] rounded-t-lg mx-auto relative" style={{ background: COLORS.coral }}>
        <span className="absolute top-2.5 left-1/2 -translate-x-1/2 font-serif text-lg font-bold text-white">15-30x</span>
      </div>
      <p className="text-xs font-semibold text-foreground mt-1.5">Adaptation</p>
      <p className="text-[10px] text-muted-foreground">more jobs/$</p>
    </div>
  </div>
);

const SkillTransferSankey = () => (
  <div className="px-2 md:px-5">
    {[
      { from: 'Oil & Gas', to: 'Biofuels, Hydrogen, Offshore Wind', pct: '68%', transferable: '2.7M of 4M', color: COLORS.sage },
      { from: 'Vehicle Manufacturing', to: 'Electric Vehicles', pct: '72%', transferable: '4.4M of 6.1M', color: COLORS.sky },
      { from: 'Coal Mining', to: 'Critical Minerals', pct: '6%', transferable: '0.2M of 3.1M', color: COLORS.coral },
    ].map((flow, i) => (
      <div key={i} className="flex items-center mb-3.5 gap-2">
        <div className="flex-1 bg-muted rounded-lg p-2.5 text-xs font-medium text-foreground text-right">{flow.from}</div>
        <div className="flex flex-col items-center min-w-[70px]">
          <svg width="70" height="14" viewBox="0 0 70 14" fill="none">
            <line x1="0" y1="7" x2="55" y2="7" stroke={flow.color} strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />
            <line x1="20" y1="7" x2="62" y2="7" stroke={flow.color} strokeWidth="3" strokeLinecap="round" />
            <polygon points="62,2 70,7 62,12" fill={flow.color} />
          </svg>
          <span className="text-[15px] font-bold mt-0.5" style={{ color: flow.color }}>{flow.pct}</span>
          <span className="text-[9px] text-muted-foreground">{flow.transferable}</span>
        </div>
        <div className="flex-1 rounded-lg p-2.5 text-xs font-medium text-foreground" style={{ background: `${flow.color}15` }}>{flow.to}</div>
      </div>
    ))}
    <p className="text-[10px] text-muted-foreground mt-2">
      Source: WRI/Systemiq 2025, based on IEA World Energy Outlook 2024
    </p>
  </div>
);

// ── Sub-components ──

const PersonalityCard = ({ p, isActive, onClick }: { p: Personality; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer min-w-[130px] flex-1"
    style={{
      border: isActive ? `2.5px solid ${p.color}` : '2px solid hsl(var(--border))',
      background: isActive ? p.lightBg : 'hsl(var(--card))',
      transform: isActive ? 'scale(1.04)' : 'scale(1)',
      boxShadow: isActive ? `0 8px 25px ${p.color}25` : '0 2px 8px rgba(0,0,0,0.04)',
    }}
  >
    <div className="text-[32px] mb-1.5">{p.emoji}</div>
    <div className="font-serif text-sm font-bold text-foreground">{p.name}</div>
    <div className="text-[11px] text-muted-foreground mt-1 leading-snug">{p.tagline}</div>
    <div className="text-[9px] text-muted-foreground/60 mt-1 italic leading-snug">{p.academicFit}</div>
  </button>
);

const JobCard = ({ job, color }: { job: Job; color: string }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="bg-card rounded-2xl p-5 border cursor-pointer transition-all duration-300"
      style={{ boxShadow: expanded ? `0 6px 20px ${color}18` : '0 1px 4px rgba(0,0,0,0.03)' }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-serif text-[17px] font-bold text-foreground">{job.title}</h4>
          <p className="text-sm text-muted-foreground mt-1.5">{job.desc}</p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ml-3"
          style={{ background: `${color}18`, color }}>
          {job.growth}
        </span>
      </div>
      {expanded && (
        <div className="mt-4 pt-3.5 border-t border-border">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Salary Range</p>
              <p className="text-sm font-bold text-foreground">{job.salary}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Training Path</p>
              <p className="text-sm text-foreground">{job.training}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Key Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((s, i) => (
                <span key={i} className="text-[11px] bg-muted px-2.5 py-1 rounded-xl text-foreground">{s}</span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Where</p>
            <p className="text-sm text-foreground">{job.where}</p>
          </div>
        </div>
      )}
      <div className="text-center mt-2 text-[10px] text-muted-foreground/50">
        {expanded ? 'tap to collapse' : 'tap to explore →'}
      </div>
    </div>
  );
};

const BigStat = ({ number, label, source, color = COLORS.forest }: { number: string; label: string; source?: string; color?: string }) => (
  <div className="text-center py-8 px-5 rounded-2xl my-5" style={{ background: `${color}08` }}>
    <div className="font-serif text-5xl font-bold leading-none" style={{ color }}>{number}</div>
    <div className="text-sm text-muted-foreground mt-2">{label}</div>
    {source && <div className="text-[10px] text-muted-foreground/60 mt-2">{source}</div>}
  </div>
);

const SectionWrapper = ({ children, bg = 'white', className = '' }: { children: React.ReactNode; bg?: string; className?: string }) => (
  <section className={`py-12 px-6 ${className}`} style={{ background: bg }}>
    <div className="max-w-[680px] mx-auto">{children}</div>
  </section>
);

const SectionLabel = ({ children, color = COLORS.sage }: { children: React.ReactNode; color?: string }) => (
  <p className="text-[11px] font-bold uppercase tracking-[2px] mb-2.5" style={{ color }}>{children}</p>
);

const Heading = ({ children, size = 28 }: { children: React.ReactNode; size?: number }) => (
  <h2 className="font-serif font-bold text-foreground leading-[1.25] mb-4" style={{ fontSize: size }}>{children}</h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[15px] text-muted-foreground leading-[1.75] mb-4">{children}</p>
);

// ── Main page ──

export default function GreenJobsGuide() {
  const [activePersonality, setActivePersonality] = useState<string | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const [formError, setFormError] = useState('');
  const [showGate, setShowGate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const activePerson = PERSONALITIES.find((p) => p.id === activePersonality);

  const handleLeadSubmit = async () => {
    if (!leadForm.name.trim()) { setFormError('Please enter your name'); return; }
    if (!leadForm.email.trim() || !leadForm.email.includes('@')) { setFormError('Please enter a valid email'); return; }
    if (!leadForm.phone.trim() || leadForm.phone.replace(/\D/g, '').length < 7) { setFormError('Please enter a valid phone number'); return; }
    setFormError('');
    setSubmitting(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: leadForm.name.trim(),
        email: leadForm.email.trim(),
        phone: leadForm.phone.trim(),
        form_type: 'green-jobs-quiz',
        report_requested: `green-jobs-personality-${activePersonality}`,
        marketing_consent: true,
      });
      if (error) throw error;

      // Mark quiz interaction as form_completed
      supabase.from('quiz_interactions').insert({
        personality_selected: activePersonality || '',
        form_completed: true,
      }).then(() => {});

      setLeadCaptured(true);
      setShowGate(false);
      toast({ title: 'Results unlocked!', description: 'Your personalised career matches are ready.' });
      setTimeout(() => jobsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden text-center" style={{
        background: `linear-gradient(170deg, ${COLORS.forest} 0%, #2D6A4F 60%, #40916C 100%)`,
        padding: '80px 24px 50px',
      }}>
        <div className="max-w-[600px] mx-auto relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[3px] mb-4" style={{ color: COLORS.mint }}>
            A Climate Digest Career Guide
          </p>
          <h1 className="font-serif text-4xl md:text-[42px] font-black text-white leading-[1.2] mb-5">
            Your Future is Green.<br />Here's the Map.
          </h1>
          <p className="text-[15px] leading-[1.7] mb-3 max-w-[480px] mx-auto" style={{ color: '#B7DFC9' }}>
            A guide for college graduates and early-career professionals choosing a work stream. 375 million net new jobs are coming by 2035 — find the one that fits you.
          </p>
          <p className="text-[12px] leading-[1.6] mb-8 max-w-[420px] mx-auto" style={{ color: '#B7DFC980' }}>
            This quiz covers select archetypes — the actual green economy spans hundreds of roles across every industry.
          </p>

          {/* Quiz CTA */}
          <div
            onClick={() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="inline-block bg-white/10 border border-white/20 rounded-2xl px-9 py-6 cursor-pointer transition-all hover:bg-white/15 hover:-translate-y-0.5 max-w-[400px]"
          >
            <div className="flex justify-center gap-1.5 mb-3.5">
              {['🔧', '🌱', '📊', '🤝'].map((e, i) => (
                <span key={i} className="text-[22px] bg-white/10 rounded-full w-[38px] h-[38px] flex items-center justify-center">{e}</span>
              ))}
            </div>
            <p className="font-serif text-lg font-bold text-white mb-4 leading-snug">
              Which of the 4 green career personalities are you?
            </p>
            <div className="inline-block rounded-xl px-7 py-3.5 text-[15px] font-bold text-white" style={{ background: COLORS.coral, boxShadow: '0 6px 24px rgba(224,122,95,0.45)' }}>
              Take the Free Quiz →
            </div>
            <p className="text-[11px] text-white/40 mt-3">30 seconds · Personalised career matches · Based on WRI data</p>
          </div>
        </div>
      </section>

      {/* THE BIG PICTURE */}
      <SectionWrapper bg={COLORS.warmWhite}>
        <SectionLabel>The Big Picture</SectionLabel>
        <Heading>The climate transition is the biggest job creation event of your lifetime</Heading>
        <Body>
          The World Resources Institute's landmark 2025 study reveals something extraordinary: the climate transition will create more net new jobs than any other force reshaping the economy today.
        </Body>
        <BigStat number="375M" label="net new jobs by 2035 - midpoint estimate across energy, construction, agriculture & services" source="WRI/Systemiq 2025" color={COLORS.forest} />
        <Heading size={22}>Where will these jobs be?</Heading>
        <SectorJobsChart />
        <div className="h-8" />
        <Heading size={22}>But it won't be smooth</Heading>
        <Body>
          630 million workers will be in "churn" - meaning their jobs will be created, lost, or fundamentally transformed. That's 18% of the total global workforce.
        </Body>
        <ChurnDonut />
      </SectionWrapper>

      {/* ADAPTATION SURPRISE */}
      <SectionWrapper bg="#F8F6F2">
        <SectionLabel color={COLORS.coral}>The Surprising Insight</SectionLabel>
        <Heading>Adaptation creates 15-30x more jobs per dollar than mitigation</Heading>
        <Body>
          Adaptation investments - building flood walls, restoring ecosystems, making agriculture climate-resilient - create vastly more jobs per dollar because they're labor-intensive and concentrated in developing regions.
        </Body>
        <AdaptationROI />
      </SectionWrapper>

      {/* SKILLS TRANSFER */}
      <SectionWrapper bg={COLORS.warmWhite}>
        <SectionLabel color={COLORS.sky}>Skills Transferability</SectionLabel>
        <Heading>Your existing skills are more valuable than you think</Heading>
        <Body>
          The IEA estimates that over two-thirds of workers in vehicle manufacturing and oil & gas could shift to sustainable roles with moderate retraining.
        </Body>
        <SkillTransferSankey />
      </SectionWrapper>

      {/* PERSONALITY QUIZ */}
      <SectionWrapper bg="#F8F6F2" className="!pb-5">
        <div ref={quizRef} />
        <SectionLabel color={COLORS.coral}>Find Your Path</SectionLabel>
        <Heading>Which green career personality are you?</Heading>
        <Body>
          These four archetypes are starting points, not an exhaustive list. Pick the one that resonates most with your background and interests — then explore the indicative career matches it reveals.
        </Body>
        <div className="flex gap-3 flex-wrap mt-5">
          {PERSONALITIES.map((p) => (
            <PersonalityCard
              key={p.id}
              p={p}
              isActive={activePersonality === p.id}
              onClick={() => {
                setActivePersonality(p.id);
                // Track personality click (even without form fill)
                supabase.from('quiz_interactions').insert({
                  personality_selected: p.id,
                  form_completed: false,
                }).then(() => {});
                if (leadCaptured) {
                  setTimeout(() => jobsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                } else {
                  setShowGate(true);
                  setTimeout(() => gateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                }
              }}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* LEAD CAPTURE GATE */}
      {showGate && !leadCaptured && activePerson && (
        <SectionWrapper bg="hsl(var(--card))" className="!py-8">
          <div ref={gateRef} />
          <div className="max-w-[440px] mx-auto text-center">
            <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl"
              style={{ background: `${activePerson.color}15` }}>
              {activePerson.emoji}
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              You're a {activePerson.name.replace('The ', '')}
            </h3>
            <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
              Your personalised career matches are ready.<br />Enter your details to unlock your full results.
            </p>
            <div className="flex flex-col gap-3 text-left">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground block mb-1.5">Full Name *</label>
                <Input placeholder="Priya Sharma" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground block mb-1.5">Email Address *</label>
                <Input type="email" placeholder="priya@example.com" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground block mb-1.5">Phone Number *</label>
                <Input type="tel" placeholder="+91 98765 43210" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} />
              </div>
              {formError && <p className="text-xs text-destructive text-center">{formError}</p>}
              <Button
                onClick={handleLeadSubmit}
                disabled={submitting}
                className="w-full py-6 text-[15px] font-semibold rounded-xl mt-2"
                style={{ background: activePerson.color, boxShadow: `0 4px 16px ${activePerson.color}40` }}
              >
                {submitting ? 'Unlocking…' : 'Unlock My Career Matches →'}
              </Button>
              <p className="text-[10px] text-muted-foreground/60 text-center mt-2 leading-relaxed">
                By continuing, you agree to receive career insights from The Climate Digest. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* PERSONALITY RESULTS */}
      {activePerson && leadCaptured && (
        <SectionWrapper bg={activePerson.lightBg} className="!pt-8">
          <div ref={jobsRef} />
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[40px]">{activePerson.emoji}</span>
            <div>
              <h3 className="font-serif text-2xl font-bold text-foreground">{activePerson.name}</h3>
              <p className="text-sm text-muted-foreground italic mt-0.5">"{activePerson.vibe}"</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap my-4">
            {activePerson.traits.map((t, i) => (
              <span key={i} className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ background: `${activePerson.color}15`, color: activePerson.color }}>
                {t}
              </span>
            ))}
          </div>
          <BigStat number={activePerson.bigNumber} label={activePerson.bigNumberLabel} source={activePerson.source} color={activePerson.color} />
          <h4 className="font-serif text-xl font-bold text-foreground mt-7 mb-4">Your top 5 career matches</h4>
          <p className="text-xs text-muted-foreground -mt-2 mb-4">These are indicative roles for your archetype. The green economy offers many more career paths across sectors — explore widely. Tap any card for details.</p>
          <div className="flex flex-col gap-3.5">
            {activePerson.sectors.map((job, i) => (
              <JobCard key={i} job={job} color={activePerson.color} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* BOTTOM LINE */}
      <section className="text-center py-12 px-6" style={{ background: COLORS.forest }}>
        <div className="max-w-[520px] mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[2px] mb-3" style={{ color: COLORS.mint }}>The Bottom Line</p>
          <h2 className="font-serif text-[28px] font-bold text-white leading-[1.3] mb-5">
            The green economy isn't coming. It's here.
          </h2>
          <p className="text-[15px] leading-[1.75] mb-6" style={{ color: '#B7DFC9' }}>
            Green talent demand is growing at 12% annually - twice the rate of supply. The skills gap is your opportunity gap.
          </p>
          <div className="bg-white/[0.08] rounded-2xl p-5 text-left">
            <p className="text-sm font-semibold text-white mb-2.5">🎯 Your four next steps:</p>
            {[
              'Identify your personality archetype above',
              'Pick ONE career that excites you and research the training path',
              'Start a microcredential or short course within 30 days',
            ].map((step, i) => (
              <p key={i} className="text-sm leading-relaxed mb-2" style={{ color: '#B7DFC9' }}>{i + 1}. {step}</p>
            ))}
            <p className="text-sm leading-relaxed mb-2" style={{ color: '#B7DFC9' }}>
              4. <a href="https://www.theclimatedesk.earth" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white transition-colors font-semibold">Subscribe to The Climate Desk</a> for regular updates on green jobs matching your interest
            </p>
          </div>
          <p className="text-sm mt-6 leading-relaxed" style={{ color: '#B7DFC9' }}>
            Know a college student or fresh graduate figuring out their first career move?{' '}
            <button
              onClick={() => {
                const url = window.location.origin + '/green-jobs-guide';
                if (navigator.share) {
                  navigator.share({ title: 'Green Jobs Career Guide', url });
                } else {
                  navigator.clipboard.writeText(url);
                  toast({ title: 'Link copied!', description: 'Share it with someone starting their career.' });
                }
              }}
              className="underline underline-offset-2 hover:text-white transition-colors font-semibold"
            >
              Share this guide with them →
            </button>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
