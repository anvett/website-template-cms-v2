export const homeSectionsData = [
  {
    id: "home-hero",
    enabled: true,
    component: "Hero",
    variant: "background-image",
    surface: "base",
    containerWidth: "wide",
    spacing: "hero",
    background: {
      type: "image",
      variant: null,
    },
    content: {
      eyebrow: "Asesoría en seguros desde 2014",
      title: "Kautela. Confianza Asegurada. Protección Garantizada.",
      description:
        "Asesoría integral en seguros y administración de riesgos, con cobertura nacional y soluciones personalizadas para personas y empresas en Ecuador.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/hero/home-hero-bg.png",
        alt: "Asesor de Kautela explicando una póliza de seguros a un cliente",
      },
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
        variant: "primary",
      },
    ],
    meta: {
      align: "right",
      overlay: true,
      overlayOpacity: 0.05,
    },
  },

  {
    id: "home-about",
    enabled: true,
    component: "About",
    variant: "stacked-centered",
    surface: "subtle",
    containerWidth: "content",
    spacing: "default",
    background: {
      type: "gradient",
      variant: "soft",
    },
    content: {
      eyebrow: "Sobre Kautela",
      title: "No hacemos clientes, hacemos amigos",
      description:
        "Kautela es una agencia asesora productora de seguros constituida en Ibarra en 2014. Brindamos asesoría integral en seguros y administración de riesgos, generando soluciones innovadoras, confiables y personalizadas, con un servicio humano y eficiente que resguarda el patrimonio y bienestar de nuestros clientes.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Conocer más",
        href: "/about-us",
        variant: "primary",
      },
    ],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "home-services-preview",
    enabled: true,
    component: "Services",
    variant: "grid-4",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "image",
      variant: "dark-overlay",
    },
    content: {
      eyebrow: "Ramos de seguros",
      title: "Asesoría especializada en 6 ramos de seguros",
      description:
        "Te acompañamos en la elección, contratación y gestión de la póliza adecuada para cada necesidad.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/kautela/services-bg.png",
        alt: "Ramos de seguros que asesora Kautela",
      },
      foreground: null,
    },
    items: [
      {
        title: "Vehicular",
        description:
          "Cobertura ante accidentes, robo y daños a terceros para tu vehículo.",
        href: "/services/vehicular",
      },
      {
        title: "Vida",
        description:
          "Protección financiera para tus beneficiarios ante un fallecimiento o invalidez.",
        href: "/services/vida",
      },
      {
        title: "Salud",
        description:
          "Cobertura de gastos médicos, hospitalización y consultas para ti y tu familia.",
        href: "/services/salud",
      },
      {
        title: "Hogar",
        description:
          "Protección de tu vivienda y patrimonio familiar ante imprevistos.",
        href: "/services/hogar",
      },
      {
        title: "Viajes",
        description:
          "Asistencia médica en el extranjero y cobertura de equipaje en cada viaje.",
        href: "/services/viajes",
      },
      {
        title: "Empresarial",
        description:
          "Cobertura de activos y operaciones para empresas y consorcios.",
        href: "/services/empresarial",
      },
    ],
    actions: [
      {
        label: "Ver todos los ramos",
        href: "/services",
        variant: "primary",
      },
    ],
    meta: { overlay: true, overlayOpacity: 0.05 },
  },

  {
    id: "home-values-preview",
    enabled: true,
    component: "Features",
    variant: "two-columns",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Nuestros valores",
      title: "Lo que nos guía en cada asesoría",
      description:
        "Estos valores definen la forma en la que trabajamos con cada cliente y aseguradora.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Responsabilidad",
        description:
          "Cumplimos con cada compromiso adquirido con nuestros clientes y aseguradoras.",
        icon: "ShieldCheck",
      },
      {
        title: "Confianza",
        description:
          "Construimos relaciones de largo plazo basadas en la transparencia.",
        icon: "Handshake",
      },
      {
        title: "Integridad",
        description: "Actuamos con ética en cada asesoría que brindamos.",
        icon: "BadgeCheck",
      },
      {
        title: "Amor",
        description: "Tratamos a cada cliente con calidez y atención genuina.",
        icon: "Zap",
      },
      {
        title: "Innovación",
        description:
          "Buscamos soluciones creativas y actualizadas para cada necesidad.",
        icon: "Lightbulb",
      },
      {
        title: "Resultados",
        description:
          "Medimos nuestro trabajo por el beneficio real que aporta al cliente.",
        icon: "Gauge",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "home-stats",
    enabled: true,
    component: "Stats",
    variant: "3-items",
    surface: "strong",
    containerWidth: "section",
    spacing: "compact",
    content: {
      eyebrow: "Cobertura nacional",
      title: "Respaldo y presencia en todo el Ecuador",
      description:
        "Atendemos clientes en los principales distritos del país desde nuestra matriz en Ibarra.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        value: "17",
        label: "ciudades atendidas",
        description: "Distribuidas en 3 zonas del país",
      },
      {
        value: "7",
        label: "ramos de seguros",
        description: "Asesoría especializada en cada uno",
      },
      {
        value: "+10",
        label: "años de trayectoria",
        description: "Constituida en Ibarra desde 2014",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "home-partners",
    enabled: true,
    component: "Partners",
    variant: "logo-grid",
    surface: "base",
    containerWidth: "wide",
    spacing: "compact",
    content: {
      eyebrow: "Nuestras alianzas",
      title: "Trabajamos con las principales aseguradoras del país",
    },
    media: { background: null, foreground: null },
    items: [
      { name: "BMI Igualas Médicas", logo: { src: "/assets/images/partners/bmi.png", alt: "BMI Igualas Médicas" } },
      { name: "Sweaden", logo: { src: "/assets/images/partners/sweaden.png", alt: "Sweaden Compañía de Seguros" } },
      { name: "Aseguradora del Sur", logo: { src: "/assets/images/partners/aseguradora-del-sur.png", alt: "Aseguradora del Sur" } },
      { name: "Seguros Alianza", logo: { src: "/assets/images/partners/seguros-alianza.png", alt: "Seguros Alianza" } },
      { name: "Humana", logo: { src: "/assets/images/partners/humana.png", alt: "Humana" } },
      { name: "Confiamed", logo: { src: "/assets/images/partners/confiamed.png", alt: "Confiamed" } },
      { name: "Interoceanica", logo: { src: "/assets/images/partners/interoceanica.png", alt: "Interoceanica Compañía Anónima de Seguros" } },
      { name: "Zurich", logo: { src: "/assets/images/partners/zurich.png", alt: "Zurich Seguros" } },
      { name: "Bupa Seguros", logo: { src: "/assets/images/partners/bupa.png", alt: "Bupa Seguros" } },
    ],
    actions: [],
    meta: { overlay: false, overlayOpacity: 0.5 },
  },

  {
    id: "home-cta",
    enabled: true,
    component: "CTA",
    variant: "centered",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "image",
    },
    content: {
      eyebrow: "Cotiza con nosotros",
      title: "Encuentra el seguro ideal para ti, tu familia o tu empresa",
      description:
        "Te asesoramos para elegir la cobertura adecuada según tu necesidad y presupuesto.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/cta/cta-home-bg.png",
        alt: "Asesoría personalizada en seguros con Kautela",
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
        label: "Ver ramos de seguros",
        href: "/services",
        variant: "secondary",
      },
    ],
    meta: {
      overlay: true,
      overlayOpacity: 0.08,
    },
  },
];
