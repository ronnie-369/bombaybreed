import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const resend = new Resend(resendApiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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
    const { name, email, company, message, submitted_at } = body;

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

    console.log('Sending contact inquiry email notification...');

    const emailContent = `
      <h2>New Website Message</h2>
      
      <h3>Contact Details:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      
      <h3>Message:</h3>
      <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007acc; margin: 15px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        Submitted: ${submitted_at || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br>
        This inquiry has been automatically saved to your Supabase database.
      </p>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Nexo Circle <onboarding@resend.dev>',
      to: ['ronnie@nexocircle.com'],
      subject: `New website message — ${name}`,
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