import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// In-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Dynamic CORS with origin validation
const getAllowedOrigins = (): string[] => {
  const env = Deno.env.get('ALLOWED_ORIGINS');
  if (env) return env.split(',').map((o) => o.trim()).filter(Boolean);
  return [
    'https://zjiwmdrtuhsrymsuvpfb.lovableproject.com',
    'http://localhost:5173',
    'http://localhost:3000',
  ];
};

const isOriginAllowed = (origin: string | null): boolean => {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  if (allowed.includes(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    // Allow Lovable preview domains
    if (hostname.endsWith('.lovableproject.com')) return true;
    if (hostname.endsWith('.lovable.app')) return true;
    // Allow production domain
    if (hostname.endsWith('.bombaybreed.com') || hostname === 'bombaybreed.com') return true;
    // Allow localhost for development
    if (hostname === 'localhost' && (protocol === 'http:' || protocol === 'https:')) return true;
  } catch (_) {
    // ignore parse errors
  }
  return false;
};

const getCorsHeaders = (origin: string | null): Record<string, string> => {
  const allow = isOriginAllowed(origin);
  const fallback = getAllowedOrigins()[0];
  return {
    'Access-Control-Allow-Origin': allow && origin ? origin : fallback,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };
};

interface BlogPost {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  url: string;
  image: string;
  date: string;
  gradient: string;
}

// Cache TTL in milliseconds (1 hour)
const CACHE_TTL_MS = 60 * 60 * 1000;

// Gradient options to cycle through
const gradients = [
  'from-emerald-600 to-teal-600',
  'from-blue-600 to-indigo-600',
  'from-purple-600 to-pink-600',
  'from-orange-600 to-red-600',
  'from-green-600 to-emerald-600',
  'from-cyan-600 to-blue-600',
];

function extractImageFromContent(content: string): string | null {
  // Try to find img src in content
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) {
    return imgMatch[1];
  }
  
  // Try to find image from enclosure or media content
  const mediaMatch = content.match(/https:\/\/substackcdn\.com\/image\/fetch\/[^"'\s<>]+/i);
  if (mediaMatch) {
    return mediaMatch[0];
  }
  
  return null;
}

function parseXML(xml: string): BlogPost[] {
  const posts: BlogPost[] = [];
  
  // Match all <item> elements
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let itemMatch;
  let index = 0;
  
  while ((itemMatch = itemRegex.exec(xml)) !== null && posts.length < 10) {
    const item = itemMatch[1];
    
    // Extract title
    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i) 
      || item.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // Extract link
    const linkMatch = item.match(/<link>(.*?)<\/link>/i);
    const url = linkMatch ? linkMatch[1].trim() : '';
    
    // Extract description
    const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/is)
      || item.match(/<description>(.*?)<\/description>/is);
    let description = descMatch ? descMatch[1].trim() : '';
    
    // Clean HTML from description
    description = description.replace(/<[^>]+>/g, '').trim();
    // Truncate description
    if (description.length > 200) {
      description = description.substring(0, 200).trim() + '...';
    }
    
    // Extract date
    const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/i);
    let date = '';
    if (dateMatch) {
      const pubDate = new Date(dateMatch[1]);
      date = pubDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
    
    // Extract image from content:encoded
    const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i)
      || item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i);
    let image = null;
    if (contentMatch) {
      image = extractImageFromContent(contentMatch[1]);
    }
    
    // Try media:content or enclosure as fallback
    if (!image) {
      const mediaMatch = item.match(/<media:content[^>]+url=["']([^"']+)["']/i)
        || item.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
      if (mediaMatch) {
        image = mediaMatch[1];
      }
    }
    
    // Default image if none found
    if (!image) {
      image = 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&auto=format&fit=crop';
    }
    
    // Create ID from title
    const id = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
    
    posts.push({
      id: id || `post-${index}`,
      title,
      subtitle: null,
      description,
      url,
      image,
      date,
      gradient: gradients[index % gradients.length],
    });
    
    index++;
  }
  
  return posts;
}

// Create Supabase client with service role for cache management
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(supabaseUrl, serviceRoleKey);
}

// Check if cache is valid (less than 1 hour old)
async function getCachedPosts(supabase: ReturnType<typeof createClient>): Promise<{ posts: BlogPost[], isValid: boolean, fetchedAt: string | null }> {
  const { data, error } = await supabase
    .from('cached_blog_posts')
    .select('*')
    .order('fetched_at', { ascending: false })
    .limit(10);

  if (error || !data || data.length === 0) {
    return { posts: [], isValid: false, fetchedAt: null };
  }

  const latestFetchedAt = new Date(data[0].fetched_at);
  const now = new Date();
  const isValid = (now.getTime() - latestFetchedAt.getTime()) < CACHE_TTL_MS;

  const posts: BlogPost[] = data.map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    url: row.url,
    image: row.image,
    date: row.date,
    gradient: row.gradient,
  }));

  return { posts, isValid, fetchedAt: latestFetchedAt.toISOString() };
}

// Update cache with fresh posts
async function updateCache(supabase: ReturnType<typeof createClient>, posts: BlogPost[]): Promise<void> {
  const now = new Date().toISOString();
  
  // Delete old cache entries
  await supabase.from('cached_blog_posts').delete().neq('id', '');

  // Insert fresh posts
  const rows = posts.map((post) => ({
    id: post.id,
    title: post.title,
    subtitle: post.subtitle,
    description: post.description,
    url: post.url,
    image: post.image,
    date: post.date,
    gradient: post.gradient,
    fetched_at: now,
  }));

  const { error } = await supabase.from('cached_blog_posts').insert(rows);
  if (error) {
    console.error('Failed to update cache:', error);
  } else {
    console.log(`Cache updated with ${posts.length} posts`);
  }
}

// Fetch fresh posts from Substack RSS
async function fetchFreshPosts(): Promise<BlogPost[]> {
  const rssUrl = 'https://theclimatedesk.substack.com/feed';
  
  const response = await fetch(rssUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; BlogFetcher/1.0)',
      'Accept': 'application/rss+xml, application/xml, text/xml',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
  }
  
  const xml = await response.text();
  return parseXML(xml);
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: 'Too many requests', posts: [] }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60', ...corsHeaders },
    });
  }

  // Block requests from non-allowed origins
  if (!isOriginAllowed(origin)) {
    console.warn('CORS: blocked origin for fetch-blog-posts', { origin });
    return new Response(JSON.stringify({ error: 'Origin not allowed', posts: [] }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  // Check for force refresh param
  const url = new URL(req.url);
  const forceRefresh = url.searchParams.get('refresh') === 'true';

  try {
    const supabase = getSupabaseClient();
    
    // Try to get cached posts first
    const cached = await getCachedPosts(supabase);
    
    if (cached.isValid && cached.posts.length > 0 && !forceRefresh) {
      console.log('Returning cached blog posts');
      return new Response(
        JSON.stringify({ 
          success: true, 
          posts: cached.posts,
          fetchedAt: cached.fetchedAt,
          cached: true,
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600',
          } 
        }
      );
    }

    // Cache is stale or empty, fetch fresh posts
    console.log('Cache stale or empty, fetching fresh posts...');
    const posts = await fetchFreshPosts();
    console.log(`Fetched ${posts.length} fresh blog posts`);

    // Update cache in background (don't await to avoid blocking response)
    updateCache(supabase, posts).catch((err) => console.error('Cache update failed:', err));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        posts,
        fetchedAt: new Date().toISOString(),
        cached: false,
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        } 
      }
    );
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    // Try to return stale cache on error
    try {
      const supabase = getSupabaseClient();
      const cached = await getCachedPosts(supabase);
      if (cached.posts.length > 0) {
        console.log('Returning stale cache due to fetch error');
        return new Response(
          JSON.stringify({ 
            success: true, 
            posts: cached.posts,
            fetchedAt: cached.fetchedAt,
            cached: true,
            stale: true,
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
            } 
          }
        );
      }
    } catch (cacheError) {
      console.error('Failed to fetch stale cache:', cacheError);
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        posts: [], 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
        } 
      }
    );
  }
});
