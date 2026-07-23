export const aboutUsPageData = {
  id: "about-us",
  slug: "/about-us",
  enabled: true,

  seo: {
    title: "Nosotros | Kautela",
    description:
      "Conoce la historia, misión, visión, valores y fortalezas de Kautela, firma ecuatoriana de asesoría en seguros constituida en Ibarra en 2014.",
    canonical: "https://www.kautelaseguro.com/about-us",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Nosotros | Kautela",
    description:
      "Asesoría integral en seguros con excelencia operativa, capacidad de innovación y compromiso social.",
    url: "https://www.kautelaseguro.com/about-us",
    images: [
      {
        url: "/assets/images/kautela/og-about-us.jpg",
        width: 1200,
        height: 630,
        alt: "Historia y trayectoria de Kautela",
      },
    ],
  },

  sections: [
    "about-hero",
    "about-story",
    "about-mission-vision",
    "about-values",
    "about-strengths",
    "about-infrastructure",
    "about-team",
    "about-quote",
    "about-cta",
  ],

  meta: {
    pageType: "institutional",
    language: "es",
  },
};