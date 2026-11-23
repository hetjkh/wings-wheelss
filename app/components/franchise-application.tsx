"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Arrow, TravelIcon } from "./icons";
import { office } from "./data";

export type ApplicationMarket = { name: string; city: string; pin: { x: number; y: number } };

const marketEvent = "franchise:market";

const steps = [{ label: "You" }, { label: "Business" }, { label: "Market" }, { label: "Vision" }];

const businessTypes = ["Travel agency", "Tour operator / DMC", "Hospitality", "Corporate services", "Investor / entrepreneur", "Other"];
const businessYears = ["Under 2 yrs", "2–5 yrs", "5–10 yrs", "10+ yrs"];
const tourismYears = ["None yet", "Under 2 yrs", "2–5 yrs", "5+ yrs"];
const investments = ["Below $25,000", "$25,000–$50,000", "$50,000–$100,000", "$100,000–$250,000", "Above $250,000", "Prefer to Discuss"];
const timelines = ["Within 3 Months", "3–6 Months", "6–12 Months", "Exploring Opportunities"];
const marketLabel = (name: string) => name === "Saudi Arabia" ? "Saudi Arabia (KSA)" : name;
const required = ["fullName", "email", "phone", "country", "businessType", "businessYears", "tourismYears", "market", "city", "investment", "timeline", "consent"];

/** Smooth-scroll to the form fields (past the section heading). */
function scrollToApplication() {
  const target = document.getElementById("apply");
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - (window.matchMedia("(max-width: 767px)").matches ? 96 : 88);
  window.scrollTo({ top, behavior: "smooth" });
}

/** A link that scrolls to the application and, when given a market, chooses it. */
export function FranchiseApplyLink({ market, className, children }: { market?: string; className?: string; children: ReactNode }) {
  return <a
    href="#apply"
    className={className}
    onClick={event => {
      event.preventDefault();
      if (market) window.dispatchEvent(new CustomEvent(marketEvent, { detail: market }));
      scrollToApplication();
      history.replaceState(null, "", "#apply");
    }}
  >{children}</a>;
}

function Choice({ name, value, checked, children, className = "fa-chip" }: { name: string; value: string; checked: boolean; children?: ReactNode; className?: string }) {
  return <label className={`${className}${checked ? " is-on" : ""}`}>
    <input type="radio" name={name} value={value} required />
    {children ?? <span>{value}</span>}
  </label>;
}

export function FranchiseApplication({ markets, dubai }: { markets: ApplicationMarket[]; dubai: { x: number; y: number } }) {
  const form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const read = () => {
    if (!form.current) return;
    const data = new FormData(form.current);
    setValues(Object.fromEntries(Array.from(data.keys()).map(key => [key, String(data.get(key) ?? "")])));
  };

  const choose = (name: string, value: string) => {
    const input = form.current?.querySelector<HTMLInputElement>(`input[name="${name}"][value="${CSS.escape(value)}"]`);
    if (input) { input.checked = true; read(); }
  };

  useEffect(() => {
    const pick = (event: Event) => {
      const name = (event as CustomEvent<string>).detail;
      setSent(false);
      setStep(2);
      requestAnimationFrame(() => choose("market", name));
    };
    window.addEventListener(marketEvent, pick);
    return () => window.removeEventListener(marketEvent, pick);
  }, []);

  const goTo = (next: number) => {
    if (next > step) {
      const fields = form.current?.querySelectorAll<HTMLInputElement>(`[data-step="${step}"] :is(input, textarea)`);
      if (fields && Array.from(fields).some(field => !field.reportValidity())) return;
    }
    setStep(next);
    reveal();
  };

  const reveal = () => {
    const top = form.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) form.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < steps.length - 1) { goTo(step + 1); return; }
    const invalid = Array.from(event.currentTarget.querySelectorAll<HTMLInputElement>("input, textarea")).find(field => !field.checkValidity());
    if (invalid) {
      setStep(Number(invalid.closest("[data-step]")?.getAttribute("data-step") ?? 0));
      requestAnimationFrame(() => invalid.reportValidity());
      return;
    }
    setSent(true);
    requestAnimationFrame(reveal);
  };

  const filled = required.filter(key => values[key]).length;
  const progress = filled / required.length;
  const market = markets.find(item => item.name === values.market);
  const initials = (values.fullName || "").split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join("");
  const arc = market && {
    x: (market.pin.x + dubai.x) / 2,
    y: Math.min(market.pin.y, dubai.y) - Math.abs(dubai.x - market.pin.x) * .32 - 8,
  };

  return <div className="fa-layout">
    <form ref={form} className={`fa-form${sent ? " is-sent" : ""}`} noValidate onSubmit={submit} onInput={read} onChange={read} aria-label="Franchise partnership application">
      <ol className="fa-tabs" style={{ "--step": step } as CSSProperties}>
        {steps.map((item, index) => <li key={item.label}>
          <button type="button" className={index === step ? "is-current" : index < step ? "is-done" : ""} onClick={() => index < step && goTo(index)} disabled={index > step} aria-current={index === step ? "step" : undefined}>
            <span className="fa-tab-number">{index < step ? <TravelIcon kind="check" size={16} /> : String(index + 1).padStart(2, "0")}</span>
            <span className="fa-tab-label">{item.label}</span>
          </button>
        </li>)}
      </ol>

      <div className="fa-stage">
        <fieldset data-step="0" hidden={step !== 0}>
          <legend><span>01 —</span> Personal information</legend>
          <div className="fa-grid">
            <label className="fa-field">Full name *<input name="fullName" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" /></label>
            <label className="fa-field">Job title / designation<input name="jobTitle" autoComplete="organization-title" maxLength={100} placeholder="e.g. Managing Director" /></label>
            <label className="fa-field">Business email address *<input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label>
            <label className="fa-field">Mobile / WhatsApp number *<input name="phone" type="tel" autoComplete="tel" required minLength={6} maxLength={30} placeholder="+966 …" /></label>
            <label className="fa-field fa-wide">Country of residence *<input name="country" autoComplete="country-name" required maxLength={80} placeholder="Where are you based?" /></label>
          </div>
        </fieldset>

        <fieldset data-step="1" hidden={step !== 1}>
          <legend><span>02 —</span> Business information</legend>
          <div className="fa-grid">
            <label className="fa-field">Company name <small>(if applicable)</small><input name="company" autoComplete="organization" maxLength={120} /></label>
            <label className="fa-field">Company website <small>(if available)</small><input name="website" type="url" inputMode="url" maxLength={200} placeholder="https://" /></label>
          </div>
          <div className="fa-question">
            <p>Current business type *</p>
            <div className="fa-chips">{businessTypes.map(item => <Choice key={item} name="businessType" value={item} checked={values.businessType === item} />)}</div>
          </div>
          <div className="fa-grid">
            <div className="fa-question">
              <p>Years of business experience *</p>
              <div className="fa-chips">{businessYears.map(item => <Choice key={item} name="businessYears" value={item} checked={values.businessYears === item} />)}</div>
            </div>
            <div className="fa-question">
              <p>Travel &amp; tourism industry experience *</p>
              <div className="fa-chips">{tourismYears.map(item => <Choice key={item} name="tourismYears" value={item} checked={values.tourismYears === item} />)}</div>
            </div>
          </div>
        </fieldset>

        <fieldset data-step="2" hidden={step !== 2}>
          <legend><span>03 —</span> Franchise interest</legend>
          <div className="fa-question">
            <p>Preferred franchise market *</p>
            <div className="fa-markets">{markets.map((item, index) => <Choice key={item.name} name="market" value={item.name} checked={values.market === item.name} className="fa-market">
              <span className="fa-market-number">{String(index + 1).padStart(2, "0")}</span>
              <strong>{marketLabel(item.name)}</strong>
              <span className="fa-market-city"><TravelIcon kind="pin" size={14} />{item.city}</span>
              <i className="fa-market-tick" aria-hidden="true"><TravelIcon kind="check" size={18} /></i>
            </Choice>)}</div>
          </div>
          <label className="fa-field">Preferred city / territory *<input name="city" required maxLength={120} placeholder={market ? `e.g. ${market.city}` : "e.g. Riyadh, Cairo, Casablanca"} /></label>
          <div className="fa-question">
            <p>Indicative investment capacity (USD) *</p>
            <div className="fa-scale">{investments.map((item, index) => <Choice key={item} name="investment" value={item} checked={values.investment === item} className="fa-scale-step">
              <i style={{ "--h": item === "Prefer to Discuss" ? 0 : (index + 1) / 5 } as CSSProperties} aria-hidden="true" />
              <span>{item}</span>
            </Choice>)}</div>
          </div>
          <div className="fa-question">
            <p>Expected business launch timeline *</p>
            <div className="fa-route">{timelines.map((item, index) => <Choice key={item} name="timeline" value={item} checked={values.timeline === item} className="fa-route-stop">
              <i aria-hidden="true">{index < 3 ? <TravelIcon kind="plane" size={16} /> : <TravelIcon kind="compass" size={16} />}</i>
              <span>{item}</span>
            </Choice>)}</div>
          </div>
        </fieldset>

        <fieldset data-step="3" hidden={step !== 3}>
          <legend><span>04 —</span> Tell us more</legend>
          <label className="fa-field">Why are you interested in becoming a Wings &amp; Wheels franchise partner?
            <textarea name="interest" rows={3} maxLength={1200} placeholder="What draws you to this partnership?" />
            <small className="fa-count">{(values.interest ?? "").length} / 1200</small>
          </label>
          <label className="fa-field">Your experience, connections and plans
            <textarea name="overview" rows={4} maxLength={2000} placeholder="Share a brief overview of your business experience, local market connections and plans for developing the Wings & Wheels brand in your preferred market." />
            <small className="fa-count">{(values.overview ?? "").length} / 2000</small>
          </label>
          <label className="fa-consent">
            <input type="checkbox" name="consent" value="yes" required />
            <span className="fa-consent-box" aria-hidden="true"><TravelIcon kind="check" size={16} /></span>
            <span>I confirm that the information provided is accurate and agree to be contacted by Wings &amp; Wheels Travel &amp; Tourism regarding my franchise enquiry, in accordance with its privacy policy.</span>
          </label>
        </fieldset>
      </div>

      <div className="fa-actions">
        {step > 0 ? <button type="button" className="fa-back" onClick={() => goTo(step - 1)}><Arrow back />Back</button> : <span />}
        <button type="submit" className="f-step-cta fa-next">
          <span>{step < steps.length - 1 ? `Next: ${steps[step + 1].label}` : "Submit franchise enquiry"}</span>
          <span className="f-step-cta-dot"><Arrow /></span>
        </button>
      </div>
      <p className="fa-legal"><TravelIcon kind="document" size={16} />All applications are subject to evaluation. Submission does not constitute franchise approval, an offer of territorial exclusivity or a binding commercial agreement.</p>

      {sent && <div className="fa-sent" role="status">
        <span className="fa-sent-stamp"><TravelIcon kind="check" size={40} /></span>
        <span className="j-eyebrow">Application received</span>
        <h3>Thank you{values.fullName ? `, ${values.fullName.split(" ")[0]}` : ""}.</h3>
        <p>This form is a preview, so your application hasn&apos;t been sent yet. For now, please call {office.phones[0].label} or email {office.email} and our expansion team will be in touch.</p>
        <button type="button" className="fa-back" onClick={() => { setSent(false); setStep(0); }}><Arrow back />Review my application</button>
      </div>}
    </form>

    <aside className={`fa-dossier${sent ? " is-sent" : ""}`} aria-label="Your application summary" style={{ "--progress": progress } as CSSProperties}>
      <div className="fa-dossier-head">
        <span>Partner dossier</span>
        <span>W&amp;W / FR-{initials || "00"}</span>
      </div>
      <div className="fa-dossier-id">
        <span className="fa-ring" aria-hidden="true"><b>{Math.round(progress * 100)}%</b></span>
        <div>
          <strong>{values.fullName || "Your name"}</strong>
          <span>{[values.jobTitle, values.company].filter(Boolean).join(" · ") || "Your role · Your company"}</span>
          <span className="fa-dossier-route">{market ? `Dubai → ${values.city || market.city}` : "Choose your market"}</span>
        </div>
      </div>

      <svg className="fa-dossier-map" viewBox="450 92 230 120" aria-hidden="true">
        <image href="/images/world-map.svg" x="0" y="0" width="1000" height="440" />
        {markets.map(item => <circle key={item.name} className={`fa-map-dot${item === market ? " is-on" : ""}`} cx={item.pin.x} cy={item.pin.y} r="2.4" />)}
        <circle className="fa-map-home" cx={dubai.x} cy={dubai.y} r="2.6" />
        <text className="fa-map-label" x={dubai.x + 4} y={dubai.y + 9}>Dubai</text>
        {market && arc ? <g key={market.name}>
          <path className="fa-map-arc" pathLength={1} d={`M${dubai.x} ${dubai.y}Q${arc.x} ${arc.y} ${market.pin.x} ${market.pin.y}`} />
          <circle className="fa-map-pulse" cx={market.pin.x} cy={market.pin.y} r="7" />
          <text className="fa-map-label" x={market.pin.x} y={market.pin.y - 8} textAnchor="middle">{values.city || market.city}</text>
        </g> : null}
      </svg>

      <dl className="fa-dossier-list">
        <div><dt>Market</dt><dd>{market ? marketLabel(market.name) : "—"}</dd></div>
        <div><dt>Territory</dt><dd>{values.city || "—"}</dd></div>
        <div><dt>Business</dt><dd>{values.businessType || "—"}</dd></div>
        <div><dt>Experience</dt><dd>{values.businessYears ? `${values.businessYears} in business` : "—"}</dd></div>
        <div><dt>Investment</dt><dd>{values.investment || "—"}</dd></div>
        <div><dt>Launch</dt><dd>{values.timeline || "—"}</dd></div>
      </dl>

      <div className="fa-dossier-foot">
        <span className="fa-barcode" aria-hidden="true" />
        <span className="fa-stamp">{sent ? "Under review" : `Step ${step + 1} of ${steps.length}`}</span>
      </div>
    </aside>
  </div>;
}
