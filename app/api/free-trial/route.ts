import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, email, company, phone } = body;

  if (!fullName || !email || !company) {
    return NextResponse.json(
      { error: "Full name, email, and company are required." },
      { status: 400 }
    );
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 }
    );
  }

  const contactEmail =
    process.env.CONTACT_EMAIL ?? "prashant.jinega@skilltect.com";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"InfraGlide Free Trial" <${process.env.SMTP_USER ?? contactEmail}>`,
    to: contactEmail,
    replyTo: email,
    subject: `New Free Trial Request — ${fullName}`,
    html: `
      <h2>New Free Trial Sign-Up</h2>
      <table cellpadding="8" style="border-collapse:collapse; font-family:sans-serif; font-size:14px;">
        <tr><td><strong>Full Name</strong></td><td>${fullName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Company</strong></td><td>${company}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone || "—"}</td></tr>
      </table>
    `,
    text: `New Free Trial Sign-Up\n\nFull Name: ${fullName}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone || "—"}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
