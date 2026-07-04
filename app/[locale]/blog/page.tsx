import type { Metadata } from "next";
import { PublicImage as Image } from "@/components/ui/PublicImage";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { SectionHeading } from "@/components/ui/brand";
import { POSTS, type BlogLocale } from "@/lib/blog";

const LOCALE_MAP: Record<string, string> = {
  ru: "ru-RU",
  en: "en-US",
  uz: "uz-UZ",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t("title")} — SILKORA TRAVEL`,
    description: t("subtitle"),
    alternates: { canonical: `/${locale}/blog` },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const loc = locale as BlogLocale;
  const fmt = new Intl.DateTimeFormat(LOCALE_MAP[locale] ?? "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <main className="pt-28 md:pt-32">
        <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => {
              const c = post.content[loc];
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group card-gold flex flex-col overflow-hidden rounded-3xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
                      {c.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-[0.7rem] text-faint">
                      <span>{fmt.format(new Date(post.date))}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gold" aria-hidden />
                        {t("minRead", { count: post.readMin })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-xl leading-snug text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-faint">
                      {c.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 self-end text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
