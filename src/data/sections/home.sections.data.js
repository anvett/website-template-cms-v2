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
      eyebrow: "Más de 20 años llevando agua caliente a hogares ecuatorianos",
      title: "Instamatic Ecuador",
      description:
        "Venta, instalación y mantenimiento de calefones a gas con soluciones confiables para hogares y negocios en Quito y Valles.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/home-hero-bg.jpg",
        alt: "Fondo de calefones Instamatic Ecuador",
        overlay: true,
        overlayOpacity: 0.55
      },
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Solicitar cotización",
        href: "/contact",
        variant: "primary",
      },
      {
        label: "Ver servicios",
        href: "/services",
        variant: "primary",
      },
    ],
    meta: {
      align: "right",
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
      eyebrow: "Sobre Instamatic",
      title:
        "Más de 20 años brindando agua caliente a los hogares ecuatorianos",
      description:
        "Instamatic es una de las marcas más reconocidas de calefones a gas en Ecuador. Sus equipos se destacan por su rendimiento, resistencia, facilidad de uso y funcionamiento eficiente incluso en hogares con baja presión de agua.",
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
    meta: {},
  },

  {
    id: "home-services-preview",
    enabled: true,
    component: "Services",
    variant: "grid-4",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "image",
      variant: "dark-overlay",
    },
    content: {
      eyebrow: "Servicios",
      title: "Soluciones completas para agua caliente, presión y gas",
      description:
        "Contamos con servicios técnicos especializados para instalación, mantenimiento, sistemas de bombeo y gas centralizado.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/services-bg.jpg",
        alt: "Servicios técnicos Instamatic",
        overlay: true,
      },
      foreground: null,
    },
    items: [
      {
        title: "Instalación de calefones",
        description:
          "Instalación profesional de calefones a gas con verificación del punto, adaptación a baja presión y pruebas de funcionamiento.",
        href: "/services/installation",
      },
      {
        title: "Servicio técnico y mantenimiento",
        description:
          "Diagnóstico, reparación, limpieza profunda, revisión de piezas y mantenimiento preventivo o correctivo.",
        href: "/services/technical-service",
      },
      {
        title: "Sistemas de bombeo de agua",
        description:
          "Instalación y mantenimiento de bombas para mejorar la presión y garantizar un suministro eficiente.",
        href: "/services/water-pumps",
      },
      {
        title: "Gas centralizado",
        description:
          "Diseño, instalación y mantenimiento de sistemas de gas centralizado doméstico e industrial.",
        href: "/services/centralized-gas",
      },
    ],
    actions: [
      {
        label: "Ver todos los servicios",
        href: "/services",
        variant: "primary",
      },
    ],
    meta: {},
  },

  {
    id: "home-products-preview",
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
      eyebrow: "Productos",
      title: "Combos y calefones Instamatic 26L",
      description:
        "Opciones completas para instalar y usar, con equipos, accesorios y alternativas según la necesidad del hogar o negocio.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Combos Instamatic 26L",
        description:
          "Combos que pueden incluir calefón, instalación básica, kit de accesorios, cilindro de gas y protector metálico según la opción elegida.",
        href: "/products",

        image: {
          src: "/assets/images/instamatic/products-combo.jpg",
          alt: "Combos Instamatic 26L",
          ratio: "portrait",
          fit: "contain",
          radius: "none",
          objectPosition: "center center",
          className: "h-[18rem] lg:h-[26rem]",
          sizes: "(min-width: 1024px) 50vw, 100vw",
          overlay: false,
        },

        features: [
          "Desde $299",
          "Ideal para hasta 2 duchas",
          "Opciones con instalación incluida",
        ],
      },

      {
        title: "Calefones Instamatic",
        description:
          "Equipos clásicos y reforzados para uso doméstico, semi industrial o alto consumo, con encendido automático y estructura metálica.",
        href: "/products",

        image: {
          src: "/assets/images/instamatic/calefon2.png",
          alt: "Calefones Instamatic",
          ratio: "portrait",
          fit: "contain",
          radius: "none",
          objectPosition: "center center",
          className: "h-[18rem] lg:h-[26rem]",
          sizes: "(min-width: 1024px) 50vw, 100vw",
          overlay: false,
        },

        features: [
          "Instamatic 26L clásico",
          "Instamatic 26L reforzado",
          "Garantía según modelo",
        ],
      },
    ],

    actions: [
      {
        label: "Ver productos",
        href: "/products",
        variant: "secondary",
      },
    ],

    meta: {},
  },

  {
    id: "home-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Por qué elegir Instamatic",
      description:
        "La marca combina calidad, respaldo, innovación y disponibilidad de repuestos para ofrecer soluciones confiables.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Alto rendimiento",
        description:
          "Equipos diseñados para brindar agua caliente de forma rápida y eficiente.",
        icon: "Zap",
      },
      {
        title: "Funciona con baja presión",
        description:
          "Soluciones adaptadas a condiciones reales de muchos hogares ecuatorianos.",
        icon: "Gauge",
      },
      {
        title: "Repuestos disponibles",
        description:
          "Mayor respaldo para mantenimiento, reparación y vida útil del equipo.",
        icon: "Wrench",
      },
      {
        title: "Seguridad y confianza",
        description:
          "Marca reconocida por técnicos, instaladores y familias en Ecuador.",
        icon: "ShieldCheck",
      },
    ],
    actions: [],
    meta: {},
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
      eyebrow: "Trayectoria",
      title: "Respaldo que genera confianza",
      description:
        "Instamatic se ha consolidado como una de las marcas preferidas en calefones a gas en Ecuador.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        value: "+20",
        label: "años en el mercado",
        description: "Trayectoria en Ecuador",
      },
      {
        value: "26L",
        label: "capacidad destacada",
        description: "Ideal para hasta 2 duchas",
      },
      {
        value: "4",
        label: "servicios principales",
        description: "Instalación, mantenimiento, bombeo y gas",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "home-cta",
    enabled: true,
    component: "CTA",
    variant: "centered",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Cotiza con nosotros",
      title: "Encuentra el calefón o servicio ideal para tu hogar o negocio",
      description:
        "Te asesoramos para elegir la mejor solución según tu necesidad, presión de agua, espacio disponible y tipo de instalación.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/cta-home-bg.jpg",
        alt: "Asesoría para calefones Instamatic",
        overlay: true,
        
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
        label: "Ver productos",
        href: "/products",
        variant: "secondary",
      },
    ],
    meta: {
    overlay: true,
    overlayOpacity: 0.48,
  },
  },
];
