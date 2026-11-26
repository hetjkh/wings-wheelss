import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [64, 128, 256, 384],
    // 78 supports photo quality={78}; 80 for heroes. Cap below former q=100.
    qualities: [60, 75, 78, 80],
    minimumCacheTTL: 31536000,
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
      { source: "/brands/:path*", headers: cache },
      { source: "/_next/static/:path*", headers: cache },
      { source: "/_next/image", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
