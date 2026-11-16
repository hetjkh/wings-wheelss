import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export const ALLOWED_UPLOAD_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export function getUploadDir() {
  const configured = process.env.UPLOAD_DIR?.trim() || "uploads";
  return path.isAbsolute(configured) ? configured : path.join(/*turbopackIgnore: true*/ process.cwd(), configured);
}

export function getUploadPublicBase() {
  return (process.env.UPLOAD_PUBLIC_URL?.trim() || "/uploads").replace(/\/$/, "");
}

export function sanitizeBaseName(name: string) {
  const base = path.parse(name).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return base || "image";
}

export function buildUploadFileName(originalName: string, mimeType: string) {
  const extension = ALLOWED_UPLOAD_TYPES[mimeType];
  if (!extension) throw new Error("Unsupported file type");
  const stamp = randomBytes(4).toString("hex");
  return `${sanitizeBaseName(originalName)}-${Date.now()}-${stamp}${extension}`;
}

export function publicUrlForFile(fileName: string) {
  return `${getUploadPublicBase()}/${fileName}`;
}

export async function saveUploadFile(fileName: string, bytes: Buffer) {
  const dir = getUploadDir();
  await mkdir(dir, { recursive: true });
  const absolutePath = path.join(dir, fileName);
  await writeFile(absolutePath, bytes);
  return absolutePath;
}

export function resolveUploadPath(relativeParts: string[]) {
  const dir = getUploadDir();
  const joined = path.normalize(path.join(dir, ...relativeParts));
  if (!joined.startsWith(path.normalize(dir + path.sep)) && joined !== path.normalize(dir)) {
    return null;
  }
  return joined;
}

export function contentTypeForFile(fileName: string) {
  const extension = path.extname(fileName).toLowerCase();
  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}
