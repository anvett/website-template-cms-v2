import { fetchPageData } from "@/lib/cms";
import { SectionRenderer } from "@/lib/content/SectionRenderer";
import { buildPageMetadata } from "@/lib/content/buildPageMetadata";
import { fetchAllProducts, isStorefrontEnabled } from "@/lib/storefront/catalog";
import { mapProductToItem } from "@/lib/storefront/mapProduct";

const PAGE_ID = "productos";

// Mismo slug fijo que `productos/[categoria]/page.js` -- taxonomía de
// categorías propia de Eurocentro (Fase 6), no un mecanismo genérico.
const CATEGORY_TAXONOMY_SLUG = "categorias-eurocentro";

// --- Fase 5.5: catálogo real (Product, Fase 3/6) para "destacados" +
// "buscador global" -----------------------------------------------------
//
// Antes de esta fase, ambas Sections leían `Section.items` (legacy,
// hardcodeado por `seed_eurocentro.py`) -- funcionaba, pero no reflejaba
// el catálogo vehicular real (un producto "destacado" seguía siendo el
// mismo texto genérico sin compatibilidad por año/motorización). Ahora
// se pide TODO el catálogo activo del Site una sola vez
// (`fetchAllProducts`, sin `?node=` -- interesa cada producto, no un
// subconjunto) y se deriva de ahí tanto los destacados (`item.featured`,
// curado desde el Admin/seed) como el universo completo del buscador.

/**
 * Agrega `category` (nombre de la categoría raíz, ej. "Motor") a un item
 * ya mapeado -- el `ProductGrid`/`ProductDetailModal` muestran ese campo
 * como badge, y el buscador global de `CatalogSearch.jsx` también busca
 * sobre `item.category`. `mapProductToItem` (mapProduct.js) no lo
 * incluye a propósito (queda genérico, sin saber de "categorías") -- se
 * deriva acá, a nivel de Page, que sí puede conocer el slug real de la
 * taxonomía de este Site.
 */
function withCategoryLabel(item) {
  const categoryNode = (item.taxonomyNodes || []).find(
    (node) => node.taxonomy === CATEGORY_TAXONOMY_SLUG
  );
  return { ...item, category: categoryNode?.path || "" };
}

async function fetchRealCatalogItems() {
  const products = await fetchAllProducts({});
  return products.map(mapProductToItem).map(withCategoryLabel);
}

// `product-cards` (destacados de la portada de Productos) siempre mostró
// un puñado chico de productos, no "todos los `featured`" -- el
// `Section.items` legacy que reemplaza traía 8 elegidos a mano
// (`seed_eurocentro.py`, comentario "8 productos elegidos a mano entre
// las 6 categorías"). `Product.featured` (Fase 3/6) es un flag DISTINTO:
// marca los destacados DENTRO de cada categoría para `PartsGallery`
// (`FEATURED_ITEM_INDEXES`, 4 por categoría x 6 = hasta 24 productos en
// total) -- no "mostrar en la portada". Se confundieron los dos
// conceptos al escribir esta Page por primera vez: pasar los 24 sin
// recortar inflaba
// la grilla de la portada muy por encima de lo esperado. Este helper
// recorta a un máximo fijo, repartiendo entre categorías (una por
// categoría, en rondas) para mantener la variedad visual que tenía la
// curación manual original, en vez de quedarse con las primeras N del
// mismo rubro por orden de creación.
const MAX_HOMEPAGE_FEATURED = 4;

function pickHomepageFeatured(items, max = MAX_HOMEPAGE_FEATURED) {
  const byCategory = new Map();
  for (const item of items) {
    const key = item.category || "";
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key).push(item);
  }
  const groups = [...byCategory.values()];
  const picked = [];
  for (let round = 0; picked.length < max && round < items.length; round += 1) {
    for (const group of groups) {
      if (picked.length >= max) break;
      if (round < group.length) picked.push(group[round]);
    }
  }
  return picked;
}

/**
 * Sobrescribe `items` de las Sections `catalog-search` (buscador global
 * -- SIEMPRE, con el catálogo completo) y `product-cards` (destacados --
 * solo si hay al menos un producto `featured`, para no dejar la Section
 * vacía si ningún producto de este Site está curado como destacado
 * todavía; en ese caso conserva los `items` que ya traía del CMS).
 */
function withRealCatalogSections(sections, { allItems, featuredItems }) {
  return (sections || []).map((section) => {
    if (section.component !== "products") return section;
    if (section.variant === "catalog-search") {
      return { ...section, items: allItems };
    }
    if (section.variant === "product-cards" && featuredItems.length > 0) {
      return { ...section, items: featuredItems };
    }
    return section;
  });
}

// --- Fallback legacy (storefront no configurado, o la API de catálogo
// falla): agregación desde `Section.items` de cada Page de categoría,
// tal como funcionaba antes de la Fase 5.5 -- nunca deja el buscador
// global vacío solo porque el catálogo real no está disponible en esta
// instancia todavía. ------------------------------------------------

/**
 * Extrae los slugs de categoría (["motor", "frenos", ...]) de cualquier
 * item con `href` con forma "/productos/{slug}" dentro de las Sections de
 * esta Page -- no asume que el grid de categorías se llama
 * "productos-categorias" ni que usa un component en particular (hoy es
 * `services/services-grid` reutilizado, ver comentario en
 * seed_eurocentro.py "no existe un componente dedicado category grid" —
 * eso puede cambiar). Mientras el link a cada categoría siga viviendo en
 * la Data (como ya lo está), esta función lo sigue encontrando.
 */
function extractCategorySlugs(sections) {
  const slugs = new Set();
  for (const section of sections || []) {
    for (const item of section.items || []) {
      const match = typeof item?.href === "string"
        ? item.href.match(/^\/productos\/([^/]+)\/?$/)
        : null;
      if (match) slugs.add(match[1]);
    }
  }
  return [...slugs];
}

/**
 * Junta los `items` de todas las Sections `component === "products"` de
 * una Page de categoría en un solo array plano.
 */
function extractProductItems(pageData) {
  return (pageData?.sections || [])
    .filter((section) => section.component === "products")
    .flatMap((section) => section.items || []);
}

/**
 * Trae en paralelo cada página de categoría y junta todos sus productos
 * en un solo array. Resiliente por diseño: si una categoría puntual
 * falla (404, backend caído para esa Page puntual, etc.), se descarta
 * con un warning en vez de tumbar toda la página de Productos.
 */
async function fetchLegacyProductItems(categorySlugs) {
  const results = await Promise.allSettled(
    categorySlugs.map((slug) => fetchPageData(`productos-${slug}`))
  );

  return results.flatMap((result, index) => {
    if (result.status === "fulfilled") {
      return extractProductItems(result.value);
    }
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[productos] No se pudo traer la categoría "${categorySlugs[index]}" ` +
          `para el buscador global:`,
        result.reason
      );
    }
    return [];
  });
}

function withLegacySearchItems(sections, allItems) {
  return (sections || []).map((section) =>
    section.component === "products" && section.variant === "catalog-search"
      ? { ...section, items: allItems }
      : section
  );
}

async function buildSections(sections) {
  if (isStorefrontEnabled()) {
    try {
      const allItems = await fetchRealCatalogItems();
      const featuredItems = pickHomepageFeatured(
        allItems.filter((item) => item.featured)
      );
      return withRealCatalogSections(sections, { allItems, featuredItems });
    } catch (error) {
      // API de catálogo caída, o el Site todavía no tiene Product
      // sembrado -- cae al fallback legacy de abajo en vez de romper la
      // página.
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[productos] No se pudo traer el catálogo real, usando el fallback legacy:",
          error
        );
      }
    }
  }

  const categorySlugs = extractCategorySlugs(sections);
  const legacyItems = await fetchLegacyProductItems(categorySlugs);
  return withLegacySearchItems(sections, legacyItems);
}

export async function generateMetadata() {
  const pageData = await fetchPageData(PAGE_ID);
  return buildPageMetadata(pageData);
}

export default async function ProductosPage() {
  const pageData = await fetchPageData(PAGE_ID);
  const sections = await buildSections(pageData.sections);

  return (
    <main>
      <SectionRenderer sections={sections} />
    </main>
  );
}
