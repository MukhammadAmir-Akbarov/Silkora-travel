"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./ui/brand";
import { Reveal } from "./ui/Reveal";
import { TESTIMONIAL_KEYS } from "@/lib/constants";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section
      id="reviews"
      className="scroll-mt-20 border-y border-gold/10 bg-ink-soft py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIAL_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 0.1}>
              <figure className="card-gold flex h-full flex-col rounded-2xl p-7">
                <Quote className="h-7 w-7 text-gold/50" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  “{t(`items.${key}.text`)}”
                </blockquote>
                <div className="mt-5 flex gap-1 text-gold" aria-hidden>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <figcaption className="mt-4 border-t border-white/10 pt-4">
                  <div className="text-sm font-semibold text-white">
                    {t(`items.${key}.name`)}
                  </div>
                  <div className="text-xs text-faint">
                    {t(`items.${key}.location`)}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
