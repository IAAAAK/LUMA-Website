"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { CloseIcon, MenuIcon } from "./icons";

type Props = { t: Dictionary; locale: Locale; otherHref: string; otherLocale: Locale; signInHref: string };

export default function SiteHeader({ t, locale, otherHref, otherLocale, signInHref }: Props) {
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;
  const links = [
    { href: `${home}#features`, label: t.nav.product },
    { href: `${home}#how`, label: t.nav.how },
    { href: `${home}#integrations`, label: t.nav.integrations },
    { href: `${home}#pricing`, label: t.nav.pricing },
    { href: `${home}#faq`, label: t.nav.faq },
  ];
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <a href={home} aria-label={t.nav.homeLabel} className="site-header__logo">
          <img src="/logos/luma-wordmark-white-web.png" alt="LUMA — Engage, Automate, Grow" width={165} height={50} />
        </a>
        <nav className="site-header__nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="site-header__actions">
          <a href={otherHref} lang={otherLocale} hrefLang={otherLocale} className="site-header__lang">{t.nav.switchLabel}</a>
          <a href={signInHref} className="site-header__signin">{t.nav.signIn}</a>
          <a href={`/${locale}/demo`} className="btn btn--primary btn--sm">{t.nav.bookDemo}</a>
        </div>
        <button
          type="button"
          className="site-header__toggle"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a href={signInHref} onClick={close}>{t.nav.signIn}</a>
        <a href={otherHref} lang={otherLocale} hrefLang={otherLocale} className="site-header__lang">{t.nav.switchLabel}</a>
        <a href={`/${locale}/demo`} className="btn btn--primary" onClick={close}>{t.nav.bookDemo}</a>
      </div>
    </header>
  );
}
