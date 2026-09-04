"use client";

import Link from "next/link";

import { useLang, useT } from "../shared/lang";
import { LEGAL } from "../shared/legal-info";
import { TMentions } from "./mentions-textes";

/**
 * CONTENU DES MENTIONS LEGALES — composant CLIENT.
 *
 * Pourquoi ce fichier existe : `useT()` est un hook, il ne peut donc
 * vivre que dans un composant client. Or `export const metadata` n'est
 * lu par Next QUE dans un composant serveur. Les deux ne peuvent pas
 * cohabiter dans le meme fichier — d'ou la separation page.tsx (serveur,
 * metadonnees) / *-content.tsx (client, JSX traduit).
 *
 * C'est le motif applique a toutes les pages secondaires du site, pose
 * par `contact/contact-content.tsx`.
 *
 * SPECIFICITE DE CETTE PAGE — ce sont des mentions legales obligatoires
 * de droit francais (LCEN). Une traduction n'a aucune valeur juridique :
 * seule la version francaise fait foi. Un avertissement est donc affiche
 * en tete de page, UNIQUEMENT en anglais (d'ou le `useLang()` en plus du
 * `useT()` habituel).
 *
 * Les faits — raison sociale, editeur, directeur de la publication,
 * hebergeur, adresses, e-mail — ne sont jamais traduits : ils viennent
 * tels quels de `shared/legal-info.ts`, identiques dans les deux
 * langues.
 */

export function MentionsContent() {
  const t = useT();
  const { lang } = useLang();

  return (
    <div className="page-wrap legal-page">
      <section className="section-block">
        <p className="eyebrow">{t(TMentions.eyebrow)}</p>
        <h1>{t(TMentions.titre)}</h1>

        {/* Avertissement de non-valeur juridique de la traduction.
            Rendu seulement en anglais : en francais il n'aurait aucun
            sens, la version francaise etant celle qui fait foi. */}
        {lang === "en" && (
          <p className="legal-revision">
            <strong>{t(TMentions.avertissementTraduction)}</strong>
          </p>
        )}

        <p className="hero-copy">{t(TMentions.lede)}</p>
      </section>

      <section className="legal-stack">
        <article className="glass-panel legal-section">
          <p className="eyebrow">{t(TMentions.editeurEyebrow)}</p>
          <h2>{t(TMentions.editeurTitre)}</h2>
          <ul className="legal-list">
            <li>
              <strong>{t(TMentions.labelSite)}</strong> {LEGAL.siteName}
            </li>
            <li>
              <strong>{t(TMentions.labelUrl)}</strong>{" "}
              <a href={LEGAL.siteUrl} target="_blank" rel="noopener noreferrer">
                {LEGAL.siteUrl}
              </a>
            </li>
            <li>
              <strong>{t(TMentions.labelCreePar)}</strong> {LEGAL.creator}
            </li>
            <li>
              <strong>{t(TMentions.labelEditeurDuSite)}</strong> {LEGAL.editor}
            </li>
            <li>
              <strong>{t(TMentions.labelDirecteurPublication)}</strong> {LEGAL.editor}
            </li>
            <li>
              <strong>{t(TMentions.labelProprieteProjet)}</strong> {LEGAL.editor}
              {t(TMentions.proprieteNote)}
            </li>
            <li>
              <strong>{t(TMentions.labelContactLegal)}</strong>{" "}
              <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
            </li>
          </ul>
        </article>

        <article className="glass-panel legal-section legal-section--highlight">
          <p className="eyebrow">{t(TMentions.iaEyebrow)}</p>
          <h2>{t(TMentions.iaTitre)}</h2>
          <p>
            {t(TMentions.iaDeclarationDebut)}{" "}
            <strong>{t(TMentions.iaDeclarationFort)}</strong>
            {t(TMentions.iaDeclarationFin)}
          </p>
          <p>
            <strong>{t(TMentions.iaDefinitionFort)}</strong>
            {t(TMentions.iaDefinitionMilieu)}
            {LEGAL.editor}, via {LEGAL.creator}
            {t(TMentions.iaDefinitionFin)}
          </p>
          <p className="muted">{t(TMentions.iaPortee)}</p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">{t(TMentions.piEyebrow)}</p>
          <h2>{t(TMentions.piTitre)}</h2>
          <p>
            {t(TMentions.piDebut)} {LEGAL.siteName} {t(TMentions.piMilieu)}{" "}
            <strong>{LEGAL.editor}</strong>
            {t(TMentions.piFin)}
          </p>
          <p>{t(TMentions.piContrefacon)}</p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">{t(TMentions.hebergementEyebrow)}</p>
          <h2>{t(TMentions.hebergementTitre)}</h2>
          <ul className="legal-list">
            <li>
              <strong>{t(TMentions.labelHebergeur)}</strong> {LEGAL.host.name}
            </li>
            <li>
              <strong>{t(TMentions.labelAdresse)}</strong> {LEGAL.host.address}
            </li>
            <li>
              <strong>{t(TMentions.labelSite)}</strong>{" "}
              <a href={LEGAL.host.website} target="_blank" rel="noopener noreferrer">
                {LEGAL.host.website}
              </a>
            </li>
          </ul>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">{t(TMentions.donneesEyebrow)}</p>
          <h2>{t(TMentions.donneesTitre)}</h2>
          <p>{t(TMentions.donneesCollecte)}</p>
          <p>{t(TMentions.donneesCookies)}</p>
        </article>

        <article className="glass-panel legal-section">
          <p className="eyebrow">{t(TMentions.creditsEyebrow)}</p>
          <h2>{t(TMentions.creditsTitre)}</h2>
          <p>
            {t(TMentions.creditsDebut)} <strong>{LEGAL.creator}</strong>
            {t(TMentions.creditsMilieu)} <strong>{LEGAL.editor}</strong>
            {t(TMentions.creditsFin)}
          </p>
        </article>
      </section>

      <p className="legal-back muted">
        {t(TMentions.retourTexte)}{" "}
        <Link href="/cgu">{t(TMentions.retourLien)}</Link>.
      </p>
    </div>
  );
}
