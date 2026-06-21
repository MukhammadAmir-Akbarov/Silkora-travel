import { deliverLead, type Lead } from "@/lib/leads";
import { clientIp, rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32_768;

export async function POST(req: Request) {
  // Stricter than /api/plan: a contact form should not fire many times.
  if (rateLimited(`lead:${clientIp(req)}`, 5, 10 * 60_000)) {
    return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const str = (v: unknown, max = 500) =>
    typeof v === "string" ? v.slice(0, max) : undefined;

  // Honeypot: bots fill hidden "company" field.
  if (str(body.company)) {
    return Response.json({ ok: true });
  }

  const lead: Lead = {
    name: str(body.name, 120),
    phone: str(body.phone, 60),
    destination: str(body.destination, 160),
    dates: str(body.dates, 60),
    travelers: str(body.travelers, 40),
    budget: str(body.budget, 60),
    message: str(body.message, 2000),
    itinerary: str(body.itinerary, 6000),
    locale: str(body.locale, 5),
    source: str(body.source, 30) || "contact",
  };

  if (!lead.name && !lead.phone && !lead.message) {
    return Response.json(
      { ok: false, error: "Empty submission" },
      { status: 400 },
    );
  }

  try {
    const { channel } = await deliverLead(lead);
    return Response.json({ ok: true, channel });
  } catch (err) {
    console.error("Lead delivery error:", err);
    return Response.json(
      { ok: false, error: "Delivery failed" },
      { status: 502 },
    );
  }
}
