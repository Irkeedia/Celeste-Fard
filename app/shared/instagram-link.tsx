"use client";

import { useT } from "./lang";
import { LEGAL } from "./legal-info";
import { T } from "./textes";
import styles from "./instagram-link.module.css";

/**
 * LIEN INSTAGRAM — mis en evidence dans l'en-tete, sur toutes les pages.
 *
 * Avant, le compte n'existait sur le site que sous forme de TEXTE mort
 * ("Instagram : @celestefard" sur la page contact) : il n'etait meme pas
 * cliquable. C'est pourtant la seule adresse ou Celeste publie
 * quotidiennement.
 *
 * Le style vit dans un CSS Module et non dans `globals.css`, que l'en-tete
 * de ce dernier demande explicitement de ne pas modifier.
 *
 * `variant` :
 * - "header"  pilule accentuee, dans la barre du haut. Le libelle se
 *             replie sur mobile, l'icone seule reste (cf. le module CSS).
 * - "inline"  lien discret souligne, pour le tiroir mobile et le pied de
 *             page, ou une pilule rouge de plus ferait redondance.
 */

export function InstagramLink({
  variant = "header",
}: {
  variant?: "header" | "inline";
}) {
  const t = useT();

  return (
    <a
      href={LEGAL.instagram.url}
      /* Lien sortant : `noopener` coupe l'acces a `window.opener` depuis
         l'onglet ouvert, `noreferrer` evite de fuiter la page d'origine. */
      target="_blank"
      rel="noopener noreferrer"
      className={variant === "header" ? styles.header : styles.inline}
      /* Le libelle visible ("Suivre") ne dit ni le reseau ni le compte, et
         il disparait meme sur petit ecran : l'`aria-label` porte donc
         l'information complete pour les lecteurs d'ecran. */
      aria-label={t(T.marque.instagramAria)}
    >
      <Icone />
      <span className={styles.label}>{t(T.marque.instagramSuivre)}</span>
    </a>
  );
}

/** Glyphe Instagram : appareil photo stylise, trace en `currentColor`. */
function Icone() {
  return (
    <svg
      className={styles.icone}
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.4" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
