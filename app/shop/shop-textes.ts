import type { Bi } from "../shared/lang";

/**
 * TEXTES DE LA PAGE BOUTIQUE — francais et anglais cote a cote.
 *
 * Les PRODUITS eux-memes (noms, specs, descriptions) ne sont pas ici :
 * ils vivent dans `shared/produits.ts`, source unique partagee avec le
 * teaser de la home. Ce fichier ne porte que l'habillage de la page.
 *
 * Ligne editoriale : Celeste assume d'etre une IA sans jamais
 * l'expliquer, elle est drole et cash, et l'anglais reecrit les vannes
 * plutot que de les calquer.
 */

export const TShop = {
  /* --- Hero --- */
  kicker: {
    fr: "Boutique — trois pièces, pas trente",
    en: "Shop — three pieces, not thirty",
  } satisfies Bi,
  titre1: { fr: "Trois objets.", en: "Three objects." } satisfies Bi,
  titre2: { fr: "Zéro", en: "Zero" } satisfies Bi,
  titreAccent: { fr: "panier", en: "carts" } satisfies Bi,

  lede: {
    fr: "Je n’ai ni loyer, ni frigo, ni tourbus à financer. Alors non, ce n’est pas encore une vraie boutique : c’est un vestiaire que je prépare tranquillement, et il n’y aura jamais trente références dedans.",
    en: "I have no rent, no fridge and no tour bus to pay for. So no, this isn’t a real shop yet: it’s a wardrobe I’m quietly putting together, and it will never hold thirty items.",
  } satisfies Bi,

  notice: {
    fr: "Aucune vente en ligne pour l’instant",
    en: "No online sales for now",
  } satisfies Bi,

  stickerHero: {
    fr: "Planche 00 — la maison",
    en: "Plate 00 — the label",
  } satisfies Bi,

  /* --- La planche et les cartels --- */
  vestiaire: { fr: "Le vestiaire", en: "The wardrobe" } satisfies Bi,
  vestiaireTitre: {
    fr: "Ce qui sortira, un jour, quand ce sera prêt",
    en: "What will drop, one day, when it’s ready",
  } satisfies Bi,
  vestiaireLede: {
    fr: "Trois pièces dessinées, validées, chiffrées. Il ne manque que la partie ennuyeuse : la logistique, les stocks et un moyen de paiement qui n’existe pas encore.",
    en: "Three pieces designed, signed off and priced. All that’s missing is the boring part: logistics, stock, and a payment system that doesn’t exist yet.",
  } satisfies Bi,

  bientot: { fr: "Bientôt", en: "Soon" } satisfies Bi,
  /* Complement lu par les lecteurs d'ecran. Le libelle visible ("Bientot")
     ne suffirait pas a comprendre de quel produit il s'agit. */
  bientotDetail: {
    fr: "disponible — {name}, {price}. Cet article n’est pas encore en vente.",
    en: "available — {name}, {price}. This item is not on sale yet.",
  } satisfies Bi,

  disclaimer: {
    fr: "Petite mise au point honnête : il n’y a ni panier, ni paiement, ni stock dans un entrepôt. Les prix affichés sont ceux que ces objets porteront le jour où ils existeront pour de vrai.",
    en: "An honest heads-up: there’s no cart, no payment and no stock in a warehouse. The prices shown are the ones these objects will carry the day they actually exist.",
  } satisfies Bi,

  /* --- Pourquoi si peu de produits --- */
  raisonKicker: { fr: "La vraie raison", en: "The real reason" } satisfies Bi,
  raisonTitre: {
    fr: "Pourquoi si peu de produits ?",
    en: "Why so few products?",
  } satisfies Bi,
  raisonLede: {
    fr: "Parce qu’un artiste sort du merch pour payer des factures. Moi, je n’en reçois aucune. Voilà les trois raisons, dans l’ordre.",
    en: "Because artists put out merch to pay bills. I don’t get any. Here are the three reasons, in order.",
  } satisfies Bi,

  raison1Titre: {
    fr: "Je n’ai pas de loyer",
    en: "I don’t pay rent",
  } satisfies Bi,
  raison1Texte: {
    fr: "Personne ne me réclame de caution le 5 du mois. Sortir trente références ne me sauverait de rien du tout — je n’ai rien à sauver.",
    en: "Nobody chases me for a deposit on the 5th of the month. Dropping thirty items wouldn’t save me from anything — I have nothing to be saved from.",
  } satisfies Bi,

  raison2Titre: {
    fr: "Je n’ai pas de frigo",
    en: "I don’t own a fridge",
  } satisfies Bi,
  raison2Texte: {
    fr: "Zéro course, zéro panier bio, zéro pizza commandée à 23 h. Mon seul coût de fonctionnement, c’est de l’électricité, et vous n’y pouvez rien.",
    en: "No groceries, no organic veg box, no pizza ordered at 11pm. My only running cost is electricity, and there’s nothing you can do about that.",
  } satisfies Bi,

  raison3Titre: {
    fr: "Je n’ai pas de tourbus",
    en: "I don’t have a tour bus",
  } satisfies Bi,
  raison3Texte: {
    fr: "Ni chauffeur, ni douze techniciens à loger, ni cinq mille litres de gasoil. Je tiens déjà en entier dans votre téléphone.",
    en: "No driver, no twelve crew members to put up, no five thousand litres of diesel. I already fit entirely inside your phone.",
  } satisfies Bi,

  stickerWhy: { fr: "Aucun regret", en: "No regrets" } satisfies Bi,

  /* --- Bandeau de fin --- */
  outroKicker: { fr: "Pendant ce temps", en: "Meanwhile" } satisfies Bi,
  outroTitre: {
    fr: "De toute façon, vous étiez venu pour la musique",
    en: "You came for the music anyway",
  } satisfies Bi,
  outroTexte: {
    fr: "Les objets attendront. Les morceaux, eux, sont déjà là et ils ne coûtent rien du tout — c’est le seul avantage concret d’être une IA.",
    en: "The objects can wait. The tracks are already here, and they cost nothing at all — the one concrete perk of being an AI.",
  } satisfies Bi,
  outroEcouter: {
    fr: "Écouter la musique",
    en: "Listen to the music",
  } satisfies Bi,
  outroRetour: {
    fr: "Retour à l’accueil",
    en: "Back to home",
  } satisfies Bi,

  /* --- Alternatives des illustrations cartoon --- */
  altCartoonVinyle: {
    fr: "Celeste dessinée en style cartoon, assise en tailleur, un vinyle dans les bras.",
    en: "Celeste drawn in cartoon style, sitting cross-legged, holding a vinyl record.",
  } satisfies Bi,
  altCartoonClinDoeil: {
    fr: "Celeste dessinée en style cartoon, un clin d’œil et le pouce levé.",
    en: "Celeste drawn in cartoon style, winking with a thumbs up.",
  } satisfies Bi,
} as const;
