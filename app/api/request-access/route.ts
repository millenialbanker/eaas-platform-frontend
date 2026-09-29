import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // 1. DATABASE CAPTURE: 
    // Here you can push `email` to your database (e.g., Supabase, Cloudflare D1, Vercel Postgres, or Google Sheets).
    console.log(`[LEAD CAPTURED] New EaaS Portal Access Request: ${email}`);

    // 2. CREDENTIAL DISPATCH:
    // Here you can trigger an email dispatch service (like Resend or SendGrid) to send 'modulease' / 'vip2026' to the user.
    // Example with Resend:
    /*
    await resend.emails.send({
      from: 'Modulease <founder@modulease.site>',
      to: email,
      subject: 'Your Modulease EaaS Portal Credentials',
      html: `<p>Hello,</p><p>Here are your secure credentials to access the Modulease EaaS engines:</p><p><strong>Username:</strong> modulease<br><strong>Password:</strong> vip2026</p><p><a href="https://app.modulease.site">Access Portal</a></p>`
    });
    */

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
