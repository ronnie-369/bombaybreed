CREATE OR REPLACE FUNCTION public.tcd_mock_activate_subscription(_tier_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user UUID := auth.uid();
  _email TEXT;
  _subscriber UUID;
  _subscription UUID;
  _price NUMERIC;
BEGIN
  IF _user IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT price_inr INTO _price
  FROM public.tcd_tiers
  WHERE id = _tier_id AND is_active = true;

  IF _price IS NULL THEN
    RAISE EXCEPTION 'Invalid or inactive tier';
  END IF;

  SELECT email INTO _email FROM auth.users WHERE id = _user;

  SELECT id INTO _subscriber FROM public.tcd_subscribers WHERE user_id = _user;
  IF _subscriber IS NULL THEN
    INSERT INTO public.tcd_subscribers (user_id, email, full_name)
    VALUES (_user, COALESCE(_email, ''), COALESCE(split_part(_email, '@', 1), 'Member'))
    RETURNING id INTO _subscriber;
  END IF;

  -- Cancel any prior active subscriptions so rank lookups remain deterministic
  UPDATE public.tcd_subscriptions
     SET status = 'cancelled', cancelled_at = now()
   WHERE subscriber_id = _subscriber AND status = 'active';

  INSERT INTO public.tcd_subscriptions (
    subscriber_id, tier_id, status, starts_at, expires_at, provider
  ) VALUES (
    _subscriber, _tier_id, 'active', now(), now() + INTERVAL '1 year', 'mock'
  )
  RETURNING id INTO _subscription;

  INSERT INTO public.tcd_payments (
    subscription_id, amount_inr, currency, provider, status, paid_at, metadata
  ) VALUES (
    _subscription, _price, 'INR', 'mock', 'succeeded', now(),
    jsonb_build_object('note', 'Mock checkout. Real payment provider pending.')
  );

  RETURN _subscription;
END;
$$;

REVOKE ALL ON FUNCTION public.tcd_mock_activate_subscription(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.tcd_mock_activate_subscription(UUID) TO authenticated;