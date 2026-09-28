"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { formatPlanPrice, type PlanId } from "@/lib/pricing";
import { CheckIcon } from "./icons";

const ORDER: PlanId[] = ["starter", "pro", "enterprise"];

type Props = { t: Dictionary; locale: Locale; planHrefs: Record<PlanId, string> };

export default function Pricing({ t, planHrefs }: Props) {
  const [yearly, setYearly] = useState(false);
  const p = t.pricing;

  return (
    <section id="pricing" className="section section--white">
      <div className="container pricing">
        <div className="section-head section-head--center">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="h2">{p.title}</h2>
        </div>

        <div className="billing-toggle" role="group" aria-label={`${p.monthly} / ${p.yearly}`}>
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>{p.monthly}</button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>{p.yearly}</button>
        </div>

        <div className="grid grid--3 pricing__grid">
          {ORDER.map((id) => {
            const plan = p.plans[id];
            const featured = id === "pro";
            return (
              <div key={id} className={`plan${featured ? " plan--featured" : ""}`}>
                {featured && <span className="plan__badge">{p.mostPopular}</span>}
                <div className="plan__head">
                  <h3 className="plan__name">{plan.name}</h3>
                  <span className="plan__tagline">{plan.tagline}</span>
                </div>
                <div className="plan__price" aria-live="polite">
                  <span className="plan__amount">{formatPlanPrice(id, yearly)}</span>
                  <span className="plan__per">{yearly ? p.perMonthYearly : p.perMonth}</span>
                </div>
                <a href={planHrefs[id]} className={`btn btn--block ${featured ? "btn--primary" : "btn--outline"}`}>{plan.cta}</a>
                <ul className="plan__features">
                  {plan.features.map((f) => (
                    <li key={f}><CheckIcon size={16} className="plan__check" />{f}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="pricing__note">{p.metaNote}</p>
      </div>
    </section>
  );
}
