import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: { qualities: [70, 72, 75, 82] },
};

export default nextConfig;
