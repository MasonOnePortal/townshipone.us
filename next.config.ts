import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    // Disable linting errors during build process
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "masonone.us", // Remove the port here
      },
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.ignoreWarnings = [/CssSyntaxError/];
    }
    return config;
  },
};

export default nextConfig;
