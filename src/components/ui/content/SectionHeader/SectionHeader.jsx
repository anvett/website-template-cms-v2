import { Heading } from "@/components/ui/content/Heading";
import { Text } from "@/components/ui/content/Text";

const alignClasses = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

// Atajos que fijan una combinación título/descripción/eyebrow coherente.
// Cualquier otro valor de `tone` (ej. "accent", "secondary", "danger",
// "brandPrimary"...) se aplica igual a título y descripción, ya que
// Heading/Text soportan ese mismo vocabulario directamente.
const toneShortcuts = {
  default: {
    title: "primary",
    description: "muted",
    eyebrow: "text-[var(--color-primary)]",
  },
  inverse: {
    title: "inverse",
    description: "inverse",
    eyebrow: "text-[var(--color-accent)]",
  },
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
 * - tone (default | inverse | cualquier tone de Heading/Text: accent,
 *   primary, secondary, brandPrimary, brandSecondary, brandAccent, danger,
 *   muted). Ver [[resolveTone]] en sectionStyle.js — normalmente viene de
 *   `meta.tone` de la Section Data, con fallback automático según el fondo.
 * - titleTone / descriptionTone (override puntual e independiente, poco
 *   común — solo si título y descripción necesitan tonos distintos y
 *   "default"/"inverse" no alcanza)
 * - titleLevel
 * - titleAs
 * - descriptionSize
 * - className
 * - eyebrowClassName (override puntual de color/estilo del eyebrow)
 *
 * Reglas:
 * - Usar en sections normales.
 * - No forzar su uso en Hero, CTA visuales o composiciones complejas.
 * - No hardcodear contenido.
 * - No hardcodear tone — siempre debe poder recibirse por props/data.
 * - No controlar layout completo de una section.
 */

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default",
  titleTone,
  descriptionTone,
  titleLevel = "h2",
  titleAs = "h2",
  descriptionSize = "lg",
  className = "",
  eyebrowClassName = "",
}) {
  if (!eyebrow && !title && !description) return null;

  const shortcut = toneShortcuts[tone];
  const resolvedTitleTone = titleTone || shortcut?.title || tone;
  const resolvedDescriptionTone = descriptionTone || shortcut?.description || tone;
  const resolvedEyebrowClass = eyebrowClassName || shortcut?.eyebrow || "text-[var(--color-primary)]";

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
        <p
          className={[
            "section-header__eyebrow text-body-sm font-bold uppercase tracking-[0.08em]",
            resolvedEyebrowClass,
          ].join(" ")}
        >
          {eyebrow}
        </p>
      )}

      {title && (
        <Heading
          as={titleAs}
          level={titleLevel}
          tone={resolvedTitleTone}
          align={align}
          className="section-header__title"
        >
          {title}
        </Heading>
      )}

      {description && (
        <Text
          size={descriptionSize}
          tone={resolvedDescriptionTone}
          align={align}
          className={[
            "section-header__description max-w-[760px]",
            tone === "inverse" ? "opacity-80" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </Text>
      )}
    </div>
  );
}

export default SectionHeader;
