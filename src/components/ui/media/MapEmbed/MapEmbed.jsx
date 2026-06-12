/**
 * MapEmbed UI Base
 *
 * Componente reutilizable para mostrar mapas embebidos.
 *
 * Soporta:
 * - Google Maps
 * - iframes
 * - URLs embebidas
 *
 * Uso recomendado:
 * - Contact
 * - About
 * - Location
 * - Footer
 *
 * Reglas:
 * - No almacenar lógica de negocio.
 * - Mantener responsive.
 * - Mantener proporciones consistentes.
 */

export function MapEmbed({
  src,
  title = "Mapa de ubicación",
  className = "",
  height = "24rem",
  radius = "var(--radius-xl)",
  loading = "lazy",
}) {
  if (!src) return null;

  return (
    <div
      className={[
        "relative w-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-soft)] shadow-[var(--shadow-sm)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        height,
        borderRadius: radius,
      }}
    >
      <iframe
        src={src}
        title={title}
        loading={loading}
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
    </div>
  );
}

export default MapEmbed;