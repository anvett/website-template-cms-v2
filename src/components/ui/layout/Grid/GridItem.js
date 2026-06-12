import { resolveGridSpan } from "./grid.tokens";

function getResponsiveSpans(responsiveColSpan = {}) {
  return {
    "--grid-item-col-span-base": resolveGridSpan(responsiveColSpan.base || 1),
    "--grid-item-col-span-md": resolveGridSpan(
      responsiveColSpan.md || responsiveColSpan.base || 1
    ),
    "--grid-item-col-span-lg": resolveGridSpan(
      responsiveColSpan.lg ||
        responsiveColSpan.md ||
        responsiveColSpan.base ||
        1
    ),
    "--grid-item-col-span-xl": resolveGridSpan(
      responsiveColSpan.xl ||
        responsiveColSpan.lg ||
        responsiveColSpan.md ||
        responsiveColSpan.base ||
        1
    ),
  };
}

function getRowSpan(rowSpan = 1) {
  const safeRowSpan =
    typeof rowSpan === "number" && rowSpan > 0 ? rowSpan : 1;

  return safeRowSpan;
}

/**
 * GridItem UI Base
 *
 * Elemento hijo de Grid.
 *
 * Permite:
 * - colSpan
 * - rowSpan
 * - spans responsivos
 *
 * Uso recomendado:
 * - layouts editoriales
 * - cards destacadas
 * - mosaicos
 * - galerías complejas
 *
 * Reglas:
 * - Usar únicamente dentro de Grid.
 * - Mantener coherencia con el número total de columnas.
 */

export default function GridItem({
  as: Component = "div",
  colSpan = 1,
  rowSpan = 1,
  responsiveColSpan,
  children,
}) {
  const resolvedSpans = responsiveColSpan
    ? getResponsiveSpans({
        base: colSpan,
        ...responsiveColSpan,
      })
    : getResponsiveSpans({
        base: colSpan,
      });

  return (
    <Component
      className="ui-grid-item"
      style={{
        ...resolvedSpans,
        "--grid-item-row-span": getRowSpan(rowSpan),
      }}
    >
      {children}
    </Component>
  );
}