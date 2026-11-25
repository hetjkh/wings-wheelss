import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/auth";
import { AdminChrome } from "../components/admin-chrome";
import "../admin.css";

export default async function AdminEnquiriesLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login?next=/admin/enquiries");
  }

  return <AdminChrome>{children}</AdminChrome>;
}
