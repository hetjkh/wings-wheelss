import Link from "next/link";
import { Arrow, TravelIcon } from "./icons";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { MaskedHero } from "./masked-hero";
import { BlogClosing } from "./blog-closing";
import { BlogStoryCard } from "./blog-story-card";
import { blogPosts, type BlogPost } from "./blog-posts";
import "./journey.css";
import "./journey-explorer.css";
import "./blog.css";

export function BlogArticle({ post }: { post: BlogPost }) {
  const related = blogPosts.filter(item => item.slug !== post.slug && item.category === post.category).concat(blogPosts.filter(item => item.slug !== post.slug && item.category !== post.category)).slice(0, 3);

  return <div className="journey-page blog-page b-editorial b-article-page">
    <a className="skip-link" href="#story">Skip to story</a>
    <JourneyHeader introId="story" />
    <main>
      <MaskedHero
        key={post.slug}
        id="blog-article-heading"
        eyebrow={post.category}
        lines={post.lines.map((text, index) => index === post.lines.length - 1 ? { text, accent: true } : text)}
        text={`${post.date} · ${post.read} read`}
        action={{ label: "Plan a journey like this", href: "/contact" }}
        media={{ image: post.image, alt: post.alt, position: post.position }}
        back={{ href: "/blog", label: "All stories" }}
      />
      <article id="story" className="b-article-body b-shell" aria-label={post.title}><aside className="b-article-margin"><span className="b-small">In the field</span><TravelIcon kind="compass" size={37} /><p>A few notes.<br />A fresh perspective.<br />Your next departure.</p><Link href="/contact" className="b-text-link">Plan a journey like this <Arrow diagonal /></Link></aside><div className="b-prose">{post.paragraphs.map((paragraph, index) => <div key={paragraph}><p>{paragraph}</p>{index === 1 && <blockquote><span aria-hidden="true">“</span>{post.pull}</blockquote>}</div>)}<div className="b-article-colophon"><TravelIcon kind="plane" size={24} /><span className="b-small">People. Places. Further together.</span></div><div className="b-article-enquiry"><span className="b-small">Inspired to go?</span><h2>Let’s put you<br /><em>in the picture.</em></h2><Link href="/contact" className="b-solid-link">Start your own journey <Arrow diagonal /></Link></div></div></article>
      <section className="b-related b-shell" aria-labelledby="related-heading"><div className="b-section-rule b-small"><span>The journey continues</span><Link href="/blog">All stories <Arrow diagonal /></Link></div><div className="b-journal-heading"><h2 id="related-heading">One more<br /><em>before you go.</em></h2><p>A different place. Another perspective.<br />There’s always more to the story.</p></div><ul className="b-story-grid b-related-grid">{related.map(item => <li key={item.slug}><BlogStoryCard post={item} /></li>)}</ul></section>
      <BlogClosing />
    </main>
    <JourneyFooter />
  </div>;
}
