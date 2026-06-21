"use client";

import { useTranslations } from "next-intl";
import { Plane } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export function CtaBanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="px-5 py-10 md:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <div className="bg-gold-gradient relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-8 py-10 text-center md:flex-row md:justify-between md:text-left">
          <Plane
            className="absolute -right-6 -top-6 h-32 w-32 rotate-12 text-ink/10"
            aria-hidden
          />
          <h2 className="relative max-w-2xl font-serif text-xl font-semibold uppercase tracking-[0.06em] text-ink md:text-3xl">
            {t("text")}
          </h2>
          <a
            href="#contact"
            className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition-transform hover:scale-105"
          >
            {t("button")}
            <Plane className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
