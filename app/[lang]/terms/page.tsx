import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import PageShell from "@/components/PageShell";

// Placeholder until the policy text (UAE and KSA data protection) is written.
export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: `${getDictionary(lang).legal.termsTitle} — LUMA`, robots: { index: false } };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = getDictionary(lang).legal;
  return (
    <PageShell locale={lang} path="/terms">
      <h1 className="h2 page__title">{l.termsTitle}</h1>
      <p className="page__lead">{l.placeholder}</p>
      <a href={`/${lang}`} className="btn btn--outline">{l.back}</a>
    </PageShell>
  );
}
