import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import { TOUR_SLUGS } from "@/lib/tours";
import { POST_SLUGS } from "@/lib/blog";

// Rendered at build time — required for the static export (GitHub Pages) build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/tours",
    ...TOUR_SLUGS.map((s) => `/tours/${s}`),
    "/visa",
    "/blog",
    ...POST_SLUGS.map((s) => `/blog/${s}`),
  ];
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${site.url}/${l}${path}`]),
    );
    for (const locale of routing.locales) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? (locale === routing.defaultLocale ? 1 : 0.8) : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
