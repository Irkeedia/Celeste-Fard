# Celeste Fard

Site officiel de Celeste Fard, chanteuse IA. Next.js 16 (App Router),
TypeScript, CSS Modules. Déployé sur Vercel depuis `main`.

```bash
npm run dev     # développement, http://localhost:3000
npm run build   # build de production
npx eslint app  # lint
```

## Routine quotidienne

**Sauvegarder les médias sur le Drive** — à lancer une fois par jour, ou
après chaque session où des images, vidéos ou morceaux ont été ajoutés :

```bash
./scripts/sauvegarde-drive.sh
```

Rien n'est jamais supprimé et relancer ne coûte rien : seuls les fichiers
nouveaux ou modifiés sont transférés. Voir **[docs/sauvegarde.md](docs/sauvegarde.md)**
pour l'arborescence, l'automatisation par cron et la marche à suivre en cas
de jeton expiré.

## Repères

| Où | Quoi |
|---|---|
| `app/sections/` | une section de la page d'accueil = un composant + son CSS Module |
| `app/shared/textes.ts` | **tous** les textes du site, français et anglais côte à côte |
| `app/shared/playlist.ts` | les 21 titres — source unique du lecteur et de la page Musique |
| `app/shared/lang.tsx` | bascule FR/EN |
| `app/styles/tokens.css` | palette, échelle typographique, espacements |
| `scripts/generate-images.mjs` | génération des visuels via Gemini |
| `scripts/shorts/` | montage des clips verticaux |

## Deux choses à ne pas casser

**Les références de visage.** `scripts/refs/` contient les images passées à
Gemini à chaque génération. C'est ce qui fait que Céleste a le même visage
partout. La formulation d'identité (cheveux, peau, **yeux bleu-vert**) doit
rester identique d'une génération à l'autre — la changer fait diverger le
personnage.

**Le fond noir des visuels générés.** Le CSS s'appuie dessus pour détourer
le sujet. Tout prompt d'image doit demander un fond noir pur.
