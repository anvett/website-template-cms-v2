import { notFound } from "next/navigation";

import { fetchSiteData, isCmsEnabled } from "@/lib/cms";
import { ProductDetailView } from "@/components/sections/products/ProductDetailView";
import { fetchProduct } from "@/lib/storefront/catalog";
import { mapProductToItem } from "@/lib/storefront/mapProduct";

/**
 * Página de producto individual (Fase 5.4, roadmap sección 5):
 * `/productos/producto/{slug}` — hasta ahora el único detalle de
 * producto vivía en un modal (`ProductDetailModal.jsx`), sin URL propia,
 * invisible para buscadores (confirmado contra el código antes de
 * empezar esta fase: el único route dinámico bajo `/productos` era
 * `[categoria]`). Esta Page cierra ese hueco: URL estable + JSON-LD
 * (Schema.org Product) para que el catálogo sea indexable de verdad.
 *
 * SSR SIEMPRE anónimo (`fetchProduct(slug)` sin token) -- mismo criterio
 * que el resto del catálogo (Fase 5.3): el HTML que ve un crawler o un
 * visitante sin sesión nunca debe depender de quién lo pide, y el precio
 * nunca debe filtrarse fuera de una sesión de cliente aprobada. El
 * overlay de precio para clientes logueados es 100% client-side
 * (`ProductDetailView`, Client Component). Por la misma razón, el JSON-LD
 * de acá abajo -- construido a partir de este mismo fetch anónimo --
 * NUNCA incluye `offers.price`: es exactamente el mismo gating que ya
 * aplica el resto de la Fase 0/4, sin una excepción especial "para SEO".
 *
 * 404 real (`notFound()`) si el producto no existe, no es de este Site,
 * está inactivo, o la API de catálogo no está disponible -- no hay
 * contenido de fallback razonable para mostrar sin el `Product` real
 * (a diferencia de las páginas de categoría/vehículo, que sí tienen
 * chrome propio y pueden degradar a "sin resultados").
 */
async function loadProduct(slug) {
  try {
    const product = await fetchProduct(slug);
    return { product, item: mapProductToItem(product) };
  } catch {
    return null;
  }
}

async function loadSiteContext() {
  if (!isCmsEnabled()) return { domain: "", whatsappNumber: "" };
  try {
    const siteData = await fetchSiteData();
    return {
      domain: siteData?.site?.domain || "",
      whatsappNumber: (siteData?.contact?.whatsapp || "").replace(/^\+/, ""),
    };
  } catch {
    return { domain: "", whatsappNumber: "" };
  }
}

function buildProductJsonLd({ item, domain }) {
  const productUrl = domain ? `${domain}/productos/producto/${item.slug}` : undefined;
  const brandNode = (item.taxonomyNodes || []).find(
    (node) => node.taxonomy === "vehiculos"
  );
  const brandName = brandNode?.path?.split(">")[0]?.trim();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: item.description || undefined,
    image: item.image ? [item.image] : undefined,
    sku: item.slug,
    url: productUrl,
    brand: brandName ? { "@type": "Brand", name: brandName } : undefined,
    offers: {
      "@type": "Offer",
      url: productUrl,
      availability: item.isOutOfStock
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      // Deliberadamente SIN `price`/`priceCurrency` -- ver docstring de
      // la Page. Si en algún momento este fetch dejara de ser siempre
      // anónimo, `item.price` ya viene formateado ("$150.00") y habría
      // que separar el número antes de sumarlo acá.
    },
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await loadProduct(slug);
  if (!result) return {};

  return {
    title: `${result.item.title} — Eurocentro`,
    description:
      result.item.description ||
      `${result.item.title}, disponible en el catálogo de Eurocentro.`,
  };
}

export default async function ProductoPage({ params }) {
  const { slug } = await params;
  const result = await loadProduct(slug);
  if (!result) notFound();

  const { domain, whatsappNumber } = await loadSiteContext();
  const jsonLd = buildProductJsonLd({ item: result.item, domain });

  return (
    <main>
      {/* JSON-LD estándar de Next.js App Router -- no hay forma de
          inyectar <script type="application/ld+json"> sin
          dangerouslySetInnerHTML; el contenido es JSON armado acá mismo
          (nunca HTML de terceros/usuario). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView
        initialItem={result.item}
        slug={slug}
        whatsappNumber={whatsappNumber}
      />
    </main>
  );
}
