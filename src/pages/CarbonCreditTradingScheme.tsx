import ServicePageTemplate from '@/components/seo/ServicePageTemplate';

const CarbonCreditTradingScheme = () => {
  return (
    <ServicePageTemplate
      slug="carbon-credit-trading-scheme-india"
      meta_title="Carbon Credit Trading Scheme India — CCTS Advisory & Strategy | Bombay Breed"
      meta_description="Navigate India's Carbon Credit Trading Scheme (CCTS) with expert advisory. Understand compliance obligations, market mechanics, and strategic positioning for Indian companies."
      h1_headline="India's Carbon Credit Trading Scheme: What Your Board Needs to Know"
      direct_answer_block="The Indian Carbon Credit Trading Scheme (CCTS), notified under the Energy Conservation Act 2001 (amended 2022), establishes India's first regulated carbon market. The Bureau of Energy Efficiency (BEE) administers the scheme, which includes both a compliance market (for obligated entities) and a voluntary offset market. The scheme introduces Carbon Credit Certificates (CCCs) tradeable on designated exchanges."
      capability={{ name: 'Carbon Market Advisory', slug: 'carbon-market-advisory' }}
      regulation={{ name: 'Carbon Credit Trading Scheme', slug: 'carbon-credit-trading-scheme' }}
      content_sections={{
        the_problem: `India's Carbon Credit Trading Scheme represents the most significant regulatory shift in Indian climate policy since the PAT Scheme. Yet most companies are approaching it the way they approached early GST implementation — waiting for final rules, hoping for extensions, and treating it as a compliance burden rather than a strategic opportunity.\n\nThe problem: the CCTS will create winners and losers. Companies that understand the market mechanics early — who can quantify their exposure, model different allocation scenarios, and position themselves strategically — will extract value. Companies that wait will face higher compliance costs and miss the window to influence sector benchmarks.`,
        why_this_fails: `**Regulatory uncertainty is not a reason to wait — it's the reason to prepare.** Companies that delayed PAT Scheme preparation lost years of potential certificate value. The same pattern is emerging with CCTS.\n\nCommon failures:\n\n**1. Treating carbon as an operations cost, not a board-level risk.** Carbon pricing will affect capital allocation, project economics, and competitive positioning. Finance teams, not just sustainability teams, need to be involved.\n\n**2. Ignoring the voluntary market opportunity.** The CCTS creates a parallel voluntary offset market. Companies with credible emission reduction projects can generate Carbon Credit Certificates — but only if methodologies are established early.\n\n**3. No scenario planning.** Without modelling different carbon price trajectories (₹500/tCO₂e to ₹3,000/tCO₂e), companies cannot assess the financial materiality of their exposure.`,
        what_changes: `Strategic CCTS preparation delivers measurable advantages:\n\n- **Quantified carbon exposure.** The board understands exactly how different carbon prices affect margins, project IRRs, and competitive positioning.\n- **Early-mover advantage in certificate generation.** Companies with pre-approved methodologies can begin generating CCCs as soon as the voluntary market opens.\n- **Informed policy engagement.** Understanding the scheme's mechanics allows meaningful participation in stakeholder consultations and sector benchmark discussions.\n- **Integrated financial planning.** Carbon costs are embedded in capital allocation frameworks, not treated as an afterthought.\n- **CBAM readiness.** For export-oriented companies, CCTS compliance documentation supports EU Carbon Border Adjustment Mechanism (CBAM) reporting requirements.`,
        our_approach: `Bombay Breed's CCTS advisory is built for Indian market realities:\n\n**Exposure Assessment.** We quantify your carbon footprint against likely CCTS sector benchmarks, model compliance costs under multiple carbon price scenarios, and identify emission reduction opportunities that generate tradeable certificates.\n\n**Market Intelligence.** We track BEE notifications, draft methodologies, and sector-specific developments. Clients receive briefings on regulatory developments that affect their compliance obligations and strategic options.\n\n**Board-Ready Strategy.** We prepare carbon market strategy documents for board and ESG committee review — not technical reports, but strategic frameworks connecting carbon exposure to business decisions.\n\n**Voluntary Market Positioning.** For companies with credible emission reduction projects, we develop methodology documentation and project design documents for CCC generation under the voluntary offset mechanism.\n\nThis advisory is sector-specific. Carbon market strategy for a steel company is fundamentally different from a cement company, a refinery, or an IT services firm. We don't apply generic frameworks.`,
        market_risks: `**Key risks Indian companies face under CCTS:**\n\n- **Benchmark allocation uncertainty.** BEE is still finalising sector-specific emission intensity benchmarks. Companies below the benchmark will receive surplus certificates; those above will need to purchase.\n- **Carbon price volatility.** The EU ETS started at €5/tCO₂ and now trades above €60. Indian carbon prices will follow their own trajectory, but volatility is inevitable.\n- **Supply chain exposure.** Even non-obligated companies face indirect carbon costs through their supply chain as obligated entities pass through compliance costs.\n- **CBAM interaction.** Indian exporters to the EU will need to demonstrate carbon costs paid domestically. CCTS compliance documentation will be critical for CBAM certificate calculations.`
      }}
      typical_roles={[
        'CEO / Managing Director',
        'Chief Sustainability Officer',
        'CFO / Head of Strategy',
        'Head of Energy Management',
        'ESG Committee Chair',
        'Head of Government Affairs'
      ]}
      urgency_triggers={[
        'BEE notification on sector benchmarks expected',
        'Board requesting carbon market exposure assessment',
        'Export revenue exposed to EU CBAM',
        'Competitors announcing carbon neutrality targets',
        'PAT Scheme obligations transitioning to CCTS framework'
      ]}
      conversion_cta="Schedule a carbon market readiness briefing"
      faq_items={[
        {
          question: 'What is the Indian Carbon Credit Trading Scheme (CCTS)?',
          answer: 'The CCTS is India\'s regulated carbon market, notified under the Energy Conservation (Amendment) Act 2022. It establishes both a compliance market for obligated entities and a voluntary offset market, administered by the Bureau of Energy Efficiency (BEE).'
        },
        {
          question: 'Which companies are obligated under CCTS?',
          answer: 'Obligated entities will include designated consumers under the Energy Conservation Act — typically large industrial units in sectors like steel, cement, aluminium, petrochemicals, and thermal power. BEE will notify sector-specific thresholds.'
        },
        {
          question: 'How does CCTS relate to the PAT Scheme?',
          answer: 'The CCTS is expected to subsume or operate alongside the existing PAT (Perform, Achieve and Trade) Scheme. Companies currently under PAT should prepare for their obligations to transition to the CCTS framework.'
        },
        {
          question: 'What are Carbon Credit Certificates (CCCs)?',
          answer: 'CCCs are tradeable instruments issued under the CCTS. In the compliance market, entities that exceed their emission reduction targets receive surplus CCCs. In the voluntary market, approved emission reduction projects can generate CCCs.'
        },
        {
          question: 'How does CCTS interact with the EU CBAM?',
          answer: 'Indian exporters to the EU will need to demonstrate carbon costs paid domestically to reduce CBAM obligations. CCTS compliance costs may qualify as "carbon price paid" under CBAM, making proper documentation critical.'
        },
        {
          question: 'When will CCTS trading begin?',
          answer: 'The regulatory framework is being finalised in phases. BEE has published draft rules and is conducting stakeholder consultations. Companies should prepare now — the regulatory timeline suggests active trading within 2025-26.'
        }
      ]}
      internal_links={[
        { slug: 'india-carbon-market-tracker', title: 'India Carbon Market Tracker', type: 'tool' },
        { slug: 'carbon-market-outlook', title: 'Carbon Market Outlook Report', type: 'report' },
        { slug: 'carbon-playbook', title: 'The Carbon Playbook', type: 'report' },
        { slug: 'brsr-reporting-advisory-india', title: 'BRSR Reporting Advisory', type: 'page' }
      ]}
    />
  );
};

export default CarbonCreditTradingScheme;