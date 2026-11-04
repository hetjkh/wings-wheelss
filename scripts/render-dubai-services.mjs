import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cwd = fileURLToPath(new URL("../", import.meta.url));
// Four uninterrupted Dubai views, with 0.4s dissolves: exactly 20 seconds.
const starts = [300, 120, 784, 776];
const filters = starts.map((_, i) => `[${i}:v]fps=30,settb=AVTB,setpts=PTS-STARTPTS,setsar=1,format=yuv420p[v${i}]`);
filters.push("[v0][v1]xfade=transition=fade:duration=0.4:offset=4.9[m1]",
  "[m1][v2]xfade=transition=fade:duration=0.4:offset=9.8[m2]",
  "[m2][v3]xfade=transition=fade:duration=0.4:offset=14.7,format=yuv420p[out]");
function run(args) {
  const result = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "warning", "-n", ...args], { cwd, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
for (const [extension, encoding] of [
  ["mp4", ["-c:v", "libx264", "-crf", "18", "-preset", "slow", "-movflags", "+faststart"]],
  ["webm", ["-c:v", "libvpx-vp9", "-crf", "26", "-b:v", "0", "-cpu-used", "3", "-row-mt", "1"]],
]) {
  console.log(`Rendering Dubai services film: ${extension}`);
  run(["-filter_complex_threads", "2", ...starts.flatMap(start => ["-ss", String(start), "-t", "5.3", "-i", "public/dubai.mp4"]),
    "-filter_complex", filters.join(";"), "-map", "[out]", "-an", "-t", "20", ...encoding, `public/videos/dubai-services-20.${extension}`]);
}
run(["-ss", "301", "-i", "public/dubai.mp4", "-frames:v", "1", "-c:v", "libwebp", "-quality", "88", "public/videos/dubai-services-20-poster.webp"]);
