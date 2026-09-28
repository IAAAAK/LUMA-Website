import type { ReactNode } from "react";
import { getDictionary, otherLocale, type Locale } from "@/lib/i18n";
import { signInUrl } from "@/lib/site";
import SiteHeader from "./SiteHeader";
import { SiteFooter } from "./Sections";

/** Header + footer around inner pages; `path` is the page's path after the locale, e.g. "/demo". */
export default function PageShell({ locale, path, children }: { locale: Locale; path: string; children: ReactNode }) {
  const t = getDictionary(locale);
  const other = otherLocale(locale);
  return (
    <>
      <SiteHeader t={t} locale={locale} otherLocale={other} otherHref={`/${other}${path}`} signInHref={signInUrl(locale)} />
      <main className="page">
        <div className="container">
          <div className="page__narrow">{children}</div>
        </div>
      </main>
      <SiteFooter t={t} locale={locale} />
    </>
  );
}
