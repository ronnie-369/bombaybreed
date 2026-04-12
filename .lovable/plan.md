

## Plan: Add CEO Testimonial to GH2 India Case Study

### What we're doing
Add a testimonial quote from the GH2 India CEO to the GH2 India Annual Report 2025 case study on the `/case-studies` page. The quote should highlight the short-notice engagement and successful outcome.

### Change required
Update the GH2 India case study object in `caseStudies` array (line 67-92 in `src/pages/CaseStudies.tsx`) to include a `testimonial` field matching the structure used by the Creative Effectiveness Sprint case study.

### Implementation
Insert this testimonial object into the GH2 India case study:
- **Quote**: About reaching out on short notice, stepping in to help, creating a stunning annual report, and positive industry reception
- **Attribution**: CEO, GH2 India

The testimonial will render automatically via the existing conditional block at lines 246-255 that displays gold-accented blockquotes for any case study containing a testimonial.

### File to modify
- `src/pages/CaseStudies.tsx` - Add testimonial field to the `gh2-india-annual-report` case study object

