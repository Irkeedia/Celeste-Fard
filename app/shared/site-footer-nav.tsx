"use client";

/**
 * Navigation de pied de page — bilingue.
 *
 * Isolee dans son propre composant client : le layout reste un composant
 * serveur, seul ce fragment a besoin de connaitre la langue.
 */

import Link from "next/link";

import { InstagramLink } from "./instagram-link";
import { useT } from "./lang";
import { T } from "./textes";
import { TA11y } from "./textes-a11y";

const LIENS = [
  { href: "/music", label: T.nav.musique },
  { href: "/shop", label: T.nav.shop },
  { href: "/contact", label: T.nav.contact },
  { href: "/mentions-legales", label: TA11y.mentionsLegales },
  { href: "/cgu", label: TA11y.cgu },
];

export function SiteFooterNav() {
  const t = useT();
  return (
    <nav className="site-footer-nav" aria-label={t(TA11y.piedDePageNav)}>
      {LIENS.map((l) => (
        <Link key={l.href} href={l.href}>
          {t(l.label)}
        </Link>
      ))}
      {/* Lien SORTANT : il ferme la liste plutot que de s'y fondre, toutes
          les autres entrees etant internes au site. */}
      <InstagramLink variant="inline" />
    </nav>
  );
}
