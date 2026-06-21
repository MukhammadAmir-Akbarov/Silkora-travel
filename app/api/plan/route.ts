import Anthropic from "@anthropic-ai/sdk";
import {
  buildSystemPrompt,
  buildUserPrompt,
  type PlannerInput,
} from "@/lib/prompts";
import { demoItinerary } from "@/lib/demo-itinerary";
import { clientIp, rateLimited } from "@/lib/rate-limit";
import { streamErrorFallback } from "@/lib/server-messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOCALES = ["ru", "en", "uz"] as const;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const MAX_BODY_BYTES = 16_384;

// Daily live-generation cap (cost kill-switch). Beyond it, serve demo mode
// so the site keeps working without running up the Claude bill.
const DAILY_LIMIT = Number(process.env.PLAN_DAILY_LIMIT || 500);
let dayKey = "";
let dayCount = 0;
function liveAllowed(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayCount = 0;
  }
  if (dayCount >= DAILY_LIMIT) return false;
  dayCount++;
  return true;
}

function streamText(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Chunk by words for a pleasant typing effect.
      const parts = text.match(/\S+\s*/g) ?? [text];
      for (const part of parts) {
        controller.enqueue(encoder.encode(part));
        await new Promise((r) => setTimeout(r, 12));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Silkora-Mode": "demo",
    },
  });
}

export async function POST(req: Request) {
  if (rateLimited(`plan:${clientIp(req)}`, 8, 60_000)) {
    return new Response("Too many requests", { status: 429 });
  }

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) {
    return new Response("Payload too large", { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const locale = (
    LOCALES.includes(body.locale as (typeof LOCALES)[number])
      ? body.locale
      : "ru"
  ) as PlannerInput["locale"];

  const input: PlannerInput = {
    locale,
    destination:
      typeof body.destination === "string"
        ? body.destination.slice(0, 120)
        : undefined,
    interests: Array.isArray(body.interests)
      ? body.interests.slice(0, 10).map((x) => String(x).slice(0, 40))
      : undefined,
    budget: typeof body.budget === "string" ? body.budget.slice(0, 40) : undefined,
    durationDays: Number.isFinite(Number(body.durationDays))
      ? Math.min(Math.max(Number(body.durationDays), 1), 21)
      : 5,
    travelers: Number.isFinite(Number(body.travelers))
      ? Math.min(Math.max(Number(body.travelers), 1), 20)
      : 2,
    pace: typeof body.pace === "string" ? body.pace.slice(0, 40) : undefined,
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Demo mode — no key configured, or daily live cap reached (cost guard).
  if (!apiKey || !liveAllowed()) {
    return streamText(demoItinerary(input));
  }

  try {
    const client = new Anthropic({ apiKey });
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const events = await client.messages.create({
            model: MODEL,
            max_tokens: 2200,
            system: buildSystemPrompt(locale),
            messages: [{ role: "user", content: buildUserPrompt(input) }],
            stream: true,
          });
          for await (const event of events) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          console.error("Anthropic stream error:", err);
          controller.enqueue(
            encoder.encode("\n\n⚠️ " + streamErrorFallback[locale]),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Silkora-Mode": "live",
      },
    });
  } catch (err) {
    console.error("Planner setup error:", err);
    return new Response("Planner error", { status: 500 });
  }
}
