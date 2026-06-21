import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { getPost, POST_SLUGS, type BlogLocale } from "@/lib/blog";
import { site } from "@/lib/site";

const LOCALE_MAP: Record<string, string> = {
  ru: "ru-RU",
  en: "en-US",
  uz: "uz-UZ",
};

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const c = post.content[locale as BlogLocale];
  return {
    title: `${c.title} — SILKORA TRAVEL`,
    description: c.excerpt,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.excerpt,
      images: [post.image],
      url: `/${locale}/blog/${slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const loc = locale as BlogLocale;
  const c = post.content[loc];
  const t = await getTranslations({ locale, namespace: "blog" });
  const dateLabel = new Intl.DateTimeFormat(LOCALE_MAP[locale] ?? "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.date));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: c.title,
    description: c.excerpt,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/${locale}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <article>
          {/* Cover */}
          <section className="relative flex min-h-[52svh] items-end overflow-hidden">
            <Image
              src={post.image}
              alt={c.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
            <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-12 pt-32 md:px-8">
              <span className="rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
                {c.tag}
              </span>
              <h1 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl">
                {c.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <span>{dateLabel}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gold" aria-hidden />
                  {t("minRead", { count: post.readMin })}
                </span>
              </div>
            </div>
          </section>

          {/* Body */}
          <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
            <div className="itinerary-prose max-w-none" lang={locale}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{c.body}</ReactMarkdown>
            </div>

            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold hover:text-gold-light"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t("backToBlog")}
            </Link>
          </section>
        </article>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
