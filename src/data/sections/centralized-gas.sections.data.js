export const centralizedGasSectionsData = [
  {
    id: "centralized-gas-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Gas centralizado",
      title: "Gas centralizado doméstico e industrial",
      description:
        "Diseño, instalación y mantenimiento de sistemas de gas centralizado para viviendas, conjuntos residenciales y negocios.",
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
      {
        label: "Ver servicios",
        href: "/services",
        variant: "secondary",
      },
    ],
    meta: {},
  },

  {
    id: "centralized-gas-description",
    enabled: true,
    component: "About",
    variant: "image-right",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del servicio",
      title: "Sistemas de gas seguros y confiables",
      description:
        "Diseñamos e instalamos sistemas de gas centralizado para viviendas, conjuntos residenciales y negocios, cumpliendo con criterios de seguridad y garantizando un suministro confiable. También realizamos adecuaciones y mantenimiento de sistemas existentes.",
    },
    media: {
      background: null,
      foreground: {
        type: "image",
        src: "/assets/images/instamatic/services/centralized-gas-description.jpg",
        alt: "Instalación de sistema de gas centralizado",
      },
    },
    items: [],
    actions: [],
    meta: {},
  },

  {
    id: "centralized-gas-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Soluciones de gas con enfoque técnico",
      description:
        "El gas centralizado requiere una instalación segura, bien planificada y con mantenimiento adecuado.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Instalaciones seguras",
        description:
          "Trabajo técnico orientado a reducir riesgos y asegurar el correcto funcionamiento del sistema.",
      },
      {
        title: "Uso doméstico e industrial",
        description:
          "Soluciones para viviendas, conjuntos residenciales, negocios y proyectos de mayor demanda.",
      },
      {
        title: "Revisión y mantenimiento de líneas de gas",
        description:
          "Inspección, adecuación y mantenimiento de sistemas existentes para mejorar seguridad y funcionamiento.",
      },
      {
        title: "Soluciones eficientes y duraderas",
        description:
          "Sistemas diseñados para ofrecer suministro confiable y uso práctico a largo plazo.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "centralized-gas-process",
    enabled: true,
    component: "Comparison",
    variant: "split",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Proceso",
      title: "Cómo desarrollamos un sistema de gas centralizado",
      description:
        "Analizamos la necesidad del proyecto para diseñar una solución segura, eficiente y funcional.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/services/centralized-gas-process-bg.jpg",
        alt: "Sistema de gas centralizado",
      },
      foreground: null,
    },
    items: [
      {
        eyebrow: "Paso 1",
        title: "Evaluación técnica del proyecto",
        description:
          "Revisamos el tipo de inmueble, puntos de consumo, condiciones de instalación y necesidades del sistema.",
      },
      {
        eyebrow: "Paso 2",
        title: "Instalación, adecuación y pruebas",
        description:
          "Ejecutamos la instalación o mantenimiento del sistema, verificando conexiones, seguridad y funcionamiento.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "centralized-gas-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "El gas centralizado requiere planificación, seguridad y ejecución técnica responsable.",
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
    id: "centralized-gas-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Solicita asesoría",
      title: "Planifica tu sistema de gas centralizado",
      description:
        "Te ayudamos a evaluar la mejor solución para viviendas, conjuntos residenciales, edificios o negocios.",
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