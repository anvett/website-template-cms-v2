"use client";

const surfaceClasses = {
  base: "bg-[var(--color-bg-white)] text-[var(--color-text)]",
  soft: "bg-[var(--color-bg-soft)] text-[var(--color-text)]",
  subtle: "bg-[var(--color-bg-soft)] text-[var(--color-text)]",
  dark: "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]",
  strong: "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]",
};

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

const radiusClasses = {
  none: "rounded-none",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
};

const shadowClasses = {
  none: "shadow-none",
  sm: "shadow-[var(--shadow-sm)]",
  md: "shadow-[var(--shadow-md)]",
  lg: "shadow-[var(--shadow-lg)]",
};

/**
 * Card UI Base
 *
 * Componente contenedor reutilizable para agrupar contenido visual:
 * servicios, productos, features, testimonios, métricas, bloques informativos
 * o cualquier contenido tipo tarjeta.
 *
 * Depende de:
 * - Tailwind CSS
 * - variables globales de globals.css
 *
 * Props principales:
 * - as
 * - surface
 * - padding
 * - radius
 * - shadow
 * - border
 * - interactive
 * - className
 *
 * Reglas:
 * - No hardcodear colores de cliente.
 * - Usar variables globales para color, sombras, bordes y radios.
 * - No convertir Card en una section.
 * - No meter contenido fijo dentro del componente.
 */

export function Card({
  as: Tag = "div",
  surface = "base",
  padding = "md",
  radius = "lg",
  shadow = "sm",
  border = true,
  interactive = false,
  className = "",
  children,
  ...props
}) {
  const classes = [
    "w-full min-w-0",
    surfaceClasses[surface] || surfaceClasses.base,
    paddingClasses[padding] || paddingClasses.md,
    radiusClasses[radius] || radiusClasses.lg,
    shadowClasses[shadow] || shadowClasses.sm,
    border ? "border border-[var(--color-border)]" : "border-0",
    interactive
      ? "transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
      : "",
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

export default Card;