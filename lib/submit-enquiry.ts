import type { EnquiryInput, EnquirySource } from "./enquiry-types";

export type { EnquiryInput, EnquirySource };

export type SubmitEnquiryResult =
  | { ok: true; id: string; emailSent: boolean; whatsappSent: boolean }
  | { ok: false; error: string };

/** Browser helper used by every public form. */
export async function submitEnquiry(input: EnquiryInput): Promise<SubmitEnquiryResult> {
  try {
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { ok: false, error: data.error || "Unable to send your enquiry right now." };
    }
    return {
      ok: true,
      id: data.enquiry?.id || "",
      emailSent: Boolean(data.enquiry?.emailSent),
      whatsappSent: Boolean(data.enquiry?.whatsappSent),
    };
  } catch {
    return { ok: false, error: "Unable to send your enquiry right now." };
  }
}

export function formDataToFields(data: FormData) {
  const fields: Record<string, string | string[]> = {};
  for (const [key, value] of data.entries()) {
    const text = String(value).trim();
    if (!text) continue;
    const existing = fields[key];
    if (existing === undefined) fields[key] = text;
    else if (Array.isArray(existing)) existing.push(text);
    else fields[key] = [existing, text];
  }
  return fields;
}

export function enquiryFromFormData(
  source: EnquirySource,
  data: FormData,
  extras?: Partial<EnquiryInput>,
): EnquiryInput {
  const fields = formDataToFields(data);
  const mergedFields = { ...fields, ...(extras?.fields || {}) };
  return {
    source,
    name: String(fields.name || fields.fullName || extras?.name || ""),
    email: String(fields.email || extras?.email || ""),
    phone: String(fields.phone || extras?.phone || ""),
    whatsapp: String(fields.whatsapp || extras?.whatsapp || ""),
    service: String(fields.service || extras?.service || ""),
    destination: String(fields.destination || fields.to || extras?.destination || ""),
    message: extras?.message || (typeof fields.message === "string" ? fields.message : undefined),
    fields: mergedFields,
  };
}
