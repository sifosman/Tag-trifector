import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Vercel deployment — avoids Pages Router Html conflict
  output: "standalone",

  // Strict mode
  reactStrictMode: true,

  // Image domains will be configured by Asif when real assets are added
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
