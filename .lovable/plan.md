

## Streamline Website Navigation & Content

### Problem
The site has significant content overlap and too many top-level pages:
- **About** and **Credentials** duplicate Theresa's bio, portrait, experience stats, and Erik Solheim quote
- **Insights** and **Resources** both serve reports/analysis content with similar layouts
- Header has 6 nav items + Contact button — too many for a lean advisory brand
- Footer has 9 quick links

### Plan

**1. Merge About + Credentials → single `/about` page**
- Combine the "Why Carbon Communications Matters" + "Our Approach" sections from About with the client logos, testimonials, and experience grid from Credentials
- Structure: Hero → Gap We Fill → Founder Bio (with portrait + stats) → Client Logos → Testimonials → CTA
- Remove the standalone Credentials page component; redirect `/credentials` → `/about`

**2. Merge Insights + Resources → single `/insights` page**
- Lead with the featured insights cards, then the featured reports carousel from Resources, then topic clusters, then full publication archive with search/filters, then Climate Desk newsletter CTA
- Remove the standalone Resources page component; redirect `/resources` → `/insights`

**3. Simplify Header navigation**
- Reduce to: **Home, About, Services, Insights, Contact**
- Remove "Resources" and "Credentials" from nav
- Keep the Services mega menu as-is (it's well-structured for SEO)

**4. Simplify Footer**
- Reduce Quick Links to: Home, About, Services, Insights, Case Studies, Privacy Policy
- Remove Carbon Market Tracker and Newsletter from quick links (accessible via Insights page)
- Keep Services column and Stay Connected column unchanged

**5. Add route redirects in App.tsx**
- `/credentials` → `<Navigate to="/about" replace />`
- `/resources` → `<Navigate to="/insights" replace />`
- Preserves SEO equity from any existing backlinks

### Files Changed
- `src/pages/About.tsx` — rewrite to incorporate Credentials content (client logos, testimonials, experience grid)
- `src/pages/Insights.tsx` — rewrite to incorporate Resources content (reports archive, search, filters, lead capture form)
- `src/components/Header.tsx` — remove "Resources" and "Credentials" nav links
- `src/components/Footer.tsx` — reduce quick links
- `src/App.tsx` — add redirects for `/credentials` → `/about` and `/resources` → `/insights`; remove lazy imports for old pages
- Delete: `src/pages/Credentials.tsx`, `src/pages/Resources.tsx` (after merging content)

