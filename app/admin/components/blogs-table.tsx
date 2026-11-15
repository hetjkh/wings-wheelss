"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminBlog = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  read: string;
};

export function BlogsTable({ blogs }: { blogs: AdminBlog[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function remove(id: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setPendingId(id);
    setError("");

    const response = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    const data = await response.json();
    setPendingId(null);

    if (!response.ok) {
      setError(data.error || "Unable to delete blog");
      return;
    }

    router.refresh();
  }

  if (!blogs.length) {
    return <p className="admin-empty">No blogs yet. Add the first story to get started.</p>;
  }

  return (
    <>
      {error ? <p className="admin-error" role="alert">{error}</p> : null}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Story</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>
                <div className="title">{blog.title}</div>
                <div className="meta">/{blog.slug} · {blog.read}</div>
              </td>
              <td>{blog.category}</td>
              <td>{blog.date}</td>
              <td>
                <div className="admin-row-actions">
                  <Link className="admin-btn secondary" href={`/blog/${blog.slug}`} target="_blank">
                    View
                  </Link>
                  <Link className="admin-btn secondary" href={`/admin/blogs/${blog.id}/edit`}>
                    Edit
                  </Link>
                  <button
                    className="admin-btn danger"
                    type="button"
                    disabled={pendingId === blog.id}
                    onClick={() => remove(blog.id, blog.title)}
                  >
                    {pendingId === blog.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
