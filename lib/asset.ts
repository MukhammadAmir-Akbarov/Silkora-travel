// Prefix a local `public/` asset path with the deployment base path.
//
// In a static export (GitHub Pages) next/image does NOT prepend `basePath` to
// local images, and the site is served under /<repo>/, so a raw "/hero/x.jpg"
// resolves to the domain root and 404s. This adds the prefix explicitly.
//
// On Vercel / local dev NEXT_PUBLIC_BASE_PATH is empty, so paths pass through
// unchanged. Remote URLs (http…) and non-absolute paths are left as-is.
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return base && path.startsWith("/") ? base + path : path;
}
