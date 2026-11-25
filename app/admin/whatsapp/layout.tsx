import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/auth";
import { AdminChrome } from "../components/admin-chrome";
import "../admin.css";

export default async function AdminWhatsAppLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login?next=/admin/whatsapp");
  }

  return <AdminChrome>{children}</AdminChrome>;
}
