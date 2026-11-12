import type { storyRegions } from "./story-regions";

export type TravelRegionId = keyof typeof storyRegions;

/** Shared presentation and featured destinations for every regional travel map. */
export const travelRegionOrder: TravelRegionId[] = ["africa","europe","gulf","asia","americas"];

export const travelRegions: Record<TravelRegionId, { name: string; pin: [number, number]; countries: string[]; photo: string; photoAlt: string }> = {
  "africa": {
    "name": "Africa",
    "pin": [
      602,
      262
    ],
    "countries": [
      "South Africa",
      "Kenya",
      "Tanzania",
      "Morocco",
      "Egypt",
      "Mauritius",
      "Seychelles"
    ],
    "photo": "/images/library/nairobi-city.webp",
    "photoAlt": "Nairobi city centre above a green urban canopy"
  },
  "europe": {
    "name": "Europe",
    "pin": [
      566,
      143
    ],
    "countries": [
      "France",
      "Italy",
      "Switzerland",
      "Greece",
      "Spain",
      "United Kingdom"
    ],
    "photo": "/images/library/santorini-blue.webp",
    "photoAlt": "Blue-domed churches and whitewashed houses above the Aegean in Santorini"
  },
  "gulf": {
    "name": "Middle East",
    "pin": [
      654,
      181
    ],
    "countries": [
      "UAE",
      "Oman",
      "Qatar",
      "Saudi Arabia",
      "Jordan"
    ],
    "photo": "/images/library/dubai-panorama.webp",
    "photoAlt": "Dubai skyline and the Burj Khalifa in clear daylight"
  },
  "asia": {
    "name": "Asia & Pacific",
    "pin": [
      877,
      152
    ],
    "countries": [
      "Japan",
      "Thailand",
      "Singapore",
      "Indonesia",
      "Maldives",
      "Australia",
      "New Zealand"
    ],
    "photo": "/images/library/kyoto-garden.webp",
    "photoAlt": "Kyoto Golden Pavilion among green trees beside its garden pond"
  },
  "americas": {
    "name": "The Americas",
    "pin": [
      222,
      116
    ],
    "countries": [
      "USA",
      "Canada",
      "Mexico",
      "Brazil",
      "Peru",
      "Argentina"
    ],
    "photo": "/images/library/canada-lake.webp",
    "photoAlt": "Turquoise water and pine forest beneath rugged Canadian mountain peaks"
  }
};
