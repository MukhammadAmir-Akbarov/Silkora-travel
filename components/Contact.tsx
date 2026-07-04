"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock, Send, Loader2, Check } from "lucide-react";
import { SectionHeading } from "./ui/brand";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { site, socials } from "@/lib/site";
import { STATIC_DEMO } from "@/lib/static-mode";

const inputCls =
  "w-full rounded-xl border border-gold/20 bg-ink px-4 py-3 text-sm text-white placeholder:text-faint focus:border-gold";

export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    // Static demo build (GitHub Pages): no lead endpoint. Show the success
    // state so the form flow is demonstrable; live site posts to Telegram.
    if (STATIC_DEMO) {
      await new Promise((r) => setTimeout(r, 700));
      setState("sent");
      form.reset();
      return;
    }
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          name: data.get("name"),
          phone: data.get("phone"),
          destination: data.get("destination"),
          dates: data.get("dates"),
          travelers: data.get("travelers"),
          budget: data.get("budget"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          locale,
        }),
      });
      if (!res.ok) throw new Error();
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="card-gold space-y-4 rounded-3xl p-6 md:p-8"
            >
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder={t("fields.name")}
                  className={inputCls}
                />
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder={t("fields.phone")}
                  className={inputCls}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="destination"
                  placeholder={t("fields.destination")}
                  className={inputCls}
                />
                <input
                  name="budget"
                  placeholder={t("fields.budget")}
                  className={inputCls}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="dates"
                  placeholder={t("fields.dates")}
                  className={inputCls}
                />
                <input
                  name="travelers"
                  type="number"
                  min={1}
                  placeholder={t("fields.travelers")}
                  className={inputCls}
                />
              </div>
              <textarea
                name="message"
                rows={4}
                placeholder={t("fields.message")}
                className={`${inputCls} resize-none`}
              />

              {state === "sent" ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-5 py-4 text-sm text-gold"
                >
                  <Check className="h-5 w-5" aria-hidden />
                  {t("success")}
                </div>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden />
                  )}
                  {state === "sending" ? t("sending") : t("submit")}
                </Button>
              )}
              {state === "error" && (
                <p role="alert" className="text-center text-xs text-red-300/80">
                  {t("error")}
                </p>
              )}
              <p className="flex items-center justify-center gap-2 text-xs text-gold/80">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {t("sla")}
              </p>
              <p className="text-center text-[0.7rem] leading-relaxed text-faint">
                {t("policy")}
              </p>
            </form>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center gap-6 rounded-3xl border border-gold/15 bg-ink-soft p-6 md:p-8">
              <InfoRow icon={<Phone className="h-5 w-5" aria-hidden />} label={t("info.phoneLabel")}>
                <a href={`tel:${site.phoneHref}`} className="hover:text-gold">
                  {site.phoneDisplay}
                </a>
              </InfoRow>
              <InfoRow icon={<Mail className="h-5 w-5" aria-hidden />} label={t("info.emailLabel")}>
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </InfoRow>
              <InfoRow icon={<MapPin className="h-5 w-5" aria-hidden />} label={t("info.addressLabel")}>
                {t("info.address")}
              </InfoRow>
              <InfoRow icon={<Clock className="h-5 w-5" aria-hidden />} label={t("info.hoursLabel")}>
                {t("info.hours")}
              </InfoRow>

              <div className="mt-2 border-t border-white/10 pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold/80">
                  {t("socials")}
                </p>
                <div className="flex gap-3">
                  <Social href={socials.instagram} label="Instagram">
                    <InstagramIcon />
                  </Social>
                  <Social href={socials.telegram} label="Telegram">
                    <TelegramIcon />
                  </Social>
                  <Social href={socials.whatsapp} label="WhatsApp">
                    <WhatsAppIcon />
                  </Social>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
        {icon}
      </span>
      <div>
        <div className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
          {label}
        </div>
        <div className="mt-0.5 text-sm text-white">{children}</div>
      </div>
    </div>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M21.94 4.3 18.9 19.1c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78 8.7-7.86c.38-.34-.08-.53-.59-.19L7.8 12.6 3.16 11.15c-1.01-.32-1.03-1.01.21-1.5l18.13-6.99c.84-.31 1.58.2 1.31 1.64z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.38-.49.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.37-.14-.2-1.18-1.57-1.18-2.99s.75-2.12 1.01-2.41c.27-.29.58-.36.78-.36l.56.01c.18.01.42-.07.66.5.24.59.82 2.04.89 2.18.07.15.12.32.02.51-.09.2-.14.32-.28.5-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.27.71 1.18 1.53 1.91 1.06.94 1.95 1.24 2.22 1.38.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.46.21.53.32.07.12.07.66-.17 1.34z" />
    </svg>
  );
}
