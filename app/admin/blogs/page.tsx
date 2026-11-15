import { listBlogsAdmin } from "../../../lib/blogs";
import { BlogsTable } from "../components/blogs-table";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  try {
    const blogs = await listBlogsAdmin();
    return (
      <section className="admin-panel">
        <h1>Journal blogs</h1>
        <p className="lede">Add, edit or remove stories shown on the public journal.</p>
        <BlogsTable blogs={blogs} />
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <section className="admin-panel">
        <h1>Journal blogs</h1>
        <p className="admin-error" role="alert">
          Could not reach MongoDB. Check your connection string and Atlas Network Access (allow your IP or 0.0.0.0/0).
        </p>
      </section>
    );
  }
}
