import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Assets are already optimised (webp) – serve them as-is for pixel parity with the original.
    unoptimized: true,
  },
};

export default nextConfig;
