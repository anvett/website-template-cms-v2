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
      title: "Solicita asesoría o cotización",
      description:
        "Contáctanos para recibir asesoría sobre cualquiera de nuestros 7 ramos de seguros o para reportar un siniestro.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
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
        "Completa tus datos y selecciona el ramo de tu interés para recibir orientación por WhatsApp.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Asesoría comercial",
        description: "Cotizaciones y asesoría para los 7 ramos de seguros.",
      },
      {
        title: "Atención de siniestros",
        description:
          "Acompañamiento y gestión ante un siniestro reportado.",
      },
    ],
    actions: [],
    meta: {
      mapEmbed: {
        src: "https://www.google.com/maps/embed?...",
        title: "Kautela Agencia Asesora Productora de Seguros - Ibarra",
        height: "24rem",
      },
      form: {
        whatsappIntro: "Hola, deseo más información sobre los seguros de Kautela.",
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
            label: "Ramo de interés",
            type: "select",
            required: true,
            options: [
              "Vida y Salud",
              "Empresarial y Consorcio",
              "Desgravamen",
              "Ahorro Acumulativo",
              "Transporte",
              "Vehicular",
              "Vivienda, Hogar y Familia",
              "Reporte de siniestro",
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
      title: "Atención a nivel nacional",
      description:
        "Brindamos asesoría a personas, familias y empresas en 17 ciudades del país, con oficinas en Ibarra.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Zona de atención",
        description: "Cobertura nacional, oficinas en Ibarra.",
      },
      {
        title: "Tipo de clientes",
        description: "Personas, familias, empresas y consorcios.",
      },
      {
        title: "Comercial",
        description: "WhatsApp: 0992 559 126",
      },
      {
        title: "Siniestros",
        description: "WhatsApp: 0992 753 560",
      },
    ],
    actions: [
      {
        label: "Ver ramos de seguros",
        href: "/services",
        variant: "primary",
      },
    ],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
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
      eyebrow: "Kautela",
      title: "Recibe asesoría para elegir la mejor cobertura",
      description:
        "Te ayudamos a definir el seguro adecuado según tu necesidad personal, familiar o empresarial.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Ver ramos de seguros",
        href: "/services",
        variant: "primary",
      },
      {
        label: "Conocer Kautela",
        href: "/about-us",
        variant: "secondary",
      },
    ],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },
];
