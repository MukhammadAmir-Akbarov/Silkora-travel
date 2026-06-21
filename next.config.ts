import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray parent lockfile otherwise confuses Next).
  turbopack: { root: projectRoot },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
