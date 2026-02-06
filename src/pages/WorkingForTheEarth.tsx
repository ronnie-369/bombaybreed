import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './WorkingForTheEarth.css';

// Animated bar component
const AnimatedBar = ({ 
  label, 
  width, 
  value, 
  color 
}: { 
  label: string; 
  width: number; 
  value: string; 
  color: 'ink' | 'teal' | 'accent';
}) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimatedWidth(width), 100);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div className="bar-row" ref={ref}>
      <div className="bar-label">{label}</div>
      <div className="bar-track">
        <div 
          className={`bar-fill ${color}`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
      <div className="bar-value">{value}</div>
    </div>
  );
};

// Scroll reveal component
const ScrollReveal = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`animate-in ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const WorkingForTheEarth = () => {
  // Schema markup for article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Working for the Earth — A Dialectic Discourse",
    "description": "The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected themselves.",
    "author": {
      "@type": "Organization",
      "name": "BB Consulting",
      "url": "https://bombaybreed.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bombay Breed",
      "url": "https://bombaybreed.com"
    },
    "datePublished": "2026-02-01",
    "dateModified": "2026-02-06",
    "mainEntityOfPage": "https://bombaybreed.com/working-for-the-earth"
  };

  return (
    <div className="dialectic-page bg-[var(--paper)]">
      <Helmet>
        <title>Working for the Earth — A Dialectic Discourse | Bombay Breed</title>
        <meta name="description" content="The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected themselves." />
        <link rel="canonical" href="https://bombaybreed.com/working-for-the-earth" />
        <meta property="og:title" content="Working for the Earth — A Dialectic Discourse" />
        <meta property="og:description" content="The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected themselves." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://bombaybreed.com/working-for-the-earth" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Working for the Earth — A Dialectic Discourse" />
        <meta name="twitter:description" content="The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected themselves." />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Header />

      {/* HERO */}
      <section className="dialectic-hero">
        <div className="hero-label">A Dialectic Discourse</div>
        <h1>Working for<br />the <em>Earth</em></h1>
        <p className="hero-subtitle">
          The planet's most urgent crisis demands its most essential workers.<br />
          Yet those who protect the Earth are among the least protected themselves.
        </p>
        <div className="hero-meta">BB Consulting · Climate Intelligence · February 2026</div>
      </section>

      {/* PART I: THE PARADOX */}
      <div className="dialectic-content">
        <ScrollReveal>
          <div className="section-number">I</div>
          <div className="section-title">The Paradox of Green Labour</div>
          <div className="section-subtitle">On the misalignment between planetary urgency and worker dignity</div>

          <p className="lead-para">There is a dissonance at the heart of the green economy that no amount of policy jargon can conceal. The world needs 34 million new climate-related jobs by 2030, according to the World Economic Forum's Future of Jobs Report 2025. Yet the workers already labouring to protect the planet — field conservationists, waste reclaimers, renewable-energy installers, carbon monitoring technicians in the Global South — are compensated at rates that betray the very values the green transition claims to uphold.</p>

          <p>This is not merely an economic oversight. It is a philosophical contradiction. The green economy promises to reconcile human prosperity with planetary health. But if the workers building that economy cannot achieve prosperity themselves, the entire moral architecture collapses.</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="data-card">
            <div className="data-card-label">The Skills–Jobs Chasm</div>
            <div className="big-number">241M</div>
            <div className="big-context">Green skills vacancies projected by 2030 — up from 67 million today. Green jobs will grow by 260% in the next five years, while the workforce acquiring green skills will grow by just 60%.</div>
            <div className="data-source">Source: Global Green Skills Gap Report 2025 · ResearchAndMarkets.com</div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p>The disparity unfolds along predictable lines. In high-income nations, a sustainability director earns $120,000–$180,000 annually. An environmental lawyer commands comparable figures. In India, the same strategic competencies — carbon accounting, ESG compliance, BRSR reporting — fetch a fraction of that. In Sub-Saharan Africa, frontline conservation workers earn less than subsistence wages while stewarding ecosystems that sequester carbon for the entire planet.</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="chart-container">
            <div className="chart-title">Green Wage Premium by Category</div>
            <div className="chart-headline">Those who work for the Earth are paid unequally — <br />depending on where and how they do it</div>
            <div className="bar-chart">
              <AnimatedBar label="Sustainability Director (US)" width={100} value="$180K" color="ink" />
              <AnimatedBar label="Environmental Lawyer (EU)" width={83} value="$150K" color="ink" />
              <AnimatedBar label="Green Premium (Women)" width={12} value="+12%" color="teal" />
              <AnimatedBar label="Green Premium (Men)" width={7} value="+7%" color="teal" />
              <AnimatedBar label="ESG Analyst (India)" width={17} value="$30K" color="accent" />
              <AnimatedBar label="Conservation Worker (SSA)" width={4} value="$7K" color="accent" />
            </div>
            <div className="data-source">Sources: IMF Staff Discussion Note 2024/003 · Holistique Training 2025 · LinkedIn Global Green Skills Report 2025</div>
          </div>
        </ScrollReveal>

        <hr className="divider" />

        {/* PART II: THE DIALECTIC */}
        <ScrollReveal>
          <div className="section-number">II</div>
          <div className="section-title">Why the Disparity Exists</div>
          <div className="section-subtitle">Three structural fractures beneath the green economy</div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="dialectic">
            <div className="thesis">
              <div className="dialectic-label">Thesis</div>
              <div className="dialectic-text">"Green jobs pay a premium. Workers with at least one green skill enjoy a 46.6% higher hiring rate than the global average. The market is working."</div>
            </div>
            <div className="antithesis">
              <div className="dialectic-label">Antithesis</div>
              <div className="dialectic-text">"That premium exists only for knowledge workers in advanced economies. For the 22% of workers globally earning less than half the median wage, the green transition is another extraction."</div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="synthesis-block">
            <div className="dialectic-label">Synthesis</div>
            <div className="dialectic-text">The green premium is real — but it is geographically and socially captured. Without deliberate redistribution of capacity, finance, and knowledge, the transition reproduces colonial-era labour hierarchies in climate-branded packaging.</div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div style={{ marginTop: '3rem' }}>
            <p><strong>Fracture One: The Knowledge Asymmetry.</strong> Sixty-eight percent of energy-sector degree programmes globally remain focused on fossil fuels. Only 32% are dedicated to renewables. The workers who most need green skills — those in industrialising economies, those in informal sectors, those in agriculture — are the furthest from accessing them. The REN21 Global Status Report 2025 identifies a projected shortfall of 7 million skilled workers in core green sectors by 2030. This is not an abstract number; it is a structural barrier that ensures the transition's benefits flow upward and northward.</p>

            <p><strong>Fracture Two: The Productivity–Wage Decoupling.</strong> The ILO's Global Wage Report 2024–25 documents a pattern that should alarm every advocate of climate justice. In high-income countries, productivity has risen 29% since 1999. Real wages have risen only 15%. The economic surplus generated by the green transition — the efficiency gains, the new markets, the regulatory arbitrage — is being captured by capital, not distributed to labour. When a carbon accounting firm in London bills $500 per hour for ESG advisory but pays its data analyst in Bengaluru $15 per hour for the same underlying work, the green transition is not creating shared value. It is widening the extraction gap.</p>

            <p><strong>Fracture Three: The Informal Economy Blind Spot.</strong> In low-income countries, nearly 22% of workers earn less than half the median hourly wage, often in informal settings. These workers — waste reclaimers, smallholder farmers practising regenerative agriculture, artisanal miners who could be retrained for critical mineral extraction — are invisible to the formal green economy. They are not counted, not compensated, and not transitioned.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="stat-grid">
            <div className="stat-cell">
              <div className="stat-value">29%</div>
              <div className="stat-label">Rise in productivity in high-income countries since 1999</div>
            </div>
            <div className="stat-cell">
              <div className="stat-value">15%</div>
              <div className="stat-label">Corresponding rise in real wages over the same period</div>
            </div>
            <div className="stat-cell">
              <div className="stat-value">22%</div>
              <div className="stat-label">Workers globally earning below half the median hourly wage</div>
            </div>
            <div className="stat-cell">
              <div className="stat-value">20%</div>
              <div className="stat-label">Gender pay gap worldwide, compounded in green sectors</div>
            </div>
          </div>
          <div className="data-source" style={{ textAlign: 'center' }}>Sources: ILO Global Wage Report 2024–25 · ITUC Analysis 2024</div>
        </ScrollReveal>
      </div>

      {/* FULL-WIDTH BREAK */}
      <div className="full-break">
        <div className="break-number">$9T</div>
        <div className="break-text">Estimated annual climate finance needed by 2030.<br />Current flows: $1.3 trillion.<br />The gap is not just financial. It is moral.</div>
        <div className="break-source">Source: Climate Policy Initiative via WEF, 2024</div>
      </div>

      <div className="dialectic-content">
        <ScrollReveal>
          <div className="pull-quote">
            <blockquote>"Climate action that exacerbates inequalities can surface geopolitical and socioeconomic fragmentation, which can impact the cost, speed and acceptance of the green transition."</blockquote>
            <cite>World Economic Forum — Putting People at the Centre of Climate Action, 2024</cite>
          </div>
        </ScrollReveal>

        <hr className="divider" />

        {/* PART III: THE PATHWAY */}
        <ScrollReveal>
          <div className="section-number">III</div>
          <div className="section-title">A Streamlined Pathway to Just Transition</div>
          <div className="section-subtitle">Five interventions to reconcile planetary work with worker dignity</div>

          <p className="lead-para">Justice in the green transition is not a programme to be designed after the infrastructure is built. It must be woven into the architecture from the outset. Drawing on frameworks from the ILO, WEF, and IMF, five interconnected interventions can create a streamlined pathway — one that treats human capital with the same strategic seriousness as carbon budgets.</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="pathway">
            <div className="pathway-node">
              <div className="pathway-marker">1</div>
              <div className="pathway-content">
                <div className="pathway-title">Redesign Education at the Source</div>
                <div className="pathway-desc">The 68/32 fossil-to-renewable ratio in global energy education must be inverted within a decade. This requires national curriculum mandates, industry-university co-design of green skill modules, and modular certification pathways accessible to workers in informal economies. The ILO's 2025 Strategy on Just Transition specifically calls for data-driven forecasting to align training with emerging demand — not reactive patching.</div>
              </div>
            </div>
            <div className="pathway-node">
              <div className="pathway-marker">2</div>
              <div className="pathway-content">
                <div className="pathway-title">Establish Green Wage Floors</div>
                <div className="pathway-desc">The green premium exists but is captured unevenly. A global framework for green wage floors — sector-specific, adjusted for purchasing power parity, and enforced through procurement standards — would ensure that climate workers in the Global South are not subsidising the transition for the Global North. The ILO's 2024 living wage methodology provides the technical foundation. What is needed is political will.</div>
              </div>
            </div>
            <div className="pathway-node">
              <div className="pathway-marker">3</div>
              <div className="pathway-content">
                <div className="pathway-title">Close the Gender Green Gap</div>
                <div className="pathway-desc">The IMF finds that women receive a 12% wage premium in green jobs versus 7% for men — suggesting latent demand. Yet women remain underrepresented in STEM pathways. Economies with stronger STEM education for women and more equitable labour laws transition faster and at lower cost. Gender parity is not a social add-on; it is an accelerant for climate action.</div>
              </div>
            </div>
            <div className="pathway-node">
              <div className="pathway-marker">4</div>
              <div className="pathway-content">
                <div className="pathway-title">Build Portable Green Credentials</div>
                <div className="pathway-desc">A solar engineer trained in Rajasthan should not need to recertify to work in Morocco. Portable, internationally recognised green credentials — analogous to what coding bootcamps achieved for tech — would democratise access and create a genuinely global green labour market. LinkedIn's 2025 data shows 53% of green hires are now entering non-traditional green roles with transferable skills. The infrastructure for portability is overdue.</div>
              </div>
            </div>
            <div className="pathway-node">
              <div className="pathway-marker">5</div>
              <div className="pathway-content">
                <div className="pathway-title">Finance the Human Transition, Not Just the Energy Transition</div>
                <div className="pathway-desc">Of the $9 trillion in annual climate finance needed by 2030, a dedicated allocation for workforce transition — retraining, relocation support, income bridging, community economic development — must be ring-fenced. The WEF estimates 47% of employers expect climate initiatives to transform their operations by 2030. Workers cannot be an afterthought in that transformation. The 29,000 coal workers in Serbia and Bosnia alone illustrate the stakes: without a plan, these communities lose not just jobs, but futures.</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <hr className="divider" />

        {/* PART IV: THE MORAL CASE */}
        <ScrollReveal>
          <div className="section-number">IV</div>
          <div className="section-title">The Moral Architecture</div>
          <div className="section-subtitle">A closing argument</div>

          <p className="lead-para">Consider the arithmetic of inequality that the World Economic Forum laid bare in January 2024. The richest 10% of households own 60–80% of wealth globally. The poorest 50% own less than 5%. In no region of the world do the bottom 50% of emitters contribute more than 5% of greenhouse gas emissions. Yet the exposure to climate hazards falls disproportionately on precisely those populations.</p>

          <p>The green transition, if executed without justice at its core, will become the defining failure of 21st-century governance — not because it failed to decarbonise, but because it succeeded in doing so while leaving half the world behind.</p>

          <p>Working for the Earth should not require sacrificing one's own wellbeing on it. The dialectic must resolve: the thesis of planetary urgency and the antithesis of worker precarity must synthesise into a third way — one where protecting the planet and protecting the people who protect it are understood as the same act.</p>

          <p>That synthesis is not inevitable. It must be built — through policy, through finance, through the persistent moral imagination of those who refuse to accept that justice and sustainability are competing goods.</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="pull-quote">
            <blockquote>"Only by making the green transition truly work for people and economies — by tailoring solutions to context, investing in capacity, and driving shared economic value — can we maintain momentum on climate."</blockquote>
            <cite>World Economic Forum & McKinsey — Making the Green Transition Work, November 2025</cite>
          </div>
        </ScrollReveal>

        <div className="divider-ornament">◆ ◆ ◆</div>
      </div>

      {/* SOURCES FOOTER */}
      <div className="sources-footer">
        <div className="footer-title">Sources & Methodology</div>
        <ul className="sources-list">
          <li>1. WEF Future of Jobs Report 2025</li>
          <li>2. ILO Global Wage Report 2024–25</li>
          <li>3. IMF Staff Discussion Note 2024/003: Green Jobs and the Future of Work for Women and Men</li>
          <li>4. LinkedIn Global Green Skills Report 2025</li>
          <li>5. REN21 Global Status Report 2025</li>
          <li>6. Global Green Skills Gap Report 2025 (ResearchAndMarkets.com)</li>
          <li>7. WEF & McKinsey: Making the Green Transition Work, Nov 2025</li>
          <li>8. WEF: Putting People at the Centre of Climate Action, Jan 2024</li>
          <li>9. ITUC Analysis of ILO Global Wage Report, Nov 2024</li>
          <li>10. Climate Policy Initiative: Global Landscape of Climate Finance 2024</li>
        </ul>
        <div style={{ color: 'rgba(255,255,255,0.35)', marginTop: '2rem' }}>BB Consulting · Climate Intelligence Division · February 2026</div>
      </div>

      <Footer />
    </div>
  );
};

export default WorkingForTheEarth;
