// ⚠️ REPLACE THESE PLACEHOLDERS WITH THE AGENCY'S REAL DATA.
// A real phone/email/handles + Tashkent address must be set before driving
// traffic — a "2-hour response" promise next to a 000-00-00 number hurts trust.
export const site = {
  name: "SILKORA TRAVEL",
  // Public site URL (used for canonical, hreflang, sitemap, OpenGraph).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://silkora.uz", // TODO: real domain
  phoneDisplay: "+998 90 000 00 00", // TODO
  phoneHref: "+998900000000", // TODO: digits with country code, no spaces/+
  email: "info@silkora.uz", // TODO
  whatsapp: "998900000000", // TODO: digits only, no +
  telegram: "silkora_travel", // TODO: username without @
  instagram: "silkora.travel", // TODO: handle without @
  // Office address shown in contact/footer + Google Maps.
  addressLine: "Ташкент, Узбекистан", // TODO: real street address
} as const;

export const socials = {
  instagram: `https://instagram.com/${site.instagram}`,
  telegram: `https://t.me/${site.telegram}`,
  whatsapp: `https://wa.me/${site.whatsapp}`,
};

// Build a WhatsApp deep link with an optional pre-filled message.
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
