/**
 * HISTORIQUE DU STUDIO — persistance locale des generations.
 *
 * Pourquoi IndexedDB et pas localStorage : une image fait 2 a 3 Mo en
 * base64, et localStorage plafonne autour de 5 Mo pour TOUT le domaine.
 * Deux images suffiraient a le saturer. IndexedDB stocke des Blob binaires
 * sans cette limite, et sans le surcout de 33 % du base64.
 *
 * Les images sont donc conservees en Blob ; l'affichage passe par des
 * object URLs, qu'il faut revoquer quand on ne s'en sert plus (voir
 * `revoquer`), sinon la memoire de l'onglet grimpe a chaque generation.
 *
 * Tout reste sur l'appareil : aucun envoi, aucun stockage serveur.
 */

const BASE = "celeste-studio";
const MAGASIN = "generations";
const MAX = 40; // au-dela, on oublie les plus anciennes

export type Entree = {
  id: number;
  blob: Blob;
  mode: "photo" | "video";
  ratio: string;
  prompt: string;
  date: number;
};

function ouvrir(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(BASE, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(MAGASIN)) {
        db.createObjectStore(MAGASIN, { keyPath: "id", autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Ajoute une generation et renvoie son identifiant. */
export async function ajouter(e: Omit<Entree, "id">): Promise<number> {
  const db = await ouvrir();
  const id = await new Promise<number>((resolve, reject) => {
    const tx = db.transaction(MAGASIN, "readwrite");
    const req = tx.objectStore(MAGASIN).add(e);
    req.onsuccess = () => resolve(req.result as number);
    req.onerror = () => reject(req.error);
  });
  db.close();
  void elaguer();
  return id;
}

/** Toutes les generations, de la plus recente a la plus ancienne. */
export async function lister(): Promise<Entree[]> {
  const db = await ouvrir();
  const tout = await new Promise<Entree[]>((resolve, reject) => {
    const req = db.transaction(MAGASIN, "readonly").objectStore(MAGASIN).getAll();
    req.onsuccess = () => resolve(req.result as Entree[]);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return tout.sort((a, b) => b.date - a.date);
}

export async function supprimer(id: number): Promise<void> {
  const db = await ouvrir();
  await new Promise<void>((resolve, reject) => {
    const req = db.transaction(MAGASIN, "readwrite").objectStore(MAGASIN).delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
  db.close();
}

export async function vider(): Promise<void> {
  const db = await ouvrir();
  await new Promise<void>((resolve, reject) => {
    const req = db.transaction(MAGASIN, "readwrite").objectStore(MAGASIN).clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
  db.close();
}

/** Garde les MAX plus recentes. Sans ca le stockage grossit indefiniment. */
async function elaguer(): Promise<void> {
  const tout = await lister();
  if (tout.length <= MAX) return;
  for (const e of tout.slice(MAX)) await supprimer(e.id);
}

/** Convertit la data URI renvoyee par l'API en Blob stockable. */
export async function versBlob(dataUri: string): Promise<Blob> {
  return (await fetch(dataUri)).blob();
}
