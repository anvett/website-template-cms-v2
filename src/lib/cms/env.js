/**
 * Variables de entorno de la capa CMS (cronograma Fase 3.2).
 *
 * Tres variables, no dos: el cronograma menciona `NEXT_PUBLIC_CMS_API_URL`
 * y `CMS_API_TOKEN`, pero la Render API del backend (Fase 2) cuelga de
 * `/api/v1/sites/{site_slug}/...` — hace falta que la instancia sepa
 * también CUÁL es su propio slug para armar esa ruta. Se agrega
 * `CMS_SITE_SLUG` (server-side, no es secreto pero tampoco necesita ser
 * público — todo el fetch ocurre en Server Components, nunca en el
 * navegador).
 *
 * `CMS_API_URL` se lee SIN el prefijo `NEXT_PUBLIC_` como fuente de
 * verdad real (nunca viaja al navegador) — se acepta también
 * `NEXT_PUBLIC_CMS_API_URL` como alias de compatibilidad con el nombre
 * que usa el cronograma, pero no lo exige. Ver `README` de esta carpeta.
 *
 * Solo lanza si de verdad se necesitan (`getCmsEnv()`), no al importar el
 * módulo — así una instancia SIN CMS activo (la mayoría, ver decision-log
 * "Static export + cPanel vs. Vercel dinámico + ISR") puede seguir
 * important este archivo sin que rompa nada si nunca llama a estas
 * funciones.
 */

export function isCmsEnabled() {
  return Boolean(
    (process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL) &&
      process.env.CMS_SITE_SLUG
  );
}

export function getCmsEnv() {
  const apiUrl = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL;
  const siteSlug = process.env.CMS_SITE_SLUG;
  const apiToken = process.env.CMS_API_TOKEN;
  // DW-014 (borrador/publicado) -- credencial de PREVIEW, deliberadamente
  // OPCIONAL acá (a diferencia de apiToken): una instancia con CMS activo
  // pero SIN Draft Mode cableado (todavía) sigue funcionando 100% en modo
  // solo-publicado sin esto configurado -- `cmsFetch` (client.js) solo la
  // usa cuando `draftMode().isEnabled`, y cae a un warning diagnosticable
  // si falta en ese momento puntual, nunca a un throw acá. Ver
  // content_admin.models.SiteReadToken.allows_draft en el backend.
  const previewToken = process.env.CMS_PREVIEW_TOKEN || null;

  const missing = [];
  if (!apiUrl) missing.push("CMS_API_URL (o NEXT_PUBLIC_CMS_API_URL)");
  if (!siteSlug) missing.push("CMS_SITE_SLUG");
  if (!apiToken) missing.push("CMS_API_TOKEN");

  if (missing.length > 0) {
    throw new Error(
      `[cms] Faltan variables de entorno requeridas para la capa CMS: ${missing.join(", ")}. ` +
        "Ver .env.example — esta capa solo debe usarse en instancias con CMS activo " +
        "(docs/decisions/decision-log.md, 'Static export + cPanel vs. Vercel dinámico + ISR')."
    );
  }

  return {
    apiUrl: apiUrl.replace(/\/+$/, ""),
    siteSlug,
    apiToken,
    previewToken,
  };
}
