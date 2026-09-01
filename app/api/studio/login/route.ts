/**
 * Connexion au studio : verifie le mot de passe et pose le cookie signe.
 *
 * Le DELETE sert a la deconnexion.
 */
import { cookies } from "next/headers";

import { COOKIE, creerJeton, motDePasseCorrect } from "../../../studio/auth";

export async function POST(request: Request) {
  let motDePasse = "";
  try {
    motDePasse = String((await request.json()).password ?? "");
  } catch {
    return Response.json({ erreur: "Requete invalide" }, { status: 400 });
  }

  if (!process.env.STUDIO_PASSWORD) {
    return Response.json(
      { erreur: "STUDIO_PASSWORD n'est pas configuree sur le serveur" },
      { status: 500 },
    );
  }

  if (!motDePasseCorrect(motDePasse)) {
    // Message volontairement vague : ne pas indiquer si c'est le mot de
    // passe ou autre chose qui a echoue.
    return Response.json({ erreur: "Mot de passe incorrect" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(COOKIE, creerJeton(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(COOKIE);
  return Response.json({ ok: true });
}
