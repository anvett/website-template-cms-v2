import { containerWidths } from "./container.tokens";

function getResponsiveWidthStyles(width) {
  const selectedWidth = containerWidths[width] || containerWidths.section;

  return {
    "--container-width-base": selectedWidth.base,
    "--container-width-md": selectedWidth.md || selectedWidth.base,
    "--container-width-xl": selectedWidth.xl || selectedWidth.md || selectedWidth.base,
  };
}

/**
 * Container UI Base
 *
 * Componente responsable de controlar anchos máximos
 * reutilizables del sistema.
 *
 * Variants:
 * - content
 * - section
 * - wide
 * - full
 *
 * Depende de:
 * - container.tokens.js
 * - variables globales de globals.css
 *
 * Uso recomendado:
 * - envolver contenido principal de sections
 * - controlar ancho visual consistente
 *
 * Reglas:
 * - No hardcodear max-width.
 * - Usar variantes oficiales.
 * - Mantener responsive.
 */

export default function Container({
  as: Component = "div",
  width = "section",
  children,
}) {
  const responsiveWidthStyles = getResponsiveWidthStyles(width);

  return (
    <Component
      className="ui-container"
      style={responsiveWidthStyles}
    >
      {children}
    </Component>
  );
}