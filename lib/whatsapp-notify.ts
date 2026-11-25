const DEFAULT_URL = "http://127.0.0.1:3100";

function serviceUrl() {
  return (process.env.WHATSAPP_SERVICE_URL || DEFAULT_URL).replace(/\/$/, "");
}

function serviceSecret() {
  return process.env.WHATSAPP_SERVICE_SECRET || "";
}

async function whatsappFetch(path: string, init?: RequestInit) {
  const secret = serviceSecret();
  if (!secret) {
    return { ok: false as const, status: 503, data: { error: "WHATSAPP_SERVICE_SECRET not set" } };
  }

  try {
    const response = await fetch(`${serviceUrl()}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        "x-whatsapp-secret": secret,
        ...(init?.headers || {}),
      },
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return {
      ok: false as const,
      status: 503,
      data: { error: error instanceof Error ? error.message : "WhatsApp service unreachable" },
    };
  }
}

export async function notifyWhatsApp(text: string) {
  return whatsappFetch("/send", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export async function getWhatsAppStatus() {
  return whatsappFetch("/status");
}

export async function logoutWhatsApp() {
  return whatsappFetch("/logout", { method: "POST", body: "{}" });
}
