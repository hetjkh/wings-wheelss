"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/whatsapp", label: "WhatsApp" },
  { href: "/admin/blogs", label: "Blogs" },
];

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <div className="admin-frame">
        <header className="admin-top">
          <div className="admin-top-main">
            <p className="admin-brand">Wings &amp; Wheels <span>Admin</span></p>
            <nav className="admin-nav" aria-label="Admin">
              {nav.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname.startsWith(item.href) ? "is-active" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
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
