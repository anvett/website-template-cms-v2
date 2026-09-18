/**
 * DW-058 + DW-014 (borrador/publicado) -- invalida la cache publica
 * (Next.js Data/Fetch Cache) de una ruta puntual justo despues de que
 * el backend marca contenido como PUBLICADO. Este endpoint reemplaza
 * el disparo original de DW-058 ("revalidatePath en cada guardado"):
 * ahora revalidatePath ocurre SOLO al publicar, nunca al guardar un
 * borrador (decision PO explicita, sesion DW-014: "Publicar dispara
 * revalidatePath del contenido publico afectado").
 *
 * Llamado server-to-server, nunca desde el navegador: el unico caller
 * es la ruta interna `editor-anvetcorp/src/app/api/revalidate-preview/route.js`,
 * que reenvia aqui usando `REVALIDATE_SECRETS_JSON` (server-only, jamas
 * expuesto al navegador via NEXT_PUBLIC_*).
 *
 * SEGURIDAD: `REVALIDATE_SECRET` es, a proposito, un secreto DISTINTO
 * de `CMS_PREVIEW_TOKEN` (el de `/api/draft-preview`, que si cruza el
 * navegador del Editor dentro de la URL del iframe). Este nunca sale
 * de un servidor -- tiene capacidad de escritura sobre la cache
 * publica, asi que jamas debe reutilizarse como credencial de lectura
 * ni exponerse al cliente (decision PO explicita: "ningun secreto con
 * capacidad de escritura/publicacion/revalidacion puede exponerse al
 * navegador" / "nunca reutilizar credenciales de escritura/publicacion/
 * revalidacion").
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      {
        error: "revalidate_not_configured",
        detail:
          "[cms] REVALIDATE_SECRET no está configurado en esta instancia -- ver .env.example.",
      },
      { status: 503 }
    );
  }

  const providedSecret = request.headers.get("x-revalidate-secret");
  if (!providedSecret || providedSecret !== expected) {
    return NextResponse.json({ error: "invalid_secret" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json_body" }, { status: 400 });
  }

  const { path, type } = body ?? {};

  const isSafeRelativePath =
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.includes("://");
  if (!isSafeRelativePath) {
    return NextResponse.json({ error: "invalid_path" }, { status: 400 });
  }

  if (type !== "page" && type !== "layout") {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  try {
    revalidatePath(path, type);
  } catch (error) {
    return NextResponse.json(
      {
        error: "revalidate_failed",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ revalidated: true, path, type });
}
