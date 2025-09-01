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
    // Use environment variables instead of hardcoded credentials
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing required environment variables: SUPABASE_URL or SUPABASE_ANON_KEY');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { leadId, reportTitle }: DownloadRequest = await req.json();

    console.log(`Generating download for lead ${leadId}, report: ${reportTitle}`);

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

    // List files in the Reports bucket to debug what's available
    console.log('Checking available files in Reports bucket...');
    const { data: filesList, error: listError } = await supabase.storage
      .from('Reports')
      .list();

    if (listError) {
      console.error('Error listing files in Reports bucket:', listError);
    } else {
      console.log('Available files in Reports bucket:', filesList?.map(f => f.name));
    }

    // Generate signed URL for the report (valid for 1 hour)
    console.log(`Attempting to create signed URL for file: ${fileName}`);
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('Reports')
      .createSignedUrl(fileName, 3600); // 1 hour expiry

    if (urlError || !signedUrlData) {
      console.error('Failed to generate signed URL:', {
        error: urlError,
        fileName: fileName,
        reportTitle: reportTitle,
        availableFiles: filesList?.map(f => f.name) || 'Could not retrieve file list'
      });
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate download link', 
          details: urlError?.message || 'Unknown error',
          requestedFile: fileName
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log('Successfully generated download URL for:', fileName);

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