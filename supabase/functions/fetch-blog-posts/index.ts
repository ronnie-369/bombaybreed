import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching Substack RSS feed...');
    
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
    console.log('RSS feed fetched, parsing...');
    
    const posts = parseXML(xml);
    console.log(`Parsed ${posts.length} blog posts`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        posts,
        fetchedAt: new Date().toISOString(),
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        } 
      }
    );
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
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
