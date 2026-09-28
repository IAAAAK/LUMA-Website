// Public links that are still TBD (see CLAUDE.md "Open items"). Set them as
// NEXT_PUBLIC_* environment variables in Vercel; until then buttons fall back
// to the demo form so nothing on the site is a dead link.
import type { Locale } from "./i18n";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function signInUrl(locale: Locale): string {
  return process.env.NEXT_PUBLIC_APP_SIGNIN_URL || `/${locale}/demo`;
}

export function whatsappUrl(): string | null {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  return number ? `https://wa.me/${number}` : null;
}

/** "Choose plan": the app's signup page when it exists, otherwise the demo form. */
export function choosePlanUrl(locale: Locale, plan: string): string {
  const signup = process.env.NEXT_PUBLIC_APP_SIGNUP_URL;
  if (signup) return `${signup}${signup.includes("?") ? "&" : "?"}plan=${plan}`;
  return `/${locale}/demo?plan=${plan}`;
}
