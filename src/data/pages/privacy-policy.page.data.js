export const privacyPolicyPageData = {
  id: "privacy-policy",
  slug: "/privacy-policy",
  enabled: true,

  seo: {
    title: "Política de privacidad | Kautela",
    description:
      "Conoce cómo Kautela recopila, utiliza y protege la información personal de sus clientes y usuarios.",
    canonical: "https://www.kautelaseguro.com/privacy-policy",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Política de privacidad | Kautela",
    description:
      "Información sobre privacidad, tratamiento de datos y protección de información personal.",
    url: "https://www.kautelaseguro.com/privacy-policy",
    images: [
      {
        url: "/assets/images/kautela/og-privacy-policy.jpg",
        width: 1200,
        height: 630,
        alt: "Política de privacidad Kautela",
      },
    ],
  },

  sections: [
    "privacy-hero",
    "privacy-content",
    "privacy-contact",
  ],

  meta: {
    pageType: "legal",
    language: "es",
  },
};