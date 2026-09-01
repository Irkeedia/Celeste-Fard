/**
 * AUTHENTIFICATION DU STUDIO — un seul mot de passe, aucun compte.
 *
 * Le studio appelle l'API Gemini avec la cle du projet : une page laissee
 * ouverte, c'est une facture ouverte a qui trouve l'URL. D'ou ce garde-fou.
 *
 * Pas de base de donnees ni de librairie : le cookie contient une date
 * d'expiration signee en HMAC avec le mot de passe lui-meme. Impossible a
 * forger sans connaitre le secret, et rien a stocker cote serveur.
 *
 * `httpOnly` : le cookie est invisible au JavaScript de la page, donc
 * inexploitable par une injection de script.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE = "celeste_studio";
const DUREE_MS = 30 * 24 * 60 * 60 * 1000; // 30 jours

function secret(): string {
  const s = process.env.STUDIO_PASSWORD;
  if (!s) throw new Error("STUDIO_PASSWORD absente de l'environnement");
  return s;
}

function signer(charge: string): string {
  return createHmac("sha256", secret()).update(charge).digest("hex");
}

/** Jeton `expiration.signature`, a poser en cookie. */
export function creerJeton(): string {
  const exp = String(Date.now() + DUREE_MS);
  return `${exp}.${signer(exp)}`;
}

export function jetonValide(jeton: string | undefined): boolean {
  if (!jeton) return false;
  const [exp, sig] = jeton.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;

  const attendue = signer(exp);
  // Comparaison a duree constante : une comparaison classique s'arrete au
  // premier caractere different et laisse deviner la signature octet par
  // octet en mesurant le temps de reponse.
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(attendue, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Comparaison du mot de passe saisi, elle aussi a duree constante. */
export function motDePasseCorrect(saisi: string): boolean {
  const attendu = secret();
  const a = Buffer.from(saisi);
  const b = Buffer.from(attendu);
  return a.length === b.length && timingSafeEqual(a, b);
}
