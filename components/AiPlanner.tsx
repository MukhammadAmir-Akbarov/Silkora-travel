"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Sparkles,
  Loader2,
  Send,
  RefreshCw,
  Plus,
  Minus,
  Check,
  Wand2,
  Download,
  ArrowRight,
} from "lucide-react";
import { SectionHeading, Sparkle } from "./ui/brand";
import { Button } from "./ui/Button";
import {
  INTEREST_KEYS,
  BUDGET_KEYS,
  PACE_KEYS,
  PLANNER_PRESETS,
} from "@/lib/constants";
import { site } from "@/lib/site";

type PlanConfig = {
  destination: string;
  interests: string[];
  budget: string;
  duration: number;
  travelers: number;
  pace: string;
};

function Stepper({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-full border border-gold/25 bg-ink px-2 py-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full text-gold hover:bg-gold/10"
        aria-label="decrease"
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-white">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full text-gold hover:bg-gold/10"
        aria-label="increase"
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (k: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-pressed={value === o.key}
          onClick={() => onChange(o.key)}
          className={`flex-1 rounded-full border px-3 py-2 text-xs font-medium transition-all ${
            value === o.key
              ? "border-gold bg-gold/15 text-gold"
              : "border-white/12 text-white/65 hover:border-gold/40"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// Shimmering placeholder shown while the first tokens stream in.
function ItinerarySkeleton() {
  return (
    <div aria-hidden>
      <div className="mb-6 h-6 w-2/3 rounded-full skeleton-shimmer" />
      {[0, 1, 2].map((d) => (
        <div key={d} className="mb-6">
          <div className="mb-3 h-4 w-32 rounded-full skeleton-shimmer" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded-full skeleton-shimmer" />
            <div className="h-3 w-[92%] rounded-full skeleton-shimmer" />
            <div className="h-3 w-[78%] rounded-full skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

const fieldLabel =
  "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold/80";

export function AiPlanner() {
  const t = useTranslations("planner");
  const locale = useLocale();

  const [destination, setDestination] = useState("");
  const [interests, setInterests] = useState<string[]>(["history"]);
  const [budget, setBudget] = useState<string>("comfort");
  const [duration, setDuration] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [pace, setPace] = useState<string>("balanced");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);
  const [mode, setMode] = useState<string | null>(null);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent">(
    "idle",
  );

  // Captures the parameters the current result was generated with, so the PDF
  // and the lead carry an accurate trip summary even after the form changes.
  const lastConfig = useRef<PlanConfig | null>(null);
  const itinRef = useRef<HTMLDivElement>(null);

  const toggleInterest = (k: string) =>
    setInterests((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k],
    );

  async function generate(cfg?: PlanConfig) {
    const c: PlanConfig = cfg ?? {
      destination,
      interests,
      budget,
      duration,
      travelers,
      pace,
    };
    lastConfig.current = c;
    setLoading(true);
    setError(false);
    setResult("");
    setMode(null);
    setSendState("idle");
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: c.destination,
          interests: c.interests.map((k) => t(`interestOpts.${k}`)),
          budget: t(`budgetOpts.${c.budget}`),
          durationDays: c.duration,
          travelers: c.travelers,
          pace: t(`paceOpts.${c.pace}`),
          locale,
        }),
      });
      if (!res.ok || !res.body) throw new Error("request failed");
      setMode(res.headers.get("X-Silkora-Mode"));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setResult(acc);
      }
      // Flush any bytes the streaming decoder buffered across chunk boundaries.
      const tail = decoder.decode();
      if (tail) setResult((acc += tail));
    } catch {
      setResult("");
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  // Fill the form from a preset and immediately generate — one click to value.
  function applyPreset(p: (typeof PLANNER_PRESETS)[number]) {
    const dest = t(`presets.${p.key}.destination`);
    setDestination(dest);
    setInterests(p.interests);
    setBudget(p.budget);
    setDuration(p.duration);
    setTravelers(p.travelers);
    setPace(p.pace);
    generate({
      destination: dest,
      interests: p.interests,
      budget: p.budget,
      duration: p.duration,
      travelers: p.travelers,
      pace: p.pace,
    });
    document.getElementById("ai")?.scrollIntoView({ behavior: "smooth" });
  }

  async function sendToManager() {
    setSendState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "planner",
          destination: lastConfig.current?.destination || destination || "—",
          itinerary: result,
          locale,
          message: "AI itinerary request",
        }),
      });
      if (!res.ok) throw new Error();
      setSendState("sent");
    } catch {
      setSendState("idle");
    }
  }

  // Open a branded, print-ready document of the itinerary → user saves as PDF.
  function downloadPdf() {
    const c = lastConfig.current;
    const body = itinRef.current?.innerHTML ?? "";
    const summary = c
      ? [
          c.destination,
          `${c.duration} ${t("fields.durationUnit")}`,
          t(`budgetOpts.${c.budget}`),
          `${c.travelers} ✶`,
        ]
          .filter(Boolean)
          .join("  ·  ")
      : "";

    const doc = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8">
<title>${site.name} — ${t("resultTitle")}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Playfair+Display:wght@500;700&family=Montserrat:wght@400;500;600&display=swap');
  * { box-sizing: border-box; }
  body { font-family: 'Montserrat', Arial, sans-serif; color: #1a1a1a; margin: 0; padding: 40px 48px; }
  .head { text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 8px; }
  .brand { font-family: 'Cinzel', serif; letter-spacing: .22em; font-size: 22px; color: #0D0D0D; }
  .brand span { color: #B8902B; }
  .doc-title { font-family: 'Playfair Display', serif; font-size: 26px; margin: 22px 0 6px; color: #0D0D0D; }
  .summary { color: #8a7320; font-size: 12px; letter-spacing: .04em; text-transform: uppercase; margin-bottom: 28px; }
  h1, h2, h3, h4, h5 { font-family: 'Playfair Display', serif; color: #0D0D0D; margin: 22px 0 8px; }
  h4 { font-size: 17px; border-left: 3px solid #D4AF37; padding-left: 10px; }
  h5 { font-size: 14px; color: #8a7320; }
  p, li { font-size: 13px; line-height: 1.65; }
  ul { padding-left: 18px; }
  strong { color: #0D0D0D; }
  .foot { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 16px; text-align: center; font-size: 11px; color: #666; }
  .foot b { color: #B8902B; }
  @media print { body { padding: 24px 32px; } }
</style></head>
<body>
  <div class="head">
    <div class="brand">SILK<span>O</span>RA <span style="letter-spacing:.3em;font-size:13px">TRAVEL</span></div>
  </div>
  <div class="doc-title">${t("resultTitle")}</div>
  <div class="summary">${summary}</div>
  <div class="content">${body}</div>
  <div class="foot">
    ${site.name} &nbsp;·&nbsp; <b>${site.phoneDisplay}</b> &nbsp;·&nbsp; ${site.email} &nbsp;·&nbsp; ${site.url.replace(/^https?:\/\//, "")}
  </div>
  <script>window.onload = function () { window.focus(); window.print(); };</script>
</body></html>`;

    const w = window.open("", "_blank", "width=820,height=1000");
    if (!w) return;
    w.document.open();
    w.document.write(doc);
    w.document.close();
  }

  const interestOpts = INTEREST_KEYS.map((k) => ({
    key: k,
    label: t(`interestOpts.${k}`),
  }));
  const budgetOpts = BUDGET_KEYS.map((k) => ({
    key: k,
    label: t(`budgetOpts.${k}`),
  }));
  const paceOpts = PACE_KEYS.map((k) => ({ key: k, label: t(`paceOpts.${k}`) }));

  return (
    <section id="ai" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[40rem] -translate-x-1/2 gold-glow blur-2xl" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <div className="card-gold rounded-3xl p-6 md:p-8 lg:col-span-2">
            <div className="space-y-6">
              <div>
                <label className={fieldLabel} htmlFor="destination">
                  {t("fields.destination")}
                </label>
                <input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={t("fields.destinationPlaceholder")}
                  className="w-full rounded-full border border-gold/25 bg-ink px-5 py-3 text-sm text-white placeholder:text-faint focus:border-gold"
                />
              </div>

              <div>
                <span className={fieldLabel}>{t("fields.interests")}</span>
                <div className="flex flex-wrap gap-2">
                  {interestOpts.map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      aria-pressed={interests.includes(o.key)}
                      onClick={() => toggleInterest(o.key)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                        interests.includes(o.key)
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-white/12 text-white/60 hover:border-gold/40"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className={fieldLabel}>{t("fields.budget")}</span>
                <Segmented
                  options={budgetOpts}
                  value={budget}
                  onChange={setBudget}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className={fieldLabel}>
                    {t("fields.duration")}{" "}
                    <span className="text-faint normal-case">
                      ({t("fields.durationUnit")})
                    </span>
                  </span>
                  <Stepper
                    value={duration}
                    onChange={setDuration}
                    min={1}
                    max={21}
                  />
                </div>
                <div>
                  <span className={fieldLabel}>{t("fields.travelers")}</span>
                  <Stepper
                    value={travelers}
                    onChange={setTravelers}
                    min={1}
                    max={20}
                  />
                </div>
              </div>

              <div>
                <span className={fieldLabel}>{t("fields.pace")}</span>
                <Segmented options={paceOpts} value={pace} onChange={setPace} />
              </div>

              <Button
                onClick={() => generate()}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Sparkles className="h-4 w-4" aria-hidden />
                )}
                {t("submit")}
              </Button>
            </div>
          </div>

          {/* Result */}
          <div
            role="status"
            aria-live="polite"
            aria-busy={loading}
            className="min-h-[26rem] rounded-3xl border border-gold/15 bg-ink-soft p-6 md:p-8 lg:col-span-3"
          >
            {!result && !loading && !error && (
              <div className="flex h-full min-h-[22rem] flex-col items-center justify-center text-center">
                <Wand2
                  className="h-10 w-10 text-gold/60"
                  strokeWidth={1.3}
                  aria-hidden
                />
                <p className="mt-4 max-w-xs text-sm text-faint">
                  {t("subtitle")}
                </p>

                {/* One-click presets */}
                <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold/70">
                  {t("presetsTitle")}
                </p>
                <div className="mt-4 grid w-full max-w-md gap-2.5 sm:grid-cols-2">
                  {PLANNER_PRESETS.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className="group flex items-center justify-between gap-2 rounded-2xl border border-gold/20 bg-ink/40 px-4 py-3 text-left text-sm text-white/85 transition-all hover:border-gold/60 hover:bg-gold/5"
                    >
                      <span>{t(`presets.${p.key}.label`)}</span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-gold/50 transition-all group-hover:translate-x-0.5 group-hover:text-gold"
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && !result && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Sparkle className="h-4 w-4 text-gold animate-twinkle" />
                  <p className="text-sm text-muted">{t("loading")}</p>
                </div>
                <ItinerarySkeleton />
              </div>
            )}

            {result && !error && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <Sparkle className="h-4 w-4 text-gold" />
                  <h3 className="font-serif text-xl text-white">
                    {t("resultTitle")}
                  </h3>
                  {loading && (
                    <Loader2
                      className="h-4 w-4 animate-spin text-gold/70"
                      aria-hidden
                    />
                  )}
                </div>

                <div
                  ref={itinRef}
                  className="itinerary-prose max-w-none text-sm"
                  lang={locale}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...p }) => <h4 {...p} />,
                      h2: ({ node, ...p }) => <h4 {...p} />,
                      h3: ({ node, ...p }) => <h5 {...p} />,
                    }}
                  >
                    {result}
                  </ReactMarkdown>
                </div>

                {mode === "demo" && (
                  <p className="mt-5 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-xs text-gold/80">
                    {t("demoNotice")}
                  </p>
                )}

                {!loading && (
                  <div className="mt-7 flex flex-wrap gap-3">
                    {sendState === "sent" ? (
                      <span
                        role="status"
                        aria-live="polite"
                        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold"
                      >
                        <Check className="h-4 w-4" aria-hidden />
                        {t("sent")}
                      </span>
                    ) : (
                      <Button
                        onClick={sendToManager}
                        disabled={sendState === "sending"}
                      >
                        {sendState === "sending" ? (
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        ) : (
                          <Send className="h-4 w-4" aria-hidden />
                        )}
                        {t("sendToManager")}
                      </Button>
                    )}
                    <Button onClick={downloadPdf} variant="outline">
                      <Download className="h-4 w-4" aria-hidden />
                      {t("downloadPdf")}
                    </Button>
                    <Button onClick={() => generate()} variant="ghost">
                      <RefreshCw className="h-4 w-4" aria-hidden />
                      {t("regenerate")}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="flex h-full min-h-[22rem] flex-col items-center justify-center text-center">
                <p role="alert" className="max-w-xs text-sm text-red-300/80">
                  {t("error")}
                </p>
                <Button
                  onClick={() => generate()}
                  variant="outline"
                  className="mt-5"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden />
                  {t("regenerate")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
