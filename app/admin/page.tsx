import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/auth";

export default async function AdminIndexPage() {
  if (await isAdminAuthenticated()) redirect("/admin/enquiries");
  redirect("/admin/login");
}
