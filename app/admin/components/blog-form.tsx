"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { blogCategories, type BlogCategory } from "../../components/blog-posts";
import { BlogPreview } from "./blog-preview";

export type BlogFormValues = {
  slug: string;
  title: string;
  lines: string;
  excerpt: string;
  category: BlogCategory;
  image: string;
  alt: string;
  pull: string;
  paragraphs: string;
};

type BlogMeta = {
  date: string;
  dateTime: string;
  read: string;
  position?: string;
};

const emptyValues: BlogFormValues = {
  slug: "",
  title: "",
  lines: "",
  excerpt: "",
  category: "Planning",
  image: "",
  alt: "",
  pull: "",
  paragraphs: "",
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatDisplayDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function estimateRead(paragraphs: string) {
  const words = paragraphs.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180));
  return `${minutes} min`;
}

function parseLines(value: string) {
  return value.split("\n").map(line => line.trim()).filter(Boolean);
}

function parseParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);
}

function toPayload(values: BlogFormValues, meta: BlogMeta) {
  const dateTime = meta.dateTime || todayIso();
  return {
    slug: values.slug,
    title: values.title,
    lines: parseLines(values.lines),
    excerpt: values.excerpt,
    category: values.category,
    date: meta.date || formatDisplayDate(dateTime),
    dateTime,
    read: meta.read || estimateRead(values.paragraphs),
    image: values.image,
    alt: values.alt,
    position: meta.position || "center",
    pull: values.pull,
    paragraphs: parseParagraphs(values.paragraphs),
  };
}

export function BlogForm({
  mode,
  blogId,
  initial,
  initialMeta,
}: {
  mode: "create" | "edit";
  blogId?: string;
  initial?: Partial<BlogFormValues>;
  initialMeta?: Partial<BlogMeta>;
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const starting = useMemo(() => ({ ...emptyValues, ...initial }), [initial]);
  const [values, setValues] = useState<BlogFormValues>(starting);
  const [error, setError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const previewMeta = useMemo(() => {
    const dateTime = initialMeta?.dateTime || todayIso();
    return {
      date: initialMeta?.date || formatDisplayDate(dateTime),
      read: estimateRead(values.paragraphs) || initialMeta?.read || "1 min",
    };
  }, [initialMeta?.date, initialMeta?.dateTime, initialMeta?.read, values.paragraphs]);

  function update<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setValues(current => ({ ...current, [key]: value }));
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    setUploadMessage("");

    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to upload image");
        return;
      }
      update("image", data.url);
      setUploadMessage("Image uploaded.");
    } catch {
      setError("Unable to upload image");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const dateTime = mode === "edit" && initialMeta?.dateTime ? initialMeta.dateTime : todayIso();
    const payload = toPayload(values, {
      dateTime,
      date: mode === "edit" && initialMeta?.date ? initialMeta.date : formatDisplayDate(dateTime),
      read: estimateRead(values.paragraphs),
      position: initialMeta?.position || "center",
    });

    const response = await fetch(mode === "create" ? "/api/admin/blogs" : `/api/admin/blogs/${blogId}`, {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to save blog");
      return;
    }

    router.push("/admin/blogs");
    router.refresh();
  }

  return (
    <div className="admin-editor-layout">
      <form className="admin-form admin-panel" onSubmit={onSubmit}>
        {error ? <p className="admin-error" role="alert">{error}</p> : null}
        {uploadMessage ? <p className="admin-success" role="status">{uploadMessage}</p> : null}

        <label>
          Title
          <input
            value={values.title}
            onChange={event => {
              const title = event.target.value;
              setValues(current => ({
                ...current,
                title,
                // Keep hero lines in sync until the user customises them.
                lines: !current.lines.trim() || current.lines.trim() === current.title.trim()
                  ? title
                  : current.lines,
              }));
            }}
            placeholder="Full story name for lists and SEO"
            required
          />
          <span className="admin-hint">Shown on the blog list / cards. Example: “A slower way to cross Europe”</span>
        </label>

        <label>
          Slug
          <input
            value={values.slug}
            onChange={event => update("slug", event.target.value)}
            placeholder="auto-from-title-if-empty"
          />
        </label>

        <label>
          Hero headline (title lines)
          <textarea
            value={values.lines}
            onChange={event => update("lines", event.target.value)}
            placeholder={"A slower way\nthrough\nEurope."}
            required
          />
          <span className="admin-hint">Big stacked text on the article cover. Put each line on its own row. Can match the title, or be shorter.</span>
        </label>

        <label>
          Excerpt
          <textarea value={values.excerpt} onChange={event => update("excerpt", event.target.value)} required />
          <span className="admin-hint">Short summary under the card / at the top of the preview.</span>
        </label>

        <label>
          Category
          <select
            value={values.category}
            onChange={event => update("category", event.target.value as BlogCategory)}
          >
            {blogCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <div className="admin-upload-block">
          <label>
            Image URL
            <input
              value={values.image}
              onChange={event => update("image", event.target.value)}
              placeholder="https://wwtravels.net/uploads/..."
              required
            />
          </label>
          <div className="admin-upload-row">
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={event => {
                const file = event.target.files?.[0];
                if (file) void uploadImage(file);
              }}
            />
            <button
              className="admin-btn"
              type="button"
              disabled={uploading}
              onClick={() => fileInput.current?.click()}
            >
              {uploading ? "Uploading…" : "Upload image"}
            </button>
          </div>
          <span className="admin-hint">JPEG, PNG, WebP or GIF up to 5MB.</span>
        </div>

        <label>
          Image alt text
          <input value={values.alt} onChange={event => update("alt", event.target.value)} required />
        </label>

        <label>
          Pull quote
          <textarea
            value={values.pull}
            onChange={event => update("pull", event.target.value)}
            placeholder="One short memorable line"
            required
          />
          <span className="admin-hint">Highlighted quote in the middle of the article. Look for it labelled in the preview.</span>
        </label>

        <label>
          Paragraphs
          <textarea
            className="tall"
            value={values.paragraphs}
            onChange={event => update("paragraphs", event.target.value)}
            required
          />
          <span className="admin-hint">Separate paragraphs with a blank line. The pull quote sits after the first paragraph.</span>
        </label>

        <div className="admin-actions">
          <button className="admin-btn" type="submit" disabled={loading || uploading}>
            {loading ? "Saving…" : mode === "create" ? "Publish blog" : "Save changes"}
          </button>
          <button className="admin-btn secondary" type="button" onClick={() => router.push("/admin/blogs")}>
            Cancel
          </button>
        </div>
      </form>

      <aside className="admin-panel admin-preview-panel">
        <h2>Live preview</h2>
        <p className="lede">How this story will look on the journal.</p>
        <BlogPreview
          post={{
            title: values.title,
            lines: parseLines(values.lines),
            excerpt: values.excerpt,
            category: values.category,
            date: previewMeta.date,
            read: previewMeta.read,
            image: values.image,
            alt: values.alt,
            pull: values.pull,
            paragraphs: parseParagraphs(values.paragraphs),
          }}
        />
      </aside>
    </div>
  );
}
