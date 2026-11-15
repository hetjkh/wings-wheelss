import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "../../components/blog-article";
import { blogPosts, getBlogPost } from "../../components/blog-posts";
import { getBlogBySlug, listBlogs } from "../../../lib/blogs";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let post = getBlogPost(slug);
  try {
    post = (await getBlogBySlug(slug)) ?? post;
  } catch {
    // fall back to static post metadata
  }
  if (!post) notFound();
  return { title: `${post.title} | Wings & Wheels`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = getBlogPost(slug);
  let posts = blogPosts;

  try {
    const [fromDb, all] = await Promise.all([getBlogBySlug(slug), listBlogs()]);
    post = fromDb ?? post;
    posts = all.length ? all : posts;
  } catch (error) {
    console.error("Failed to load blog from MongoDB, using static fallback", error);
  }

  if (!post) notFound();
  return <BlogArticle post={post} posts={posts} />;
}
