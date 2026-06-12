export const centralizedGasPageData = {
  id: "centralized-gas",
  slug: "/services/centralized-gas",
  enabled: true,

  seo: {
    title: "Gas centralizado | Instamatic Ecuador",
    description:
      "Instalación y mantenimiento de sistemas de gas centralizado para hogares, edificios y proyectos residenciales con altos estándares de seguridad.",
    canonical: "https://www.instamatic.ec/services/centralized-gas",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Gas centralizado | Instamatic Ecuador",
    description:
      "Soluciones seguras y eficientes en sistemas de gas centralizado para proyectos residenciales y comerciales.",
    url: "https://www.instamatic.ec/services/centralized-gas",
    images: [
      {
        url: "/images/instamatic/og-centralized-gas.jpg",
        width: 1200,
        height: 630,
        alt: "Gas centralizado Instamatic Ecuador",
      },
    ],
  },

  sections: [
    "centralized-gas-hero",
    "centralized-gas-description",
    "centralized-gas-benefits",
    "centralized-gas-process",
    "centralized-gas-quote",
    "centralized-gas-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};