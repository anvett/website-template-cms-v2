"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { fetchTaxonomyTree, isStorefrontEnabled } from "./catalog";

const STORAGE_KEY = "storefront_vehicle_selection";

// Slug fijo de la taxonomía maestra sembrada por
// `seed_catalog_v2.py` (Fase 6) -- ver
// docs/decisions/CATALOGO-AVANZADO-VEHICULAR-ROADMAP.md sección 3:
// catálogo vehicular COMPARTIDO entre tenants, mismo slug para
// cualquier instancia que también venda repuestos.
const VEHICLE_TAXONOMY_SLUG = "vehiculos";

const VehicleSelectionContext = createContext(null);

function readStoredPath() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((id) => Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
}

/**
 * Selector de vehículo persistente (Fase 5.2, roadmap sección 8): el
 * visitante elige marca -> modelo -> año -> motorización una sola vez y
 * la elección se recuerda entre páginas (`localStorage`, mismo criterio
 * que `CartContext`/`CustomerSessionContext`) -- no debería tener que
 * re-elegirlo en cada categoría/producto que visite.
 *
 * Deliberadamente genérico en PROFUNDIDAD: este Context no sabe que
 * "hay 4 niveles" ni sus nombres (Marca/Modelo/Año/Motorización) -- eso
 * es contenido de la taxonomía real "vehiculos" (Fase 2/6), no algo que
 * el código deba fijar. `path` es un array de ids de `TaxonomyNode`
 * (uno por nivel elegido) y `tree` (el árbol completo, Fase 4 `GET
 * storefront/taxonomies/vehiculos/`) es lo que le dice a la UI
 * (`VehicleSelector`, componente separado) cuántos niveles hay y qué
 * opciones mostrar en cada uno -- mismo principio "motor genérico en
 * código, semántica en Data" que ya sigue el resto del proyecto
 * (CLAUDE.md).
 *
 * `selectedLeaf` es el nodo más profundo del camino elegido -- lo que
 * las páginas de categoría (Fase 5.3) usan como `?node=` adicional para
 * filtrar productos de ESE vehículo exacto. `isComplete` distingue
 * "eligió hasta el final" (el nodo no tiene hijos) de "eligió marca pero
 * no terminó" -- una elección a medias no debería filtrar por un nodo
 * intermedio como si fuera la motorización exacta.
 */
export function VehicleSelectionProvider({ children }) {
  const enabled = isStorefrontEnabled();
  const [tree, setTree] = useState(null);
  const [treeStatus, setTreeStatus] = useState(
    enabled ? "loading" : "disabled"
  );
  const [path, setPath] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetchTaxonomyTree(VEHICLE_TAXONOMY_SLUG)
      .then((data) => {
        if (cancelled) return;
        setTree(data.nodes || []);
        setTreeStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        // Sin árbol (Site sin taxonomía "vehiculos" todavía, o la API
        // caída) -- degrada a "no hay selector", nunca rompe el resto
        // del sitio. Mismo criterio que `_resolve_optional_customer` en
        // el backend: fallar acá no debe tumbar nada más.
        setTree(null);
        setTreeStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    // Mismo patrón ya documentado en CartContext.jsx: leer localStorage
    // recién en el efecto (no en el initializer de useState) para no
    // desalinear el HTML de servidor del primer render de cliente.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPath(readStoredPath());
    setHydrated(true);
  }, [enabled]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(path));
  }, [path, hydrated]);

  // Resuelve `path` (ids) contra `tree` (árbol real) nivel por nivel --
  // devuelve el camino de NODOS completos, no solo ids. Si el árbol
  // todavía no cargó, o un id guardado ya no existe (nodo borrado del
  // lado del Admin desde la última visita), corta ahí en vez de romper.
  const levels = useMemo(() => {
    if (!tree) return [];
    const result = [];
    let currentOptions = tree;
    for (const id of path) {
      const node = currentOptions.find((candidate) => candidate.id === id);
      if (!node) break;
      result.push(node);
      currentOptions = node.children || [];
    }
    return result;
  }, [tree, path]);

  // Opciones disponibles para el PRÓXIMO nivel a elegir: hijos del
  // último nodo confirmado, o las raíces (marcas) si no eligió nada
  // todavía.
  const nextOptions = useMemo(() => {
    if (!tree) return [];
    if (levels.length === 0) return tree;
    return levels[levels.length - 1].children || [];
  }, [tree, levels]);

  const selectedLeaf = levels.length > 0 ? levels[levels.length - 1] : null;
  const isComplete =
    Boolean(selectedLeaf) && (selectedLeaf.children || []).length === 0;

  // `depth` es el índice (0-based) del nivel que se está eligiendo --
  // cualquier selección hecha en niveles más profundos que ya no aplican
  // (ej. cambiar de Modelo después de haber elegido Año) se descarta.
  const selectAt = useCallback((depth, nodeId) => {
    setPath((current) => {
      const next = current.slice(0, depth);
      if (nodeId !== null && nodeId !== undefined && nodeId !== "") {
        next.push(Number(nodeId));
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => setPath([]), []);

  // Reemplaza el camino completo de una sola vez -- a diferencia de
  // `selectAt` (un nivel a la vez, desde la UI del `VehicleSelector`),
  // esto es para cuando el visitante aterriza directo en una URL de
  // vehículo específica (`/productos/vehiculo/{marca}/{modelo}/{anio}/
  // {motorizacion}`, Fase 5.4) y el selector persistente debe reflejar
  // esa elección sin que haya pasado por los `<select>` en cascada. Ver
  // `SyncVehicleSelection` (componente client-only que llama a esto
  // desde esa Page). No hace nada si el camino nuevo es igual al que ya
  // había (evita un `setState`/escritura a `localStorage` de más en
  // cada render de esa página).
  const replacePath = useCallback((nextPath) => {
    const normalized = Array.isArray(nextPath)
      ? nextPath.filter((id) => Number.isInteger(id))
      : [];
    setPath((current) => {
      const same =
        current.length === normalized.length &&
        current.every((id, index) => id === normalized[index]);
      return same ? current : normalized;
    });
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      treeStatus,
      tree,
      path,
      levels,
      nextOptions,
      selectedLeaf,
      isComplete,
      selectAt,
      replacePath,
      clear,
    }),
    [
      enabled,
      treeStatus,
      tree,
      path,
      levels,
      nextOptions,
      selectedLeaf,
      isComplete,
      selectAt,
      replacePath,
      clear,
    ]
  );

  return (
    <VehicleSelectionContext.Provider value={value}>
      {children}
    </VehicleSelectionContext.Provider>
  );
}

export function useVehicleSelection() {
  const ctx = useContext(VehicleSelectionContext);
  if (!ctx) {
    throw new Error(
      "useVehicleSelection debe usarse dentro de <VehicleSelectionProvider>"
    );
  }
  return ctx;
}
