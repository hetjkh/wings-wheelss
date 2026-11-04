import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
// Original-footage cuts land on detected scene boundaries (25 fps).
// Each range is used once: no shot resumes after a Dubai insert.
const clips = [
  { file: "hero.mp4", start: 0, end: 6.04 },
  { file: "dubai.mp4", start: 120, end: 124 },
  { file: "hero.mp4", start: 6.04, end: 14 },
  { file: "dubai.mp4", start: 300, end: 304 },
  { file: "hero.mp4", start: 14, end: 21 },
  { file: "dubai.mp4", start: 776, end: 780 },
  { file: "hero.mp4", start: 21, end: 25.96 },
];
const dissolve = 0.4;
const inputs = clips.flatMap(({ file, start, end }) => [
  "-ss", String(start), "-t", (end - start).toFixed(2), "-i", `public/${file}`,
]);
const filters = clips.map((_, i) =>
  `[${i}:v]fps=25,settb=AVTB,setpts=PTS-STARTPTS,setsar=1,format=yuv420p,unsharp=5:5:0.22:5:5:0[v${i}]`
);
let duration = clips[0].end - clips[0].start;
let previous = "v0";
for (let i = 1; i < clips.length; i++) {
  filters.push(`[${previous}][v${i}]xfade=transition=fade:duration=${dissolve}:offset=${(duration - dissolve).toFixed(2)}[mix${i}]`);
  previous = `mix${i}`;
  duration += clips[i].end - clips[i].start - dissolve;
}
filters.push(`[${previous}]format=yuv420p[out]`);
const formats = [
  { extension: "mp4", args: ["-c:v", "libx264", "-preset", "slow", "-crf", "16", "-movflags", "+faststart"] },
  { extension: "webm", args: ["-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "24", "-deadline", "good", "-cpu-used", "3", "-row-mt", "1"] },
];
for (const { extension, args } of formats) {
  console.log(`Rendering ${duration.toFixed(2)}s continuous hero (${extension})`);
  const result = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "warning", "-y", "-filter_complex_threads", "2",
    ...inputs, "-filter_complex", filters.join(";"), "-map", "[out]", "-an",
    ...args, `public/hero-v4-continuous.${extension}`,
  ], { cwd: root, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
