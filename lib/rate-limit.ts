// Tiny best-effort in-memory rate limiter with bounded memory.
// Per server instance only (fine for light abuse protection; use a shared
// store like Upstash/Redis if you need cross-instance guarantees).
const buckets = new Map<string, number[]>();
const MAX_KEYS = 5000;

export function clientIp(req: Request): string {
  // x-real-ip is set by most platforms (Vercel, NGINX) to the true client IP
  // and is not client-spoofable there. Fall back to XFF for local/dev.
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return "anon";
}

export function rateLimited(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  // Opportunistic eviction so the map can't grow unbounded.
  if (buckets.size > MAX_KEYS) buckets.clear();
  const arr = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  buckets.set(key, arr);
  return arr.length > limit;
}
