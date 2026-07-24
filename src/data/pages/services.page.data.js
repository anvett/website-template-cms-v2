export const servicesPageData = {
  id: "services",
  slug: "/services",
  enabled: true,

  seo: {
    title: "Ramos de Seguros | Kautela",
    description:
      "Conoce los 28 productos de seguros en los que te asesoramos: vehículos, vida, salud, hogar, viajes, empresarial y más coberturas especializadas para personas y empresas.",
    canonical: "https://www.kautelaseguro.com/services",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Ramos de Seguros | Kautela",
    description:
      "Asesoría especializada en los principales ramos de seguros para personas y empresas en Ecuador.",
    url: "https://www.kautelaseguro.com/services",
    images: [
      {
        url: "/assets/images/kautela/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Ramos de seguros Kautela",
      },
    ],
  },

  sections: [
    "services-hero",
    "services-overview",
    "services-grid",
    "services-process",
    "services-quote",
    "services-cta",
  ],

  meta: {
    pageType: "services",
    language: "es",
  },
};