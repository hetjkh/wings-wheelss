import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const publicRoot = path.join(root, "public");
const originalsRoot = path.join(root, "assets/webp-originals");
const raster = /\.(?:jpe?g|png|gif|avif|tiff?|bmp)$/i;

async function filesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(filename));
    else if (entry.isFile()) files.push(filename);
  }
  return files.sort();
}

// Retain originals outside public, and keep the site's raster URLs consistently WebP.
export async function preparePublicImages() {
  await fs.mkdir(originalsRoot, { recursive: true });
  for (const source of (await filesIn(publicRoot)).filter(file => raster.test(file))) {
    const original = path.join(originalsRoot, path.relative(publicRoot, source));
    await fs.mkdir(path.dirname(original), { recursive: true });
    try {
      await fs.copyFile(source, original, fs.constants.COPYFILE_EXCL);
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      if (!(await fs.readFile(source)).equals(await fs.readFile(original))) {
        throw new Error(`Original already exists with different contents: ${original}`);
      }
    }
  }

  const dimensions = {};
  let sourceBytes = 0;
  let webpBytes = 0;
  for (const source of (await filesIn(originalsRoot)).filter(file => raster.test(file))) {
    const relative = path.relative(originalsRoot, source).replaceAll(path.sep, "/");
    const outputUrl = `/${relative.replace(raster, ".webp")}`;
    const output = path.join(publicRoot, outputUrl);
    const logo = relative.startsWith("brands/") || /^images\/(Tabby|Tamara-En)\.png$/.test(relative);
    await fs.mkdir(path.dirname(output), { recursive: true });
    const result = await sharp(source, { animated: true })
      .rotate()
      .webp({ lossless: logo, quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(output);
    dimensions[outputUrl] = [result.width, result.pageHeight ?? result.height];
    sourceBytes += (await fs.stat(source)).size;
    webpBytes += result.size;

    // Remove only the archived source file, after its WebP has been written successfully.
    const previous = path.join(publicRoot, relative);
    try {
      if (!(await fs.readFile(previous)).equals(await fs.readFile(source))) {
        throw new Error(`Public image changed during conversion: ${previous}`);
      }
      await fs.unlink(previous);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  console.log(`Prepared ${Object.keys(dimensions).length} WebP images: ${sourceBytes.toLocaleString()} → ${webpBytes.toLocaleString()} bytes (${Math.round((1 - webpBytes / sourceBytes) * 100)}% smaller).`);
  return dimensions;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const filename = path.join(root, "app/components/image-dimensions.json");
  const dimensions = JSON.parse(await fs.readFile(filename, "utf8"));
  const converted = await preparePublicImages();
  for (const url of Object.keys(dimensions)) {
    if (raster.test(url) && converted[url.replace(raster, ".webp")]) delete dimensions[url];
  }
  await fs.writeFile(filename, `${JSON.stringify({ ...dimensions, ...converted }, null, 2)}\n`);
}
