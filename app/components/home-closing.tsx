import { JourneyFooter } from "./journey-footer";
import { ServicesFinal } from "./services-final";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./home-ending.css";

/** Below-fold closing scene + footer — CSS loads with this chunk, not the hero. */
export default function HomeClosing() {
  return <>
    <div className="journey-page services-page home-ending"><ServicesFinal /></div>
    <div className="journey-page home-ending"><JourneyFooter /></div>
  </>;
}
