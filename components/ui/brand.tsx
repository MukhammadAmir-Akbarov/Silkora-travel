import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M50 0c3 35 15 47 50 50-35 3-47 15-50 50-3-35-15-47-50-50 35-3 47-15 50-50Z" />
    </svg>
  );
}

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
      <Sparkle className="h-3 w-3 text-gold animate-twinkle" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow text-[0.7rem] text-gold/90 md:text-xs">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignment}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {align === "center" && <GoldDivider className="mt-6" />}
      {subtitle && (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
