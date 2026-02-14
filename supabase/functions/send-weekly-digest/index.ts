import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekAgoISO = weekAgo.toISOString();
    const dateRange = `${weekAgo.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;

    // Fetch all data in parallel
    const [downloadsRes, contactsRes, newsletterRes, quizSubmissionsRes, quizClicksRes] = await Promise.all([
      supabase.from('report_downloads').select('report_name').gte('downloaded_at', weekAgoISO),
      supabase.from('contact_inquiries').select('id').gte('created_at', weekAgoISO),
      supabase.from('newsletter_subscribers').select('id').gte('subscribed_at', weekAgoISO),
      supabase.from('quiz_interactions').select('id, form_completed').gte('created_at', weekAgoISO),
      supabase.from('contact_submissions').select('id').eq('form_type', 'green-jobs-quiz').gte('created_at', weekAgoISO),
    ]);

    // Report downloads grouped by name
    const downloads = downloadsRes.data || [];
    const downloadsByReport: Record<string, number> = {};
    downloads.forEach((d) => {
      downloadsByReport[d.report_name] = (downloadsByReport[d.report_name] || 0) + 1;
    });
    const totalDownloads = downloads.length;

    const contactCount = contactsRes.data?.length || 0;
    const newsletterCount = newsletterRes.data?.length || 0;
    const quizLeadCount = quizClicksRes.data?.length || 0;

    // Quiz funnel
    const quizClicks = quizSubmissionsRes.data || [];
    const totalClicks = quizClicks.length;
    const formCompleted = quizClicks.filter((q) => q.form_completed).length;
    const conversionPct = totalClicks > 0 ? ((formCompleted / totalClicks) * 100).toFixed(1) : '0';

    // Build HTML
    const downloadRows = Object.entries(downloadsByReport)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => `<tr><td style="padding:6px 12px;border:1px solid #eee;">${name}</td><td style="padding:6px 12px;border:1px solid #eee;text-align:center;font-weight:600;">${count}</td></tr>`)
      .join('');

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1B4332;color:white;padding:24px 20px;border-radius:12px 12px 0 0;">
          <h1 style="margin:0;font-size:20px;">📊 Bombay Breed Weekly Dashboard</h1>
          <p style="margin:6px 0 0;opacity:0.8;font-size:13px;">${dateRange}</p>
        </div>

        <div style="padding:20px;background:#f9f9f9;">
          <!-- Summary Cards -->
          <div style="display:flex;gap:10px;margin-bottom:20px;">
            <div style="flex:1;background:white;border-radius:10px;padding:16px;text-align:center;border:1px solid #eee;">
              <div style="font-size:28px;font-weight:700;color:#1B4332;">${totalDownloads}</div>
              <div style="font-size:11px;color:#888;margin-top:4px;">Report Downloads</div>
            </div>
            <div style="flex:1;background:white;border-radius:10px;padding:16px;text-align:center;border:1px solid #eee;">
              <div style="font-size:28px;font-weight:700;color:#E07A5F;">${contactCount}</div>
              <div style="font-size:11px;color:#888;margin-top:4px;">Contact Messages</div>
            </div>
            <div style="flex:1;background:white;border-radius:10px;padding:16px;text-align:center;border:1px solid #eee;">
              <div style="font-size:28px;font-weight:700;color:#52796F;">${newsletterCount}</div>
              <div style="font-size:11px;color:#888;margin-top:4px;">Newsletter Signups</div>
            </div>
          </div>

          <!-- Report Downloads -->
          ${totalDownloads > 0 ? `
          <h3 style="font-size:14px;margin:16px 0 8px;">📄 Report Downloads</h3>
          <table style="border-collapse:collapse;width:100%;background:white;border-radius:8px;overflow:hidden;">
            <tr style="background:#f5f5f5;"><th style="padding:8px 12px;text-align:left;font-size:12px;">Report</th><th style="padding:8px 12px;text-align:center;font-size:12px;">Downloads</th></tr>
            ${downloadRows}
          </table>
          ` : '<p style="color:#888;font-size:13px;">No report downloads this week.</p>'}

          <!-- Quiz Funnel -->
          <h3 style="font-size:14px;margin:20px 0 8px;">🌱 Green Jobs Quiz Funnel</h3>
          <div style="background:white;border-radius:10px;padding:16px;border:1px solid #eee;">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span style="font-size:13px;color:#555;">Personality clicks</span>
              <span style="font-weight:600;">${totalClicks}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span style="font-size:13px;color:#555;">Form completions</span>
              <span style="font-weight:600;">${formCompleted}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span style="font-size:13px;color:#555;">Quiz leads (with details)</span>
              <span style="font-weight:600;">${quizLeadCount}</span>
            </div>
            <div style="display:flex;justify-content:space-between;border-top:1px solid #eee;padding-top:8px;">
              <span style="font-size:13px;color:#555;">Conversion rate</span>
              <span style="font-weight:700;color:#1B4332;">${conversionPct}%</span>
            </div>
          </div>

          <p style="color:#aaa;font-size:10px;margin-top:20px;text-align:center;">
            Auto-generated by Bombay Breed · ${now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    `;

    const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);
    const { error: emailError } = await resend.emails.send({
      from: 'Bombay Breed <onboarding@resend.dev>',
      to: ['theresa.ronnie@bombaybreed.com'],
      subject: `Bombay Breed Weekly Dashboard — ${dateRange}`,
      html,
    });

    if (emailError) {
      console.error('Weekly digest email error:', emailError);
      return new Response(JSON.stringify({ error: 'Failed to send digest' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Weekly digest sent successfully');
    return new Response(JSON.stringify({ success: true, dateRange }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('send-weekly-digest error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});
