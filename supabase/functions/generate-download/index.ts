import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Report file mapping
const REPORT_FILES: Record<string, string> = {
  'Green Jobs in India: Workforce and Investment Outlook 2025-2030': 'Green-Jobs-in-India-Workforce-and-Investment-Outlook-2025-2030 (1).pdf',
  'India Carbon Market Outlook 2025-2030: An Investor\'s Deep Dive': 'India-Carbon-Market-Outlook-2025-2030-An-Investors-Deep-Dive.pdf',
  'India\'s Carbon Playbook': 'Indias-Carbon-Playbook (1).pdf'
};

interface DownloadRequest {
  leadId: string;
  reportTitle: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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