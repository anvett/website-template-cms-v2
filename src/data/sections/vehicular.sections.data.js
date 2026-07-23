export const vehicularSectionsData = [
  {
    id: "vehicular-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "wide",
    spacing: "hero",
    content: {
      eyebrow: "Vehicular",
      title: "Protección completa para tu vehículo",
      description:
        "Asesoría en seguros vehiculares para autos particulares y flotas empresariales ante accidentes, robo y daños a terceros.",
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
    id: "vehicular-description",
    enabled: true,
    component: "About",
    variant: "image-right",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Descripción del ramo",
      title: "Cobertura para tu vehículo particular o flota",
      description:
        "Te asesoramos en la elección de un seguro vehicular acorde al uso de tu auto, comparando coberturas de responsabilidad civil, daños propios, robo y asistencia en carretera.",
    },
    media: {
      background: null,
      foreground: {
        type: "image",
        src: "/assets/images/kautela/vehicular-description.jpg",
        alt: "Asesoría en seguro vehicular Kautela",
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
    id: "vehicular-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Por qué asegurar tu vehículo",
      description:
        "Una cobertura adecuada te protege financieramente ante accidentes, robo o daños a terceros.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Responsabilidad civil",
        description:
          "Cobertura ante daños ocasionados a terceros en un accidente.",
      },
      {
        title: "Daños propios y robo",
        description:
          "Protección para tu vehículo ante choques, robo o pérdida total.",
      },
      {
        title: "Asistencia en carretera",
        description:
          "Apoyo ante emergencias durante un viaje o desplazamiento.",
      },
      {
        title: "Planes para flotas",
        description:
          "Coberturas adaptadas a empresas con varios vehículos.",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "vehicular-process",
    enabled: true,
    component: "Comparison",
    variant: "split",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Proceso",
      title: "Cómo te asesoramos en este ramo",
      description:
        "Evaluamos el uso de tu vehículo para recomendar la cobertura vehicular adecuada.",
    },
    background: {
      type: "image",
      src: "/assets/images/kautela/vehicular-process-bg.jpg",
      alt: "Asesoría en seguros vehiculares",
    },
    media: {
      
      background: null,
      foreground: null,
    },
    items: [
      {
        eyebrow: "Paso 1",
        title: "Evaluación del vehículo y su uso",
        description:
          "Revisamos el tipo de vehículo, uso particular o comercial y nivel de exposición al riesgo.",
      },
      {
        eyebrow: "Paso 2",
        title: "Contratación y acompañamiento en siniestros",
        description:
          "Gestionamos la contratación de la póliza y te acompañamos en caso de un siniestro.",
      },
    ],
    actions: [],
    meta: {
      overlay: true,
      overlayOpacity: 0.35,
    },
  },

  {
    id: "vehicular-stats",
    enabled: true,
    component: "Stats",
    variant: "3-items",
    surface: "strong",
    containerWidth: "section",
    spacing: "compact",
    content: {
      eyebrow: "Cobertura vehicular",
      title: "Respaldo dentro y fuera de la vía",
      description:
        "Asesoría especializada para vehículos particulares, comerciales y flotas.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        value: "24/7",
        label: "asistencia en carretera",
        description: "Soporte ante accidentes o averías",
      },
      {
        value: "+10",
        label: "años de trayectoria",
        description: "Asesorando pólizas vehiculares desde Ibarra",
      },
      {
        value: "100%",
        label: "cobertura nacional",
        description: "Acompañamiento en todo el país",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "vehicular-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Un vehículo bien asegurado evita que un accidente se convierta en una pérdida financiera mayor.",
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
    id: "vehicular-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Protege tu vehículo",
      title: "Solicita asesoría para tu seguro vehicular",
      description:
        "Te ayudamos a encontrar la cobertura adecuada para tu auto o tu flota.",
    },
    background: {
      type: "image",
      src: "/assets/images/cta/cta-vehicular-bg.png",
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
      overlayOpacity: 0.15,
    },
  },
];
