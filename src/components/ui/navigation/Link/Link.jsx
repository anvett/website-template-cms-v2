import NextLink from "next/link";

function isExternal(href) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function isAnchor(href) {
  return href.startsWith("#");
}

const variantClasses = {
  default:
    "inline-flex items-center gap-1 underline-offset-4 text-[var(--color-text)] hover:underline",
  muted:
    "inline-flex items-center gap-1 underline-offset-4 text-[var(--color-text-soft)] hover:text-[var(--color-text)]",
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
};

/**
 * Link UI Base
 *
 * Componente reutilizable para navegación interna,
 * navegación externa y enlaces de anclaje.
 *
 * Soporta:
 * - rutas Next.js
 * - enlaces externos
 * - mailto
 * - tel
 * - anchors
 *
 * Depende de:
 * - next/link
 * - variables globales de globals.css
 * - helpers de botones globales
 *
 * Variants:
 * - default
 * - muted
 * - primary
 * - secondary
 * - outline
 *
 * Uso recomendado:
 * - navegación
 * - botones enlace
 * - CTA
 * - footer
 * - menús
 * - cards clicables
 *
 * Reglas:
 * - No hardcodear colores.
 * - Mantener compatibilidad con Next.js.
 * - Usar href válido.
 * - Permitir target y atributos HTML mediante props.
 */

export function Link({
  href,
  variant = "default",
  className = "",
  children,
  ...props
}) {
  if (!href) return null;

  const classes = [variantClasses[variant] || variantClasses.default, className]
    .filter(Boolean)
    .join(" ");

  if (isExternal(href) || isAnchor(href)) {
    const externalProps =
      isExternal(href) && !href.startsWith("mailto:") && !href.startsWith("tel:")
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {};

    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}

export default Link;