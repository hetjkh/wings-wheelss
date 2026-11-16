import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const dimensionsPath = path.join(root, "app/components/image-dimensions.json");
const outPath = path.join(root, "app/components/image-previews.json");
const dimensions = JSON.parse(await fs.readFile(dimensionsPath, "utf8"));
const previews = {};

for (const src of Object.keys(dimensions)) {
  const file = path.join(root, "public", src.replace(/^\//, ""));
  try {
    const buffer = await sharp(file)
      .rotate()
      .resize({ width: 24, height: 24, fit: "inside" })
      .webp({ quality: 40, effort: 4 })
      .toBuffer();
    previews[src] = `data:image/webp;base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.warn(`skip ${src}: ${error.message}`);
  }
}

await fs.writeFile(outPath, `${JSON.stringify(previews, null, 2)}\n`);
console.log(`Wrote ${Object.keys(previews).length} blur previews to ${path.relative(root, outPath)}`);
