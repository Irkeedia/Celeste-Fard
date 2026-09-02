"use client";

/**
 * Interface du studio — pensee pour le telephone, c'est son usage principal.
 *
 * Trois partis pris qui expliquent le code :
 *
 * 1. MULTI-GENERATION. Gemini ne rend qu'une image par appel. Pour en
 *    obtenir plusieurs, on lance N requetes EN PARALLELE depuis le
 *    navigateur plutot qu'une seule requete serveur qui en enchainerait N :
 *    chaque appel dispose ainsi de son propre budget de temps, une image
 *    ratee n'entraine pas les autres, et chacune s'affiche des son arrivee.
 *
 * 2. AUCUN SAUT DE MISE EN PAGE. Les cases du resultat existent AVANT les
 *    images, avec un ratio fixe. Sinon la page se reorganise a chaque
 *    reponse recue et le contenu bouge sous le doigt.
 *
 * 3. LE PROMPT NE DECRIT QUE LA SCENE. L'identite de Celeste est ajoutee
 *    cote serveur, en tete ET en fin de prompt.
 */

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./studio.module.css";

type Mode = "photo" | "video";
type Etat = "vide" | "attente" | "ok" | "erreur";
type Case = { etat: Etat; url?: string; message?: string };

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
    {
      nom: "Café pluie",
      texte:
        "Waist-up framing, she sits at a Parisian cafe terrace on a rainy afternoon, dark trench coat, hands around an espresso cup, wet street and blurred umbrellas behind, soft grey light.",
    },
    {
      nom: "Gros plan",
      texte:
        "Extreme close-up of her face, natural window light, neutral expression, looking straight into the lens, shallow depth of field, 85mm lens.",
    },
  ],
  video: [
    {
      nom: "Portrait vivant",
      texte:
        "in a dark studio, slowly turning her head towards the camera, crimson rim light, subtle hair movement, shallow depth of field",
    },
    {
      nom: "Marche néon",
      texte:
        "walking slowly towards the camera down a neon-lit street at night, reflections on wet asphalt, slow motion",
    },
    {
      nom: "Fenêtre matin",
      texte:
        "standing by a window in soft morning light, holding a cup, slight smile, curtains moving gently, handheld camera feel",
    },
  ],
};

const FORMATS: Record<Mode, { valeur: string; ratio: string }[]> = {
  photo: [
    { valeur: "4:5", ratio: "4 / 5" },
    { valeur: "9:16", ratio: "9 / 16" },
    { valeur: "1:1", ratio: "1 / 1" },
    { valeur: "16:9", ratio: "16 / 9" },
  ],
  video: [
    { valeur: "9:16", ratio: "9 / 16" },
    { valeur: "16:9", ratio: "16 / 9" },
  ],
};

export function StudioClient({ connecteInitial }: { connecteInitial: boolean }) {
  const [connecte, setConnecte] = useState(connecteInitial);
  const [motDePasse, setMotDePasse] = useState("");
  const [erreurLogin, setErreurLogin] = useState("");

  const [mode, setMode] = useState<Mode>("photo");
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("4:5");
  const [nombre, setNombre] = useState(1);

  const [cases, setCases] = useState<Case[]>([]);
  const [enCours, setEnCours] = useState(false);
  const [etapeVideo, setEtapeVideo] = useState("");
  const [agrandie, setAgrandie] = useState<string | null>(null);

  const zoneRef = useRef<HTMLDivElement>(null);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (minuteur.current) clearTimeout(minuteur.current); }, []);

  const ratio = FORMATS[mode].find((f) => f.valeur === aspect)?.ratio ?? "4 / 5";

  /* ------------------------------------------------ connexion */

  const connexion = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErreurLogin("");
      const r = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: motDePasse }),
      });
      if (r.ok) {
        setConnecte(true);
        setMotDePasse("");
      } else {
        setErreurLogin((await r.json()).erreur ?? "Connexion refusée");
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
    setAspect(FORMATS[m][0].valeur);
    if (m === "video") setNombre(1); // une video coute trop cher pour en lancer 4
    setCases([]);
    setEtapeVideo("");
  }, []);

  /* ------------------------------------------------ generation */

  const lancer = useCallback(async () => {
    if (!prompt.trim() || enCours) return;
    const n = mode === "video" ? 1 : nombre;

    setEnCours(true);
    setEtapeVideo("");
    setCases(Array.from({ length: n }, () => ({ etat: "attente" as Etat })));
    // On amene le resultat sous les yeux : sur telephone il est sinon hors ecran.
    requestAnimationFrame(() => zoneRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

    if (mode === "photo") {
      // En parallele : chaque image arrive quand elle est prete, et un echec
      // reste local a sa case.
      await Promise.all(
        Array.from({ length: n }, (_, i) =>
          fetch("/api/studio/image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, aspect }),
          })
            .then(async (r) => {
              const j = await r.json();
              if (!r.ok) throw new Error(j.erreur ?? "Échec de la génération");
              setCases((c) => c.map((x, k) => (k === i ? { etat: "ok", url: j.image } : x)));
            })
            .catch((e) => {
              setCases((c) =>
                c.map((x, k) => (k === i ? { etat: "erreur", message: e.message } : x)),
              );
            }),
        ),
      );
      setEnCours(false);
      return;
    }

    /* Video : rendu long, on lance puis on interroge l'operation. */
    try {
      setEtapeVideo("Lancement du rendu…");
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
          setCases([{ etat: "ok", url: sj.videoUrl }]);
          setEnCours(false);
          setEtapeVideo("");
          return;
        }
        const s2 = Math.round((Date.now() - debut) / 1000);
        setEtapeVideo(`Rendu en cours… ${s2} s (compter 2 à 5 min)`);
        minuteur.current = setTimeout(() => {
          interroger().catch((e) => {
            setCases([{ etat: "erreur", message: e.message }]);
            setEnCours(false);
            setEtapeVideo("");
          });
        }, 10000);
      };
      await interroger();
    } catch (e) {
      setCases([{ etat: "erreur", message: e instanceof Error ? e.message : "Erreur" }]);
      setEnCours(false);
      setEtapeVideo("");
    }
  }, [prompt, aspect, mode, nombre, enCours]);

  /* ------------------------------------------------ rendu */

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
          {erreurLogin && <p className={styles.erreur}>{erreurLogin}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.entete}>
        <h1 className={styles.titre}>Studio</h1>
        <button type="button" className={styles.lienDiscret} onClick={deconnexion}>
          Quitter
        </button>
      </div>

      <p className={styles.sous}>
        Décris seulement la scène — l&apos;identité de Céleste est ajoutée automatiquement.
      </p>

      <div className={styles.rangee}>
        {(["photo", "video"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={`${styles.pastille} ${mode === m ? styles.pastilleActive : ""}`}
            onClick={() => changerMode(m)}
          >
            {m === "photo" ? "Photo" : "Vidéo"}
          </button>
        ))}
      </div>

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

      <div className={styles.rangee}>
        {PRESETS[mode].map((p) => (
          <button
            key={p.nom}
            type="button"
            className={styles.pastille}
            onClick={() => setPrompt(p.texte)}
          >
            {p.nom}
          </button>
        ))}
      </div>

      <label className={styles.champ}>Format</label>
      <div className={styles.rangee}>
        {FORMATS[mode].map((f) => (
          <button
            key={f.valeur}
            type="button"
            className={`${styles.pastille} ${styles.pastilleEtroite} ${
              aspect === f.valeur ? styles.pastilleActive : ""
            }`}
            onClick={() => setAspect(f.valeur)}
          >
            {f.valeur}
          </button>
        ))}
      </div>

      {mode === "photo" && (
        <>
          <label className={styles.champ}>Nombre d&apos;images</label>
          <div className={styles.rangee}>
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.pastille} ${styles.pastilleEtroite} ${
                  nombre === n ? styles.pastilleActive : ""
                }`}
                onClick={() => setNombre(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        className={styles.bouton}
        type="button"
        onClick={lancer}
        disabled={enCours || !prompt.trim()}
      >
        {enCours
          ? "En cours…"
          : mode === "video"
            ? "Générer la vidéo"
            : `Générer ${nombre > 1 ? `${nombre} images` : "l'image"}`}
      </button>

      <div className={styles.zoneResultats} ref={zoneRef}>
        {etapeVideo && (
          <p className={styles.attente}>
            <span className={styles.pouls} />
            {etapeVideo}
          </p>
        )}

        {cases.length > 0 && (
          <div className={styles.grilleResultats} data-multi={cases.length > 1}>
            {cases.map((c, i) => (
              <div
                key={i}
                className={`${styles.case} ${mode === "video" ? styles.videoCase : ""}`}
                style={{ ["--ratio" as string]: ratio }}
              >
                {c.etat === "attente" && (
                  <p className={styles.attente}>
                    <span className={styles.pouls} />
                    {mode === "video" ? "Rendu…" : "30 à 60 s"}
                  </p>
                )}

                {c.etat === "erreur" && <p className={styles.erreur}>{c.message}</p>}

                {c.etat === "ok" && c.url && mode === "photo" && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.media} src={c.url} alt={`Génération ${i + 1}`} />
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.action}
                        onClick={() => setAgrandie(c.url!)}
                      >
                        Agrandir
                      </button>
                      <a
                        className={styles.action}
                        href={c.url}
                        download={`celeste-${i + 1}.jpg`}
                      >
                        Enregistrer
                      </a>
                    </div>
                  </>
                )}

                {c.etat === "ok" && c.url && mode === "video" && (
                  <>
                    <video className={styles.media} src={c.url} controls playsInline />
                    <div className={styles.actions}>
                      <a className={styles.action} href={c.url} download="celeste.mp4">
                        Enregistrer
                      </a>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {agrandie && (
        <div
          className={styles.visionneuse}
          onClick={() => setAgrandie(null)}
          role="presentation"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={agrandie} alt="Image agrandie" />
          <button type="button" className={styles.bouton} onClick={() => setAgrandie(null)}>
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
