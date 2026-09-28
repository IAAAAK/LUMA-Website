import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cairo, DM_Sans, IBM_Plex_Sans_Arabic, Sora } from "next/font/google";
import { LOCALES, dir, getDictionary, isLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-sora", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-dm-sans", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["600", "700", "800"], variable: "--font-cairo", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#081226" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    icons: { icon: "/logos/luma-hex-icon.png" },
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "ar" ? "ar_AE" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const fonts = lang === "ar" ? `${cairo.variable} ${plexArabic.variable}` : `${sora.variable} ${dmSans.variable}`;
  return (
    <html lang={lang} dir={dir(lang)} className={fonts}>
      <body>{children}</body>
    </html>
  );
}
