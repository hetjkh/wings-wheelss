import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/auth";
import { getWhatsAppStatus, logoutWhatsApp } from "../../../../lib/whatsapp-notify";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await getWhatsAppStatus();
  return NextResponse.json(result.data, { status: result.ok ? 200 : result.status });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  if (body?.action === "logout") {
    const result = await logoutWhatsApp();
    return NextResponse.json(result.data, { status: result.ok ? 200 : result.status });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
