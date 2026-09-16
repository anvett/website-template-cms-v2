import { cmsFetch } from "./client";

/**
 * `GET /pages/` — mapa liviano de páginas (`{id, slug, enabled}[]`),
 * pensado para `generateStaticParams` o para armar un sitemap dinámico.
 * No trae Sections — para el detalle completo de una página, usar
 * `fetchPageData(pageId)`.
 */
export async function fetchPageMap(options) {
  return cmsFetch("/pages/", options);
}
