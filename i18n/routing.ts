import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "uz"],
  defaultLocale: "ru",
  localePrefix: "always",
  // Always open in Russian by default — do not auto-switch by the visitor's
  // browser language. Users pick EN/UZ explicitly via the language switcher.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
