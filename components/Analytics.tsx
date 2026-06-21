import Script from "next/script";

// Privacy-friendly analytics. No-op until NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set
// (e.g. "silkora.uz"). Works on any host; no cookies, GDPR-friendly.
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
