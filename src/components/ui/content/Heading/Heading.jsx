const levelClasses = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h3",
  h5: "text-body-lg",
  h6: "text-body",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const toneClasses = {
  default: "text-[var(--color-text)]",
  muted: "text-[var(--color-text-soft)]",
  inverse: "text-[var(--color-text-inverse)]",
  accent: "text-[var(--color-accent)]",

  brandPrimary: "text-[var(--color-primary)]",
  brandSecondary: "text-[var(--color-secondary)]",
  brandAccent: "text-[var(--color-accent)]",

  primary: "text-[var(--color-primary)]",
  secondary: "text-[var(--color-secondary)]",
  danger: "text-[var(--color-danger)]",
};

/**
 * Heading UI Base
 *
 * Componente reutilizable para títulos del sistema.
 * Centraliza niveles visuales, alineación y tonos de texto.
 *
 * Depende de:
 * - clases tipográficas globales definidas en globals.css
 * - variables globales de color
 *
 * Props principales:
 * - as
 * - level
 * - align
 * - tone
 * - className
 *
 * Reglas:
 * - Usar para títulos estándar.
 * - Para títulos especiales de Hero o CTA, permitir className específico.
 * - No hardcodear colores.
 * - No usar escalas Tailwind genéricas tipo text-xl, text-2xl, text-4xl.
 * - Usar clases globales o medidas explícitas.
 */

export function Heading({
  as: Tag = "h2",
  level = "h2",
  align = "left",
  tone = "default",
  className = "",
  children,
  ...props
}) {
  const classes = [
    levelClasses[level] || levelClasses.h2,
    alignClasses[align] || alignClasses.left,
    toneClasses[tone] || toneClasses.default,
    "text-balance",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

export default Heading;