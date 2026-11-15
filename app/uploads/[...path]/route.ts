import { readFile, stat } from "fs/promises";
import { NextResponse } from "next/server";
import { contentTypeForFile, resolveUploadPath } from "../../../lib/uploads";

type Params = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: Params) {
  const { path: parts } = await params;

  if (!parts?.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (parts.some(part => part === ".." || part.includes("\0"))) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const absolutePath = resolveUploadPath(parts);
  if (!absolutePath) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const info = await stat(absolutePath);
    if (!info.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const data = await readFile(absolutePath);
    return new NextResponse(data, {
      headers: {
        "Content-Type": contentTypeForFile(absolutePath),
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(info.size),
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
