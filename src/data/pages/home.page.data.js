export const homePageData = {
  id: "home",
  slug: "/",
  enabled: true,

  seo: {
    title: "Kautela | Asesoría en Seguros en Ecuador",
    description:
      "Asesoría integral en seguros y administración de riesgos, con cobertura nacional y soluciones personalizadas para personas y empresas en Ecuador.",
    canonical: "https://www.kautelaseguro.com/",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Kautela | Confianza Asegurada. Protección Garantizada",
    description:
      "Asesoría integral en seguros y administración de riesgos, con cobertura nacional en Ecuador.",
    url: "https://www.kautelaseguro.com/",
    images: [
      {
        url: "/assets/images/kautela/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Kautela, asesoría en seguros en Ecuador",
      },
    ],
  },

  sections: [
    "home-hero",
    "home-about",
    "home-services-preview",
    "home-values-preview",
    "home-stats",
    "home-partners",
    "home-cta",
  ],

  meta: {
    pageType: "marketing",
    language: "es",
  },
};