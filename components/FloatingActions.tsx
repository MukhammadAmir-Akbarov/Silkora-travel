"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { socials, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  const t = useTranslations("floating");

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <a
        href={whatsappLink(t("waMessage"))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsapp")}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.38-.49.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.37-.14-.2-1.18-1.57-1.18-2.99s.75-2.12 1.01-2.41c.27-.29.58-.36.78-.36l.56.01c.18.01.42-.07.66.5.24.59.82 2.04.89 2.18.07.15.12.32.02.51-.09.2-.14.32-.28.5-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.27.71 1.18 1.53 1.91 1.06.94 1.95 1.24 2.22 1.38.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.46.21.53.32.07.12.07.66-.17 1.34z" />
        </svg>
      </a>
      <a
        href={socials.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("telegram")}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M21.94 4.3 18.9 19.1c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78 8.7-7.86c.38-.34-.08-.53-.59-.19L7.8 12.6 3.16 11.15c-1.01-.32-1.03-1.01.21-1.5l18.13-6.99c.84-.31 1.58.2 1.31 1.64z" />
        </svg>
      </a>
      <a
        href={socials.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("instagram")}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-lg transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href="#ai"
        className="bg-gold-gradient flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink shadow-lg transition-transform hover:scale-105"
      >
        <Sparkles className="h-4 w-4" aria-hidden />
        {t("planner")}
      </a>
    </div>
  );
}
