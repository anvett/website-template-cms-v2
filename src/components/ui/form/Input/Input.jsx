/**
 * Input UI Base
 *
 * Campo reutilizable para captura de texto.
 *
 * Soporta:
 * - text
 * - email
 * - tel
 * - number
 * - password
 * - url
 * - search
 *
 * Props principales:
 * - type
 * - invalid
 * - placeholder
 * - disabled
 * - required
 *
 * Uso recomendado:
 * - formularios
 * - filtros
 * - CMS futuro
 *
 * Reglas:
 * - No hardcodear colores.
 * - Consumir variables globales.
 */

export function Input({
  type = "text",
  className = "",
  invalid = false,
  ...props
}) {
  const classes = [
    "min-h-12 w-full rounded-[var(--radius-md)] border bg-[var(--color-bg-white)] px-4 py-3 text-[1rem] leading-[1.5] text-[var(--color-text)] outline-none transition-colors duration-200 placeholder:text-[var(--color-text-soft)]",
    invalid
      ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
      : "border-[var(--color-border)] focus:border-[var(--color-primary)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      type={type}
      aria-invalid={invalid ? "true" : "false"}
      className={classes}
      {...props}
    />
  );
}

export default Input;