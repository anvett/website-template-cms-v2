/**
 * site.data.js — PLACEHOLDER de base.
 *
 * Este archivo debe reescribirse por completo para cada instancia de
 * cliente (ver 05-MANUAL-CREACION-DE-INSTANCIAS-v2.md). Los valores aquí
 * son intencionalmente genéricos ("Template Base") para que el proyecto
 * compile out-of-the-box sin arrastrar datos de ningún cliente anterior.
 */
export const siteData = {
  site: {
    name: "Template Base",
    domain: "https://example.com",
    language: "es",
  },

  seo: {
    defaultTitle: "Template Base",
    titleTemplate: "%s | Template Base",
    defaultDescription:
      "Descripción placeholder del sitio. Reemplazar por cliente.",
    defaultKeywords: [],
    robots: { index: false, follow: false },
  },

  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://example.com",
    siteName: "Template Base",
    title: "Template Base",
    description:
      "Descripción placeholder del sitio. Reemplazar por cliente.",
    images: [],
  },

  twitter: {
    card: "summary_large_image",
    site: "",
    creator: "",
    title: "Template Base",
    description:
      "Descripción placeholder del sitio. Reemplazar por cliente.",
    images: [],
  },

  icons: [],
  manifest: undefined,

  themeMeta: {
    themeColor: "#000000",
  },

  branding: {
    siteDescription:
      "Descripción placeholder de la marca. Reemplazar por cliente.",
  },

  contact: {
    phone: "",
    whatsapp: "",
    email: "",
  },

  address: {
    fullAddress: "",
  },

  businessHours: {
    weekdays: "",
  },
};

export default siteData;
