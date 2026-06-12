export const servicesSectionsData = [
  {
    id: "services-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Servicios",
      title: "Servicios técnicos Instamatic",
      description:
        "Instalación de calefones, mantenimiento técnico, sistemas de bombeo de agua y gas centralizado para hogares, edificios y negocios.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Solicitar asesoría",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {},
  },

  {
    id: "services-overview",
    enabled: true,
    component: "About",
    variant: "stacked-centered",
    surface: "base",
    containerWidth: "content",
    spacing: "default",
    content: {
      eyebrow: "Soluciones profesionales",
      title: "Todo lo que necesitas para agua caliente, presión y gas",
      description:
        "Nuestros servicios están orientados a garantizar instalaciones seguras, equipos funcionando correctamente y soluciones adaptadas a las condiciones reales de cada hogar o negocio.",
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
    id: "services-grid",
    enabled: true,
    component: "Services",
    variant: "cards-with-icons", //grid-4
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Servicios principales",
      title: "Elige la solución que necesitas",
      description:
        "Contamos con atención técnica para instalación, mantenimiento, presión de agua y sistemas de gas centralizado.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        icon: "Flame",
        title: "Instalación de calefones",
        description:
          "Instalación profesional de calefones a gas con verificación del punto, adaptación a baja presión y pruebas completas de funcionamiento.",
        href: "/services/installation",
      },
      {
        icon: "Wrench",
        title: "Servicio técnico y mantenimiento",
        description:
          "Diagnóstico, reparación, limpieza profunda, revisión de piezas y mantenimiento preventivo o correctivo de calefones a gas.",
        href: "/services/technical-service",
      },
      {
        icon: "Droplets",
        title: "Sistemas de bombeo de agua",
        description:
          "Instalación y mantenimiento de sistemas de bombeo para mejorar presión y abastecimiento en viviendas, edificios y negocios.",
        href: "/services/water-pumps",
      },
      {
        icon: "Gauge",
        title: "Gas centralizado",
        description:
          "Diseño, instalación y mantenimiento de sistemas de gas centralizado doméstico e industrial con criterios de seguridad.",
        href: "/services/centralized-gas",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "services-process",
    enabled: true,
    component: "Features",
    variant: "process-steps", //two-columns
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Proceso",
      title: "Atención técnica clara y ordenada",
      description:
        "Trabajamos con un proceso práctico para identificar la necesidad, recomendar la solución adecuada y validar el funcionamiento final.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/services/process-bg.jpg",
        alt: "Proceso técnico Instamatic",
      },
      foreground: null,
    },
    items: [
      {
        title: "Evaluación inicial",
        description:
          "Revisamos la necesidad del cliente, el punto de instalación, la presión de agua y las condiciones del espacio.",
      },
      {
        title: "Recomendación técnica",
        description:
          "Definimos el equipo, servicio o solución más conveniente según el uso, el lugar y el presupuesto disponible.",
      },
      {
        title: "Ejecución del servicio",
        description:
          "Realizamos la instalación, mantenimiento o adecuación correspondiente con criterio técnico y cuidado del sistema.",
      },
      {
        title: "Pruebas de funcionamiento",
        description:
          "Verificamos encendido, presión, temperatura, conexiones y seguridad antes de entregar el trabajo.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "services-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Un buen servicio técnico no solo instala: verifica, prueba y deja el sistema funcionando correctamente.",
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
    id: "services-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Solicita asesoría",
      title: "Encuentra el servicio adecuado para tu hogar o negocio",
      description:
        "Te orientamos para elegir la mejor solución en instalación, mantenimiento, presión de agua o gas centralizado.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/cta/services-cta-bg.jpg",
        alt: "Servicios técnicos Instamatic",
      },
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Contactar ahora",
        href: "/contact",
        variant: "primary",
      },
      {
        label: "Ver productos",
        href: "/products",
        variant: "secondary",
      },
    ],
    meta: {},
  },
];
