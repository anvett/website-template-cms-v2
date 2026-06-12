import { dividerSpaces, dividerTones } from "./divider.tokens";

/**
 * Divider UI Base
 *
 * Componente reutilizable para separar visualmente bloques
 * de contenido dentro de una misma section.
 *
 * Depende de:
 * - divider.tokens.js
 * - variables globales definidas en globals.css
 *
 * Tones:
 * - subtle
 * - default
 * - strong
 * - accent
 * - primary
 *
 * Spaces:
 * - sm
 * - md
 * - lg
 *
 * Uso recomendado:
 * - separar bloques informativos
 * - separar grupos de contenido
 * - dividir layouts extensos
 *
 * Reglas:
 * - No usar como sustituto de spacing.
 * - No hardcodear colores.
 * - Consumir variables globales.
 */
export default function Divider({
  as: Component = "hr",
  tone = "default",
  space = "md",
  className = "",
}) {
  const resolvedTone = dividerTones[tone] || dividerTones.default;
  const resolvedSpace = dividerSpaces[space] || dividerSpaces.md;

  return (
    <Component
      className={["ui-divider", className].filter(Boolean).join(" ")}
      aria-hidden={Component === "div" ? "true" : undefined}
      style={{
        "--divider-color": resolvedTone,
        "--divider-space": resolvedSpace,
      }}
    />
  );
}