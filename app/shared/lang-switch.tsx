"use client";

/**
 * Bouton de bascule FR / EN.
 *
 * Il affiche la langue vers laquelle on va, pas celle en cours : c'est ce
 * que le visiteur cherche du regard. Le libelle visible est donc "English"
 * quand on lit du francais.
 */

import { useLang } from "./lang";
import { T } from "./textes";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, toggle } = useLang();

  return (
    <button
      type="button"
      className={`lang-switch ${className}`}
      onClick={toggle}
      aria-label={T.commun.langueAria[lang]}
      title={T.commun.langueAria[lang]}
    >
      <span className={`lang-switch-code ${lang === "fr" ? "is-on" : ""}`}>FR</span>
      <span className="lang-switch-sep" aria-hidden="true" />
      <span className={`lang-switch-code ${lang === "en" ? "is-on" : ""}`}>EN</span>
    </button>
  );
}
