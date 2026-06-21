"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "./ui/Button";

const NAV = [
  { key: "services", to: "#services" },
  { key: "destinations", to: "#destinations" },
  { key: "tours", to: "/tours" },
  { key: "planner", to: "#ai" },
  { key: "reviews", to: "#reviews" },
  { key: "contact", to: "#contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const nav = (to: string) => `/${locale}${to}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/15 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href={nav("")} aria-label="SILKORA TRAVEL">
          <Logo size="sm" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.key}
              href={nav(item.to)}
              className="text-xs font-medium uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-gold"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <Button href={nav("#contact")} size="md">
            {t("cta")}
          </Button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="text-gold"
          >
            {open ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-gold/10 bg-ink/97 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {NAV.map((item) => (
            <a
              key={item.key}
              href={nav(item.to)}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3 text-sm uppercase tracking-[0.14em] text-white/80 hover:text-gold"
            >
              {t(item.key)}
            </a>
          ))}
          <Button
            href={nav("#contact")}
            className="mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            {t("cta")}
          </Button>
        </nav>
      </div>
    </header>
  );
}
