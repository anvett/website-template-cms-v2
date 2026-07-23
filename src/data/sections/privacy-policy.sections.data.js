export const privacyPolicySectionsData = [
  {
    id: "privacy-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Política de privacidad",
      title: "Protección y uso de información personal",
      description:
        "Conoce cómo Kautela recopila, utiliza y protege la información enviada por sus clientes y usuarios.",
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
    id: "privacy-content",
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
      eyebrow: "Privacidad",
      title: "Uso responsable de la información",
      description:
        "La información enviada a través del sitio web, formularios o canales de contacto será utilizada únicamente para responder consultas, solicitudes de cotización, atención comercial o gestión de siniestros relacionados con Kautela.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Información recopilada",
        description:
          "Podemos recibir datos como nombre, teléfono, correo electrónico, ramo de interés y mensaje enviado por el usuario.",
      },
      {
        title: "Finalidad de uso",
        description:
          "La información será utilizada para responder consultas, preparar cotizaciones, gestionar siniestros o brindar asesoría sobre los seguros de Kautela.",
      },
      {
        title: "Protección de datos",
        description:
          "Kautela procurará manejar la información de forma responsable, evitando su uso para fines ajenos a la atención solicitada por el usuario.",
      },
      {
        title: "Comunicación con el usuario",
        description:
          "El usuario podrá ser contactado mediante los datos proporcionados para dar seguimiento a su solicitud o reclamo.",
      },
      {
        title: "Actualización de la política",
        description:
          "Esta política puede actualizarse conforme cambien los procesos internos, servicios o requerimientos legales aplicables.",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "privacy-contact",
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
      title: "¿Tienes dudas sobre privacidad?",
      description:
        "Puedes comunicarte con Kautela para solicitar información relacionada con el tratamiento de tus datos personales.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Atención",
        description:
          "Consultas relacionadas con privacidad, uso de datos y solicitudes enviadas desde el sitio web.",
      },
      {
        title: "Canal de contacto",
        description:
          "Utiliza la página de contacto para comunicar cualquier inquietud relacionada con tu información.",
      },
    ],
    actions: [
      {
        label: "Ir a contacto",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },
];
