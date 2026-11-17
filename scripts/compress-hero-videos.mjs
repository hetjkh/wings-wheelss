import { spawn } from "node:child_process";
import { renameSync, statSync, unlinkSync, existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "public");

/** Re-encode looping heroes at sharp 1080p H.264 + VP9 without changing URLs. */
const targets = [
  "hero-v4-continuous.mp4",
  "franchise-hero-markets.mp4",
  "videos/dubai-services-20.mp4",
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
  if (!existsSync(source)) {
    console.warn(`Skip missing ${relative}`);
    continue;
  }
  const before = statSync(source).size;
  const tmpMp4 = `${source}.tmp.mp4`;
  const webm = source.replace(/\.mp4$/i, ".webm");
  const tmpWebm = `${webm}.tmp.webm`;

  console.log(`\nCompressing ${relative} (${(before / 1048576).toFixed(1)} MB)`);
  await run("ffmpeg", [
    "-y", "-i", source,
    "-an",
    "-vf", "scale='min(1920,iw)':-2,format=yuv420p",
    "-c:v", "libx264",
    "-crf", "18",
    "-preset", "slow",
    "-movflags", "+faststart",
    tmpMp4,
  ]);
  await run("ffmpeg", [
    "-y", "-i", tmpMp4,
    "-an",
    "-c:v", "libvpx-vp9",
    "-b:v", "0", "-crf", "28",
    "-row-mt", "1", "-cpu-used", "2", "-deadline", "good",
    "-tile-columns", "2",
    tmpWebm,
  ]);

  renameSync(tmpMp4, source);
  if (existsSync(webm)) unlinkSync(webm);
  renameSync(tmpWebm, webm);

  console.log(
    `${path.basename(source)}: ${(before / 1048576).toFixed(1)} MB → `
    + `${(statSync(source).size / 1048576).toFixed(1)} MB mp4 / `
    + `${(statSync(webm).size / 1048576).toFixed(1)} MB webm`,
  );
}
