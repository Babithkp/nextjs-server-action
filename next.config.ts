import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "babithkp.github.io",
      },
    ],
  },
};

export default nextConfig;
