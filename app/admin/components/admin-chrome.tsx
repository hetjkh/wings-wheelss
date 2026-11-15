"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <div className="admin-frame">
        <header className="admin-top">
          <p className="admin-brand">Wings &amp; Wheels <span>Admin</span></p>
          <div className="admin-actions">
            <Link className="admin-btn secondary" href="/blog" target="_blank">
              View journal
            </Link>
            <Link className="admin-btn" href="/admin/blogs/new">
              Add blog
            </Link>
            <button className="admin-btn secondary" type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
