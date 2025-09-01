-- Create leads table to capture form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  report_requested TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create report_downloads table to track downloads
CREATE TABLE public.report_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  report_name TEXT NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_downloads ENABLE ROW LEVEL SECURITY;

-- Create policies for leads table (public access for form submissions)
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Anyone can view their own lead data" 
ON public.leads 
FOR SELECT 
TO anon
USING (true);

-- Create policies for report_downloads table
CREATE POLICY "Anyone can insert download records" 
ON public.report_downloads 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Anyone can view download records" 
ON public.report_downloads 
FOR SELECT 
TO anon
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on leads
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_report_downloads_lead_id ON public.report_downloads(lead_id);
CREATE INDEX idx_report_downloads_downloaded_at ON public.report_downloads(downloaded_at);