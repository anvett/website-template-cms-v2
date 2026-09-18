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

import { draftMode } from "next/headers";

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
  const { apiUrl, siteSlug, apiToken, previewToken } = getCmsEnv();
  const url = `${apiUrl}/api/v1/sites/${siteSlug}${path}`;

  // DW-014 (borrador/publicado): Next.js Draft Mode decide, request por
  // request, si esta lectura pide borrador o published_snapshot -- nunca
  // un header/query param que el cliente controle (`draftMode()` es la
  // API server-side de Next.js, cookie httpOnly propia, ver
  // src/app/api/draft-preview/route.js). Sin esto, published_snapshot es
  // siempre lo que se sirve (comportamiento por defecto, cero cambio
  // para cualquier visitante público).
  //
  // Con Draft Mode activo: (a) se autentica con `previewToken`
  // (SiteReadToken con allows_draft=True en el backend) en vez del
  // token público -- si no está configurado, se degrada al token
  // público con un warning diagnosticable en vez de romper el request
  // (esta instancia simplemente no tiene el preview de borrador
  // cableado todavía); (b) se fuerza `cache: "no-store"` SIEMPRE,
  // ignorando `revalidate` -- el preview del Editor nunca debe depender
  // del ISR público de 60s (decisión PO explícita, sesión DW-014: "el
  // preview draft no debe depender del ISR público de 60 segundos").
  const draft = await draftMode();
  const isDraftRequest = draft.isEnabled;

  if (isDraftRequest && !previewToken) {
    console.warn(
      `[cms] Draft Mode está activo pero CMS_PREVIEW_TOKEN no está configurado -- ` +
        `sirviendo contenido publicado en su lugar. Ver .env.example.`
    );
  }

  const token = isDraftRequest && previewToken ? previewToken : apiToken;

  let response;
  try {
    response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      // `revalidate: false` -> sin next.revalidate, Next.js cachea con la
      // semántica default de fetch en RSC (equivalente a force-cache) a
      // menos que se pida explícitamente lo contrario con `cache`.
      ...(isDraftRequest || revalidate === false
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
