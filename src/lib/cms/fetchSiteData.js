import { cmsFetch } from "./client";

/**
 * Reemplazo, para instancias con CMS activo, de
 * `import { siteData } from "@/data/global/site.data"`.
 *
 * Devuelve el mismo shape exacto (`site`, `seo`, `openGraph`, `twitter`,
 * `icons`, `manifest`, `themeMeta`, `branding`, `contact`, `address`,
 * `businessHours`, `social`, `analytics`) — layout.js y cualquier otro
 * consumidor no necesitan saber si el dato vino de un archivo o de la API
 * (cronograma 3.1).
 */
export async function fetchSiteData(options) {
  return cmsFetch("/", options);
}
