import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const source = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson";
const data = process.argv[2] ? JSON.parse(await fs.readFile(process.argv[2], "utf8")) : await (await fetch(source)).json();
const outlineSource = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";
const outlines = process.argv[3] ? JSON.parse(await fs.readFile(process.argv[3], "utf8")) : await (await fetch(outlineSource)).json();
const keys = ["africa", "europe", "gulf", "asia", "americas"];
const regions = Object.fromEntries(keys.map(key => [key, []]));
const members = Object.fromEntries(keys.map(key => [key, new Set()]));
const land = [];
const africaIslands = new Set(["Mauritius", "Seychelles", "Comoros", "Reunion"]);
const asiaIslands = new Set(["Maldives", "Sri Lanka"]);
const middleEast = new Set(["United Arab Emirates", "Saudi Arabia", "Oman", "Yemen", "Qatar", "Bahrain", "Kuwait", "Iraq", "Iran", "Jordan", "Lebanon", "Syria", "Israel", "Palestine", "Turkey", "Northern Cyprus", "Cyprus"]);
const normalize = value => String(value ?? "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const aliases = { "French Guiana": "France", Macedonia: "North Macedonia", Swaziland: "eSwatini", "West Bank": "Palestine" };
// Reuse the site's lightweight world-map outlines; use detailed geometry only for tiny islands.
const features = outlines.features.map(feature => {
  const name = aliases[feature.properties.name] ?? feature.properties.name;
  const match = data.features.find(f => ["ADMIN", "NAME", "NAME_LONG", "FORMAL_EN"].some(key => normalize(f.properties[key]) === normalize(name)));
  if (!match) throw new Error(`Missing geographic metadata: ${name}`);
  return { ...match, geometry: feature.geometry };
});
for (const feature of data.features) if ((africaIslands.has(feature.properties.ADMIN) || asiaIslands.has(feature.properties.ADMIN) || middleEast.has(feature.properties.ADMIN) || feature.properties.ADMIN === "Singapore") && !features.some(f => f.properties.ADMIN === feature.properties.ADMIN)) features.push(feature);
// Same equirectangular projection as public/images/world-map.svg.
const project = ([lon, lat]) => [(lon + 180) * 1000 / 360, (85 - lat) * 440 / 145];
const simplify = points => {
  if (points.length < 5) return points;
  const first = points[0], last = points.at(-1), dx = last[0] - first[0], dy = last[1] - first[1];
  let maximum = .18 ** 2, split = -1;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i], t = Math.max(0, Math.min(1, ((p[0] - first[0]) * dx + (p[1] - first[1]) * dy) / (dx * dx + dy * dy || 1)));
    const distance = (p[0] - first[0] - t * dx) ** 2 + (p[1] - first[1] - t * dy) ** 2;
    if (distance > maximum) { maximum = distance; split = i; }
  }
  return split < 0 ? [first, last] : [...simplify(points.slice(0, split + 1)).slice(0, -1), ...simplify(points.slice(split))];
};
const render = polygon => polygon.filter(ring => ring.length >= 4).map(ring => {
  const points = simplify(ring.map(project));
  const visible = points.length >= 4 ? points : ring.map(project);
  return visible.map(([x, y], i) => `${i ? "L" : "M"}${Number(x.toFixed(2))},${Number(y.toFixed(2))}`).join("") + "Z";
}).join("");
const add = (key, name, polygon) => {
  if (polygon[0]?.length < 4) return;
  regions[key].push({ d: render(polygon), points: polygon[0].map(project) });
  members[key].add(name);
};

for (const feature of features) {
  const p = feature.properties, name = p.ADMIN;
  if (p.CONTINENT === "Antarctica") continue;
  const polygons = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  for (const polygon of polygons) {
    if (!polygon[0]?.some(point => point[1] > -60)) continue;
    land.push(render(polygon));
    const lon = polygon[0].reduce((s, point) => s + point[0], 0) / polygon[0].length;
    const lat = polygon[0].reduce((s, point) => s + point[1], 0) / polygon[0].length;
    if (africaIslands.has(name) || africaIslands.has(p.NAME)) { add("africa", name, polygon); continue; }
    if (asiaIslands.has(name) || asiaIslands.has(p.NAME)) { add("asia", name, polygon); continue; }
    if (middleEast.has(name) || middleEast.has(p.NAME)) { add("gulf", name, polygon); continue; }
    // Locate France's overseas polygons geographically rather than highlighting them with Europe.
    if (name === "France" && (lon < -25 || lon > 60 || lat < 25)) {
      add(lon < -25 ? "americas" : lon > 100 ? "asia" : "africa", name, polygon);
      continue;
    }
    // Keep country outlines intact, including transcontinental countries.
    // A longitude cut creates a visible artificial border through the landmass.
    const continent = p.CONTINENT;
    const key = continent === "Africa" ? "africa" : continent === "Europe" ? "europe"
      : continent === "North America" || continent === "South America" ? "americas"
      : continent === "Asia" || continent === "Oceania" ? "asia"
      : p.REGION_UN === "Africa" ? "africa" : p.REGION_UN === "Americas" ? "americas"
      : p.REGION_UN === "Europe" ? "europe" : "asia";
    add(key, name, polygon);
  }
}

const output = {};
for (const key of keys) {
  const points = regions[key].flatMap(region => region.points);
  let left = Math.floor(Math.min(...points.map(p => p[0]))), top = Math.floor(Math.min(...points.map(p => p[1])));
  let right = Math.ceil(Math.max(...points.map(p => p[0]))), bottom = Math.ceil(Math.max(...points.map(p => p[1])));
  output[key] = { box: [left, top, right - left, bottom - top], d: regions[key].map(r => r.d).join("") };
}
await fs.writeFile(path.join(root, "app/components/story-regions.ts"),
  `// Generated by scripts/generate-story-regions.mjs from Natural Earth country boundaries.\nexport const storyRegions = ${JSON.stringify(output, null, 2)} as const;\n\nexport const storyLand = ${JSON.stringify(land.join(""))};\n`);
await fs.mkdir(path.join(root, "assets/maps"), { recursive: true });
await fs.writeFile(path.join(root, "assets/maps/story-region-membership.json"), JSON.stringify({ source, outlineSource, projection: "x=(longitude+180)*1000/360; y=(85-latitude)*440/145", regions: Object.fromEntries(keys.map(key => [key, [...members[key]].sort()])) }, null, 2) + "\n");
console.log(Object.fromEntries(keys.map(key => [key, { countries: members[key].size, pathBytes: output[key].d.length }])));
