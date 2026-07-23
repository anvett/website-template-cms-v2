export const faqPageData = {
  id: "faq",
  slug: "/faq",
  enabled: true,

  seo: {
    title: "Preguntas frecuentes | Kautela",
    description:
      "Resuelve tus dudas sobre asesoría en seguros, cotizaciones, gestión de reclamos y ramos que ofrecemos en Kautela.",
    canonical: "https://www.kautelaseguro.com/faq",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Preguntas frecuentes | Kautela",
    description:
      "Encuentra respuestas sobre asesoría, cotizaciones, ramos de seguros y gestión de reclamos.",
    url: "https://www.kautelaseguro.com/faq",
    images: [
      {
        url: "/assets/images/kautela/og-faq.jpg",
        width: 1200,
        height: 630,
        alt: "Preguntas frecuentes Kautela",
      },
    ],
  },

  sections: [
    "faq-hero",
    "faq-general",
    "faq-quote",
    "faq-cta",
  ],

  meta: {
    pageType: "support",
    language: "es",
  },
};