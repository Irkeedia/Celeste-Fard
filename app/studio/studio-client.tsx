"use client";

/**
 * Interface du studio.
 *
 * Deux modes : photo (synchrone, 30-60 s) et video (asynchrone, plusieurs
 * minutes). La video ne peut pas tenir dans une seule requete : on lance le
 * rendu, puis on interroge l'operation toutes les 10 s. C'est pour ca que
 * les deux modes ne partagent pas la meme mecanique d'envoi.
 *
 * Le prompt saisi n'a PAS besoin de decrire Celeste : le serveur prefixe
 * automatiquement la description d'identite. On decrit donc uniquement la
 * scene, ce qui evite les variations de formulation d'une fois sur l'autre.
 */

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./studio.module.css";

type Mode = "photo" | "video";

const PRESETS: Record<Mode, { nom: string; texte: string }[]> = {
  photo: [
    {
      nom: "Portrait studio",
      texte:
        "Waist-up studio portrait against a pure black background, restrained crimson rim light from behind, soft magenta key on the face, deep shadows, 85mm lens.",
    },
    {
      nom: "Lifestyle matin",
      texte:
        "Waist-up framing, early morning in a bright minimalist apartment, she stands by a large window holding a ceramic cup, oversized knit sweater, soft diffused daylight, warm neutral tones, unposed.",
    },
    {
      nom: "Nuit néon",
      texte:
        "Close framing, she sits in the back seat of a car at night, head against the window, city neon signs streaking past, coloured light across her face, cinematic night photography.",
    },
    {
      nom: "Rooftop doré",
      texte:
        "Waist-up framing, she leans on a rooftop terrace railing at golden hour, city skyline blurred below, silk slip dress, warm low sunlight, quiet luxury.",
    },
    {
      nom: "Scène",
      texte:
        "She sings on stage with a microphone, concert lighting, haze in the beams, crowd blurred in the foreground, energetic candid moment, 50mm lens.",
    },
    {
      nom: "Plage",
      texte:
        "Waist-up framing, on an empty beach at golden hour, sea breeze in her hair, blurred ocean behind, warm backlight, relaxed and self-assured.",
    },
  ],
  video: [
    {
      nom: "Portrait vivant",
      texte:
        "A woman with long wavy vivid orange-red hair and very pale skin, in a dark studio, slowly turning her head towards the camera, crimson rim light, subtle hair movement, cinematic, shallow depth of field.",
    },
    {
      nom: "Marche néon",
      texte:
        "A woman with long wavy vivid orange-red hair walking slowly towards the camera down a neon-lit street at night, reflections on wet asphalt, slow motion, cinematic colour grading.",
    },
    {
      nom: "Fenêtre matin",
      texte:
        "A woman with long wavy vivid orange-red hair standing by a window in soft morning light, holding a cup, slight smile, curtains moving gently, calm and intimate, handheld camera feel.",
    },
  ],
};

const FORMATS: Record<Mode, string[]> = {
  photo: ["4:5", "9:16", "1:1", "16:9"],
  video: ["9:16", "16:9"],
};

export function StudioClient({ connecteInitial }: { connecteInitial: boolean }) {
  const [connecte, setConnecte] = useState(connecteInitial);
  const [motDePasse, setMotDePasse] = useState("");
  const [mode, setMode] = useState<Mode>("photo");
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("4:5");
  const [enCours, setEnCours] = useState(false);
  const [etape, setEtape] = useState("");
  const [erreur, setErreur] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Un rendu video peut survivre a un changement d'onglet : on garde le
  // minuteur pour pouvoir l'arreter proprement au demontage.
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (minuteur.current) clearTimeout(minuteur.current); }, []);

  const connexion = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErreur("");
      const r = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: motDePasse }),
      });
      if (r.ok) {
        setConnecte(true);
        setMotDePasse("");
      } else {
        setErreur((await r.json()).erreur ?? "Connexion refusée");
      }
    },
    [motDePasse],
  );

  const deconnexion = useCallback(async () => {
    await fetch("/api/studio/login", { method: "DELETE" });
    setConnecte(false);
  }, []);

  const changerMode = useCallback((m: Mode) => {
    setMode(m);
    setAspect(FORMATS[m][0]);
    setImageUrl("");
    setVideoUrl("");
    setErreur("");
  }, []);

  const lancer = useCallback(async () => {
    if (!prompt.trim() || enCours) return;
    setEnCours(true);
    setErreur("");
    setImageUrl("");
    setVideoUrl("");

    try {
      if (mode === "photo") {
        setEtape("Génération en cours… 30 à 60 secondes");
        const r = await fetch("/api/studio/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, aspect }),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.erreur ?? "Échec de la génération");
        setImageUrl(j.image);
      } else {
        setEtape("Lancement du rendu vidéo…");
        const r = await fetch("/api/studio/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, aspect }),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.erreur ?? "Échec du lancement");

        const debut = Date.now();
        const interroger = async () => {
          const s = await fetch(`/api/studio/video?op=${encodeURIComponent(j.operation)}`);
          const sj = await s.json();
          if (sj.erreur) throw new Error(sj.erreur);
          if (sj.done && sj.videoUrl) {
            setVideoUrl(sj.videoUrl);
            setEnCours(false);
            setEtape("");
            return;
          }
          const ecoule = Math.round((Date.now() - debut) / 1000);
          setEtape(`Rendu vidéo en cours… ${ecoule} s écoulées (compter 2 à 5 minutes)`);
          minuteur.current = setTimeout(() => {
            interroger().catch((e) => {
              setErreur(e.message);
              setEnCours(false);
              setEtape("");
            });
          }, 10000);
        };
        await interroger();
        return; // la boucle gere la fin
      }
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Erreur inconnue");
    }
    setEnCours(false);
    setEtape("");
  }, [prompt, aspect, mode, enCours]);

  /* ------------------------------------------------ connexion */

  if (!connecte) {
    return (
      <div className={styles.wrap}>
        <div className={styles.login}>
          <h1 className={styles.titre}>Studio</h1>
          <p className={styles.sous}>Accès réservé</p>
          <form onSubmit={connexion}>
            <input
              className={styles.saisie}
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="Mot de passe"
              autoComplete="current-password"
              required
            />
            <button className={styles.bouton} type="submit">
              Se connecter
            </button>
          </form>
          {erreur && <p className={styles.erreur} style={{ marginTop: "1rem" }}>{erreur}</p>}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------ studio */

  return (
    <div className={styles.wrap}>
      <h1 className={styles.titre}>Studio</h1>
      <p className={styles.sous}>
        Génération d&apos;images et de vidéos de Céleste. Inutile de la décrire : son identité est
        ajoutée automatiquement. Décris seulement la scène.
      </p>

      <div className={styles.onglets}>
        {(["photo", "video"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles.onglet} ${mode === m ? styles.ongletActif : ""}`}
            onClick={() => changerMode(m)}
          >
            {m === "photo" ? "Photo" : "Vidéo"}
          </button>
        ))}
      </div>

      <div className={styles.grille}>
        <div>
          <label className={styles.champ} htmlFor="prompt">
            Scène
          </label>
          <textarea
            id="prompt"
            className={styles.zone}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex : elle marche dans une rue de Paris sous la pluie, trench noir, lumière grise…"
          />

          <div className={styles.presets}>
            {PRESETS[mode].map((p) => (
              <button
                key={p.nom}
                type="button"
                className={styles.preset}
                onClick={() => setPrompt(p.texte)}
              >
                {p.nom}
              </button>
            ))}
          </div>

          <label className={styles.champ}>Format</label>
          <div className={styles.formats}>
            {FORMATS[mode].map((f) => (
              <button
                key={f}
                type="button"
                className={`${styles.onglet} ${aspect === f ? styles.ongletActif : ""}`}
                onClick={() => setAspect(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            className={styles.bouton}
            type="button"
            onClick={lancer}
            disabled={enCours || !prompt.trim()}
          >
            {enCours ? "En cours…" : mode === "photo" ? "Générer l'image" : "Générer la vidéo"}
          </button>

          <button type="button" className={styles.lienDiscret} onClick={deconnexion}>
            Se déconnecter
          </button>
        </div>

        <div className={styles.resultat}>
          {erreur ? (
            <p className={styles.erreur}>{erreur}</p>
          ) : imageUrl ? (
            <div style={{ textAlign: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.media} src={imageUrl} alt="Image générée" />
              <a className={styles.telecharger} href={imageUrl} download="celeste.jpg">
                Télécharger
              </a>
            </div>
          ) : videoUrl ? (
            <div style={{ textAlign: "center" }}>
              <video className={styles.media} src={videoUrl} controls playsInline />
              <a className={styles.telecharger} href={videoUrl} download="celeste.mp4">
                Télécharger
              </a>
            </div>
          ) : enCours ? (
            <p className={styles.attente}>
              <span className={styles.pouls} />
              {etape}
            </p>
          ) : (
            <p className={styles.attente}>Le résultat apparaîtra ici</p>
          )}
        </div>
      </div>
    </div>
  );
}
