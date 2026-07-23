export const viajesPageData = {
  id: "viajes",
  slug: "/services/viajes",
  enabled: true,

  seo: {
    title: "Seguro de Viajes | Kautela",
    description:
      "Asesoría en seguros de viajes con asistencia médica en el extranjero, cobertura de equipaje y protección ante cancelaciones.",
    canonical: "https://www.kautelaseguro.com/services/viajes",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Seguro de Viajes | Kautela",
    description:
      "Cobertura internacional para viajes de placer o negocios, con asistencia médica y protección de equipaje.",
    url: "https://www.kautelaseguro.com/services/viajes",
    images: [
      {
        url: "/assets/images/kautela/og-viajes.jpg",
        width: 1200,
        height: 630,
        alt: "Seguro de Viajes Kautela",
      },
    ],
  },

  sections: [
    "viajes-hero",
    "viajes-description",
    "viajes-benefits",
    "viajes-coverage-types",
    "viajes-quote",
    "viajes-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};
