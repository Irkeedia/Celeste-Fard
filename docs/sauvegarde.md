# Sauvegarde des médias sur Google Drive

Tous les visuels, vidéos et fichiers audio du projet sont sauvegardés dans
le dossier **`Celeste Fard/`** à la racine du Drive.

Objectif : ne jamais perdre un média. Une image générée coûte un appel API,
une vidéo en coûte beaucoup plus, et certains fichiers (les plans bruts des
shorts) ne vivent que dans un dossier temporaire qui finit par être purgé.

## Lancer la sauvegarde

```bash
cd ~/Projets/celeste-fard
./scripts/sauvegarde-drive.sh            # sauvegarde réelle
./scripts/sauvegarde-drive.sh --essai    # montre ce qui serait copié, sans rien envoyer
```

Le script écrit dans `.sauvegarde-drive.log` (ignoré par git).

## Ce qui est sauvegardé

| Source locale | Destination sur le Drive |
|---|---|
| `public/audio/nouvelle-generation/` | `01 Musique/MP3 du site (21 titres)` |
| `~/Téléchargements/musique celeste fard…` | `01 Musique/Masters originaux` |
| `public/image/gen/` | `02 Images/Portraits generes` |
| `public/image/cartoon/` | `02 Images/Illustrations cartoon` |
| `public/image/*.png` (shop) | `02 Images/Boutique` |
| `public/image/miniature*` | `02 Images/Miniatures video` |
| `public/image/*` (le reste) | `02 Images/Archives premieres versions` |
| `public/video/` | `03 Videos/Site` |
| `~/Téléchargements/celeste-short*.mp4` | `03 Videos/Shorts reseaux` |
| `scripts/refs/` | `04 Production/References visage` |
| `scripts/shorts/` | `04 Production/Outils et polices` |

`05 Archives Drive (avant rangement)` contient les anciens dossiers Celeste
qui traînaient dans `Musique/`, déplacés tels quels. Le script n'y touche pas.

## Deux garanties

**Rien n'est jamais supprimé.** Le script utilise `rclone copy`, pas `sync`.
Un fichier retiré du projet reste dans la sauvegarde. C'est délibéré : on
préfère un Drive un peu redondant à une perte définitive.

**Relancer ne coûte rien.** `rclone copy` compare taille et date, et ne
transfère que ce qui a changé. Vérifié : quand tout est à jour, le script
effectue **zéro transfert**.

## Automatiser (une fois par jour)

Le script n'est pas planifié par défaut. Pour le lancer chaque jour à 20 h :

```bash
crontab -e
```

puis ajouter :

```cron
0 20 * * * /home/mathieu/Projets/celeste-fard/scripts/sauvegarde-drive.sh >> /home/mathieu/Projets/celeste-fard/.sauvegarde-drive.log 2>&1
```

Vérifier que la tâche est bien enregistrée :

```bash
crontab -l | grep sauvegarde-drive
```

## En cas d'échec

La panne la plus probable est un **jeton rclone expiré**. Le script s'arrête
alors immédiatement avec un message explicite plutôt que de sembler réussir.
Pour le renouveler (une page de connexion Google s'ouvre) :

```bash
rclone config reconnect gdrive:
```

## Compte utilisé

Le remote `gdrive` pointe sur **toffolon.mathieu11@gmail.com**.

L'adresse `celestefard@gmail.com` existe mais n'est pas encore reliée. Deux
façons d'y arriver le jour où c'est souhaité :

- partager le dossier `Celeste Fard` avec cette adresse — les fichiers
  restent sur le compte perso, le compte Céleste y accède ;
- ou reconfigurer rclone sur le nouveau compte
  (`rclone config` → nouveau remote), ce qui demande une authentification
  dans un navigateur, à faire manuellement.
