const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
};

const sizeClasses = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

/**
 * Button UI Base
 *
 * Componente reutilizable para acciones principales, secundarias
 * y enlaces destacados del sistema.
 *
 * Depende de las clases globales definidas en globals.css:
 * - btn-primary
 * - btn-secondary
 * - btn-outline
 *
 * Variants:
 * - primary
 * - secondary
 * - outline
 *
 * Sizes:
 * - sm
 * - md
 * - lg
 *
 * Reglas:
 * - No hardcodear colores aquí.
 * - No agregar estilos visuales específicos de cliente.
 * - Usar globals.css para identidad visual.
 */

export function Button({
  href,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
  children,
  ...props
}) {
  const classes = [
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || "",
    disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        aria-disabled={disabled ? "true" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;