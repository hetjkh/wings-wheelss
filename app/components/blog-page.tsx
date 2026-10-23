import Link from "next/link";
import Image from "./travel-image";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { MaskedHero } from "./masked-hero";
import { BlogClosing } from "./blog-closing";
import { Arrow, TravelIcon } from "./icons";
import { BlogJournal } from "./blog-journal";
import { blogPosts } from "./blog-posts";
import "./journey.css";
import "./journey-explorer.css";
import "./blog.css";

export default function BlogPage() {
  const cover = blogPosts.find(post => post.slug === "a-slower-europe")!;
  const picks = blogPosts.filter(post => ["east-africa-seasons", "nairobi-to-dubai"].includes(post.slug));

  return <div className="journey-page blog-page b-editorial">
    <a className="skip-link" href="#journal">Skip to stories</a>
    <JourneyHeader introId="journal" />
    <main>
      <MaskedHero
        id="blog-hero-heading"
        eyebrow="Journal"
        lines={["Stories from", "the places", { text: "we travel.", accent: true }]}
        text="Planning notes, destination timing and the weeks we arrange for people travelling together."
        action={{ label: "Read the journal", href: "#journal" }}
        media={{ video: "/hero.mp4" }}
        tags={["Destinations", "Planning", "Business travel", "Groups", "Africa"]}
      />
      <section className="b-opening b-shell" aria-labelledby="blog-heading">
        <div className="b-edition b-small"><span>Wings &amp; Wheels / Field notes</span><span>For the endlessly curious <TravelIcon kind="compass" size={15} /></span></div>
        <div className="b-masthead"><h2 id="blog-heading">The Journal<span aria-hidden="true">.</span></h2><span className="b-masthead-note">People. Places.<br />A different perspective.</span></div>
        <div className="b-opening-line"><p>A little inspiration for your next great departure.</p><a href="#journal" className="b-small">Explore the stories <Arrow diagonal /></a></div>
        <div className="b-cover-grid">
          <article className="b-cover">
            <Image src={cover.image} alt={cover.alt} fill sizes="(max-width: 800px) 100vw, 66vw" />
            <div className="b-cover-top b-small"><span>The cover story</span><span>01 / Europe</span></div>
            <div className="b-cover-copy"><p className="b-small">Destinations <span /> {cover.read} read</p><h2><Link href={`/blog/${cover.slug}`}>Take the<br /><em>scenic route.</em></Link></h2><p>{cover.excerpt}</p><Link className="b-cover-link b-small" href={`/blog/${cover.slug}`}>A slower way to cross Europe <span><Arrow diagonal /></span></Link></div>
          </article>
          <aside className="b-editors" aria-labelledby="editors-heading">
            <div className="b-editors-intro"><span className="b-small">A note from the team</span><h2 id="editors-heading">Go somewhere.<br /><em>Feel something.</em></h2><p>The places that stay with you. The details that make a difference. Stories from a life in travel.</p></div>
            <div className="b-picks-label b-small"><span>On our reading list</span><TravelIcon kind="document" size={16} /></div>
            {picks.map((post, index) => <Link className="b-pick" key={post.slug} href={`/blog/${post.slug}`}><span className="b-pick-photo"><Image src={post.image} alt={post.alt} fill sizes="100px" /></span><span className="b-pick-copy"><span className="b-small">0{index + 1} / {post.category}</span><span className="b-pick-title">{post.title}</span><span className="b-pick-read">{post.read} read <Arrow diagonal /></span></span></Link>)}
            <div className="b-editors-signoff"><span>See you out there.</span><TravelIcon kind="plane" size={28} /></div>
          </aside>
        </div>
      </section>
      <section className="b-journal b-shell" id="journal" aria-labelledby="journal-heading"><BlogJournal /></section>
      <section className="b-spotlight" aria-labelledby="spotlight-heading">
        <div className="b-spotlight-photo"><Image src="/images/library/kenya-game-drive.webp" alt="A safari vehicle in the wide open Kenyan grasslands at sunset" fill sizes="(max-width: 800px) 100vw, 57vw" /><span className="b-photo-coordinate b-small"><TravelIcon kind="pin" size={14} /> Maasai Mara, Kenya</span></div>
        <div className="b-spotlight-copy"><span className="b-small">The destination edit / 01</span><TravelIcon kind="sun" size={52} /><h2 id="spotlight-heading">Less rush.<br />More <em>wild.</em></h2><p>Some places deserve more than a pin on a map. From Nairobi mornings to the open plains, make a little more room for East Africa.</p><Link className="b-text-link" href="/blog/east-africa-seasons">Find your moment in East Africa <Arrow diagonal /></Link><div className="b-spotlight-foot b-small"><span>City. Safari. Coast.</span><span>Africa, at your pace.</span></div></div>
      </section>
      <BlogClosing />
    </main>
    <JourneyFooter />
  </div>;
}
