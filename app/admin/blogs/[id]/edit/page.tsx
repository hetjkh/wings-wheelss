import { notFound } from "next/navigation";
import { getBlogById } from "../../../../../lib/blogs";
import { BlogForm } from "../../../components/blog-form";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) notFound();

  return (
    <section>
      <div className="admin-panel" style={{ marginBottom: "1rem" }}>
        <h1>Edit blog</h1>
        <p className="lede">Update “{blog.title}” and check the live preview before saving.</p>
      </div>
      <BlogForm
        mode="edit"
        blogId={blog.id}
        initial={{
          slug: blog.slug,
          title: blog.title,
          lines: blog.lines.join("\n"),
          excerpt: blog.excerpt,
          category: blog.category,
          image: blog.image,
          alt: blog.alt,
          pull: blog.pull,
          paragraphs: blog.paragraphs.join("\n\n"),
        }}
        initialMeta={{
          date: blog.date,
          dateTime: blog.dateTime,
          read: blog.read,
          position: blog.position || "center",
        }}
      />
    </section>
  );
}
