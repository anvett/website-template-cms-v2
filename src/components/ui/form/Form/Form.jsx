"use client";

/**
 * Form UI Base
 *
 * Componente contenedor para formularios del sistema.
 *
 * Responsabilidad:
 * - estructura semántica del formulario
 * - accesibilidad
 * - organización de campos
 *
 * No controla:
 * - validación
 * - envío
 * - estado
 * - integración API
 *
 * Props principales:
 * - onSubmit
 * - noValidate
 * - autoComplete
 * - id
 * - name
 * - ariaLabel
 *
 * Uso recomendado:
 * - formularios de contacto
 * - CMS futuro
 * - formularios internos
 *
 * Reglas:
 * - Mantener lógica de negocio fuera del componente.
 * - Mantener accesibilidad.
 */

export function Form({
  children,
  className = "",
  onSubmit,
  noValidate = false,
  autoComplete = "on",
  name,
  id,
  ariaLabel,
  ...props
}) {
  const classes = [
    "flex w-full flex-col gap-5",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <form
      id={id}
      name={name}
      onSubmit={onSubmit}
      noValidate={noValidate}
      autoComplete={autoComplete}
      aria-label={ariaLabel}
      className={classes}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;