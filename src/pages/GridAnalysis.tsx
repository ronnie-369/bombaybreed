import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./GridAnalysis.css";

const sections = [
  "overview",
  "gap",
  "solutions",
  "infrastructure",
  "investment",
  "assessment",
];

const sectionLabels: Record<string, string> = {
  overview: "The Crisis",
  gap: "The Gap",
  solutions: "Solutions Map",
  infrastructure: "Infrastructure",
  investment: "Investment Case",
  assessment: "Article Assessment",
};

// Animated bar component
const Bar = ({ value, max, color, label, sublabel, delay = 0 }: {
  value: number;
  max: number;
  color: string;
  label: string;
  sublabel: string;
  delay?: number;
}) => {
  const pct = (value / max) * 100;
  return (
    <div className="ga-bar">
      <div className="ga-bar-header">
        <span className="ga-bar-label">{label}</span>
        <span className="ga-bar-sublabel" style={{ color }}>{sublabel}</span>
      </div>
      <div className="ga-bar-track">
        <div
          className="ga-bar-fill"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

const StatCard = ({ number, label, accent = "hsl(160, 45%, 25%)" }: {
  number: string;
  label: string;
  accent?: string;
}) => (
  <div className="ga-stat-card">
    <div className="ga-stat-number" style={{ color: accent }}>{number}</div>
    <div className="ga-stat-label">{label}</div>
  </div>
);

const SectionTitle = ({ children, number }: { children: React.ReactNode; number: number }) => (
  <div className="ga-section-title">
    <div className="ga-section-number">{String(number).padStart(2, "0")}</div>
    <h2 className="ga-section-heading">{children}</h2>
    <div className="ga-section-underline" />
  </div>
);

const Prose = ({ children }: { children: React.ReactNode }) => (
  <p className="ga-prose">{children}</p>
);

const Callout = ({ children, type = "insight" }: {
  children: React.ReactNode;
  type?: "insight" | "data" | "warning";
}) => {
  const colors = {
    insight: { bg: "hsla(160, 45%, 25%, 0.08)", border: "hsl(160, 45%, 25%)", icon: "◆" },
    data: { bg: "hsla(200, 60%, 40%, 0.08)", border: "hsl(200, 60%, 40%)", icon: "■" },
    warning: { bg: "hsla(0, 70%, 50%, 0.08)", border: "hsl(0, 70%, 50%)", icon: "▲" },
  };
  const c = colors[type];
  return (
    <div className="ga-callout" style={{ background: c.bg, borderLeftColor: c.border }}>
      <span style={{ color: c.border, marginRight: 8 }}>{c.icon}</span>
      {children}
    </div>
  );
};

// Duck curve visualization
const DuckCurve = () => {
  const thermalData = [65, 62, 60, 58, 55, 50, 42, 35, 30, 28, 32, 38, 45, 52, 60, 68, 72, 75, 72, 70, 68, 66, 65, 65];
  const solarData = [0, 0, 0, 0, 2, 8, 18, 35, 48, 55, 52, 45, 35, 22, 12, 4, 0, 0, 0, 0, 0, 0, 0, 0];
  const demandData = [55, 52, 50, 48, 52, 58, 62, 68, 72, 75, 78, 80, 78, 75, 72, 76, 82, 85, 80, 75, 70, 65, 60, 57];
  
  const w = 520, h = 200, padL = 40, padR = 10, padT = 15, padB = 25;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  
  const toX = (i: number) => padL + (i / 23) * plotW;
  const toY = (v: number) => padT + plotH - (v / 90) * plotH;
  
  const makePath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");

  const makeArea = (data: number[]) => {
    const path = data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");
    return `${path} L${toX(23).toFixed(1)},${toY(0).toFixed(1)} L${toX(0).toFixed(1)},${toY(0).toFixed(1)} Z`;
  };

  return (
    <div className="ga-duck-curve">
      <div className="ga-chart-label">INDIA'S DUCK CURVE - THE GRID FLEXIBILITY GAP</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="ga-svg">
        <defs>
          <linearGradient id="solarFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(160, 40%, 35%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(160, 40%, 35%)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="gapFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(0, 70%, 50%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(0, 70%, 50%)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 30, 60, 90].map((v) => (
          <g key={v}>
        <line x1={padL} y1={toY(v)} x2={w - padR} y2={toY(v)} stroke="hsl(210, 15%, 90%)" strokeDasharray="3,3" />
            <text x={padL - 6} y={toY(v) + 4} fill="hsl(210, 10%, 55%)" fontSize="9" textAnchor="end" className="ga-chart-text">
              {v}%
            </text>
          </g>
        ))}
        {/* Time labels */}
        {[0, 6, 12, 18, 23].map((i) => (
          <text key={i} x={toX(i)} y={h - 5} fill="hsl(210, 10%, 55%)" fontSize="9" textAnchor="middle" className="ga-chart-text">
            {`${String(i).padStart(2, "0")}:00`}
          </text>
        ))}
        {/* Solar area */}
        <path d={makeArea(solarData)} fill="url(#solarFill)" />
        {/* Demand line */}
        <path d={makePath(demandData)} fill="none" stroke="hsl(200, 60%, 40%)" strokeWidth="2" strokeDasharray="6,3" />
        {/* Thermal line */}
        <path d={makePath(thermalData)} fill="none" stroke="hsl(0, 70%, 50%)" strokeWidth="2" />
        {/* Solar line */}
        <path d={makePath(solarData)} fill="none" stroke="hsl(160, 40%, 35%)" strokeWidth="2" />
        {/* Labels */}
        <text x={toX(17)} y={toY(85) - 6} fill="hsl(200, 60%, 40%)" fontSize="9" className="ga-chart-text">Demand</text>
        <text x={toX(16)} y={toY(72) + 14} fill="hsl(0, 70%, 50%)" fontSize="9" className="ga-chart-text">Thermal</text>
        <text x={toX(9)} y={toY(55) - 8} fill="hsl(160, 40%, 35%)" fontSize="9" className="ga-chart-text">Solar</text>
        {/* Evening ramp annotation */}
        <line x1={toX(15)} y1={toY(72)} x2={toX(15)} y2={toY(4)} stroke="hsl(0, 70%, 50%)" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
        <text x={toX(15) + 4} y={toY(15)} fill="hsl(0, 70%, 50%)" fontSize="8" className="ga-chart-text" opacity="0.7">Evening</text>
        <text x={toX(15) + 4} y={toY(15) + 10} fill="hsl(0, 70%, 50%)" fontSize="8" className="ga-chart-text" opacity="0.7">Ramp</text>
      </svg>
      <div className="ga-legend">
        {[
         { color: "hsl(160, 40%, 35%)", label: "Solar Generation" },
          { color: "hsl(0, 70%, 50%)", label: "Thermal Dispatch" },
          { color: "hsl(200, 60%, 40%)", label: "System Demand" },
        ].map((l) => (
          <div key={l.label} className="ga-legend-item">
            <div className="ga-legend-color" style={{ background: l.color }} />
            <span>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Solutions matrix
const SolutionsMatrix = () => {
  const solutions = [
    { name: "Grid-Forming Inverters", tech: 90, cost: 60, readiness: 70, impact: "Synthetic inertia, frequency control" },
    { name: "BESS (4-hr Li-ion)", tech: 85, cost: 75, readiness: 65, impact: "Peak shifting, RE firming" },
    { name: "Pumped Hydro Storage", tech: 95, cost: 55, readiness: 40, impact: "Long-duration storage, inertia" },
    { name: "Synchronous Condensers", tech: 95, cost: 70, readiness: 50, impact: "Reactive power, fault current" },
    { name: "HVDC Transmission", tech: 90, cost: 45, readiness: 55, impact: "Long-distance evacuation" },
    { name: "Demand Response", tech: 70, cost: 85, readiness: 35, impact: "Load flexibility, peak mgmt" },
  ];

  return (
    <div className="ga-solutions-matrix">
      <div className="ga-chart-label">SOLUTION READINESS MATRIX - INDIA CONTEXT</div>
      {solutions.map((s) => (
        <div key={s.name} className="ga-solution-card">
          <div className="ga-solution-header">
            <span className="ga-solution-name">{s.name}</span>
            <span className="ga-solution-impact">{s.impact}</span>
          </div>
          <div className="ga-solution-metrics">
            {[
              { label: "Tech", val: s.tech, color: "#00A896" },
              { label: "Cost", val: s.cost, color: "#FFB347" },
              { label: "India Ready", val: s.readiness, color: "#FF6B35" },
            ].map((m) => (
              <div key={m.label} className="ga-metric">
                <div className="ga-metric-header">
                  <span className="ga-metric-label">{m.label}</span>
                  <span className="ga-metric-value" style={{ color: m.color }}>{m.val}%</span>
                </div>
                <div className="ga-metric-track">
                  <div
                    className="ga-metric-fill"
                    style={{ width: `${m.val}%`, background: m.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Investment waterfall
const InvestmentChart = () => {
  const items = [
    { label: "Transmission\n(GEC III-IV)", value: 56000, color: "hsl(160, 45%, 25%)" },
    { label: "BESS\n(47 GW target)", value: 91000, color: "hsl(200, 60%, 40%)" },
    { label: "Pumped Hydro\n(19 GW)", value: 120000, color: "hsl(160, 40%, 35%)" },
    { label: "Grid\nModernisation", value: 45000, color: "hsl(0, 70%, 50%)" },
    { label: "Smart Grid\n& Digital", value: 25000, color: "hsl(270, 40%, 50%)" },
  ];
  const maxVal = 130000;
  
  return (
    <div className="ga-investment-chart">
      <div className="ga-chart-label">CAPITAL INVESTMENT REQUIRED BY 2032 (₹ CRORE)</div>
      <div className="ga-investment-bars">
        {items.map((item) => (
          <div key={item.label} className="ga-investment-bar-wrapper">
            <div className="ga-investment-value" style={{ color: item.color }}>
              ₹{(item.value / 1000).toFixed(0)}K Cr
            </div>
            <div
              className="ga-investment-bar"
              style={{
                height: `${(item.value / maxVal) * 140}px`,
                background: `linear-gradient(180deg, ${item.color}, ${item.color}44)`,
              }}
            />
            <div className="ga-investment-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Scorecard for article assessment
const ScoreBar = ({ label, score, maxScore = 10, color = "hsl(160, 45%, 25%)" }: {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
}) => (
  <div className="ga-score-bar">
    <div className="ga-score-header">
      <span className="ga-score-label">{label}</span>
      <span className="ga-score-value" style={{ color }}>{score}/{maxScore}</span>
    </div>
    <div className="ga-score-dots">
      {Array.from({ length: maxScore }).map((_, i) => (
        <div
          key={i}
          className="ga-score-dot"
          style={{ background: i < score ? color : "hsl(210, 15%, 90%)" }}
        />
      ))}
    </div>
  </div>
);

export default function GridAnalysis() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "India's Renewable Grid at Breaking Point",
    "description": "Strategic analysis of India's 203 GW renewable grid crisis, thermal-RE gaps, and the ₹3.4 lakh crore infrastructure investment required for grid stabilization.",
    "keywords": ["renewable energy India", "grid stability", "energy transition", "solar curtailment", "BESS", "pumped hydro", "India power sector", "grid infrastructure"],
    "author": {
      "@type": "Organization",
      "name": "Bombay Breed",
      "url": "https://bombaybreed.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bombay Breed",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bombaybreed.com/favicon.png"
      }
    },
    "datePublished": "2026-02-09",
    "dateModified": "2026-02-09",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://bombaybreed.com/india-renewable-grid-analysis"
    },
    "citation": {
      "@type": "NewsArticle",
      "headline": "Centre steps in to resolve electricity curtailment issue, tasks CEA and national grid operator to find a resolution",
      "url": "https://www.livemint.com/industry/energy/centre-steps-in-to-resolve-electricity-curtailment-issue-tasks-cea-and-national-grid-operator-to-find-a-resolution-11770376761817.html",
      "publisher": {
        "@type": "Organization",
        "name": "Mint"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>India's Renewable Grid at Breaking Point — Strategic Intelligence Briefing | Bombay Breed</title>
        <meta name="description" content="India's 203 GW renewable grid is hitting structural limits. Analysis of the thermal-RE gap, grid stabilisation solutions, and the ₹3.4 lakh crore infrastructure question." />
        <meta name="keywords" content="renewable energy India, grid stability, energy transition, solar curtailment India, BESS, pumped hydro, India power sector, grid infrastructure investment" />
        <link rel="canonical" href="https://bombaybreed.com/india-renewable-grid-analysis" />
        <meta property="og:title" content="India's Renewable Grid at Breaking Point — Strategic Intelligence Briefing" />
        <meta property="og:description" content="Strategic analysis of the 203 GW grid crisis, thermal-RE gaps, and the ₹3.4 lakh crore infrastructure investment required for stabilization." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://bombaybreed.com/india-renewable-grid-analysis" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="India's Renewable Grid at Breaking Point" />
        <meta name="twitter:description" content="Strategic analysis of India's renewable grid crisis and investment requirements." />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="grid-analysis-page">
        <Header />
        
        {/* Hero Header */}
        <div className="ga-hero">
          <div className="ga-hero-container">
            <Link to="/insights" className="ga-back-link">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Insights</span>
            </Link>
            <div className="ga-category">BB Consulting · Strategic Intelligence Briefing</div>
            <h1 className="ga-title">
              India's Renewable Grid at{" "}
              <span className="ga-title-accent">Breaking Point</span>
            </h1>
            <div className="ga-subtitle">
              The thermal-RE gap, grid stabilisation pathways, and the ₹3.4 lakh crore infrastructure question
            </div>
            {/* Prominent Source Attribution Card */}
            <div className="ga-source-card">
              <div className="ga-source-card-label">SOURCE ARTICLE</div>
              <div className="ga-source-card-title">
                Mint — Centre steps in to resolve electricity curtailment issue, tasks CEA and national grid operator to find a resolution
              </div>
              <a
                href="https://www.livemint.com/industry/energy/centre-steps-in-to-resolve-electricity-curtailment-issue-tasks-cea-and-national-grid-operator-to-find-a-resolution-11770376761817.html"
                target="_blank"
                rel="noopener noreferrer"
                className="ga-source-card-cta"
              >
                Read on Mint
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="ga-sources-secondary">
              Additional data: Ember, CEA, CERC, IEA, Bloomberg, NREL, Mercom India · Feb 2026
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="ga-nav">
          <div className="ga-nav-container">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => setActive(s)}
                className={`ga-nav-button ${active === s ? "ga-nav-button--active" : ""}`}
              >
                {sectionLabels[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="ga-content">
          {active === "overview" && (
            <div>
              <SectionTitle number={1}>The Chokepoint Crisis</SectionTitle>
              <Prose>
                India's renewable energy sector has hit a structural wall. With 203+ GW of non-hydro renewable capacity installed by November 2025 - making renewables 50% of total installed capacity - the grid designed for centralised thermal generation is buckling under the weight of distributed, variable power. The Mint article captures the frontline of this crisis in Rajasthan and Gujarat, where sweeping production cuts at solar and wind farms signal a systemic failure, not a temporary glitch.
              </Prose>

              <div className="ga-stats-grid">
                <StatCard number="203 GW" label="RE Capacity Installed" />
                <StatCard number="18%" label="Solar Curtailed Monthly" accent="hsl(0, 70%, 50%)" />
                <StatCard number="₹575-690 Cr" label="Compensation Payouts" accent="hsl(160, 40%, 35%)" />
                <StatCard number="4 GW" label="Curtailed in Rajasthan" accent="hsl(0, 70%, 50%)" />
              </div>

              <Callout type="warning">
                The curtailment in Rajasthan reached 51.5% during peak solar hours (10:30 AM - 2:30 PM). Revenue losses for developers hit 20-25%, raising insolvency concerns if sustained beyond six months.
              </Callout>

              {/* WSJ Video Link Card */}
              <div className="ga-video-card">
                <div className="ga-video-card-icon">
                  <Play className="w-5 h-5" />
                </div>
                <div className="ga-video-card-content">
                  <div className="ga-video-card-label">WATCH: WSJ on Grid Stabilisation</div>
                  <div className="ga-video-card-desc">Understanding why grids built for thermal power struggle with variable renewables</div>
                </div>
                <a
                  href="https://youtu.be/Sq-y-wiZduE?si=HVmD69o1APxl3WK7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ga-video-card-cta"
                >
                  Watch on YouTube
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <Prose>
                The WSJ analysis on grid stabilisation frames the global dimension of this same problem: grids built around the spinning mass of thermal turbines lack the physical inertia to absorb variable renewable power safely. Three core engineering challenges - inertia loss, reactive power deficits, and transmission inadequacy - converge in India with particular intensity because the country is attempting the fastest large-scale energy transition in history, on a grid that was never designed for it.
              </Prose>

              <Callout type="data">
                India's grid frequency must stay within 49.90-50.05 Hz. With thermal plants providing natural inertia through spinning turbines, the system self-corrects. Solar and wind - connected through power electronics, not rotating mass - offer zero inherent inertia. Every GW of thermal replaced by RE removes a stability anchor.
              </Callout>
            </div>
          )}

          {active === "gap" && (
            <div>
              <SectionTitle number={2}>The Thermal-RE Gap</SectionTitle>
              <Prose>
                The fundamental gap between thermal and renewable generation through the grid is not merely about megawatts - it is an engineering paradigm mismatch. Thermal plants deliver four critical grid services that renewables, in their current configuration, cannot replicate.
              </Prose>

              <DuckCurve />

              <div className="ga-gaps-container">
                <div className="ga-chart-label">FOUR CRITICAL GAPS</div>
                {[
                  { title: "Inertia Gap", desc: "Thermal turbines store kinetic energy in rotating mass, resisting frequency changes. Solar/wind inverters provide zero mechanical inertia. India's system inertia is declining as thermal plants retire or ramp down during solar hours.", pct: 85, color: "hsl(0, 70%, 50%)" },
                  { title: "Reactive Power Gap", desc: "Thermal generators produce reactive power (VARs) essential for voltage stability. RE sources, located far from load centres, cannot deliver reactive power over long transmission lines. Doubling power consumed quadruples VARs needed.", pct: 70, color: "hsl(160, 40%, 35%)" },
                  { title: "Ramping Gap", desc: "The 'duck curve' demands thermal plants ramp from minimum to maximum output in 3-4 hours as solar fades. Indian coal plants were designed for baseload, not rapid cycling. This causes equipment stress and inefficiency.", pct: 75, color: "hsl(160, 45%, 25%)" },
                  { title: "Transmission Gap", desc: "22,500 MW commissioned in Rajasthan against 14,000 MW of GNA capacity. RE build-out has structurally outpaced evacuation infrastructure, with key 765 kV lines delayed by 18-24 months.", pct: 90, color: "hsl(0, 70%, 50%)" },
                ].map((gap, i) => (
                  <div key={gap.title} className={`ga-gap-item ${i < 3 ? "ga-gap-item--bordered" : ""}`}>
                    <div className="ga-gap-header">
                      <span className="ga-gap-title">{gap.title}</span>
                      <span className="ga-gap-severity" style={{ color: gap.color }}>Severity: {gap.pct}%</span>
                    </div>
                    <div className="ga-gap-desc">{gap.desc}</div>
                    <div className="ga-gap-bar-track">
                      <div className="ga-gap-bar-fill" style={{ width: `${gap.pct}%`, background: `linear-gradient(90deg, ${gap.color}66, ${gap.color})` }} />
                    </div>
                  </div>
                ))}
              </div>

              <Callout type="insight">
                Oscillations in voltage, current, power and frequency - flagged in the Mint article - are the clinical symptoms of a grid losing its inertial backbone. The CEA-Grid India joint study ordered by MNRE is essentially an admission that India's grid physics are changing faster than its institutional capacity to manage them.
              </Callout>
            </div>
          )}

          {active === "solutions" && (
            <div>
              <SectionTitle number={3}>Solutions for an RE-Powered Grid</SectionTitle>
              <Prose>
                The WSJ analysis identifies three engineering pathways to grid stabilisation - synthetic inertia, energy storage, and advanced transmission. Mapped against India's specific context, six solution categories emerge, each at different stages of technological maturity, cost viability, and deployment readiness.
              </Prose>

              <SolutionsMatrix />

              <Callout type="data">
                India's BESS pipeline exploded from 19 GWh in 2024 to 92 GWh in 2025. Yet only 0.8 GWh is operational. The CEA targets 47 GW / 236 GWh of BESS by 2032 - a 590x scale-up from today's base. Pumped hydro adds another 175 GWh requirement.
              </Callout>

              <Prose>
                Grid-forming inverters represent the most elegant bridge technology - they enable solar and wind installations to mimic the inertial response of thermal generators through advanced power electronics. NREL has demonstrated 72 hours of continuous 100% renewable operation using grid-forming controls with zero communication between wind, solar, and battery systems. This is the technology India's grid operators need most urgently, yet it barely features in current policy discussions.
              </Prose>

              <Callout type="insight">
                The UK and Ireland are already deploying synchronous condensers - 200-tonne rotating machines that provide inertia without burning fuel - through "Greener Grid Parks." India, with its massive retiring thermal fleet, has an opportunity to convert decommissioned generators into synchronous condensers at a fraction of new-build cost.
              </Callout>

              <Prose>
                Demand response - the ability to shift industrial and commercial loads away from peak hours - remains India's most under-exploited flexibility resource. With time-of-day tariffs still poorly implemented and smart metering penetration low, the demand side of the grid equation is essentially inert.
              </Prose>
            </div>
          )}

          {active === "infrastructure" && (
            <div>
              <SectionTitle number={4}>Infrastructure Requirements</SectionTitle>
              <Prose>
                Building a robust RE grid in India demands investment across five infrastructure pillars - each with distinct spatial, financial, and institutional requirements.
              </Prose>

              <div className="ga-pillars-container">
                <div className="ga-chart-label">INFRASTRUCTURE PILLARS</div>

                {[
                  {
                    icon: "⚡",
                    title: "Transmission Backbone",
                    items: "Green Energy Corridor Phase III-IV: 150 GW evacuation capacity. 765 kV HVDC inter-state lines. Estimated 10,750+ ckm of new lines, 27,500 MVA substation capacity.",
                    space: "Land acquisition across 8-15 states, right-of-way clearances through agricultural and forest land",
                    status: "GEC-I: 90% complete | GEC-II: Underway | GEC-III: ₹56,000 Cr approved",
                  },
                  {
                    icon: "🔋",
                    title: "Energy Storage",
                    items: "47 GW / 236 GWh BESS + 19 GW / 175 GWh pumped hydro by 2032. VGF support for 43.2 GWh. 50 GWh ACC battery manufacturing under PLI.",
                    space: "BESS: Co-located at RE parks and substations. Pumped hydro: Mountain terrain, water reservoirs in Uttarakhand, Maharashtra, Karnataka",
                    status: "Operational: 0.8 GWh | Pipeline: 92 GWh BESS + 132 GWh PSP",
                  },
                  {
                    icon: "🔄",
                    title: "Grid Flexibility Infrastructure",
                    items: "Synchronous condensers at RE pooling stations. Grid-forming inverter mandates. FACTS devices, STATCOMs for reactive power compensation.",
                    space: "Retrofit at existing thermal plant sites (Rajasthan, Gujarat, Tamil Nadu, Karnataka)",
                    status: "Nascent - No major deployment programs announced yet",
                  },
                  {
                    icon: "📡",
                    title: "Smart Grid & Digital",
                    items: "Phasor measurement units (PMUs) network-wide. AI-driven forecasting and dispatch. Smart metering for demand response.",
                    space: "Digital overlay across entire grid infrastructure, SCADA upgrades at every substation",
                    status: "PMU sharing initiated per CEA direction | Smart meters: 250M target",
                  },
                  {
                    icon: "🏭",
                    title: "Manufacturing Base",
                    items: "Domestic cell manufacturing (polysilicon, wafers). Inverter and power electronics. Battery chemistry (LFP, sodium-ion).",
                    space: "Industrial corridors in Gujarat, Tamil Nadu, Odisha, Andhra Pradesh",
                    status: "Module capacity: 74 GW | Cell capacity: Still inadequate upstream",
                  },
                ].map((p, i) => (
                  <div key={p.title} className={`ga-pillar ${i < 4 ? "ga-pillar--bordered" : ""}`}>
                    <div className="ga-pillar-title">{p.icon} {p.title}</div>
                    <div className="ga-pillar-items">{p.items}</div>
                    <div className="ga-pillar-space">Space: {p.space}</div>
                    <div className="ga-pillar-status">Status: {p.status}</div>
                  </div>
                ))}
              </div>

              <Callout type="warning">
                Total planned transmission (57 GW as of 2025) accounts for only 11% of the 500 GW national RE target. Rajasthan will have spare transmission capacity of 13 GW in FY26, dropping to just 1.4 GW by FY27 - a cliff-edge that illustrates how fast the grid is saturating.
              </Callout>
            </div>
          )}

          {active === "investment" && (
            <div>
              <SectionTitle number={5}>The Investment Triad</SectionTitle>
              <Prose>
                Three dimensions of investment - space, finance, and institutional intent - must converge simultaneously for India's RE grid to become viable. The absence of any one creates cascading failures across the other two.
              </Prose>

              <InvestmentChart />

              <div className="ga-investment-summary">
                <Bar value={487} max={500} color="hsl(160, 45%, 25%)" label="Total Storage Investment Opportunity (2025-2050)" sublabel="$487 Billion" delay={0} />
                <Bar value={450} max={500} color="hsl(200, 60%, 40%)" label="Power Sector Investment by 2032" sublabel="₹4.5 Lakh Cr" delay={200} />
                <Bar value={91} max={500} color="hsl(160, 40%, 35%)" label="VGF Committed for BESS" sublabel="₹9,160 Cr" delay={400} />
                <Bar value={181} max={500} color="hsl(270, 40%, 50%)" label="PLI for ACC Battery Manufacturing" sublabel="₹18,100 Cr" delay={600} />
              </div>

              <div className="ga-triad-grid">
                {[
                  {
                    title: "Space",
                    color: "hsl(160, 45%, 25%)",
                    items: [
                      "Land for 150 GW transmission corridors",
                      "Pumped hydro reservoir sites",
                      "BESS co-location at RE parks",
                      "Manufacturing corridors",
                    ],
                  },
                  {
                    title: "Finance",
                    color: "hsl(200, 60%, 40%)",
                    items: [
                      "$487B storage opportunity",
                      "₹4.5L Cr power sector by 2032",
                      "VGF covering 40% BESS capex",
                      "Green bonds, sovereign wealth",
                    ],
                  },
                  {
                    title: "Intent",
                    color: "hsl(160, 40%, 35%)",
                    items: [
                      "500 GW RE by 2030 target",
                      "ESO mandated trajectory to FY30",
                      "Draft Electricity Amendment 2025",
                      "CEA-Grid India joint study",
                    ],
                  },
                ].map((col) => (
                  <div key={col.title} className="ga-triad-column" style={{ borderTopColor: col.color }}>
                    <div className="ga-triad-title" style={{ color: col.color }}>{col.title}</div>
                    {col.items.map((item) => (
                      <div key={item} className="ga-triad-item" style={{ borderLeftColor: `${col.color}22` }}>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <Callout type="insight">
                Rystad Energy estimates $487 billion in storage investment opportunity in India between 2025-2050. Yet current deployment stands at 0.8 GWh against a 411 GWh requirement by 2032. The gap between ambition and execution is not financial - it is institutional. PPA delays, underbidding concerns, and regulatory uncertainty are the real bottlenecks.
              </Callout>
            </div>
          )}

          {active === "assessment" && (
            <div>
              <SectionTitle number={6}>Article Assessment: Intent vs. Action</SectionTitle>
              <Prose>
                The Mint article by Rituraj Baruah captures a pivotal moment in India's energy transition - the point where ambition collides with infrastructure reality. Assessed against the framework of intent, action, and systemic adequacy, the article reveals more about India's institutional response capacity than it does about the technical problem itself.
              </Prose>

              <div className="ga-scorecard">
                <div className="ga-chart-label">ARTICLE SCORECARD</div>
                <ScoreBar label="Policy Intent Signal" score={7} color="hsl(200, 60%, 40%)" />
                <ScoreBar label="Concrete Action Commitment" score={4} color="hsl(160, 40%, 35%)" />
                <ScoreBar label="Systemic Problem Diagnosis" score={6} color="hsl(160, 45%, 25%)" />
                <ScoreBar label="Solution Specificity" score={3} color="hsl(0, 70%, 50%)" />
                <ScoreBar label="Investor Confidence Impact" score={3} color="hsl(270, 40%, 50%)" />
                <ScoreBar label="Timeline Credibility" score={4} color="hsl(160, 45%, 25%)" />
              </div>

              <Prose>
                <strong className="ga-strong">Intent: High, but reactive.</strong> The Centre's decision to task CEA and Grid India with a joint study signals awareness at the highest levels. But this is a response to crisis, not proactive planning. The "sweeping production cuts" in Rajasthan and Gujarat preceded the institutional response by months. The MNRE meeting with "all stakeholders" and the directive to "conduct a study on ways to reduce oscillations" are classic indicators of a government catching up to a problem it should have anticipated.
              </Prose>

              <Prose>
                <strong className="ga-strong">Action: Insufficient and fragmented.</strong> The article describes a study being commissioned, not solutions being deployed. The compensation payout of ₹575-690 crore (per Ember) is a band-aid on a haemorrhage. Developers losing 20-25% revenue while a study is "conducted" suggests the action cycle is 12-18 months behind where it needs to be. No emergency procurement of grid-forming inverters. No fast-tracked synchronous condenser programme. No mandated demand response activation.
              </Prose>

              <Callout type="warning">
                The most telling detail: official curtailment registers show "NIL" curtailment for November-December 2025 and January 2026, while developers report 4 GW still being curtailed. This data integrity gap is perhaps more alarming than the curtailment itself - you cannot solve a problem you refuse to measure.
              </Callout>

              <Prose>
                <strong className="ga-strong">The structural verdict:</strong> India's intent-to-action pipeline for grid modernisation operates on a 3-5 year cycle (policy announcement → study → tender → procurement → commissioning). The RE build-out operates on a 12-18 month cycle. This temporal mismatch is the root cause of the chokepoint. Until grid infrastructure is procured and deployed on RE timelines - not thermal-era planning cycles - India will continue generating renewable energy it cannot use and compensating developers for power it cannot transmit.
              </Prose>

              <div className="ga-bottom-line">
                <div className="ga-chart-label">BOTTOM LINE</div>
                <div className="ga-bottom-line-text">
                  The article is a symptom report, not a diagnosis. The real story is not that India's green power is at a chokepoint - it is that India's grid governance architecture is structurally incapable of matching the speed of its own energy transition. The fix requires not just ₹3.4 lakh crore in hardware, but a fundamental acceleration of institutional decision-making from thermal-era timelines to renewable-era urgency.
                </div>
              </div>
            </div>
          )}

          {/* Content Footer */}
          <div className="ga-content-footer">
            <div className="ga-footer-left">BB Consulting · Strategic Intelligence</div>
            <div className="ga-footer-right">Data: CEA, Ember, IEA, Bloomberg, Mercom, NREL, Rystad Energy</div>
          </div>

          {/* Related Services CTA */}
          <div className="ga-cta-section">
            <h3 className="ga-cta-title">Related Advisory Services</h3>
            <div className="ga-cta-grid">
              <Link to="/energy-optimisation-consulting" className="ga-cta-link">
                <span>Energy Optimisation Consulting</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link to="/industrial-decarbonisation-strategy" className="ga-cta-link">
                <span>Industrial Decarbonisation Strategy</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link to="/power-utilities" className="ga-cta-link">
                <span>Power & Utilities Advisory</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <div className="ga-cta-button-wrapper">
              <Button asChild>
                <Link to="/#contact">Request a Briefing</Link>
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
