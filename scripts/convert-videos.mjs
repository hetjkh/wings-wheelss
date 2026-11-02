import { spawn } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "public");

function filesIn(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesIn(filename));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".mp4")) files.push(filename);
  }
  return files;
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "inherit", "inherit"] });
    child.on("error", reject);
    child.on("close", code => code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)));
  });
}

const videos = filesIn(root);
let index = 0;
const workers = Array.from({ length: 2 }, async () => {
  while (index < videos.length) {
    const source = videos[index++];
    const output = source.replace(/\.mp4$/i, ".webm");
    const before = statSync(source).size;
    console.log(`\nEncoding ${path.relative(root, source)}`);
    await run("ffmpeg", [
      "-y", "-i", source,
      "-an",
      "-vf", "scale='min(1920,iw)':-2,format=yuv420p",
      "-c:v", "libvpx-vp9",
      "-b:v", "0", "-crf", "40",
      "-row-mt", "1", "-cpu-used", "4", "-deadline", "good",
      "-tile-columns", "2",
      output,
    ]);
    const after = statSync(output).size;
    console.log(`${path.basename(source)}: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB WebM`);
  }
});

await Promise.all(workers);
