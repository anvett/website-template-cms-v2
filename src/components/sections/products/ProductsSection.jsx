"use client";

import { ProductCards } from "./variants/product-cards/ProductCards";
import { PartsGallery } from "./variants/parts-gallery/PartsGallery";
import { CatalogSearch } from "./variants/catalog-search/CatalogSearch";

export function ProductsSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "product-cards":
      return <ProductCards data={data} />;

    case "parts-gallery":
      return <PartsGallery data={data} />;

    // 2026-08-29 — buscador de la página principal de Productos, ver
    // docstring de CatalogSearch.jsx.
    case "catalog-search":
      return <CatalogSearch data={data} />;

    default:
      return null;
  }
}

export default ProductsSection;