import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, serviceRoleKey);

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      designation,
      company_name,
      phone,
      marketing_consent,
      reportTitle,
      form_type = 'download_report_form',
    } = body;

    console.log('Processing lead submission:', { name, email, reportTitle });

    // Insert lead
    const { data: inserted, error: insertError } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, designation, company_name, phone, marketing_consent, report_requested: reportTitle, form_type }])
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const leadId = inserted.id;
    console.log('Lead inserted with ID:', leadId);

    // Generate signed URL
    console.log(`Generating signed URL for file: ${reportTitle}`);
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from("Reports")
      .createSignedUrl(reportTitle, 60 * 60);

    if (urlError) {
      console.error("Signed URL error:", urlError);
      return new Response(JSON.stringify({ error: urlError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    console.log('Signed URL generated successfully');

    // Log download
    const { error: downloadError } = await supabase
      .from("report_downloads")
      .insert([{ lead_id: leadId, report_name: reportTitle }]);

    if (downloadError) {
      console.error("Download log error:", downloadError);
      // Don't fail request for logging error
    }

    return new Response(JSON.stringify({ downloadUrl: signedUrl.signedUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});