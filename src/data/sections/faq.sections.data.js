export const faqSectionsData = [
  {
    id: "faq-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Preguntas frecuentes",
      title: "Resuelve tus dudas sobre Instamatic",
      description:
        "Encuentra respuestas sobre calefones, instalación, mantenimiento, garantías, productos y servicios técnicos.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Contactar",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {},
  },

  {
    id: "faq-general",
    enabled: true,
    component: "FAQ",
    variant: "categorized-faq",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "gradient",
      variant: "soft",
    },
    content: {
      eyebrow: "FAQ",
      title: "Preguntas frecuentes",
      description:
        "Información útil para ayudarte a elegir, instalar y mantener tu calefón Instamatic.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/faq-bg.jpg",
        alt: "Preguntas frecuentes Instamatic",
      },
      foreground: null,
    },
    items: [
      {
        category: "Productos",
        questions: [
          {
            question:
              "¿Qué capacidad tienen los calefones Instamatic destacados?",
            answer:
              "Los modelos principales son calefones Instamatic de 26 litros, ideales para hasta 2 duchas simultáneas, según las condiciones de instalación.",
          },
          {
            question:
              "¿Cuál es la diferencia entre el modelo clásico y el reforzado?",
            answer:
              "El modelo clásico está orientado al uso doméstico, mientras que el reforzado cuenta con mayor resistencia interna y se recomienda para alto uso, negocios o hidromasajes.",
          },
          {
            question: "¿Los calefones tienen garantía?",
            answer:
              "Sí. El modelo clásico cuenta con garantía de 2 años y el modelo reforzado con garantía de 3 años.",
          },
        ],
      },
      {
        category: "Instalación",
        questions: [
          {
            question: "¿Realizan instalación en Quito y Valles?",
            answer:
              "Sí. La instalación está disponible para hogares y negocios en Quito y Valles.",
          },
          {
            question: "¿Qué incluye la instalación básica?",
            answer:
              "Incluye la instalación profesional del calefón, verificación del punto de instalación y pruebas finales de funcionamiento.",
          },
          {
            question: "¿Los equipos funcionan con baja presión de agua?",
            answer:
              "Instamatic se destaca por ofrecer equipos y soluciones adaptadas a hogares con baja presión de agua.",
          },
        ],
      },
      {
        category: "Servicio técnico",
        questions: [
          {
            question: "¿Qué fallas pueden revisar?",
            answer:
              "Se pueden revisar problemas de encendido, baja temperatura, fugas internas, fallos en componentes y bajo rendimiento del equipo.",
          },
          {
            question: "¿El mantenimiento ayuda a prolongar la vida útil?",
            answer:
              "Sí. El mantenimiento preventivo ayuda a evitar daños mayores, mejorar el rendimiento y prolongar la vida útil del calefón.",
          },
          {
            question: "¿Tienen repuestos disponibles?",
            answer:
              "Instamatic cuenta con respaldo y disponibilidad de repuestos para mantenimiento y reparación según el caso.",
          },
        ],
      },
      {
        category: "Cotización y contacto",
        questions: [
          {
            question: "¿Cómo puedo solicitar una cotización?",
            answer:
              "Puedes comunicarte desde la página de contacto indicando si necesitas un producto, instalación, mantenimiento, bomba de agua o gas centralizado.",
          },
          {
            question: "¿Me pueden asesorar antes de comprar?",
            answer:
              "Sí. Puedes solicitar orientación para elegir el calefón, combo o servicio adecuado según tu necesidad, presión de agua y tipo de instalación.",
          },
        ],
      },
    ],
    actions: [],
    meta: { overlay: true, overlayOpacity: 0.7 },
  },

  {
    id: "faq-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Elegir bien el equipo y mantenerlo correctamente ayuda a mejorar seguridad, rendimiento y vida útil.",
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
    id: "faq-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Asesoría Instamatic",
      title: "Conversemos sobre tu necesidad",
      description:
        "Te orientamos para elegir el calefón, combo o servicio más adecuado para tu hogar o negocio.",
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
      {
        label: "Ver productos",
        href: "/products",
        variant: "secondary",
      },
    ],
    meta: {},
  },
];
