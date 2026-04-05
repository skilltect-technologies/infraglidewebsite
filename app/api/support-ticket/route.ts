import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, email, subject, category, priority, description } = body;

  if (!fullName || !email || !subject || !description) {
    return NextResponse.json(
      { error: "Full name, email, subject, and description are required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 }
    );
  }

  const contactEmail =
    process.env.SUPPORT_EMAIL ??
    process.env.CONTACT_EMAIL ??
    "prashant.jinega@skilltect.com";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;

  const mailOptions = {
    from: `"InfraGlide Support" <${process.env.SMTP_USER ?? contactEmail}>`,
    to: contactEmail,
    replyTo: email,
    subject: `[${ticketId}] ${subject} — ${fullName}`,
    html: `
      <h2>New Support Ticket</h2>
      <table cellpadding="8" style="border-collapse:collapse; font-family:sans-serif; font-size:14px;">
        <tr><td><strong>Ticket ID</strong></td><td>${ticketId}</td></tr>
        <tr><td><strong>Full Name</strong></td><td>${fullName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Category</strong></td><td>${category || "General"}</td></tr>
        <tr><td><strong>Priority</strong></td><td>${priority || "Medium"}</td></tr>
        <tr><td><strong>Subject</strong></td><td>${subject}</td></tr>
        <tr><td><strong>Description</strong></td><td style="white-space:pre-wrap">${description}</td></tr>
      </table>
    `,
    text: `New Support Ticket\n\nTicket ID: ${ticketId}\nFull Name: ${fullName}\nEmail: ${email}\nCategory: ${category || "General"}\nPriority: ${priority || "Medium"}\nSubject: ${subject}\nDescription: ${description}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, ticketId });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send ticket. Please try again later." },
      { status: 500 }
    );
  }
}
