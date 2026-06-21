import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Check,
  ExternalLink,
  Plane,
  ShieldCheck,
  Info,
  ChevronDown,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { SectionHeading } from "@/components/ui/brand";
import { Button } from "@/components/ui/Button";
import { VISA, VISA_OFFICIAL, type VisaLocale } from "@/lib/visa";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = VISA[locale as VisaLocale];
  return {
    title: `${c.title} — SILKORA TRAVEL`,
    description: c.subtitle,
    alternates: { canonical: `/${locale}/visa` },
    openGraph: { type: "article", title: c.title, description: c.subtitle, url: `/${locale}/visa` },
  };
}

export default async function VisaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = VISA[locale as VisaLocale];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Header />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-5xl px-5 pb-20 md:px-8 md:pb-28">
          <SectionHeading eyebrow="VISA" title={c.title} subtitle={c.subtitle} />

          {/* Inbound */}
          <section className="card-gold mt-12 rounded-3xl p-7 md:p-9">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-gold" aria-hidden />
              <h2 className="font-serif text-2xl text-white">{c.inboundTitle}</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{c.inboundIntro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.inboundPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={VISA_OFFICIAL.uzbekistan}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/10"
            >
              {c.inboundCta}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </section>

          {/* Outbound */}
          <section className="mt-12">
            <div className="flex items-center gap-3">
              <Plane className="h-6 w-6 text-gold" aria-hidden />
              <h2 className="font-serif text-2xl text-white">{c.outboundTitle}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.outboundIntro}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.outbound.map((o) => (
                <div key={o.key} className="card-gold rounded-2xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-serif text-lg text-white">{o.name}</h3>
                    <span className="rounded-full border border-gold/40 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-gold">
                      {o.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-faint">{o.note}</p>
                  {VISA_OFFICIAL[o.key] && (
                    <a
                      href={VISA_OFFICIAL[o.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gold/80 hover:text-gold"
                    >
                      {o.key === "schengen" ? "schengenvisainfo.com" : new URL(VISA_OFFICIAL[o.key]).host}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-white">{c.faqTitle}</h2>
            <div className="mt-5 divide-y divide-white/10 rounded-2xl border border-gold/15 bg-ink-soft">
              {c.faq.map((f) => (
                <details key={f.q} className="group px-6 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white">
                    {f.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <p className="mt-8 flex items-start gap-2 rounded-xl border border-gold/15 bg-gold/5 px-4 py-3 text-xs leading-relaxed text-faint">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden />
            {c.disclaimer}
          </p>

          {/* Help CTA */}
          <section className="mt-10 rounded-3xl border border-gold/20 bg-ink-soft p-8 text-center">
            <h2 className="font-serif text-2xl text-white">{c.helpTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {c.helpText}
            </p>
            <Button href={`/${locale}#contact`} size="lg" className="mt-6">
              {c.helpCta}
            </Button>
          </section>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
