/**
 * Cliente HTTP base de la Render API (cronograma Fase 3.1/3.3). Todas las
 * funciones de `fetchSiteData.js`/`fetchNavigationData.js`/
 * `fetchPageData.js` pasan por acá — un solo lugar que arma la URL, agrega
 * el header de autenticación y decide qué hacer cuando la API falla.
 *
 * --- Resolución de 3.3 (fallback/resiliencia) ------------------------
 * "¿Usar last-known-good cacheado, o fallar el build?" — las dos cosas,
 * según el momento:
 *
 * - En producción, con `revalidate` (ISR): si ya existe una versión
 *   cacheada de la página y una revalidación en background falla, Next.js
 *   ya maneja esto por su cuenta — sigue sirviendo el último HTML bueno y
 *   reintenta en la siguiente ventana de revalidación (comportamiento
 *   nativo del data cache de Next.js, no hay que reimplementarlo acá).
 * - En un build en frío (primer build, o `next dev`, sin nada cacheado
 *   todavía) NO hay "last-known-good" al cual caer — en ese caso, fallar
 *   ruidosamente es la opción correcta: mejor un build roto y visible que
 *   una página vacía/rota publicada en silencio. Por eso `cmsFetch` nunca
 *   traga el error ni devuelve `null` en caso de falla — siempre lanza
 *   `CmsApiError`, con contexto suficiente para diagnosticar (status,
 *   URL, cuerpo de la respuesta si lo hay).
 */

import { getCmsEnv } from "./env";

export class CmsApiError extends Error {
  constructor(message, { status, url, body } = {}) {
    super(message);
    this.name = "CmsApiError";
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

// Ventana de revalidación por defecto (segundos) para lecturas de la
// Render API — cronograma 3.1: "ISR... para que el cliente vea sus
// cambios sin necesitar un redeploy". 60s es un default conservador
// (rápido para el cliente, sin saturar al backend compartido con re-fetch
// en cada request); cada llamada puede pisarlo con su propio `revalidate`
// si un caso puntual lo necesita más ágil o más laxo.
export const DEFAULT_REVALIDATE_SECONDS = 60;

/**
 * @param {string} path - ej. "/pages/home/" (con slash inicial, sin el
 *   prefijo de site — `cmsFetch` arma `/api/v1/sites/{slug}${path}`).
 * @param {object} [options]
 * @param {number|false} [options.revalidate] - segundos de ISR, o
 *   `false` para desactivar el cache de Next.js en esa llamada puntual
 *   (equivalente a `cache: "no-store"`).
 */
export async function cmsFetch(path, { revalidate = DEFAULT_REVALIDATE_SECONDS } = {}) {
  const { apiUrl, siteSlug, apiToken } = getCmsEnv();
  const url = `${apiUrl}/api/v1/sites/${siteSlug}${path}`;

  let response;
  try {
    response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiToken}` },
      // `revalidate: false` -> sin next.revalidate, Next.js cachea con la
      // semántica default de fetch en RSC (equivalente a force-cache) a
      // menos que se pida explícitamente lo contrario con `cache`.
      ...(revalidate === false
        ? { cache: "no-store" }
        : { next: { revalidate } }),
    });
  } catch (cause) {
    // Fallo de red (DNS, timeout, backend caído sin ni siquiera responder
    // con un status HTTP) -- no confundir con un 4xx/5xx real de abajo.
    throw new CmsApiError(
      `[cms] No se pudo conectar con la Render API en ${url}.`,
      { url }
    );
  }

  if (!response.ok) {
    const body = await response.text().catch(() => null);
    throw new CmsApiError(
      `[cms] La Render API respondió ${response.status} para ${url}.`,
      { status: response.status, url, body }
    );
  }

  return response.json();
}
