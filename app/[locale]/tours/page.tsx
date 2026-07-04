import type { Metadata } from "next";
import { PublicImage as Image } from "@/components/ui/PublicImage";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { SectionHeading } from "@/components/ui/brand";
import { TOURS, type Locale } from "@/lib/tours";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  return {
    title: `${t("title")} — SILKORA TRAVEL`,
    description: t("subtitle"),
    alternates: { canonical: `/${locale}/tours` },
  };
}

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "tours" });
  const tDest = await getTranslations({ locale, namespace: "destinations" });
  const loc = locale as Locale;

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32">
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOURS.map((tour) => {
              const c = tour.content[loc];
              return (
                <Link
                  key={tour.slug}
                  href={`/tours/${tour.slug}`}
                  className="group card-gold flex flex-col overflow-hidden rounded-3xl"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
                      {tDest(tour.type === "silkRoad" ? "silkRoad" : "luxury")}
                    </span>
                    <span className="bg-gold-gradient absolute right-4 top-4 rounded-full px-3 py-1 text-[0.65rem] font-semibold text-ink">
                      {t("priceFrom", { price: tour.priceFrom })}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl text-white">{c.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-faint">
                      {c.summary}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gold" aria-hidden />
                        {t("nights", { count: tour.nights })}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-gold" aria-hidden />
                        {t("groupUpTo", { count: tour.groupMax })}
                      </span>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      {t("details")}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
