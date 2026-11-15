import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/auth";
import { AdminChrome } from "../components/admin-chrome";
import "../admin.css";

export default async function AdminBlogsLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login?next=/admin/blogs");
  }

  return <AdminChrome>{children}</AdminChrome>;
}
