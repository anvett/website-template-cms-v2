// import { Container } from "@/components/ui/layout/Container";

// export default function SectionWrapper({
//   as: Component = "section",
//   id,
//   containerWidth = "section",
//   className = "",
//   children,
// }) {
//   return (
//     <Component
//       id={id}
//       className={[
//         "ui-section-wrapper",
//         className,
//       ]
//         .filter(Boolean)
//         .join(" ")}
//     >
//       <Container width={containerWidth}>
//         {children}
//       </Container>
//     </Component>
//   );
// }

import { Container } from "@/components/ui/layout/Container";
import {
  sectionWrapperSpacing,
  sectionWrapperSurfaces,
} from "./section-wrapper.tokens";

/**
 * SectionWrapper UI Base
 *
 * Componente estructural reutilizable para envolver sections normales
 * con surface, spacing y containerWidth consistentes.
 *
 * Depende de:
 * - Container
 * - section-wrapper.tokens.js
 * - clases globales de globals.css
 * - variables globales de spacing
 *
 * Props principales:
 * - as
 * - id
 * - surface
 * - spacing
 * - containerWidth
 * - className
 * - children
 *
 * Reglas:
 * - Usar en sections normales.
 * - No forzar su uso en Hero, CTA visuales o composiciones complejas.
 * - Mantener retrocompatibilidad con sections existentes.
 * - No hardcodear colores ni spacing dentro del componente.
 */
export default function SectionWrapper({
  as: Component = "section",
  id,
  surface = "base",
  spacing = "default",
  containerWidth = "section",
  className = "",
  children,
}) {
  const resolvedSurface =
    sectionWrapperSurfaces[surface] || sectionWrapperSurfaces.base;

  const resolvedSpacing =
    sectionWrapperSpacing[spacing] || sectionWrapperSpacing.default;

  return (
    <Component
      id={id}
      className={["ui-section-wrapper", resolvedSurface, className]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--section-wrapper-spacing": resolvedSpacing,
      }}
    >
      <Container width={containerWidth}>{children}</Container>
    </Component>
  );
}