import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.1';

// Dynamic CORS with wildcard support for *.lovableproject.com and localhost
const getAllowedOrigins = (): string[] => {
  const env = Deno.env.get('ALLOWED_ORIGINS');
  if (env) return env.split(',').map((o) => o.trim()).filter(Boolean);
  return [
    'https://zjiwmdrtuhsrymsuvpfb.lovableproject.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ];
};

const isOriginAllowed = (origin: string | null): boolean => {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  if (allowed.includes(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    if (hostname.endsWith('.lovableproject.com')) return true;
    if (hostname.endsWith('.bombaybreed.com') || hostname === 'bombaybreed.com') return true;
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
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'true',
  };
};

// Report file mapping
const REPORT_FILES: Record<string, string> = {
  'Mining the Transition: A Climate-Critical Minerals Risk Framework for Investors': 'Mining-the-Transition-A-Climate-Critical-Minerals-Risk-Framework-for-Investors.pdf',
  'Green Jobs in India: Workforce and Investment Outlook 2025-2030': 'Green-Jobs-in-India-Workforce-and-Investment-Outlook-2025-2030 (1).pdf',
  'India Carbon Market Outlook 2025-2030: An Investor\'s Deep Dive': 'India-Carbon-Market-Outlook-2025-2030-An-Investors-Deep-Dive.pdf',
  'Carbon Market Outlook 2025-2030: An Investor\'s Deep Dive': 'India-Carbon-Market-Outlook-2025-2030-An-Investors-Deep-Dive.pdf',
  'India\'s Carbon Playbook': 'Indias-Carbon-Playbook (1).pdf',
  'From Compliance to Credibility: A CXO Guide to CCTS & CBAM': 'From-Compliance-to-Credibility-A-CXO-Guide-to-CCTS-and-CBAM.pdf',
  'Energy Transition Playbook': 'The-Energy-Transition-Playbook-for-India (2).pdf',
  'The Energy Transition Playbook for India': 'The-Energy-Transition-Playbook-for-India (2).pdf',
  'India\'s Climate Inflection Point': 'Indias-Climate-Inflection-Point-The Climate Desk_compressed.pdf',
  'Asia Climate Emissions and Article 6: Comparative Policy Grade': 'ASIA-CLIMATE-EMISSIONS-and-ARTICLE-6-COMPARATIVE-POLICY-GRADE (3).pdf'
};

interface DownloadRequest {
  leadId: string;
  reportTitle: string;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!isOriginAllowed(origin)) {
    console.warn('CORS: blocked origin for generate-download', { origin });
    return new Response(
      JSON.stringify({ error: 'Origin not allowed' }),
      { 
        status: 403, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }

  try {
    // Use service role key for database operations that require elevated permissions
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { leadId, reportTitle }: DownloadRequest = await req.json();

    console.log('Processing download request');

    // Verify the lead exists
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      console.error('Lead verification failed:', leadError);
      return new Response(
        JSON.stringify({ error: 'Invalid lead ID' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Get the file name from mapping
    const fileName = REPORT_FILES[reportTitle];
    if (!fileName) {
      console.error('Report file not found for title:', reportTitle);
      return new Response(
        JSON.stringify({ error: 'Report not found' }),
        { 
          status: 404, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Removed file enumeration for security

    // Generate signed URL for the report (valid for 1 hour)
    console.log(`Attempting to create signed URL for file: ${fileName}`);
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('Reports')
      .createSignedUrl(fileName, 3600); // 1 hour expiry

    if (urlError || !signedUrlData) {
      console.error('Failed to generate signed URL');
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate download link'
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log('Download URL generated successfully');

    return new Response(
      JSON.stringify({ 
        downloadUrl: signedUrlData.signedUrl,
        fileName: fileName,
        expiresAt: new Date(Date.now() + 3600 * 1000).toISOString()
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in generate-download function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);