"use client";

/**
 * Studio — interface pensee comme une application mobile.
 *
 * Partis pris qui expliquent la structure :
 *
 * 1. MODE APPLICATION. On pose `data-studio` sur <body> pour effacer
 *    l'en-tete et le pied de page du site : le logo geant et les mentions
 *    legales sous un outil de travail cassent l'illusion d'application.
 *
 * 2. RIEN NE SE PERD. Les generations s'accumulent dans une galerie
 *    persistee en IndexedDB (voir `historique.ts`) : changer d'onglet,
 *    relancer une generation ou recharger la page ne fait plus disparaitre
 *    le travail. C'etait le principal defaut de la version precedente.
 *
 * 3. ACTION FIXEE EN BAS, dans la zone du pouce. Sur grand ecran elle
 *    reprend sa place dans la colonne (media query du CSS).
 *
 * 4. MULTI-GENERATION EN PARALLELE. Gemini ne rend qu'une image par appel :
 *    on lance N requetes simultanees plutot qu'une requete serveur qui en
 *    enchainerait N. Chacune a son budget de temps, un echec reste local,
 *    et chaque image s'affiche des son arrivee.
 *
 * 5. AUCUN SAUT DE MISE EN PAGE. Les cases existent avant les images, a
 *    ratio fixe, sinon le contenu bouge sous le doigt.
 */

import { useCallback, useEffect, useRef, useState } from "react";

import { ajouter, lister, supprimer, versBlob, vider } from "./historique";
import styles from "./studio.module.css";

type Mode = "photo" | "video";
type Etat = "attente" | "ok" | "erreur";

type Item = {
  cle: string;
  etat: Etat;
  mode: Mode;
  ratio: string;
  url?: string;
  idDb?: number;
  message?: string;
};

const PRESETS: Record<Mode, { nom: string; texte: string }[]> = {
  photo: [
    {
      nom: "Portrait studio",
      texte:
        "Waist-up studio portrait against a pure black background, restrained crimson rim light from behind, soft magenta key on the face, deep shadows, 85mm lens.",
    },
    {
      nom: "Gros plan",
      texte:
        "Extreme close-up of her face, natural window light, neutral expression, looking straight into the lens, shallow depth of field, 85mm lens.",
    },
    {
      nom: "Matin",
      texte:
        "Waist-up framing, early morning in a bright minimalist apartment, she stands by a large window holding a ceramic cup, oversized knit sweater, soft diffused daylight, warm neutral tones, unposed.",
    },
    {
      nom: "Nuit néon",
      texte:
        "Close framing, she sits in the back seat of a car at night, head against the window, city neon signs streaking past, coloured light across her face, cinematic night photography.",
    },
    {
      nom: "Rooftop",
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
      nom: "Fenêtre",
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

  const [items, setItems] = useState<Item[]>([]);
  const [enCours, setEnCours] = useState(false);
  const [etapeVideo, setEtapeVideo] = useState("");
  const [agrandie, setAgrandie] = useState<string | null>(null);

  const zoneRef = useRef<HTMLDivElement>(null);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);
  const compteur = useRef(0);
  const urls = useRef<string[]>([]);

  const nouvelleCle = () => `k${compteur.current++}`;

  /* Mode application + chargement de la galerie persistee. */
  useEffect(() => {
    document.body.dataset.studio = "1";

    let vivant = true;
    lister()
      .then((entrees) => {
        if (!vivant) return;
        setItems(
          entrees.map((e) => {
            const url = URL.createObjectURL(e.blob);
            urls.current.push(url);
            return {
              cle: `db${e.id}`,
              etat: "ok" as Etat,
              mode: e.mode,
              ratio: e.ratio,
              url,
              idDb: e.id,
            };
          }),
        );
      })
      .catch(() => {
        /* Navigation privee stricte : on tourne sans historique. */
      });

    const timer = minuteur;
    return () => {
      vivant = false;
      delete document.body.dataset.studio;
      if (timer.current) clearTimeout(timer.current);
      urls.current.forEach(URL.revokeObjectURL);
      urls.current = [];
    };
  }, []);

  const ratioCourant = FORMATS[mode].find((f) => f.valeur === aspect)?.ratio ?? "4 / 5";
  const visibles = items.filter((i) => i.mode === mode);

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

  /* Le changement de mode ne touche PLUS aux resultats : ils sont
     simplement filtres a l'affichage. */
  const changerMode = useCallback((m: Mode) => {
    setMode(m);
    setAspect(FORMATS[m][0].valeur);
    if (m === "video") setNombre(1);
    setEtapeVideo("");
  }, []);

  /* ------------------------------------------------ suppression */

  const retirer = useCallback(async (item: Item) => {
    if (item.url) URL.revokeObjectURL(item.url);
    if (item.idDb !== undefined) await supprimer(item.idDb);
    setItems((l) => l.filter((i) => i.cle !== item.cle));
  }, []);

  const toutVider = useCallback(async () => {
    items.forEach((i) => i.url && URL.revokeObjectURL(i.url));
    urls.current = [];
    await vider();
    setItems([]);
  }, [items]);

  /* ------------------------------------------------ generation */

  const lancer = useCallback(async () => {
    if (!prompt.trim() || enCours) return;
    const n = mode === "video" ? 1 : nombre;
    const modeCourant = mode;
    const ratio = ratioCourant;

    const nouveaux: Item[] = Array.from({ length: n }, () => ({
      cle: nouvelleCle(),
      etat: "attente" as Etat,
      mode: modeCourant,
      ratio,
    }));

    setEnCours(true);
    setEtapeVideo("");
    // En tete : la generation en cours est ce qu'on veut voir en premier.
    setItems((l) => [...nouveaux, ...l]);
    requestAnimationFrame(() =>
      zoneRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );

    const majItem = (cle: string, maj: Partial<Item>) =>
      setItems((l) => l.map((i) => (i.cle === cle ? { ...i, ...maj } : i)));

    if (modeCourant === "photo") {
      await Promise.all(
        nouveaux.map((it) =>
          fetch("/api/studio/image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, aspect }),
          })
            .then(async (r) => {
              const j = await r.json();
              if (!r.ok) throw new Error(j.erreur ?? "Échec de la génération");
              const blob = await versBlob(j.image);
              const url = URL.createObjectURL(blob);
              urls.current.push(url);
              let idDb: number | undefined;
              try {
                idDb = await ajouter({
                  blob,
                  mode: modeCourant,
                  ratio,
                  prompt,
                  date: Date.now(),
                });
              } catch {
                /* Sans stockage, l'image reste affichee pour la session. */
              }
              majItem(it.cle, { etat: "ok", url, idDb });
            })
            .catch((e) => majItem(it.cle, { etat: "erreur", message: e.message })),
        ),
      );
      setEnCours(false);
      return;
    }

    /* Video : rendu long, on lance puis on interroge l'operation. */
    const it = nouveaux[0];
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
          const blob = await (await fetch(sj.videoUrl)).blob();
          const url = URL.createObjectURL(blob);
          urls.current.push(url);
          let idDb: number | undefined;
          try {
            idDb = await ajouter({ blob, mode: "video", ratio, prompt, date: Date.now() });
          } catch {
            /* idem */
          }
          majItem(it.cle, { etat: "ok", url, idDb });
          setEnCours(false);
          setEtapeVideo("");
          return;
        }
        const s2 = Math.round((Date.now() - debut) / 1000);
        setEtapeVideo(`Rendu en cours · ${s2} s (2 à 5 min)`);
        minuteur.current = setTimeout(() => {
          interroger().catch((e) => {
            majItem(it.cle, { etat: "erreur", message: e.message });
            setEnCours(false);
            setEtapeVideo("");
          });
        }, 10000);
      };
      await interroger();
    } catch (e) {
      majItem(it.cle, { etat: "erreur", message: e instanceof Error ? e.message : "Erreur" });
      setEnCours(false);
      setEtapeVideo("");
    }
  }, [prompt, aspect, mode, nombre, enCours, ratioCourant]);

  /* ------------------------------------------------ connexion */

  if (!connecte) {
    return (
      <div className={styles.app}>
        <div className={styles.login}>
          <h1 className={styles.loginTitre}>Studio</h1>
          <p className={styles.info}>Accès réservé</p>
          <form className={styles.loginForm} onSubmit={connexion}>
            <div className={styles.carteChamp}>
              <input
                className={styles.saisie}
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="Mot de passe"
                autoComplete="current-password"
                required
              />
            </div>
            <button className={styles.bouton} type="submit">
              Se connecter
            </button>
          </form>
          {erreurLogin && <p className={styles.erreur}>{erreurLogin}</p>}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------ application */

  return (
    <div className={styles.app}>
      <header className={styles.barre}>
        <h1 className={styles.barreTitre}>Studio</h1>
        <button type="button" className={styles.barreAction} onClick={deconnexion}>
          Quitter
        </button>
      </header>

      <div className={styles.contenu}>
        <div className={styles.colonneGauche}>
          <div className={styles.segments}>
            {(["photo", "video"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                className={`${styles.segment} ${mode === m ? styles.segmentActif : ""}`}
                onClick={() => changerMode(m)}
              >
                {m === "photo" ? "Photo" : "Vidéo"}
              </button>
            ))}
          </div>

          <div className={styles.carte}>
            <p className={styles.etiquette}>Scène</p>
            <textarea
              id="prompt"
              className={styles.zone}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Elle marche dans une rue de Paris sous la pluie, trench noir, lumière grise…"
            />
            <div className={styles.chips}>
              {PRESETS[mode].map((p) => (
                <button
                  key={p.nom}
                  type="button"
                  className={styles.chip}
                  onClick={() => setPrompt(p.texte)}
                >
                  {p.nom}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.carte}>
            <div className={styles.ligne}>
              <span className={styles.etiquette}>Format</span>
              <div className={styles.choix}>
                {FORMATS[mode].map((f) => (
                  <button
                    key={f.valeur}
                    type="button"
                    className={`${styles.choixItem} ${
                      aspect === f.valeur ? styles.choixActif : ""
                    }`}
                    onClick={() => setAspect(f.valeur)}
                  >
                    {f.valeur}
                  </button>
                ))}
              </div>
            </div>

            {mode === "photo" && (
              <div className={styles.ligne}>
                <span className={styles.etiquette}>Images</span>
                <div className={styles.choix}>
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`${styles.choixItem} ${nombre === n ? styles.choixActif : ""}`}
                      onClick={() => setNombre(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.barreBasse}>
            <div className={styles.barreBasseInner}>
              <button
                className={styles.bouton}
                type="button"
                onClick={lancer}
                disabled={enCours || !prompt.trim()}
              >
                {enCours
                  ? "Génération en cours…"
                  : mode === "video"
                    ? "Générer la vidéo"
                    : nombre > 1
                      ? `Générer ${nombre} images`
                      : "Générer"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.resultats} ref={zoneRef}>
          {etapeVideo && (
            <p className={styles.info}>
              <span className={styles.pouls} />
              {etapeVideo}
            </p>
          )}

          {visibles.length === 0 && !etapeVideo && (
            <div className={styles.accueil}>
              <span className={styles.accueilRond} aria-hidden="true" />
              <p className={styles.accueilTexte}>
                Décris une scène, ou choisis un préréglage.
                <br />
                Inutile de décrire Céleste.
              </p>
            </div>
          )}

          {visibles.length > 0 && (
            <>
              <div className={styles.barreGalerie}>
                <span className={styles.etiquette}>
                  {visibles.length} {mode === "video" ? "vidéo" : "image"}
                  {visibles.length > 1 ? "s" : ""} · conservées sur cet appareil
                </span>
                <button type="button" className={styles.barreAction} onClick={toutVider}>
                  Tout vider
                </button>
              </div>

              <div className={styles.grille} data-multi={visibles.length > 1}>
                {visibles.map((it, i) => (
                  <div
                    key={it.cle}
                    className={`${styles.case} ${it.mode === "video" ? styles.caseVideo : ""}`}
                    style={{ ["--ratio" as string]: it.ratio }}
                  >
                    {it.etat === "attente" && (
                      <>
                        <span className={styles.squelette} aria-hidden="true" />
                        <span className={styles.squeletteTexte}>
                          {it.mode === "video" ? "Rendu…" : "30–60 s"}
                        </span>
                      </>
                    )}

                    {it.etat === "erreur" && <p className={styles.erreur}>{it.message}</p>}

                    {it.etat === "ok" && it.url && it.mode === "photo" && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={styles.media} src={it.url} alt={`Génération ${i + 1}`} />
                        <div className={styles.actions}>
                          <button
                            type="button"
                            className={styles.action}
                            onClick={() => setAgrandie(it.url!)}
                          >
                            Voir
                          </button>
                          <a
                            className={styles.action}
                            href={it.url}
                            download={`celeste-${i + 1}.jpg`}
                          >
                            Garder
                          </a>
                          <button
                            type="button"
                            className={styles.action}
                            onClick={() => retirer(it)}
                            aria-label="Supprimer"
                          >
                            ✕
                          </button>
                        </div>
                      </>
                    )}

                    {it.etat === "ok" && it.url && it.mode === "video" && (
                      <>
                        <video
                          className={`${styles.media} ${styles.mediaContain}`}
                          src={it.url}
                          controls
                          playsInline
                        />
                        <div className={styles.actions}>
                          <a className={styles.action} href={it.url} download="celeste.mp4">
                            Garder
                          </a>
                          <button
                            type="button"
                            className={styles.action}
                            onClick={() => retirer(it)}
                            aria-label="Supprimer"
                          >
                            ✕
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {agrandie && (
        <div className={styles.visionneuse} role="dialog" aria-modal="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.visionneuseImg} src={agrandie} alt="Image agrandie" />
          <div className={styles.visionneuseActions}>
            <a className={styles.action} href={agrandie} download="celeste.jpg">
              Garder
            </a>
            <button type="button" className={styles.action} onClick={() => setAgrandie(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
