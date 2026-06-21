"use client";

import { useTranslations } from "next-intl";
import { Globe2, BedDouble, Gem, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { PILLAR_KEYS } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  world: Globe2,
  hotels: BedDouble,
  individual: Gem,
  support: Headset,
};

export function Pillars() {
  const t = useTranslations("pillars");

  return (
    <section
      id="highlights"
      className="relative border-y border-gold/10 bg-ink-soft py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 md:grid-cols-4 md:px-8">
        {PILLAR_KEYS.map((key, i) => {
          const Icon = ICONS[key];
          return (
            <Reveal key={key} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-faint">
                  {t(`${key}.desc`)}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
