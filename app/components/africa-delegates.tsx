import Link from "next/link";
import Image from "./travel-image";
import { Arrow, TravelIcon } from "./icons";

const origins = ["Nairobi", "Kampala", "Juba", "Khartoum", "Tanzania"];
const arrangements = [
  { stage: "Before departure", services: ["Group flights", "Visa assistance"] },
  { stage: "On arrival", services: ["Hotels", "Airport transfers"] },
  { stage: "At the event", services: ["Venue transportation", "Delegate travel"] },
];

export function AfricaDelegates() {
  return <div className="a-delegate-layout">
    <div className="a-delegate-visual">
      <figure className="a-delegate-photo">
        <Image src="/images/library/exhibition.webp" alt="Delegates networking on the floor of a professional trade exhibition in Dubai" fill sizes="(max-width: 900px) 94vw, 54vw" />
        <figcaption>Different departure points.<br />One event.</figcaption>
      </figure>
      <div className="a-delegate-route">
        <div className="a-delegate-origins">
          <span className="a-delegate-label">Departing from</span>
          <ul aria-label="Departure locations">{origins.map(city => <li key={city}>{city}</li>)}</ul>
        </div>
        <div className="a-delegate-destination">
          <span className="a-delegate-label">Arriving in</span>
          <p>Dubai<span>United Arab Emirates</span></p>
        </div>
      </div>
    </div>

    <div className="a-delegate-details">
      <h3 className="a-delegate-label">Your travel arrangements</h3>
      <dl className="a-delegate-services">
        {arrangements.map(({ stage, services }) => <div key={stage}>
          <dt>{stage}</dt>
          <dd><ul>{services.map(service => <li key={service}>{service}</li>)}</ul></dd>
        </div>)}
      </dl>
      <div className="a-delegate-support">
        <TravelIcon kind="support" size={22} />
        <div><h4>Changes &amp; support</h4><p>Assistance when your team&apos;s plans change.</p></div>
      </div>
      <div className="a-delegate-actions">
        <a className="j-button j-button-olive" href="#africa-enquiry">Plan delegate travel<Arrow /></a>
        <Link className="j-text-link" href="/groups-mice">Explore Groups &amp; MICE<Arrow /></Link>
      </div>
    </div>
  </div>;
}
