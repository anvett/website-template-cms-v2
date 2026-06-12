export const waterPumpsSectionsData = [
  {
    id: "water-pumps-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Sistemas de bombeo",
      title: "Instalación y mantenimiento de bombas de agua",
      description:
        "Soluciones para mejorar la presión y garantizar un suministro eficiente de agua en viviendas, edificios y negocios.",
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
    id: "water-pumps-description",
    enabled: true,
    component: "About",
    variant: "image-right",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del servicio",
      title: "Presión constante y suministro eficiente",
      description:
        "Instalamos y damos mantenimiento a sistemas de bombeo de agua para viviendas, edificios y negocios. Trabajamos con equipos adecuados según la necesidad del cliente, realizando configuraciones correctas para evitar fallas, ruidos o desgaste prematuro.",
    },
    media: {
      background: null,
      foreground: {
        type: "image",
        src: "/assets/images/instamatic/services/water-pumps-description.jpg",
        alt: "Instalación de bomba de agua",
      },
    },
    items: [],
    actions: [],
    meta: {},
  },

  {
    id: "water-pumps-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Soluciones para mejorar la presión de agua",
      description:
        "Un sistema de bombeo bien instalado permite optimizar el abastecimiento y mejorar la experiencia de uso diario.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Instalación de bombas de agua",
        description:
          "Montaje y configuración de equipos adecuados según la necesidad del cliente.",
      },
      {
        title: "Optimización de presión en el hogar",
        description:
          "Soluciones para mejorar el flujo de agua en los distintos puntos de consumo.",
      },
      {
        title: "Mantenimiento preventivo",
        description:
          "Revisión y ajustes para evitar fallas, ruidos o desgaste prematuro.",
      },
      {
        title: "Soluciones para baja presión",
        description:
          "Alternativas técnicas para viviendas, edificios y negocios con problemas de presión.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "water-pumps-process",
    enabled: true,
    component: "Comparison",
    variant: "split",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Proceso",
      title: "Cómo trabajamos los sistemas de bombeo",
      description:
        "Evaluamos la necesidad de presión y abastecimiento para recomendar una solución adecuada.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/services/water-pumps-process-bg.jpg",
        alt: "Sistemas de bombeo de agua",
      },
      foreground: null,
    },
    items: [
      {
        eyebrow: "Paso 1",
        title: "Evaluación de presión y consumo",
        description:
          "Revisamos los puntos de consumo, el problema de presión y las condiciones del sistema existente.",
      },
      {
        eyebrow: "Paso 2",
        title: "Instalación, configuración y mantenimiento",
        description:
          "Instalamos o damos mantenimiento al sistema, configurando el equipo para un funcionamiento estable y eficiente.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "water-pumps-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Una buena presión de agua mejora la comodidad diaria y el rendimiento de los equipos del hogar.",
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
    id: "water-pumps-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Mejora tu presión de agua",
      title: "Solicita asesoría para tu sistema de bombeo",
      description:
        "Te ayudamos a encontrar una solución eficiente para viviendas, edificios o negocios con baja presión o problemas de abastecimiento.",
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