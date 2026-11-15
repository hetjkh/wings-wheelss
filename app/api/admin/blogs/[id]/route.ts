import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../../lib/auth";
import { deleteBlog, getBlogById, updateBlog } from "../../../../../lib/blogs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const blog = await getBlogById(id);
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load blog" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const result = await updateBlog(id, body);
    if (!result.ok) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }
    return NextResponse.json({ blog: result.blog });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const result = await deleteBlog(id);
    if (!result.ok) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
