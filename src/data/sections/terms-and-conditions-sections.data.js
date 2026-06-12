export const termsAndConditionsSectionsData = [
  {
    id: "terms-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Términos y condiciones",
      title: "Condiciones generales de uso",
      description:
        "Consulta las condiciones relacionadas con el uso del sitio web, productos, servicios y solicitudes realizadas a Instamatic.",
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
    id: "terms-content",
    enabled: true,
    component: "Legal",
    variant: "content-list",
    surface: "base",
    containerWidth: "content",
    spacing: "default",
    background: {
      type: "surface",
      variant: null,
    },
    content: {
      eyebrow: "Condiciones",
      title: "Información general sobre productos y servicios",
      description:
        "El contenido publicado en este sitio tiene fines informativos y comerciales. Las características, precios, disponibilidad, garantías y condiciones de servicio pueden variar y deberán confirmarse al momento de solicitar una cotización o contratación.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Uso del sitio web",
        description:
          "El usuario se compromete a utilizar la información del sitio de forma responsable y con fines relacionados con la consulta de productos o servicios Instamatic.",
      },
      {
        title: "Información de productos",
        description:
          "Los productos, precios, combos, características y garantías mostrados pueden estar sujetos a disponibilidad, actualizaciones o condiciones comerciales vigentes.",
      },
      {
        title: "Servicios técnicos",
        description:
          "La instalación, mantenimiento, reparación, sistemas de bombeo o gas centralizado dependerán de la evaluación técnica, condiciones del lugar y alcance solicitado.",
      },
      {
        title: "Cotizaciones",
        description:
          "Toda cotización deberá ser confirmada por los canales oficiales de atención antes de considerarse definitiva.",
      },
      {
        title: "Garantías",
        description:
          "Las garantías aplican según el modelo, condiciones de uso, instalación y términos específicos informados al cliente al momento de la compra.",
      },
      {
        title: "Actualización de condiciones",
        description:
          "Instamatic podrá actualizar esta información conforme cambien sus productos, servicios, procesos o condiciones comerciales.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "terms-contact",
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
      eyebrow: "Consultas",
      title: "¿Necesitas aclarar alguna condición?",
      description:
        "Puedes comunicarte con Instamatic para confirmar información sobre productos, servicios, garantías, precios o condiciones de atención.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Productos y combos",
        description:
          "Consulta disponibilidad, precios, características y condiciones vigentes.",
      },
      {
        title: "Servicios técnicos",
        description:
          "Solicita aclaración sobre instalación, mantenimiento, reparación, bombeo de agua o gas centralizado.",
      },
    ],
    actions: [
      {
        label: "Ir a contacto",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {},
  },
];