import type { Metadata } from "next";
import BlogPage from "../components/blog-page";

export const metadata: Metadata = {
  title: "Journal | Wings & Wheels",
  description: "Stories, destination notes and planning advice from Wings & Wheels, for journeys across the Middle East, Africa and beyond.",
};

export default function Blog() {
  return <BlogPage />;
}
