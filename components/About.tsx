"use client";

import { PublicImage as Image } from "@/components/ui/PublicImage";
import { useTranslations } from "next-intl";
import { Eyebrow, GoldDivider, Sparkle } from "./ui/brand";
import { Reveal } from "./ui/Reveal";
import { CountUp } from "./ui/CountUp";
import { STAT_KEYS } from "@/lib/constants";

export function About() {
  const t = useTranslations("about");
  const values = ["elegance", "premium", "trust"] as const;

  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        {/* Text */}
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            {t("body")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {values.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-gold"
              >
                <Sparkle className="h-3 w-3" />
                {t(`values.${v}`)}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {STAT_KEYS.map((s) => (
              <div key={s}>
                <CountUp
                  value={t(`stats.${s}.value`)}
                  className="text-gold-gradient block font-serif text-3xl font-semibold md:text-4xl"
                />
                <div className="mt-1 text-xs leading-tight text-faint">
                  {t(`stats.${s}.label`)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Emblem */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div className="absolute inset-0 gold-glow blur-2xl" />
            <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-gold/40 p-3 md:h-80 md:w-80">
              <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-gold/20">
                <Image
                  src="/brand/logo.jpg"
                  alt="SILKORA TRAVEL"
                  fill
                  sizes="320px"
                  className="scale-110 object-cover"
                />
              </div>
            </div>
            <Sparkle className="absolute right-6 top-6 h-6 w-6 text-gold animate-twinkle" />
          </div>
          <GoldDivider className="mt-10" />
        </Reveal>
      </div>
    </section>
  );
}
