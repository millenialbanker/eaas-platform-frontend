import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Server configuration error: Missing RESEND_API_KEY' }, { status: 500 });
    }

    // 1. PUSH LEAD TO SUPERCHARGED CRM GOOGLE SHEET
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      } catch (sheetErr) {
        console.error('CRM Google Sheet Error:', sheetErr);
      }
    }

    // 2. SEND CREDENTIAL EMAIL VIA RESEND API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Modulease <founder@mail.modulease.site>',
        to: [email],
        subject: 'Your Modulease EaaS Portal Credentials',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0F172A;">
            <h2 style="color: #059669;">Welcome to Modulease</h2>
            <p>Scale Your Workspace. Protect your Capital.</p>
            <p>Here are your secure credentials to access the Modulease Equipment Solutions portal:</p>
            <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; border: 1px solid #E2E8F0; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Username:</strong> modulease</p>
              <p style="margin: 5px 0;"><strong>Password:</strong> vip2026</p>
            </div>
            <p><a href="https://app.modulease.site/login" style="background: #0F172A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Access Portal Now</a></p>
            <p style="font-size: 12px; color: #64748B; margin-top: 30px;">Modulease Equipment Solutions • Kolkata, India</p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API Error:', data);
      return NextResponse.json({ error: data.message || 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
