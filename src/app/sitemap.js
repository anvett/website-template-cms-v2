import { fetchSiteData, isCmsEnabled } from "@/lib/cms";
import { fetchAllProducts, fetchTaxonomyTree, isStorefrontEnabled } from "@/lib/storefront/catalog";

// Rutas estáticas del sitio (ver `find src/app` -- páginas hand-authored,
// sin segmento dinámico). Mismo criterio que `productos/[categoria]/
// page.js`/`CATEGORY_TAXONOMY_SLUG`: lista específica de ESTA instancia,
// no un mecanismo genérico (CLAUDE.md: Pages pueden conocer la
// estructura real del sitio que arman).
const STATIC_ROUTES = [
  "",
  "/nosotros",
  "/servicios",
  "/productos",
  "/contacto",
  "/faq",
  "/cookies",
  "/privacidad",
  "/terminos",
];

// Mismos slugs que CATEGORY_META en seed_catalog_v2.py / CATEGORIES en
// seed_eurocentro.py -- duplicado a propósito, ver esos archivos para la
// justificación (no es un mecanismo genérico, es Data de este Site).
const CATEGORY_SLUGS = ["motor", "suspension", "frenos", "caja", "chequeo-de-motor", "varios"];

const VEHICLE_TAXONOMY_SLUG = "vehiculos";

async function resolveBaseUrl() {
  if (!isCmsEnabled()) return "";
  try {
    const siteData = await fetchSiteData();
    return (siteData?.site?.domain || "").replace(/\/+$/, "");
  } catch {
    return "";
  }
}

/**
 * Recorre el árbol de taxonomía y devuelve el camino de SLUGS (no ids)
 * de cada hoja real (nodo sin hijos) -- ej. ["renault", "sandero",
 * "2015", "16-manual"]. Filtra a longitud === 4 a propósito: la ruta de
 * vehículo (`/productos/vehiculo/[marca]/[modelo]/[anio]/
 * [motorizacion]`, Fase 5.4) tiene 4 segmentos fijos -- una hoja a otra
 * profundidad (taxonomía todavía incompleta, o un tenant futuro con
 * menos niveles) no tiene una URL real que apuntarle, así que no se
 * incluye en vez de armar un link roto.
 */
function collectVehicleLeafPaths(nodes, prefix = []) {
  const leaves = [];
  for (const node of nodes || []) {
    const path = [...prefix, node.slug];
    if (!node.children || node.children.length === 0) {
      leaves.push(path);
    } else {
      leaves.push(...collectVehicleLeafPaths(node.children, path));
    }
  }
  return leaves;
}

async function fetchVehicleLeafPaths() {
  if (!isStorefrontEnabled()) return [];
  try {
    const tree = await fetchTaxonomyTree(VEHICLE_TAXONOMY_SLUG);
    return collectVehicleLeafPaths(tree?.nodes || []).filter(
      (path) => path.length === 4
    );
  } catch {
    // Site sin taxonomía "vehiculos" sembrada todavía, o API caída --
    // el sitemap sigue sin esas URLs en vez de romper la generación
    // completa (mismo criterio de resiliencia del resto del storefront).
    return [];
  }
}

/**
 * Todos los `slug` de producto activo del Site, sin `?node=` (acá
 * interesa CADA producto, no un subconjunto por categoría/vehículo).
 * `fetchAllProducts` (catalog.js) ya resuelve la paginación completa
 * (`PAGE_SIZE=50` -- el catálogo real de Eurocentro ya son 115).
 */
async function fetchAllProductSlugs() {
  if (!isStorefrontEnabled()) return [];
  try {
    const products = await fetchAllProducts({});
    return products.map((product) => product.slug);
  } catch {
    // Sin resultados en vez de tumbar la ruta entera -- un sitemap sin
    // productos es mejor que una ruta /sitemap.xml rota.
    return [];
  }
}

/**
 * Sitemap dinámico (Fase 5.5, roadmap sección 5: "que liste
 * automáticamente todas las páginas de producto y combinaciones
 * marca/modelo a medida que se agregan"). Convención de Next.js App
 * Router (`src/app/sitemap.js`, sin configuración adicional) -- Next
 * genera `/sitemap.xml` a partir de este array en cada request (mismo
 * ISR/fetch caching que el resto del catálogo, vía `fetchProducts`/
 * `fetchTaxonomyTree`, `DEFAULT_REVALIDATE_SECONDS`).
 */
export default async function sitemap() {
  const baseUrl = await resolveBaseUrl();

  const [vehiclePaths, productSlugs] = await Promise.all([
    fetchVehicleLeafPaths(),
    fetchAllProductSlugs(),
  ]);

  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    })),
    ...CATEGORY_SLUGS.map((slug) => ({
      url: `${baseUrl}/productos/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...vehiclePaths.map((segments) => ({
      url: `${baseUrl}/productos/vehiculo/${segments.join("/")}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
    ...productSlugs.map((slug) => ({
      url: `${baseUrl}/productos/producto/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    })),
  ];
}
