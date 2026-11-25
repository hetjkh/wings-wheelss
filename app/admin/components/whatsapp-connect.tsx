"use client";

import { useEffect, useState } from "react";

type WhatsAppStatus = {
  status?: string;
  connected?: boolean;
  phone?: string | null;
  notifyTo?: string;
  qrDataUrl?: string | null;
  lastError?: string | null;
  lastSentAt?: string | null;
  error?: string;
};

export function WhatsAppConnect() {
  const [data, setData] = useState<WhatsAppStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await fetch("/api/admin/whatsapp", { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error || "WhatsApp service unreachable");
        setData(json);
        return;
      }
      setError("");
      setData(json);
    } catch {
      setError("WhatsApp service unreachable. Start the Baileys process in /whatsapp.");
    }
  }

  useEffect(() => {
    let active = true;
    const tick = async () => {
      if (!active) return;
      await load();
    };
    tick();
    const timer = setInterval(tick, 2500);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  async function logout() {
    if (!window.confirm("Disconnect WhatsApp and show a new QR?")) return;
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/whatsapp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    const json = await response.json();
    setBusy(false);
    if (!response.ok) {
      setError(json.error || "Could not disconnect");
      return;
    }
    await load();
  }

  const connected = Boolean(data?.connected);
  const qr = data?.qrDataUrl;

  return (
    <div className="admin-whatsapp">
      {error ? <p className="admin-error" role="alert">{error}</p> : null}

      <div className="admin-whatsapp-grid">
        <div className="admin-whatsapp-card">
          <p className="admin-hint">Connection status</p>
          <h2>{connected ? "Connected" : data?.status === "qr" ? "Waiting for scan" : data?.status || "Unknown"}</h2>
          <dl className="admin-whatsapp-meta">
            <div><dt>Sender phone</dt><dd>{data?.phone ? `+${data.phone}` : "Not linked yet"}</dd></div>
            <div><dt>Notify to</dt><dd>{data?.notifyTo ? `+${data.notifyTo}` : "+971545649485"}</dd></div>
            <div><dt>Last alert</dt><dd>{data?.lastSentAt ? new Date(data.lastSentAt).toLocaleString() : "None yet"}</dd></div>
          </dl>
          {data?.lastError ? <p className="admin-error">{data.lastError}</p> : null}
          <div className="admin-row-actions">
            <button type="button" className="admin-btn secondary" onClick={load}>Refresh</button>
            <button type="button" className="admin-btn danger" disabled={busy} onClick={logout}>
              {busy ? "Disconnecting…" : "Disconnect / new QR"}
            </button>
          </div>
        </div>

        <div className="admin-whatsapp-card admin-whatsapp-qr">
          <p className="admin-hint">QR code</p>
          {connected ? (
            <p className="admin-success">Phone is linked. New enquiries will be sent automatically.</p>
          ) : qr ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qr} alt="WhatsApp connection QR code" width={280} height={280} />
              <p>Open WhatsApp on +91 90167 43347 → Linked devices → Link a device → scan this code.</p>
            </>
          ) : (
            <p className="admin-empty">
              No QR yet. Make sure the Baileys service is running (`npm start` inside `/whatsapp`), then refresh.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
