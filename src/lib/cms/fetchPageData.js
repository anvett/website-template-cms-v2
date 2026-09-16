import { cmsFetch } from "./client";

/**
 * Reemplazo, para instancias con CMS activo, de combinar a mano
 * `*.page.data.js` + `*.sections.data.js`. Devuelve `{id, slug, enabled,
 * seo, openGraph, sections, meta}` con `sections` ya como el array
 * completo de Section (no solo ids) — el backend resuelve esa combinación
 * en el serializer de la API (cronograma 2.2, "serializer de salida
 * agregada por página"), Next.js no tiene que volver a armarla.
 *
 * @param {string} pageId - el `id` semántico de la página (ej. "home",
 *   "about-us"), NUNCA el `slug` real (que puede contener "/" y no sirve
 *   como identificador de fetch — ver docstring de `PageDetailRenderView`
 *   en el backend).
 */
export async function fetchPageData(pageId, options) {
  if (!pageId) {
    throw new Error("[cms] fetchPageData necesita un pageId (ej. 'home').");
  }
  return cmsFetch(`/pages/${encodeURIComponent(pageId)}/`, options);
}
