import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const generated = 'C:/Users/Admin/.codex/generated_images/01a1b3f1-38bc-7f62-93e9-c82e9406cd30';
const originals = path.join(root, 'assets/generated-closing');
const outputs = path.join(root, 'public/images/home');
await fs.mkdir(originals, { recursive: true });
await fs.mkdir(outputs, { recursive: true });
for (const [layout, source, width, height] of [
  ['desktop', 'exec-d4b2cf30-5a8e-4461-911c-d824e59734cc.png', 3840, 2160],
  ['mobile', 'exec-323db86c-4a46-4464-ade5-302965a6445f.png', 2160, 3840],
]) {
  const original = path.join(originals, 'departure-lounge-' + layout + '-original.png');
  try { await fs.copyFile(path.join(generated, source), original, fs.constants.COPYFILE_EXCL); }
  catch (error) { if (error.code !== 'EEXIST') throw error; }
  const output = path.join(outputs, 'departure-lounge-' + layout + '-v1.webp');
  const result = await sharp(original).resize(width, height, { fit: 'cover', kernel: 'lanczos3' }).webp({ quality: 94, effort: 6 }).toFile(output);
  console.log(JSON.stringify({ output, width: result.width, height: result.height, bytes: result.size }));
}
