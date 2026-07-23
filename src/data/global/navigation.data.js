export const navigationData = {
  announcement: {
    enabled: false,
    text: "Asesoría integral en seguros con cobertura nacional en Ecuador",
    link: {
      label: "Ver servicios",
      href: "/services",
    },
  },

  navbar: {
    id: "main-navigation",
    enabled: true,
    variant: "logo-left-menu-right-dropdown-transparent",  //variant: "logo-left-menu-right-dropdown-transparent" | variant: "logo-left-menu-right"
    content: {
      logo: {
        type: "image",
        label: "Kautela",
        href: "/",
        image: {
          src: "/assets/images/kautela/logo.png",
          alt: "Logo Kautela Agencia Asesora Productora de Seguros",
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
        label: "Ramos de seguros",
        href: "/services",
        type: "dropdown",
        children: [
          {
            id: "nav-service-vehicular",
            label: "Vehicular",
            href: "/services/vehicular",
          },
          {
            id: "nav-service-vida",
            label: "Vida",
            href: "/services/vida",
          },
          {
            id: "nav-service-salud",
            label: "Salud",
            href: "/services/salud",
          },
          {
            id: "nav-service-hogar",
            label: "Hogar",
            href: "/services/hogar",
          },
          {
            id: "nav-service-viajes",
            label: "Viajes",
            href: "/services/viajes",
          },
          {
            id: "nav-service-empresarial",
            label: "Empresarial",
            href: "/services/empresarial",
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
        label: "Solicitar asesoría",
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
            label: "Ramos de seguros",
            href: "/services",
          },
        ],
      },
      {
        id: "footer-ramos",
        title: "Ramos de seguros",
        links: [
          {
            id: "footer-service-vehicular",
            label: "Vehicular",
            href: "/services/vehicular",
          },
          {
            id: "footer-service-vida",
            label: "Vida",
            href: "/services/vida",
          },
          {
            id: "footer-service-salud",
            label: "Salud",
            href: "/services/salud",
          },
          {
            id: "footer-service-hogar",
            label: "Hogar",
            href: "/services/hogar",
          },
          {
            id: "footer-service-viajes",
            label: "Viajes",
            href: "/services/viajes",
          },
          {
            id: "footer-service-empresarial",
            label: "Empresarial",
            href: "/services/empresarial",
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