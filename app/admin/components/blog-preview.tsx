"use client";

import type { BlogCategory } from "../../components/blog-posts";

export type BlogPreviewData = {
  title: string;
  lines: string[];
  excerpt: string;
  category: BlogCategory;
  date: string;
  read: string;
  image: string;
  alt: string;
  pull: string;
  paragraphs: string[];
};

export function BlogPreview({ post }: { post: BlogPreviewData }) {
  const heroLines = post.lines.length ? post.lines : ["Hero headline appears here"];
  const paragraphs = post.paragraphs.length
    ? post.paragraphs
    : ["Write your first paragraph…", "Write a second paragraph to see the full story flow."];

  return (
    <div className="admin-blog-preview" aria-label="Blog preview">
      <div className="admin-preview-callout">
        <strong>List / card title</strong>
        <span>{post.title || "Type the Title field — this is the full story name in lists."}</span>
      </div>

      <p className="admin-preview-section-label">Hero on the article page (from Title lines)</p>
      <div className="admin-preview-hero">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt={post.alt || post.title || "Blog cover"} />
        ) : (
          <div className="admin-preview-hero-empty">Upload an image to preview the cover</div>
        )}
        <div className="admin-preview-hero-copy">
          <p className="admin-preview-eyebrow">{post.category || "Category"}</p>
          <h2>
            {heroLines.map((line, index) => (
              <span key={`${line}-${index}`} className={index === heroLines.length - 1 ? "is-accent" : undefined}>
                {line}
                {index < heroLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p className="admin-preview-meta">
            {post.date || "Date"} · {post.read || "1 min"} read
          </p>
        </div>
      </div>

      <div className="admin-preview-body">
        <aside>
          <span>In the field</span>
          <p>A few notes.<br />A fresh perspective.<br />Your next departure.</p>
        </aside>
        <div className="admin-preview-prose">
          {post.excerpt ? (
            <>
              <p className="admin-preview-section-label">Excerpt</p>
              <p className="admin-preview-excerpt">{post.excerpt}</p>
            </>
          ) : null}

          <p className="admin-preview-section-label">Story body</p>
          {paragraphs.map((paragraph, index) => (
            <div key={`${index}-${paragraph.slice(0, 24)}`}>
              <p>{paragraph}</p>
              {index === 0 ? (
                <div className="admin-preview-pull">
                  <p className="admin-preview-section-label">Pull quote (highlighted after first paragraph)</p>
                  {post.pull ? (
                    <blockquote>
                      <span aria-hidden="true">“</span>
                      {post.pull}
                    </blockquote>
                  ) : (
                    <p className="admin-preview-pull-empty">Type a Pull quote — a short memorable line shown like this.</p>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
