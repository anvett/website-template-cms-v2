export const saludSectionsData = [
  {
    id: "salud-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Salud",
      title: "Asistencia médica cuando más la necesitas",
      description:
        "Asesoría en seguros de asistencia médica para cubrir hospitalizaciones, consultas y tratamientos con una amplia red de clínicas y prestadores.",
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
    id: "salud-description",
    enabled: true,
    component: "About",
    variant: "stacked-centered",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del ramo",
      title: "Cobertura de gastos médicos a tu medida",
      description:
        "Te asesoramos para elegir un plan de asistencia médica acorde a tu edad, condición de salud y presupuesto, comparando coberturas y redes de prestadores entre distintas aseguradoras para que accedas a atención de calidad sin poner en riesgo tu economía.",
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
    id: "salud-benefits",
    enabled: true,
    component: "Features",
    variant: "process-steps",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Por qué contar con un seguro de Salud",
      description:
        "Una cobertura médica adecuada evita que una hospitalización o tratamiento comprometa tus finanzas.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Cobertura de hospitalización",
        description:
          "Respaldo ante cirugías, internaciones y tratamientos de mayor complejidad.",
      },
      {
        title: "Consultas y exámenes",
        description:
          "Acceso a consultas médicas, exámenes de diagnóstico y medicina preventiva.",
      },
      {
        title: "Amplia red de prestadores",
        description:
          "Cobertura en clínicas, hospitales y centros médicos afiliados a la aseguradora.",
      },
      {
        title: "Planes según tu necesidad",
        description:
          "Opciones individuales, familiares o colectivas ajustadas a tu presupuesto.",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "salud-plans",
    enabled: true,
    component: "Services",
    variant: "cards-with-icons",
    surface: "base",
    containerWidth: "wide",
    spacing: "default",
    content: {
      eyebrow: "Tipos de plan",
      title: "Una cobertura médica para cada etapa y necesidad",
      description:
        "Te asesoramos para elegir el plan de salud que mejor se ajuste a ti, tu familia o tu equipo de trabajo.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Plan individual",
        description:
          "Cobertura de asistencia médica pensada para una sola persona.",
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
          "Cobertura médica para empleados o grupos organizados, con condiciones preferenciales.",
        icon: "Gauge",
      },
      {
        title: "Acompañamiento en siniestros",
        description:
          "Gestión y seguimiento de tu reclamo ante la aseguradora cuando lo necesites.",
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
    id: "salud-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Cuidar tu salud también significa asegurarte de que un imprevisto médico no se convierta en una carga financiera.",
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
    id: "salud-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Cuida tu salud",
      title: "Solicita asesoría para tu seguro de salud",
      description:
        "Te ayudamos a encontrar la cobertura médica adecuada para ti y tu familia.",
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
