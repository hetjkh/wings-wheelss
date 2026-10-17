The site uses 64 selected photographs: 45 from the supplied asset library, nine active generated images, and ten existing specialist images retained for relevant business and Africa sections.

`assets/site-images.json` records each published image's original source and description. Generated originals are in `assets/generated/`. The original generation prompts are in `assets/generated/prompts.json`; the sharper portrait replacement prompts are in `assets/generated/sharpness-prompts.json`. All were generated using the built-in imagegen tool. Earlier originals are preserved.

| Generated image | Intended subject |
| --- | --- |
| business-hotel.png | Business accommodation |
| airport-transfer.png | Chauffeur and airport transfers |
| conference.png | Meetings and conferences |
| exhibition.png | Trade exhibitions and delegates |
| travel-support-v2.png | Portrait composition for the team and travel support panels |
| business-terminal-v2.png | Portrait composition for corporate airport travel |
| travel-planning-v2.png | Portrait composition for itinerary planning cards |
| nairobi-city.png | Nairobi city and business travel |
| zanzibar.png | Zanzibar beach itinerary |

Destination choices follow the photographed subject rather than the gallery folder name. In particular, Australian scenes in the `winter/austria` folder are not labelled as Austria, and Zanzibar has its own image rather than a Maldives resort. The destination seasons use distinct winter, spring, island and summer imagery. Alt text and focal positions were updated alongside the image references.

Published images are in `public/images/library/`. Regenerate them with:

```sh
node scripts/prepare-site-images.mjs
```

The preparation script preserves aspect ratios, applies EXIF orientation, avoids upscaling, and exports WebP at quality 94 with a maximum edge of 3840 pixels. Selected derivatives total about 65 MB, while Next.js serves smaller responsive sizes at quality 90. The original asset library is preserved.

`app/components/travel-image.tsx` wraps Next.js Image for photographs. A ResizeObserver measures the rendered box and accounts for the source aspect ratio when selecting the download width. For example, a 2.25:1 source filling a 950 × 1230 panel needs approximately 2770 pixels of source width at 1× density; a 1080-pixel download is visibly enlarged. The wrapper also leaves headroom for the existing hover and parallax zoom. Next.js selects the final source-set candidate for the device's pixel density. Generated source dimensions are recorded in `app/components/image-dimensions.json` by the preparation script.

The airport, support and planning replacements have new URLs to avoid reusing cached versions. The small-screen Africa corridor backgrounds are arranged vertically to avoid stretching landscape photographs over the full height of narrow columns.

Validation: production build passed; ESLint for `app`, `scripts` and `next.config.ts` passed with one existing unused-import warning in `home-editorial-motion.ts`. Browser checks covered nine pages at 1920 × 1080 with 1× density and 390 × 844 with 2× density. All audited photographs loaded, with no undersized download requests and no runtime exceptions. Native source resolution still determines the maximum detail available; the pipeline does not invent detail by upscaling. Comparison screenshots and sampling reports are saved locally under `.preview/`.
