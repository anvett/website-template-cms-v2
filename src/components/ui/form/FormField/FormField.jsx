import { Text } from "@/components/ui/content/Text";

/**
 * FormField UI Base
 *
 * Componente estructural para campos de formulario.
 *
 * Responsabilidad:
 * - label
 * - helpText
 * - error
 * - required
 *
 * No controla:
 * - valor
 * - validación
 * - estado
 *
 * Uso recomendado:
 * - Input
 * - Select
 * - Textarea
 *
 * Reglas:
 * - Mantener accesibilidad mediante htmlFor.
 * - Mostrar errores de forma consistente.
 */

export function FormField({
  label,
  htmlFor,
  helpText,
  error,
  required = false,
  className = "",
  children,
}) {
  return (
    <div className={["flex w-full flex-col gap-2", className].filter(Boolean).join(" ")}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="flex items-center gap-1 font-bold text-[0.925rem] leading-[1.4] text-[var(--color-primary)]"
        >
          <span>{label}</span>
          {required && (
            <span className="text-[var(--color-accent)]" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {children}

      {helpText && !error && (
        <Text as="p" size="sm" tone="muted">
          {helpText}
        </Text>
      )}

      {error && (
        <p className="text-[0.875rem] leading-[1.5] text-[var(--color-danger)]">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;