/**
 * Bloque de campos de detalle de un producto (`item.details`), extraído
 * de `ProductDetailModal.jsx` (2026-09-02, Fase 5.4) para reusarlo tal
 * cual en la página de producto individual (`ProductDetailView.jsx`) --
 * antes solo vivía dentro del modal, y la página de producto necesita
 * exactamente el mismo bloque (mismos campos, mismo orden), no una copia
 * que pueda ir divergiendo con el tiempo (CLAUDE.md, "Reglas de
 * Reutilización").
 *
 * `details` acepta la UNIÓN de las dos formas que ya existían en el
 * catálogo real (parts-gallery: description/compatibility/notes;
 * product-cards: description/includes[]/specifications[]/
 * recommendedFor/warranty) -- cada campo se renderiza solo si viene
 * presente, ver docstring original en ProductDetailModal.jsx.
 */
export function ProductDetailFields({ details }) {
  const safeDetails = details || {};

  return (
    <div className="flex flex-col gap-5">
      {safeDetails.description && (
        <p className="text-[1rem] leading-7 text-[var(--color-text-soft)]">
          {safeDetails.description}
        </p>
      )}

      {safeDetails.includes?.length > 0 && (
        <DetailList title="Incluye" items={safeDetails.includes} />
      )}

      {safeDetails.specifications?.length > 0 && (
        <DetailList title="Especificaciones" items={safeDetails.specifications} />
      )}

      {safeDetails.compatibility && (
        <DetailBlock title="Compatibilidad" text={safeDetails.compatibility} />
      )}

      {safeDetails.recommendedFor && (
        <DetailBlock title="Recomendado para" text={safeDetails.recommendedFor} />
      )}

      {safeDetails.warranty && (
        <DetailBlock title="Garantía" text={safeDetails.warranty} />
      )}

      {safeDetails.notes && <DetailBlock title="Notas" text={safeDetails.notes} />}
    </div>
  );
}

function DetailList({ title, items }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-bold text-[var(--color-primary)]">{title}</h4>
      <ul className="list-disc space-y-1 pl-5 text-[0.9rem] leading-6 text-[var(--color-text-soft)]">
        {items.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

function DetailBlock({ title, text }) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="font-bold text-[var(--color-primary)]">{title}</h4>
      <p className="text-[0.9rem] leading-6 text-[var(--color-text-soft)]">{text}</p>
    </div>
  );
}

export default ProductDetailFields;
