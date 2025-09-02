import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const REPORT_FILES = {
  'Green Jobs Report': 'green-jobs-india-report.pdf',
  'Carbon Market Outlook': 'carbon-market-outlook-2024.pdf',
  'Carbon Playbook': 'carbon-playbook-guide.pdf',
};

interface SubmitLeadRequest {
  name: string;
  email: string;
  designation?: string;
  company_name?: string;
  phone?: string;
  marketing_consent: boolean;
  reportTitle: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing lead submission request');

    // Initialize Supabase client with service role key for full access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const body: SubmitLeadRequest = await req.json();
    console.log('Request body:', body);

    const { name, email, designation, company_name, phone, marketing_consent, reportTitle } = body;

    // Validate required fields
    if (!name || !email || !reportTitle || marketing_consent === undefined) {
      console.error('Missing required fields:', { name: !!name, email: !!email, reportTitle: !!reportTitle, marketing_consent });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get the correct file name from the mapping
    const fileName = REPORT_FILES[reportTitle as keyof typeof REPORT_FILES];
    if (!fileName) {
      console.error('Invalid report title:', reportTitle);
      return new Response(
        JSON.stringify({ error: 'Invalid report title' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Step 1: Insert lead into contact_submissions table
    console.log('Inserting lead into contact_submissions table');
    const { data: leadData, error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        designation: designation?.trim() || null,
        company_name: company_name?.trim() || null,
        phone: phone?.trim() || null,
        marketing_consent,
        report_requested: reportTitle.trim(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting lead:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save lead information' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Lead inserted successfully:', leadData);

    // Step 2: Generate signed URL for the report
    console.log(`Generating signed URL for file: ${fileName}`);
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from('Reports')
      .createSignedUrl(fileName, 3600); // 1 hour expiry

    if (urlError) {
      console.error('Error generating signed URL:', urlError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate download link' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Signed URL generated successfully');

    // Step 3: Record the download
    console.log('Recording download in report_downloads table');
    const { error: downloadError } = await supabase
      .from('report_downloads')
      .insert({
        lead_id: leadData.id,
        report_name: reportTitle,
      });

    if (downloadError) {
      console.error('Error recording download:', downloadError);
      // Don't fail the request for this, just log it
    }

    console.log('Lead submission and download generation completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        downloadUrl: signedUrlData.signedUrl,
        leadId: leadData.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in submit-lead-and-generate-download:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});