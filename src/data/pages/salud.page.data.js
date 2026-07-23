export const saludPageData = {
  id: "salud",
  slug: "/services/salud",
  enabled: true,

  seo: {
    title: "Seguro de Salud | Kautela",
    description:
      "Asesoría en seguros de asistencia médica para cubrir hospitalización, consultas y tratamientos con una amplia red de clínicas y prestadores.",
    canonical: "https://www.kautelaseguro.com/services/salud",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Seguro de Salud | Kautela",
    description:
      "Planes de asistencia médica individual, familiar y colectiva con asesoría personalizada en Ecuador.",
    url: "https://www.kautelaseguro.com/services/salud",
    images: [
      {
        url: "/assets/images/kautela/og-salud.jpg",
        width: 1200,
        height: 630,
        alt: "Seguro de Salud Kautela",
      },
    ],
  },

  sections: [
    "salud-hero",
    "salud-description",
    "salud-benefits",
    "salud-plans",
    "salud-quote",
    "salud-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};
