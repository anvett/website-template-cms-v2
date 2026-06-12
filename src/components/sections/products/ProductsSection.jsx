"use client";

import { ProductCards } from "./variants/product-cards/ProductCards";
import { PartsGallery } from "./variants/parts-gallery/PartsGallery";

export function ProductsSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "product-cards":
      return <ProductCards data={data} />;

    case "parts-gallery":
      return <PartsGallery data={data} />;

    default:
      return null;
  }
}

export default ProductsSection;