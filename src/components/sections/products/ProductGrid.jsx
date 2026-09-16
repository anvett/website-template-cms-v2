"use client";

import { motion } from "framer-motion";
import { Info, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/actions/Button";
import { OutOfStockBadge } from "@/components/sections/products/OutOfStockBadge";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import { useCart } from "@/lib/storefront/CartContext";
import { isStorefrontEnabled } from "@/lib/storefront/env";

/**
 * Grilla de tarjetas de producto compartida entre `parts-gallery` (fila de
 * destacados + resultados de búsqueda local) y `catalog-search` (resultados
 * de búsqueda global). Extraída acá (2026-08-29) para no duplicar el mismo
 * markup de tarjeta en cada variant que necesita mostrar una grilla de
 * productos con su botón "Ver detalle".
 *
 * 2026-09-02 (Fase 1) — se agrega "Agregar al carrito" junto a "Ver
 * detalle". Solo se muestra si esta instancia tiene storefront
 * configurado (`isStorefrontEnabled()`); si no, el comportamiento queda
 * exactamente igual al de antes de esta fase.
 */
export function ProductGrid({ items, supportsModal, onSelect }) {
  const { addItem } = useCart();
  const cartEnabled = isStorefrontEnabled();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <motion.article
          key={item?.title || index}
          className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            ...defaultTransition,
            delay: index * 0.025,
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-white">
            {item?.image && (
              <img
                src={item.image}
                alt={item.title || ""}
                className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            )}

            {item?.category && (
              <span className="absolute left-3 top-3 rounded-[var(--radius-pill)] bg-[var(--color-primary)] px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-text-inverse)]">
                {item.category}
              </span>
            )}

            {item?.isOutOfStock && (
              <OutOfStockBadge className="absolute right-3 top-3" />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-4 p-5">
            <div className="flex flex-col gap-2">
              {item?.price && (
                <p className="text-[1.25rem] font-bold text-[var(--color-text)]">
                  {item.price}
                </p>
              )}

              {item?.title && (
                <h3 className="text-[1.125rem] font-bold leading-tight text-[var(--color-primary)]">
                  {item.title}
                </h3>
              )}

              {item?.description && (
                <p className="text-[0.9rem] leading-6 text-[var(--color-text-soft)]">
                  {item.description}
                </p>
              )}
            </div>

            <div className="mt-auto flex flex-wrap gap-2">
              {supportsModal && item?.details && (
                <Button variant="primary" onClick={() => onSelect(item)}>
                  <Info className="h-[1rem] w-[1rem]" aria-hidden="true" />
                  Ver detalle
                </Button>
              )}

              {cartEnabled && item?.title && (
                <Button
                  variant="outline"
                  onClick={() => addItem(item)}
                >
                  <ShoppingCart className="h-[1rem] w-[1rem]" aria-hidden="true" />
                  Agregar
                </Button>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

export default ProductGrid;
