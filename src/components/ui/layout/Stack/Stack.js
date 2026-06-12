import {
  stackAlignments,
  stackDirections,
  stackGaps,
  stackJustify,
} from "./stack.tokens";

/**
 * Stack UI Base
 *
 * Sistema reutilizable para distribución flex.
 *
 * Soporta:
 * - row
 * - column
 * - gaps
 * - alignment
 * - justify
 * - wrap
 *
 * Uso recomendado:
 * - grupos de botones
 * - listas
 * - layouts simples
 * - composición vertical
 * - composición horizontal
 *
 * Reglas:
 * - Preferir Stack para agrupaciones simples.
 * - Usar Grid cuando exista estructura de columnas.
 * - Mantener responsive-first.
 */

export default function Stack({
  as: Component = "div",
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  children,
}) {
  const resolvedDirection =
    stackDirections[direction] || stackDirections.column;

  const resolvedGap = stackGaps[gap] || stackGaps.md;
  const resolvedAlign = stackAlignments[align] || stackAlignments.stretch;
  const resolvedJustify = stackJustify[justify] || stackJustify.start;

  return (
    <Component
      className="ui-stack"
      style={{
        "--stack-direction": resolvedDirection,
        "--stack-gap": resolvedGap,
        "--stack-align": resolvedAlign,
        "--stack-justify": resolvedJustify,
        "--stack-wrap": wrap ? "wrap" : "nowrap",
      }}
    >
      {children}
    </Component>
  );
}