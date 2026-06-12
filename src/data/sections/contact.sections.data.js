export const contactSectionsData = [
  {
    id: "contact-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Contacto",
      title: "Solicita información o cotización",
      description:
        "Contáctanos para productos Instamatic, instalación de calefones, mantenimiento técnico, sistemas de bombeo o gas centralizado.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [],
    meta: {},
  },

  {
    id: "contact-main",
    enabled: true,
    component: "Contact",
    variant: "info-form",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "gradient",
      variant: "soft",
    },
    content: {
      eyebrow: "Escríbenos",
      title: "Cuéntanos qué necesitas",
      description:
        "Completa tus datos y selecciona el tipo de solución que buscas para recibir orientación por WhatsApp.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Productos",
        description: "Calefones, combos y accesorios Instamatic.",
      },
      {
        title: "Servicios",
        description:
          "Instalación, mantenimiento, bombeo de agua y gas centralizado.",
      },
      // {
      //   title: "Cobertura",
      //   description: "Atención en Quito y Valles.",
      // },
    ],
    actions: [],
    meta: {
      mapEmbed: {
        src: "https://www.google.com/maps/embed?...",
        title: "Instamatic Ecuador",
        height: "24rem",
      },
      form: {
        whatsappIntro: "Hola, quiero solicitar información sobre Kautela.",
        fields: [
          {
            name: "name",
            label: "Nombre",
            type: "text",
            required: true,
          },
          {
            name: "phone",
            label: "Teléfono",
            type: "tel",
            required: true,
          },
          {
            name: "email",
            label: "Correo electrónico",
            type: "email",
            required: false,
          },
          {
            name: "service",
            label: "Tipo de solicitud",
            type: "select",
            required: true,
            options: [
              "Calefones y combos",
              "Instalación de calefón",
              "Servicio técnico y mantenimiento",
              "Sistemas de bombeo de agua",
              "Gas centralizado",
              "Otra consulta",
            ],
          },
          {
            name: "message",
            label: "Mensaje",
            type: "textarea",
            required: true,
          },
        ],
      },
    },
  },

  {
    id: "contact-location",
    enabled: true,
    component: "Contact",
    variant: "info-only",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "gradient",
      variant: "soft",
    },
    content: {
      eyebrow: "Cobertura",
      title: "Atención en Quito y Valles",
      description:
        "Brindamos asesoría para hogares, edificios, negocios y proyectos que requieren soluciones de agua caliente, presión o gas.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Zona de atención",
        description: "Quito y Valles.",
      },
      {
        title: "Tipo de clientes",
        description: "Hogares, edificios, negocios y proyectos.",
      },
      {
        title: "Solicitudes",
        description:
          "Productos, instalación, mantenimiento, bombeo de agua y gas centralizado.",
      },
    ],
    actions: [
      {
        label: "Ver servicios",
        href: "/services",
        variant: "primary",
      },
    ],
    meta: {},
  },

  {
    id: "contact-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Instamatic Ecuador",
      title: "Recibe asesoría para elegir la mejor solución",
      description:
        "Te ayudamos a definir el calefón, combo o servicio adecuado según tu necesidad, presión de agua y tipo de instalación.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Ver productos",
        href: "/products",
        variant: "primary",
      },
      {
        label: "Ver servicios",
        href: "/services",
        variant: "secondary",
      },
    ],
    meta: {},
  },
];
