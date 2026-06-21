"use client";

import { useLocale, useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { site, socials } from "@/lib/site";

const NAV = [
  { key: "services", to: "#services" },
  { key: "destinations", to: "#destinations" },
  { key: "tours", to: "/tours" },
  { key: "visa", to: "/visa" },
  { key: "blog", to: "/blog" },
  { key: "planner", to: "#ai" },
  { key: "reviews", to: "#reviews" },
  { key: "contact", to: "#contact" },
] as const;

export function Footer() {
  const tNav = useTranslations("nav");
  const tFoot = useTranslations("footer");
  const locale = useLocale();
  const nav = (to: string) => `/${locale}${to}`;

  return (
    <footer className="border-t border-gold/15 bg-ink-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Logo size="md" />
          <p className="mt-5 max-w-xs text-sm text-faint">{tFoot("tagline")}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold/80">
            {tFoot("nav")}
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV.map((item) => (
              <li key={item.key}>
                <a
                  href={nav(item.to)}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  {tNav(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold/80">
            {tFoot("contactTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a href={`tel:${site.phoneHref}`} className="hover:text-gold">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </li>
            <li className="flex gap-4 pt-2">
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Instagram
              </a>
              <a href={socials.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-faint">
        © {new Date().getFullYear()} {site.name}. {tFoot("rights")}
      </div>
    </footer>
  );
}
