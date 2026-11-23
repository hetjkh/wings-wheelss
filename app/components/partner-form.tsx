"use client";

import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Arrow, TravelIcon } from "./icons";
import { office } from "./data";

const steps = [
  { label: "Company", icon: "briefcase", title: "Company information", detail: "Tell us about your organisation and where it’s based." },
  { label: "Contact", icon: "people", title: "Primary contact", detail: "Who should our partnerships team speak with?" },
  { label: "Travel", icon: "plane", title: "Corporate travel requirements", detail: "Tell us how often you travel and the services your team needs." },
  { label: "Benefits", icon: "diamond", title: "Preferred corporate benefits", detail: "Choose the benefits that matter to your organisation." },
  { label: "Setup", icon: "route", title: "Current travel management", detail: "Tell us how you arrange travel today and when you’d like to start." },
] as const;

const departments = [
  "Administration",
  "Procurement",
  "Human Resources",
  "Finance",
  "Travel Management",
  "Operations",
  "Executive Management",
  "Other",
];

const frequencies = ["Daily", "Weekly", "Monthly", "Occasionally", "Project / Event Based"];

const travellers = ["1–5", "6–15", "16–30", "31–50", "51–100", "More than 100"];

const spends = [
  "Below AED 50,000",
  "AED 50,000–150,000",
  "AED 150,001–500,000",
  "AED 500,001–1 Million",
  "Above AED 1 Million",
  "Prefer Not to Disclose",
];

const services = [
  "Corporate Flight Bookings",
  "International Hotel Reservations",
  "Airport & Ground Transfers",
  "Visa & Travel Documentation Assistance",
  "Group Travel & MICE",
  "Executive / VIP Travel",
  "Travel Insurance Assistance",
  "Travel Changes & Rebooking Support",
];

const benefits = [
  "Preferred Corporate Airfares",
  "Negotiated Hotel Rates",
  "Dedicated Corporate Account Manager",
  "Priority Booking & Traveller Assistance",
  "Flexible Booking & Change Support",
  "Group Travel Benefits",
  "Consolidated Monthly Invoicing",
  "Corporate Travel Spend Reports",
  "Airport Transfer Benefits",
  "Customised Corporate Travel Arrangements",
];

const management = [
  "Through an Existing Travel Management Company",
  "Directly With Airlines & Hotels",
  "Through an Internal Travel Desk",
  "Employees Book Independently",
  "Combination of the Above",
];

const timelines = ["Immediately", "Within 30 Days", "Within 1–3 Months", "Exploring Options"];

const required = [
  "company",
  "website",
  "industry",
  "country",
  "city",
  "employees",
  "fullName",
  "jobTitle",
  "email",
  "phone",
  "department",
  "frequency",
  "travellers",
  "spend",
  "services",
  "benefits",
  "management",
  "agency",
  "timeline",
  "consent",
];

/** Smooth-scroll to the partnership application fields. */
function scrollToApplication() {
  const target = document.getElementById("apply");
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - (window.matchMedia("(max-width: 767px)").matches ? 96 : 88);
  window.scrollTo({ top, behavior: "smooth" });
}

/** A link that scrolls to the corporate partnership application. */
export function PartnerApplyLink({ className, children }: { className?: string; children: ReactNode }) {
  return <a
    href="#apply"
    className={className}
    onClick={event => {
      event.preventDefault();
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

function Checks({ name, options, selected }: { name: string; options: string[]; selected: string[] }) {
  return <div className="fa-chips fa-checks">{options.map(item => {
    const on = selected.includes(item);
    return <label key={item} className={`fa-chip${on ? " is-on" : ""}`}>
      <input type="checkbox" name={name} value={item} />
      <span className="p-form-choice-tick" aria-hidden="true"><TravelIcon kind="check" size={18} /></span>
      <span>{item}</span>
    </label>;
  })}</div>;
}

function list(value?: string) {
  return value ? value.split(", ").filter(Boolean) : [];
}

/** Multi-step corporate partnership application. */
export function PartnerForm() {
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const confirmation = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [lastVisitedStep, setLastVisitedStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const read = () => {
    if (!form.current) return;
    const data = new FormData(form.current);
    const next: Record<string, string> = {};
    for (const key of new Set(Array.from(data.keys()))) {
      const all = data.getAll(key).map(String).filter(Boolean);
      next[key] = all.length > 1 ? all.join(", ") : (all[0] ?? "");
    }
    setValues(next);
    form.current.querySelectorAll<HTMLInputElement>("input[name='services'], input[name='benefits']").forEach(input => input.setCustomValidity(""));
  };

  const selected = (name: string) => form.current ? new FormData(form.current).getAll(name).map(String).filter(Boolean) : [];

  const requireChecks = (name: string, message: string) => {
    const first = form.current?.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (!first) return true;
    if (selected(name).length) { first.setCustomValidity(""); return true; }
    first.setCustomValidity(message);
    first.reportValidity();
    return false;
  };

  const goTo = (next: number) => {
    if (next > step) {
      const panel = form.current?.querySelector(`[data-step="${step}"]`);
      const fields = panel?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(":is(input, textarea)");
      if (fields && Array.from(fields).some(field => !field.reportValidity())) return;
      if (step === 2 && !requireChecks("services", "Select at least one travel service.")) return;
      if (step === 3 && !requireChecks("benefits", "Select at least one benefit.")) return;
    }
    form.current?.querySelectorAll<HTMLInputElement>("input[name='services'], input[name='benefits']").forEach(input => input.setCustomValidity(""));
    setStep(next);
    setLastVisitedStep(visited => Math.max(visited, next));
    requestAnimationFrame(() => reveal(heading.current));
  };

  const reveal = (target: HTMLElement | null) => {
    if (!target) return;
    target.focus({ preventScroll: true });
    const { top, bottom } = target.getBoundingClientRect();
    if (top < 96 || bottom > window.innerHeight) target.scrollIntoView({ block: "start" });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < steps.length - 1) { goTo(step + 1); return; }
    const invalid = Array.from(event.currentTarget.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")).find(field => !field.checkValidity());
    if (invalid) {
      setStep(Number(invalid.closest("[data-step]")?.getAttribute("data-step") ?? 0));
      requestAnimationFrame(() => invalid.reportValidity());
      return;
    }
    if (!selected("services").length || !selected("benefits").length) {
      setStep(!selected("services").length ? 2 : 3);
      return;
    }
    setSent(true);
    requestAnimationFrame(() => reveal(confirmation.current));
  };

  const filled = required.filter(key => values[key]).length;
  const progress = filled / required.length;
  const serviceCount = list(values.services).length;
  const benefitCount = list(values.benefits).length;
  const currentStep = steps[step];
  const summary = [
    ["Contact", [values.fullName, values.jobTitle].filter(Boolean).join(" · ")],
    ["Headquarters", [values.city, values.country].filter(Boolean).join(", ")],
    ["Industry", values.industry],
    ["Department", values.department],
    ["Travel frequency", values.frequency],
    ["Travellers per month", values.travellers],
    ["Annual travel spend", values.spend],
    ["Services selected", serviceCount],
    ["Benefits selected", benefitCount],
    ["Uses a travel agency", values.agency],
    ["Preferred start", values.timeline],
  ].filter(([, value]) => value);

  return <div className="fa-layout">
    <aside className="p-form-rail" aria-label="Application progress and summary">
      <div className="p-form-itinerary">
        <div className="p-form-progress-label"><strong>Your application</strong><span>{Math.round(progress * 100)}%</span></div>
        <progress className="p-form-progress" aria-label="Required answers filled in" value={filled} max={required.length} />
        <nav aria-label="Application steps">
          <ol className="p-form-steps">
            {steps.map((item, index) => <li key={item.label}>
              <button type="button" onClick={() => goTo(index)} disabled={sent || index === step || index > lastVisitedStep} aria-current={index === step ? "step" : undefined}>
                <span className="p-form-step-icon"><TravelIcon kind={index < lastVisitedStep && index !== step ? "check" : item.icon} size={20} /></span>
                <span>{item.label}</span>
                <span className="p-form-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </button>
            </li>)}
          </ol>
        </nav>
      </div>
      <details className="p-form-summary">
        <summary><TravelIcon kind="document" size={21} /><span>{values.company || "Application summary"}</span></summary>
        {summary.length > 0 ? <dl>{summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          : <p>Your details will appear here as you fill in the form.</p>}
      </details>
    </aside>

    <form ref={form} className={`fa-form${sent ? " is-sent" : ""}`} noValidate onSubmit={submit} onChange={read} aria-label="Corporate partnership application">
      <header className="p-form-heading">
        <div className="p-form-heading-icon"><TravelIcon kind={currentStep.icon} size={30} /></div>
        <div><p className="p-form-step-count">Step {step + 1} of {steps.length}</p><h3 ref={heading} tabIndex={-1} id="partner-step-heading">{currentStep.title}</h3><p>{currentStep.detail}</p></div>
      </header>
      <div className="fa-stage">
        <fieldset data-step="0" hidden={step !== 0} aria-labelledby="partner-step-heading">
          <div className="fa-grid">
            <label className="fa-field">Registered company name *<input name="company" autoComplete="organization" required minLength={2} maxLength={120} placeholder="Your organisation" /></label>
            <label className="fa-field">Company website *<input name="website" type="url" inputMode="url" required maxLength={200} placeholder="https://" /></label>
            <label className="fa-field">Industry / business sector *<input name="industry" required maxLength={100} placeholder="e.g. Energy, Finance, Logistics" /></label>
            <label className="fa-field">Number of employees *<input name="employees" required maxLength={40} placeholder="e.g. 50–100" /></label>
            <label className="fa-field">Country of registration *<input name="country" autoComplete="country-name" required maxLength={80} placeholder="Where is the company registered?" /></label>
            <label className="fa-field">City / headquarters *<input name="city" autoComplete="address-level2" required maxLength={80} placeholder="e.g. Dubai" /></label>
            <label className="fa-field fa-wide">Company trade licence / registration number <small>(optional)</small><input name="licence" maxLength={80} placeholder="If available" /></label>
          </div>
        </fieldset>

        <fieldset data-step="1" hidden={step !== 1} aria-labelledby="partner-step-heading">
          <div className="fa-grid">
            <label className="fa-field">Full name *<input name="fullName" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" /></label>
            <label className="fa-field">Job title / designation *<input name="jobTitle" autoComplete="organization-title" required maxLength={100} placeholder="e.g. Travel Manager" /></label>
            <label className="fa-field">Corporate email address *<input name="email" type="email" autoComplete="email" required placeholder="name@company.com" /></label>
            <label className="fa-field">Mobile / WhatsApp number *<input name="phone" type="tel" autoComplete="tel" required minLength={6} maxLength={30} placeholder="+971 …" /></label>
          </div>
          <div className="fa-question">
            <p>Department *</p>
            <div className="fa-chips">{departments.map(item => <Choice key={item} name="department" value={item} checked={values.department === item} />)}</div>
          </div>
        </fieldset>

        <fieldset data-step="2" hidden={step !== 2} aria-labelledby="partner-step-heading">
          <div className="fa-question">
            <p>How frequently does your company travel? *</p>
            <div className="fa-chips">{frequencies.map(item => <Choice key={item} name="frequency" value={item} checked={values.frequency === item} />)}</div>
          </div>
          <div className="fa-question">
            <p>Estimated number of travellers per month *</p>
            <div className="fa-chips">{travellers.map(item => <Choice key={item} name="travellers" value={item} checked={values.travellers === item} />)}</div>
          </div>
          <div className="fa-question">
            <p>Estimated annual corporate travel spend (AED) *</p>
            <div className="fa-scale">{spends.map((item, index) => <Choice key={item} name="spend" value={item} checked={values.spend === item} className="fa-scale-step">
              <i style={{ "--h": item === "Prefer Not to Disclose" ? 0 : (index + 1) / 5 } as CSSProperties} aria-hidden="true" />
              <span>{item}</span>
            </Choice>)}</div>
          </div>
          <div className="fa-question">
            <p>Which travel services does your company require? * <small>{serviceCount ? `${serviceCount} selected` : "Select all that apply"}</small></p>
            <Checks name="services" options={services} selected={list(values.services)} />
          </div>
          <label className="fa-field">Frequently travelled destinations / routes
            <input name="routes" maxLength={200} placeholder="Example: Dubai–Riyadh, Dubai–Nairobi, Dubai–London" />
          </label>
        </fieldset>

        <fieldset data-step="3" hidden={step !== 3} aria-labelledby="partner-step-heading">
          <div className="fa-question">
            <p>Which benefits are most important to your organisation? * <small>{benefitCount ? `${benefitCount} selected` : "Select all that apply"}</small></p>
            <Checks name="benefits" options={benefits} selected={list(values.benefits)} />
          </div>
        </fieldset>

        <fieldset data-step="4" hidden={step !== 4} aria-labelledby="partner-step-heading">
          <div className="fa-question">
            <p>How does your company currently manage business travel? *</p>
            <div className="fa-chips">{management.map(item => <Choice key={item} name="management" value={item} checked={values.management === item} />)}</div>
          </div>
          <div className="fa-question">
            <p>Are you currently working with a corporate travel agency? *</p>
            <div className="fa-chips">{["Yes", "No"].map(item => <Choice key={item} name="agency" value={item} checked={values.agency === item} />)}</div>
          </div>
          <div className="fa-question">
            <p>When would you like to start a corporate partnership? *</p>
            <div className="fa-route">{timelines.map((item, index) => <Choice key={item} name="timeline" value={item} checked={values.timeline === item} className="fa-route-stop">
              <i aria-hidden="true">{index < 3 ? <TravelIcon kind="plane" size={16} /> : <TravelIcon kind="compass" size={16} />}</i>
              <span>{item}</span>
            </Choice>)}</div>
          </div>
          <label className="fa-field">Additional requirements / comments
            <textarea name="comments" rows={4} maxLength={2000} placeholder="Tell us about your travel policy, frequent destinations, billing requirements or any specific benefits your company would like us to consider." />
            <small className="fa-count">{(values.comments ?? "").length} / 2000</small>
          </label>
          <label className="fa-consent">
            <input type="checkbox" name="consent" value="yes" required />
            <span className="fa-consent-box" aria-hidden="true"><TravelIcon kind="check" size={16} /></span>
            <span>I confirm that I am authorised to submit this enquiry on behalf of my organisation. I agree to be contacted by Wings &amp; Wheels Travel &amp; Tourism regarding corporate travel services and partnership opportunities, in accordance with its privacy policy.</span>
          </label>
        </fieldset>
      </div>

      <div className="fa-actions">
        {step > 0 ? <button type="button" className="fa-back" onClick={() => goTo(step - 1)}><Arrow back />Back</button> : <span />}
        <button type="submit" className="f-step-cta fa-next">
          <span>{step < steps.length - 1 ? `Next: ${steps[step + 1].label}` : "Request corporate partnership"}</span>
          <span className="f-step-cta-dot"><Arrow /></span>
        </button>
      </div>
      <p className="fa-legal"><TravelIcon kind="document" size={16} />Preferred rates and benefits are subject to travel volume, routes, supplier availability, commercial assessment and agreed partnership terms. Submission of this form does not guarantee specific discounts, benefits or credit facilities.</p>

      {sent && <div className="fa-sent" role="status">
        <span className="fa-sent-stamp"><TravelIcon kind="check" size={40} /></span>
        <h3 ref={confirmation} tabIndex={-1}>Your application is ready.</h3>
        <p>This form is a preview, so your application hasn&apos;t been sent yet. For now, please call {office.phones[0].label} or email {office.email} and our corporate partnerships team will be in touch.</p>
        <button type="button" className="fa-back" onClick={() => { setSent(false); goTo(0); }}><Arrow back />Review my application</button>
      </div>}
    </form>

  </div>;
}
