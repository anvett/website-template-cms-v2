export const viajesSectionsData = [
  {
    id: "viajes-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Viajes",
      title: "Viaja tranquilo, dentro y fuera del país",
      description:
        "Asesoría en seguros de viajes con asistencia médica en el extranjero, cobertura de equipaje y protección ante cancelaciones o interrupciones de viaje.",
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
    id: "viajes-description",
    enabled: true,
    component: "About",
    variant: "stacked-centered",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del ramo",
      title: "Respaldo internacional para tu próximo viaje",
      description:
        "Te asesoramos para elegir un seguro de viajes acorde a tu destino, la duración de tu viaje y el motivo del mismo, comparando coberturas de asistencia médica en el extranjero, equipaje y cancelación entre distintas aseguradoras.",
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
    id: "viajes-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Por qué viajar con un seguro de Viajes",
      description:
        "Una cobertura adecuada te protege ante emergencias médicas, pérdidas de equipaje o imprevistos que puedan afectar tu viaje.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Asistencia médica en el extranjero",
        description:
          "Cobertura ante emergencias de salud durante tu viaje fuera del país.",
      },
      {
        title: "Cancelación e interrupción de viaje",
        description:
          "Respaldo económico ante la cancelación o interrupción de tu itinerario por causas cubiertas.",
      },
      {
        title: "Pérdida de equipaje",
        description:
          "Indemnización ante la pérdida, robo o retraso de tu equipaje.",
      },
      {
        title: "Cobertura internacional",
        description:
          "Protección válida en la mayoría de destinos, según el plan contratado.",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "viajes-coverage-types",
    enabled: true,
    component: "Services",
    variant: "cards-with-icons",
    surface: "base",
    containerWidth: "wide",
    spacing: "default",
    content: {
      eyebrow: "Tipos de cobertura",
      title: "Un plan de viajes para cada tipo de itinerario",
      description:
        "Te asesoramos para elegir el plan que mejor se ajuste a la frecuencia y el motivo de tus viajes.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Viaje único",
        description:
          "Cobertura para un viaje puntual de placer o negocios, según su duración.",
        icon: "ShieldCheck",
      },
      {
        title: "Viajero frecuente",
        description:
          "Plan anual para quienes viajan varias veces al año, dentro o fuera del país.",
        icon: "Zap",
      },
      {
        title: "Viajes de estudio",
        description:
          "Cobertura pensada para estancias académicas en el extranjero.",
        icon: "Gauge",
      },
      {
        title: "Acompañamiento en siniestros",
        description:
          "Gestión y seguimiento de tu reclamo ante la aseguradora durante o después del viaje.",
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
    id: "viajes-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Un buen seguro de viajes te permite disfrutar tu destino sin preocuparte por lo inesperado.",
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
    id: "viajes-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Prepara tu viaje",
      title: "Solicita asesoría para tu seguro de viajes",
      description:
        "Te ayudamos a encontrar la cobertura adecuada para tu próximo destino.",
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
