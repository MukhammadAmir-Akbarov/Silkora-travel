"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "./ui/brand";
import { Reveal } from "./ui/Reveal";
import { DESTINATIONS } from "@/lib/constants";

export function Destinations() {
  const t = useTranslations("destinations");

  return (
    <section id="destinations" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.key} delay={(i % 3) * 0.08}>
              <Link
                href={`/tours/${d.key}`}
                className="group relative block h-80 overflow-hidden rounded-3xl border border-gold/15"
              >
                <Image
                  src={d.img}
                  alt={t(`items.${d.key}.name`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
                  {t(d.type === "silkRoad" ? "silkRoad" : "luxury")}
                </span>

                <span className="bg-gold-gradient absolute right-4 top-4 rounded-full px-3 py-1 text-[0.65rem] font-semibold text-ink shadow-sm">
                  {t("priceFrom", { price: d.priceFrom })}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-2xl text-white">
                    {t(`items.${d.key}.name`)}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {t(`items.${d.key}.tagline`)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {t("more")}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
