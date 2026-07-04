import Image, { type ImageProps } from "next/image";
import { asset } from "@/lib/asset";

// Drop-in replacement for next/image that prefixes local `public/` sources with
// the deployment base path. Needed for the GitHub Pages static export, where
// next/image emits "/hero/x.jpg" and 404s under /Silkora-travel/. Remote URLs
// and imported StaticImport sources are passed through untouched. Safe in both
// server and client components (no client-only APIs).
export function PublicImage({ src, ...props }: ImageProps) {
  return <Image src={typeof src === "string" ? asset(src) : src} {...props} />;
}
