import { Heading } from "@/components/ui/content/Heading";
import { Text } from "@/components/ui/content/Text";

const alignClasses = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

/**
 * SectionHeader UI Base
 *
 * Componente reutilizable para encabezados de sections.
 * Agrupa eyebrow, title y description con una estructura consistente.
 *
 * Depende de:
 * - Heading
 * - Text
 * - variables globales de globals.css
 * - clases tipográficas globales
 *
 * Props principales:
 * - eyebrow
 * - title
 * - description
 * - align
 * - titleLevel
 * - titleAs
 * - descriptionSize
 * - className
 *
 * Reglas:
 * - Usar en sections normales.
 * - No forzar su uso en Hero, CTA visuales o composiciones complejas.
 * - No hardcodear contenido.
 * - No controlar layout completo de una section.
 */

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  titleLevel = "h2",
  titleAs = "h2",
  descriptionSize = "lg",
  className = "",
}) {
  if (!eyebrow && !title && !description) return null;

  return (
    <div
      className={[
        "section-header flex flex-col gap-3",
        alignClasses[align] || alignClasses.center,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <p className="section-header__eyebrow text-body-sm font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      )}

      {title && (
        <Heading
          as={titleAs}
          level={titleLevel}
          tone="primary"
          align={align}
          className="section-header__title"
        >
          {title}
        </Heading>
      )}

      {description && (
        <Text
          size={descriptionSize}
          tone="muted"
          align={align}
          className="section-header__description max-w-[760px]"
        >
          {description}
        </Text>
      )}
    </div>
  );
}

export default SectionHeader;