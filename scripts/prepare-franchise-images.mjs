import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "assets/franchise-image-generation.json"), "utf8"));
const dimensionsPath = path.join(root, "app/components/image-dimensions.json");
const dimensions = JSON.parse(await fs.readFile(dimensionsPath, "utf8"));
for (const asset of manifest.assets) {
  const original = path.join(root, "assets/webp-originals/images/library", `${asset.name}.png`);
  await fs.mkdir(path.dirname(original), { recursive: true });
  await fs.copyFile(asset.source, original);
  const url = `/images/library/${asset.name}.webp`;
  const result = await sharp(original).webp({ quality: 94, effort: 6 }).toFile(path.join(root, "public", url));
  dimensions[url] = [result.width, result.height];
  console.log(`${asset.name}: ${result.width} x ${result.height}, ${result.size} bytes`);
}
await fs.writeFile(dimensionsPath, `${JSON.stringify(dimensions, null, 2)}\n`);
