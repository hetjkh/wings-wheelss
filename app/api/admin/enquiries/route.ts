import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/auth";
import { listEnquiriesAdmin } from "../../../../lib/enquiries";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const enquiries = await listEnquiriesAdmin();
    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load enquiries" }, { status: 500 });
  }
}
