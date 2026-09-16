import "./globals.css";
import { siteData as staticSiteData } from "@/data/global/site.data";
import { navigationData as staticNavigationData } from "@/data/global/navigation.data";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { FloatingWhatsapp } from "@/components/global/FloatingWhatsapp";
import { CartWidget } from "@/components/global/CartWidget";
import { CartProvider } from "@/lib/storefront/CartContext";
import { CustomerSessionProvider } from "@/lib/storefront/CustomerSessionContext";
import { VehicleSelectionProvider } from "@/lib/storefront/VehicleSelectionContext";
import { isCmsEnabled, fetchSiteData, fetchNavigationData } from "@/lib/cms";
import { EditorBridge } from "@/components/editor/EditorBridge";

/* =========================================================
   LAYOUT.JS — NUEVO MODELO VISUAL
   ---------------------------------------------------------
   Rol oficial de este archivo:
   - Cargar estilos globales.
   - Cargar fuentes.
   - Leer metadata global desde site.data.js (o, en instancias con CMS
     activo, desde la Render API — ver `getLayoutData()` abajo).
   - Renderizar la estructura global mínima.

   Este archivo YA NO debe:
   - Resolver themes.
   - Importar resolveTheme.
   - Inyectar variables visuales por style.
   - Controlar colores, spacing, sombras o tokens visuales.

   La identidad visual principal vive ahora en:
   src/app/globals.css

   --- Convivencia Data estático / CMS (cronograma 3.4) -----------------
   `getLayoutData()` es el único lugar de este archivo que decide el
   origen del dato, una sola vez: `isCmsEnabled()` (true solo si
   CMS_API_URL/CMS_SITE_SLUG/CMS_API_TOKEN están seteados — ver
   src/lib/cms/env.js) hace de interruptor. Instancias sin CMS activo
   siguen recibiendo exactamente el mismo `siteData`/`navigationData`
   estático de siempre, sin ningún cambio de comportamiento. Nunca se
   mezclan ambas fuentes dentro de la misma instancia.
   --- Fuentes: Google Fonts vía <link>, no next/font (2026-08-13) -------
   Se probó `next/font/google` (Inter + Oswald, vía `variable` + CSS
   custom property) y la fuente nunca llegaba a pintarse en el navegador
   — diagnosticado a fondo con el dueño del proyecto (Network tab,
   Computed > Rendered Fonts, DevTools) hasta confirmar que el `<body>`
   sí tenía la clase de next/font bien generada, pero el navegador
   terminaba renderizando la fuente por defecto del sistema (Segoe UI),
   es decir: la cadena `--font-heading -> --font-oswald` (seteada por la
   clase de next/font) nunca resolvía. Aislado con una prueba mínima
   (link directo a Google Fonts + `font-family` literal) que sí funcionó
   de inmediato — apunta a un bug/incompatibilidad puntual entre
   `next/font` y Turbopack en modo dev en esta versión de Next.js
   (16.3.0), no a un error de nuestro CSS. Se optó por quedarse con el
   mecanismo que se probó que funciona en vez de seguir depurando
   next/font — revisar si next/font volvió a ser confiable la próxima
   vez que se actualice Next.js en este proyecto.
   --- Storefront: carrito + sesión de cliente (Fase 0/1, 2026-09-02) ----
   `CustomerSessionProvider`/`CartProvider` envuelven todo el árbol
   siempre (no solo en instancias con CMS activo) — son Client Components
   livianos que no rompen nada si `NEXT_PUBLIC_CMS_API_URL`/
   `NEXT_PUBLIC_CMS_SITE_SLUG` no están seteadas (ver
   src/lib/storefront/env.js, isStorefrontEnabled()): el carrito sigue
   funcionando en memoria/localStorage, y `CartWidget` simplemente no se
   renderiza. Ver docs/decisions/CATALOGO-AVANZADO-VEHICULAR-ROADMAP.md.
   --- Storefront: selector de vehículo persistente (Fase 5.2) ----------
   `VehicleSelectionProvider` sigue el mismo criterio: siempre envuelve
   el árbol, degrada solo (`enabled: false`) sin storefront configurado.
   A diferencia de `CartWidget`, no renderiza ningún widget acá — el
   `<VehicleSelector>` (componente de presentación aparte) se embebe
   puntualmente en las páginas de categoría/vehículo (Fase 5.3/5.4), no
   como elemento global; este Provider solo sostiene el estado
   (localStorage + árbol de la taxonomía "vehiculos") para que esas
   páginas puedan leerlo vía `useVehicleSelection()`.
========================================================= */

async function getLayoutData() {
  if (!isCmsEnabled()) {
    return { siteData: staticSiteData, navigationData: staticNavigationData };
  }

  const [siteData, navigationData] = await Promise.all([
    fetchSiteData(),
    fetchNavigationData(),
  ]);

  return { siteData, navigationData };
}

export async function generateMetadata() {
  const { siteData } = await getLayoutData();

  return {
    metadataBase: new URL(siteData.site.domain),

    title: {
      default: siteData.seo.defaultTitle,
      template: siteData.seo.titleTemplate,
    },

    description: siteData.seo.defaultDescription,
    keywords: siteData.seo.defaultKeywords,
    robots: siteData.seo.robots,

    openGraph: {
      type: siteData.openGraph?.type,
      locale: siteData.openGraph?.locale,
      url: siteData.openGraph?.url,
      siteName: siteData.openGraph?.siteName,
      title: siteData.openGraph?.title,
      description: siteData.openGraph?.description,
      images: siteData.openGraph?.images,
    },

    twitter: {
      card: siteData.twitter?.card,
      site: siteData.twitter?.site,
      creator: siteData.twitter?.creator,
      title: siteData.twitter?.title,
      description: siteData.twitter?.description,
      images: siteData.twitter?.images,
    },

    icons: siteData.icons,
    manifest: siteData.manifest,
  };
}

export async function generateViewport() {
  const { siteData } = await getLayoutData();

  return {
    themeColor: siteData.themeMeta?.themeColor,
  };
}

export default async function RootLayout({ children }) {
  const { siteData, navigationData } = await getLayoutData();

  return (
    <html lang={siteData.site.language}>
      <head>
        {/* Ver nota arriba: Google Fonts vía <link> en vez de next/font. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Bloque E4 (DW-008): único listener global de click-a-Section
            para Editor Anvetcorp -- se auto-desactiva (no hace nada,
            no agrega ningún listener) fuera de un iframe o sin
            NEXT_PUBLIC_ANVETCORP_EDITOR_ORIGIN configurado. Mismo
            criterio que el resto de los Providers de acá abajo:
            siempre montado, degrada solo. */}
        <EditorBridge />
        <CustomerSessionProvider>
          <VehicleSelectionProvider>
            <CartProvider>
              <div className="site-shell">
                <Navbar navigation={navigationData} />
                {children}
                <FloatingWhatsapp site={siteData} />
                <CartWidget site={siteData} />
                <Footer navigation={navigationData} site={siteData} />
              </div>
            </CartProvider>
          </VehicleSelectionProvider>
        </CustomerSessionProvider>
      </body>
    </html>
  );
}
