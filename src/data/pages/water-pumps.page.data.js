export const waterPumpsPageData = {
  id: "water-pumps",
  slug: "/services/water-pumps",
  enabled: true,

  seo: {
    title: "Sistemas de bombeo de agua | Instamatic Ecuador",
    description:
      "Instalación y mantenimiento de sistemas de bombeo de agua para mejorar presión y abastecimiento en hogares, edificios y negocios.",
    canonical: "https://www.instamatic.ec/services/water-pumps",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Sistemas de bombeo de agua | Instamatic Ecuador",
    description:
      "Soluciones de bombeo de agua para optimizar presión y distribución eficiente.",
    url: "https://www.instamatic.ec/services/water-pumps",
    images: [
      {
        url: "/images/instamatic/og-water-pumps.jpg",
        width: 1200,
        height: 630,
        alt: "Sistemas de bombeo de agua Instamatic",
      },
    ],
  },

  sections: [
    "water-pumps-hero",
    "water-pumps-description",
    "water-pumps-benefits",
    "water-pumps-process",
    "water-pumps-quote",
    "water-pumps-cta",
  ],

  meta: {
    pageType: "service-detail",
    language: "es",
  },
};