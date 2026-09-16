"use client";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/actions/Button";
import { Modal } from "@/components/ui/feedback/Modal";
import { OutOfStockBadge } from "@/components/sections/products/OutOfStockBadge";
import { ProductDetailFields } from "@/components/sections/products/ProductDetailFields";
import { useCart } from "@/lib/storefront/CartContext";
import { isStorefrontEnabled } from "@/lib/storefront/env";

/**
 * Modal de detalle de producto, compartido entre las dos variants del
 * component `products` (`product-cards` y `parts-gallery`) y por la nueva
 * `catalog-search` — antes cada variant tenía su propia copia casi
 * idéntica (ProductDetailsModal / PartDetailsModal), duplicando el mismo
 * layout. Se extrajo acá (2026-08-29, a pedido del dueño del proyecto: "el
 * modal no debe ser solo un cuadro en medio sino algo más grande y mejor
 * estilizado") para que las tres variants compartan exactamente el mismo
 * componente en vez de ir divergiendo con el tiempo.
 *
 * `item.details` acepta la UNIÓN de las dos formas que ya existían en el
 * catálogo real (verificado contra seed_eurocentro.py, no inventado):
 * - parts-gallery: { description, compatibility, notes }
 * - product-cards: { description, includes[], specifications[],
 *   recommendedFor, warranty }
 * Cada campo se renderiza solo si viene presente — un producto puede traer
 * cualquier combinación (o ninguno) de estos campos, sin romper el modal.
 * Esto también lo deja listo para cualquier otro rubro (CLAUDE.md, no
 * hardcodear supuestos de un solo vertical): una florería simplemente no
 * llena `compatibility`, y el modal no muestra esa sección.
 *
 * 2026-09-02 — antes había dos botones "Consultar por WhatsApp" (uno por
 * breakpoint, `hidden md:inline-flex` / `md:hidden`, pensados para no
 * repetirse en pantalla) pero en la práctica ambos podían quedar visibles
 * a la vez y sin alinear entre sí. Se reemplazó por un único footer con
 * dos botones parejos: "Cerrar" (mismo método que la X, vía `onClose`) y
 * "Consultar por WhatsApp" — un solo lugar, siempre visible, sin
 * duplicarse por tamaño de pantalla.
 *
 * 2026-09-02 (Fase 1) — se agrega "Agregar al carrito" entre "Cerrar" y
 * "Consultar por WhatsApp", solo si esta instancia tiene storefront
 * configurado (`isStorefrontEnabled()`). No reemplaza el botón de
 * WhatsApp directo: el carrito es para consolidar varios productos en un
 * solo pedido, la consulta directa sigue sirviendo para preguntar por
 * este producto puntual sin pasar por el carrito.
 */
export function ProductDetailModal({ item, isOpen, onClose, whatsappNumber }) {
  const { addItem } = useCart();
  const cartEnabled = isStorefrontEnabled();
  const details = item?.details || {};
  const whatsappHref =
    whatsappNumber && item?.title
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          `Hola, deseo más información sobre ${item.title}.`
        )}`
      : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={details.title || item?.title}
      description={item?.price ? `Precio referencial: ${item.price}` : ""}
      size="xl"
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col gap-4">
          {item?.image && (
            <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)]">
              <img
                src={item.image}
                alt={item.title || ""}
                className="aspect-square w-full object-contain p-6 md:aspect-auto md:h-[22rem]"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {item?.category && (
              <span className="inline-flex w-fit items-center rounded-[var(--radius-pill)] bg-[var(--color-primary)] px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-text-inverse)]">
                {item.category}
              </span>
            )}
            {item?.isOutOfStock && <OutOfStockBadge />}
          </div>
        </div>

        <ProductDetailFields details={details} />
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 sm:flex-row">
        <Button variant="outline" onClick={onClose} className="sm:flex-1">
          Cerrar
        </Button>
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
    </Modal>
  );
}

export default ProductDetailModal;
