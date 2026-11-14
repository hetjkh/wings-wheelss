import { spawn } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "public");

/** Masters that need a lighter `.mobile` pair for phones. */
const targets = [
  "hero-v4-continuous.mp4",
  "franchise-hero-markets.mp4",
  "videos/dubai-services-20.mp4",
  "videos/dubai-skyline.mp4",
  ...readdirSync(path.join(root, "videos"))
    .filter(name => /1080p\.mp4$/i.test(name))
    .map(name => path.join("videos", name)),
];

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "inherit", "inherit"] });
    child.on("error", reject);
    child.on("close", code => code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)));
  });
}

for (const relative of targets) {
  const source = path.join(root, relative);
  if (!existsSync(source) || /\.mobile\.mp4$/i.test(source)) {
    if (!existsSync(source)) console.warn(`Skip missing ${relative}`);
    continue;
  }
  const base = source.replace(/\.mp4$/i, "");
  const outMp4 = `${base}.mobile.mp4`;
  const outWebm = `${base}.mobile.webm`;
  if (existsSync(outMp4) && existsSync(outWebm)) {
    console.log(`Skip existing ${path.basename(outMp4)}`);
    continue;
  }
  const before = statSync(source).size;

  console.log(`\nMobile encode ${relative}`);
  await run("ffmpeg", [
    "-y", "-i", source,
    "-an",
    "-vf", "scale='min(854,iw)':-2,format=yuv420p",
    "-c:v", "libx264",
    "-crf", "30",
    "-preset", "medium",
    "-movflags", "+faststart",
    outMp4,
  ]);
  await run("ffmpeg", [
    "-y", "-i", outMp4,
    "-an",
    "-c:v", "libvpx-vp9",
    "-b:v", "0", "-crf", "38",
    "-row-mt", "1", "-cpu-used", "4", "-deadline", "good",
    outWebm,
  ]);

  console.log(
    `${path.basename(outMp4)}: source ${(before / 1048576).toFixed(1)} MB → `
    + `${(statSync(outMp4).size / 1048576).toFixed(1)} MB mp4 / `
    + `${(statSync(outWebm).size / 1048576).toFixed(1)} MB webm`,
  );
}
