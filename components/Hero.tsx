import type { Dictionary, Locale } from "@/lib/i18n";
import { CheckIcon, HandoffIcon, SendIcon } from "./icons";

export default function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const h = t.hero;
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="pill">
            <span className="pill__dot" />
            {h.badge}
          </div>
          <h1 className="hero__title">{h.title}</h1>
          <p className="hero__lead">{h.lead}</p>
          <div className="btn-row">
            <a href={`/${locale}/demo`} className="btn btn--primary btn--lg">{h.primary}</a>
            <a href="#pricing" className="btn btn--ghost btn--lg">{h.secondary}</a>
          </div>
          <ul className="hero__checks">
            {h.checks.map((c) => (
              <li key={c}><CheckIcon size={16} className="accent" />{c}</li>
            ))}
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="phone">
            <div className="phone__head">
              <div className="phone__avatar"><img src="/logos/luma-hex-icon.png" alt="" width={24} height={24} /></div>
              <div className="phone__who">
                <span className="phone__name">{h.chat.name}</span>
                <span className="phone__status">{h.chat.status}</span>
              </div>
            </div>
            <div className="phone__body">
              {h.chat.messages.map((m, i) => (
                <div key={i} className={`bubble bubble--${m.from}`}>{m.text}</div>
              ))}
              <div className="phone__tag">{h.chat.qualified}</div>
            </div>
            <div className="phone__foot">
              <div className="phone__input">{h.chat.placeholder}</div>
              <div className="phone__send"><SendIcon size={18} /></div>
            </div>
          </div>

          <div className="float-card float-card--campaign">
            <span className="float-card__label">{h.campaign.label}</span>
            <span className="float-card__title">{h.campaign.title}</span>
            <div className="progress"><div className="progress__bar" style={{ width: "68%" }} /></div>
            <span className="float-card__note">{h.campaign.note}</span>
          </div>

          <div className="float-card float-card--handoff">
            <div className="float-card__icon"><HandoffIcon size={22} /></div>
            <div className="float-card__text">
              <span className="float-card__strong">{h.handoff.title}</span>
              <span className="float-card__note">{h.handoff.note}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
