import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

// Static export (for the GitHub Pages showcase) is opt-in via STATIC_EXPORT,
// set only by the Pages CI workflow. A normal `next build` keeps the full
// server app — API routes and the i18n proxy — so Vercel / self-hosting run
// unchanged. Project Pages live under /<repo>/, so a basePath is required.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray parent lockfile otherwise confuses Next).
  turbopack: { root: projectRoot },
  images: {
    // GitHub Pages has no image-optimization server → emit plain <img> tags.
    unoptimized: isStaticExport,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  ...(isStaticExport
    ? {
        output: "export",
        basePath: process.env.PAGES_BASE_PATH || undefined,
        trailingSlash: true,
      }
    : {}),
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
