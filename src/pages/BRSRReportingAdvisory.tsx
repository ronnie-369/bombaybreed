import ServicePageTemplate from '@/components/seo/ServicePageTemplate';

const BRSRReportingAdvisory = () => {
  return (
    <ServicePageTemplate
      slug="brsr-reporting-advisory-india"
      og_image="https://bombaybreed.com/og/og-brsr.png"
      meta_title="BRSR Reporting Advisory India — SEBI-Compliant Sustainability Disclosure | Bombay Breed"
      meta_description="Expert BRSR reporting advisory for Indian listed companies. Navigate SEBI's Business Responsibility and Sustainability Reporting (BRSR) Core & Leadership frameworks with confidence."
      h1_headline="BRSR Reporting Advisory for Indian Listed Companies"
      direct_answer_block="BRSR (Business Responsibility and Sustainability Reporting) is SEBI's mandatory ESG disclosure framework for the top 1,000 listed companies in India. BRSR Core covers essential ESG metrics with assurance requirements, while BRSR Leadership is a voluntary framework for companies seeking deeper reporting aligned with global standards like GRI, TCFD, and ISSB."
      capability={{ name: 'Sustainability Reporting', slug: 'sustainability-reporting' }}
      regulation={{ name: 'BRSR Compliance', slug: 'brsr-compliance' }}
      content_sections={{
        the_problem: `Most Indian boards treat BRSR as a compliance checkbox — a 200-page PDF filed annually and forgotten. The result: inconsistent data collection across business units, last-minute scrambles before filing deadlines, and disclosures that satisfy the regulator but fail to communicate strategic intent to investors.\n\nSEBI has been steadily tightening requirements. BRSR Core now mandates third-party assurance for key ESG metrics. The value chain disclosure requirements are expanding. Companies that built their reporting around minimum compliance in 2023 are finding their frameworks inadequate for 2025-26 requirements.`,
        why_this_fails: `Three patterns consistently undermine BRSR reporting quality:\n\n**1. Data silos across business units.** Sustainability data lives in spreadsheets maintained by facility managers, HR teams, and procurement departments with no unified collection methodology. When reporting season arrives, the sustainability team spends weeks chasing numbers.\n\n**2. Misalignment between BRSR and global frameworks.** Companies reporting under GRI or CDP alongside BRSR often maintain parallel reporting tracks, duplicating effort and introducing inconsistencies that auditors flag.\n\n**3. No strategic narrative.** The report presents data without connecting it to business strategy, capital allocation decisions, or transition planning. Institutional investors — who increasingly use BRSR data for screening — find nothing actionable.`,
        what_changes: `When BRSR reporting is done right, it becomes a strategic asset:\n\n- **Investor confidence rises.** ESG-focused funds and proxy advisors can clearly evaluate your transition readiness and governance maturity.\n- **Assurance becomes routine, not painful.** With proper data collection systems, third-party verification is a process, not a crisis.\n- **Global alignment is built in.** A well-architected BRSR report maps cleanly to GRI, TCFD, and ISSB frameworks — one data collection effort, multiple reporting outputs.\n- **Board oversight improves.** The ESG committee receives meaningful metrics tied to material risks, not a compliance summary.`,
        our_approach: `Bombay Breed's BRSR advisory follows a structured methodology:\n\n**Phase 1 — Materiality & Gap Assessment.** We map your current disclosures against BRSR Core and Leadership requirements, identify data gaps, and benchmark against sector peers.\n\n**Phase 2 — Data Architecture.** We design collection frameworks that align BRSR metrics with GRI, TCFD, and CDP indicators, eliminating parallel reporting tracks.\n\n**Phase 3 — Narrative Strategy.** We develop the strategic narrative connecting your ESG data to business strategy, ensuring the report communicates transition intent to institutional investors.\n\n**Phase 4 — Assurance Readiness.** We prepare documentation, audit trails, and internal controls for third-party assurance under BRSR Core requirements.\n\nThis is not a reporting-as-a-service engagement. We build internal capability so your team can maintain reporting quality independently.`
      }}
      typical_roles={[
        'Chief Sustainability Officer',
        'Company Secretary',
        'CFO / Head of Investor Relations',
        'ESG Committee Chair',
        'Head of Corporate Governance'
      ]}
      urgency_triggers={[
        'SEBI BRSR Core assurance deadline approaching',
        'Proxy advisory firm flagged ESG disclosure gaps',
        'Transitioning from voluntary to mandatory BRSR reporting',
        'Board requesting improved ESG oversight metrics',
        'Global investors requesting TCFD-aligned disclosures alongside BRSR'
      ]}
      conversion_cta="Schedule a BRSR readiness assessment"
      faq_items={[
        {
          question: 'Who needs to file BRSR reports in India?',
          answer: 'SEBI mandates BRSR filing for the top 1,000 listed companies by market capitalisation. BRSR Core, with assurance requirements, applies to the top 150 companies initially, expanding progressively.'
        },
        {
          question: 'What is the difference between BRSR Core and BRSR Leadership?',
          answer: 'BRSR Core covers essential ESG metrics that require third-party assurance. BRSR Leadership is a voluntary, more comprehensive framework for companies seeking to demonstrate deeper sustainability integration and alignment with global standards.'
        },
        {
          question: 'How does BRSR relate to GRI, TCFD, and ISSB frameworks?',
          answer: 'BRSR draws from GRI and TCFD principles. A well-designed reporting architecture can map BRSR indicators to GRI Standards, TCFD recommendations, and ISSB S1/S2, enabling unified data collection for multiple frameworks.'
        },
        {
          question: 'What does BRSR assurance involve?',
          answer: 'BRSR Core assurance requires independent third-party verification of key ESG metrics. This involves audit trails, documented methodologies, internal controls, and evidence supporting each disclosed data point.'
        },
        {
          question: 'How long does it take to prepare for BRSR filing?',
          answer: 'For companies starting from scratch, a comprehensive BRSR readiness engagement typically takes 3-4 months. Companies with existing sustainability reports may need 6-8 weeks to align their frameworks.'
        }
      ]}
      internal_links={[
        { slug: 'compliance-to-credibility', title: 'From Compliance to Credibility', type: 'report' },
        { slug: 'carbon-market-outlook', title: 'India Carbon Market Outlook', type: 'report' },
        { slug: 'services', title: 'All Advisory Services', type: 'page' }
      ]}
    />
  );
};

export default BRSRReportingAdvisory;