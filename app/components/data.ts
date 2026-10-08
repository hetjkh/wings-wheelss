export type Region = "Africa" | "Europe" | "Asia" | "Islands" | "Middle East";

export type Destination = {
  id: string;
  name: string;
  country: string;
  region: Region;
  image: string;
  alt: string;
  tagline: string;
  description: string;
  flight: string;
  season: string;
  iso: string;
  map: { x: number; y: number; dx: number; dy: number };
};

export const destinations: Destination[] = [
  { id: "santorini", name: "Santorini", country: "Greece", region: "Europe", image: "/images/santorini.jpg", alt: "Blue-domed churches and whitewashed houses above the Aegean in Santorini", tagline: "Island life, timeless blue", description: "Whitewashed lanes, blue-domed churches and unhurried evenings above the Aegean. Find your own little corner of the Greek islands.", flight: "≈ 5h 30m", season: "May – Oct", iso: "GRC", map: { x: 570.6, y: 147.5, dx: -46, dy: 22 } },
  { id: "paris", name: "Paris", country: "France", region: "Europe", image: "/images/paris.png", alt: "A café terrace beside the Seine at sunset with the Eiffel Tower beyond", tagline: "Culture, cafés, golden light", description: "Riverside terraces, neighbourhood bistros and evenings that glow. Paris at your own pace, with the little details taken care of.", flight: "≈ 7h 30m", season: "Apr – Jun · Sep – Oct", iso: "FRA", map: { x: 506.5, y: 109.7, dx: -10, dy: -16 } },
  { id: "dolomites", name: "Dolomites", country: "Italy", region: "Europe", image: "/images/lake.jpg", alt: "A wooden boat on a still alpine lake beneath the Dolomites", tagline: "Mountains, lakes, freedom", description: "Still lakes beneath dramatic peaks. Take the scenic route through alpine villages and the quiet pleasures of northern Italy.", flight: "≈ 6h", season: "Jun – Sep", iso: "ITA", map: { x: 532.9, y: 117.1, dx: 14, dy: -26 } },
  { id: "kenya", name: "Kenya", country: "East Africa", region: "Africa", image: "/images/kenya-safari.png", alt: "Travellers on a safari vehicle watching giraffes, with Nairobi and the coast beyond", tagline: "Wild hearts, wide horizons", description: "Follow the rhythm of the savannah. Acacia-lined horizons, remarkable wildlife and warm local welcomes, planned by people who know it by heart.", flight: "≈ 5h", season: "Jul – Oct · Jan – Feb", iso: "KEN", map: { x: 600.5, y: 261.8, dx: 30, dy: -16 } },
  { id: "tanzania", name: "Tanzania", country: "East Africa", region: "Africa", image: "/images/tanzania.png", alt: "Elephants crossing the savannah beneath snow-capped Kilimanjaro at sunrise", tagline: "Kilimanjaro, Serengeti, Zanzibar", description: "From the great migration to the slopes of Kilimanjaro and the spice-scented shores of Zanzibar, every day brings a new horizon.", flight: "≈ 5h 30m", season: "Jun – Oct", iso: "TZA", map: { x: 604, y: 276, dx: 30, dy: 18 } },
  { id: "uganda", name: "Uganda", country: "East Africa", region: "Africa", image: "/images/uganda.png", alt: "Mountain gorillas resting on a forested hillside above a lake at dusk", tagline: "Gorillas, lakes, misty hills", description: "Misty forests, quiet lakes and the unforgettable hush of a gorilla encounter. Uganda rewards the curious traveller.", flight: "≈ 5h", season: "Jun – Sep · Dec – Feb", iso: "UGA", map: { x: 584, y: 259.5, dx: -38, dy: -4 } },
  { id: "maldives", name: "Maldives", country: "Indian Ocean", region: "Islands", image: "/images/maldives-villa.png", alt: "An overwater villa with a private pool facing a Maldivian sunset", tagline: "Barefoot days, nothing on the clock", description: "Trade your schedule for the tide. Turquoise lagoons, barefoot island days and a place to pause, reconnect and simply be.", flight: "≈ 4h 15m", season: "Nov – Apr", iso: "", map: { x: 703.4, y: 248.2, dx: 26, dy: 10 } },
  { id: "dubai", name: "Dubai", country: "United Arab Emirates", region: "Middle East", image: "/images/dubai-terrace.png", alt: "A traveller relaxing on a terrace overlooking the Dubai skyline at sunset", tagline: "Our home, your starting point", description: "A city of contrasts, from creekside neighbourhoods to bold new horizons. Our home in the UAE is the natural starting point for your next journey.", flight: "Home base", season: "Oct – Apr", iso: "ARE", map: { x: 653.5, y: 181.5, dx: 26, dy: -12 } },
  { id: "kyoto", name: "Kyoto", country: "Japan", region: "Asia", image: "/images/kyoto.jpg", alt: "A traditional lantern-lit lane leading to a pagoda in Kyoto", tagline: "Culture, harmony, discovery", description: "Lantern-lit lanes, quiet temple gardens and the small rituals of everyday life. A city with a story around every corner.", flight: "≈ 9h 45m", season: "Mar – May · Oct – Nov", iso: "JPN", map: { x: 877.1, y: 151.7, dx: -10, dy: 26 } },
];

export const hub = destinations.find(d => d.id === "dubai")!;

export const spotlights = [
  {
    id: "africa", index: "01", title: "East Africa", subtitle: "Kenya · Tanzania · Uganda", heading: ["Wild", "at heart"], side: ["Wider", "skies", "slower", "you"],
    copy: "Golden savannahs, ancient mountains and quiet forest trails. Our regional connections across East Africa mean every safari is shaped by people who live it.",
    script: "Same sky. A whole new you.",
    images: [
      { src: "/images/tanzania.png", alt: "Elephants beneath Kilimanjaro", caption: "The great outdoors" },
      { src: "/images/kenya-safari.png", alt: "A safari vehicle watching giraffes in Kenya", caption: "Safari mornings" },
      { src: "/images/uganda.png", alt: "Mountain gorillas above a lake in Uganda", caption: "Forest encounters" },
    ],
  },
  {
    id: "europe", index: "02", title: "Europe", subtitle: "Greece · France · Italy", heading: ["Timeless", "beauty"], side: ["Slower", "days", "brighter", "you"],
    copy: "Whitewashed villages, riverside cafés and alpine lakes that stay with you. Classic Europe, thoughtfully paced and personally planned.",
    script: "Same views. A different you.",
    images: [
      { src: "/images/santorini.jpg", alt: "Blue domes in Santorini", caption: "Explore iconic places" },
      { src: "/images/paris.png", alt: "A Paris café beside the Seine", caption: "Taste local life" },
      { src: "/images/lake.jpg", alt: "A boat on a Dolomites lake", caption: "Find your quiet" },
    ],
  },
  {
    id: "ocean", index: "03", title: "Ocean & Gulf", subtitle: "Maldives · Dubai", heading: ["Golden", "hours"], side: ["Warm", "water", "easy", "days"],
    copy: "Overwater villas, desert sunsets and skyline evenings, all a short hop from our home in the UAE. Escapes that feel far away, without the long journey.",
    script: "Nothing on the clock.",
    images: [
      { src: "/images/maldives-villa.png", alt: "An overwater villa at sunset in the Maldives", caption: "Barefoot luxury" },
      { src: "/images/dubai-terrace.png", alt: "Dubai skyline from a terrace", caption: "City evenings" },
      { src: "/images/maldives.jpg", alt: "Overwater villas in a turquoise lagoon", caption: "Turquoise lagoons" },
    ],
  },
];

export const services = [
  { id: "leisure", number: "01", label: "Leisure & holidays", title: "A little less everyday.", copy: "Slow mornings, new horizons and time for what you love. Escapes shaped entirely around you.", image: "/images/maldives-villa.png", alt: "An overwater villa at sunset", points: ["Tailor-made itineraries", "Honeymoons & family trips", "Handpicked stays"] },
  { id: "africa", number: "02", label: "Africa travel", title: "Into the wild, with people who know it.", copy: "Safaris, gorilla treks and coastal escapes across Kenya, Tanzania, Uganda and beyond.", image: "/images/kenya-safari.png", alt: "A safari vehicle watching giraffes", points: ["Private & small-group safaris", "Local guides & lodges", "Beach extensions"] },
  { id: "corporate", number: "03", label: "Corporate travel", title: "Go places. Do great things.", copy: "From a single meeting to a global team, we connect every detail so you can focus on what's next.", image: "/images/corporate.png", alt: "A business traveller in an airport lounge at sunset", points: ["Flights, stays & transfers", "Visa & travel support", "24/7 assistance"] },
  { id: "groups", number: "04", label: "Groups & MICE", title: "Better, together.", copy: "Shared adventures, incentives and events. Bring your people together; we'll bring the plans to life.", image: "/images/groups.png", alt: "A group of travellers walking through an airport", points: ["Conferences & events", "Incentive journeys", "One coordinated plan"] },
];
