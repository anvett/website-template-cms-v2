/**
 * Textarea UI Base
 *
 * Campo reutilizable para textos extensos.
 *
 * Soporta:
 * - rows
 * - resize
 * - invalid
 *
 * Resize:
 * - none
 * - vertical
 * - both
 *
 * Uso recomendado:
 * - mensajes
 * - formularios de contacto
 * - CMS
 * - descripciones
 *
 * Reglas:
 * - Mantener consistencia visual con Input.
 * - Consumir variables globales.
 */

export function Textarea({
  className = "",
  invalid = false,
  rows = 5,
  resize = "vertical",
  ...props
}) {
  const resizeClass =
    resize === "none" ? "resize-none" : resize === "both" ? "resize" : "resize-y";

  const classes = [
    "w-full rounded-[var(--radius-md)] border bg-[var(--color-bg-white)] px-4 py-3 text-[1rem] leading-[1.6] text-[var(--color-text)] outline-none transition-colors duration-200 placeholder:text-[var(--color-text-soft)]",
    resizeClass,
    invalid
      ? "border-red-500 focus:border-red-500"
      : "border-[var(--color-border)] focus:border-[var(--color-primary)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <textarea
      rows={rows}
      aria-invalid={invalid ? "true" : "false"}
      className={classes}
      {...props}
    />
  );
}

export default Textarea;