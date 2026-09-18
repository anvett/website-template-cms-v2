/**
 * DW-014 (borrador/publicado) -- activa Next.js Draft Mode para que
 * ESTA instancia sirva el borrador (row en vivo del backend) en vez de
 * `published_snapshot` para el resto de la sesion de este navegador
 * (cookie httpOnly `__prerender_bypass`, ver `draftMode()` en
 * `src/lib/cms/client.js::cmsFetch`), y redirige a la ruta real. Mismo
 * contrato que documenta la guia oficial de Next.js para Draft Mode
 * (`?secret=...&redirect=...` -> validar -> enable() -> redirect) --
 * este endpoint no inventa un mecanismo propio.
 *
 * Llamado por el iframe de preview de Editor Anvetcorp (navegacion real
 * del navegador a ESTE origen, nunca un fetch server-to-server -- es la
 * unica forma de que el navegador reciba la cookie httpOnly, ver
 * `editor-anvetcorp/src/lib/previewConfig.js::buildDraftPreviewUrl`).
 *
 * SEGURIDAD: el secreto que valida este endpoint (`CMS_PREVIEW_TOKEN`)
 * es, a proposito, distinto y de MENOR privilegio que el secreto de
 * `/api/revalidate` (ese nunca sale de un servidor; este SI cruza el
 * navegador del Editor, porque tiene que llegar hasta acá en la URL
 * real que carga el iframe) -- su unica capacidad es "ver el borrador
 * de este Site", nunca escribir/publicar/revalidar nada (decision PO
 * explicita, sesion DW-014: "acceso draft solo lectura y scoped al
 * Site" / "credencial de preview independiente y revocable").
 */

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const redirectPath = searchParams.get("redirect") || "/";

  const expected = process.env.CMS_PREVIEW_TOKEN;
  if (!expected) {
    return new NextResponse(
      "[cms] CMS_PREVIEW_TOKEN no está configurado en esta instancia -- ver .env.example.",
      { status: 503 }
    );
  }
  if (!secret || secret !== expected) {
    return new NextResponse("Token de preview inválido.", { status: 401 });
  }

  // Nunca un redirect externo/absoluto -- solo rutas relativas propias
  // de este sitio (mismo criterio que la guía oficial: "redirect from
  // the fetched/validated path, never trust it as-is" -- acá no hay un
  // lookup de CMS que validar contra, así que se valida la FORMA del
  // path en su lugar: previene un open redirect hacia otro host).
  const isSafeRelativePath =
    typeof redirectPath === "string" &&
    redirectPath.startsWith("/") &&
    !redirectPath.startsWith("//") &&
    !redirectPath.includes("://");
  if (!isSafeRelativePath) {
    return new NextResponse("Parámetro 'redirect' inválido.", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectPath, request.url));
}
