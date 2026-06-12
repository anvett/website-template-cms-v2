export const privacyPolicyPageData = {
  id: "privacy-policy",
  slug: "/privacy-policy",
  enabled: true,

  seo: {
    title: "Política de privacidad | Instamatic Ecuador",
    description:
      "Conoce cómo Instamatic recopila, utiliza y protege la información personal de sus clientes y usuarios.",
    canonical: "https://www.instamatic.ec/privacy-policy",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Política de privacidad | Instamatic Ecuador",
    description:
      "Información sobre privacidad, tratamiento de datos y protección de información personal.",
    url: "https://www.instamatic.ec/privacy-policy",
    images: [
      {
        url: "/images/instamatic/og-privacy-policy.jpg",
        width: 1200,
        height: 630,
        alt: "Política de privacidad Instamatic",
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