import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Users, Tag, Check, X, ArrowLeft, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Button } from "@/components/ui/Button";
import { Gallery } from "@/components/Gallery";
import { GoldDivider, Sparkle } from "@/components/ui/brand";
import { getTour, TOUR_SLUGS, type Locale } from "@/lib/tours";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return TOUR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  const c = tour.content[locale as Locale];
  return {
    title: `${c.title} — SILKORA TRAVEL`,
    description: c.summary,
    alternates: { canonical: `/${locale}/tours/${slug}` },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.summary,
      images: [tour.image],
      url: `/${locale}/tours/${slug}`,
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tour = getTour(slug);
  if (!tour) notFound();

  const loc = locale as Locale;
  const c = tour.content[loc];
  const t = await getTranslations({ locale, namespace: "tours" });
  const tDest = await getTranslations({ locale, namespace: "destinations" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: c.title,
    description: c.summary,
    image: `${site.url}${tour.image}`,
    touristType: tour.type === "silkRoad" ? "Cultural" : "Leisure",
    itinerary: c.days.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "TouristAttraction", name: d.title, description: d.desc },
    })),
    offers: {
      "@type": "Offer",
      price: tour.priceFrom.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
    },
    provider: { "@type": "TravelAgency", name: site.name, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[60svh] items-end overflow-hidden">
          <Image
            src={tour.image}
            alt={c.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-32 md:px-8">
            <span className="rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
              {tDest(tour.type === "silkRoad" ? "silkRoad" : "luxury")}
            </span>
            <h1 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-white md:text-5xl">
              {c.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {c.summary}
            </p>
          </div>
        </section>

        {/* Facts */}
        <section className="border-y border-gold/10 bg-ink-soft">
          <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-gold/10 px-5 md:px-8">
            <Fact icon={<Clock className="h-5 w-5" aria-hidden />} label={t("duration")} value={t("nights", { count: tour.nights })} />
            <Fact icon={<Users className="h-5 w-5" aria-hidden />} label={t("groupSize")} value={t("groupUpTo", { count: tour.groupMax })} />
            <Fact icon={<Tag className="h-5 w-5" aria-hidden />} label={t("price")} value={t("priceFrom", { price: tour.priceFrom })} />
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
          <h2 className="font-serif text-2xl text-white">{t("gallery")}</h2>
          <div className="mt-5">
            <Gallery
              images={[
                tour.image,
                `/destinations/${slug}-2.jpg`,
                `/destinations/${slug}-3.jpg`,
              ]}
              alt={c.title}
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Itinerary + highlights */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-white">{t("highlights")}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted">
                    <Sparkle className="mt-1 h-3 w-3 shrink-0 text-gold" />
                    {h}
                  </li>
                ))}
              </ul>

              <GoldDivider className="my-10 justify-start" />

              <h2 className="font-serif text-2xl text-white">{t("itinerary")}</h2>
              <ol className="mt-6 space-y-6">
                {c.days.map((d, i) => (
                  <li key={i} className="relative border-l border-gold/25 pl-6">
                    <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-gold-gradient" />
                    <h3 className="font-serif text-lg text-gold">{d.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{d.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sidebar: included / excluded + CTA */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="card-gold rounded-3xl p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                    {t("included")}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {c.included.map((x) => (
                      <li key={x} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                    {t("excluded")}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {c.excluded.map((x) => (
                      <li key={x} className="flex items-start gap-2 text-sm text-faint">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-faint" aria-hidden />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-gold/20 bg-ink-soft p-6 text-center">
                  <div className="text-gold-gradient font-serif text-3xl font-semibold">
                    {t("priceFrom", { price: tour.priceFrom })}
                  </div>
                  <div className="mt-1 text-xs text-faint">{t("perPerson")}</div>
                  <Button href={`/${locale}#contact`} size="lg" className="mt-5 w-full">
                    {t("requestBooking")}
                  </Button>
                  <a
                    href={whatsappLink(t("waMessage", { tour: c.title }))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/10"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                    {t("askWhatsApp")}
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <Link
            href="/tours"
            className="mt-14 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold hover:text-gold-light"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("backToCatalog")}
          </Link>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-6 text-center">
      <span className="text-gold">{icon}</span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-faint">
        {label}
      </span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
