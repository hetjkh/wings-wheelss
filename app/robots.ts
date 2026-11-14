import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/logo"],
    },
    sitemap: "https://wings-wheelss.vercel.app/sitemap.xml",
  };
}
