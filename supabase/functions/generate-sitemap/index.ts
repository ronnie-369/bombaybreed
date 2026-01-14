import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = 'https://bombaybreed.lovable.app';

interface SitemapPage {
  slug: string;
  page_type: string;
  priority: number;
  updated_at: string;
}

const generateSitemapXml = (pages: SitemapPage[], changefreq = 'weekly'): string => {
  const urls = pages.map(page => `
  <url>
    <loc>${SITE_URL}/${page.slug}</loc>
    <lastmod>${new Date(page.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${(page.priority / 100).toFixed(2)}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${SITE_URL}/resources</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${SITE_URL}/credentials</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>${urls}
</urlset>`;
};

const generateSitemapIndex = (sitemapTypes: string[]): string => {
  const sitemaps = sitemapTypes.map(type => `
  <sitemap>
    <loc>${SITE_URL}/api/sitemap-${type}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps}
</sitemapindex>`;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop() || '';
    
    // Extract sitemap type from path
    let sitemapType = 'all';
    if (path.includes('sitemap-')) {
      sitemapType = path.replace('sitemap-', '').replace('.xml', '');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate sitemap index
    if (sitemapType === 'index' || path === 'sitemap-index.xml') {
      const xml = generateSitemapIndex(['capabilities', 'industries', 'geographies', 'combined']);
      return new Response(xml, {
        headers: { ...corsHeaders, 'Content-Type': 'application/xml' },
      });
    }

    // Build query based on sitemap type
    let query = supabase
      .from('seo_pages')
      .select('slug, page_type, priority, updated_at')
      .eq('is_published', true)
      .order('priority', { ascending: false });

    if (sitemapType === 'capabilities') {
      query = query.eq('page_type', 'capability');
    } else if (sitemapType === 'industries') {
      query = query.not('industry_id', 'is', null);
    } else if (sitemapType === 'geographies') {
      query = query.not('geography_id', 'is', null);
    } else if (sitemapType === 'combined') {
      query = query.eq('page_type', 'combined');
    }
    // 'all' returns everything

    const { data: pages, error } = await query;

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    const xml = generateSitemapXml(pages || []);

    return new Response(xml, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
