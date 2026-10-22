# Selected image refresh from public/new

Reviewed all 48 supplied images and the sections across all 17 application routes. Selected 25 images for 11 public-facing pages, including the Dubai and Europe destination guides. Each selected photo has one page assignment; the destination guides reuse their respective photo in their own hero and enquiry section.

The selection reduces repeated airport, consultant, conference and skyline imagery while matching each photograph to its section. The six recently refined Travel services accordion photos and the generated Dubai trip panorama are preserved. Other imagery remains in place where it already fits or the new collection has no suitable geographic match.

## Placements

| Page | Section | WebP file in public/images/library |
| --- | --- | --- |
| `/` | Corporate travel panel | `home-corporate-team.webp` |
| `/` | Hotels service | `home-palm-suite.webp` |
| `/` | Travel support service | `home-personal-support.webp` |
| `/travel-services` | Groups and MICE travel reason | `services-event-planner.webp` |
| `/corporate-travel` | Hero | `corporate-executive-view.webp` |
| `/corporate-travel` | Meetings and events service | `corporate-boardroom.webp` |
| `/corporate-travel` | 15:00 team meeting | `corporate-team-meeting.webp` |
| `/corporate-travel` | 19:30 return flight | `corporate-airport-lounge.webp` |
| `/corporate-partnerships` | Partnership advantages | `partnership-rail-travel.webp` |
| `/corporate-partnerships` | How the partnership works | `partnership-boardroom.webp` |
| `/groups-mice` | Meetings format | `groups-meeting-room.webp` |
| `/groups-mice` | Incentive travel format | `groups-desert-incentive.webp` |
| `/groups-mice` | Hero | `groups-gala.webp` |
| `/groups-mice` | Closing invitation | `groups-rooftop.webp` |
| `/franchise` | Corporate travel offering | `franchise-travel-booking.webp` |
| `/franchise` | Groups and MICE offering | `franchise-group-meeting.webp` |
| `/franchise` | Entrepreneur audience | `franchise-business-lunch.webp` |
| `/africa` | Groups travel purpose | `africa-safari-lodge.webp` |
| `/africa` | Safari travel purpose | `africa-wildlife-drive.webp` |
| `/destinations` | Culture and discovery mood | `destinations-rome.webp` |
| `/destinations` | April to June season | `destinations-spring-tulips.webp` |
| `/destinations` | Europe featured postcard | `destinations-venice.webp` |
| `/destinations/europe` | Destination hero and enquiry | `europe-lake-como.webp` |
| `/destinations/dubai-uae` | Destination hero and enquiry | `dubai-waterfront.webp` |
| `/about` | Business audience | `about-business-traveller.webp` |

## Assets and framing

Originals remain in `public/new/`. Selected images are converted to WebP at their original resolution with quality 90. `assets/site-images.json` records each original filename and alt text; `app/components/image-dimensions.json` records intrinsic sizes for the existing responsive image component. The existing `scripts/prepare-site-images.mjs` can regenerate these images from the manifest.

The Corporate Travel and Groups & MICE heroes now use their dedicated photos instead of the common opening video. Other page structure and interaction behavior are retained. The executive hero uses a 46% horizontal focal point, and the home support image uses 56%, to preserve the people in narrow mobile crops.

## Validation

- TypeScript: `node node_modules/typescript/bin/tsc --noEmit --incremental false`.
- Browser: all 17 routes render at 1440px and 390px, all assigned images load, and no horizontal overflow or uncaught runtime errors were observed.
- Inspected desktop and mobile screenshots, including active corporate service, culture, seasonal and franchise panels.
- Verified the new home hotel and support photos in the animated desktop service deck.
- Confirmed the 25 references, source files and registered image dimensions; all six existing service accordion photos are preserved.

