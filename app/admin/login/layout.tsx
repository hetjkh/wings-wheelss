import { Suspense } from "react";
import "../admin.css";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="admin-shell admin-login">Loading…</div>}>{children}</Suspense>;
}
