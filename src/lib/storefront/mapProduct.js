/**
 * Traduce un `Product` real de la API de catálogo (Fase 4,
 * `GET storefront/products/`) a la forma `item` que ya esperan los 3
 * variants de `products` (`parts-gallery`/`product-cards`/
 * `catalog-search`, vía `ProductGrid`/`ProductDetailModal`) y que hasta
 * ahora venía de `Section.items` (contenido embebido, pre-Fase 3). Un
 * solo lugar para esta conversión -- server-side (SSR de la página de
 * categoría, Fase 5.3) y client-side (overlay de precio,
 * `useCatalogOverlay.js`) usan exactamente la misma función, así que las
 * dos fuentes de items nunca divergen en forma.
 *
 * Sin `"use client"` a propósito: no toca ningún API de navegador, así
 * que es igual de válido importarlo desde un Server Component
 * (`productos/[categoria]/page.js`) que desde un hook client-side.
 *
 * Nunca inventa campos que el `Product` no trae -- `price` queda
 * `undefined` (no `null` ni `"$0.00"`) si el backend lo omitió por
 * gating de precio (Fase 0, visitante sin sesión aprobada) o si el
 * producto todavía no tiene precio cargado; `item?.price &&` en
 * `ProductGrid`/`ProductCards`/`ProductDetailModal` ya trata
 * `undefined` como "no mostrar precio", así que el gating del backend
 * se propaga solo, sin lógica extra acá.
 */
export function mapProductToItem(product) {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    image: product.image || "",
    description: product.description || "",
    price: formatPrice(product.price),
    details: product.details || {},
    featured: Boolean(product.featured),
    isOutOfStock: Boolean(product.is_out_of_stock),
    // Se conserva la lista de nodos de taxonomía tal como la manda la
    // API (`[{id, taxonomy, path}]`) -- no se usa para mostrar nada en
    // pantalla (a diferencia del resto de los campos), es lo que
    // `useCatalogOverlay.js` necesita para decidir si un producto
    // "universal" (sin nodo de la taxonomía "vehiculos") o el vehículo
    // elegido aplica, sin pedir de nuevo al backend.
    taxonomyNodes: Array.isArray(product.taxonomy_nodes)
      ? product.taxonomy_nodes
      : [],
  };
}

function formatPrice(rawPrice) {
  if (rawPrice === undefined || rawPrice === null || rawPrice === "") {
    return undefined;
  }
  const value = Number(rawPrice);
  if (Number.isNaN(value)) return undefined;
  return `$${value.toFixed(2)}`;
}
