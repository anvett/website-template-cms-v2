/**
 * Select UI Base
 *
 * Campo reutilizable para selección de opciones.
 *
 * Soporta:
 * - arrays simples
 * - arrays de objetos
 * - placeholder
 *
 * Uso recomendado:
 * - formularios
 * - filtros
 * - configuraciones CMS
 *
 * Reglas:
 * - Mantener opciones desacopladas.
 * - Consumir datos externos.
 */

export function Select({
  options = [],
  placeholder,
  className = "",
  invalid = false,
  ...props
}) {
  const classes = [
    "min-h-12 w-full rounded-[var(--radius-md)] border bg-[var(--color-bg-white)] px-4 py-3 text-[1rem] leading-[1.5] text-[var(--color-text)] outline-none transition-colors duration-200",
    invalid
      ? "border-red-500 focus:border-red-500"
      : "border-[var(--color-border)] focus:border-[var(--color-primary)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <select
      aria-invalid={invalid ? "true" : "false"}
      className={classes}
      defaultValue=""
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {options.map((option, index) => {
        if (typeof option === "string") {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        }

        return (
          <option
            key={option.value ?? index}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
}

export default Select;