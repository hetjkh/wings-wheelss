import Image from "next/image";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import { EventBrief } from "./event-brief";
import { office } from "./data";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./groups.css";

const origins = [
  { city: "London", who: "Executives" },
  { city: "Riyadh", who: "Sales team" },
  { city: "Nairobi", who: "Delegates" },
  { city: "Mumbai", who: "Suppliers" },
];
const sequence: { icon: IconKind; label: string }[] = [
  { icon: "plane", label: "Flights" }, { icon: "pin", label: "Arrivals" }, { icon: "bed", label: "Hotels" },
  { icon: "car", label: "Transfers" }, { icon: "people", label: "Event" }, { icon: "return", label: "Departures" },
];

const managed = [
  { title: "Group flights", text: "Individual and group flight arrangements across multiple cities." },
  { title: "Hotel & room coordination", text: "Accommodation sourcing and stay coordination." },
  { title: "Airport transfers", text: "Individual, executive and group transfers." },
  { title: "Visa & document support", text: "Visa assistance and pre-travel support." },
  { title: "Delegate travel", text: "For executives, employees, speakers and delegates." },
  { title: "On-ground transport", text: "Scheduled transport between hotels, venues and event locations." },
  { title: "Itinerary coordination", text: "Flights, hotels, transfers and event movements in one plan." },
  { title: "Travel support", text: "Assistance when plans change or flights are delayed." },
];

const kinds = [
  { word: "Meetings", photo: "/images/corporate.png", position: "30% 40%", formats: ["Sales meetings", "Training programmes"] },
  { word: "Incentive travel", photo: "/images/journey/team-original.png", position: "center 40%", formats: ["Corporate retreats", "Company events"] },
  { word: "Conferences", photo: "/images/groups.png", position: "center 45%", formats: ["Product launches", "Delegations"] },
  { word: "Exhibitions", photo: "/images/airport.png", position: "center 55%", formats: ["Site visits", "Exhibitor teams"] },
];

const day = [
  { when: "3 weeks before", items: ["Flights coordinated", "Hotel rooms arranged", "Visa requirements", "Transfers planned"] },
  { when: "Day before", items: ["Delegates arrive", "Airport pickups", "Hotel check-ins"] },
  { when: "08:00", items: ["Team transfer from hotel"] },
  { when: "09:00", items: ["Arrival at venue"] },
  { when: "10:00", items: ["Event begins"], key: true },
  { when: "After the event", items: ["Return transfers", "Hotel movements", "Airport departures", "Onward journeys"] },
];

const cities = ["London", "Riyadh", "Nairobi", "Mumbai", "Khartoum", "Juba"];
const travellers = [9, 7, 8, 6, 5, 5].flatMap((count, city) => Array.from({ length: count }, () => city));
const stats = [
  { value: 40, label: "Delegates", icon: "people" },
  { value: 6, label: "Departure cities", icon: "pin" },
  { value: 4, label: "Airlines", icon: "plane" },
  { value: 11, label: "Arrival times", icon: "calendar" },
  { value: 2, label: "Hotels", icon: "bed" },
  { value: 5, label: "Transfer movements", icon: "car" },
] as const;

const roles: { icon: IconKind; title: string; text: string }[] = [
  { icon: "briefcase", title: "Exhibitor teams", text: "Travel coordination for sales, management and operational teams." },
  { icon: "globe", title: "International delegates", text: "Arrival and accommodation arrangements for overseas visitors." },
  { icon: "ear", title: "Speakers & VIPs", text: "Individualised travel requirements for key guests." },
  { icon: "route", title: "Group movements", text: "Coordinated transport between airport, hotel, exhibition venue and event activities." },
];

const stations = [
  { label: "Airport", x: 60, y: 190, below: true },
  { label: "Hotel", x: 270, y: 70 },
  { label: "Exhibition / Conference", x: 430, y: 70, below: true },
  { label: "Dinner / Event", x: 590, y: 70 },
  { label: "Hotel", x: 750, y: 70 },
  { label: "Airport", x: 940, y: 190, below: true },
];
const line = "M60 190 C 150 190, 150 70, 240 70 L 760 70 C 850 70, 850 190, 940 190";

const steps = [
  { step: "Change identified", text: "The flight from Nairobi is delayed by three hours. Twelve delegates are affected." },
  { step: "Travel team informed", text: "Your Wings & Wheels coordinator picks it up straight away." },
  { step: "Options coordinated", text: "A later airport transfer is booked and hotel rooms are held for the group." },
  { step: "Group plan updated", text: "The revised schedule is shared with the group and the event team." },
];
const itinerary = [
  { time: "13:10", next: "16:10", item: "Flight arrives", detail: "Nairobi → Dubai", note: "Delayed three hours", phase: 0 },
  { time: "13:45", next: "16:45", item: "Airport transfer", detail: "12 delegates · coach", note: "Later transfer booked", phase: 2 },
  { time: "14:30", next: "17:20", item: "Hotel check-in", detail: "Group rooms", note: "Rooms held for the group", phase: 2 },
  { time: "19:30", item: "Welcome dinner", detail: "With the event team", note: "Still on schedule", phase: 3 },
];

export default function GroupsPage() {
  return <ChapterMotion className="groups-page">
    <a className="skip-link" href="#people">Skip to content</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="people" />
    <main>
      <section className="j-hero s-hero g-hero" id="top" aria-labelledby="groups-hero-heading">
        <Image className="j-photo j-hero-photo" src="/images/about/business-airport.jpg" alt="" fill preload sizes="100vw" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content g-hero-content">
          <div className="g-hero-copy">
            <span className="j-eyebrow" data-hero>Groups &amp; MICE</span>
            <h1 id="groups-hero-heading"><span className="s-line"><span data-hero>Bringing people</span></span><span className="s-line"><span data-hero>together.</span></span><span className="s-line g-hero-soft"><span data-hero>Getting every detail</span></span><span className="s-line g-hero-soft"><span data-hero>there too.</span></span></h1>
            <p data-hero>From corporate meetings and international exhibitions to incentive travel and large group movements, Wings &amp; Wheels coordinates the journey around your event.</p>
            <ul className="g-hero-list" data-hero>{["Flights", "Hotels", "Transfers", "Groups", "Events", "Support"].map(item => <li key={item}>{item}.</li>)}</ul>
            <div className="s-actions" data-hero>
              <EnquiryButton className="j-button j-button-cream" service="Groups & MICE">Plan your group travel</EnquiryButton>
              <a className="j-button j-button-outline-light" href={office.whatsapp} target="_blank" rel="noreferrer"><TravelIcon kind="chat" size={16} />WhatsApp our team</a>
            </div>
            <p className="g-hero-note" data-hero>Group &amp; MICE travel across the UAE, Africa and worldwide.</p>
          </div>
          <div className="g-badge-wrap" aria-hidden="true">
            <div className="g-badge">
              <span className="g-badge-strap" />
              <span className="g-badge-clip" />
              <div className="g-badge-card">
                <div className="g-badge-top"><span>W&amp;W</span><span>Groups &amp; MICE</span></div>
                <span className="g-badge-role">Delegate</span>
                <strong>Your whole group</strong>
                <dl>
                  <div><dt>Event</dt><dd>Dubai</dd></div>
                  <div><dt>Arriving from</dt><dd>London · Nairobi · Riyadh · Mumbai</dd></div>
                  <div><dt>Access</dt><dd>Flights · Hotels · Transfers</dd></div>
                </dl>
                <span className="g-badge-code" />
                <div className="g-badge-foot">UAE · Africa · Worldwide</div>
              </div>
            </div>
          </div>
        </div>
        <a href="#people" className="j-scroll-note">One event, many journeys <span>↓</span></a>
      </section>

      <section className="g-converge j-torn-top" id="people" aria-labelledby="people-heading">
        <div className="j-shell">
          <span className="j-eyebrow s-eyebrow">01 / Many cities, one venue</span>
          <div className="g-converge-head">
            <h2 id="people-heading" className="s-title">The event may be in<br />one place.<span className="g-soft">Your people may not be.</span></h2>
            <div className="g-converge-copy">
              <p className="s-lead-body g-body">A conference in Dubai could involve executives flying from London, delegates arriving from Nairobi, a sales team travelling from Riyadh and suppliers coming from India.</p>
              <p className="g-staccato" data-stagger><span>Different flights.</span><span>Different arrival times.</span><span>Different hotels.</span><strong>One event.</strong></p>
            </div>
          </div>
          <figure className="g-join" aria-label="Executives from London, a sales team from Riyadh, delegates from Nairobi and suppliers from Mumbai, all travelling to one event in Dubai">
            <ul className="g-join-from" data-stagger>{origins.map((origin, i) => <li key={origin.city} data-city={i}>
              <span className="g-join-icon"><TravelIcon kind="plane" size={18} /></span>
              <div><strong>{origin.city}</strong><span>{origin.who}</span></div>
            </li>)}</ul>
            <svg className="g-join-lines" viewBox="0 0 200 400" preserveAspectRatio="none" aria-hidden="true">
              {[50, 150, 250, 350].map(y => <path key={y} data-trace pathLength={1} d={`M0 ${y} C 110 ${y}, 90 200, 200 200`} />)}
            </svg>
            <div className="g-join-event">
              <Image src="/images/dubai.jpg" alt="" fill sizes="(max-width: 800px) 92vw, 32vw" />
              <div className="g-join-event-copy">
                <span>The event</span>
                <strong>Dubai</strong>
                <p>One coordinated travel plan for everyone.</p>
              </div>
            </div>
          </figure>
          <div className="g-route" data-progress="top 88%" data-progress-end="top 55%">
            <p className="s-lead">Wings &amp; Wheels brings those movements together into one coordinated travel plan.</p>
            <ol>{sequence.map((step, i) => <li key={step.label} style={{ "--i": i } as React.CSSProperties}><TravelIcon kind={step.icon} size={18} />{step.label}</li>)}</ol>
            <p className="g-route-close">One event. One coordinated journey.</p>
          </div>
        </div>
      </section>

      <section className="g-manage j-torn-top" id="manage" aria-labelledby="manage-heading">
        <div className="j-shell">
          <div className="s-split-head g-manage-head">
            <div><span className="j-eyebrow s-eyebrow">02 / What we manage</span><h2 id="manage-heading" className="s-title">From the first arrival<br />to the final departure.</h2></div>
            <p className="g-runsheet-tag"><span>Run sheet</span><span>8 items · All coordinated</span></p>
          </div>
          <ol className="g-runsheet">{managed.map((item, i) => <li key={item.title}>
            <span className="g-run-number">{String(i + 1).padStart(2, "0")}</span>
            <div><h3>{item.title}</h3><p>{item.text}</p></div>
            <svg className="g-tick" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" /><path data-trace pathLength={1} d="M12 20.5 18 26.5 29 14" /></svg>
          </li>)}</ol>
        </div>
      </section>

      <section className="g-kinds j-torn-top" id="events" aria-labelledby="events-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>03 / Built for different kinds of events</span><span>Meetings · Incentives · Conferences · Exhibitions</span></div>
          <h2 id="events-heading" className="s-title g-kinds-title">Not every group travels<br />for the same reason.</h2>
          <ol className="g-deck">{kinds.map((kind, i) => <li key={kind.word} className="g-card" style={{ "--i": i } as React.CSSProperties}>
            <div className="g-card-photo"><Image src={kind.photo} alt="" fill sizes="(max-width: 800px) 92vw, 56vw" style={{ objectPosition: kind.position }} /></div>
            <div className="g-card-body">
              <span className="g-card-count"><b>{String(i + 1).padStart(2, "0")}</b> / {String(kinds.length).padStart(2, "0")}</span>
              <h3>{kind.word}</h3>
              <ul className="g-card-formats">{kind.formats.map(format => <li key={format}>{format}</li>)}</ul>
              <EnquiryButton className="g-card-link" service="Groups & MICE" message={`We're planning ${kind.word.toLowerCase()}.`}>Plan {kind.word.toLowerCase()} <Arrow /></EnquiryButton>
            </div>
          </li>)}</ol>
        </div>
      </section>

      <section className="g-day j-torn-top" id="timeline" aria-labelledby="day-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <h2 id="day-heading" className="s-title">The exhibition starts at 10:00 AM.<span className="g-soft">Our work starts long before the doors open.</span></h2>
            <span className="j-eyebrow s-eyebrow g-day-eyebrow">04 / Exhibition day</span>
          </div>
          <div className="g-day-grid" data-progress="top 70%" data-progress-end="bottom 70%">
            <div className="g-clock-wrap">
              <div className="g-clock" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => <span key={i} className="g-clock-tick" style={{ "--i": i } as React.CSSProperties} />)}
                <span className="g-clock-ten">10</span>
                <span className="g-clock-hour" />
                <span className="g-clock-minute" />
                <span className="g-clock-pin" />
              </div>
              <p className="g-clock-caption">Doors open at <strong>10:00</strong></p>
            </div>
            <ol className="g-timeline">
              <span className="g-timeline-line" aria-hidden="true"><span /></span>
              {day.map((stop, i) => <li key={stop.when} className={stop.key ? "is-key" : undefined} style={{ "--i": i } as React.CSSProperties}>
                <span className="g-timeline-dot" aria-hidden="true" />
                <h3>{stop.when}</h3>
                <ul>{stop.items.map(item => <li key={item}>{item}</li>)}</ul>
              </li>)}
            </ol>
          </div>
          <p className="g-day-close s-statement">You focus on the event.<span>We focus on getting everyone there.</span></p>
        </div>
      </section>

      <section className="g-forty j-torn-top" id="journeys" aria-labelledby="forty-heading">
        <div className="j-shell">
          <span className="j-eyebrow s-eyebrow">05 / One group. Different journeys.</span>
          <h2 id="forty-heading" className="s-title">40 people don&apos;t always mean<br />40 identical trips.</h2>
          <div className="g-forty-grid">
            <div className="g-crowd">
              <ol className="g-dots" data-stagger="0.025" aria-label="40 delegates from six departure cities">{travellers.map((city, i) => <li key={i} className="g-dot" data-city={city}><TravelIcon kind="people" size={18} /></li>)}</ol>
              <ul className="g-legend">{cities.map((city, i) => <li key={city} data-city={i}><span />{city}</li>)}</ul>
            </div>
            <div className="g-stats-wrap">
              <ul className="g-stats">{stats.map(stat => <li key={stat.label}>
                <TravelIcon kind={stat.icon} size={20} />
                <strong data-count={stat.value}>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>)}</ul>
              <p className="g-stats-total">One coordinated travel plan.</p>
              <p className="s-lead-body g-body">Whether your travellers are arriving together or from different parts of the world, Wings &amp; Wheels helps coordinate the movements around your programme.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="g-expo j-torn-top" id="exhibitions" aria-labelledby="expo-heading">
        <div className="j-shell g-expo-grid">
          <div className="g-expo-copy">
            <span className="j-eyebrow s-eyebrow">06 / Exhibiting in Dubai?</span>
            <h2 id="expo-heading" className="s-title">Your stand is only one part of the plan.</h2>
            <p className="s-lead-body g-body">Before your team reaches the exhibition floor, there are flights, visas, hotel rooms, airport arrivals, local transfers and schedules to coordinate.</p>
            <EnquiryButton className="j-button j-button-olive" service="Groups & MICE" message="We're exhibiting and need travel for our team.">Plan exhibition travel</EnquiryButton>
            <ul className="g-roles" data-stagger>{roles.map(role => <li key={role.title}>
              <span className="g-role-icon"><TravelIcon kind={role.icon} size={20} /></span>
              <div><h3>{role.title}</h3><p>{role.text}</p></div>
            </li>)}</ul>
          </div>
          <figure className="g-plan" data-progress="top 80%" data-progress-end="center 45%" aria-label="A floor plan zooming out from your stand to show the airport, hotel, visas and transfers around it">
            <div className="g-plan-canvas" aria-hidden="true">
              <span className="g-zone g-zone-airport"><TravelIcon kind="plane" size={18} />Airport</span>
              <span className="g-zone g-zone-hotel"><TravelIcon kind="bed" size={18} />Hotel</span>
              <span className="g-zone g-zone-visa"><TravelIcon kind="document" size={18} />Visas</span>
              <span className="g-zone g-zone-transfer"><TravelIcon kind="car" size={18} />Transfers</span>
              <svg className="g-plan-routes" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M16 14 C 30 30, 34 36, 44 42 M84 14 C 70 30, 66 36, 56 42 M16 86 C 30 70, 34 64, 44 58 M84 86 C 70 70, 66 64, 56 58" /></svg>
              <div className="g-hall">
                <span className="g-hall-label">Exhibition hall</span>
                <div className="g-booths">{Array.from({ length: 12 }, (_, i) => <span key={i} className={i === 5 ? "g-booth is-yours" : "g-booth"}>{i === 5 ? "Your stand" : null}</span>)}</div>
              </div>
            </div>
            <figcaption>Everything around the stand</figcaption>
          </figure>
        </div>
      </section>

      <section className="g-regions j-torn-top" aria-labelledby="regions-heading">
        <Image className="g-regions-map" src="/images/world-map.svg" alt="" fill unoptimized />
        <div className="j-shell">
          <span className="j-eyebrow s-eyebrow">07 / Bringing groups across regions</span>
          <h2 id="regions-heading" className="g-regions-title">
            <span className="g-region"><span className="g-region-word">Africa</span><small>Khartoum · Juba · Nairobi</small></span>
            <svg className="g-region-arrow" viewBox="0 0 120 20" aria-hidden="true"><path data-trace pathLength={1} d="M2 10h112" /><path data-trace pathLength={1} d="M104 2l10 8-10 8" /></svg>
            <span className="g-region"><span className="g-region-word">UAE</span><small>Dubai</small></span>
            <svg className="g-region-arrow" viewBox="0 0 120 20" aria-hidden="true"><path data-trace pathLength={1} d="M2 10h112" /><path data-trace pathLength={1} d="M104 2l10 8-10 8" /></svg>
            <span className="g-region"><span className="g-region-word">Worldwide</span><small>Wherever the event is</small></span>
          </h2>
        </div>
      </section>

      <section className="g-ground j-torn-top" aria-labelledby="ground-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">08 / On the ground</span><h2 id="ground-heading" className="s-title">Getting there doesn&apos;t<br />end at the airport.</h2></div>
            <p className="s-lead">One movement plan. Fewer things for your team to manage.</p>
          </div>
          <figure className="g-metro">
            <svg viewBox="0 0 1000 250" role="img" aria-label="Airport, hotel, exhibition or conference, dinner or event, hotel, airport">
              <path className="g-metro-shadow" d={line} />
              <path className="g-metro-line" data-trace pathLength={1} d={line} />
              <g className="g-metro-shuttle"><circle r="13" /><path d="M-6 -3h12v6h-12z M-4 3v2 M4 3v2" /><animateMotion dur="9s" repeatCount="indefinite" rotate="0" path={line} /></g>
              {stations.map((s, i) => <g key={`${s.label}-${i}`} className="g-metro-station">
                <circle cx={s.x} cy={s.y} r="11" />
                <text className="g-metro-index" x={s.x} y={s.below ? s.y + 40 : s.y - 46} textAnchor="middle">{String(i + 1).padStart(2, "0")}</text>
                <text x={s.x} y={s.below ? s.y + 58 : s.y - 26} textAnchor="middle">{s.label}</text>
              </g>)}
            </svg>
          </figure>
        </div>
      </section>

      <section className="g-change j-torn-top" aria-labelledby="change-heading">
        <div className="j-shell g-change-grid" data-progress="top 60%" data-progress-end="bottom 85%">
          <div className="g-change-copy">
            <span className="j-eyebrow s-eyebrow">09 / When plans change</span>
            <h2 id="change-heading" className="s-title">The plan needs<br />to move too.</h2>
            <p className="s-lead-body g-body">Group travel rarely remains perfectly static. Wings &amp; Wheels stays involved when requirements change.</p>
            <ol className="g-steps">{steps.map((item, i) => <li key={item.step} style={{ "--ph": `var(--p${i})` } as React.CSSProperties}>
              <span className="g-step-number">{String(i + 1).padStart(2, "0")}</span>
              <div><h3>{item.step}</h3><p>{item.text}</p></div>
            </li>)}</ol>
          </div>
          <figure className="g-sheet" aria-label="An example group itinerary being revised after a flight delay">
            <div className="g-sheet-coordinator">
              <span className="g-sheet-photo"><Image src="/images/about/team.jpg" alt="" fill sizes="160px" style={{ objectPosition: "35% center" }} /></span>
              <span className="g-sheet-pen">Your coordinator<br />is on it</span>
            </div>
            <header><span>Group itinerary</span><span>Day 1 · Nairobi delegates</span></header>
            <ol>{itinerary.map(row => <li key={row.item} className={row.next ? "g-row" : "g-row is-kept"} style={{ "--ph": `var(--p${row.phase})` } as React.CSSProperties}>
              <span className="g-row-time">{row.next ? <><s>{row.time}</s><em className="g-row-pen">{row.next}</em></> : <span>{row.time}</span>}</span>
              <span className="g-row-item"><strong>{row.item}</strong><span>{row.detail}</span></span>
              <em className="g-row-note">{row.next ? null : <TravelIcon kind="check" size={14} />}{row.note}</em>
            </li>)}</ol>
            <span className="g-sheet-stamp" aria-hidden="true">Plan updated<small>Shared with the group &amp; event team</small></span>
          </figure>
        </div>
      </section>

      <section className="g-brief j-torn-top" id="brief" aria-labelledby="brief-heading">
        <div className="j-shell g-brief-grid-outer">
          <div className="g-brief-copy">
            <span className="j-eyebrow s-eyebrow">10 / Event brief</span>
            <h2 id="brief-heading" className="s-title">Tell us about<br />your event.</h2>
            <p className="s-lead-body g-body">A few details are enough to start. We&apos;ll come back with a coordinated plan for flights, hotels, transfers and everything in between.</p>
            <a className="g-whatsapp" href={office.whatsapp} target="_blank" rel="noreferrer">
              <span className="g-whatsapp-icon"><TravelIcon kind="chat" size={22} /></span>
              <span>Planning something soon? <strong>Speak directly with our Groups &amp; MICE team on WhatsApp.</strong></span>
              <Arrow />
            </a>
          </div>
          <EventBrief />
        </div>
      </section>

      <section className="s-final g-final j-torn-top" aria-labelledby="final-heading">
        <Image className="j-photo s-final-photo" src="/images/airport.png" alt="" fill sizes="100vw" />
        <div className="s-final-shade" />
        <div className="j-shell s-final-content">
          <div className="g-arrived" aria-label="40 of 40 travellers arrived"><span data-count="40" aria-hidden="true">40</span><span aria-hidden="true">/ 40 arrived</span></div>
          <span className="j-eyebrow">Groups &amp; MICE</span>
          <h2 id="final-heading">Everyone has arrived.<br /><span>Now the event can begin.</span></h2>
          <p className="s-lead-body">From the first flight to the final transfer, Wings &amp; Wheels helps coordinate the journey that happens around your event.</p>
          <div className="s-actions">
            <EnquiryButton className="j-button j-button-cream" service="Groups & MICE">Plan your group travel</EnquiryButton>
            <a className="j-button j-button-outline-light" href={office.whatsapp} target="_blank" rel="noreferrer"><TravelIcon kind="chat" size={16} />WhatsApp our team</a>
          </div>
        </div>
      </section>
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
