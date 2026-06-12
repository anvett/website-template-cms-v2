export const servicesPageData = {
  id: "services",
  slug: "/services",
  enabled: true,

  seo: {
    title: "Servicios | Instamatic Ecuador",
    description:
      "Conoce nuestros servicios de instalación de calefones, mantenimiento técnico, sistemas de bombeo de agua y gas centralizado en Quito y Valles.",
    canonical: "https://www.instamatic.ec/services",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Servicios | Instamatic Ecuador",
    description:
      "Soluciones profesionales para instalación, mantenimiento y sistemas complementarios de agua caliente.",
    url: "https://www.instamatic.ec/services",
    images: [
      {
        url: "/images/instamatic/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Servicios Instamatic Ecuador",
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