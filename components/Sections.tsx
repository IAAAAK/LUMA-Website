// Static homepage sections (server components).
import type { Dictionary, Locale } from "@/lib/i18n";
import { ArrowIcon, CheckIcon, ChevronIcon, FEATURE_ICONS } from "./icons";

export function TrustStrip({ t }: { t: Dictionary }) {
  return (
    <section className="trust">
      <div className="container trust__inner">
        <span className="trust__label">{t.trust.label}</span>
        <div className="trust__logos">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="trust__logo">{t.trust.placeholder}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features({ t }: { t: Dictionary }) {
  const f = t.features;
  return (
    <section id="features" className="section section--light">
      <div className="container">
        <div className="section-head section-head--split">
          <div className="section-head__title">
            <span className="eyebrow">{f.eyebrow}</span>
            <h2 className="h2">{f.title}</h2>
          </div>
          <p className="section-head__lead">{f.lead}</p>
        </div>
        <div className="grid grid--3">
          {f.items.map((item, i) => (
            <div key={item.title} className="card feature">
              <div className="feature__icon">{FEATURE_ICONS[i]}</div>
              <h3 className="h3">{item.title}</h3>
              <p className="body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ t }: { t: Dictionary }) {
  return (
    <section id="how" className="section section--white">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">{t.how.eyebrow}</span>
          <h2 className="h2">{t.how.title}</h2>
        </div>
        <div className="grid grid--3">
          {t.how.steps.map((s, i) => (
            <div key={s.title} className={`step${i === t.how.steps.length - 1 ? " step--dark" : ""}`}>
              <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Integrations({ t }: { t: Dictionary }) {
  const g = t.integrations;
  const [erp, platform, customer] = g.flow;
  return (
    <section id="integrations" className="section section--dark">
      <div className="container integrations">
        <div className="integrations__copy">
          <span className="eyebrow eyebrow--dark">{g.eyebrow}</span>
          <h2 className="h2 h2--dark">{g.title}</h2>
          <p className="lead-dark">{g.lead}</p>
          <ul className="check-list">
            {g.list.map((item) => (
              <li key={item}><CheckIcon size={18} className="accent" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="flow">
          <div className="flow__box">
            <span className="flow__label">{erp.label}</span>
            <span className="flow__title">{erp.title}</span>
            <span className="flow__note">{erp.note}</span>
          </div>
          <ArrowIcon className="flow__arrow" />
          <div className="flow__box flow__box--accent">
            <span className="flow__label">{platform.label}</span>
            <img src="/logos/luma-hex-icon.png" alt={platform.title} width={52} height={52} />
            <span className="flow__note">{platform.note}</span>
          </div>
          <ArrowIcon className="flow__arrow" />
          <div className="flow__box">
            <span className="flow__label">{customer.label}</span>
            <span className="flow__title">{customer.title}</span>
            <span className="flow__note">{customer.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UseCases({ t }: { t: Dictionary }) {
  return (
    <section className="section section--light">
      <div className="container">
        <h2 className="h2 use-cases__title">{t.useCases.title}</h2>
        <div className="grid grid--4">
          {t.useCases.items.map((u) => (
            <div key={u.title} className="card use-case">
              <h3 className="use-case__title">{u.title}</h3>
              <p className="use-case__body">{u.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq({ t }: { t: Dictionary }) {
  return (
    <section id="faq" className="section section--white section--tight">
      <div className="container faq">
        <h2 className="h2 faq__title">{t.faq.title}</h2>
        <div className="faq__list">
          {t.faq.items.map((item, i) => (
            <details key={item.q} className="faq__item" open={i === 0}>
              <summary>
                <span>{item.q}</span>
                <ChevronIcon size={20} className="faq__chevron" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ t, locale, whatsapp }: { t: Dictionary; locale: Locale; whatsapp: string | null }) {
  return (
    <section id="cta" className="section section--dark section--tight">
      <div className="container final-cta">
        <h2 className="h2 h2--dark final-cta__title">{t.cta.title}</h2>
        <p className="lead-dark">{t.cta.lead}</p>
        <div className="btn-row btn-row--center">
          <a href={`/${locale}/demo`} className="btn btn--primary btn--lg">{t.cta.primary}</a>
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">{t.cta.whatsapp}</a>
          )}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ t, locale }: { t: Dictionary; locale: Locale }) {
  const f = t.footer;
  const home = `/${locale}`;
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="/logos/luma-wordmark-white-web.png" alt="LUMA — Engage, Automate, Grow" width={238} height={72} />
          <p>{f.tagline}</p>
        </div>
        <div className="site-footer__cols">
          <div className="site-footer__col">
            <span className="site-footer__head">{f.product}</span>
            <a href={`${home}#features`}>{f.features}</a>
            <a href={`${home}#pricing`}>{f.pricing}</a>
            <a href={`${home}#integrations`}>{f.integrations}</a>
          </div>
          <div className="site-footer__col">
            <span className="site-footer__head">{f.company}</span>
            <span>{f.about}</span>
            <a href={`${home}/privacy`}>{f.privacy}</a>
            <a href={`${home}/terms`}>{f.terms}</a>
          </div>
          <div className="site-footer__col">
            <span className="site-footer__head">{f.contact}</span>
            <span>{f.email}</span>
            <span>{f.phone}</span>
            <span>{f.office}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
