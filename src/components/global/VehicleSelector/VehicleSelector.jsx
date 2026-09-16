"use client";

import { Car, X } from "lucide-react";

import { useVehicleSelection } from "@/lib/storefront/VehicleSelectionContext";

// Etiquetas de presentación para la instancia real de la taxonomía
// "vehiculos" sembrada por seed_catalog_v2.py (Fase 6): Marca -> Modelo
// -> Año -> Motorización, 4 niveles (roadmap sección 3). El Context
// (`VehicleSelectionContext`) es genérico y no conoce estos nombres --
// viven acá, en el componente de presentación específico de este caso
// de uso, no en el motor. Un 5to nivel eventual (si la taxonomía
// creciera) cae en el fallback genérico "Nivel N", sin romper.
const LEVEL_LABELS = ["Marca", "Modelo", "Año", "Motorización"];

function labelFor(depth) {
  return LEVEL_LABELS[depth] || `Nivel ${depth + 1}`;
}

/**
 * Selector de vehículo persistente (Fase 5.2, roadmap sección 8) --
 * barra de `<select>` en cascada (Marca -> Modelo -> Año ->
 * Motorización), pensada para embeberse arriba de la grilla de
 * productos en las páginas de categoría/vehículo (Fase 5.3/5.4), no
 * como widget flotante global (a diferencia de `CartWidget`): no tiene
 * sentido en Home/Nosotros/Servicios, donde no hay catálogo que filtrar.
 *
 * No renderiza nada si el storefront no está configurado en esta
 * instancia, o si el Site todavía no tiene la taxonomía "vehiculos"
 * sembrada (`treeStatus === "error"`) -- mismo criterio de degradación
 * silenciosa que `CartWidget`/`isStorefrontEnabled()`.
 *
 * Arma un `<select>` por nivel recorriendo el árbol en vivo (`tree` +
 * `levels`, ambos del Context): el nivel 0 siempre lista las raíces
 * (`tree`), cada nivel siguiente lista los hijos del nodo confirmado en
 * el nivel anterior. Se corta de mostrar más `<select>` en cuanto llega
 * a un nivel sin elegir todavía (nada que listar más profundo) o a una
 * hoja real (nodo sin hijos, ej. la motorización exacta).
 */
export function VehicleSelector({ className = "" }) {
  const { enabled, treeStatus, tree, levels, selectAt, clear } =
    useVehicleSelection();

  if (!enabled || treeStatus === "error" || treeStatus === "disabled") {
    return null;
  }

  const selectLevels = [];
  let options = tree || [];
  let depth = 0;
  while (options.length > 0) {
    selectLevels.push({ depth, options, value: levels[depth]?.id ?? "" });
    const chosen = levels[depth];
    if (!chosen) break;
    options = chosen.children || [];
    depth += 1;
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-4 ${className}`}
    >
      <span className="flex items-center gap-2 text-[0.85rem] font-bold text-[var(--color-text)]">
        <Car className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
        Tu vehículo
      </span>

      {treeStatus === "loading" ? (
        <span className="text-[0.85rem] text-[var(--color-text-soft)]">
          Cargando...
        </span>
      ) : (
        <>
          {selectLevels.map((level) => (
            <LevelSelect
              key={level.depth}
              label={labelFor(level.depth)}
              options={level.options}
              value={level.value}
              onChange={(nodeId) => selectAt(level.depth, nodeId)}
            />
          ))}

          {levels.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="flex items-center gap-1 text-[0.8rem] text-[var(--color-text-soft)] underline underline-offset-2 transition hover:text-[var(--color-danger)]"
            >
              <X className="h-[0.9rem] w-[0.9rem]" aria-hidden="true" />
              Quitar
            </button>
          )}
        </>
      )}
    </div>
  );
}

function LevelSelect({ label, options, value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-[0.85rem] text-[var(--color-text-soft)]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value || null)}
        className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-2 py-1.5 text-[0.85rem] text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
      >
        <option value="">Elegir...</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default VehicleSelector;
