/**
 * Etiqueta roja "Sin stock" (roadmap sección 4 del catálogo avanzado:
 * "si stock == 0, aparece una etiqueta roja... en la card, el modal y
 * la página de producto" -- inventario simple, deliberadamente sin
 * lógica de descuento automático, ver `Product.is_out_of_stock` en
 * `backend/storefront/models.py`). Compartida entre `ProductGrid`
 * (card), `ProductDetailModal` y el header del acordeón de
 * `PartsGallery` -- un solo lugar para no repetir el mismo `<span>` con
 * estilos ligeramente distintos en cada uno.
 *
 * No renderiza nada si `isOutOfStock` es falsy -- productos con
 * `stock` sin trackear (`null`) o con unidades disponibles no muestran
 * ninguna etiqueta, mismo criterio que el resto del catálogo (CLAUDE.md:
 * cada campo se muestra solo si aplica, nunca un placeholder vacío).
 */
export function OutOfStockBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-[var(--radius-pill)] bg-[var(--color-danger)] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-white ${className}`}
    >
      Sin stock
    </span>
  );
}

export default OutOfStockBadge;
