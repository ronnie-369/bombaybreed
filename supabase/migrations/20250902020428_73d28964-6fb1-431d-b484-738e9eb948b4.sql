-- Fix security vulnerability in newsletter_subscribers table

-- Drop all existing UPDATE policies
DROP POLICY IF EXISTS "Anyone can update their newsletter subscription" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow unsubscribe with valid token" ON public.newsletter_subscribers;

-- Create a secure unsubscribe mechanism using an unsubscribe token
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS unsubscribe_token UUID DEFAULT gen_random_uuid();

-- Create index for efficient token lookups
DROP INDEX IF EXISTS idx_newsletter_unsubscribe_token;
CREATE INDEX idx_newsletter_unsubscribe_token ON public.newsletter_subscribers(unsubscribe_token);

-- Create a secure function to handle unsubscribe requests
CREATE OR REPLACE FUNCTION public.unsubscribe_newsletter(token UUID)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result_record RECORD;
BEGIN
  -- Update the subscription record if token matches and subscription is active
  UPDATE newsletter_subscribers 
  SET 
    is_active = false,
    unsubscribed_at = now(),
    updated_at = now()
  WHERE 
    unsubscribe_token = token 
    AND is_active = true
  RETURNING email, subscribed_at INTO result_record;
  
  -- Return success/failure result
  IF result_record.email IS NOT NULL THEN
    RETURN json_build_object(
      'success', true,
      'message', 'Successfully unsubscribed',
      'email', result_record.email
    );
  ELSE
    RETURN json_build_object(
      'success', false,
      'message', 'Invalid or already used unsubscribe token'
    );
  END IF;
END;
$$;

-- No UPDATE policies needed - unsubscribes handled via secure function only