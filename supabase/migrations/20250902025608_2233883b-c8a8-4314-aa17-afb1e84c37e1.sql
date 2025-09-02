-- Contact submissions table with bigint ID
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  designation text,
  company_name text,
  phone text,
  marketing_consent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create index for quick email lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
  ON public.contact_submissions(email);

-- Report downloads table with bigint references
CREATE TABLE IF NOT EXISTS public.report_downloads (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lead_id bigint NOT NULL REFERENCES public.contact_submissions(id) ON DELETE CASCADE,
  report_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index for analytics
CREATE INDEX IF NOT EXISTS idx_report_downloads_lead_id
  ON public.report_downloads(lead_id);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_downloads ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous inserts (but not selects)
DO $$
BEGIN
  -- Policy for contact_submissions inserts
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'contact_submissions' 
    AND policyname = 'insert_contact_submissions'
  ) THEN
    CREATE POLICY insert_contact_submissions
      ON public.contact_submissions
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;

  -- Policy for report_downloads inserts  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'report_downloads' 
    AND policyname = 'insert_report_downloads'
  ) THEN
    CREATE POLICY insert_report_downloads
      ON public.report_downloads
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END$$;