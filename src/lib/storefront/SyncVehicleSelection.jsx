"use client";

import { useEffect } from "react";

import { useVehicleSelection } from "./VehicleSelectionContext";

/**
 * Sincroniza el `VehicleSelectionContext` persistente con el vehículo de
 * la URL actual -- usado únicamente por `/productos/vehiculo/{marca}/
 * {modelo}/{anio}/{motorizacion}/page.js` (Fase 5.4). Sin esto, un
 * visitante que entra directo a esa URL (ej. desde un link compartido o
 * el sitemap) ve los productos de SU vehículo en esa página, pero el
 * selector persistente (`VehicleSelector`, en el header/`PartsGallery`)
 * sigue vacío o con la elección anterior -- si después navega a una
 * categoría, deja de ver ese vehículo reflejado.
 *
 * `nodeIds`: los ids (no slugs) del camino completo, en orden
 * marca->modelo->año->motorización -- ya resueltos por
 * `resolveVehiclePath` en la Page. Renderiza `null`: es un componente de
 * efecto puro, no de UI (mismo patrón que otros "sync" client-only del
 * proyecto, ej. la hidratación de `localStorage` dentro del propio
 * Provider).
 */
export function SyncVehicleSelection({ nodeIds }) {
  const { replacePath } = useVehicleSelection();

  useEffect(() => {
    replacePath(nodeIds);
    // Solo debe re-sincronizar cuando cambia el vehículo de la URL (ej.
    // el visitante navega de un vehículo a otro) -- `replacePath` es
    // estable (`useCallback` con deps vacías) y no necesita estar acá.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeIds?.join(",")]);

  return null;
}
