import { ObjectId, type WithId, type Document } from "mongodb";
import { getDb } from "./mongodb";
import { blogPosts, blogCategories, type BlogCategory, type BlogPost } from "../app/components/blog-posts";

export type BlogDocument = BlogPost & {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BlogInput = {
  slug: string;
  title: string;
  lines: string[];
  excerpt: string;
  category: BlogCategory;
  date: string;
  dateTime: string;
  read: string;
  image: string;
  alt: string;
  position?: string;
  pull: string;
  paragraphs: string[];
};

function collection() {
  return getDb().then(db => db.collection<BlogDocument>("blogs"));
}

function toBlogPost(doc: WithId<Document> | BlogDocument): BlogPost {
  return {
    slug: String(doc.slug),
    title: String(doc.title),
    lines: Array.isArray(doc.lines) ? doc.lines.map(String) : [],
    excerpt: String(doc.excerpt),
    category: doc.category as BlogCategory,
    date: String(doc.date),
    dateTime: String(doc.dateTime),
    read: String(doc.read),
    image: String(doc.image),
    alt: String(doc.alt),
    position: doc.position ? String(doc.position) : undefined,
    pull: String(doc.pull),
    paragraphs: Array.isArray(doc.paragraphs) ? doc.paragraphs.map(String) : [],
  };
}

export function serializeBlog(doc: WithId<Document> | BlogDocument) {
  const post = toBlogPost(doc);
  return {
    id: "_id" in doc && doc._id ? String(doc._id) : "",
    ...post,
  };
}

export async function ensureBlogsSeeded() {
  const blogs = await collection();
  await blogs.createIndex({ slug: 1 }, { unique: true });
  const count = await blogs.countDocuments();
  if (count > 0) return;

  const now = new Date();
  await blogs.insertMany(
    blogPosts.map(post => ({
      ...post,
      createdAt: now,
      updatedAt: now,
    })),
  );
}

export async function listBlogs(): Promise<BlogPost[]> {
  await ensureBlogsSeeded();
  const blogs = await collection();
  const docs = await blogs.find({}).sort({ dateTime: -1 }).toArray();
  return docs.map(toBlogPost);
}

export async function listBlogsAdmin() {
  await ensureBlogsSeeded();
  const blogs = await collection();
  const docs = await blogs.find({}).sort({ updatedAt: -1, dateTime: -1 }).toArray();
  return docs.map(serializeBlog);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  await ensureBlogsSeeded();
  const blogs = await collection();
  const doc = await blogs.findOne({ slug });
  return doc ? toBlogPost(doc) : null;
}

export async function getBlogById(id: string) {
  if (!ObjectId.isValid(id)) return null;
  await ensureBlogsSeeded();
  const blogs = await collection();
  const doc = await blogs.findOne({ _id: new ObjectId(id) });
  return doc ? serializeBlog(doc) : null;
}

export function normalizeBlogInput(raw: Partial<BlogInput>): BlogInput {
  const category = blogCategories.includes(raw.category as BlogCategory)
    ? (raw.category as BlogCategory)
    : "Planning";

  const lines = (raw.lines ?? []).map(line => line.trim()).filter(Boolean);
  const paragraphs = (raw.paragraphs ?? []).map(p => p.trim()).filter(Boolean);
  const slug = (raw.slug || raw.title || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const dateTime = raw.dateTime?.trim() || new Date().toISOString().slice(0, 10);
  const displayDate = (() => {
    if (raw.date?.trim()) return raw.date.trim();
    const parsed = new Date(`${dateTime}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return dateTime;
    return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  })();
  const wordCount = paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const read = raw.read?.trim() || `${Math.max(1, Math.round(wordCount / 180))} min`;

  return {
    slug,
    title: (raw.title || "").trim(),
    lines: lines.length ? lines : [(raw.title || "Untitled").trim()],
    excerpt: (raw.excerpt || "").trim(),
    category,
    date: displayDate,
    dateTime,
    read,
    image: (raw.image || "").trim(),
    alt: (raw.alt || "").trim(),
    position: raw.position?.trim() || "center",
    pull: (raw.pull || "").trim(),
    paragraphs,
  };
}

export function validateBlogInput(input: BlogInput) {
  const errors: string[] = [];
  if (!input.slug) errors.push("Slug is required");
  if (!input.title) errors.push("Title is required");
  if (!input.excerpt) errors.push("Excerpt is required");
  if (!input.image) errors.push("Image path is required");
  if (!input.alt) errors.push("Image alt text is required");
  if (!input.pull) errors.push("Pull quote is required");
  if (!input.paragraphs.length) errors.push("At least one paragraph is required");
  if (!input.lines.length) errors.push("At least one title line is required");
  return errors;
}

export async function createBlog(raw: Partial<BlogInput>) {
  const input = normalizeBlogInput(raw);
  const errors = validateBlogInput(input);
  if (errors.length) return { ok: false as const, errors };

  const blogs = await collection();
  const existing = await blogs.findOne({ slug: input.slug });
  if (existing) return { ok: false as const, errors: ["A blog with this slug already exists"] };

  const now = new Date();
  const result = await blogs.insertOne({ ...input, createdAt: now, updatedAt: now });
  const created = await blogs.findOne({ _id: result.insertedId });
  return { ok: true as const, blog: created ? serializeBlog(created) : null };
}

export async function updateBlog(id: string, raw: Partial<BlogInput>) {
  if (!ObjectId.isValid(id)) return { ok: false as const, errors: ["Invalid blog id"] };

  const input = normalizeBlogInput(raw);
  const errors = validateBlogInput(input);
  if (errors.length) return { ok: false as const, errors };

  const blogs = await collection();
  const clash = await blogs.findOne({ slug: input.slug, _id: { $ne: new ObjectId(id) } });
  if (clash) return { ok: false as const, errors: ["A blog with this slug already exists"] };

  const result = await blogs.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" },
  );

  if (!result) return { ok: false as const, errors: ["Blog not found"] };
  return { ok: true as const, blog: serializeBlog(result) };
}

export async function deleteBlog(id: string) {
  if (!ObjectId.isValid(id)) return { ok: false as const, errors: ["Invalid blog id"] };
  const blogs = await collection();
  const result = await blogs.deleteOne({ _id: new ObjectId(id) });
  if (!result.deletedCount) return { ok: false as const, errors: ["Blog not found"] };
  return { ok: true as const };
}
