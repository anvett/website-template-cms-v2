export const navigationData = {
  announcement: {
    enabled: false,
    text: "Calefones a gas Instamatic con instalación en Quito y Valles",
    link: {
      label: "Ver productos",
      href: "/products",
    },
  },

  navbar: {
    id: "main-navigation",
    enabled: true,
    variant: "logo-left-menu-right-dropdown-transparent",  //variant: "logo-left-menu-right-dropdown-transparent" | variant: "logo-left-menu-right"
    content: {
      logo: {
        type: "image",
        label: "Instamatic",
        href: "/",
        image: {
          src: "/assets/images/instamatic/logo.png",
          alt: "Logo Instamatic",
        },
      },
    },
    items: [
      {
        id: "nav-home",
        label: "Inicio",
        href: "/",
        type: "link",
      },
      {
        id: "nav-about",
        label: "Nosotros",
        href: "/about-us",
        type: "link",
      },
      {
        id: "nav-services",
        label: "Servicios",
        href: "/services",
        type: "dropdown",
        children: [
          {
            id: "nav-service-installation",
            label: "Instalación de calefones",
            href: "/services/installation",
          },
          {
            id: "nav-service-technical-service",
            label: "Servicio técnico y mantenimiento",
            href: "/services/technical-service",
          },
          {
            id: "nav-service-water-pumps",
            label: "Sistemas de bombeo de agua",
            href: "/services/water-pumps",
          },
          {
            id: "nav-service-centralized-gas",
            label: "Gas centralizado",
            href: "/services/centralized-gas",
          },
        ],
      },
      {
        id: "nav-products",
        label: "Productos",
        href: "/products",
        type: "dropdown",
        children: [
          {
            id: "nav-products-combos",
            label: "Combos Instamatic 26 litros",
            href: "/products#combos-instamatic-26-litros",
          },
          {
            id: "nav-products-heaters",
            label: "Calefones Instamatic",
            href: "/products#calefones-instamatic",
          },
        ],
      },
      {
        id: "nav-faq",
        label: "FAQ",
        href: "/faq",
        type: "link",
      },
      {
        id: "nav-contact",
        label: "Contacto",
        href: "/contact",
        type: "link",
      },
    ],
    actions: [
      {
        id: "nav-primary-cta",
        label: "Solicitar información",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {
      mobileMenuEnabled: true,
      sticky: true,
    },
  },

  footerNavigation: {
    enabled: true,
    groups: [
      {
        id: "footer-company",
        title: "Empresa",
        links: [
          {
            id: "footer-home",
            label: "Inicio",
            href: "/",
          },
          {
            id: "footer-about",
            label: "Nosotros",
            href: "/about-us",
          },
          {
            id: "footer-services",
            label: "Servicios",
            href: "/services",
          },
          {
            id: "footer-products",
            label: "Productos",
            href: "/products",
          },
        ],
      },
      {
        id: "footer-services",
        title: "Servicios",
        links: [
          {
            id: "footer-service-installation",
            label: "Instalación de calefones",
            href: "/services/installation",
          },
          {
            id: "footer-service-technical-service",
            label: "Servicio técnico y mantenimiento",
            href: "/services/technical-service",
          },
          {
            id: "footer-service-water-pumps",
            label: "Sistemas de bombeo de agua",
            href: "/services/water-pumps",
          },
          {
            id: "footer-service-centralized-gas",
            label: "Gas centralizado",
            href: "/services/centralized-gas",
          },
        ],
      },
      {
        id: "footer-support",
        title: "Ayuda",
        links: [
          {
            id: "footer-faq",
            label: "Preguntas frecuentes",
            href: "/faq",
          },
          {
            id: "footer-contact",
            label: "Contacto",
            href: "/contact",
          },
        ],
      },
      {
        id: "footer-legal",
        title: "Legal",
        links: [
          {
            id: "footer-privacy-policy",
            label: "Política de privacidad",
            href: "/privacy-policy",
          },
          {
            id: "footer-terms-and-conditions",
            label: "Términos y condiciones",
            href: "/terms-and-conditions",
          },
        ],
      },
    ],
  },
};