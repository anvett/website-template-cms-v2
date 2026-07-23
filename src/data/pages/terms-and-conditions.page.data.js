export const termsAndConditionsPageData = {
  id: "terms-and-conditions",
  slug: "/terms-and-conditions",
  enabled: true,

  seo: {
    title: "Términos y condiciones | Kautela",
    description:
      "Consulta los términos y condiciones relacionados con la asesoría, servicios y uso del sitio web de Kautela.",
    canonical: "https://www.kautelaseguro.com/terms-and-conditions",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Términos y condiciones | Kautela",
    description:
      "Condiciones de uso del sitio web y de los servicios de asesoría de seguros ofrecidos por Kautela.",
    url: "https://www.kautelaseguro.com/terms-and-conditions",
    images: [
      {
        url: "/assets/images/kautela/og-terms-and-conditions.jpg",
        width: 1200,
        height: 630,
        alt: "Términos y condiciones Kautela",
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