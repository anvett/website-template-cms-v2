export const contactPageData = {
  id: "contact",
  slug: "/contact",
  enabled: true,

  seo: {
    title: "Contacto | Kautela",
    description:
      "Contáctanos para asesoría en seguros, cotizaciones y atención de siniestros. Matriz en Ibarra, con cobertura nacional en Ecuador.",
    canonical: "https://www.kautelaseguro.com/contact",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Contacto | Kautela",
    description:
      "Solicita asesoría en seguros o reporta un siniestro. Te contactamos a la brevedad.",
    url: "https://www.kautelaseguro.com/contact",
    images: [
      {
        url: "/assets/images/kautela/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contacto Kautela",
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