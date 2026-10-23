# Website image formats

All 156 published raster images use WebP. This includes photographs, client logos, payment-provider logos and video posters. Next.js is explicitly configured to serve WebP through its image optimizer.

The 18 remaining PNG/JPEG files were converted without resizing. Their combined size decreased from 4,410,429 to 2,355,344 bytes (47%). Logos use lossless compression and retain transparency; photographs and posters use quality 92. The existing 138 WebP images were retained without another compression pass.

The original files are preserved in `assets/webp-originals/`, outside the public website. SVG maps, CSS masks and textures remain vectors. The browser favicon remains ICO.

To prepare the additional public images and update their dimensions:

```sh
npm run images:webp
```

The script also archives and converts new PNG/JPEG raster files added to `public/`. Update their component references to the resulting `.webp` URLs. To rebuild the complete photograph library and these additional images, run `node scripts/prepare-site-images.mjs`.
