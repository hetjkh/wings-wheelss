import type { Metadata } from "next";
import BlogPage from "../components/blog-page";
import { listBlogs } from "../../lib/blogs";
import { blogPosts } from "../components/blog-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal | Wings & Wheels",
  description: "Stories, destination notes and planning advice from Wings & Wheels, for journeys across the Middle East, Africa and beyond.",
};

export default async function Blog() {
  let posts = blogPosts;
  try {
    posts = await listBlogs();
  } catch (error) {
    console.error("Failed to load blogs from MongoDB, using static fallback", error);
  }
  return <BlogPage posts={posts} />;
}
