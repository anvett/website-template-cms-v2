export const aboutUsPageData = {
  id: "about-us",
  slug: "/about-us",
  enabled: true,

  seo: {
    title: "Nosotros | Instamatic Ecuador",
    description:
      "Conoce la historia, misión, visión y valores de Instamatic, marca reconocida de calefones a gas con más de 20 años en Ecuador.",
    canonical: "https://www.instamatic.ec/about-us",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Nosotros | Instamatic Ecuador",
    description:
      "Más de 20 años brindando calefones a gas eficientes, seguros y duraderos para hogares y negocios en Ecuador.",
    url: "https://www.instamatic.ec/about-us",
    images: [
      {
        url: "/images/instamatic/og-about-us.jpg",
        width: 1200,
        height: 630,
        alt: "Historia y trayectoria de Instamatic Ecuador",
      },
    ],
  },

  sections: [
    "about-hero",
    "about-story",
    "about-mission-vision",
    "about-values",
    "about-stats",
    "about-testimonials",
    "about-quote",
    "about-cta",
  ],

  meta: {
    pageType: "institutional",
    language: "es",
  },
};