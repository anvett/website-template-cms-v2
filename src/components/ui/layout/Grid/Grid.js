import {
  gridAlignments,
  gridGaps,
  gridJustify,
  resolveGridCols,
} from "./grid.tokens";

function getResponsiveCols(responsiveCols = {}) {
  return {
    "--grid-cols-base": resolveGridCols(responsiveCols.base || 1),
    "--grid-cols-md": resolveGridCols(responsiveCols.md || responsiveCols.base || 1),
    "--grid-cols-lg": resolveGridCols(
      responsiveCols.lg || responsiveCols.md || responsiveCols.base || 1
    ),
    "--grid-cols-xl": resolveGridCols(
      responsiveCols.xl ||
        responsiveCols.lg ||
        responsiveCols.md ||
        responsiveCols.base ||
        1
    ),
  };
}

/**
 * Grid UI Base
 *
 * Sistema reutilizable de grillas responsive.
 *
 * Soporta:
 * - columnas responsivas
 * - gaps configurables
 * - alineación
 * - justificación
 *
 * Props principales:
 * - cols
 * - responsiveCols
 * - gap
 * - align
 * - justify
 *
 * Uso recomendado:
 * - cards
 * - galerías
 * - layouts multipanel
 * - servicios
 * - productos
 *
 * Reglas:
 * - Mantener responsive-first.
 * - Evitar grids rígidos desktop-only.
 * - Preferir responsiveCols cuando existan múltiples breakpoints.
 */

export default function Grid({
  as: Component = "div",
  cols = 1,
  gap = "md",
  responsiveCols,
  align = "stretch",
  justify = "stretch",
  children,
}) {
  const resolvedGap = gridGaps[gap] || gridGaps.md;
  const resolvedAlign = gridAlignments[align] || gridAlignments.stretch;
  const resolvedJustify = gridJustify[justify] || gridJustify.stretch;

  const gridCols = responsiveCols
    ? getResponsiveCols({
        base: cols,
        ...responsiveCols,
      })
    : getResponsiveCols({
        base: cols,
      });

  return (
    <Component
      className="ui-grid"
      style={{
        ...gridCols,
        "--grid-gap": resolvedGap,
        "--grid-align": resolvedAlign,
        "--grid-justify": resolvedJustify,
      }}
    >
      {children}
    </Component>
  );
}