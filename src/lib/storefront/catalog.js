/**
 * Cliente de catálogo de lectura (Fase 4 del backend: taxonomía +
 * productos, ver docs/decisions/CATALOGO-AVANZADO-VEHICULAR-ROADMAP.md) —
 * capa de fetch reutilizable tanto en Server Components (SSR de páginas
 * de categoría/vehículo/producto, Fase 5.3/5.4, siempre sin sesión de
 * cliente → nunca ve `price`) como en el navegador (overlay de precio
 * client-side para clientes logueados aprobados, mismo mecanismo,
 * mismas funciones).
 *
 * Deliberadamente separado de `client.js` (que cubre
 * register/login/logout/me/orders): esos son endpoints de sesión/
 * mutación que nunca deberían cachear; estos 4 son de LECTURA pública y
 * se benefician de ISR igual que `src/lib/cms/client.js` — mismo
 * `DEFAULT_REVALIDATE_SECONDS` para que las dos capas de lectura del
 * sitio (contenido CMS y catálogo) tengan la misma ventana de frescura
 * por default.
 *
 * Usa las mismas variables públicas que `env.js`
 * (`NEXT_PUBLIC_CMS_API_URL`/`NEXT_PUBLIC_CMS_SITE_SLUG`) — Next.js las
 * expone igual en servidor y en cliente, así que un solo módulo sirve
 * para los dos casos sin duplicar código. La opción `next.revalidate`
 * que se le pasa a `fetch()` es una extensión propia de Next.js: en el
 * servidor controla el cache ISR, en el navegador el motor de fetch
 * nativo simplemente la ignora como propiedad extra del init object —
 * no hace falta ningún branching especial por eso.
 */

import { getPublicApiUrl, getPublicSiteSlug } from "./env";
import { StorefrontApiError } from "./client";

// Mismo valor que DEFAULT_REVALIDATE_SECONDS de src/lib/cms/client.js —
// ver ese archivo para la justificación completa (60s: rápido para el
// cliente, sin saturar al backend con re-fetch en cada request).
const DEFAULT_REVALIDATE_SECONDS = 60;

async function catalogFetch(
  path,
  { token, revalidate = DEFAULT_REVALIDATE_SECONDS } = {}
) {
  const apiUrl = getPublicApiUrl();
  const siteSlug = getPublicSiteSlug();

  if (!apiUrl || !siteSlug) {
    throw new StorefrontApiError(
      "El catálogo no está disponible en este sitio."
    );
  }

  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(
      `${apiUrl}/api/v1/sites/${siteSlug}/storefront/${path}`,
      {
        headers,
        // `revalidate: false` -> `cache: "no-store"` (equivalente al
        // mismo escape hatch de cmsFetch), cualquier otro valor arma la
        // ventana ISR de Next.js. En el navegador esta clave no tiene
        // efecto -- fetch nativo la ignora silenciosamente.
        ...(revalidate === false
          ? { cache: "no-store" }
          : { next: { revalidate } }),
      }
    );
  } catch {
    throw new StorefrontApiError(
      "No se pudo conectar con el catálogo. Probá de nuevo en un momento."
    );
  }

  let data = null;
  const text = await response.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      data?.detail || "Ocurrió un error al cargar el catálogo.";
    throw new StorefrontApiError(message, { status: response.status, data });
  }

  return data;
}

function buildProductQuery({ nodeIds, page } = {}) {
  const params = new URLSearchParams();
  for (const id of nodeIds || []) {
    if (id === undefined || id === null || id === "") continue;
    // Repetible a propósito (`?node=1&node=2`) -- el backend le da
    // semántica AND a cada aparición (api/storefront_views.py,
    // `ProductListView.get_queryset`), nunca OR.
    params.append("node", String(id));
  }
  if (page) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/**
 * `GET .../storefront/taxonomies/` -- metadata (sin árbol) de las
 * taxonomías disponibles para este Site (compartidas + propias). Sin
 * paginar (`pagination_class = None` en el backend).
 */
export function fetchTaxonomies({ revalidate } = {}) {
  return catalogFetch("taxonomies/", { revalidate });
}

/**
 * `GET .../storefront/taxonomies/{slug}/` -- árbol completo de nodos de
 * una taxonomía (ej. "vehiculos" o "categorias-eurocentro"). 404 si no
 * existe o no está disponible para este Site.
 */
export function fetchTaxonomyTree(taxonomySlug, { revalidate } = {}) {
  return catalogFetch(`taxonomies/${taxonomySlug}/`, { revalidate });
}

/**
 * `GET .../storefront/products/` -- catálogo paginado (`PageNumberPagination`,
 * `PAGE_SIZE=50` -- respuesta `{count, next, previous, results}`).
 * `nodeIds`: ids de `TaxonomyNode` a filtrar, AND entre todos (ver
 * `buildProductQuery`). `token`: sesión de cliente opcional -- si es una
 * sesión aprobada válida, el backend incluye `price` en cada resultado;
 * sin token (o token inválido/vencido), cada producto viene sin la
 * clave `price` en absoluto (gating real del lado del servidor, Fase 0).
 */
export function fetchProducts({ nodeIds, page, token, revalidate } = {}) {
  return catalogFetch(`products/${buildProductQuery({ nodeIds, page })}`, {
    token,
    revalidate,
  });
}

/**
 * `GET .../storefront/products/{slug}/` -- producto individual (Fase
 * 5.4, página de producto con JSON-LD). Mismo gating de `price` que
 * `fetchProducts`. 404 si no existe, no es de este Site, o está inactivo.
 */
export function fetchProduct(slug, { token, revalidate } = {}) {
  return catalogFetch(`products/${slug}/`, { token, revalidate });
}

/**
 * Recorre TODAS las páginas de `fetchProducts()` (`PageNumberPagination`,
 * `PAGE_SIZE=50` -- el catálogo real de Eurocentro ya son 115 productos,
 * un solo pedido se queda corto) hasta agotar `next`, y devuelve la
 * lista completa de resultados ya concatenada. Usado por cualquier caso
 * que necesite "todo el catálogo de una vez" en vez de una página:
 * `sitemap.js` (Fase 5.5, solo `slug`) y `productos/page.js` (Fase 5.5,
 * destacados + buscador global, objetos completos). Acepta los mismos
 * `nodeIds`/`token`/`revalidate` que `fetchProducts` -- sin `nodeIds`,
 * trae el catálogo activo completo del Site.
 */
export async function fetchAllProducts({ nodeIds, token, revalidate } = {}) {
  const results = [];
  let page = 1;
  for (;;) {
    const data = await fetchProducts({ nodeIds, page, token, revalidate });
    results.push(...(data?.results || []));
    if (!data?.next) break;
    page += 1;
  }
  return results;
}

export { StorefrontApiError } from "./client";
export { isStorefrontEnabled } from "./env";
