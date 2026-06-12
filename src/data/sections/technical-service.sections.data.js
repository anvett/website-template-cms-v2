export const technicalServiceSectionsData = [
  {
    id: "technical-service-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Servicio técnico",
      title: "Mantenimiento y reparación de calefones",
      description:
        "Diagnóstico, reparación y mantenimiento completo de calefones a gas para mejorar su rendimiento y prolongar su vida útil.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Solicitar servicio técnico",
        href: "/contact",
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

  {
    id: "technical-service-description",
    enabled: true,
    component: "About",
    variant: "image-right",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del servicio",
      title: "Diagnóstico, reparación y mantenimiento completo",
      description:
        "Solucionamos fallas comunes como problemas de encendido, fugas internas, baja temperatura o fallos en componentes. Nuestro mantenimiento incluye limpieza profunda, revisión de piezas, lubricación y pruebas de seguridad.",
    },
    media: {
      background: null,
      foreground: {
        type: "image",
        src: "/assets/images/instamatic/services/technical-service-description.jpg",
        alt: "Mantenimiento de calefón a gas",
      },
    },
    items: [],
    actions: [],
    meta: {},
  },

  {
    id: "technical-service-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Qué incluye el servicio técnico",
      description:
        "Un mantenimiento oportuno ayuda a prevenir daños mayores y mantener el equipo funcionando correctamente.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Diagnóstico preciso",
        description:
          "Revisión técnica para identificar fallas y determinar el estado real del equipo.",
      },
      {
        title: "Reparación con repuestos disponibles",
        description:
          "Corrección de fallas con respaldo de repuestos según el caso.",
      },
      {
        title: "Mantenimiento preventivo y correctivo",
        description:
          "Limpieza, revisión y ajustes para evitar problemas futuros o corregir fallas existentes.",
      },
      {
        title: "Mejora del rendimiento del equipo",
        description:
          "Trabajo orientado a prolongar la vida útil y optimizar el desempeño del calefón.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "technical-service-process",
    enabled: true,
    component: "Comparison",
    variant: "split",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Proceso",
      title: "Cómo realizamos el mantenimiento",
      description:
        "El servicio se enfoca en revisar, corregir y validar el funcionamiento seguro del calefón.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/services/technical-service-process-bg.jpg",
        alt: "Servicio técnico de calefones Instamatic",
      },
      foreground: null,
    },
    items: [
      {
        eyebrow: "Paso 1",
        title: "Diagnóstico y revisión del equipo",
        description:
          "Identificamos fallas, revisamos componentes, verificamos encendido, temperatura y estado general.",
      },
      {
        eyebrow: "Paso 2",
        title: "Limpieza, reparación y pruebas",
        description:
          "Realizamos limpieza profunda, ajustes necesarios, reparación según el caso y pruebas finales de seguridad.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "technical-service-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "El mantenimiento preventivo ayuda a evitar daños mayores y mejora el rendimiento del calefón.",
      author: "Instamatic Ecuador",
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
    id: "technical-service-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Agenda tu revisión",
      title: "Mantén tu calefón funcionando correctamente",
      description:
        "Solicita diagnóstico, reparación o mantenimiento técnico para mejorar el rendimiento y seguridad de tu equipo.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Contactar ahora",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {},
  },
];