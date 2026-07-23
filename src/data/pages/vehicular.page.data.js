export const vehicularPageData = {
  id: "vehicular",
  slug: "/services/vehicular",
  enabled: true,

  seo: {
    title: "Seguro Vehicular | Kautela",
    description:
      "Asesoría en seguros vehiculares para proteger tu auto ante accidentes, robo y daños a terceros.",
    canonical: "https://www.kautelaseguro.com/services/vehicular",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Seguro Vehicular | Kautela",
    description:
      "Protección integral para tu vehículo particular o de flota empresarial.",
    url: "https://www.kautelaseguro.com/services/vehicular",
    images: [
      {
        url: "/assets/images/kautela/og-vehicular.jpg",
        width: 1200,
        height: 630,
        alt: "Seguro Vehicular Kautela",
      },
    ],
  },

  sections: [
    "vehicular-hero",
    "vehicular-description",
    "vehicular-benefits",
    "vehicular-process",
    "vehicular-stats",
    "vehicular-quote",
    "vehicular-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};
