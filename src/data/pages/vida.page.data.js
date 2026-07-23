export const vidaPageData = {
  id: "vida",
  slug: "/services/vida",
  enabled: true,

  seo: {
    title: "Seguro de Vida | Kautela",
    description:
      "Asesoría en seguros de vida individual y colectiva para proteger financieramente a tus beneficiarios ante un fallecimiento o invalidez.",
    canonical: "https://www.kautelaseguro.com/services/vida",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Seguro de Vida | Kautela",
    description:
      "Planes de vida individual, familiar y colectiva con asesoría personalizada en Ecuador.",
    url: "https://www.kautelaseguro.com/services/vida",
    images: [
      {
        url: "/assets/images/kautela/og-vida.jpg",
        width: 1200,
        height: 630,
        alt: "Seguro de Vida Kautela",
      },
    ],
  },

  sections: [
    "vida-hero",
    "vida-description",
    "vida-benefits",
    "vida-plans",
    "vida-quote",
    "vida-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};
