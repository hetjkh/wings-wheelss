"use client";

import { useState } from "react";

type AdminEnquiry = {
  id: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  service: string;
  destination: string;
  message: string;
  fields: Record<string, unknown>;
  emailSent: boolean;
  whatsappSent: boolean;
  createdAt: string;
};

function formatWhen(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function EnquiriesTable({ enquiries }: { enquiries: AdminEnquiry[] }) {
  const [openId, setOpenId] = useState<string | null>(enquiries[0]?.id ?? null);

  if (!enquiries.length) {
    return <p className="admin-empty">No enquiries yet. Submissions from the site forms will appear here.</p>;
  }

  return (
    <div className="admin-enquiry-list">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Received</th>
            <th>Contact</th>
            <th>Source</th>
            <th>Delivery</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {enquiries.map(enquiry => {
            const open = openId === enquiry.id;
            return (
              <tr key={enquiry.id} className={open ? "is-open" : undefined}>
                <td>
                  <div className="title">{formatWhen(enquiry.createdAt)}</div>
                  <div className="meta">{enquiry.service || enquiry.destination || "—"}</div>
                </td>
                <td>
                  <div className="title">{enquiry.name || "Anonymous"}</div>
                  <div className="meta">
                    {[enquiry.email, enquiry.phone, enquiry.whatsapp].filter(Boolean).join(" · ") || "No contact details"}
                  </div>
                </td>
                <td>{enquiry.source}</td>
                <td>
                  <div className="admin-delivery">
                    <span className={enquiry.emailSent ? "is-ok" : "is-miss"}>Email</span>
                    <span className={enquiry.whatsappSent ? "is-ok" : "is-miss"}>WhatsApp</span>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="admin-btn secondary"
                    onClick={() => setOpenId(open ? null : enquiry.id)}
                  >
                    {open ? "Hide" : "View"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {enquiries.map(enquiry => openId === enquiry.id ? (
        <article key={`detail-${enquiry.id}`} className="admin-enquiry-detail">
          <header>
            <h2>{enquiry.name || "Enquiry"} · {enquiry.source}</h2>
            <p>{formatWhen(enquiry.createdAt)}</p>
          </header>
          {enquiry.fields && Object.keys(enquiry.fields).length > 0 ? (
            <dl className="admin-whatsapp-meta" style={{ marginBottom: "1rem" }}>
              {Object.entries(enquiry.fields).map(([key, value]) => {
                if (value == null || value === "") return null;
                const text = Array.isArray(value) ? value.join(", ") : String(value);
                return (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{text}</dd>
                  </div>
                );
              })}
            </dl>
          ) : null}
          <pre>{enquiry.message}</pre>
        </article>
      ) : null)}
    </div>
  );
}
