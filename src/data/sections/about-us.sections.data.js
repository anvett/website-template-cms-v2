export const aboutUsSectionsData = [
  {
    id: "about-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Nosotros",
      title: "Una firma de asesoría en seguros con vocación de servicio",
      description:
        "Conoce la historia, misión, visión y valores que guían a Kautela desde su fundación en Ibarra.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Ver ramos de seguros",
        href: "/services",
        variant: "primary",
      },
      {
        label: "Contactar",
        href: "/contact",
        variant: "secondary",
      },
    ],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "about-story",
    enabled: true,
    component: "About",
    variant: "image-right",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Nuestra historia",
      title: "Constituida en Ibarra desde el 24 de octubre de 2014",
      description:
        "Kautela Agencia Asesora Productora de Seguros Cía. Ltda. nació en Ibarra con el propósito de brindar asesoría integral en seguros y administración de riesgos. A lo largo de los años hemos construido relaciones de confianza con clientes y aseguradoras, con un servicio humano, cercano y eficiente. Nuestra filosofía es simple: no hacemos clientes, hacemos amigos.",
    },
    media: {
      background: null,
      foreground: {
        type: "image",
        src: "/assets/images/kautela/about-story.png",
        alt: "Equipo de asesores de Kautela en oficina de Ibarra",
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
    id: "about-mission-vision",
    enabled: true,
    component: "Comparison",
    variant: "split",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "image",
    },
    content: {
      eyebrow: "Propósito",
      title: "Misión y visión",
      description:
        "Estos son los principios que guían cada decisión y cada asesoría que brindamos.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/kautela/mission-vision-bg.png",
        alt: "Asesores de Kautela revisando documentos de pólizas",
      },
      foreground: null,
    },
    items: [
      {
        eyebrow: "Asesoría integral con servicio humano",
        title: "Misión",
        description:
          "Brindar asesoría integral en seguros y administración de riesgos, generando soluciones innovadoras, confiables y personalizadas, con un servicio humano y eficiente que resguarde el patrimonio y bienestar de nuestros clientes.",
      },
      {
        eyebrow: "Liderazgo con compromiso social",
        title: "Visión",
        description:
          "Ser la firma de asesoría de seguros líder en Ecuador, reconocida por su excelencia operativa, capacidad de innovación y compromiso social, fortaleciendo alianzas de largo plazo con aseguradoras y clientes.",
      },
    ],
    actions: [],
    meta: { overlay: true, overlayOpacity: 0.05 },
  },

  {
    id: "about-values",
    enabled: true,
    component: "Features",
    variant: "icon-list",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Valores",
      title: "Principios que respaldan cada asesoría",
      description:
        "Kautela trabaja con valores orientados a la confianza, la integridad y el bienestar de cada cliente.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        icon: "ShieldCheck",
        title: "Responsabilidad",
        description:
          "Cumplimos con cada compromiso adquirido con nuestros clientes y aseguradoras.",
      },
      {
        icon: "Handshake",
        title: "Confianza",
        description:
          "Construimos relaciones de largo plazo basadas en la transparencia.",
      },
      {
        icon: "BadgeCheck",
        title: "Integridad",
        description: "Actuamos con ética en cada asesoría que brindamos.",
      },
      {
        icon: "Zap",
        title: "Amor",
        description:
          "Tratamos a cada cliente con calidez y atención genuina.",
      },
      {
        icon: "Lightbulb",
        title: "Innovación",
        description:
          "Buscamos soluciones creativas y actualizadas para cada necesidad.",
      },
      {
        icon: "Gauge",
        title: "Resultados",
        description:
          "Medimos nuestro trabajo por el beneficio real que aporta al cliente.",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "about-strengths",
    enabled: true,
    component: "Services",
    variant: "grid-3",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "image",
    },
    content: {
      eyebrow: "Fortalezas corporativas",
      title: "Por qué confiar en Kautela",
      description:
        "Una trayectoria construida sobre experiencia, respaldo técnico y compromiso con cada cliente.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/kautela/strengths-bg.png",
        alt: "Fortalezas corporativas de Kautela",
      },
      foreground: null,
    },
    items: [
      {
        icon: "BadgeCheck",
        title: "Trayectoria desde 2014",
        description:
          "Más de 10 años de experiencia en asesoría de seguros en Ecuador.",
      },
      {
        icon: "ShieldCheck",
        title: "Cobertura nacional e internacional",
        description:
          "Atención en 17 ciudades distribuidas en 3 zonas del país y varios países de América Latina.",
      },
      {
        icon: "Handshake",
        title: "Alianzas estratégicas",
        description:
          "Convenios con aseguradoras nacionales e internacionales y fondos de inversión.",
      },
      {
        icon: "Gauge",
        title: "Equipo técnico especializado",
        description:
          "Asesores capacitados en los distintos ramos de seguros que ofrecemos.",
      },
      {
        icon: "Wrench",
        title: "Acompañamiento en reclamos",
        description:
          "Gestionamos el proceso de reclamos junto al cliente hasta su resolución.",
      },
      {
        icon: "Shield",
        title: "Experiencia en sector público y privado",
        description:
          "Hemos asesorado a entidades públicas y empresas privadas en distintos sectores.",
      },
    ],
    actions: [],
    meta: {
      overlay: true,
      overlayOpacity: 0.05,
    },
  },

  {
    id: "about-infrastructure",
    enabled: true,
    component: "DualContent",
    variant: "default",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "gradient",
      variant: "dark",
    },
    content: {
      eyebrow: "Infraestructura y tecnología",
      title: "Respaldo técnico para una asesoría eficiente",
      description:
        "Contamos con oficinas propias y herramientas tecnológicas que agilizan la gestión de pólizas y reclamos.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/kautela/infrastructure-bg.png",
        alt: "Infraestructura y tecnología de Kautela",
      },
      foreground: null,
    },
    items: [
      {
        title: "Oficinas propias",
        description:
          "Matriz en Ibarra con atención presencial para clientes de la zona norte del país.",
        href: "/contact",

        image: {
          src: "/assets/images/kautela/infrastructure-office.jpg",
          alt: "Oficina matriz de Kautela en Ibarra",
          ratio: "portrait",
          fit: "cover",
          radius: "lg",
          objectPosition: "center center",
          className: "h-[18rem] lg:h-[26rem]",
          sizes: "(min-width: 1024px) 50vw, 100vw",
          overlay: false,
        },

        features: [
          "Atención presencial y remota",
          "Personal capacitado en cada ramo",
          "Cobertura desde la matriz en Ibarra",
        ],
      },

      {
        title: "Sistema tecnológico de gestión",
        description:
          "Herramientas digitales para el seguimiento de pólizas, cotizaciones y reclamos de cada cliente.",
        href: "/contact",

        image: {
          src: "/assets/images/kautela/infrastructure-tech.jpg",
          alt: "Plataforma tecnológica de gestión de pólizas de Kautela",
          ratio: "portrait",
          fit: "cover",
          radius: "lg",
          objectPosition: "center center",
          className: "h-[18rem] lg:h-[26rem]",
          sizes: "(min-width: 1024px) 50vw, 100vw",
          overlay: false,
        },

        features: [
          "Seguimiento de pólizas y vencimientos",
          "Gestión digital de reclamos",
          "Comunicación directa con el cliente",
        ],
      },
    ],

    actions: [
      {
        label: "Contactar a un asesor",
        href: "/contact",
        variant: "secondary",
      },
    ],

    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "about-team",
    enabled: true,
    component: "Team",
    variant: "member-grid",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Nuestro equipo",
      title: "Las personas detrás de cada asesoría",
      description:
        "Un equipo comprometido con la protección y bienestar de cada cliente.",
    },
    media: { background: null, foreground: null },
    items: [
      {
        name: "CPA. Paulina Figueroa",
        role: "CEO & Gerente General",
        phone: "0992559126",
        email: "gerencia@kautelaseguro.com",
        image: {
          src: "/assets/images/team/paulina-figueroa.jpg",
          alt: "CPA. Paulina Figueroa — CEO & Gerente General de Kautela",
        },
      },
      {
        name: "ABG. Samantha Gaona",
        role: "Asesor de Seguros",
        phone: "0978717176",
        email: "asesor@kautelaseguro.com",
        image: {
          src: "/assets/images/team/samantha-gaona.jpg",
          alt: "ABG. Samantha Gaona — Asesor de Seguros en Kautela",
        },
      },
      {
        name: "TGL. Fabricio Yépez",
        role: "Gerente de Siniestros",
        phone: "0992753560",
        email: "gerencia@kautelaseguro.com",
        image: {
          src: "/assets/images/team/fabricio-yepez.jpg",
          alt: "TGL. Fabricio Yépez — Gerente de Siniestros en Kautela",
        },
      },
    ],
    actions: [],
    meta: { overlay: false, overlayOpacity: 0.5 },
  },

  {
    id: "about-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote: "No hacemos clientes, hacemos amigos.",
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
    id: "about-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "image",
    },
    content: {
      eyebrow: "Hablemos de tu seguro",
      title: "Conversemos sobre cómo proteger tu patrimonio",
      description:
        "Te asesoramos para encontrar la cobertura adecuada a tu necesidad, en el ramo que corresponda.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/cta/cta-about-bg.png",
        alt: "Asesor de Kautela conversando con un cliente",
      },
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Ver ramos de seguros",
        href: "/services",
        variant: "primary",
      },
      {
        label: "Contactar ahora",
        href: "/contact",
        variant: "secondary",
      },
    ],
    meta: {
      overlay: true,
      overlayOpacity: 0.18,
    },
  },
];
