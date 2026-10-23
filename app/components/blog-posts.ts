export const blogCategories = ["Destinations", "Planning", "Business", "Groups"] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogPost = {
  slug: string;
  title: string;
  lines: string[];
  excerpt: string;
  category: BlogCategory;
  date: string;
  dateTime: string;
  read: string;
  image: string;
  alt: string;
  position?: string;
  pull: string;
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "nairobi-to-dubai",
    title: "How a journey from Nairobi to Dubai actually gets planned",
    lines: ["Nairobi", "to Dubai."],
    excerpt: "A meeting on Tuesday, a family joining on Friday, and the details in between that should never feel like a second job.",
    category: "Planning",
    date: "12 October 2026",
    dateTime: "2026-10-12",
    read: "6 min",
    image: "/images/library/nairobi-city.webp",
    alt: "Nairobi city centre above a green urban canopy",
    pull: "The ticket is one part. The journey is the whole picture.",
    paragraphs: [
      "Most Nairobi–Dubai journeys start with a date, not a destination mood board. A meeting that cannot move. A school holiday that can. Someone who needs to be in the room by Tuesday morning, and someone else who would rather arrive when the week has already settled.",
      "We begin with the reason for the trip. Who is travelling, from which city, and what has to be true when they land. Flights are then checked against that, not the other way around. A cheaper connection that lands at midnight is rarely the kinder plan if the first meeting is at nine.",
      "Hotels, airport transfers and any visa questions sit in the same plan. A traveller should not have to keep three confirmations, two apps and a forwarded email in their head. The schedule, the stay and the car that meets the flight belong together.",
      "When something shifts — and on this route, something often does — the person who planned the journey is still the person to call. That is the part of the work that never shows on a boarding pass, and the part travellers remember.",
    ],
  },
  {
    slug: "east-africa-seasons",
    title: "When East Africa is worth the longer stay",
    lines: ["East Africa,", "worth the", "longer stay."],
    excerpt: "Safari, city weeks and the coast do not share one perfect month. Here is how we talk about timing.",
    category: "Destinations",
    date: "28 September 2026",
    dateTime: "2026-09-28",
    read: "5 min",
    image: "/images/library/kenya-game-drive.webp",
    alt: "A safari vehicle crossing Kenyan grasslands at sunset",
    position: "center",
    pull: "The right month depends on why you are going.",
    paragraphs: [
      "East Africa is often described as if it had a single season. It does not. A game drive in the Mara, a working week in Nairobi and a few slow days in Zanzibar ask for different calendars, and a good itinerary admits that.",
      "July to October is the period many safari travellers ask for first. Skies are clearer, wildlife viewing is strong, and parks feel awake. It is also when flights and the better camps fill. If those months are the point of the trip, we plan early and keep the city nights short.",
      "January and February suit travellers who want wildlife without the mid-year rush, and families who can travel once schools reopen their own calendars. The coast stays warm. City meetings carry on regardless of the migration.",
      "We treat the season guide as a starting point, then shape the route around your dates. A shorter safari with a longer coast stay can be the better journey, even in a famous month.",
    ],
  },
  {
    slug: "a-corporate-week",
    title: "What a corporate week should feel like before it starts",
    lines: ["A corporate", "week, before", "it starts."],
    excerpt: "Boarding passes, hotel confirmations and a number to call. The week of travel should not begin in a group chat.",
    category: "Business",
    date: "14 September 2026",
    dateTime: "2026-09-14",
    read: "4 min",
    image: "/images/library/corporate-airport-lounge.webp",
    alt: "A quiet airport lounge with seating arranged for business travellers",
    pull: "Clarity before departure is part of the service.",
    paragraphs: [
      "A corporate trip fails quietly when the details live in five inboxes. One person booked the flight. Another confirmed the hotel. The transfer was arranged in a message that nobody can find at the kerb.",
      "Before anyone leaves, the traveller should have one clear picture: flights, stay, transfers, and who to reach if the day changes. The company should have the same picture, without chasing it.",
      "Preferred airlines and hotels matter, and so does knowing when to step outside them. A policy that ignores a broken connection helps nobody. We keep the preferred path, and we say when a different one is the sensible one.",
      "After the trip, the useful record is simple. What was booked, what changed, and what should be easier next time. That is how a travel account becomes calmer, rather than merely busier.",
    ],
  },
  {
    slug: "maldives-quiet-season",
    title: "The Maldives, when the islands feel quieter",
    lines: ["The Maldives,", "when it feels", "quieter."],
    excerpt: "November to April is the stretch most people mean. The feeling of the trip still depends on how you arrive.",
    category: "Destinations",
    date: "2 September 2026",
    dateTime: "2026-09-02",
    read: "4 min",
    image: "/images/library/maldives-jetty.webp",
    alt: "A wooden jetty leading across turquoise water to a tropical island",
    pull: "The holiday starts at the seaplane, not at the villa.",
    paragraphs: [
      "The Maldives rewards travellers who leave the timetable behind. That only works if the timetable was handled before they left Dubai. A tight connection and a missed seaplane turn a barefoot week into a waiting room.",
      "November to April is the drier, brighter stretch, and the one we suggest first for a first visit. Resorts book out around holidays. The island you want and the flight that lands in time for the afternoon transfer should be chosen together.",
      "We also ask how you want the days to feel. A house reef and a quiet beach ask for a different island than a trip built around dining and diving. The lagoon looks similar in photographs. The days do not.",
      "Transfers, the resort and the nights in Dubai on either side belong in one plan. Then the only decision left on the jetty is whether to swim before dinner.",
    ],
  },
  {
    slug: "exhibition-week",
    title: "Moving a team into an exhibition week",
    lines: ["One event.", "Many arrivals.", "One plan."],
    excerpt: "People arrive from different cities, on different days, into one schedule. The event is not the hard part.",
    category: "Groups",
    date: "18 August 2026",
    dateTime: "2026-08-18",
    read: "5 min",
    image: "/images/library/exhibition.webp",
    alt: "Visitors walking through a bright exhibition hall",
    position: "center",
    pull: "One event. Many arrivals. One plan.",
    paragraphs: [
      "An exhibition week looks simple on a poster and complicated in the arrivals hall. Delegates leave from Nairobi, Kampala, Europe and the Gulf. Some land the night before. Some land the morning of the first session, which is rarely a good idea and sometimes unavoidable.",
      "Rooms need to sit near the venue, or the transfer has to be honest about the drive. Badges, dinners and the flight home are part of the same week. A group booking that only covers hotel rooms leaves the organiser still doing the travel job.",
      "We build a rooming picture, flight list and transfer plan that one person can read. When a delegate changes a date, the change is visible in that picture, not buried in a thread.",
      "The aim is ordinary: everyone in the right place, with a way home already arranged, and an organiser who is not spending the opening night at the airport.",
    ],
  },
  {
    slug: "a-slower-europe",
    title: "A slower way to cross Europe",
    lines: ["A slower way", "through", "Europe."],
    excerpt: "Three cities is often two cities too many. The beautiful route is the one with room between places.",
    category: "Destinations",
    date: "4 August 2026",
    dateTime: "2026-08-04",
    read: "5 min",
    image: "/images/library/amalfi-coast.webp",
    alt: "Colourful houses climbing the cliffs above the Amalfi Coast",
    position: "center",
    pull: "Leave a morning with nothing planned in it.",
    paragraphs: [
      "Europe is easy to overfill. A week that tries to hold Paris, Rome and the coast usually holds airports. The journeys we like better pick a region and stay long enough for a neighbourhood to become familiar.",
      "Spring and early autumn are the months we return to for cities: lighter crowds, walkable weather, and evenings that still want a table outside. Summer belongs to the coast and the lakes, if the hotels were held in time.",
      "Trains are often the kinder connection once you are there. We still check the flight into the first city and out of the last with the same care, including the night you might want in Dubai on the way home.",
      "Tell us the feeling you want — a city to wander, a coast to do very little on — and we will keep the map smaller than the brochure suggests.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}
