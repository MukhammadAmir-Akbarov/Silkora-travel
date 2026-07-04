"use client";

import { useRef } from "react";
import { PublicImage as Image } from "@/components/ui/PublicImage";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/Button";
import { Sparkle } from "./ui/brand";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: yImg }} className="absolute inset-0">
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src="/hero/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />

      {/* Floating sparkles */}
      <Sparkle className="absolute left-[12%] top-[22%] h-4 w-4 text-gold/70 animate-drift" />
      <Sparkle className="absolute right-[16%] top-[30%] h-6 w-6 text-gold/50 animate-drift [animation-delay:1.5s]" />
      <Sparkle className="absolute right-[26%] bottom-[26%] h-3 w-3 text-gold/60 animate-drift [animation-delay:3s]" />

      <motion.div
        style={{ y: yText, opacity: fade }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.h1 variants={item} className="flex flex-col items-center">
            <span className="font-display text-4xl font-semibold tracking-[0.1em] text-white sm:text-5xl md:text-7xl">
              {t("kicker")}
            </span>
            <span className="font-script text-gold-gradient shimmer-gold -mt-1 text-5xl leading-[0.9] md:-mt-3 md:text-7xl">
              {t("script")}
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-7 flex items-center gap-3">
            <span className="h-px w-10 bg-gold/50" />
            <Sparkle className="h-3 w-3 text-gold" />
            <span className="h-px w-10 bg-gold/50" />
          </motion.div>

          <motion.h2
            variants={item}
            className="mt-7 max-w-3xl font-serif text-2xl leading-snug text-white md:text-4xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button href="#ai" size="lg">
              {t("ctaPlanner")}
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              {t("ctaContact")}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <a
        href="#highlights"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-gold/70"
        aria-label={t("scroll")}
      >
        <ChevronDown className="h-7 w-7 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
