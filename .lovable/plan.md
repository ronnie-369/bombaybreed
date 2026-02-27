

## Plan: Add ProClime "Sounds of ProClime" Case Study

Add a new case study to the `/case-studies` page based on the Independence Day biodiversity campaign created for ProClime.

### New Case Study Entry

A 5th entry in the `caseStudies` array in `src/pages/CaseStudies.tsx`:

- **id**: `proclime-biodiversity-campaign`
- **sector**: Climate Awareness & Advocacy
- **sectorIcon**: `Leaf`
- **title**: Sounds of ProClime — India's National Anthem Recreated Using Sounds of Nature
- **challenge**: Climate action remains confined to policy papers and boardrooms. With 1.55 lakh species calling India home, how do you make biodiversity conservation personal and emotionally resonant for 1.4 billion people on Independence Day?
- **approach**: Conceived a creative campaign reimagining India's National Anthem using only sounds from nature — birdsong, insects, water, wind — to represent the 1.55 lakh species that share India's independence. Partnered with music producer Premik Jolly to compose the piece, built a teaser-to-launch rollout strategy, and secured multi-channel press coverage across national publications.
- **outcomes**:
  - 300,000+ YouTube engagements
  - Featured in The New Indian Express, Indiatimes, MediaBrief, and Passionate in Marketing
  - Campaign felicitated at IIT Roorkee
  - Showcased to the Minister of Environment; featured track played to A.R. Rahman
- **keywords**: Biodiversity, Climate Awareness, Creative Campaigning
- **relatedPages**: (empty array or links to relevant existing service pages)

### Implementation

Single file change to `src/pages/CaseStudies.tsx` — insert the new object into the `caseStudies` array (after the existing 4 entries, before the closing bracket).

