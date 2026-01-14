import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pageId } = await req.json();
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the current page
    const { data: currentPage, error: pageError } = await supabase
      .from("seo_pages")
      .select("*, seo_capabilities(*), seo_industries(*), seo_geographies(*), seo_regulations(*)")
      .eq("id", pageId)
      .single();

    if (pageError || !currentPage) {
      return new Response(JSON.stringify({ error: "Page not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get all published pages except the current one
    const { data: allPages } = await supabase
      .from("seo_pages")
      .select("id, slug, meta_title, page_type, capability_id, industry_id, geography_id, regulation_id")
      .eq("is_published", true)
      .neq("id", pageId);

    if (!allPages) {
      return new Response(JSON.stringify({ links: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Score pages based on relationship to current page
    const scoredPages = allPages.map(page => {
      let score = 0;
      let reason = "";

      // Same capability = high relevance
      if (currentPage.capability_id && page.capability_id === currentPage.capability_id) {
        score += 30;
        reason = "Same capability";
      }

      // Same industry = high relevance  
      if (currentPage.industry_id && page.industry_id === currentPage.industry_id) {
        score += 25;
        reason = reason ? `${reason}, same industry` : "Same industry";
      }

      // Same geography = medium relevance
      if (currentPage.geography_id && page.geography_id === currentPage.geography_id) {
        score += 20;
        reason = reason ? `${reason}, same geography` : "Same geography";
      }

      // Same regulation = medium relevance
      if (currentPage.regulation_id && page.regulation_id === currentPage.regulation_id) {
        score += 20;
        reason = reason ? `${reason}, same regulation` : "Same regulation";
      }

      // Different page type = variety bonus
      if (page.page_type !== currentPage.page_type) {
        score += 5;
      }

      return { ...page, score, reason };
    });

    // Sort by score and take top 5
    const topLinks = scoredPages
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(p => ({
        url: `/${p.slug}`,
        title: p.meta_title,
        reason: p.reason,
      }));

    return new Response(JSON.stringify({ links: topLinks }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
