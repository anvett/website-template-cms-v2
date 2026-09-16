import { fetchPageData } from "@/lib/cms";
import { SectionRenderer } from "@/lib/content/SectionRenderer";
import { buildPageMetadata } from "@/lib/content/buildPageMetadata";
import { fetchProducts, fetchTaxonomyTree, isStorefrontEnabled } from "@/lib/storefront/catalog";
import { mapProductToItem } from "@/lib/storefront/mapProduct";

// Slug fijo de la taxonomía de categorías de ESTE Site, sembrada por
// `seed_catalog_v2.py` (Fase 6) -- a diferencia de "vehiculos"
// (compartida entre tenants, ver VehicleSelectionContext.jsx), esta es
// propia de Eurocentro (`Taxonomy.is_shared=False`). Mismo criterio ya
// aplicado en el resto de este archivo (`productos-${categoria}` como
// convención de `content_id`) y en `seed_eurocentro.py` (`CATEGORIES`):
// código de Page específico de esta instancia, no un mecanismo genérico
// -- una instancia distinta con su propio árbol de categorías tendría su
// propio slug acá, mismo espíritu que category grids ya hardcodeados
// site por site en este template (CLAUDE.md: Pages organizan, pueden
// conocer la estructura real del sitio que arman).
const CATEGORY_TAXONOMY_SLUG = "categorias-eurocentro";

/**
 * Ruta dinámica para las 6 páginas de categoría de Productos (Motor,
 * Suspensión, Frenos, Caja, Chequeo de motor, Varios). El `content_id`
 * de cada Page en el backend sigue el patrón `productos-{categoria}`
 * (ver `seed_eurocentro.py`) — este segmento de ruta arma ese id
 * concatenando el slug de la URL, nunca al revés.
 *
 * Sin `generateStaticParams`: esta instancia corre en modo dinámico
 * (CMS activo, sin `output: "export"` — ver decision-log.md), así que
 * cada categoría se renderiza on-demand y queda cacheada por ISR
 * (`DEFAULT_REVALIDATE_SECONDS` en `src/lib/cms/client.js`), sin
 * necesitar la lista de categorías hardcodeada acá también.
 *
 * --- Fase 5.3: la Section `products/parts-gallery` deja de mostrar
 * `Section.items` (contenido embebido, pre-Fase 3/4) y pasa a mostrar el
 * catálogo real (`Product`, Fase 3, poblado por `seed_catalog_v2.py`,
 * Fase 6) -- mismo patrón ya usado por `productos/page.js` para
 * `catalog-search` (sobrescribir `items` en la Page, la Variant no sabe
 * de dónde salieron). SIEMPRE se pide SIN token (anónimo, cacheado por
 * ISR) -- el precio nunca debe depender de quién está pidiendo el HTML
 * en el servidor (SEO/crawlers), el overlay de precio para clientes
 * logueados es 100% client-side (`useCatalogOverlay.js`, dentro de
 * `PartsGallery`). Si el storefront no está configurado en esta
 * instancia, o la taxonomía de categorías todavía no existe (Site sin
 * `seed_catalog_v2` corrido), la Section se deja tal cual vino del CMS
 * (`Section.items` original) -- nunca rompe la página por esto.
 */
async function resolveCategoryNodeId(categoria) {
  if (!isStorefrontEnabled()) return null;
  try {
    const tree = await fetchTaxonomyTree(CATEGORY_TAXONOMY_SLUG);
    const node = (tree?.nodes || []).find((entry) => entry.slug === categoria);
    return node?.id ?? null;
  } catch {
    // Taxonomía todavía no sembrada para este Site, o la API de
    // catálogo caída -- degrada a "sin catálogo real", la Section
    // vieja (`Section.items`) sigue funcionando como fallback.
    return null;
  }
}

async function withRealCatalog(sections, categoryNodeId) {
  if (!categoryNodeId) return sections;

  let items;
  try {
    const data = await fetchProducts({ nodeIds: [categoryNodeId] });
    items = (data?.results || []).map(mapProductToItem);
  } catch {
    // Mismo criterio que arriba: si falla el pedido de productos, la
    // Section conserva sus `items` originales en vez de quedar vacía.
    return sections;
  }

  return (sections || []).map((section) =>
    section.component === "products" && section.variant === "parts-gallery"
      ? {
          ...section,
          items,
          meta: { ...section.meta, categoryNodeId },
        }
      : section
  );
}

async function getPageData(params) {
  const { categoria } = await params;
  const [pageData, categoryNodeId] = await Promise.all([
    fetchPageData(`productos-${categoria}`),
    resolveCategoryNodeId(categoria),
  ]);

  return {
    ...pageData,
    sections: await withRealCatalog(pageData.sections, categoryNodeId),
  };
}

export async function generateMetadata({ params }) {
  const pageData = await getPageData(params);
  return buildPageMetadata(pageData);
}

export default async function ProductosCategoriaPage({ params }) {
  const pageData = await getPageData(params);

  return (
    <main>
      <SectionRenderer sections={pageData.sections} />
    </main>
  );
}
