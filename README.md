# Celeste Fard — Site officiel

Site vitrine **multi-pages** pour l’artiste **Celeste Fard** (univers *pop couture* / storytelling, musique, shorts, shop, contact). Projet **[Next.js](https://nextjs.org) (App Router)** avec styles **CSS globaux** (sans framework UI imposé), pensé pour une expérience **desktop et mobile** soignée.

---

## Sommaire

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation et scripts](#installation-et-scripts)
- [Structure du dépôt](#structure-du-dépôt)
- [Pages et navigation](#pages-et-navigation)
- [Contenu et médias](#contenu-et-médias)
- [Configuration](#configuration)
- [Comportement UI (effets, accessibilité)](#comportement-ui-effets-accessibilité)
- [Déploiement](#déploiement)
- [Pistes d’évolution](#pistes-dévolution)

---

## Aperçu

- **Storytelling** et identité visuelle (dégradés, typographie, cartes *glass*).
- **Lecteur audio** sur la page musique (pistes définies dans le code + démos hébergées en externe).
- **Galerie** type carrousel horizontal (scroll tactile optimisé).
- **Barre de navigation** : *sticky* en haut, **menu mobile** en tiroir (thème sombre, repères numérotés) pour éviter l’effet « liste de réglages » générique.
- **Effets** : révélation au scroll, curseur cœur sur pointeur fin (désactivé si l’utilisateur demande moins d’animation).

---

## Stack technique

| Outil        | Rôle |
|-------------|------|
| **Next.js 16** | Framework React, App Router, rendu statique des pages listées. |
| **React 19**  | Composants client (`"use client"`) pour la nav, le lecteur, les effets. |
| **TypeScript** | Typage des contenus et des composants. |
| **ESLint** (`eslint-config-next`) | Qualité de code. |
| **Tailwind CSS 4** | Présent en *devDependencies* (postcss) — le design principal repose sur **`app/globals.css`**. |

Polices (via `next/font`) : **Nunito** (corps), **Cormorant Garamond** (titres).

---

## Prérequis

- **Node.js** (idéalement LTS 20 ou 22).
- **npm** (ou `pnpm` / `yarn` si tu adaptes les commandes).

---

## Installation et scripts

```bash
# Cloner (remplace par l’URL de ton dépôt)
git clone <url-du-depot>
cd celeste-fard

# Installer les dépendances
npm install
```

| Commande      | Description |
|---------------|-------------|
| `npm run dev` | Serveur de dev : [http://localhost:3000](http://localhost:3000) (hot reload). |
| `npm run build` | Build de production (vérification TypeScript incluse). |
| `npm run start` | Lance le build localement (après `build`). |
| `npm run lint`  | ESLint sur le projet. |

Avant un commit ou un déploiement, il est recommandé d’enchaîner :

```bash
npm run lint && npm run build
```

---

## Structure du dépôt

```
celeste-fard/
├── app/
│   ├── layout.tsx          # Shell : header, footer, polices, effets globaux
│   ├── page.tsx            # Accueil (hero, intro, métriques, carrousel…)
│   ├── globals.css         # Styles globaux, responsive, menu mobile
│   ├── story/page.tsx
│   ├── music/page.tsx
│   ├── shorts/page.tsx
│   ├── shop/page.tsx
│   ├── contact/page.tsx
│   └── shared/             # Composants et données partagés
│       ├── main-nav.tsx
│       ├── content.ts      # Pistes, sorties, photos, textes…
│       ├── audio-player.tsx
│       ├── photo-carousel.tsx
│       └── interactive-effects.tsx
├── public/
│   ├── audio/              # Fichiers audio locaux (à placer ici si besoin)
│   └── …
├── next.config.ts
├── package.json
└── README.md
```

---

## Pages et navigation

| Route      | Fichier            | Contenu (indicatif) |
|-----------|--------------------|----------------------|
| `/`       | `app/page.tsx`     | Accueil, hero, cartes, galerie photos. |
| `/story`  | `app/story/page.tsx` | Récit / univers. |
| `/music`  | `app/music/page.tsx` | Pistes, lecteur, discographie. |
| `/shorts` | `app/shorts/page.tsx` | Mise en avant des formats courts. |
| `/shop`   | `app/shop/page.tsx`  | Boutique (présentation). |
| `/contact`| `app/contact/page.tsx` | Formulaire / coordonnées. |

La liste des liens du menu est centralisée dans **`app/shared/main-nav.tsx`**.

---

## Contenu et médias

- **Textes, titres, URLs de covers, durées, langues** : voir **`app/shared/content.ts`** (types `Track`, `Release`, `Photo`, etc.).
- **Images distantes** : certaines couvertures / photos utilisent **Unsplash** ; le domaine est autorisé dans `next.config.ts` (voir ci-dessous).
- **Audio** :
  - Les pistes d’exemple peuvent pointer vers des **URLs externes** (fichier de démo).
  - Pour héberger les fichiers dans le site : placer les MP3 (ou autre) sous **`public/audio/`** et référencer les chemins du type `/audio/nom-du-fichier.mp3` dans `content.ts`.

---

## Configuration

### Images (`next.config.ts`)

Les images **`next/image`** ne chargent des domaines externes que s’ils sont déclarés. Actuellement :

- `images.unsplash.com` (HTTPS)

Pour ajouter un autre hôte (CDN, bucket), étendre `images.remotePatterns`.

### Variables d’environnement

Aucune variable obligatoire pour le fonctionnement de base. Si tu ajoutes des API (formulaire, analytics, CMS), crée un fichier **`.env.local`** (non versionné) et documente les clés ici ou dans un wiki d’équipe.

---

## Comportement UI (effets, accessibilité)

- **`InteractiveEffects`** (`app/shared/interactive-effects.tsx`) :
  - ajoute la classe `reveal-on-scroll` sur les blocs concernés ;
  - utilise un **IntersectionObserver** pour la classe `revealed` (sauf si `prefers-reduced-motion: reduce`, auquel cas le contenu reste visible sans animation) ;
  - gère le **curseur cœur** sur desktop (pointeur fin).
- **Navigation mobile** : bouton menu avec `aria-expanded`, `aria-controls`, fermeture clavier (**Échap**), fond assombri cliquable, hauteur du header synchronisée (`ResizeObserver`) pour aligner le tiroir sous la barre sticky.
- **Carrousel photos** : `touch-action: pan-x` et `overscroll-behavior` pour favoriser le défilement horizontal sans « tirer » la page verticalement par erreur.

---

## Déploiement

Le projet est conçu pour un hébergement **Node** compatible Next (ex. **[Vercel](https://vercel.com)**) :

1. Connecter le dépôt Git (branche `main` ou celle utilisée en prod).
2. Build : `next build` ; commande de démarrage : `next start` (ou laisser Vercel détecter Next.js).
3. Vérifier que les **domaines d’images** et les **sources audio** sont accessibles depuis l’environnement de prod (HTTPS recommandé).

---

## Pistes d’évolution

- Brancher un **CMS** ou des **fichiers markdown** pour les textes longs.
- Remplacer les **démos audio** par les masters définitifs dans `public/audio/`.
- **Formulaire contact** : action serveur (Route Handler + envoi mail ou service tiers).
- **SEO** : métadonnées par page (`metadata` / `generateMetadata`), Open Graph, JSON-LD pour artiste.

---

## Licence et crédits

Projet **privé** — contenu, visuels et musique soumis aux droits de leurs auteurs.  
Stack open-source : Next.js, React (voir licences respectives sur leurs dépôts).

---

*README mis à jour pour refléter l’état actuel du codebase (structure, scripts, configuration).*
