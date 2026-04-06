import carbonMarketOutlookCover from '@/assets/carbon-market-outlook-cover.jpg';
import wefCover from '@/assets/wef-global-risks-2026-cover.jpg';
import energyTransitionCover from '@/assets/energy-transition-playbook-cover.jpg';
import complianceCover from '@/assets/compliance-credibility-cover.jpg';
import greenJobsCover from '@/assets/green-jobs-india-2026-cover.jpg';
const ccusPolicyCover = 'https://zjiwmdrtuhsrymsuvpfb.supabase.co/storage/v1/object/public/brand%20assets/Screenshot%202026-04-06%20at%2012.44.23%20PM.png';

export type ContentType = 'Flagship Report' | 'Intelligence Brief' | 'Regulatory Alert' | 'Perspective';
export type Topic = 'Carbon Markets' | 'Board Governance' | 'ESG Communications' | 'Regulatory Intel';

export interface InsightData {
  slug: string;
  title: string;
  subtitle?: string;
  contentType: ContentType;
  topic: Topic;
  metaTitle: string;
  metaDescription: string;
  metaLine: string;
  readTimeMinutes: number;
  publishedDate: string;
  coverImage?: string;
  stats?: { value: string; label: string }[];
  statsSource?: string;
  executiveSummary: string;
  tableOfContents?: { title: string; description: string }[];
  bodyContent?: string;
  faq?: { question: string; answer: string }[];
  siblings: string[];
  series?: { name: string; items: { slug: string; title: string; year: string }[] };
  pdfUrl?: string;
  complianceDeadline?: string;
  actionItems?: string[];
  midArticleCta?: {
    type: 'consultation' | 'flagship';
    flagshipSlug?: string;
    flagshipTitle?: string;
    topic?: string;
  };
}

export const insights: Record<string, InsightData> = {
  'carbon-playbook': {
    slug: 'carbon-playbook',
    title: "India's Carbon Playbook",
    subtitle: "PAT Lessons, CCTS Rules & the Article 6 Opportunity",
    contentType: 'Flagship Report',
    topic: 'Carbon Markets',
    metaTitle: "India's Carbon Playbook: CCTS & Article 6 | Bombay Breed",
    metaDescription: "Strategic policy guide covering PAT lessons, CCTS implementation roadmap, and India's Article 6 opportunity framework for Indian boards and policymakers.",
    metaLine: 'By Theresa Ronnie · March 2026 · 42 pages',
    readTimeMinutes: 12,
    publishedDate: '2026-03-01',
    coverImage: carbonMarketOutlookCover,
    stats: [
      { value: '₹14,000 Cr', label: 'Carbon credit market size by 2030' },
      { value: '72%', label: 'Indian boards lack climate transition readiness' },
      { value: '3×', label: 'Compliance cost multiplier for delayed action' },
    ],
    statsSource: 'Ministry of Environment, 2025; SEBI BRSR Framework',
    executiveSummary: "In this report, we analyse the full arc of India's carbon market evolution - from the PAT Scheme's decade-long experiment to the new Carbon Credit Trading Scheme and the untapped Article 6 opportunity. For Indian boards, the question is no longer whether carbon pricing will affect their business, but how quickly they can position for it. We provide the regulatory roadmap, the strategic frameworks, and the implementation playbook that corporate India needs to move from compliance to competitive advantage.",
    tableOfContents: [
      { title: 'The Indian Carbon Credit Landscape', description: 'Market sizing, regulatory timeline, and key players.' },
      { title: 'PAT Scheme: Lessons from a Decade of Trading', description: 'What worked, what failed, and what transfers to CCTS.' },
      { title: 'CCTS Implementation Roadmap', description: 'Compliance milestones from 2025 to 2030.' },
      { title: 'Article 6 Opportunity Framework', description: "India's strategic positioning in international carbon markets." },
      { title: 'Board-Level Carbon Governance', description: 'ESG committee structures and carbon risk oversight.' },
      { title: 'Sector Exposure Analysis', description: 'Steel, cement, power, chemicals - who pays and how much.' },
      { title: 'Communications Strategy for Carbon Compliance', description: 'How to tell the story without greenwashing.' },
      { title: 'Action Plan: The First 90 Days', description: 'Immediate steps for boards and CSOs.' },
    ],
    siblings: ['wef-global-risks-2026', 'carbon-market-outlook', 'compliance-to-credibility'],
    pdfUrl: 'carbon-playbook-2026.pdf',
  },

  'wef-global-risks-2026': {
    slug: 'wef-global-risks-2026',
    title: 'WEF Global Risks Report 2026',
    subtitle: 'Strategic Analysis for Climate Leaders',
    contentType: 'Flagship Report',
    topic: 'Board Governance',
    metaTitle: 'WEF Global Risks 2026: Climate & Geopolitical Volatility | Bombay Breed',
    metaDescription: "Bombay Breed's executive interpretation of the World Economic Forum's flagship risk report - connecting global systemic risks to corporate strategy and climate action priorities.",
    metaLine: 'By Theresa Ronnie · January 2026 · 36 pages',
    readTimeMinutes: 10,
    publishedDate: '2026-01-20',
    coverImage: wefCover,
    stats: [
      { value: '87%', label: 'of CEOs expect significant business model disruption from climate risks by 2030' },
      { value: '3.2°C', label: 'Current trajectory vs. 1.5°C Paris target - the gap is widening' },
      { value: '$4.7T', label: 'Annual investment gap for net-zero transition in emerging markets' },
      { value: '62%', label: 'of global GDP now covered by net-zero commitments' },
    ],
    statsSource: 'World Economic Forum Global Risks Report 2026; Davos 2026 sessions',
    executiveSummary: "The 2026 WEF Global Risks Report reveals how interconnected global risks - climate, geopolitical, economic - are amplifying each other at unprecedented speed. For Indian enterprises, the polycrisis creates both existential threats and strategic openings. Our executive analysis distils the 120-page report into the insights that matter for boards navigating climate strategy in emerging markets. We map the risk landscape to Indian corporate realities: CBAM exposure, supply chain fragmentation, and the capital mobilisation challenge.",
    tableOfContents: [
      { title: 'Polycrisis Acceleration', description: 'How interconnected risks create systemic vulnerability.' },
      { title: 'Climate Risk Repricing', description: 'Physical and transition risks converging faster than predicted.' },
      { title: 'Geopolitical Fragmentation', description: 'Supply chain restructuring and resource nationalism.' },
      { title: 'India in the 2026 Risk Matrix', description: "India's unique position: exposure meets opportunity." },
      { title: 'Board Governance Implications', description: 'Fiduciary duty evolution and risk oversight frameworks.' },
      { title: 'Strategic Recommendations', description: 'Scenario planning, resilience building, and competitive positioning.' },
    ],
    siblings: ['carbon-playbook', 'india-renewable-grid-analysis', 'compliance-to-credibility'],
    pdfUrl: 'wef-global-risks-2026-analysis.pdf',
  },

  'green-jobs-india-2026': {
    slug: 'green-jobs-india-2026',
    title: 'Jobs on the Rise 2026: India Green Jobs Outlook',
    subtitle: 'Workforce Analysis for Net-Zero 2070',
    contentType: 'Flagship Report',
    topic: 'ESG Communications',
    metaTitle: 'India Green Jobs Outlook 2026 | Bombay Breed',
    metaDescription: "Comprehensive analysis of India's green jobs landscape aligned with Net-Zero 2070 goals and 500 GW renewable energy targets.",
    metaLine: 'By Theresa Ronnie · January 2026 · 28 pages',
    readTimeMinutes: 9,
    publishedDate: '2026-01-17',
    coverImage: greenJobsCover,
    stats: [
      { value: '1.1M', label: 'Solar jobs projected by 2030' },
      { value: '72%', label: 'Professionals planning to seek new roles' },
      { value: '84%', label: 'Candidates feeling unprepared for green transition' },
      { value: '500 GW', label: "India's renewable energy capacity target" },
    ],
    statsSource: 'ILO 2025; MNRE projections; Bombay Breed workforce survey',
    executiveSummary: "India's green transition will create millions of new jobs - but the workforce isn't ready. Our analysis maps the demand-supply gap across six key sectors: solar, wind, battery storage, green hydrogen, ESG advisory, and carbon markets. We identify the states with highest job creation potential, the skills that matter most, and the policy interventions needed to close the preparation gap before 2030.",
    tableOfContents: [
      { title: 'The Green Jobs Opportunity', description: 'Market sizing and growth projections to 2030.' },
      { title: 'Sector Analysis', description: 'Solar, wind, storage, hydrogen, ESG, and carbon markets.' },
      { title: 'Skills Gap Assessment', description: 'What employers need vs. what the workforce offers.' },
      { title: 'State-wise Outlook', description: 'Gujarat, Maharashtra, Tamil Nadu, Rajasthan, Karnataka.' },
      { title: 'Policy & Institutional Landscape', description: 'ILO, MNRE, NITI Aayog, SEBI, and BRSR alignment.' },
      { title: 'Recommendations', description: 'For employers, job seekers, policymakers, and investors.' },
    ],
    siblings: ['wef-global-risks-2026', 'working-for-the-earth', 'energy-transition-playbook'],
    pdfUrl: 'green-jobs-india-2026.pdf',
  },

  'energy-transition-playbook': {
    slug: 'energy-transition-playbook',
    title: 'The Energy Transition Playbook for India',
    subtitle: 'Strategic Frameworks for Clean Energy Transformation',
    contentType: 'Flagship Report',
    topic: 'Carbon Markets',
    metaTitle: 'Energy Transition Playbook for India | Bombay Breed',
    metaDescription: 'Strategic frameworks and implementation pathways for India\'s clean energy transformation and industrial decarbonisation.',
    metaLine: 'By Theresa Ronnie · September 2025 · 34 pages',
    readTimeMinutes: 9,
    publishedDate: '2025-08-15',
    coverImage: energyTransitionCover,
    stats: [
      { value: '₹75L Cr', label: 'Energy transition investment opportunity' },
      { value: '500 GW', label: 'Renewable capacity target by 2030' },
      { value: '42%', label: 'Annual carbon market growth rate' },
    ],
    statsSource: 'MNRE 2025; CEA projections; IEA World Energy Outlook',
    executiveSummary: "India's energy transition presents a ₹75 lakh crore investment opportunity across renewable energy infrastructure, grid modernisation, and clean technology deployment. This playbook provides sector-specific strategic frameworks covering policy and regulation, technology deployment, financial mechanisms, and industrial transformation - the four pillars that will determine whether India meets its 500 GW renewable target by 2030.",
    tableOfContents: [
      { title: 'The ₹75 Lakh Crore Opportunity', description: 'Market sizing across RE, storage, and green hydrogen.' },
      { title: 'Policy & Regulatory Landscape', description: 'RECs, Green Hydrogen Mission, PLI for Solar, CBAM.' },
      { title: 'Technology Deployment Pathways', description: 'Smart grids, storage, hydrogen production, CCS.' },
      { title: 'Financial Mechanisms', description: 'Green bonds, blended finance, carbon markets.' },
      { title: 'Industrial Decarbonisation Roadmap', description: 'Steel, cement, aluminium, and chemicals.' },
      { title: 'Implementation Timeline', description: 'Year-by-year milestones from 2025 to 2035.' },
    ],
    siblings: ['carbon-playbook', 'carbon-market-outlook', 'india-renewable-grid-analysis'],
    pdfUrl: 'energy-transition-playbook-india.pdf',
  },

  'carbon-market-outlook': {
    slug: 'carbon-market-outlook',
    title: "India Carbon Market Outlook 2025–2030",
    subtitle: "An Investor's Deep Dive",
    contentType: 'Flagship Report',
    topic: 'Carbon Markets',
    metaTitle: "India Carbon Market Outlook 2025-2030 | Bombay Breed",
    metaDescription: "Complete investor's guide to India's $1.4B carbon market opportunity with financial models, sector analysis, and risk frameworks.",
    metaLine: 'By Theresa Ronnie · October 2025 · 32 pages',
    readTimeMinutes: 10,
    publishedDate: '2025-10-15',
    coverImage: carbonMarketOutlookCover,
    stats: [
      { value: '$1.4B', label: 'Carbon trading market by 2030' },
      { value: '$250B', label: 'Renewable deployment creating offset opportunities' },
      { value: '65%', label: 'Compliance vs voluntary market split' },
      { value: '42%', label: 'Annual market growth rate' },
    ],
    statsSource: 'BEE, MNRE, IEA, Bombay Breed analysis',
    executiveSummary: "India's carbon credit market is projected to reach $1.4 billion by 2030, driven by regulatory mandates and corporate net-zero commitments. This investor-focused report provides sector-by-sector market sizing, growth projections, and risk-return profiles across renewable energy credits, industrial efficiency, forestry, and transportation. We model three carbon price scenarios and their implications for portfolio allocation.",
    tableOfContents: [
      { title: 'Market Overview', description: '$1.4B opportunity: structure, segments, and growth drivers.' },
      { title: 'Renewable Energy Credits', description: '$580M segment - grid parity, storage, corporate PPAs.' },
      { title: 'Industrial Efficiency', description: '$420M segment - PAT expansion, technology adoption.' },
      { title: 'Forest & Agriculture Credits', description: '$280M segment - afforestation, biodiversity credits.' },
      { title: 'Transportation', description: '$120M segment - EV adoption, green hydrogen.' },
      { title: 'Risk Analysis', description: 'Carbon price scenarios, regulatory risk, market liquidity.' },
    ],
    siblings: ['carbon-playbook', 'energy-transition-playbook', 'compliance-to-credibility'],
    pdfUrl: 'carbon-market-outlook-2025-2030.pdf',
  },

  'compliance-to-credibility': {
    slug: 'compliance-to-credibility',
    title: 'From Compliance to Credibility',
    subtitle: 'A CXO Guide to CCTS & CBAM',
    contentType: 'Flagship Report',
    topic: 'Carbon Markets',
    metaTitle: 'From Compliance to Credibility: CCTS & CBAM Guide | Bombay Breed',
    metaDescription: 'Strategic frameworks to transform carbon compliance into competitive advantage and market leadership for Indian CXOs.',
    metaLine: 'By Theresa Ronnie · October 2025 · 24 pages',
    readTimeMinutes: 8,
    publishedDate: '2025-10-20',
    coverImage: complianceCover,
    stats: [
      { value: '4', label: 'Sectors with critical CBAM exposure' },
      { value: '₹2,400 Cr', label: 'Estimated annual CBAM cost for Indian exporters' },
      { value: '18 months', label: 'Before mandatory CCTS compliance phases begin' },
    ],
    statsSource: 'EU CBAM Regulation; BEE CCTS framework; Bombay Breed estimates',
    executiveSummary: "The twin forces of India's CCTS and Europe's CBAM are rewriting the rules of global trade. This guide provides CXOs with the frameworks to transform carbon compliance from a regulatory burden into competitive advantage - covering regulatory shifts, compliance-grade communication strategies, and sector-specific case studies from steel, textiles, automotive, and power sectors.",
    tableOfContents: [
      { title: 'The Compliance Imperative', description: 'Why CCTS + CBAM changes everything for Indian exporters.' },
      { title: 'Regulatory Shifts Decoded', description: 'CCTS rules and CBAM requirements in plain language.' },
      { title: 'Compliance-Grade Communication', description: 'Strategic storytelling in the regulatory era.' },
      { title: 'Sector Case Studies', description: 'Steel, textiles, automotive, and power.' },
      { title: 'CXO Action Framework', description: 'Immediate steps for exports, investors, and reputation.' },
      { title: 'Market Access Strategy', description: 'Turning compliance into differentiation.' },
    ],
    siblings: ['carbon-playbook', 'carbon-market-outlook', 'wef-global-risks-2026'],
    pdfUrl: 'compliance-to-credibility-guide.pdf',
  },

  'india-renewable-grid-analysis': {
    slug: 'india-renewable-grid-analysis',
    title: "India's Renewable Grid at Breaking Point",
    subtitle: 'Strategic Analysis of the 203 GW Grid Crisis',
    contentType: 'Intelligence Brief',
    topic: 'Carbon Markets',
    metaTitle: "India's Renewable Grid Crisis: 203 GW Analysis | Bombay Breed",
    metaDescription: "Strategic analysis of the 203 GW grid crisis, thermal-RE gaps, and the ₹3.4 lakh crore infrastructure investment required.",
    metaLine: 'By Theresa Ronnie · 9 February 2026 · 8 min read',
    readTimeMinutes: 8,
    publishedDate: '2026-02-09',
    stats: [
      { value: '203 GW', label: 'Installed renewable capacity facing grid constraints' },
      { value: '₹3.4L Cr', label: 'Grid infrastructure investment required' },
      { value: '14%', label: 'Renewable curtailment rate in peak states' },
    ],
    statsSource: 'CEA Monthly Reports 2026; POSOCO data; MNRE',
    executiveSummary: "India has installed 203 GW of renewable energy capacity, but the grid cannot absorb it. Curtailment rates in Rajasthan and Tamil Nadu exceed 14%, effectively wasting billions in clean energy investment. This analysis examines the thermal-RE gap, the transmission bottleneck, and the ₹3.4 lakh crore investment needed to prevent India's renewable ambitions from hitting a wall.",
    siblings: ['energy-transition-playbook', 'carbon-playbook', 'carbon-market-outlook'],
    faq: [
      { question: 'Why is India curtailing renewable energy?', answer: "India's transmission grid was built for centralized thermal power plants. Renewable capacity is concentrated in specific states (Rajasthan, Tamil Nadu, Gujarat) but demand centres are elsewhere. Without adequate inter-state transmission, excess RE generation is curtailed." },
      { question: 'How much renewable energy is being wasted?', answer: 'Peak curtailment rates exceed 14% in states like Rajasthan and Tamil Nadu. Nationally, an estimated 8-10% of potential renewable generation is lost due to grid constraints.' },
      { question: 'What investment is needed to fix the grid?', answer: 'The Central Electricity Authority estimates ₹3.4 lakh crore in transmission infrastructure investment is required by 2030 to absorb the planned 500 GW renewable capacity.' },
      { question: 'How does grid curtailment affect carbon markets?', answer: 'Curtailed renewable energy means higher than necessary carbon emissions, reducing the credibility of India\'s net-zero pathway and affecting carbon credit supply projections.' },
    ],
    midArticleCta: { type: 'flagship', flagshipSlug: 'energy-transition-playbook', flagshipTitle: 'The Energy Transition Playbook for India' },
  },

  'working-for-the-earth': {
    slug: 'working-for-the-earth',
    title: 'Working for the Earth: A Dialectic Discourse',
    subtitle: 'Those who protect the Earth are among the least protected',
    contentType: 'Intelligence Brief',
    topic: 'ESG Communications',
    metaTitle: "Working for the Earth: Climate Workers' Crisis | Bombay Breed",
    metaDescription: "The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth are among the least protected themselves.",
    metaLine: 'By Theresa Ronnie · 6 February 2026 · 14 min read',
    readTimeMinutes: 14,
    publishedDate: '2026-02-06',
    executiveSummary: "The planet's most urgent crisis demands its most essential workers. Yet those who protect the Earth - renewable energy installers, forest rangers, waste workers, climate researchers - are among the least protected, lowest paid, and most precarious in the global labour market. This analysis examines the contradiction at the heart of the green transition.",
    siblings: ['green-jobs-india-2026', 'wef-global-risks-2026', 'india-renewable-grid-analysis'],
    faq: [
      { question: 'Who are climate workers?', answer: 'Climate workers include renewable energy installers, forest rangers, waste management workers, environmental researchers, conservation officers, and millions in sustainable agriculture - the frontline workforce of the green transition.' },
      { question: 'Why are green jobs often precarious?', answer: 'Many green jobs are project-based, seasonal, or in the informal sector. Solar installations are contract work. Forest conservation relies on short-term grants. Waste workers operate without formal employment protections.' },
      { question: 'What does a just transition mean for workers?', answer: 'A just transition ensures that the shift to a green economy creates decent work with fair wages, social protection, and worker voice - not just green jobs in name but quality employment in practice.' },
    ],
    midArticleCta: { type: 'flagship', flagshipSlug: 'green-jobs-india-2026', flagshipTitle: 'Jobs on the Rise 2026: India Green Jobs Outlook' },
  },

  'ccus-policy-gap': {
    slug: 'ccus-policy-gap',
    title: "India's CCUS Gap Is Not About Money",
    subtitle: 'Five Regulatory Instruments the Rs 20,000 Crore Mission Cannot Substitute',
    contentType: 'Flagship Report',
    topic: 'Regulatory Intel',
    metaTitle: "India's CCUS Policy Gap: Five Missing Regulatory Instruments | The Climate Desk",
    metaDescription: "Rs 20,000 crore allocated, but five regulatory gaps block India's CCUS deployment. Policy analysis on pore space law, sequestration incentives, and test infrastructure.",
    metaLine: 'By The Climate Desk · April 2026 · 12 pages',
    readTimeMinutes: 10,
    publishedDate: '2026-04-06',
    coverImage: ccusPolicyCover,
    stats: [
      { value: '₹20,000 Cr', label: 'CCUS Mission allocation, Union Budget 2026-27' },
      { value: '<₹2,000 Cr', label: 'Estimated actual deployment by March 2027' },
      { value: '750 MTPA', label: 'DST capture target by 2050' },
      { value: '5', label: 'Missing regulatory instruments blocking deployment' },
    ],
    statsSource: 'DST CCUS R&D Roadmap, December 2025; Union Budget 2026-27; V. Subramanian, Former Secretary MNRE',
    executiveSummary: "The Union Budget allocated Rs 20,000 crore. A national roadmap was published. The obligated industry base is real and growing. And still, the sector cannot move. The obstacle is not capital. It is the absence of five regulatory instruments that no allocation can substitute for - a milestone-based deployment plan, subsurface pore space legislation, indicative CCTS cycle targets, a per-tonne sequestration incentive, and open-access test infrastructure. This policy analysis, drawing on primary interviews with DST Task Force members, former MNRE secretaries, ONGC exploration heads, and CCUS investors, maps each gap and the precedents that exist to close them.",
    tableOfContents: [
      { title: 'A Deployment Plan, Not Just an Allocation', description: 'Why Rs 20,000 crore needs annual targets by sector and technology.' },
      { title: 'Geological Storage Has No Legal Owner', description: 'Subsurface pore space legislation: the US, Australia, and EU have it. India does not.' },
      { title: 'Industry Needs to Know What Cycle Two Looks Like', description: 'CCTS compliance timeline and why indicative GEI trajectories are urgent.' },
      { title: 'The Economics Need a Bridging Instrument', description: 'Sequestration cost vs. carbon price: the Rs 3,000-5,000/t gap.' },
      { title: 'The Technology Must Be Tested Before Scaled', description: 'Zero public CCUS test beds in India vs. global benchmarks.' },
      { title: 'Policy Readiness Assessment', description: 'Status of five critical regulatory prerequisites.' },
    ],
    siblings: ['carbon-playbook', 'compliance-to-credibility', 'energy-transition-playbook'],
    pdfUrl: 'TCD_CCUS_Policy_April2026.pdf',
  },

  'india-ndc-3': {
    slug: 'india-ndc-3',
    title: 'India NDC 3.0 - Complete Visual Analysis',
    subtitle: 'What India Promised the World at COP30',
    contentType: 'Intelligence Brief',
    topic: 'Regulatory Intel',
    metaTitle: 'India NDC 3.0: Complete Visual Analysis | Bombay Breed',
    metaDescription: "India's third Nationally Determined Contribution decoded - targets, timelines, sector pledges, and what it means for corporate India's climate strategy.",
    metaLine: 'By Theresa Ronnie · April 2026 · 12 min read',
    readTimeMinutes: 12,
    publishedDate: '2026-04-01',
    stats: [
      { value: '45%', label: 'Emissions intensity reduction target by 2030' },
      { value: '500 GW', label: 'Non-fossil fuel capacity commitment' },
      { value: '2070', label: 'Net-zero target year reaffirmed' },
    ],
    statsSource: 'PIB Press Release 2245209; UNFCCC NDC Registry; MoEFCC',
    executiveSummary: "India's third NDC submission marks a decisive shift from aspirational pledges to sector-specific commitments. This visual analysis decodes the full scope of India's climate promises - from the 45% emissions intensity reduction and 500 GW non-fossil capacity to nuclear expansion, forest carbon sinks, and the diplomatic architecture of climate justice. For corporate India, NDC 3.0 is the clearest regulatory signal yet.",
    siblings: ['carbon-playbook', 'compliance-to-credibility', 'energy-transition-playbook'],
    faq: [
      { question: 'What is NDC 3.0?', answer: "India's third Nationally Determined Contribution under the Paris Agreement, submitted ahead of COP30, outlining enhanced climate targets for 2030 and the pathway to net-zero by 2070." },
      { question: 'How does NDC 3.0 affect Indian businesses?', answer: 'NDC 3.0 signals tighter regulatory frameworks including CCTS expansion, enhanced BRSR requirements, and sector-specific decarbonisation mandates that directly impact compliance and capital allocation decisions.' },
      { question: 'What are the key targets in NDC 3.0?', answer: '45% emissions intensity reduction from 2005 levels by 2030, 500 GW non-fossil fuel capacity, 50% cumulative electric power from non-fossil sources, and creation of additional carbon sink of 2.5-3 billion tonnes CO₂ equivalent.' },
    ],
    midArticleCta: { type: 'flagship', flagshipSlug: 'carbon-playbook', flagshipTitle: "India's Carbon Playbook" },
  },
};

export function getInsight(slug: string): InsightData | undefined {
  return insights[slug];
}

export function getRelatedInsights(slugs: string[]): InsightData[] {
  return slugs.map(s => insights[s]).filter(Boolean).slice(0, 3);
}
