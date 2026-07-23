import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import { siteData } from "@/data/global/site.data";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { FloatingWhatsapp } from "@/components/global/FloatingWhatsapp";

/* =========================================================
   LAYOUT.JS — NUEVO MODELO VISUAL
   ---------------------------------------------------------
   Rol oficial de este archivo:
   - Cargar estilos globales.
   - Cargar fuentes.
   - Leer metadata global desde site.data.js.
   - Renderizar la estructura global mínima.

   Este archivo YA NO debe:
   - Resolver themes.
   - Importar resolveTheme.
   - Inyectar variables visuales por style.
   - Controlar colores, spacing, sombras o tokens visuales.

   La identidad visual principal vive ahora en:
   src/app/globals.css
========================================================= */

/* Fuente principal para textos generales */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* Fuente secundaria para títulos editoriales o destacados */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
});

/* Metadata global alimentada desde site.data.js */
export const metadata = {
  metadataBase: new URL(siteData.site.domain),

  title: {
    default: siteData.seo.defaultTitle,
    template: siteData.seo.titleTemplate,
  },

  description: siteData.seo.defaultDescription,
  keywords: siteData.seo.defaultKeywords,
  robots: siteData.seo.robots,

  openGraph: {
    type: siteData.openGraph.type,
    locale: siteData.openGraph.locale,
    url: siteData.openGraph.url,
    siteName: siteData.openGraph.siteName,
    title: siteData.openGraph.title,
    description: siteData.openGraph.description,
    images: siteData.openGraph.images,
  },

  twitter: {
    card: siteData.twitter.card,
    site: siteData.twitter.site,
    creator: siteData.twitter.creator,
    title: siteData.twitter.title,
    description: siteData.twitter.description,
    images: siteData.twitter.images,
  },

  icons: siteData.icons,
  manifest: siteData.manifest,
};

export const viewport = {
  themeColor: siteData.themeMeta.themeColor,
};

export default function RootLayout({ children }) {
  return (
    <html lang={siteData.site.language}>
      <body className={`${inter.variable} ${montserrat.variable}`}>
        <div className="site-shell">
          <Navbar />
          {children}
          <FloatingWhatsapp message="Hola, deseo más información sobre los seguros de Kautela." />
          <Footer />
        </div>
        
      </body>
    </html>
  );
}
