export const vidaSectionsData = [
  {
    id: "vida-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Vida",
      title: "Protección financiera para quienes más amas",
      description:
        "Asesoría en seguros de vida individual y colectiva para resguardar el bienestar económico de tus beneficiarios ante un fallecimiento o invalidez.",
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
    id: "vida-description",
    enabled: true,
    component: "About",
    variant: "stacked-centered",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del ramo",
      title: "Tranquilidad financiera ante un imprevisto",
      description:
        "Te asesoramos para elegir una póliza de vida acorde a tu edad, tus responsabilidades familiares y tu presupuesto, comparando coberturas entre distintas aseguradoras para que tus beneficiarios cuenten con respaldo económico ante un fallecimiento o una invalidez.",
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
    id: "vida-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Por qué contar con un seguro de Vida",
      description:
        "Una póliza de vida protege el futuro financiero de tu familia frente a un evento que interrumpa tus ingresos.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Indemnización a beneficiarios",
        description:
          "Respaldo económico para tu familia ante un fallecimiento o invalidez.",
      },
      {
        title: "Protección de deudas y proyectos",
        description:
          "Evita que tus responsabilidades financieras recaigan sobre tus seres queridos.",
      },
      {
        title: "Planes individuales o familiares",
        description:
          "Cobertura ajustada a tu situación personal o a la de tu núcleo familiar.",
      },
      {
        title: "Pólizas colectivas",
        description:
          "Cobertura de vida para empleados de una empresa, con condiciones preferenciales.",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "vida-plans",
    enabled: true,
    component: "Services",
    variant: "cards-with-icons",
    surface: "base",
    containerWidth: "wide",
    spacing: "default",
    content: {
      eyebrow: "Tipos de plan",
      title: "Una cobertura para cada etapa y necesidad",
      description:
        "Te asesoramos para elegir el plan de vida que mejor se ajuste a ti, tu familia o tu equipo de trabajo.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Plan individual",
        description:
          "Cobertura de vida pensada para una sola persona, con capital asegurado a tu medida.",
        icon: "ShieldCheck",
      },
      {
        title: "Plan familiar",
        description:
          "Protección conjunta para ti y tus dependientes bajo una misma póliza.",
        icon: "Zap",
      },
      {
        title: "Plan colectivo",
        description:
          "Cobertura de vida para empleados o grupos organizados, con condiciones preferenciales.",
        icon: "Gauge",
      },
      {
        title: "Acompañamiento en siniestros",
        description:
          "Gestión y seguimiento del reclamo ante la aseguradora cuando la familia lo necesite.",
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
    id: "vida-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Un seguro de vida no es un gasto, es la certeza de que tu familia estará protegida pase lo que pase.",
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
    id: "vida-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Protege a tu familia",
      title: "Solicita asesoría para tu seguro de vida",
      description:
        "Te ayudamos a encontrar la cobertura adecuada para ti y tus beneficiarios.",
    },
    background: null,
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
