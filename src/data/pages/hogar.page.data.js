export const hogarPageData = {
  id: "hogar",
  slug: "/services/hogar",
  enabled: true,

  seo: {
    title: "Seguro de Hogar | Kautela",
    description:
      "Asesoría en seguros de vivienda, hogar y familia para proteger tu patrimonio ante incendios, robos y desastres naturales.",
    canonical: "https://www.kautelaseguro.com/services/hogar",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Seguro de Hogar | Kautela",
    description:
      "Protege tu vivienda y a tu familia ante imprevistos con asesoría personalizada.",
    url: "https://www.kautelaseguro.com/services/hogar",
    images: [
      {
        url: "/assets/images/kautela/og-hogar.jpg",
        width: 1200,
        height: 630,
        alt: "Seguro de Hogar Kautela",
      },
    ],
  },

  sections: [
    "hogar-hero",
    "hogar-description",
    "hogar-benefits",
    "hogar-coverage-types",
    "hogar-quote",
    "hogar-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};
