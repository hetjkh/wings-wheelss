import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import makeWASocket, {
  DisconnectReason,
  delay,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import QRCode from "qrcode";
import pino from "pino";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const PORT = Number(process.env.WHATSAPP_SERVICE_PORT || 3100);
const SECRET = process.env.WHATSAPP_SERVICE_SECRET || "";
const TO = (process.env.WHATSAPP_NOTIFY_TO || "971545649485").replace(/\D/g, "");
const AUTH_DIR = path.join(__dirname, "auth_info");
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

const state = {
  status: "starting",
  connected: false,
  qr: null,
  qrDataUrl: null,
  phone: null,
  lastError: null,
  lastSentAt: null,
};

let sock = null;
let restartTimer = null;

function toJid(number) {
  const digits = String(number).replace(/\D/g, "");
  return `${digits}@s.whatsapp.net`;
}

function authorized(req) {
  if (!SECRET) return false;
  return req.headers["x-whatsapp-secret"] === SECRET;
}

function json(res, statusCode, body) {
  res.writeHead(statusCode, {
    "content-type": "application/json",
    "cache-control": "no-store",
  });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

async function startSocket() {
  if (!fs.existsSync(AUTH_DIR)) fs.mkdirSync(AUTH_DIR, { recursive: true });

  const { state: authState, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: authState,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["Wings & Wheels", "Chrome", "1.0.0"],
    syncFullHistory: false,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async update => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      state.status = "qr";
      state.connected = false;
      state.qr = qr;
      state.qrDataUrl = await QRCode.toDataURL(qr, { margin: 1, width: 320 });
      logger.info("Scan the WhatsApp QR from the admin panel");
    }

    if (connection === "open") {
      state.status = "connected";
      state.connected = true;
      state.qr = null;
      state.qrDataUrl = null;
      state.lastError = null;
      state.phone = sock?.user?.id?.split(":")[0] || null;
      logger.info({ phone: state.phone }, "WhatsApp connected");
    }

    if (connection === "close") {
      state.connected = false;
      state.qr = null;
      state.qrDataUrl = null;
      const statusCode = (lastDisconnect?.error instanceof Boom)
        ? lastDisconnect.error.output?.statusCode
        : lastDisconnect?.error?.output?.statusCode;
      const loggedOut = statusCode === DisconnectReason.loggedOut;
      state.status = loggedOut ? "logged_out" : "disconnected";
      state.lastError = loggedOut ? "Logged out — scan QR again" : `Disconnected (${statusCode || "unknown"})`;
      logger.warn({ statusCode }, "WhatsApp connection closed");

      if (!loggedOut) {
        clearTimeout(restartTimer);
        restartTimer = setTimeout(() => startSocket().catch(err => {
          state.lastError = err.message;
          logger.error(err, "Failed to restart WhatsApp socket");
        }), 2500);
      }
    }
  });
}

async function sendText(text) {
  if (!sock || !state.connected) {
    const error = new Error("WhatsApp is not connected. Scan the QR in admin first.");
    error.code = "NOT_CONNECTED";
    throw error;
  }
  const jid = toJid(TO);
  await sock.sendMessage(jid, { text });
  state.lastSentAt = new Date().toISOString();
  return { to: TO, jid };
}

async function logout() {
  try {
    if (sock) await sock.logout();
  } catch {
    // ignore logout errors and wipe auth anyway
  }
  sock = null;
  state.connected = false;
  state.status = "logged_out";
  state.qr = null;
  state.qrDataUrl = null;
  state.phone = null;
  if (fs.existsSync(AUTH_DIR)) {
    fs.rmSync(AUTH_DIR, { recursive: true, force: true });
  }
  await delay(400);
  await startSocket();
}

const server = http.createServer(async (req, res) => {
  if (!authorized(req)) {
    return json(res, 401, { error: "Unauthorized" });
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/status") {
    return json(res, 200, {
      status: state.status,
      connected: state.connected,
      phone: state.phone,
      notifyTo: TO,
      qrDataUrl: state.qrDataUrl,
      lastError: state.lastError,
      lastSentAt: state.lastSentAt,
    });
  }

  if (req.method === "POST" && url.pathname === "/send") {
    const body = await readBody(req);
    const text = String(body.text || "").trim();
    if (!text) return json(res, 400, { error: "text is required" });
    try {
      const result = await sendText(text);
      return json(res, 200, { ok: true, ...result });
    } catch (error) {
      const status = error.code === "NOT_CONNECTED" ? 409 : 500;
      return json(res, status, { error: error.message || "Send failed" });
    }
  }

  if (req.method === "POST" && url.pathname === "/logout") {
    try {
      await logout();
      return json(res, 200, { ok: true, status: state.status });
    } catch (error) {
      return json(res, 500, { error: error.message || "Logout failed" });
    }
  }

  return json(res, 404, { error: "Not found" });
});

if (!SECRET) {
  console.error("Set WHATSAPP_SERVICE_SECRET before starting the WhatsApp service.");
  process.exit(1);
}

startSocket()
  .then(() => {
    server.listen(PORT, "127.0.0.1", () => {
      logger.info(`WhatsApp Baileys service listening on http://127.0.0.1:${PORT}`);
      logger.info(`Notifications will be sent to +${TO}`);
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
