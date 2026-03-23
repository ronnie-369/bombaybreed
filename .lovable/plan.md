

## Problem

The "View Credentials" button in `ExecutiveHero` calls `scrollToTrackRecord()` which looks for `document.getElementById('track-record')`. However, the `TrackRecord` component is **not rendered on the Index page**, so the element doesn't exist and nothing happens.

## Fix

**File: `src/pages/Index.tsx`**

Import and add the `TrackRecord` component to the homepage. The logical placement is after `ProofStat` (which shows high-level numbers) and before `ServicePillars`, so users scroll from the hero → logos → stats → credentials → services.

```
Import TrackRecord from '@/components/TrackRecord'
Place <TrackRecord /> between <ProofStat /> and <ServicePillars />
```

This is a one-line import + one-line insertion. No other files need changes.

