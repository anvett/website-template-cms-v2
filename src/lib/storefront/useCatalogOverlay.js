"use client";

import { useEffect, useMemo, useState } from "react";

import { fetchProducts } from "./catalog";
import { mapProductToItem } from "./mapProduct";
import { useCustomerSession } from "./CustomerSessionContext";
import { useVehicleSelection } from "./VehicleSelectionContext";

// Mismo slug fijo que VehicleSelectionContext.jsx -- ver ese archivo
// para la justificación completa (catálogo vehicular compartido entre
// tenants, roadmap sección 3).
const VEHICLE_TAXONOMY_SLUG = "vehiculos";

/**
 * Overlay client-side sobre los `items` de una Section `products`
 * (Fase 5.3, roadmap secciones 6 y 8), pensado para usarse desde
 * `PartsGallery`/`ProductCards`/`CatalogSearch` -- los 3 variants que
 * consumen el catálogo real (Fase 4/6). Resuelve dos cosas que NUNCA
 * pueden decidirse en el servidor (`productos/[categoria]/page.js`,
 * SSR):
 *
 * 1. **Precio**: la sesión de cliente vive en `localStorage`, nunca
 *    llega al Server Component (ver decisión de diseño documentada en
 *    el roadmap/decision-log, "SSR siempre anónimo, overlay de precio
 *    client-side"). Si `useCustomerSession().canSeePrices` es `true`,
 *    este hook vuelve a pedir la MISMA lista (mismo `?node=` de
 *    categoría) pero con el token de sesión, y usa esos resultados (que
 *    sí traen `price`) en vez de los que vinieron por SSR.
 * 2. **Vehículo elegido**: el selector persistente (`VehicleSelector`,
 *    Fase 5.2) también es 100% client-side. NO hace falta pedir de
 *    nuevo al backend para esto -- los items que ya se tienen (SSR o el
 *    overlay de precio de arriba) ya traen `taxonomyNodes`
 *    (`mapProduct.js`), así que el filtro es un simple `.filter()` en
 *    memoria: un producto se mantiene si es "universal" (sin ningún
 *    nodo de la taxonomía "vehiculos") o si tiene el nodo hoja EXACTO
 *    del vehículo elegido. Deliberadamente NO se manda `?node=<vehículo>`
 *    en la query -- el filtro de la API es AND estricto (Fase 4), y
 *    eso excluiría a los productos universales, que sí deben seguir
 *    apareciendo (roadmap sección 4: "deben poder existir productos
 *    universales").
 *
 * `baseItems`: los items ya mapeados que vinieron por SSR (anónimos,
 * sin precio, ya filtrados por categoría). `categoryNodeId`: el id del
 * `TaxonomyNode` de categoría de esta página (lo resuelve la Page,
 * Fase 5.3) -- sin esto, el overlay de precio no tiene forma de pedir
 * "los mismos productos, con precio", así que se omite en silencio
 * (`baseItems` sin cambios, solo aplica el filtro de vehículo).
 */
export function useCatalogOverlay({ baseItems, categoryNodeId }) {
  const { canSeePrices, token } = useCustomerSession();
  const { selectedLeaf, isComplete } = useVehicleSelection();
  const [pricedItems, setPricedItems] = useState(null);

  useEffect(() => {
    if (!canSeePrices || !categoryNodeId || !token) {
      // Vuelve a "sin overlay de precio" apenas deja de haber sesión
      // (logout) -- no debe quedar precio pegado de una sesión anterior.
      // Mismo patrón ya documentado en CustomerSessionContext.jsx: este
      // `setState` sincroniza con `localStorage`/la sesión (un sistema
      // externo al render de React), la excepción legítima que la
      // propia regla describe.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPricedItems(null);
      return;
    }

    let cancelled = false;
    fetchProducts({
      nodeIds: [categoryNodeId],
      token,
      // `revalidate: false` -- a diferencia del SSR (cacheado por ISR a
      // propósito para visitantes anónimos), esta llamada es específica
      // de ESTE cliente logueado y no debería servir una respuesta
      // cacheada pensada para otro visitante/sesión.
      revalidate: false,
    })
      .then((data) => {
        if (cancelled) return;
        setPricedItems((data?.results || []).map(mapProductToItem));
      })
      .catch(() => {
        // La API de catálogo caída, o el token venció justo ahora --
        // degrada a los items de SSR (sin precio) en vez de romper la
        // página. Mismo criterio de "nunca bloquear" que ya sigue el
        // resto del storefront (`_resolve_optional_customer` en el
        // backend, `CustomerSessionProvider` en el frontend).
        if (!cancelled) setPricedItems(null);
      });

    return () => {
      cancelled = true;
    };
  }, [canSeePrices, categoryNodeId, token]);

  const items = useMemo(() => {
    const sourceItems = pricedItems || baseItems || [];
    if (!isComplete || !selectedLeaf) return sourceItems;
    return sourceItems.filter((item) => {
      const nodes = item.taxonomyNodes || [];
      const hasVehicleTag = nodes.some(
        (node) => node.taxonomy === VEHICLE_TAXONOMY_SLUG
      );
      if (!hasVehicleTag) return true; // producto universal, siempre visible.
      return nodes.some((node) => node.id === selectedLeaf.id);
    });
  }, [pricedItems, baseItems, isComplete, selectedLeaf]);

  return { items, isPriceOverlayActive: Boolean(pricedItems) };
}
