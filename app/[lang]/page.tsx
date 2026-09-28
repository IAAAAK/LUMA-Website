import { notFound } from "next/navigation";
import { getDictionary, isLocale, otherLocale } from "@/lib/i18n";
import { choosePlanUrl, signInUrl, whatsappUrl } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Credits from "@/components/Credits";
import { Faq, Features, FinalCta, HowItWorks, Integrations, SiteFooter, TrustStrip, UseCases } from "@/components/Sections";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const other = otherLocale(lang);

  return (
    <>
      <SiteHeader t={t} locale={lang} otherLocale={other} otherHref={`/${other}`} signInHref={signInUrl(lang)} />
      <main>
        <Hero t={t} locale={lang} />
        <TrustStrip t={t} />
        <Features t={t} />
        <HowItWorks t={t} />
        <Integrations t={t} />
        <UseCases t={t} />
        <Pricing
          t={t}
          locale={lang}
          planHrefs={{
            starter: choosePlanUrl(lang, "starter"),
            pro: choosePlanUrl(lang, "pro"),
            enterprise: `/${lang}/demo?plan=enterprise`,
          }}
        />
        <Credits t={t} locale={lang} />
        <Faq t={t} />
        <FinalCta t={t} locale={lang} whatsapp={whatsappUrl()} />
      </main>
      <SiteFooter t={t} locale={lang} />
    </>
  );
}
