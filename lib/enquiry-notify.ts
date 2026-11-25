import type { serializeEnquiry } from "./enquiries";

type Enquiry = ReturnType<typeof serializeEnquiry>;

const SOURCE_LABELS: Record<string, string> = {
  contact: "Contact form",
  "quote-dialog": "Quick quote",
  destination: "Destination journey",
  africa: "Africa journey",
  "journey-planner": "Journey planner",
  "groups-mice": "Groups & MICE",
  franchise: "Franchise application",
  "corporate-partnership": "Corporate partnership",
  other: "Website enquiry",
};

const FIELD_META: Record<string, { label: string; group: "contact" | "trip" | "business" | "notes"; emoji: string }> = {
  name: { label: "Name", group: "contact", emoji: "👤" },
  fullName: { label: "Name", group: "contact", emoji: "👤" },
  email: { label: "Email", group: "contact", emoji: "✉️" },
  phone: { label: "Phone", group: "contact", emoji: "📞" },
  whatsapp: { label: "WhatsApp", group: "contact", emoji: "💬" },
  nationality: { label: "Nationality", group: "contact", emoji: "🌍" },
  service: { label: "Service", group: "trip", emoji: "🧳" },
  destination: { label: "Destination", group: "trip", emoji: "📍" },
  from: { label: "From", group: "trip", emoji: "🛫" },
  to: { label: "To", group: "trip", emoji: "🛬" },
  departure: { label: "Departure city", group: "trip", emoji: "🏙️" },
  start: { label: "Start date", group: "trip", emoji: "📅" },
  end: { label: "End date", group: "trip", emoji: "📅" },
  dates: { label: "Travel dates", group: "trip", emoji: "📅" },
  length: { label: "Trip length", group: "trip", emoji: "⏱️" },
  flexible: { label: "Dates flexible", group: "trip", emoji: "🔄" },
  travellers: { label: "Travellers", group: "trip", emoji: "👥" },
  adults: { label: "Adults", group: "trip", emoji: "👥" },
  children: { label: "Children", group: "trip", emoji: "🧒" },
  reason: { label: "Reason", group: "trip", emoji: "💭" },
  purpose: { label: "Purpose", group: "trip", emoji: "💭" },
  purposes: { label: "Purpose", group: "trip", emoji: "💭" },
  kind: { label: "Journey type", group: "trip", emoji: "✨" },
  kinds: { label: "Journey type", group: "trip", emoji: "✨" },
  type: { label: "Event type", group: "trip", emoji: "🎪" },
  origins: { label: "Coming from", group: "trip", emoji: "🗺️" },
  help: { label: "Help needed", group: "trip", emoji: "🤝" },
  company: { label: "Company", group: "business", emoji: "🏢" },
  jobTitle: { label: "Job title", group: "business", emoji: "💼" },
  country: { label: "Country", group: "business", emoji: "🌐" },
  city: { label: "City", group: "business", emoji: "🏙️" },
  website: { label: "Website", group: "business", emoji: "🔗" },
  industry: { label: "Industry", group: "business", emoji: "🏭" },
  employees: { label: "Employees", group: "business", emoji: "👥" },
  licence: { label: "Trade licence", group: "business", emoji: "📄" },
  department: { label: "Department", group: "business", emoji: "🗂️" },
  frequency: { label: "Travel frequency", group: "business", emoji: "🔁" },
  spend: { label: "Annual spend", group: "business", emoji: "💰" },
  services: { label: "Services needed", group: "business", emoji: "🧳" },
  benefits: { label: "Benefits", group: "business", emoji: "🎁" },
  routes: { label: "Routes", group: "business", emoji: "✈️" },
  management: { label: "Travel management", group: "business", emoji: "🧭" },
  agency: { label: "Current agency", group: "business", emoji: "🏷️" },
  timeline: { label: "Preferred start", group: "business", emoji: "🗓️" },
  businessType: { label: "Business type", group: "business", emoji: "🏪" },
  businessYears: { label: "Business experience", group: "business", emoji: "📈" },
  tourismYears: { label: "Tourism experience", group: "business", emoji: "🌴" },
  market: { label: "Preferred market", group: "business", emoji: "🎯" },
  investment: { label: "Investment capacity", group: "business", emoji: "💵" },
  interest: { label: "Interest", group: "notes", emoji: "💡" },
  overview: { label: "Overview", group: "notes", emoji: "📝" },
  notes: { label: "Notes", group: "notes", emoji: "📝" },
  comments: { label: "Comments", group: "notes", emoji: "📝" },
  message: { label: "Message", group: "notes", emoji: "💌" },
};

const GROUP_META = {
  contact: { title: "Contact", emoji: "👤" },
  trip: { title: "Trip details", emoji: "✈️" },
  business: { title: "Business", emoji: "🏢" },
  notes: { title: "Message", emoji: "💌" },
} as const;

function formatValue(value: unknown) {
  if (value == null || value === "") return "";
  if (Array.isArray(value)) return value.map(String).filter(Boolean).join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value).trim();
}

function collectFields(enquiry: Enquiry) {
  const fields = { ...(enquiry.fields || {}) } as Record<string, unknown>;
  if (enquiry.name) fields.name = fields.name || enquiry.name;
  if (enquiry.email) fields.email = fields.email || enquiry.email;
  if (enquiry.phone) fields.phone = fields.phone || enquiry.phone;
  if (enquiry.whatsapp) fields.whatsapp = fields.whatsapp || enquiry.whatsapp;
  if (enquiry.service) fields.service = fields.service || enquiry.service;
  if (enquiry.destination) fields.destination = fields.destination || enquiry.destination;

  const seenLabels = new Set<string>();
  const items: { key: string; label: string; emoji: string; group: keyof typeof GROUP_META; value: string }[] = [];

  const order = Object.keys(FIELD_META);
  const keys = [...order.filter(key => key in fields), ...Object.keys(fields).filter(key => !order.includes(key))];

  for (const key of keys) {
    if (key === "consent") continue;
    const value = formatValue(fields[key]);
    if (!value) continue;
    const meta = FIELD_META[key] || {
      label: key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase()),
      group: "notes" as const,
      emoji: "•",
    };
    const dedupe = `${meta.group}:${meta.label.toLowerCase()}`;
    if (seenLabels.has(dedupe)) continue;
    seenLabels.add(dedupe);
    items.push({ key, label: meta.label, emoji: meta.emoji, group: meta.group, value });
  }

  return items;
}

function sourceLabel(source: string) {
  return SOURCE_LABELS[source] || source;
}

function whenLabel(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatEnquirySubject(enquiry: Enquiry) {
  const who = enquiry.name || "New traveller";
  const where = enquiry.destination ? ` · ${enquiry.destination}` : "";
  return `✨ ${sourceLabel(enquiry.source)} — ${who}${where}`;
}

/** WhatsApp-friendly message: clear sections, light emoji, bold labels. */
export function formatEnquiryWhatsApp(enquiry: Enquiry) {
  const items = collectFields(enquiry);
  const groups = (Object.keys(GROUP_META) as (keyof typeof GROUP_META)[])
    .map(group => ({ group, rows: items.filter(item => item.group === group) }))
    .filter(section => section.rows.length);

  const lines = [
    `✨ *Wings & Wheels*`,
    `*New ${sourceLabel(enquiry.source)}*`,
    enquiry.createdAt ? `_Received ${whenLabel(enquiry.createdAt)}_` : "",
    "",
    "────────────",
  ];

  for (const section of groups) {
    const meta = GROUP_META[section.group];
    lines.push("", `${meta.emoji} *${meta.title}*`);
    for (const row of section.rows) {
      lines.push(`${row.emoji} *${row.label}:* ${row.value}`);
    }
  }

  lines.push("", "────────────", "_Reply to this traveller when ready._");
  return lines.filter(line => line !== undefined).join("\n").trim();
}

/** Plain-text email fallback. */
export function formatEnquiryEmailText(enquiry: Enquiry) {
  const items = collectFields(enquiry);
  const lines = [
    "WINGS & WHEELS — NEW ENQUIRY",
    sourceLabel(enquiry.source).toUpperCase(),
    enquiry.createdAt ? `Received: ${whenLabel(enquiry.createdAt)}` : "",
    "",
    ...items.map(item => `${item.label}: ${item.value}`),
    "",
    "—",
    "Open Admin → Enquiries to follow up.",
  ];
  return lines.filter(Boolean).join("\n");
}

/** HTML email — travel desk card, easy to scan. */
export function formatEnquiryEmailHtml(enquiry: Enquiry) {
  const items = collectFields(enquiry);
  const groups = (Object.keys(GROUP_META) as (keyof typeof GROUP_META)[])
    .map(group => ({ group, rows: items.filter(item => item.group === group) }))
    .filter(section => section.rows.length);

  const who = enquiry.name || "A new traveller";
  const where = enquiry.destination ? ` looking at <strong>${escapeHtml(enquiry.destination)}</strong>` : "";

  const sections = groups.map(section => {
    const meta = GROUP_META[section.group];
    const rows = section.rows.map(row => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #efe8de;width:34%;color:#6b6358;font-size:13px;vertical-align:top;">${escapeHtml(row.emoji)} ${escapeHtml(row.label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #efe8de;color:#1b2430;font-size:15px;font-weight:600;vertical-align:top;">${escapeHtml(row.value)}</td>
      </tr>`).join("");

    return `
      <div style="margin:0 0 22px;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#9a7b4f;font-weight:700;">${escapeHtml(meta.emoji)} ${escapeHtml(meta.title)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
      </div>`;
  }).join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4efe7;font-family:Georgia,'Times New Roman',serif;color:#1b2430;">
  <div style="max-width:640px;margin:0 auto;padding:28px 16px;">
    <div style="background:linear-gradient(135deg,#152238,#243652);border-radius:20px 20px 0 0;padding:28px 28px 24px;color:#fff;">
      <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#d4b483;">Wings &amp; Wheels</p>
      <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:400;">New enquiry arrived</h1>
      <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:rgba(255,255,255,0.82);">
        ${escapeHtml(who)}${where}
      </p>
    </div>
    <div style="background:#fffaf3;border:1px solid #e7dccb;border-top:0;border-radius:0 0 20px 20px;padding:26px 28px 10px;">
      <div style="display:inline-block;margin:0 0 18px;padding:8px 12px;border-radius:999px;background:#f0e4d2;color:#6b4f2c;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.04em;">
        ${escapeHtml(sourceLabel(enquiry.source))}
      </div>
      ${enquiry.createdAt ? `<p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:13px;color:#7a7166;">Received ${escapeHtml(whenLabel(enquiry.createdAt))}</p>` : ""}
      ${sections}
    </div>
    <p style="margin:18px 8px 0;font-family:Arial,sans-serif;font-size:12px;color:#8a8176;text-align:center;">
      Reply directly to this email to reach the traveller${enquiry.email ? ` (${escapeHtml(enquiry.email)})` : ""}.
    </p>
  </div>
</body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
