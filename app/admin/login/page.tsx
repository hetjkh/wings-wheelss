"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to sign in");
        setLoading(false);
        return;
      }
      const next = searchParams.get("next") || "/admin/blogs";
      router.replace(next.startsWith("/admin") ? next : "/admin/blogs");
      router.refresh();
    } catch {
      setError("Unable to sign in");
      setLoading(false);
    }
  }

  return (
    <div className="admin-shell admin-login">
      <div className="admin-panel">
        <p className="admin-brand">Wings &amp; Wheels <span>Admin</span></p>
        <h1>Sign in</h1>
        <p className="lede">Manage journal stories from one place.</p>
        <form className="admin-form" onSubmit={onSubmit}>
          {error ? <p className="admin-error" role="alert">{error}</p> : null}
          <label>
            Email
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </label>
          <button className="admin-btn" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
