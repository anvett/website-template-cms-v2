export const installationPageData = {
  id: "installation",
  slug: "/services/installation",
  enabled: true,

  seo: {
    title: "Instalación de calefones | Instamatic Ecuador",
    description:
      "Instalación profesional de calefones a gas Instamatic en Quito y Valles, con verificación del punto de instalación y pruebas de funcionamiento.",
    canonical: "https://www.instamatic.ec/services/installation",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Instalación de calefones | Instamatic Ecuador",
    description:
      "Instalación rápida, segura y profesional de calefones a gas para hogares y negocios.",
    url: "https://www.instamatic.ec/services/installation",
    images: [
      {
        url: "/images/instamatic/og-installation.jpg",
        width: 1200,
        height: 630,
        alt: "Instalación de calefones Instamatic",
      },
    ],
  },

  sections: [
    "installation-hero",
    "installation-description",
    "installation-benefits",
    "installation-process",
    "installation-quote",
    "installation-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};