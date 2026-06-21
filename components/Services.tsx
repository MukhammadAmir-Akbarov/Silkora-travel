"use client";

import { useTranslations } from "next-intl";
import {
  Map,
  Plane,
  Building2,
  FileCheck2,
  Compass,
  Briefcase,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "./ui/brand";
import { Reveal } from "./ui/Reveal";
import { SERVICE_KEYS } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  tours: Map,
  flights: Plane,
  hotels: Building2,
  visa: FileCheck2,
  custom: Compass,
  mice: Briefcase,
};

// Service cards that link to a dedicated page.
const ROUTES: Record<string, string> = { tours: "/tours", visa: "/visa" };

export function Services() {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      className="scroll-mt-20 border-y border-gold/10 bg-ink-soft py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = ICONS[key];
            const cardClass =
              "card-gold group block h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1";
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 text-gold transition-colors group-hover:bg-gold/10">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-xl text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">
                  {t(`items.${key}.desc`)}
                </p>
              </>
            );
            return (
              <Reveal key={key} delay={(i % 3) * 0.08}>
                {ROUTES[key] ? (
                  <Link href={ROUTES[key]} className={cardClass}>
                    {inner}
                  </Link>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
