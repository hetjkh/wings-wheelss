import { NextResponse } from "next/server";
import {
  createSessionToken,
  getAdminCredentials,
  sessionCookieOptions,
  verifyAdminLogin,
} from "../../../../lib/auth";

export async function POST(request: Request) {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
      console.error("Admin login missing env vars", {
        hasEmail: Boolean(process.env.ADMIN_EMAIL),
        hasPassword: Boolean(process.env.ADMIN_PASSWORD),
        hasSecret: Boolean(process.env.ADMIN_SESSION_SECRET),
      });
      return NextResponse.json(
        { error: "Server login is not configured. Add ADMIN_* env vars in Vercel and redeploy." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!verifyAdminLogin(email, password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const { email: adminEmail } = getAdminCredentials();
    const token = createSessionToken(adminEmail.trim().toLowerCase());
    const cookie = sessionCookieOptions(token);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(cookie.name, cookie.value, {
      httpOnly: cookie.httpOnly,
      sameSite: cookie.sameSite,
      secure: cookie.secure,
      path: cookie.path,
      maxAge: cookie.maxAge,
    });
    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
