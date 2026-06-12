export const installationSectionsData = [
  {
    id: "installation-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Instalación de calefones",
      title: "Instalación profesional de calefones a gas",
      description:
        "Realizamos la instalación de calefones a gas garantizando un funcionamiento seguro, eficiente y duradero.",
    },
    media: {
      background: null,
      foreground: null
    },
    items: [],
    actions: [
      {
        label: "Solicitar instalación",
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
    id: "installation-description",
    enabled: true,
    component: "About",
    variant: "image-right",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del servicio",
      title: "Instalación segura desde el primer día",
      description:
        "Nuestro equipo técnico se encarga de todo el proceso, desde la verificación del punto de instalación hasta las pruebas finales de funcionamiento. Adaptamos la instalación según las condiciones del hogar para asegurar encendido correcto, buena presión de agua y rendimiento óptimo.",
    },
    media: {
      background: null,
      foreground: {
        type: "image",
        src: "/assets/images/instamatic/services/installation-description.jpg",
        alt: "Técnico instalando calefón a gas",
      },
    },
    items: [],
    actions: [],
    meta: {},
  },

  {
    id: "installation-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image", //two-columns-gradient-image | process-steps | two-columns
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Qué incluye la instalación",
      description:
        "Una instalación correcta permite que el calefón funcione de forma segura, eficiente y estable.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Instalación rápida y segura",
        description:
          "Trabajo técnico orientado a un funcionamiento correcto desde el primer día.",
      },
      {
        title: "Adaptación a baja presión de agua",
        description:
          "Configuración de la instalación según las condiciones reales del hogar.",
      },
      {
        title: "Pruebas completas de funcionamiento",
        description:
          "Verificación de encendido, presión, temperatura y desempeño general.",
      },
      {
        title: "Atención en Quito y Valles",
        description:
          "Servicio disponible para hogares y negocios ubicados en Quito y sus valles.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "installation-process",
    enabled: true,
    component: "Comparison",
    variant: "split",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Proceso",
      title: "Cómo realizamos la instalación",
      description:
        "Seguimos un proceso práctico para asegurar que el calefón quede correctamente instalado y probado.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/services/installation-process-bg.jpg",
        alt: "Servicios técnicos Instamatic",
      },
      foreground: null,
    },
    items: [
      {
        eyebrow: "Paso 1",
        title: "Revisión del punto de instalación",
        description:
          "Verificamos ubicación, conexiones, presión de agua y condiciones necesarias para el montaje.",
      },
      {
        eyebrow: "Paso 2",
        title: "Instalación y pruebas finales",
        description:
          "Instalamos el equipo, revisamos el encendido, comprobamos el funcionamiento y validamos que el sistema quede listo para usar.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "installation-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Una instalación correcta es clave para que el calefón trabaje de forma segura, eficiente y duradera.",
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
    id: "installation-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Solicita tu instalación",
      title: "Instala tu calefón con respaldo técnico",
      description:
        "Te ayudamos a instalar tu calefón Instamatic de forma segura y adaptada a las condiciones de tu hogar o negocio.",
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
