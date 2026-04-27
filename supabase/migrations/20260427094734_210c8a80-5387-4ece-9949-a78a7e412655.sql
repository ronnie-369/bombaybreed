-- ENUMS
CREATE TYPE public.tcd_subscription_status AS ENUM ('pending', 'active', 'paused', 'cancelled', 'expired');
CREATE TYPE public.tcd_payment_status AS ENUM ('pending', 'succeeded', 'failed', 'refunded');
CREATE TYPE public.tcd_billing_period AS ENUM ('monthly', 'quarterly', 'annual');

-- ============ TIERS ============
CREATE TABLE public.tcd_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price_inr NUMERIC NOT NULL DEFAULT 0,
  billing_period public.tcd_billing_period NOT NULL DEFAULT 'annual',
  rank INTEGER NOT NULL DEFAULT 0,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tcd_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active tiers"
  ON public.tcd_tiers FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage tiers"
  ON public.tcd_tiers FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_tcd_tiers_updated_at
  BEFORE UPDATE ON public.tcd_tiers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.tcd_tiers (slug, name, tagline, description, price_inr, billing_period, rank, features, sort_order)
VALUES
  ('foundational', 'Foundational',
   'Read the published intelligence layer.',
   'Access to all published Intelligence Briefs and Regulatory Alerts. Quarterly outlooks. Monthly digest.',
   24000, 'annual', 1,
   '["All published Intelligence Briefs", "Quarterly outlook reports", "Monthly digest email", "Search and filter the archive"]'::jsonb,
   1),
  ('professional', 'Professional',
   'Working library for active investors and operators.',
   'Everything in Foundational. Flagship reports on day of release. Sector deep dives. Two analyst Q&A submissions per quarter.',
   72000, 'annual', 2,
   '["Everything in Foundational", "Flagship reports on release day", "Sector and theme deep dives", "Two analyst Q&A submissions per quarter", "Downloadable data appendices"]'::jsonb,
   2),
  ('institutional', 'Institutional',
   'Full access plus direct analyst time.',
   'Everything in Professional. Pre-publication previews of selected reports. One private briefing per quarter with Theresa. Priority on bespoke research requests.',
   240000, 'annual', 3,
   '["Everything in Professional", "Pre-publication previews", "One private briefing per quarter", "Priority on bespoke research requests", "Named seat for up to three colleagues"]'::jsonb,
   3);

-- ============ SUBSCRIBERS ============
CREATE TABLE public.tcd_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT,
  designation TEXT,
  phone TEXT,
  country TEXT,
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tcd_subscribers_user ON public.tcd_subscribers(user_id);

ALTER TABLE public.tcd_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Subscribers can view their own record"
  ON public.tcd_subscribers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Subscribers can insert their own record"
  ON public.tcd_subscribers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Subscribers can update their own record"
  ON public.tcd_subscribers FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscribers"
  ON public.tcd_subscribers FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage subscribers"
  ON public.tcd_subscribers FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_tcd_subscribers_updated_at
  BEFORE UPDATE ON public.tcd_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ SUBSCRIPTIONS ============
CREATE TABLE public.tcd_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID NOT NULL REFERENCES public.tcd_subscribers(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES public.tcd_tiers(id) ON DELETE RESTRICT,
  status public.tcd_subscription_status NOT NULL DEFAULT 'pending',
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  provider TEXT,
  provider_subscription_id TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tcd_subscriptions_subscriber ON public.tcd_subscriptions(subscriber_id);
CREATE INDEX idx_tcd_subscriptions_status ON public.tcd_subscriptions(status);
CREATE UNIQUE INDEX idx_tcd_subscriptions_one_active_per_subscriber
  ON public.tcd_subscriptions(subscriber_id)
  WHERE status = 'active';

ALTER TABLE public.tcd_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Subscribers can view their own subscriptions"
  ON public.tcd_subscriptions FOR SELECT
  USING (
    subscriber_id IN (SELECT id FROM public.tcd_subscribers WHERE user_id = auth.uid())
  );

CREATE POLICY "Subscribers can insert their own pending subscriptions"
  ON public.tcd_subscriptions FOR INSERT
  WITH CHECK (
    subscriber_id IN (SELECT id FROM public.tcd_subscribers WHERE user_id = auth.uid())
    AND status = 'pending'
  );

CREATE POLICY "Admins can manage subscriptions"
  ON public.tcd_subscriptions FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_tcd_subscriptions_updated_at
  BEFORE UPDATE ON public.tcd_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PAYMENTS ============
CREATE TABLE public.tcd_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES public.tcd_subscriptions(id) ON DELETE CASCADE,
  amount_inr NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  provider TEXT NOT NULL DEFAULT 'mock',
  provider_payment_id TEXT,
  status public.tcd_payment_status NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tcd_payments_subscription ON public.tcd_payments(subscription_id);
CREATE INDEX idx_tcd_payments_status ON public.tcd_payments(status);

ALTER TABLE public.tcd_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Subscribers can view their own payments"
  ON public.tcd_payments FOR SELECT
  USING (
    subscription_id IN (
      SELECT s.id FROM public.tcd_subscriptions s
      JOIN public.tcd_subscribers sub ON sub.id = s.subscriber_id
      WHERE sub.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all payments"
  ON public.tcd_payments FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage payments"
  ON public.tcd_payments FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_tcd_payments_updated_at
  BEFORE UPDATE ON public.tcd_payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ REPORTS ============
CREATE TABLE public.tcd_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  body_html TEXT,
  category TEXT,
  required_tier_rank INTEGER NOT NULL DEFAULT 1,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  cover_image_url TEXT,
  reading_minutes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tcd_reports_published ON public.tcd_reports(is_published, published_at DESC);
CREATE INDEX idx_tcd_reports_required_tier ON public.tcd_reports(required_tier_rank);

ALTER TABLE public.tcd_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published report metadata"
  ON public.tcd_reports FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage reports"
  ON public.tcd_reports FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_tcd_reports_updated_at
  BEFORE UPDATE ON public.tcd_reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed one launch report (Foundational tier)
INSERT INTO public.tcd_reports (slug, title, summary, category, required_tier_rank, is_published, published_at, reading_minutes, body_html)
VALUES (
  'launch-note-tcd-intelligence',
  'Launch note: what TCD Intelligence covers',
  'A short read on the editorial scope, publishing cadence, and tier structure of TCD Intelligence.',
  'Editorial', 1, true, now(), 4,
  '<p>This launch note sets out what TCD Intelligence publishes, how often, and who it is for. The platform covers India climate policy, capital formation, and corporate disclosure with a single editorial voice and a refusal to oversimplify.</p>'
);

-- ============ REPORT VIEWS ============
CREATE TABLE public.tcd_report_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_id UUID REFERENCES public.tcd_subscribers(id) ON DELETE SET NULL,
  report_id UUID NOT NULL REFERENCES public.tcd_reports(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent TEXT
);

CREATE INDEX idx_tcd_report_views_subscriber ON public.tcd_report_views(subscriber_id);
CREATE INDEX idx_tcd_report_views_report ON public.tcd_report_views(report_id);
CREATE INDEX idx_tcd_report_views_viewed ON public.tcd_report_views(viewed_at DESC);

ALTER TABLE public.tcd_report_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Subscribers can view their own report views"
  ON public.tcd_report_views FOR SELECT
  USING (
    subscriber_id IN (SELECT id FROM public.tcd_subscribers WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can view all report views"
  ON public.tcd_report_views FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage report views"
  ON public.tcd_report_views FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ============ ACCESS HELPERS ============

-- Returns the current user's active subscription tier rank, or 0.
CREATE OR REPLACE FUNCTION public.tcd_current_tier_rank()
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(MAX(t.rank), 0)
  FROM public.tcd_subscriptions s
  JOIN public.tcd_subscribers sub ON sub.id = s.subscriber_id
  JOIN public.tcd_tiers t ON t.id = s.tier_id
  WHERE sub.user_id = auth.uid()
    AND s.status = 'active'
    AND (s.expires_at IS NULL OR s.expires_at > now())
$$;

-- Returns true if the current user can access a given report slug.
CREATE OR REPLACE FUNCTION public.tcd_user_has_report_access(_report_slug TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _required INTEGER;
  _user_rank INTEGER;
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  IF has_role(auth.uid(), 'admin'::app_role) THEN RETURN true; END IF;

  SELECT required_tier_rank INTO _required
  FROM public.tcd_reports
  WHERE slug = _report_slug AND is_published = true;

  IF _required IS NULL THEN RETURN false; END IF;

  SELECT public.tcd_current_tier_rank() INTO _user_rank;
  RETURN _user_rank >= _required;
END;
$$;

-- Logs a report view for the current authenticated subscriber.
CREATE OR REPLACE FUNCTION public.tcd_log_report_view(_report_slug TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _subscriber UUID;
  _report UUID;
  _view UUID;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT id INTO _subscriber FROM public.tcd_subscribers WHERE user_id = auth.uid();
  SELECT id INTO _report FROM public.tcd_reports WHERE slug = _report_slug AND is_published = true;

  IF _report IS NULL THEN
    RAISE EXCEPTION 'Report not found or not published: %', _report_slug;
  END IF;

  INSERT INTO public.tcd_report_views (subscriber_id, report_id)
  VALUES (_subscriber, _report)
  RETURNING id INTO _view;

  RETURN _view;
END;
$$;