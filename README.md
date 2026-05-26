# Celeste Fard, site officiel

Site vitrine **multi-pages** pour l'artiste **Celeste Fard** : storytelling, musique, vidéos, galerie, shop et contact. Projet **[Next.js](https://nextjs.org) (App Router)** avec styles **CSS globaux** (`app/globals.css`), pensé pour une expérience **desktop et mobile** soignée.

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
- [Pistes d'évolution](#pistes-dévolution)

---

## Aperçu

- **Accueil** : hero split (texte glass + photo), styles musicaux (rap, dark pop, rock), lettre de Celeste, vidéos, galerie, moments fans, lecteur audio.
- **Storytelling** : univers de Celeste (25 ans, rousse naturelle, étudiante en sciences, Jenny, paradoxes assumés).
- **Musique** : lecteur audio avec choix Album 1 / Singles, playlist filtrable, couvertures.
- **Vidéos** : clips hébergés localement (remerciement, passion, bateau) avec miniatures.
- **Galerie** : carrousel horizontal (`PhotoCarousel2`) avec lightbox.
- **Shop & contact** : présentation produits et formulaire mailto.
- **Navigation** : barre sticky, menu mobile en tiroir (thème sombre, repères numérotés).
- **Effets** : révélation au scroll et curseur cœur sur desktop (désactivés ou allégés sur mobile / `prefers-reduced-motion`).

---

## Stack technique

| Outil        | Rôle |
|-------------|------|
| **Next.js 16** | Framework React, App Router. |
| **React 19**  | Composants client pour la nav, le lecteur, les effets. |
| **TypeScript** | Typage des contenus et des composants. |
| **ESLint** (`eslint-config-next`) | Qualité de code. |
| **Tailwind CSS 4** | Présent en *devDependencies* ; le design principal repose sur **`app/globals.css`**. |

Polices (via `next/font`) : **Nunito** (corps), **Cormorant Garamond** (titres).

---

## Prérequis

- **Node.js** (idéalement LTS 20 ou 22).
- **npm** (ou `pnpm` / `yarn` si tu adaptes les commandes).

---

## Installation et scripts

```bash
git clone https://github.com/Irkeedia/Celeste-Fard.git
cd celeste-fard

npm install
```

| Commande      | Description |
|---------------|-------------|
| `npm run dev` | Serveur de dev : [http://localhost:3000](http://localhost:3000). |
| `npm run dev -- -H 0.0.0.0 -p 3000` | Dev accessible sur le réseau local (test mobile). |
| `npm run build` | Build de production (vérification TypeScript incluse). |
| `npm run start` | Lance le build localement (après `build`). |
| `npm run lint`  | ESLint sur le projet. |

Avant un commit ou un déploiement :

```bash
npm run lint && npm run build
```

---

## Structure du dépôt

```
celeste-fard/
├── app/
│   ├── layout.tsx              # Shell : header, footer, polices, effets globaux
│   ├── page.tsx                # Accueil (hero, lettre, vidéos, galerie, lecteur…)
│   ├── globals.css             # Styles globaux, hero, responsive, menu mobile
│   ├── story/page.tsx          # Storytelling / univers
│   ├── music/page.tsx          # Discographie + lecteur
│   ├── shop/page.tsx           # Boutique (présentation)
│   ├── contact/page.tsx        # Formulaire / coordonnées
│   └── shared/
│       ├── main-nav.tsx        # Navigation desktop + tiroir mobile
│       ├── content.ts          # Albums, pistes, vidéos, photos, releases
│       ├── audio-player.tsx    # Lecteur audio (Album 1, Singles)
│       ├── video-section.tsx   # Sélecteur et lecture des clips
│       ├── photo-carousel-2.tsx# Galerie horizontale + lightbox
│       ├── interactive-effects.tsx
│       └── use-video-poster.ts # Poster vidéo côté client
├── public/
│   ├── audio/
│   │   └── album 1/            # MP3 de l'album (noms de fichiers réels)
│   ├── video/                  # Clips MP4 (remerciement, passion, bateau)
│   └── image/                  # Photos, hero, miniatures vidéo
├── next.config.ts
├── package.json
└── README.md
```

---

## Pages et navigation

| Route      | Fichier            | Contenu |
|-----------|--------------------|---------|
| `/`       | `app/page.tsx`     | Hero, métriques, lettre, scène, vidéos, galerie, fans, lecteur, releases. |
| `/story`  | `app/story/page.tsx` | Récit, Jenny, paradoxes, manifeste. |
| `/music`  | `app/music/page.tsx` | Albums, lecteur, visuels, releases. |
| `/shop`   | `app/shop/page.tsx`  | Produits (vinyle, CD, merch). |
| `/contact`| `app/contact/page.tsx` | Formulaire mailto + coordonnées. |

Les liens du menu sont centralisés dans **`app/shared/main-nav.tsx`**.

---

## Contenu et médias

Tout le contenu éditorial (textes, albums, pistes, vidéos, photos fans, releases) est dans **`app/shared/content.ts`**.

### Audio

- **Album 1** : fichiers dans `public/audio/album 1/`, déclarés dans `ALBUM_1_RAW`.
- **Singles** : archives / doubles prises dans `TRACKS_RAW`.
- Les chemins audio passent par `audioFromPublic()` avec normalisation **NFC** (accents dans les noms de fichiers).
- Les **titres affichés** et les **noms de fichiers** sont distincts : ne modifier que `title` dans `content.ts` si tu veux changer le libellé sans renommer le MP3.

### Vidéos

Clips sur la home (`homeVideos`) :

| ID            | Fichier                              | Poster                         |
|---------------|--------------------------------------|--------------------------------|
| remerciement  | `public/video/celestevideoderemerciement.mp4` | `public/image/miniaturevideomercie.png` |
| passion       | `public/video/celestevideopassion.mp4`        | `public/image/miniaturepassion.png`     |
| bateau        | `public/video/celestesitewebbateau.mp4`       | `public/image/miniaturebateau.png`      |

Pour ajouter un clip : déposer le MP4 dans `public/video/`, une miniature dans `public/image/`, puis compléter `homeVideos` dans `content.ts`.

### Images

- **Hero** : `public/image/Celestefardhero.png`
- **Galerie / fans / scène** : fichiers locaux dans `public/image/`
- **Couvertures album** : mix local + Unsplash (domaine autorisé dans `next.config.ts`)

### Ton éditorial

- Tutoiement, voix de Celeste (25 ans, rousse naturelle, sciences, Jenny, rap / dark pop / rock).
- Pas de tirets cadratins ni traits d'union dans les textes affichés (convention du site).

---

## Configuration

### Images (`next.config.ts`)

Domaine externe autorisé pour `next/image` :

- `images.unsplash.com` (HTTPS)

Pour un CDN ou bucket, étendre `images.remotePatterns`.

### Variables d'environnement

Aucune variable obligatoire pour le fonctionnement de base. Pour un formulaire serveur, analytics ou CMS : `.env.local` (non versionné).

---

## Comportement UI (effets, accessibilité)

- **`InteractiveEffects`** :
  - révélation au scroll (`reveal-on-scroll` / `revealed`) ;
  - désactivée sur mobile, tactile, ou si `prefers-reduced-motion: reduce` ;
  - curseur cœur sur desktop (pointeur fin).
- **Navigation mobile** : `aria-expanded`, fermeture Échap, backdrop, hauteur header via `ResizeObserver`.
- **Hero** : layout grid glass + photo, pills styles, métriques.
- **Lecteur audio** : sélection album, recherche, contrôles clavier, image scène optionnelle.
- **Carrousel photos** : scroll horizontal tactile, lightbox au clic.
- **Mobile** : pas de `backdrop-filter` lourd sur les panels, animations réduites pour les perfs.

---

## Déploiement

Hébergement **Node** compatible Next (ex. **[Vercel](https://vercel.com)**) :

1. Connecter le dépôt Git (branche `main`).
2. Build : `next build` ; démarrage : `next start`.
3. Vérifier l'accès HTTPS aux médias dans `public/` (audio, vidéo, images).

Les gros fichiers (MP4, MP3) sont versionnés dans `public/` : surveiller la taille du dépôt ou envisager un CDN si le trafic augmente.

---

## Pistes d'évolution

- Brancher un **CMS** ou des fichiers markdown pour les textes longs.
- **Formulaire contact** : Route Handler + envoi mail (Resend, etc.).
- **SEO** : métadonnées par page, Open Graph, JSON-LD artiste.
- **CDN** pour audio / vidéo si le repo devient trop lourd.

---

## Licence et crédits

Projet **privé** : contenu, visuels et musique soumis aux droits de leurs auteurs.  
Stack open-source : Next.js, React (licences respectives sur leurs dépôts).
