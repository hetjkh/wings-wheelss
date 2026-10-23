import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { preparePublicImages } from "./convert-public-images.mjs";

// Keep original photographs in assets; publish only web-sized derivatives.
const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "assets/site-images.json"), "utf8"));
await fs.mkdir(path.join(root, "public/images/library"), { recursive: true });
const dimensions = {};
for (const [name, image] of Object.entries(manifest)) {
  const result = await sharp(path.join(root, image.source))
    .rotate()
    .resize({ width: 3840, height: 3840, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 94, effort: 5 })
    .toFile(path.join(root, `public/images/library/${name}.webp`));
  dimensions[`/images/library/${name}.webp`] = [result.width, result.height];
}
Object.assign(dimensions, await preparePublicImages());
await fs.writeFile(path.join(root, "app/components/image-dimensions.json"), `${JSON.stringify(dimensions, null, 2)}\n`);
console.log(`Prepared ${Object.keys(manifest).length} optimized images.`);
