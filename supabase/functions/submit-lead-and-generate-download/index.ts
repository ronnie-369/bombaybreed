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

    // Generate signed URL with normalization and mapping
    console.log(`Generating signed URL for file: ${reportTitle}`);

    const FILE_MAP: Record<string, string> = {
      "Green Jobs in India: Workforce and Investment Outlook 2025-2030": "green-jobs-report.pdf",
      "Green Jobs Report.pdf": "green-jobs-report.pdf",
      "India Carbon Market Outlook 2025-2030: An Investor's Deep Dive": "carbon-market-outlook.pdf",
      "India's Carbon Playbook": "carbon-playbook.pdf",
    };

    const ensurePdf = (s: string) => (s.toLowerCase().endsWith(".pdf") ? s : `${s}.pdf`);
    const slugify = (s: string) =>
      s
        .toLowerCase()
        .replace(/[\'’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const mapped = FILE_MAP[reportTitle] ?? undefined;
    const slug = slugify(reportTitle);
    const candidates = Array.from(
      new Set(
        [
          reportTitle,
          ensurePdf(reportTitle),
          mapped,
          mapped ? ensurePdf(mapped) : undefined,
          `${slug}.pdf`,
          slug,
          reportTitle.replace(/\s+/g, "-"),
          ensurePdf(reportTitle.replace(/\s+/g, "-").toLowerCase()),
        ].filter(Boolean) as string[]
      )
    );

    console.log("Trying storage keys:", candidates);

    let signedUrl: { signedUrl: string } | null = null;
    let lastError: any = null;

    for (const key of candidates) {
      const { data, error } = await supabase.storage
        .from("Reports")
        .createSignedUrl(key, 60 * 60);
      if (!error && data?.signedUrl) {
        signedUrl = data;
        console.log("Signed URL generated with key:", key);
        break;
      }
      lastError = error;
    }

    if (!signedUrl) {
      console.error("Signed URL generation failed. Tried keys:", candidates, "Last error:", lastError);
      return new Response(
        JSON.stringify({ error: "Object not found", tried: candidates }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
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