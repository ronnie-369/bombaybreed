import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

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

// Dynamic CORS with origin validation (matches other edge functions)
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
    if (hostname.endsWith('.lovable.app')) return true;
    if (hostname.endsWith('.bombaybreed.com') || hostname === 'bombaybreed.com') return true;
    if (hostname === 'localhost' && (protocol === 'http:' || protocol === 'https:')) return true;
  } catch (_) {
    return false;
  }
  return false;
};

const getCorsHeaders = (origin: string | null): Record<string, string> => {
  const allow = isOriginAllowed(origin);
  const fallback = getAllowedOrigins()[0];
  return {
    'Access-Control-Allow-Origin': allow && origin ? origin : fallback,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  };
};

const escapeHtml = (text: string) =>
  text.replace(/[<>&"']/g, (m) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' }[m] || m));

serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60', ...corsHeaders },
    });
  }

  // Block requests from non-allowed origins
  if (!isOriginAllowed(origin)) {
    console.warn('CORS: blocked origin for send-inquiry-notification', { origin });
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const { type, email, name, phone, personality } = await req.json();

    if (!type || !email) {
      return new Response(JSON.stringify({ error: 'Missing type or email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);
    let subject = '';
    let body = '';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    if (type === 'newsletter') {
      subject = `New Newsletter Subscriber — ${escapeHtml(email)}`;
      body = `
        <h2>📬 New Newsletter Subscriber</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">Email</td><td style="padding:8px 12px;border:1px solid #eee;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">Subscribed at</td><td style="padding:8px 12px;border:1px solid #eee;">${timestamp}</td></tr>
        </table>
        <p style="color:#666;font-size:12px;margin-top:16px;">Source: The Climate Desk newsletter form</p>
      `;
    } else if (type === 'green-jobs-quiz') {
      const safeName = name ? escapeHtml(name) : 'Unknown';
      const safePersonality = personality ? escapeHtml(personality) : 'Not selected';
      subject = `Green Jobs Quiz Lead — ${safeName} (${safePersonality})`;
      body = `
        <h2>🌱 Green Jobs Quiz Lead</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">Name</td><td style="padding:8px 12px;border:1px solid #eee;">${safeName}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">Email</td><td style="padding:8px 12px;border:1px solid #eee;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">Phone</td><td style="padding:8px 12px;border:1px solid #eee;">${phone ? escapeHtml(phone) : 'Not provided'}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">Personality</td><td style="padding:8px 12px;border:1px solid #eee;">${safePersonality}</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">Submitted at</td><td style="padding:8px 12px;border:1px solid #eee;">${timestamp}</td></tr>
        </table>
        <p style="color:#666;font-size:12px;margin-top:16px;">Source: Green Jobs Career Guide quiz</p>
      `;
    } else {
      return new Response(JSON.stringify({ error: 'Unknown inquiry type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Bombay Breed <onboarding@resend.dev>',
      to: ['theresa.ronnie@bombaybreed.com'],
      subject,
      html: body,
    });

    if (emailError) {
      console.error('Inquiry notification email error:', emailError);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log(`Inquiry notification sent: ${type} — ${email}`);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('send-inquiry-notification error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
