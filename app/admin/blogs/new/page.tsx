import { BlogForm } from "../../components/blog-form";

export default function NewBlogPage() {
  return (
    <section>
      <div className="admin-panel" style={{ marginBottom: "1rem" }}>
        <h1>Add blog</h1>
        <p className="lede">Create a new journal story. Preview updates as you type.</p>
      </div>
      <BlogForm mode="create" />
    </section>
  );
}
