import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local /public/heroes images via next/image
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
