"use client";

import Image from "next/image";
import Link from "next/link";

import { useT } from "./lang";
import { LEGAL } from "./legal-info";
import styles from "./site-brand.module.css";
import { T } from "./textes";

/**
 * MARQUE DU SHELL — en-tete et pied de page. Composants CLIENTS.
 *
 * Pourquoi ce fichier existe : ces trois blocs vivaient en dur dans
 * `layout.tsx`, qui est un composant SERVEUR (il exporte `metadata` et
 * monte le `LangProvider`). Leurs textes ne pouvaient donc pas basculer
 * de langue, et l'`aria-label` du logo de pied de page etait la fuite de
 * francais la plus large du site : elle etait presente sur TOUTES les
 * pages, y compris apres le passage a l'anglais par defaut.
 *
 * Meme raison que `SiteFooterNav`, deja extrait avant eux.
 */

/** Bloc de marque de l'en-tete : logo + nom + sous-titre. */
export function SiteBrand() {
  const t = useT();

  return (
    <Link href="/" className="brand-link">
      <span className="brand-logo-ring">
        {/* `alt=""` volontaire : le logo est purement decoratif ici, le nom
            est juste a cote en texte. L'annoncer serait redondant. */}
        <Image
          src="/logo_celeste.png"
          alt=""
          width={44}
          height={44}
          className="brand-logo"
          loading="eager"
        />
      </span>
      {/* Le bloc texte s'efface sous 560px pour degager le centre de la
          barre, ou vit la pilule Instagram (cf. le module CSS). */}
      <span className={`brand-link-copy ${styles.copy}`}>
        <span className="brand-link-text">CELESTE FARD</span>
        <span className="brand-link-sub">{t(T.marque.sousTitre)}</span>
      </span>
    </Link>
  );
}

/** Bloc de marque du pied de page : logo cliquable + nom + tagline. */
export function SiteFooterBrand() {
  const t = useT();

  return (
    <div className="site-footer-brand">
      <Link
        href="/"
        className="site-footer-logo-link"
        aria-label={t(T.marque.retourAccueil)}
      >
        <Image
          src="/logo_celeste.png"
          alt="Celeste Fard"
          width={52}
          height={52}
          className="brand-logo brand-logo--footer"
        />
      </Link>
      <p className="site-footer-wordmark">CELESTE FARD</p>
      <p className="site-footer-tagline u-micro">{t(T.marque.tagline)}</p>
    </div>
  );
}

/** Mention legale de pied de page, avec la mention de transparence IA. */
export function SiteFooterLegal() {
  const t = useT();

  /* `new Date()` cote client : le composant est monte au chargement, donc
     l'annee est celle du visiteur. C'etait deja le comportement quand ce
     bloc vivait dans le layout — il y etait simplement calcule au rendu
     serveur. Aucune consequence : le site est statique et redeploye. */
  const annee = new Date().getFullYear();

  return (
    <p className="site-footer-legal">
      © {annee} {LEGAL.editor} / {LEGAL.creator}. {t(T.marque.mentionIa)}
    </p>
  );
}
