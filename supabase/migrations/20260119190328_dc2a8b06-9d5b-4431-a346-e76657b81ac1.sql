-- Create table to cache blog posts
CREATE TABLE public.cached_blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  gradient TEXT NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_cached_blog_posts_fetched_at ON public.cached_blog_posts(fetched_at DESC);

-- Enable RLS
ALTER TABLE public.cached_blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access (blog posts are public content)
CREATE POLICY "Anyone can view cached blog posts"
ON public.cached_blog_posts
FOR SELECT
USING (true);

-- Only service role can modify cache (edge function uses service role)
CREATE POLICY "Service role can manage cached blog posts"
ON public.cached_blog_posts
FOR ALL
USING ((auth.jwt() ->> 'role') = 'service_role')
WITH CHECK ((auth.jwt() ->> 'role') = 'service_role');

-- Create trigger for updated_at
CREATE TRIGGER update_cached_blog_posts_updated_at
BEFORE UPDATE ON public.cached_blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();