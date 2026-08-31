"use client";

/**
 * Navigation de pied de page — bilingue.
 *
 * Isolee dans son propre composant client : le layout reste un composant
 * serveur, seul ce fragment a besoin de connaitre la langue.
 */

import Link from "next/link";

import { useT } from "./lang";
import { T } from "./textes";

const LIENS = [
  { href: "/music", label: T.nav.musique },
  { href: "/shop", label: T.nav.shop },
  { href: "/contact", label: T.nav.contact },
  { href: "/mentions-legales", label: { fr: "Mentions légales", en: "Legal notice" } },
  { href: "/cgu", label: { fr: "CGU", en: "Terms" } },
];

export function SiteFooterNav() {
  const t = useT();
  return (
    <nav className="site-footer-nav" aria-label={t({ fr: "Navigation de pied de page", en: "Footer navigation" })}>
      {LIENS.map((l) => (
        <Link key={l.href} href={l.href}>
          {t(l.label)}
        </Link>
      ))}
    </nav>
  );
}
