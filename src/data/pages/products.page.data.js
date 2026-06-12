export const productsPageData = {
  id: "products",
  slug: "/products",
  enabled: true,

  seo: {
    title: "Productos | Instamatic Ecuador",
    description:
      "Conoce nuestros calefones Instamatic, combos completos, accesorios y soluciones diseñadas para brindar agua caliente eficiente y segura.",
    canonical: "https://www.instamatic.ec/products",
    robots: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "Productos | Instamatic Ecuador",
    description:
      "Explora nuestros combos de calefones y modelos Instamatic disponibles para hogares y negocios.",
    url: "https://www.instamatic.ec/products",
    images: [
      {
        url: "/images/instamatic/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "Productos Instamatic Ecuador",
      },
    ],
  },

  sections: [
    "products-hero",
    "products-overview",
    "products-categories",
    "products-combos",
    "products-heaters",
    "products-parts",
    "products-benefits",
    "products-quote",
    "products-cta",
  ],

  meta: {
    pageType: "catalog",
    language: "es",
  },
};