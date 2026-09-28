import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import PageShell from "@/components/PageShell";
import DemoForm from "@/components/DemoForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/demo">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getDictionary(lang).demo.metaTitle,
    alternates: { canonical: `/${lang}/demo`, languages: { en: "/en/demo", ar: "/ar/demo" } },
  };
}

export default async function DemoPage({ params }: PageProps<"/[lang]/demo">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang).demo;
  return (
    <PageShell locale={lang} path="/demo">
      <h1 className="h2 page__title">{d.title}</h1>
      <p className="page__lead">{d.lead}</p>
      <DemoForm t={getDictionary(lang)} locale={lang} turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null} />
    </PageShell>
  );
}
