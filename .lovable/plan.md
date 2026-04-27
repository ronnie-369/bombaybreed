# Members' room copy + hyperlink reader orgs on /insights

Two small, independent edits to `src/pages/insights/PremiumAccessLounge.tsx`. Both are content/UI only - no logic, no dependencies.

## 1. Replace Members Only zone body copy (locked)

Card on the hero of `/insights`. Headline and CTA stay as is.

**New body (lines 440-444):**

> Carbon markets are hard. The right call is harder. The kind of call you would normally pay a sell-side desk six figures for - written for people who move capital. A small members' room, by design.

Renders inside the existing `<p className="text-[15px] sm:text-base text-background/75 leading-relaxed mb-6 [text-wrap:pretty] max-w-[46ch]">`. Uses `&rsquo;` for the apostrophe in "members'" to match the existing CTA below it. Hyphens only, no em dashes (per project standard).

## 2. Hyperlink the two reader orgs in Quotes from Readers

Make the org name under the reader quote clickable when a public URL exists.

- **Negative Emissions Platform** -> `https://negativeemissionsplatform.eu`
- **The Energy Mix** -> `https://www.theenergymix.com`
- **EU** (Christian Haberli) -> stays as plain text (not a real org URL)

Implementation:

- Extend `QUOTES` (lines 52-71) with optional `orgHref?: string`; set on the two quotes above.
- In the figure render (around line 474), wrap `q.org` in `<a target="_blank" rel="noopener noreferrer">` when `orgHref` is set.
- Link styling: 1px underline in `decoration-border`, brightening to `decoration-foreground` and `text-foreground` on hover. Editorial tone, no SaaS-blue, no link icon.

## Out of scope

- Touching the headline, CTA, padding, colours or layout of the Members Only card.
- Linking the reader name itself - quotes endorse the publication, not a personal page.
- Any other section of the page.
