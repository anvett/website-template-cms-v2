export const contactPageData = {
  id: "contact",
  slug: "/contact",
  enabled: true,

  seo: {
    title: "Contacto | Instamatic Ecuador",
    description:
      "Contáctanos para cotizaciones, instalación, mantenimiento de calefones y soluciones de agua caliente en Quito y Valles.",
    canonical: "https://www.instamatic.ec/contact",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Contacto | Instamatic Ecuador",
    description:
      "Solicita información sobre calefones, servicios técnicos y soluciones de agua caliente.",
    url: "https://www.instamatic.ec/contact",
    images: [
      {
        url: "/images/instamatic/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto Instamatic Ecuador",
      },
    ],
  },

  sections: [
    "contact-hero",
    "contact-main",
    "contact-location",
    "contact-cta",
  ],

  meta: {
    pageType: "contact",
    language: "es",
  },
};