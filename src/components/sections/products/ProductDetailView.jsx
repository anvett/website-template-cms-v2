"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/actions/Button";
import { OutOfStockBadge } from "@/components/sections/products/OutOfStockBadge";
import { ProductDetailFields } from "@/components/sections/products/ProductDetailFields";
import { useCart } from "@/lib/storefront/CartContext";
import { useCustomerSession } from "@/lib/storefront/CustomerSessionContext";
import { isStorefrontEnabled } from "@/lib/storefront/env";
import { fetchProduct } from "@/lib/storefront/catalog";
import { mapProductToItem } from "@/lib/storefront/mapProduct";

/**
 * Página de producto individual (Fase 5.4, roadmap sección 5) -- Client
 * Component que recibe `initialItem` (ya mapeado, pedido SIN sesión por
 * el Server Component `productos/producto/[slug]/page.js`, mismo motivo
 * que el resto del catálogo: SSR siempre anónimo para SEO/crawlers,
 * nunca debe depender de quién pide el HTML) y aplica el mismo overlay
 * de precio client-side que `useCatalogOverlay.js` (Fase 5.3), pero para
 * UN producto en vez de una lista -- por eso es un hook separado en vez
 * de forzar ese hook a cubrir los dos casos.
 *
 * `whatsappNumber` viene del `Site.contact.whatsapp` global (a
 * diferencia de las Sections normales, esta página no tiene
 * `meta.whatsappNumber` propio porque no hay ninguna Section real detrás
 * -- ver docstring de la Page).
 */
export function ProductDetailView({ initialItem, slug, whatsappNumber }) {
  const { addItem } = useCart();
  const { canSeePrices, token } = useCustomerSession();
  const cartEnabled = isStorefrontEnabled();
  const [pricedItem, setPricedItem] = useState(null);

  useEffect(() => {
    if (!canSeePrices || !token) {
      // Mismo patrón documentado en useCatalogOverlay.js/
      // CustomerSessionContext.jsx: sincroniza con la sesión (sistema
      // externo), la excepción legítima de la regla.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPricedItem(null);
      return;
    }

    let cancelled = false;
    fetchProduct(slug, { token, revalidate: false })
      .then((data) => {
        if (!cancelled) setPricedItem(mapProductToItem(data));
      })
      .catch(() => {
        if (!cancelled) setPricedItem(null);
      });

    return () => {
      cancelled = true;
    };
  }, [canSeePrices, token, slug]);

  const item = pricedItem || initialItem;
  const details = item?.details || {};
  const whatsappHref =
    whatsappNumber && item?.title
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          `Hola, deseo más información sobre ${item.title}.`
        )}`
      : null;

  return (
    <div className="section-container section-container--wide flex flex-col gap-10 py-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col gap-4">
          {item?.image && (
            <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)]">
              <img
                src={item.image}
                alt={item.title || ""}
                className="aspect-square w-full object-contain p-6 md:aspect-auto md:h-[26rem]"
              />
            </div>
          )}

          {item?.isOutOfStock && <OutOfStockBadge />}
        </div>

        <div className="flex flex-col gap-5">
          {item?.title && (
            <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-[var(--color-text)]">
              {item.title}
            </h1>
          )}

          {item?.price && (
            <p className="text-[1.5rem] font-bold text-[var(--color-primary)]">
              {item.price}
            </p>
          )}

          <ProductDetailFields details={details} />

          <div className="mt-4 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row">
            {cartEnabled && item?.title && (
              <Button
                variant="secondary"
                onClick={() => addItem(item)}
                className="sm:flex-1"
              >
                <ShoppingCart className="h-[1rem] w-[1rem]" aria-hidden="true" />
                Agregar al carrito
              </Button>
            )}
            {whatsappHref && (
              <Button
                href={whatsappHref}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:flex-1"
              >
                Consultar por WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailView;
