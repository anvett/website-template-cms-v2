/**
 * Variables de entorno de la capa `storefront` (Fase 0/1, ver
 * docs/decisions/CATALOGO-AVANZADO-VEHICULAR-ROADMAP.md).
 *
 * A diferencia de `src/lib/cms/env.js` (server-only, usa `CMS_API_TOKEN`
 * secreto), este módulo corre en el NAVEGADOR: los endpoints de cuentas
 * de cliente y carrito (`register/login/logout/me/orders`) son públicos
 * por diseño, no necesitan el token de lectura del Site. Next.js solo
 * inlinea en el bundle del cliente las variables con prefijo
 * `NEXT_PUBLIC_` — por eso este módulo lee exclusivamente esas, nunca
 * `CMS_API_URL`/`CMS_SITE_SLUG` a secas (esas SÍ existen en el server,
 * pero valen `undefined` en el navegador).
 *
 * Nunca lanza si faltan — a diferencia de `getCmsEnv()` (server, donde
 * faltar es un error de configuración real). Acá faltar es un estado
 * válido: la mayoría de instancias (sitios informativos sin backend de
 * storefront) simplemente no tienen estas variables, y todo lo que
 * depende de esto (CartWidget, CustomerSessionProvider) debe degradar a
 * "no renderizar nada" en vez de romper — ver `isStorefrontEnabled()`.
 */

export function getPublicApiUrl() {
  const raw = process.env.NEXT_PUBLIC_CMS_API_URL || "";
  return raw.replace(/\/+$/, "");
}

export function getPublicSiteSlug() {
  return process.env.NEXT_PUBLIC_CMS_SITE_SLUG || "";
}

export function isStorefrontEnabled() {
  return Boolean(getPublicApiUrl() && getPublicSiteSlug());
}
