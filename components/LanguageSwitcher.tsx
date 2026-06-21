"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const tLang = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const labels: Record<string, string> = { ru: "RU", en: "EN", uz: "UZ" };

  return (
    <div
      className={`flex items-center gap-1 text-xs font-medium ${className} ${
        isPending ? "opacity-60" : ""
      }`}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && <span className="mx-1 text-white/20">·</span>}
          <button
            type="button"
            onClick={() =>
              startTransition(() => router.replace(pathname, { locale: loc }))
            }
            className={`tracking-wider transition-colors ${
              loc === locale
                ? "text-gold"
                : "text-white/55 hover:text-white"
            }`}
            aria-label={tLang(loc)}
            aria-current={loc === locale ? "true" : undefined}
          >
            {labels[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
