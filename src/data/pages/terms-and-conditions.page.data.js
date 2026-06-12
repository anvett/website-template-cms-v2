export const termsAndConditionsPageData = {
  id: "terms-and-conditions",
  slug: "/terms-and-conditions",
  enabled: true,

  seo: {
    title: "Términos y condiciones | Instamatic Ecuador",
    description:
      "Consulta los términos y condiciones relacionados con productos, servicios y uso del sitio web de Instamatic.",
    canonical: "https://www.instamatic.ec/terms-and-conditions",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Términos y condiciones | Instamatic Ecuador",
    description:
      "Condiciones de uso del sitio web, productos y servicios ofrecidos por Instamatic.",
    url: "https://www.instamatic.ec/terms-and-conditions",
    images: [
      {
        url: "/images/instamatic/og-terms-and-conditions.jpg",
        width: 1200,
        height: 630,
        alt: "Términos y condiciones Instamatic",
      },
    ],
  },

  sections: [
    "terms-hero",
    "terms-content",
    "terms-contact",
  ],

  meta: {
    pageType: "legal",
    language: "es",
  },
};