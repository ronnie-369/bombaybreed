import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Verify the caller's JWT
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const userId = claimsData.claims.sub;

    // Check admin role using service role (bypass RLS for the role check)
    const adminClient = createClient(supabaseUrl, serviceKey);
    const { data: roleRow, error: roleError } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleRow) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const digestSecret = Deno.env.get('DIGEST_SECRET');
    if (!digestSecret) {
      return new Response(JSON.stringify({ error: 'DIGEST_SECRET not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Server-side invocation of send-weekly-digest with the secret header
    const digestUrl = `${supabaseUrl}/functions/v1/send-weekly-digest`;
    const digestRes = await fetch(digestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-digest-secret': digestSecret,
        'Authorization': `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ test: true, triggered_by: userId }),
    });

    const bodyText = await digestRes.text();
    let parsed: unknown = bodyText;
    try { parsed = JSON.parse(bodyText); } catch { /* keep text */ }

    if (!digestRes.ok) {
      return new Response(JSON.stringify({ error: 'Digest invocation failed', status: digestRes.status, detail: parsed }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true, result: parsed }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('trigger-weekly-digest error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
