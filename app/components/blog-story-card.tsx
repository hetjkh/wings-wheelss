import Link from "next/link";
import Image from "./travel-image";
import { Arrow } from "./icons";
import { blogPosts, type BlogPost } from "./blog-posts";

export function BlogStoryCard({ post }: { post: BlogPost }) {
  const index = blogPosts.findIndex(item => item.slug === post.slug);
  return <article className="b-story-card">
    <Link className="b-story-photo" href={`/blog/${post.slug}`} aria-label={`Read: ${post.title}`}><Image src={post.image} alt={post.alt} fill sizes="(max-width: 540px) 92vw, (max-width: 800px) 46vw, 32vw" style={{ objectPosition: post.position ?? "center" }} /><span className="b-card-number b-small" aria-hidden="true">Field note / {String(index + 1).padStart(2, "0")}</span><span className="b-photo-arrow"><Arrow diagonal /></span></Link>
    <div className="b-story-meta b-small"><span>{post.category}</span><span>{post.read} read</span></div>
    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p className="b-story-excerpt">{post.excerpt}</p>
    <div className="b-story-bottom"><time dateTime={post.dateTime}>{post.date}</time><Link href={`/blog/${post.slug}`} aria-label={`Read story: ${post.title}`}>Read story <Arrow diagonal /></Link></div>
  </article>;
}
