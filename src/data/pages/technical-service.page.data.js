export const technicalServicePageData = {
  id: "technical-service",
  slug: "/services/technical-service",
  enabled: true,

  seo: {
    title: "Servicio técnico y mantenimiento de calefones | Instamatic Ecuador",
    description:
      "Diagnóstico, reparación y mantenimiento de calefones a gas Instamatic en Quito y Valles, con revisión de piezas, limpieza y pruebas de seguridad.",
    canonical: "https://www.instamatic.ec/services/technical-service",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Servicio técnico y mantenimiento | Instamatic Ecuador",
    description:
      "Mantenimiento preventivo y correctivo para mejorar el rendimiento y prolongar la vida útil de tu calefón.",
    url: "https://www.instamatic.ec/services/technical-service",
    images: [
      {
        url: "/images/instamatic/og-technical-service.jpg",
        width: 1200,
        height: 630,
        alt: "Servicio técnico y mantenimiento de calefones Instamatic",
      },
    ],
  },

  sections: [
    "technical-service-hero",
    "technical-service-description",
    "technical-service-benefits",
    "technical-service-process",
    "technical-service-quote",
    "technical-service-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};