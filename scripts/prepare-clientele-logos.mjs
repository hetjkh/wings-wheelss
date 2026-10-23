import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Remove embedded blank margins so the existing brand artwork fills its display area.
// Keep the original files and their colours, lettering and proportions intact.
const root = path.resolve(import.meta.dirname, "..");
const directory = path.join(root, "public/brands/clientele");
await fs.mkdir(directory, { recursive: true });

for (let number = 1; number <= 10; number++) {
  const filename = `brand-${number}.webp`;
  const result = await sharp(path.join(root, "public/brands", filename))
    .trim({ threshold: 12 })
    .webp({ lossless: true })
    .toFile(path.join(directory, filename));
  // A native SVG colour key removes white at render time, including enclosed
  // white areas, while retaining the original logo artwork and alpha channel.
  const image = (await fs.readFile(path.join(directory, filename))).toString("base64");
  const transparent = `<svg xmlns="http://www.w3.org/2000/svg" width="${result.width}" height="${result.height}" viewBox="0 0 ${result.width} ${result.height}">
  <defs>
    <filter id="remove-white" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3" result="keyed"/>
      <feComposite in="keyed" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
  <image width="${result.width}" height="${result.height}" href="data:image/webp;base64,${image}" filter="url(#remove-white)"/>
</svg>\n`;
  await fs.writeFile(path.join(directory, `brand-${number}.svg`), transparent);
  console.log(`${filename}: ${result.width} × ${result.height}`);
}
