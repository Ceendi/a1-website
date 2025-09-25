import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      new URL("https://stunning-chickens-ea7a4ffd2a.media.strapiapp.com/**"),
    ],
  },
};

export default nextConfig;
