## What's wrong

The Premium Access Lounge (`src/pages/insights/PremiumAccessLounge.tsx`) has two CTAs:

- "Industry Reader" → `/intelligence/membership?tier=industry-reader&v=A&ref=insights`
- "Analyst Lens" → `/intelligence/membership?tier=analyst-lens&v=A&ref=insights`

But `src/intelligence/pages/Membership.tsx`:

1. **Ignores `?tier=` entirely.** It only reads `?reason=inactive`. So clicking either CTA drops the user on the generic "Three tiers. One editorial line." overview with all three cards. The user has to re-pick a tier they already chose - dead conversion step.
2. **Slug mismatch.** The DB tiers are stored as `foundational` / `professional` (confirmed by `TIER_TO_PLAN` in `Checkout.tsx`), but the Lounge passes `industry-reader` / `analyst-lens`. Even if Membership tried to match, it wouldn't find the tier.
3. **Skips signup/checkout.** A user coming from the Lounge has already declared intent. They should be moving toward `/intelligence/signup?tier=...` (or `/intelligence/checkout?tier=...` if logged in), not browsing tiers again.
4. **Loses attribution.** `v=A` (A/B variant) and `ref=insights` are dropped on the floor - no way to attribute conversions back to the Lounge experiment.

## What it needs to be

When `/intelligence/membership` receives a `?tier=` param that resolves to a known tier, it should behave as a **focused tier landing page** (single tier, prominent CTA straight into signup/checkout) rather than the generic overview. When no `?tier=` is present, keep current behaviour.

### Changes

**1. Slug normalisation** (`src/intelligence/pages/Membership.tsx`)

Add a small alias map so Lounge-style slugs resolve to DB slugs:

```text
industry-reader → foundational
analyst-lens    → professional
```

Apply to the `?tier=` value before lookup.

**2. Focused view when ?tier= matches**

If the resolved slug matches an active tier:
- Replace the H1 "Three tiers. One editorial line." with a tier-specific headline (e.g. "Industry Reader - working research for India climate operators.").
- Render that tier's card prominently (full width on mobile, ~two-thirds on desktop), with the price + INR/USD/EUR bracket already in place via `formatIntlBracket`.
- Primary CTA: "Continue to signup" → `/intelligence/signup?tier={dbSlug}` (preserving `v` and `ref` query params for attribution).
- Secondary link: "Compare all three tiers" that toggles back to the full grid (or scrolls to it / clears the param).
- Keep the other two tiers visible below as a smaller "Other tiers" strip so the user can switch without bouncing back.

**3. Preserve attribution**

Forward `v` and `ref` query params onto the signup/checkout link so the existing analytics on `Signup.tsx` / `Checkout.tsx` can pick them up.

**4. SEO/meta**

Update `<Helmet>` title dynamically when a tier is selected (e.g. "Industry Reader membership - TCD Intelligence") so deep-linked pages are distinct.

**5. Logged-in shortcut (optional, low risk)**

If a session exists, point the primary CTA directly at `/intelligence/checkout?tier={dbSlug}` instead of signup. `Signup.tsx` already redirects logged-in users there, so this just removes one hop.

### Files touched

- `src/intelligence/pages/Membership.tsx` - read `?tier=`, alias-map, branch render, forward attribution params, dynamic meta.

### Out of scope

- No DB changes. Tier slugs in `tcd_tiers` stay as `foundational` / `professional`; the alias map lives in the page so the public-facing URLs from the Lounge remain stable.
- No changes to `PremiumAccessLounge.tsx`, `Signup.tsx`, or `Checkout.tsx`.
