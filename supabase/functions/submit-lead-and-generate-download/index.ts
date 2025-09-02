import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabase = createClient(supabaseUrl, serviceRoleKey);
const resend = new Resend(resendApiKey);

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

    // Validate required fields and email format
    if (!name?.trim() || !email?.trim() || !reportTitle?.trim()) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    console.log('Processing lead submission for report:', reportTitle);

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
    console.log('Lead inserted successfully');

    // Generate signed URL with normalization and mapping
    console.log(`Generating signed URL for file: ${reportTitle}`);

    // Map report titles to actual filenames in storage
    const FILE_MAP: Record<string, string> = {
      "Green Jobs in India: Workforce and Investment Outlook 2025-2030": "Green-Jobs-in-India-Workforce-and-Investment-Outlook-2025-2030 (1).pdf",
      "Green Jobs Report.pdf": "Green-Jobs-in-India-Workforce-and-Investment-Outlook-2025-2030 (1).pdf",
      "India Carbon Market Outlook 2025-2030: An Investor's Deep Dive": "India-Carbon-Market-Outlook-2025-2030-An-Investors-Deep-Dive.pdf",
      "India's Carbon Playbook": "Indias-Carbon-Playbook (1).pdf",
    };

    const ensurePdf = (s: string) => (s.toLowerCase().endsWith(".pdf") ? s : `${s}.pdf`);
    const slugify = (s: string) =>
      s
        .toLowerCase()
        .replace(/[\'']/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // Generate comprehensive filename variations
    const generateVariations = (title: string) => {
      const variations = [];
      
      // Priority 1: Mapped actual filename
      const mapped = FILE_MAP[title];
      if (mapped) {
        variations.push(mapped);
      }
      
      // Priority 2: Direct title variations
      variations.push(title);
      variations.push(ensurePdf(title));
      
      // Priority 3: Title with hyphens instead of spaces
      const hyphenated = title.replace(/\s+/g, "-");
      variations.push(hyphenated);
      variations.push(ensurePdf(hyphenated));
      
      // Priority 4: Variations with " (1)" suffix (common duplicate naming)
      variations.push(`${title} (1)`);
      variations.push(ensurePdf(`${title} (1)`));
      variations.push(`${hyphenated} (1)`);
      variations.push(ensurePdf(`${hyphenated} (1)`));
      
      // Priority 5: Apostrophe variations (India's vs Indias)
      if (title.includes("'")) {
        const noApostrophe = title.replace(/'/g, "");
        variations.push(noApostrophe);
        variations.push(ensurePdf(noApostrophe));
        variations.push(`${noApostrophe.replace(/\s+/g, "-")} (1)`);
        variations.push(ensurePdf(`${noApostrophe.replace(/\s+/g, "-")} (1)`));
      }
      
      // Priority 6: URL encoded versions
      variations.push(encodeURIComponent(title));
      variations.push(encodeURIComponent(ensurePdf(title)));
      
      // Priority 7: Slugified versions (fallback)
      const slug = slugify(title);
      variations.push(slug);
      variations.push(ensurePdf(slug));
      
      return variations;
    };

    const candidates = Array.from(new Set(generateVariations(reportTitle).filter(Boolean)));

    console.log("Attempting file resolution for report");

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
      console.error("Report file not found in storage");
      return new Response(
        JSON.stringify({ error: "Report file not available" }),
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

    // Extract filename and add download parameter
    const urlParts = signedUrl.signedUrl.split('?');
    const baseUrl = urlParts[0];
    const fileName = baseUrl.split('/').pop() || reportTitle;
    const downloadUrl = `${signedUrl.signedUrl}&download=${encodeURIComponent(fileName)}`;
    
    // Calculate expiry time (1 hour from now)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    // Log download
    const { error: downloadError } = await supabase
      .from("report_downloads")
      .insert([{ lead_id: leadId, report_name: reportTitle }]);

    if (downloadError) {
      console.error("Download log error:", downloadError);
      // Don't fail request for logging error
    }

    // Send email notification in background (doesn't delay response)
    const sendEmailNotification = async () => {
      try {
        console.log('Sending report lead email notification...');
        
        const emailContent = `
          <h2>New Report Request</h2>
          <p><strong>Report:</strong> ${reportTitle}</p>
          
          <h3>Lead Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company_name || 'Not provided'}</p>
          <p><strong>Designation:</strong> ${designation || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Marketing Consent:</strong> ${marketing_consent ? 'Yes' : 'No'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Lead ID: ${leadId}<br>
            This lead has been automatically saved to your Supabase database.
          </p>
        `;

        const { error: emailError } = await resend.emails.send({
          from: 'Nexo Circle <onboarding@resend.dev>',
          to: ['ronnie@nexocircle.com'],
          subject: `New report request: ${reportTitle} — ${name}`,
          html: emailContent,
        });

        if (emailError) {
          console.error('Report lead email error:', emailError);
        } else {
          console.log('Report lead email sent successfully');
        }
      } catch (emailErr) {
        console.error('Report lead email notification failed:', emailErr);
      }
    };

    // Schedule email to be sent in background
    EdgeRuntime.waitUntil(sendEmailNotification());

    return new Response(JSON.stringify({ 
      downloadUrl, 
      fileName,
      expiresAt 
    }), {
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