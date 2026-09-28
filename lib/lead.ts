// Demo-request payload: shared by the form (client) and /api/lead (server).
import { isPlanId, type PlanId } from "./pricing.ts";

export const COUNTRIES = [
  { code: "AE", dial: "+971", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  { code: "SA", dial: "+966", en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  { code: "QA", dial: "+974", en: "Qatar", ar: "قطر" },
  { code: "KW", dial: "+965", en: "Kuwait", ar: "الكويت" },
  { code: "BH", dial: "+973", en: "Bahrain", ar: "البحرين" },
  { code: "OM", dial: "+968", en: "Oman", ar: "عُمان" },
  { code: "JO", dial: "+962", en: "Jordan", ar: "الأردن" },
  { code: "LB", dial: "+961", en: "Lebanon", ar: "لبنان" },
  { code: "EG", dial: "+20", en: "Egypt", ar: "مصر" },
  { code: "OTHER", dial: "", en: "Other", ar: "أخرى" },
] as const;

export type Lead = {
  name: string;
  email: string;
  whatsapp: string; // E.164-ish: "+971501234567"
  company: string;
  country: string;
  useCase: string;
  consentData: true;
  consentWhatsapp: true;
  plan: PlanId | null;
  credits: number | null;
  language: "en" | "ar";
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Server-side validation. Returns the cleaned lead, or null when invalid. */
export function parseLead(input: unknown): Lead | null {
  if (!input || typeof input !== "object") return null;
  const d = input as Record<string, unknown>;

  const name = str(d.name, 120);
  const email = str(d.email, 200).toLowerCase();
  const company = str(d.company, 160);
  const country = str(d.country, 60);
  const useCase = str(d.useCase, 2000);
  const dial = str(d.dialCode, 6).replace(/[^\d+]/g, "");
  const local = str(d.whatsapp, 30).replace(/[^\d]/g, "").replace(/^0+/, "");
  const whatsapp = (dial.startsWith("+") ? dial : dial ? `+${dial}` : "+") + local;

  if (!name || !company || !country) return null;
  if (!EMAIL_RE.test(email)) return null;
  if (!/^\+\d{8,15}$/.test(whatsapp)) return null;
  if (d.consentData !== true || d.consentWhatsapp !== true) return null;

  const plan = isPlanId(d.plan) ? d.plan : null;
  const creditsNum = Number(d.credits);
  const credits = Number.isFinite(creditsNum) && creditsNum >= 0 && creditsNum <= 1e9 ? Math.round(creditsNum) : null;
  const language = d.language === "ar" ? "ar" : "en";

  return {
    name,
    email,
    whatsapp,
    company,
    country,
    useCase,
    consentData: true,
    consentWhatsapp: true,
    plan,
    credits,
    language,
    utmSource: str(d.utmSource, 100),
    utmMedium: str(d.utmMedium, 100),
    utmCampaign: str(d.utmCampaign, 100),
  };
}

/** Plain-text summary used for the Odoo description and the fallback email. */
export function describeLead(lead: Lead): string {
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Company: ${lead.company}`,
    `Country: ${lead.country}`,
    `Language: ${lead.language}`,
    `Plan interest: ${lead.plan ?? "-"}`,
    `Calculator estimate: ${lead.credits != null ? `${lead.credits.toLocaleString("en-US")} credits/month` : "-"}`,
    `UTM: ${[lead.utmSource, lead.utmMedium, lead.utmCampaign].map((v) => v || "-").join(" / ")}`,
    `Consent – data processing: yes`,
    `Consent – WhatsApp contact: yes`,
    "",
    "Use case:",
    lead.useCase || "-",
  ];
  return lines.join("\n");
}
