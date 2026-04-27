-- A/B test event log for landing-page CTA experiments.
-- Anonymous visitors can INSERT (write-only); only admins can SELECT.
-- No PII is collected (no email, no IP).
CREATE TABLE public.ab_experiments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  experiment TEXT NOT NULL,            -- e.g. 'subscribe_cta_industry_reader'
  variant TEXT NOT NULL,               -- 'A' (control) or 'B' (challenger)
  event_type TEXT NOT NULL,            -- 'assignment' | 'click' | 'conversion'
  visitor_id TEXT NOT NULL,            -- random uuid stored in localStorage
  page_path TEXT,                      -- /insights, /intelligence/membership, etc.
  device_type TEXT,                    -- 'mobile' | 'tablet' | 'desktop'
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT ab_experiments_variant_check CHECK (variant IN ('A','B')),
  CONSTRAINT ab_experiments_event_type_check
    CHECK (event_type IN ('assignment','click','conversion'))
);

ALTER TABLE public.ab_experiments ENABLE ROW LEVEL SECURITY;

-- Anonymous + authenticated visitors can write events (write-only).
CREATE POLICY "Anyone can log AB experiment events"
ON public.ab_experiments
FOR INSERT
TO public
WITH CHECK (
  experiment IS NOT NULL
  AND length(trim(experiment)) > 0
  AND visitor_id IS NOT NULL
  AND length(trim(visitor_id)) > 0
);

-- Only admins can read results (PII-free, but keep it tight).
CREATE POLICY "Admins can view AB experiment events"
ON public.ab_experiments
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- No update / delete policies => writes are immutable.

CREATE INDEX idx_ab_experiments_lookup
  ON public.ab_experiments (experiment, variant, event_type, created_at DESC);

CREATE INDEX idx_ab_experiments_visitor
  ON public.ab_experiments (visitor_id, experiment);