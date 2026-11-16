import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only: some iPhone Safari builds accept AVIF then fail to decode it (blue ? icon).
    formats: ["image/webp"],
    qualities: [75, 90],
    // Phone-first widths. Cap at 1600 so mobiles don't pick a 1920px file.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wwtravels.net",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.wwtravels.net",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
  },
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/:path*.mp4", headers: cache },
      { source: "/:path*.webm", headers: cache },
      { source: "/images/:path*", headers: cache },
      { source: "/_next/image", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
