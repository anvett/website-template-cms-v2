const sizeClasses = {
  xs: "text-body-sm",
  sm: "text-body-sm",
  base: "text-body",
  lg: "text-body-lg",
  xl: "text-body-lg",
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
 * Text UI Base
 *
 * Componente reutilizable para párrafos, descripciones y textos secundarios.
 * Centraliza tamaños, tonos y alineación.
 *
 * Depende de:
 * - clases tipográficas globales definidas en globals.css
 * - variables globales de color
 *
 * Props principales:
 * - as
 * - size
 * - align
 * - tone
 * - className
 *
 * Reglas:
 * - Usar para textos estándar de sections y componentes.
 * - No hardcodear colores.
 * - No usar escalas Tailwind genéricas.
 * - Permitir className para ajustes puntuales.
 */

export function Text({
  as: Tag = "p",
  size = "base",
  align = "left",
  tone = "default",
  className = "",
  children,
  ...props
}) {
  const classes = [
    sizeClasses[size] || sizeClasses.base,
    alignClasses[align] || alignClasses.left,
    toneClasses[tone] || toneClasses.default,
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

export default Text;