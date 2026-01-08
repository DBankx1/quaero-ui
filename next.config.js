/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flynncompanies.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "immich.app",
        pathname: "/**",
      },
    ],
  },
};

export default config;
