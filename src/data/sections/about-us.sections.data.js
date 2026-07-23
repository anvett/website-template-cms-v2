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
      title: "Instamatic Ecuador",
      description:
        "Más de 20 años brindando calefones a gas eficientes, seguros y duraderos para hogares y negocios en Ecuador.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Ver servicios",
        href: "/services",
        variant: "primary",
      },
      {
        label: "Contactar",
        href: "/contact",
        variant: "secondary",
      },
    ],
    meta: {},
  },

  {
    id: "about-story",
    enabled: true,
    component: "About",
    variant: "image-right", //stacked-centered
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Nuestra historia",
      title: "Una marca creada para las necesidades reales del país",
      description:
        "Instamatic nace con el objetivo de ofrecer soluciones confiables y eficientes en calefones a gas para los hogares ecuatorianos. Desde sus inicios, la marca se enfocó en desarrollar equipos adaptados a condiciones como baja presión de agua, durabilidad en el uso diario y seguridad en el funcionamiento.",
    },
    media: {
      background: null,
      foreground: {
        type: "image",
        src: "assets/images/instamatic/about-story.jpg",
        alt: "Historia de Instamatic Ecuador",
      },
    },
    items: [],
    actions: [],
    meta: {},
  },

  {
    id: "about-mission-vision",
    enabled: true,
    component: "Comparison",
    variant: "split",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Propósito",
      title: "Misión y visión",
      description:
        "Nuestro compromiso es brindar soluciones eficientes, seguras y confiables para hogares y negocios ecuatorianos.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/about-comparison-bg.jpg",
        alt: "Instamatic Ecuador",
      },
      foreground: null,
    },
    items: [
      {
        eyebrow: "Comprometidos con soluciones confiables",
        title: "Misión",
        description:
          "Brindar soluciones eficientes en calefones a gas, ofreciendo equipos de alta calidad que garanticen agua caliente de forma segura, confiable y accesible para los hogares y negocios ecuatorianos.",
      },
      {
        eyebrow: "Construyendo el futuro del confort",
        title: "Visión",
        description:
          "Ser la marca líder en calefones a gas en Ecuador y una de las más reconocidas en la región, destacando por innovación, durabilidad y confianza.",
      },
    ],
    actions: [],
    meta: { overlay: true, overlayOpacity: 0.75 },
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
      title: "Principios que respaldan cada solución",
      description:
        "Instamatic trabaja con valores orientados a la calidad, confianza, innovación, seguridad y compromiso.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        icon: "ShieldCheck",
        title: "Calidad",
        description:
          "Nos comprometemos a ofrecer equipos duraderos y de alto rendimiento.",
      },
      {
        icon: "BadgeCheck",
        title: "Confianza",
        description:
          "Miles de testes respaldan nuestra trayectoria de más de 20 años en el mercado.",
      },
      {
        icon: "Lightbulb",
        title: "Innovación",
        description:
          "Mejoramos continuamente nuestros productos para adaptarnos a las necesidades actuales.",
      },
      {
        icon: "Shield",
        title: "Seguridad",
        description:
          "Diseñamos calefones que cumplen con altos estándares de funcionamiento seguro.",
      },
      {
        icon: "Handshake",
        title: "Compromiso",
        description:
          "Trabajamos para brindar soluciones reales que mejoren la comodidad en cada hogar.",
      },
      {
        icon: "Wrench",
        title: "Respaldo técnico",
        description:
          "Contamos con experiencia y soporte especializado para acompañar cada instalación y mantenimiento.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "about-stats",
    enabled: true,
    component: "Stats",
    variant: "split-highlight", //3-items
    surface: "strong",
    containerWidth: "section",
    spacing: "compact",
    content: {
      eyebrow: "Trayectoria",
      title: "Una marca con respaldo",
      description:
        "Instamatic se ha consolidado como una de las opciones preferidas por usuarios, técnicos e instaladores.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        value: "+20",
        label: "años en Ecuador",
        description: "Trayectoria en el mercado nacional",
      },
      {
        value: "Miles",
        label: "de familias",
        description: "Confían en calefones Instamatic",
      },
      {
        value: "4",
        label: "líneas de servicio",
        description: "Soluciones técnicas principales",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "about-testimonials",
    enabled: true,
    component: "Testimonials",
    variant: "slider",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Confianza",
      title: "Una marca recomendada por su rendimiento",
      description:
        "Instamatic es una opción reconocida por familias, negocios, técnicos e instaladores en Ecuador.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/testimonials-bg.jpg",
        alt: "testes Instamatic Ecuador",
      },
      foreground: null,
    },
    items: [
      {
        image: "/assets/images/instamatic/testimonials/test1.jpg",
        name: "teste residencial",
        title: "Hogar en Quito",
        message:
          "Elegimos Instamatic por su buen rendimiento y porque funciona muy bien incluso con baja presión de agua.",
      },
      {
        image: "/assets/images/instamatic/testimonials/test2.jpg",
        name: "teste comercial",
        title: "Negocio local",
        message:
          "El calefón ha respondido bien al uso diario y el respaldo técnico nos dio mucha confianza.",
      },
      {
        image: "/assets/images/instamatic/testimonials/test3.jpg",
        name: "Técnico instalador",
        title: "Especialista en calefones",
        message:
          "Instamatic es una marca recomendada por su resistencia, facilidad de instalación y disponibilidad de repuestos.",
      },
    ],
    actions: [],
    meta: {},
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
      quote:
        "Agua caliente segura, eficiente y confiable para cada hogar ecuatoriano.",
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
    id: "about-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image", //background-image | centered
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Soluciones Instamatic",
      title: "Conoce nuestros productos y servicios",
      description:
        "Encuentra calefones, combos, instalación, mantenimiento y soluciones complementarias para tu hogar o negocio.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/cta-about-bg.jpg",
        alt: "testes Instamatic Ecuador",
      },
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Ver servicios",
        href: "/services",
        variant: "primary",
      },
      {
        label: "Ver productos",
        href: "/products",
        variant: "secondary",
      },
    ],
    meta: {},
  },
];
