import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabase = createClient(supabaseUrl, serviceRoleKey);
const resend = new Resend(resendApiKey);

// In-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Dynamic CORS with wildcard support for *.lovableproject.com and localhost
const getAllowedOrigins = (): string[] => {
  const env = Deno.env.get('ALLOWED_ORIGINS');
  if (env) return env.split(',').map((o) => o.trim()).filter(Boolean);
  return [
    'https://zjiwmdrtuhsrymsuvpfb.lovableproject.com',
    'http://localhost:5173',
    'http://localhost:3000',
  ];
};

const isOriginAllowed = (origin: string | null): boolean => {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  if (allowed.includes(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    if (hostname.endsWith('.lovableproject.com')) return true;
    if (hostname.endsWith('.lovable.dev')) return true;
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

serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { "Content-Type": "application/json", 'Retry-After': '60', ...corsHeaders },
    });
  }

  if (!isOriginAllowed(origin)) {
    console.warn('CORS: blocked origin for submit-lead-and-generate-download', { origin });
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { "Content-Type": "application/json", ...corsHeaders },
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

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !reportTitle?.trim()) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Sanitize inputs to prevent XSS and injection attacks
    const sanitizedName = name.trim().substring(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 255);
    const sanitizedDesignation = designation?.trim().substring(0, 100) || null;
    const sanitizedCompany = company_name?.trim().substring(0, 100) || null;
    const sanitizedPhone = phone?.trim().substring(0, 20) || null;
    const sanitizedReportTitle = reportTitle.trim().substring(0, 255);

    console.log('Processing lead submission for report:', reportTitle);

    // Insert lead with sanitized data
    const { data: inserted, error: insertError } = await supabase
      .from("contact_submissions")
      .insert([{ 
        name: sanitizedName, 
        email: sanitizedEmail, 
        designation: sanitizedDesignation, 
        company_name: sanitizedCompany, 
        phone: sanitizedPhone, 
        marketing_consent, 
        report_requested: sanitizedReportTitle, 
        form_type 
      }])
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const leadId = inserted.id;
    console.log('Lead inserted successfully');

    // Generate signed URL with normalization and mapping
    console.log(`Generating signed URL for file: ${reportTitle}`);

    // Map report titles to actual filenames in storage
    const FILE_MAP: Record<string, string> = {
      "Mining the Transition: A Climate-Critical Minerals Risk Framework for Investors": "Mining-the-Transition-A-Climate-Critical-Minerals-Risk-Framework-for-Investors.pdf",
      "Green Jobs in India: Workforce and Investment Outlook 2025-2030": "Green-Jobs-in-India-Workforce-and-Investment-Outlook-2025-2030 (1).pdf",
      "Green Jobs Report.pdf": "Green-Jobs-in-India-Workforce-and-Investment-Outlook-2025-2030 (1).pdf",
      "Carbon Market Outlook 2025-2030: An Investor's Deep Dive": "India-Carbon-Market-Outlook-2025-2030-An-Investors-Deep-Dive.pdf",
      "India Carbon Market Outlook 2025-2030: An Investor's Deep Dive": "India-Carbon-Market-Outlook-2025-2030-An-Investors-Deep-Dive.pdf",
      "India's Carbon Playbook": "Indias-Carbon-Playbook (1).pdf",
      "From Compliance to Credibility: A CXO Guide to CCTS & CBAM": "From-Compliance-to-Credibility-A-CXO-Guide-to-CCTS-and-CBAM.pdf",
      "Energy Transition Playbook": "The-Energy-Transition-Playbook-for-India (2).pdf",
      "The Energy Transition Playbook for India": "The-Energy-Transition-Playbook-for-India (2).pdf",
      "India's Climate Inflection Point": "Indias-Climate-Inflection-Point-The Climate Desk_compressed.pdf",
      "Asia Climate Emissions and Article 6: Comparative Policy Grade": "ASIA-CLIMATE-EMISSIONS-and-ARTICLE-6-COMPARATIVE-POLICY-GRADE (3).pdf",
      // New 2026 reports
      "Jobs on the Rise 2026: India Green Jobs Outlook": "linkedin_jobs_on_the_rise_2026_india_green_jobs_20260117180846.pdf",
      "WEF Global Risks Report 2026: Climate & Geopolitical Volatility": "The-Global-Risks-Report-2026-was-written-assuming-instability-What-it-did-not-fully-price-in-was-spe (1).pdf",
      "India Power Sector Investment Presentation": "India_Power_Sector_Investment_Presentation (1).pdf",
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
            ...corsHeaders,
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
        
        // HTML escape function to prevent XSS
        const escapeHtml = (text: string) => {
          return text.replace(/[<>&"']/g, (match) => {
            switch (match) {
              case '<': return '&lt;';
              case '>': return '&gt;';
              case '&': return '&amp;';
              case '"': return '&quot;';
              case "'": return '&#x27;';
              default: return match;
            }
          });
        };

        const emailContent = `
          <h2>New Report Request</h2>
          <p><strong>Report:</strong> ${escapeHtml(sanitizedReportTitle)}</p>
          
          <h3>Lead Details:</h3>
          <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
          <p><strong>Company:</strong> ${escapeHtml(sanitizedCompany || 'Not provided')}</p>
          <p><strong>Designation:</strong> ${escapeHtml(sanitizedDesignation || 'Not provided')}</p>
          <p><strong>Phone:</strong> ${escapeHtml(sanitizedPhone || 'Not provided')}</p>
          <p><strong>Marketing Consent:</strong> ${marketing_consent ? 'Yes' : 'No'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Lead ID: ${leadId}<br>
            This lead has been automatically saved to your Supabase database.
          </p>
        `;

        const { error: emailError } = await resend.emails.send({
          from: 'Bombay Breed <onboarding@resend.dev>',
          to: ['theresa.ronnie@bombaybreed.com'],
          subject: `New report request: ${escapeHtml(sanitizedReportTitle)} — ${escapeHtml(sanitizedName)}`,
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

    // Send email notification asynchronously (don't block response)
    sendEmailNotification().catch(error => {
      console.error('Report lead email error:', error);
    });

    return new Response(JSON.stringify({ 
      downloadUrl, 
      fileName,
      expiresAt 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});