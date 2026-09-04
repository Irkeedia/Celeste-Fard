"use client";

import Link from "next/link";

import { useLang, useT } from "../shared/lang";
import { LEGAL } from "../shared/legal-info";
import { TCgu } from "./cgu-textes";

/**
 * CONTENU DES CGU — composant CLIENT.
 *
 * Pourquoi ce fichier existe : `useT()` est un hook, il ne peut donc
 * vivre que dans un composant client. Or `export const metadata` n'est
 * lu par Next QUE dans un composant serveur. Les deux ne peuvent pas
 * cohabiter dans le meme fichier — d'ou la separation page.tsx (serveur,
 * metadonnees) / *-content.tsx (client, JSX traduit).
 *
 * C'est le motif applique a toutes les pages secondaires du site
 * (cf. `contact/contact-content.tsx`).
 *
 * Les eyebrows « ARTICLE 1 » a « ARTICLE 10 » restent en dur : le mot
 * est identique dans les deux langues, une paire `Bi` par article
 * n'apporterait que du bruit.
 */

export function CguContent() {
  const t = useT();
  const { lang } = useLang();

  return (
    <div className="page-wrap legal-page">
      <section className="section-block">
        <p className="eyebrow">{t(TCgu.eyebrow)}</p>
        <h1>{t(TCgu.titre)}</h1>

        {/* Avertissement de non-valeur juridique de la traduction.
            Rendu seulement en anglais : en francais il n'aurait aucun
            sens, la version francaise etant celle qui fait foi.
            Meme placement et meme habillage que sur la page des
            mentions legales, pour que les deux pages legales se
            comportent pareil. */}
        {lang === "en" && (
          <p className="legal-revision">
            <strong>{t(TCgu.avertissementTraduction)}</strong>
          </p>
        )}

        <p className="hero-copy">{t(TCgu.lede)}</p>
      </section>

      <section className="legal-stack">
        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 1</p>
          <h2>{t(TCgu.a1titre)}</h2>
          <p>
            {t(TCgu.a1p1a)} <strong>{LEGAL.siteName}</strong> ({LEGAL.siteUrl}){" "}
            {t(TCgu.a1p1b)} <strong>{LEGAL.editor}</strong>, {t(TCgu.a1p1c)}{" "}
            <strong>{LEGAL.creator}</strong>. {t(TCgu.a1p1d)}
          </p>
          <p>{t(TCgu.a1p2)}</p>
        </article>

        <article className="glass-panel legal-section legal-section--highlight">
          <p className="eyebrow">ARTICLE 2</p>
          <h2>{t(TCgu.a2titre)}</h2>
          <p>
            {t(TCgu.a2p1a)} <strong>{t(TCgu.a2p1fort)}</strong>. {t(TCgu.a2p1b)}
          </p>
          <p>
            <strong>{t(TCgu.a2p2terme)}</strong>
            {t(TCgu.deuxPoints)} {t(TCgu.a2p2)}
          </p>
          <p className="muted">{t(TCgu.a2p3)}</p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 3</p>
          <h2>{t(TCgu.a3titre)}</h2>
          <p>
            {t(TCgu.a3p1a)} {LEGAL.creator} {t(TCgu.et)} {LEGAL.editor}{" "}
            {t(TCgu.a3p1b)}
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 4</p>
          <h2>{t(TCgu.a4titre)}</h2>
          <p>
            {t(TCgu.a4p1)} <strong>{LEGAL.editor}</strong>.
          </p>
          <p>{t(TCgu.a4p2)}</p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 5</p>
          <h2>{t(TCgu.a5titre)}</h2>
          <p>
            {t(TCgu.a5intro)}
            {t(TCgu.deuxPoints)}
          </p>
          <ul className="legal-list">
            <li>
              {t(TCgu.a5li1)}
              {t(TCgu.pointVirgule)}
            </li>
            <li>
              {t(TCgu.a5li2)}
              {t(TCgu.pointVirgule)}
            </li>
            <li>
              {t(TCgu.a5li3)} {LEGAL.editor}
              {t(TCgu.pointVirgule)}
            </li>
            <li>{t(TCgu.a5li4)}</li>
          </ul>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 6</p>
          <h2>{t(TCgu.a6titre)}</h2>
          <p>
            {t(TCgu.a6p1a)} <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>{" "}
            {t(TCgu.a6p1b)}
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 7</p>
          <h2>{t(TCgu.a7titre)}</h2>
          <p>{t(TCgu.a7p1)}</p>
          <p>
            {LEGAL.editor} {t(TCgu.et)} {LEGAL.creator} {t(TCgu.a7p2)}
          </p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 8</p>
          <h2>{t(TCgu.a8titre)}</h2>
          <p>{t(TCgu.a8p1)}</p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 9</p>
          <h2>{t(TCgu.a9titre)}</h2>
          <p>{t(TCgu.a9p1)}</p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">ARTICLE 10</p>
          <h2>{t(TCgu.a10titre)}</h2>
          <p>{t(TCgu.a10p1)}</p>
          <p>
            {t(TCgu.a10p2)}
            {t(TCgu.deuxPoints)}{" "}
            <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
          </p>
          <p className="muted legal-revision">{t(TCgu.a10revision)}</p>
        </article>
      </section>

      <p className="legal-back muted">
        {t(TCgu.retourA)}{" "}
        <Link href="/mentions-legales">{t(TCgu.retourLien)}</Link>.
      </p>
    </div>
  );
}
