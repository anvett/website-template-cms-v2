export const homePageData = {
  id: "home",
  slug: "/",
  enabled: true,

  seo: {
    title: "Calefones Instamatic | Venta, instalación y mantenimiento en Quito",
    description:
      "Venta de calefones Instamatic, instalación profesional, mantenimiento técnico, sistemas de bombeo y gas centralizado en Quito y Valles.",
    canonical: "https://www.instamatic.ec/",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Calefones Instamatic | Soluciones de agua caliente",
    description:
      "Más de 20 años ofreciendo calefones, instalación, mantenimiento y soluciones de agua caliente para hogares y negocios.",
    url: "https://www.instamatic.ec/",
    images: [
      {
        url: "/images/instamatic/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Calefones Instamatic Ecuador",
      },
    ],
  },

  sections: [
    "home-hero",
    "home-about",
    "home-services-preview",
    "home-products-preview",
    "home-benefits",
    "home-stats",
    "home-partners",
    "home-cta",
  ],

  meta: {
    pageType: "marketing",
    language: "es",
  },
};