import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;
