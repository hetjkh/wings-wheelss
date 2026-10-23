import { ClosingScene } from "./services-final";

export function BlogClosing() {
  return <ClosingScene
    chapter="03 / Wings & Wheels"
    ticket="From a story"
    left={<>Some trips start<br />with a place.</>}
    right={<>Others start<br />with <em>a question.</em></>}
    photo="/images/library/journey-above-clouds.webp"
    photoPosition="center"
    pass={["Boarding pass", "Journal"]}
    from="A story"
    to="A journey"
    text="If a note here sounds like the trip you have in mind, tell us the dates and who is going. We will take it from there."
    chips={[
      { icon: "compass", label: "Destinations" },
      { icon: "route", label: "Planning" },
      { icon: "briefcase", label: "Business" },
      { icon: "people", label: "Groups" },
    ]}
    action={{ label: "Plan your journey", href: "/contact" }}
    whatsapp="WhatsApp us"
  />;
}
