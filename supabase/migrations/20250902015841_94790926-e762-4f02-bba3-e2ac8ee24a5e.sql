-- Create new contact submissions table with proper structure
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  designation TEXT,
  company_name TEXT,
  phone TEXT,
  marketing_consent BOOLEAN NOT NULL DEFAULT true,
  report_requested TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Simple insert policy for anonymous users
CREATE POLICY "Allow anonymous contact submissions" ON public.contact_submissions
FOR INSERT 
WITH CHECK (
  name IS NOT NULL AND length(trim(name)) > 0 AND
  email IS NOT NULL AND length(trim(email)) > 0 AND
  email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
  report_requested IS NOT NULL AND length(trim(report_requested)) > 0 AND
  marketing_consent IS NOT NULL
);

-- Service role can read submissions
CREATE POLICY "Service role can view submissions" ON public.contact_submissions
FOR SELECT 
USING (auth.jwt() ->> 'role' = 'service_role');

-- Grant permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.contact_submissions TO anon;

-- Add update trigger for updated_at
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();