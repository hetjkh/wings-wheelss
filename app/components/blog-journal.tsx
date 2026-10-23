"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, TravelIcon } from "./icons";
import { BlogStoryCard } from "./blog-story-card";
import { blogCategories, blogPosts } from "./blog-posts";

const filters = ["All stories", ...blogCategories] as const;

export function BlogJournal() {
  const [category, setCategory] = useState<(typeof filters)[number]>("All stories");
  const [query, setQuery] = useState("");
  const posts = blogPosts.filter(post => (category === "All stories" || post.category === category) && `${post.title} ${post.category} ${post.excerpt}`.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [category, query]);

  return <>
    <div className="b-section-rule b-small"><span>01 / The reading room</span><span>Stories to take you further <Arrow diagonal /></span></div>
    <div className="b-journal-heading"><h2 id="journal-heading">A good place<br />to <em>get lost.</em></h2><p>Travel ideas, local perspectives, and the<br className="b-desktop-break" /> little things we’ve learnt along the way.</p></div>
    <div className="b-browse"><div className="b-filters" role="group" aria-label="Filter stories by category">{filters.map(filter => <button key={filter} type="button" className={filter === category ? "is-active" : undefined} aria-pressed={filter === category} onClick={() => setCategory(filter)}>{filter}{filter === category && <span aria-hidden="true">↗</span>}</button>)}</div><label className="b-search"><TravelIcon kind="search" size={18} /><span className="j-sr-only">Search stories</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a little inspiration" /></label></div>
    <p className="b-results b-small" role="status" aria-live="polite">{String(posts.length).padStart(2, "0")} {posts.length === 1 ? "story" : "stories"}{category !== "All stories" ? ` / ${category}` : " / A world of possibilities"}{query.trim() ? ` / Matching “${query.trim()}”` : ""}</p>
    {posts.length ? <ul className="b-story-grid" key={category}>{posts.map(post => <li key={post.slug}><BlogStoryCard post={post} /></li>)}</ul> : <div className="b-empty"><TravelIcon kind="compass" size={36} /><h3>A different direction, perhaps?</h3><p>We couldn’t find a story for that search. Try another place or explore all our field notes.</p><button className="b-text-link" type="button" onClick={() => { setCategory("All stories"); setQuery(""); }}>Back to all stories <Arrow /></button></div>}
    <div className="b-journal-end b-small"><span>You’re in good company.</span><TravelIcon kind="compass" size={21} /><span>Keep your curiosity close.</span></div>
  </>;
}
