import type { Dictionary, Locale } from "@/lib/i18n";
import { TOP_UP_PACKS } from "@/lib/pricing";
import Calculator from "./Calculator";
import { BoltIcon, PlusCircleIcon } from "./icons";

export default function Credits({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.credits;
  return (
    <section id="credits" className="section section--light">
      <div className="container credits">
        <div className="section-head section-head--split">
          <div className="section-head__title">
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 className="h2">{c.title}</h2>
          </div>
          <p className="section-head__lead">{c.lead}</p>
        </div>

        <div className="callout callout--green">
          <PlusCircleIcon size={22} className="callout__icon" />
          <p>
            <strong>{c.topUpCallout.strong}</strong> {c.topUpCallout.before} <strong>{c.topUpCallout.offer}</strong>{" "}
            {c.topUpCallout.after}
          </p>
        </div>

        <div className="callout callout--blue">
          <span className="callout__badge"><BoltIcon size={16} /></span>
          <p>
            <strong>{c.whatCallout.strong}</strong> {c.whatCallout.before} <strong>{c.whatCallout.rate}</strong>{" "}
            {c.whatCallout.after}
          </p>
        </div>

        <div className="grid grid--4 stats">
          {c.stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        <Calculator t={t} locale={locale} />

        <div className="packs">
          <div className="packs__head">
            <h3 className="packs__title">{c.packs.title}</h3>
            <span className="packs__note">{c.packs.note}</span>
          </div>
          <div className="packs__grid">
            {TOP_UP_PACKS.map((p) => (
              <div key={p.credits} className="pack">
                <span className="pack__credits">{p.credits}</span>
                <span className="pack__price">${p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
