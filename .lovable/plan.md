

# Refine Green Jobs Guide Messaging

Adjust existing copy across the guide page and homepage teaser to clearly frame the quiz as indicative, aimed at college graduates entering the workforce, and shareable. No new sections or components -- just targeted copy edits.

## Changes

### 1. Homepage Teaser (`src/components/GreenJobsTeaser.tsx`)

- Update subtitle to address college graduates: "Graduating soon? 375 million net new jobs are coming by 2035..."
- Add a one-liner below the CTA: "Know someone planning their first job? Share this quiz with them."

### 2. Guide Page Hero (lines 385-412 in `GreenJobsGuide.tsx`)

- Update subtitle copy to say this guide is for college graduates and early-career professionals choosing a work stream
- Add a short line: "This quiz covers select archetypes -- the actual green economy spans hundreds of roles across every industry."

### 3. Personality Quiz Section (lines 457-461)

- Update the intro body text to frame the four archetypes as starting points, not an exhaustive list
- Add academic stream hints to each personality's `tagline` or `vibe` field so readers can self-select based on their degree:
  - Builder: Engineering, vocational/trades, applied sciences
  - Earth Keeper: Life sciences, agriculture, ecology, geography
  - Systems Thinker: STEM, economics, finance, data science, MBA
  - Catalyst: Social sciences, humanities, law, development studies, education

### 4. Personality Results Section (around line 552)

- After "Your top 5 career matches" heading, add a short note: "These are indicative roles for your archetype. The green economy offers many more career paths across sectors -- explore widely."

### 5. Bottom Line Section (lines 563-586)

- Add a share prompt after the 4 steps box: "Know a college student or fresh graduate figuring out their first career move? Share this guide with them." with a copy-link or native share button

## Technical Details

All changes are copy/text edits within existing elements -- no new components, no new state, no new dependencies. The academic stream hints will be added as a new `academicFit` field on each personality object and rendered as a small line under the tagline on the PersonalityCard. The share prompt will use `navigator.share` with a `navigator.clipboard` fallback.

| File | Lines affected | Type |
|------|---------------|------|
| `src/components/GreenJobsTeaser.tsx` | ~38-40, ~67-69 | Copy edit + share line |
| `src/pages/GreenJobsGuide.tsx` | ~50-115 (personality data), ~388-393, ~458-461, ~552-553, ~572-584 | Copy edits + academicFit field + share CTA |

