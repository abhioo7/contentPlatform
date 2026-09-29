import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Webpack for the production build (Turbopack has a native-binding
  // resolution issue with @tailwindcss/oxide in some npm install layouts).
  turbopack: undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
