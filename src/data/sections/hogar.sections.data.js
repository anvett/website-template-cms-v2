export const hogarSectionsData = [
  {
    id: "hogar-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Hogar",
      title: "Protege tu vivienda y a tu familia",
      description:
        "Asesoría en seguros de vivienda, hogar y familia para resguardar tu patrimonio ante incendios, robos y desastres naturales.",
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
        label: "Ver ramos de seguros",
        href: "/services",
        variant: "secondary",
      },
    ],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "hogar-description",
    enabled: true,
    component: "About",
    variant: "image-right",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del ramo",
      title: "Tranquilidad para tu hogar y tu familia",
      description:
        "Te asesoramos en la elección de un seguro de vivienda que proteja tu casa, sus contenidos y a tu familia ante eventos como incendios, robos, inundaciones o terremotos.",
    },
    media: {
      background: null,
      foreground: {
        type: "image",
        src: "/assets/images/kautela/vivienda-hogar-familia-description.jpg",
        alt: "Asesoría en seguro de vivienda, hogar y familia Kautela",
      },
    },
    items: [],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "hogar-benefits",
    enabled: true,
    component: "Features",
    variant: "process-steps",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Por qué asegurar tu vivienda y tu familia",
      description:
        "Una cobertura adecuada protege tu patrimonio y brinda tranquilidad ante imprevistos.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Cobertura de la edificación",
        description:
          "Protección ante incendios, daños estructurales y desastres naturales.",
      },
      {
        title: "Protección de contenidos",
        description:
          "Cobertura para muebles, electrodomésticos y bienes del hogar.",
      },
      {
        title: "Robo y responsabilidad civil",
        description:
          "Respaldo ante robo en la vivienda y daños a terceros dentro del hogar.",
      },
      {
        title: "Asesoría familiar integral",
        description:
          "Recomendaciones de cobertura adaptadas a las necesidades de cada hogar.",
      },
    ],
    actions: [],
    meta: {
      overlay: true,
      overlayOpacity: 0.45,
    },
  },

  {
    id: "hogar-coverage-types",
    enabled: true,
    component: "Services",
    variant: "cards-with-icons",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Cobertura",
      title: "Tipos de cobertura del hogar",
      description:
        "Diseñamos la protección de tu vivienda según la edificación, sus contenidos y la seguridad familiar.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Edificación",
        description:
          "Protección ante incendios, daños estructurales y desastres naturales.",
        icon: "ShieldCheck",
      },
      {
        title: "Contenidos",
        description:
          "Cobertura para muebles, electrodomésticos y bienes del hogar.",
        icon: "Gauge",
      },
      {
        title: "Robo",
        description:
          "Respaldo económico ante el robo de bienes dentro de la vivienda.",
        icon: "Zap",
      },
      {
        title: "Responsabilidad civil familiar",
        description:
          "Cobertura ante daños ocasionados a terceros dentro del hogar.",
        icon: "Wrench",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "hogar-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "El hogar es el patrimonio más importante de una familia, y merece estar protegido.",
      author: "Kautela",
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
    id: "hogar-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Protege tu hogar",
      title: "Solicita asesoría para tu seguro de vivienda, hogar y familia",
      description:
        "Te ayudamos a encontrar la cobertura adecuada para tu vivienda y tu familia.",
    },
    background: {
      type: "image",
      src: "/assets/images/cta/cta-vivienda-bg.png",
      alt: "Seguros Kautela",
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
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },
];
