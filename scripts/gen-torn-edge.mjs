import fs from "node:fs";

const w = 1600;
const h = 72;

function noise(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = noise(42);
const rand2 = noise(99);
const pts = [];

for (let x = 0; x <= w; x += 3) {
  const t = x / w;
  const base = 28 + Math.sin(t * Math.PI * 3.2) * 10 + Math.sin(t * Math.PI * 7.1) * 6;
  const mid = Math.sin(t * Math.PI * 13) * 4 + Math.sin(t * Math.PI * 21.5) * 2.5;
  const fine = (rand() - 0.5) * 5 + (rand2() - 0.5) * 2.2;
  let y = base + mid + fine;
  if (rand() < 0.035) y += (rand() - 0.2) * 14;
  y = Math.max(2, Math.min(h - 8, y));
  pts.push([x, Number(y.toFixed(2))]);
}

const top = pts.map(([x, y]) => `${x},${y}`).join(" ");
const poly = `0,${h} ${top} ${w},${h}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polygon fill="black" points="${poly}"/></svg>`;
fs.writeFileSync("public/images/journey/torn-edge.svg", svg);

const bottomPts = pts.map(([x, y]) => `${x},${(h - y).toFixed(2)}`);
const polyB = `0,0 ${bottomPts.join(" ")} ${w},0`;
const svgB = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polygon fill="black" points="${polyB}"/></svg>`;
fs.writeFileSync("public/images/journey/torn-edge-bottom.svg", svgB);

console.log("wrote torn edges", svg.length, svgB.length);
