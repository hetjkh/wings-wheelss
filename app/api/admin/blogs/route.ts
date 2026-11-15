import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/auth";
import { createBlog, listBlogsAdmin } from "../../../../lib/blogs";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await listBlogsAdmin();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await createBlog(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }
    return NextResponse.json({ blog: result.blog }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
