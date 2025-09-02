import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const REPORT_FILES = {
  // Short titles (legacy)
  'Green Jobs Report': 'green-jobs-india-report.pdf',
  'Carbon Market Outlook': 'carbon-market-outlook-2024.pdf',
  'Carbon Playbook': 'carbon-playbook-guide.pdf',
  // Full titles used by pages
  'Green Jobs in India: Workforce and Investment Outlook 2025-2030': 'green-jobs-india-report.pdf',
  'India Carbon Market Outlook 2025-2030: An Investor\'s Deep Dive': 'carbon-market-outlook-2024.pdf',
  'India\'s Carbon Playbook': 'carbon-playbook-guide.pdf',
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

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Use service role to bypass RLS
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = await req.json();
    const {
      name,
      email,
      designation,
      company_name,
      phone,
      marketing_consent,
      reportTitle,
    } = body;

    console.log('Processing lead submission:', { name, email, reportTitle });

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

    // 1. Insert into contact_submissions
    const { data: inserted, error: insertError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          designation,
          company_name,
          phone,
          marketing_consent,
          report_requested: reportTitle,
        },
      ])
      .select("id") // we want the inserted ID
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Insert failed", details: insertError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const leadId = inserted.id;
    console.log('Lead inserted with ID:', leadId);

    // 2. Generate signed URL for the report
    console.log(`Generating signed URL for file: ${fileName}`);
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from("Reports")
      .createSignedUrl(fileName, 60 * 60); // 1-hour expiry

    if (urlError) {
      console.error("Signed URL error:", urlError);
      return new Response(
        JSON.stringify({
          error: "Failed to generate download link",
          details: urlError.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log('Signed URL generated successfully');

    // 3. Insert into report_downloads
    const { error: downloadError } = await supabase
      .from("report_downloads")
      .insert([
        {
          lead_id: leadId,
          report_name: reportTitle,
        },
      ]);

    if (downloadError) {
      console.error("Download insert error:", downloadError);
      // Not fatal — user can still get download
    }

    // 4. Return success + signed URL
    return new Response(
      JSON.stringify({ 
        success: true,
        downloadUrl: signedUrl.signedUrl,
        leadId: leadId
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected server error", details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});