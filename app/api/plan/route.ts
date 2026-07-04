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
const MAX_BODY_BYTES = 16_384;
const MAX_TOKENS = 2200;

// --- Provider selection -----------------------------------------------------
// The planner can run on several backends. Pick via AI_PROVIDER, or it is
// inferred from whichever key/URL is configured:
//   • ollama    — free, local (http://localhost:11434). Great for dev.
//   • groq      — free cloud key (groq.com). Works on the deployed site.
//   • anthropic — Claude (paid).
//   • demo      — no AI; serves a canned sample itinerary.
type Provider = "ollama" | "groq" | "anthropic" | "demo";

function resolveProvider(): Provider {
  const explicit = (process.env.AI_PROVIDER || "").toLowerCase();
  if (
    explicit === "ollama" ||
    explicit === "groq" ||
    explicit === "anthropic" ||
    explicit === "demo"
  ) {
    return explicit;
  }
  if (process.env.GROQ_API_KEY) return "groq";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OLLAMA_BASE_URL) return "ollama";
  return "demo";
}

// Daily live-generation cap (cost kill-switch) for paid/cloud providers.
// Local Ollama is free, so it is exempt.
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

function liveResponse(stream: ReadableStream): Response {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Silkora-Mode": "live",
    },
  });
}

// --- Anthropic (Claude) -----------------------------------------------------
function anthropicStream(
  input: PlannerInput,
  locale: PlannerInput["locale"],
): ReadableStream {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        const events = await client.messages.create({
          model,
          max_tokens: MAX_TOKENS,
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
        controller.enqueue(encoder.encode("\n\n⚠️ " + streamErrorFallback[locale]));
      } finally {
        controller.close();
      }
    },
  });
}

// --- OpenAI-compatible providers (Groq, Ollama) -----------------------------
// Both expose POST {base}/chat/completions with SSE streaming, so one client
// serves both. Returns null if the upstream cannot be reached (→ demo fallback).
async function openAICompatStream(
  input: PlannerInput,
  locale: PlannerInput["locale"],
  cfg: { base: string; apiKey?: string; model: string; maxTokens: number },
): Promise<ReadableStream | null> {
  let upstream: Response;
  try {
    upstream = await fetch(`${cfg.base.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cfg.apiKey ? { Authorization: `Bearer ${cfg.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: cfg.model,
        max_tokens: cfg.maxTokens,
        temperature: 0.7,
        stream: true,
        messages: [
          { role: "system", content: buildSystemPrompt(locale) },
          { role: "user", content: buildUserPrompt(input) },
        ],
      }),
    });
  } catch (err) {
    console.error("AI upstream connect error:", err);
    return null;
  }

  if (!upstream.ok || !upstream.body) {
    console.error("AI upstream error:", upstream.status, await upstream.text().catch(() => ""));
    return null;
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  return new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          // SSE frames are separated by newlines; process complete lines.
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // Ignore keep-alive / partial frames.
            }
          }
        }
      } catch (err) {
        console.error("AI stream error:", err);
        controller.enqueue(encoder.encode("\n\n⚠️ " + streamErrorFallback[locale]));
      } finally {
        controller.close();
      }
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
    LOCALES.includes(body.locale as (typeof LOCALES)[number]) ? body.locale : "ru"
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

  const provider = resolveProvider();

  // Demo mode: no provider, or the daily live cap is hit (cloud cost guard;
  // local Ollama is free and therefore not capped).
  if (provider === "demo") {
    return streamText(demoItinerary(input));
  }
  if (provider !== "ollama" && !liveAllowed()) {
    return streamText(demoItinerary(input));
  }

  try {
    if (provider === "anthropic") {
      return liveResponse(anthropicStream(input, locale));
    }

    const cfg =
      provider === "groq"
        ? {
            base: process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1",
            apiKey: process.env.GROQ_API_KEY,
            model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            maxTokens: MAX_TOKENS,
          }
        : {
            base: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
            apiKey: undefined,
            model: process.env.OLLAMA_MODEL || "qwen2.5:7b",
            // Local models are slower per token — keep the plan tighter so the
            // first itinerary streams in a reasonable time.
            maxTokens: Number(process.env.OLLAMA_MAX_TOKENS || 1400),
          };

    const stream = await openAICompatStream(input, locale, cfg);
    // Upstream unreachable (e.g. Ollama not running) → keep the site working.
    if (!stream) return streamText(demoItinerary(input));
    return liveResponse(stream);
  } catch (err) {
    console.error("Planner setup error:", err);
    return new Response("Planner error", { status: 500 });
  }
}
