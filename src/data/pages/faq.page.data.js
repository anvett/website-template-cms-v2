export const faqPageData = {
  id: "faq",
  slug: "/faq",
  enabled: true,

  seo: {
    title: "Preguntas frecuentes | Instamatic Ecuador",
    description:
      "Resuelve tus dudas sobre calefones, instalación, mantenimiento, garantías y servicios técnicos de Instamatic.",
    canonical: "https://www.instamatic.ec/faq",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Preguntas frecuentes | Instamatic Ecuador",
    description:
      "Encuentra respuestas sobre productos, instalación, mantenimiento y garantías de calefones Instamatic.",
    url: "https://www.instamatic.ec/faq",
    images: [
      {
        url: "/images/instamatic/og-faq.jpg",
        width: 1200,
        height: 630,
        alt: "Preguntas frecuentes Instamatic Ecuador",
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