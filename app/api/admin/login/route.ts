import { NextResponse } from "next/server";
import { createSessionToken, sessionCookieOptions, verifyAdminLogin } from "../../../../lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!verifyAdminLogin(email, password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = createSessionToken(process.env.ADMIN_EMAIL!.trim().toLowerCase());
    const response = NextResponse.json({ ok: true });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
