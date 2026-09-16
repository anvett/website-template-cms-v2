import { notFound } from "next/navigation";

import { fetchSiteData, isCmsEnabled } from "@/lib/cms";
import { SectionRenderer } from "@/lib/content/SectionRenderer";
import { withSectionDefaults } from "@/lib/sections/sectionDefaults";
import {
  fetchProducts,
  fetchTaxonomyTree,
  isStorefrontEnabled,
} from "@/lib/storefront/catalog";
import { mapProductToItem } from "@/lib/storefront/mapProduct";
import { SyncVehicleSelection } from "@/lib/storefront/SyncVehicleSelection";

// Mismo slug fijo que VehicleSelectionContext.jsx/[categoria]/page.js --
// catálogo vehicular compartido entre tenants (roadmap sección 3).
const VEHICLE_TAXONOMY_SLUG = "vehiculos";

/**
 * Ruta dinámica "comprar por vehículo" (Fase 5.4, roadmap sección 5):
 * `/productos/vehiculo/{marca}/{modelo}/{anio}/{motorizacion}` -- a
 * diferencia de `/productos/{categoria}` (una Page real del CMS, con
 * Hero/Quote propios), esta ruta NO tiene ninguna Page/Section detrás en
 * el backend -- se genera 100% a partir de la taxonomía "vehiculos" +
 * los `Product` etiquetados contra el nodo hoja exacto (marca+modelo+
 * año+motorización, los 4 juntos). No existe un `Page.content_id` por
 * vehículo que crear a mano; es lo que permite que el catálogo escale a
 * cientos de combinaciones sin autoría manual por cada una (roadmap
 * sección 9: "sitemap dinámico... a medida que se agregan").
 *
 * Muestra SOLO los productos etiquetados contra ESE vehículo exacto (sin
 * mezclar los productos "universales" que sí se incluyen en las páginas
 * de categoría con vehículo seleccionado, Fase 5.3) -- a propósito: acá
 * el punto es "qué confirmó Eurocentro específicamente para mi auto", no
 * "qué me sirve en general". Mezclar los ~90 productos migrados como
 * universales (Fase 6 -- universales por falta de dato real, no porque
 * de verdad apliquen a cualquier vehículo) haría esta página ruidosa y
 * potencialmente engañosa.
 *
 * 404 real (`notFound()`) si el camino de slugs no resuelve contra el
 * árbol real (vehículo que no existe) -- pero NO si el vehículo existe
 * y todavía no tiene productos cargados (ese caso muestra la Section
 * igual, con un mensaje en vez de la grilla vacía silenciosa).
 */
async function resolveVehiclePath(segments) {
  if (!isStorefrontEnabled()) return null;

  let roots;
  try {
    const tree = await fetchTaxonomyTree(VEHICLE_TAXONOMY_SLUG);
    roots = tree?.nodes || [];
  } catch {
    return null;
  }

  const path = [];
  let options = roots;
  for (const slug of segments) {
    const node = options.find((candidate) => candidate.slug === slug);
    if (!node) return null;
    path.push(node);
    options = node.children || [];
  }
  return path;
}

async function getWhatsappNumber() {
  if (!isCmsEnabled()) return "";
  try {
    const siteData = await fetchSiteData();
    // `Site.contact.whatsapp` viene con "+" (ver seed_eurocentro.py,
    // "+593987654321") -- el resto del catálogo arma el link
    // `wa.me/{numero}` SIN el "+" (mismo formato que
    // `meta.whatsappNumber` en cada Section de productos existente).
    return (siteData?.contact?.whatsapp || "").replace(/^\+/, "");
  } catch {
    return "";
  }
}

function buildVehicleSection(vehiclePath, items, whatsappNumber) {
  const vehicleLabel = vehiclePath.map((node) => node.name).join(" ");

  return withSectionDefaults({
    id: "vehiculo-detalle",
    enabled: true,
    component: "products",
    variant: "parts-gallery",
    surface: "base",
    containerWidth: "wide",
    spacing: "default",
    background: { type: "surface" },
    content: {
      eyebrow: "Repuestos compatibles",
      title: `Repuestos para ${vehicleLabel}`,
      description:
        items.length > 0
          ? `Productos confirmados por Eurocentro específicamente para tu ${vehicleLabel}.`
          : `Todavía no tenemos productos cargados específicamente para tu ${vehicleLabel} — consultanos por WhatsApp, seguro podemos ayudarte igual.`,
    },
    items,
    actions: [],
    meta: { supportsModal: true, whatsappNumber },
  });
}

async function loadVehiclePage(params) {
  const { marca, modelo, anio, motorizacion } = await params;
  const vehiclePath = await resolveVehiclePath([marca, modelo, anio, motorizacion]);
  if (!vehiclePath) return null;

  const leafNode = vehiclePath[vehiclePath.length - 1];

  let items = [];
  try {
    const data = await fetchProducts({ nodeIds: [leafNode.id] });
    items = (data?.results || []).map(mapProductToItem);
  } catch {
    // API de catálogo caída -- se muestra la página igual (vehículo
    // real, 0 resultados) en vez de un 404 que no es lo que pasó.
    items = [];
  }

  return { vehiclePath, items };
}

export async function generateMetadata({ params }) {
  const result = await loadVehiclePage(params);
  if (!result) return {};

  const label = result.vehiclePath.map((node) => node.name).join(" ");
  return {
    title: `Repuestos para ${label} — Eurocentro`,
    description: `Catálogo de repuestos confirmados por Eurocentro para ${label}.`,
  };
}

export default async function VehiculoPage({ params }) {
  const result = await loadVehiclePage(params);
  if (!result) notFound();

  const whatsappNumber = await getWhatsappNumber();
  const section = buildVehicleSection(result.vehiclePath, result.items, whatsappNumber);
  const nodeIds = result.vehiclePath.map((node) => node.id);

  return (
    <main>
      <SyncVehicleSelection nodeIds={nodeIds} />
      <SectionRenderer sections={[section]} />
    </main>
  );
}
