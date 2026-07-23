export const empresarialPageData = {
  id: "empresarial",
  slug: "/services/empresarial",
  enabled: true,

  seo: {
    title: "Seguro Empresarial | Kautela",
    description:
      "Asesoría en seguros empresariales y de consorcio para proteger los activos y operaciones de tu negocio.",
    canonical: "https://www.kautelaseguro.com/services/empresarial",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Seguro Empresarial | Kautela",
    description:
      "Soluciones de administración de riesgos para empresas y consorcios en Ecuador.",
    url: "https://www.kautelaseguro.com/services/empresarial",
    images: [
      {
        url: "/assets/images/kautela/og-empresarial.jpg",
        width: 1200,
        height: 630,
        alt: "Seguro Empresarial Kautela",
      },
    ],
  },

  sections: [
    "empresarial-hero",
    "empresarial-description",
    "empresarial-benefits",
    "empresarial-coverage-types",
    "empresarial-stats",
    "empresarial-quote",
    "empresarial-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};
