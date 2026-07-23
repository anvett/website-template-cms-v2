export const empresarialSectionsData = [
  {
    id: "empresarial-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Empresarial",
      title: "Protección integral para tu empresa o consorcio",
      description:
        "Asesoría en seguros empresariales y de consorcio para resguardar activos, operaciones y responsabilidad civil.",
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
    id: "empresarial-description",
    enabled: true,
    component: "About",
    variant: "stacked-centered",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del ramo",
      title: "Administración de riesgos para empresas y consorcios",
      description:
        "Asesoramos a empresas y consorcios en la identificación de riesgos operativos, patrimoniales y de responsabilidad civil, recomendando coberturas que protejan la continuidad del negocio.",
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
    id: "empresarial-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Por qué asegurar tu empresa o consorcio",
      description:
        "Una cobertura adecuada protege tu inversión y la continuidad de tus operaciones.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Protección de activos",
        description:
          "Cobertura para infraestructura, equipos e inventario del negocio.",
      },
      {
        title: "Responsabilidad civil",
        description:
          "Respaldo ante daños a terceros derivados de la operación.",
      },
      {
        title: "Continuidad operativa",
        description:
          "Soluciones que minimizan el impacto financiero ante un siniestro.",
      },
      {
        title: "Asesoría especializada",
        description:
          "Acompañamiento técnico adaptado al sector de tu empresa o consorcio.",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "empresarial-coverage-types",
    enabled: true,
    component: "Services",
    variant: "cards-with-icons",
    surface: "base",
    containerWidth: "wide",
    spacing: "default",
    content: {
      eyebrow: "Tipos de cobertura",
      title: "Coberturas a la medida de tu operación",
      description:
        "Combinamos distintos tipos de cobertura según el riesgo real de tu empresa o consorcio.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Activos fijos",
        description:
          "Cobertura para infraestructura, maquinaria, equipos e inventario.",
        icon: "ShieldCheck",
      },
      {
        title: "Responsabilidad civil",
        description:
          "Respaldo ante daños a terceros derivados de la operación o el espacio físico.",
        icon: "Gauge",
      },
      {
        title: "Continuidad operativa",
        description:
          "Soluciones que reducen el impacto financiero de un siniestro en el negocio.",
        icon: "Zap",
      },
      {
        title: "Transporte de valores",
        description:
          "Cobertura para el traslado de dinero, mercancía o documentos sensibles.",
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
    id: "empresarial-stats",
    enabled: true,
    component: "Stats",
    variant: "3-items",
    surface: "strong",
    containerWidth: "section",
    spacing: "compact",
    content: {
      eyebrow: "Asesoría empresarial",
      title: "Experiencia respaldando negocios y consorcios",
      description:
        "Acompañamos a empresas de distintos sectores en la gestión de su riesgo.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        value: "+10",
        label: "años de trayectoria",
        description: "Asesorando empresas desde Ibarra",
      },
      {
        value: "6",
        label: "ramos de seguros",
        description: "Cobertura complementaria según el negocio",
      },
      {
        value: "100%",
        label: "asesoría personalizada",
        description: "Acompañamiento dedicado a cada empresa o consorcio",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "empresarial-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Una empresa protegida es una empresa que puede seguir operando frente a un imprevisto.",
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
    id: "empresarial-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Protege tu negocio",
      title: "Solicita asesoría para tu seguro empresarial o de consorcio",
      description:
        "Te ayudamos a encontrar la cobertura adecuada para tu empresa o consorcio.",
    },
    background: {
      type: "image",
      src: "/assets/images/cta/cta-empresarial-y-consorcio-bg.png",
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
