import { ObjectId, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";
import type { EnquiryInput, EnquirySource } from "./enquiry-types";

export type { EnquiryInput, EnquirySource } from "./enquiry-types";

export type EnquiryDocument = {
  _id?: ObjectId;
  source: EnquirySource;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  service?: string;
  destination?: string;
  message: string;
  fields: Record<string, string | number | boolean | string[] | null | undefined>;
  emailSent: boolean;
  whatsappSent: boolean;
  createdAt: Date;
};

function collection() {
  return getDb().then(db => db.collection<EnquiryDocument>("enquiries"));
}

function cleanText(value: unknown, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

export function normalizeEnquiry(input: EnquiryInput) {
  const fields = input.fields && typeof input.fields === "object" ? input.fields : {};
  const name = cleanText(input.name ?? fields.name ?? fields.fullName, 120);
  const email = cleanText(input.email ?? fields.email, 160).toLowerCase();
  const phone = cleanText(input.phone ?? fields.phone, 40);
  const whatsapp = cleanText(input.whatsapp ?? fields.whatsapp, 40);
  const service = cleanText(input.service ?? fields.service, 120);
  const destination = cleanText(input.destination ?? fields.destination ?? fields.to, 160);
  const message = cleanText(input.message, 4000);
  const source = (input.source || "other") as EnquirySource;

  const errors: string[] = [];
  if (!message && !Object.keys(fields).length) errors.push("Message is required");
  if (email && !email.includes("@")) errors.push("Email looks invalid");

  return {
    ok: errors.length === 0,
    errors,
    enquiry: {
      source,
      name,
      email,
      phone,
      whatsapp: whatsapp || undefined,
      service: service || undefined,
      destination: destination || undefined,
      message: message || buildMessageFromFields(source, name, email, phone, fields),
      fields,
    } satisfies Omit<EnquiryDocument, "_id" | "emailSent" | "whatsappSent" | "createdAt">,
  };
}

function buildMessageFromFields(
  source: string,
  name: string,
  email: string,
  phone: string,
  fields: Record<string, string | number | boolean | string[] | null | undefined>,
) {
  const lines = [
    `New ${source} enquiry from the website`,
    name ? `Name: ${name}` : "",
    email ? `Email: ${email}` : "",
    phone ? `Phone: ${phone}` : "",
    ...Object.entries(fields)
      .filter(([key]) => !["name", "fullName", "email", "phone", "whatsapp"].includes(key))
      .map(([key, value]) => {
        if (value == null || value === "") return "";
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase());
        const text = Array.isArray(value) ? value.join(", ") : String(value);
        return `${label}: ${text}`;
      }),
  ].filter(Boolean);
  return lines.join("\n");
}

export function serializeEnquiry(doc: WithId<Document> | EnquiryDocument) {
  return {
    id: "_id" in doc && doc._id ? String(doc._id) : "",
    source: String(doc.source ?? "other"),
    name: String(doc.name ?? ""),
    email: String(doc.email ?? ""),
    phone: String(doc.phone ?? ""),
    whatsapp: doc.whatsapp ? String(doc.whatsapp) : "",
    service: doc.service ? String(doc.service) : "",
    destination: doc.destination ? String(doc.destination) : "",
    message: String(doc.message ?? ""),
    fields: (doc.fields && typeof doc.fields === "object" ? doc.fields : {}) as Record<string, unknown>,
    emailSent: Boolean(doc.emailSent),
    whatsappSent: Boolean(doc.whatsappSent),
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt ?? ""),
  };
}

export async function createEnquiry(input: EnquiryInput) {
  const normalized = normalizeEnquiry(input);
  if (!normalized.ok) return { ok: false as const, errors: normalized.errors };

  const enquiries = await collection();
  await enquiries.createIndex({ createdAt: -1 });

  const now = new Date();
  const doc: EnquiryDocument = {
    ...normalized.enquiry,
    emailSent: false,
    whatsappSent: false,
    createdAt: now,
  };
  const result = await enquiries.insertOne(doc);
  return {
    ok: true as const,
    enquiry: serializeEnquiry({ ...doc, _id: result.insertedId }),
  };
}

export async function markEnquiryDelivery(id: string, patch: { emailSent?: boolean; whatsappSent?: boolean }) {
  if (!ObjectId.isValid(id)) return;
  const enquiries = await collection();
  await enquiries.updateOne({ _id: new ObjectId(id) }, { $set: patch });
}

export async function listEnquiriesAdmin(limit = 200) {
  const enquiries = await collection();
  await enquiries.createIndex({ createdAt: -1 });
  const docs = await enquiries.find({}).sort({ createdAt: -1 }).limit(limit).toArray();
  return docs.map(serializeEnquiry);
}

export { formatEnquiryWhatsApp as formatEnquiryForNotify } from "./enquiry-notify";
