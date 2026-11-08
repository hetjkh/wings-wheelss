# Story-map regions

`story-region-membership.json` records the countries assigned to each story-map region. The generated SVG paths use the same projection and lightweight country outlines as the site's existing world map, with Natural Earth metadata determining geographic membership. Detailed outlines are used only for small islands missing from the overview map.

Regenerate with `node scripts/generate-story-regions.mjs` to download the public sources, or pass local Natural Earth and world-map GeoJSON files as the first two arguments.

The six UI regions are Middle East, Africa, Europe, Asia & Pacific, Indian Ocean, and The Americas. Russia is divided at 60°E for this decorative regional map. France's overseas polygons are placed geographically. Indian Ocean stories use their own island group and an open-water highlight; mainland country shapes remain above its hover target, and its photo is masked away from mainland Africa, Asia, and Australia.
