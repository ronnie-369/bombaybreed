-- Create secure storage for contact form data and newsletter subscriptions

-- Contact inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contact inquiries
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on newsletter subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS policies for contact inquiries (admin access only when auth is implemented)
CREATE POLICY "Authenticated admins can view contact inquiries" 
ON public.contact_inquiries 
FOR SELECT 
USING (false); -- Temporarily restrictive until admin auth is implemented

CREATE POLICY "Anyone can submit contact inquiries with valid data" 
ON public.contact_inquiries 
FOR INSERT 
WITH CHECK (
  name IS NOT NULL 
  AND length(trim(name)) > 0 
  AND email IS NOT NULL 
  AND length(trim(email)) > 0 
  AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND message IS NOT NULL 
  AND length(trim(message)) > 0
);

-- RLS policies for newsletter subscribers
CREATE POLICY "Authenticated admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (false); -- Temporarily restrictive until admin auth is implemented

CREATE POLICY "Anyone can subscribe to newsletter with valid email" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (
  email IS NOT NULL 
  AND length(trim(email)) > 0 
  AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

CREATE POLICY "Anyone can update their newsletter subscription" 
ON public.newsletter_subscribers 
FOR UPDATE 
USING (true)
WITH CHECK (
  email IS NOT NULL 
  AND length(trim(email)) > 0 
  AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_contact_inquiries_updated_at
BEFORE UPDATE ON public.contact_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at
BEFORE UPDATE ON public.newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();