import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const imagesRoot = path.join(root, "public", "images");
const backupRoot = path.join(root, "public", "images-original");
const MAX_SIDE = 2400;
const WEBP_QUALITY = 85;
const raster = /\.(?:jpe?g|png|webp|avif|gif|tiff?)$/i;

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile() && raster.test(entry.name)) files.push(full);
  }
  return files;
}

async function ensureBackup(source) {
  const relative = path.relative(imagesRoot, source);
  const backup = path.join(backupRoot, relative);
  await fs.mkdir(path.dirname(backup), { recursive: true });
  try {
    await fs.copyFile(source, backup, fs.constants.COPYFILE_EXCL);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
  return backup;
}

async function optimizeFile(source) {
  // Read into memory first so Windows file locks from sharp input handles are avoided.
  const input = await fs.readFile(source);
  const meta = await sharp(input, { animated: true }).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const longest = Math.max(width, height);
  if (longest <= MAX_SIDE) return null;

  const backup = await ensureBackup(source);

  let pipeline = sharp(input, { animated: true, limitInputPixels: false }).rotate();
  pipeline = width >= height
    ? pipeline.resize({ width: MAX_SIDE, withoutEnlargement: true })
    : pipeline.resize({ height: MAX_SIDE, withoutEnlargement: true });

  // Keep the same path/extension so existing references keep working.
  const ext = path.extname(source).toLowerCase();
  let buffer;
  if (ext === ".png") {
    buffer = await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer({ resolveWithObject: true });
  } else if (ext === ".jpg" || ext === ".jpeg") {
    buffer = await pipeline.jpeg({ quality: WEBP_QUALITY, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  } else if (ext === ".webp") {
    buffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer({ resolveWithObject: true });
  } else {
    return { skipped: source, reason: `unsupported extension ${ext}` };
  }

  const temp = `${source}.${process.pid}.opt`;
  await fs.writeFile(temp, buffer.data);
  await fs.copyFile(temp, source);
  await fs.unlink(temp).catch(() => {});
  const beforeStat = await fs.stat(backup);
  return {
    path: path.relative(root, source).replaceAll("\\", "/"),
    from: `${width}x${height}`,
    to: `${buffer.info.width}x${buffer.info.height}`,
    beforeKB: Math.round(beforeStat.size / 1024),
    afterKB: Math.round(buffer.info.size / 1024),
  };
}

const files = await walk(imagesRoot);
const results = [];
for (const file of files) {
  const result = await optimizeFile(file);
  if (result) results.push(result);
}

console.log(`Optimized ${results.filter(r => !r.skipped).length} of ${files.length} images (max side ${MAX_SIDE}px).`);
for (const row of results) {
  if (row.skipped) {
    console.log(`  skip ${row.skipped}: ${row.reason}`);
    continue;
  }
  console.log(`  ${row.path}: ${row.from} → ${row.to} (${row.beforeKB}KB → ${row.afterKB}KB)`);
}
