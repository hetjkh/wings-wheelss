import nodemailer from "nodemailer";

const ENQUIRY_TO = process.env.ENQUIRY_EMAIL_TO || "info@wwtravels.net";
const ENQUIRY_FROM = process.env.ENQUIRY_EMAIL_FROM || process.env.SMTP_USER || "noreply@wwtravels.net";

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendEnquiryEmail(options: {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  if (!smtpConfigured()) {
    console.warn("[email] SMTP not configured — enquiry email skipped");
    return { ok: false as const, error: "SMTP not configured" };
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `Wings & Wheels <${ENQUIRY_FROM}>`,
    to: ENQUIRY_TO,
    replyTo: options.replyTo || undefined,
    subject: options.subject,
    text: options.text,
    html: options.html || undefined,
  });

  return { ok: true as const };
}
