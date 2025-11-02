import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const resend = new Resend(resendApiKey);

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
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!isOriginAllowed(origin)) {
    console.warn('CORS: blocked origin for send-contact-email', { origin });
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }

  try {
    const body = await req.json();
    const { name, email, company, phone, message, submitted_at } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
    
    // Sanitize inputs to prevent XSS and injection attacks
    const sanitizedName = name.trim().substring(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 255);
    const sanitizedCompany = company?.trim().substring(0, 100) || 'Not provided';
    const sanitizedPhone = phone?.trim().substring(0, 20) || 'Not provided';
    const sanitizedMessage = message.trim().substring(0, 5000);

    console.log('Sending contact inquiry email notification...');

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
      <h2>New Website Message</h2>
      
      <h3>Contact Details:</h3>
      <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(sanitizedPhone)}</p>
      <p><strong>Company:</strong> ${escapeHtml(sanitizedCompany)}</p>
      
      <h3>Message:</h3>
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007acc; margin: 15px 0; white-space: pre-wrap;">
        ${escapeHtml(sanitizedMessage).replace(/\n/g, '<br>')}
      </div>
      
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        Submitted: ${submitted_at || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br>
        This inquiry has been automatically saved to your Supabase database.
      </p>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Bombay Breed <onboarding@resend.dev>',
      to: ['ronnie@bombaybreed.com'],
      subject: `New website message — ${escapeHtml(sanitizedName)}`,
      html: emailContent,
    });

    if (emailError) {
      console.error('Contact email error:', emailError);
      return new Response(
        JSON.stringify({ error: 'Failed to send email notification' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log('Contact inquiry email sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Email notification sent' }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );

  } catch (error) {
    console.error('Contact email function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});