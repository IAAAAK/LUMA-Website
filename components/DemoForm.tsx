"use client";

import { useEffect, useState, type FormEvent } from "react";
import { fill, type Dictionary, type Locale } from "@/lib/i18n";
import { COUNTRIES } from "@/lib/lead";
import { formatNumber, isPlanId } from "@/lib/pricing";
import { CheckIcon } from "./icons";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string) => void };
  }
}

type Status = "idle" | "sending" | "done" | "error";
type Props = { t: Dictionary; locale: Locale; turnstileSiteKey: string | null };

export default function DemoForm({ t, locale, turnstileSiteKey }: Props) {
  const d = t.demo;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState(locale === "ar" ? "SA" : "AE");
  const [dialCode, setDialCode] = useState(locale === "ar" ? "+966" : "+971");
  const [context, setContext] = useState({ plan: "", credits: "", utmSource: "", utmMedium: "", utmCampaign: "" });

  // Hidden fields come from the URL: ?plan=pro&credits=30000&utm_source=…
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const plan = q.get("plan") ?? "";
    setContext({
      plan: isPlanId(plan) ? plan : "",
      credits: /^\d+$/.test(q.get("credits") ?? "") ? q.get("credits")! : "",
      utmSource: q.get("utm_source") ?? "",
      utmMedium: q.get("utm_medium") ?? "",
      utmCampaign: q.get("utm_campaign") ?? "",
    });
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || document.getElementById("cf-turnstile-script")) return;
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, [turnstileSiteKey]);

  function onCountryChange(code: string) {
    setCountry(code);
    const match = COUNTRIES.find((c) => c.code === code);
    if (match?.dial) setDialCode(match.dial);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setError(d.errors.required);
      return;
    }
    const data = new FormData(form);
    const turnstileToken = data.get("cf-turnstile-response");
    if (turnstileSiteKey && !turnstileToken) {
      setError(d.errors.captcha);
      return;
    }

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          dialCode,
          whatsapp: data.get("whatsapp"),
          company: data.get("company"),
          country: COUNTRIES.find((c) => c.code === country)?.en ?? country,
          useCase: data.get("useCase"),
          consentData: data.get("consentData") === "on",
          consentWhatsapp: data.get("consentWhatsapp") === "on",
          language: locale,
          ...context,
          turnstileToken,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && body.ok) {
        setStatus("done");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setError(body.error === "captcha" ? d.errors.captcha : body.error === "invalid" ? d.errors.required : d.errors.server);
    } catch {
      setError(d.errors.server);
    }
    setStatus("error");
    window.turnstile?.reset();
  }

  if (status === "done") {
    return (
      <div className="form-card thanks" role="status">
        <div className="thanks__icon"><CheckIcon size={30} /></div>
        <h2 className="h2">{d.thanks.title}</h2>
        <p className="body">{d.thanks.body}</p>
        <a href={`/${locale}`} className="btn btn--outline">{d.thanks.back}</a>
      </div>
    );
  }

  const [privacyBefore, privacyAfter] = d.consentData.split("{privacy}");
  const planName = isPlanId(context.plan) ? t.pricing.plans[context.plan].name : null;

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      {planName && (
        <p className="form-note">
          {fill(d.planInterest, { plan: planName })}
          {context.credits && ` · ${formatNumber(Number(context.credits))}`}
        </p>
      )}
      <div className="form-grid" style={planName ? { marginTop: 20 } : undefined}>
        <div className="field">
          <label htmlFor="name">{d.name} <span className="req">*</span></label>
          <input id="name" name="name" required autoComplete="name" maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="email">{d.email} <span className="req">*</span></label>
          <input id="email" name="email" type="email" required autoComplete="email" dir="ltr" maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor="company">{d.company} <span className="req">*</span></label>
          <input id="company" name="company" required autoComplete="organization" maxLength={160} />
        </div>
        <div className="field">
          <label htmlFor="country">{d.country} <span className="req">*</span></label>
          <select id="country" name="country" required value={country} onChange={(e) => onCountryChange(e.target.value)}>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c[locale]}</option>
            ))}
          </select>
        </div>
        <div className="field field--full">
          <label htmlFor="whatsapp">{d.whatsapp} <span className="req">*</span></label>
          <div className="phone-field">
            <select aria-label="Country code" value={dialCode} onChange={(e) => setDialCode(e.target.value)}>
              {COUNTRIES.filter((c) => c.dial).map((c) => (
                <option key={c.code} value={c.dial}>{c.dial}</option>
              ))}
            </select>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel-national"
              pattern="[0-9 ()\-]{6,20}"
              maxLength={20}
            />
          </div>
        </div>
        <div className="field field--full">
          <label htmlFor="useCase">{d.useCase}</label>
          <textarea id="useCase" name="useCase" maxLength={2000} />
        </div>
        <label className="consent field--full">
          <input type="checkbox" name="consentData" required />
          <span>
            {privacyBefore}
            <a href={`/${locale}/privacy`} target="_blank" rel="noopener">{d.privacyLink}</a>
            {privacyAfter}
          </span>
        </label>
        <label className="consent field--full">
          <input type="checkbox" name="consentWhatsapp" required />
          <span>{d.consentWhatsapp}</span>
        </label>
      </div>

      <div className="form-actions">
        {turnstileSiteKey && (
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-language={locale} />
        )}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "sending"}>
          {status === "sending" ? d.submitting : d.submit}
        </button>
      </div>
    </form>
  );
}
