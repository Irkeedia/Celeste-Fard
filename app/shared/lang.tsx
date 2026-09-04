"use client";

/**
 * BASCULE DE LANGUE — français / anglais, sans changer d'URL.
 *
 * Choix assume : une seule URL, le texte bascule en place. C'est le plus
 * simple a maintenir et aucun lien existant ne casse. Contrepartie a
 * connaitre : les moteurs de recherche n'indexent que la version servie
 * par defaut — depuis septembre 2026, l'ANGLAIS. Si le francais doit
 * etre reference a nouveau, il faudra passer a de vraies routes /fr et
 * /en (avec balises hreflang).
 *
 * IMPLEMENTATION — `useSyncExternalStore` plutot qu'un `useState` peuple
 * dans un effet. Le serveur ne connait ni localStorage ni la langue du
 * navigateur : il doit rendre une langue fixe, et le client peut
 * afficher autre chose. C'est exactement le cas que cette API resout, en
 * distinguant l'instantane serveur de l'instantane client — sans effet
 * qui declenche un second rendu en cascade.
 *
 * La langue vit donc dans une variable de module, pas dans un composant :
 * elle est lue par tous les abonnes et survit aux remontages.
 */

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

export type Lang = "fr" | "en";

const STORAGE_KEY = "celeste-lang";

/* ---------------------------------------------------------------
   Magasin externe
   --------------------------------------------------------------- */

let langueCourante: Lang | null = null;
const abonnes = new Set<() => void>();

function lirePreference(): Lang {
  try {
    const enregistree = window.localStorage.getItem(STORAGE_KEY);
    if (enregistree === "fr" || enregistree === "en") return enregistree;
  } catch {
    // localStorage indisponible (navigation privee stricte) : on ignore.
  }
  // Premier passage : la langue du navigateur decide. L'anglais etant
  // desormais la langue servie, c'est le visiteur FRANCOPHONE qui bascule
  // au montage — l'anglophone, lui, ne voit aucun changement.
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function instantaneClient(): Lang {
  if (langueCourante === null) {
    langueCourante = lirePreference();
    // L'attribut lang du document doit suivre : il renseigne les lecteurs
    // d'ecran et la synthese vocale sur la langue reellement affichee.
    document.documentElement.lang = langueCourante;
  }
  return langueCourante;
}

/**
 * Le serveur rend toujours l'ANGLAIS : c'est le HTML de reference, celui
 * que les moteurs de recherche indexent.
 *
 * Consequence assumee (cf. en-tete) : avec une seule URL pour les deux
 * langues, seule la version servie ici est referencee. Le francais reste
 * parfaitement accessible aux visiteurs — `lirePreference()` bascule un
 * navigateur francophone des le montage client — mais il n'est plus
 * indexe. C'est le choix fait avec Mathieu : garder l'architecture a une
 * seule URL plutot que migrer vers de vraies routes /fr et /en.
 */
function instantaneServeur(): Lang {
  return "en";
}

function sAbonner(callback: () => void) {
  abonnes.add(callback);
  return () => abonnes.delete(callback);
}

function definirLangue(l: Lang) {
  if (l === langueCourante) return;
  langueCourante = l;
  document.documentElement.lang = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    // Sans stockage, le choix vaut pour la visite en cours seulement.
  }
  abonnes.forEach((cb) => cb());
}

/* ---------------------------------------------------------------
   Contexte
   --------------------------------------------------------------- */

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(sAbonner, instantaneClient, instantaneServeur);

  const setLang = useCallback((l: Lang) => definirLangue(l), []);
  const toggle = useCallback(() => definirLangue(lang === "fr" ? "en" : "fr"), [lang]);

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  // Repli sur le francais : un composant utilise hors du provider doit
  // afficher quelque chose plutot que planter.
  return ctx ?? { lang: "fr", setLang: () => {}, toggle: () => {} };
}

/** Paire de textes. `t(x)` rend la version dans la langue courante. */
export type Bi = { fr: string; en: string };

/**
 * Raccourci de lecture : `const t = useT(); t(T.hero.lede)`.
 * Retourne une fonction, pour que le composant se remette a jour quand
 * la langue change.
 */
export function useT() {
  const { lang } = useLang();
  return useCallback((paire: Bi) => paire[lang], [lang]);
}
