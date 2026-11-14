import type { MetadataRoute } from "next";

const base = "https://wings-wheelss.vercel.app";

const routes = [
  "/",
  "/about",
  "/travel-services",
  "/destinations",
  "/africa",
  "/corporate-travel",
  "/corporate-partnerships",
  "/groups-mice",
  "/franchise",
  "/contact",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(path => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
