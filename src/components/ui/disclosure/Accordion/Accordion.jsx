"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Accordion UI Base
 *
 * Componente reutilizable para contenido expandible.
 *
 * Soporta:
 * - apertura individual
 * - apertura múltiple
 * - FAQ
 * - contenido dinámico
 *
 * Props principales:
 * - items
 * - allowMultiple
 * - defaultOpen
 * - className
 * - renderHeader(item, index, isOpen) — opcional
 * - renderContent(item, index, isOpen) — opcional
 *
 * Estructura esperada (si NO se pasan renderHeader/renderContent):
 *
 * {
 *   question: string,
 *   answer: string
 * }
 *
 * o
 *
 * {
 *   title: string,
 *   description: string
 * }
 *
 * `renderHeader`/`renderContent` (2026-08-29, agregado para el listado
 * de productos de `products/parts-gallery`): permiten reemplazar el
 * header (texto plano) y el contenido expandido (párrafo plano) por
 * JSX arbitrario (ej. thumbnail + precio en el header, botón "Ver
 * detalle" en el contenido) sin que cada Variant tenga que reimplementar
 * su propio acordeón — mismo componente, misma lógica de
 * apertura/cierre/accesibilidad, solo cambia qué se pinta adentro. Si no
 * se pasan, el comportamiento es exactamente el de antes (FAQ no se ve
 * afectado).
 *
 * Uso recomendado:
 * - FAQ
 * - contenido expandible
 * - listados densos (ej. catálogo de productos)
 * - documentación
 * - CMS futuro
 *
 * Reglas:
 * - Mantener accesibilidad.
 * - Mantener data desacoplada.
 * - No hardcodear contenido.
 * - Consumir variables globales.
 */

export function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  className = "",
  renderHeader,
  renderContent,
}) {
  const [openItems, setOpenItems] = useState(defaultOpen);

  if (!items.length) return null;

  function toggleItem(index) {
    setOpenItems((current) => {
      const isOpen = current.includes(index);

      if (allowMultiple) {
        return isOpen
          ? current.filter((item) => item !== index)
          : [...current, index];
      }

      return isOpen ? [] : [index];
    });
  }

  return (
    <div className={["w-full divide-y divide-[var(--color-border)]", className].filter(Boolean).join(" ")}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);
        const buttonId = `accordion-button-${index}`;
        const panelId = `accordion-panel-${index}`;

        return (
          <div key={item.id || item.question || index} className="py-4">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(index)}
              className="flex w-full items-start justify-between gap-4 text-left"
            >
              {renderHeader ? (
                renderHeader(item, index, isOpen)
              ) : (
                <span className="text-body-lg font-bold text-[var(--color-primary)]">
                  {item.question || item.title}
                </span>
              )}

              <ChevronDown
                aria-hidden="true"
                className={[
                  "mt-1 size-5 shrink-0 text-[var(--color-primary)] transition-transform duration-200",
                  isOpen ? "rotate-180" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={[
                "grid transition-all duration-200 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="overflow-hidden">
                {renderContent ? (
                  renderContent(item, index, isOpen)
                ) : (
                  <p className="pt-3 text-body text-[var(--color-text-soft)]">
                    {item.answer || item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;