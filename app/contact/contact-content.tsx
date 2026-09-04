"use client";

import Link from "next/link";

import { useT } from "../shared/lang";
import { LEGAL } from "../shared/legal-info";
import { TContact } from "./contact-textes";

/**
 * CONTENU DE LA PAGE CONTACT — composant CLIENT.
 *
 * Pourquoi ce fichier existe : `useT()` est un hook, il ne peut donc
 * vivre que dans un composant client. Or `export const metadata` n'est
 * lu par Next QUE dans un composant serveur. Les deux ne peuvent pas
 * cohabiter dans le meme fichier — d'ou la separation page.tsx (serveur,
 * metadonnees) / *-content.tsx (client, JSX traduit).
 *
 * C'est le motif applique a toutes les pages secondaires du site.
 */

const EMAIL_MANAGEMENT = "management@celestefard.com";
const EMAIL_PRESSE = "press@celestefard.com";

export function ContactContent() {
  const t = useT();

  return (
    <div className="page-wrap">
      <section className="hero">
        <p className="eyebrow">{t(TContact.eyebrow)}</p>
        <h1>
          {t(TContact.titre1)}{" "}
          <span className="pop">{t(TContact.titre2)}</span>
        </h1>
        <p className="lede">{t(TContact.lede)}</p>
      </section>

      <section className="section section--tight">
        <div className="contact-panel">
          <form
            className="contact-form"
            action={`mailto:${EMAIL_MANAGEMENT}`}
            method="post"
            encType="text/plain"
          >
            <label htmlFor="name">{t(TContact.labelNom)}</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={t(TContact.placeholderNom)}
              required
            />

            <label htmlFor="email">{t(TContact.labelEmail)}</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t(TContact.placeholderEmail)}
              required
            />

            <label htmlFor="message">{t(TContact.labelMessage)}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t(TContact.placeholderMessage)}
              required
            />

            <button type="submit" className="btn btn--primary btn--block">
              {t(TContact.envoyer)}
            </button>
          </form>
        </div>

        <div className="contact-links">
          <p>
            {t(TContact.management)}&nbsp;: {EMAIL_MANAGEMENT}
          </p>
          <p>
            {t(TContact.presse)}&nbsp;: {EMAIL_PRESSE}
          </p>
          {/* @celestefard n'etait qu'un texte mort : ni lien, ni cible. */}
          <p>
            {t(TContact.instagram)}&nbsp;:{" "}
            <a
              href={LEGAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {LEGAL.instagram.handle}
            </a>
          </p>
          {/* Acces a l'outil interne de generation. Volontairement discret et
              sans explication : la page elle-meme est protegee par mot de
              passe et exclue des moteurs de recherche. */}
          <p style={{ marginTop: "1.5rem", opacity: 0.45, fontSize: "0.8rem" }}>
            <Link href="/studio">{t(TContact.espaceEquipe)}</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
