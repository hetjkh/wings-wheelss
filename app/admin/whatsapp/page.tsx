import { WhatsAppConnect } from "../components/whatsapp-connect";

export const dynamic = "force-dynamic";

export default function AdminWhatsAppPage() {
  return (
    <section className="admin-panel">
      <h1>WhatsApp connect</h1>
      <p className="lede">
        Scan this QR with the phone that should send alerts (<strong>+91 90167 43347</strong>).
        New form enquiries are forwarded to <strong>+971 54 564 9485</strong>.
      </p>
      <WhatsAppConnect />
    </section>
  );
}
