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
      title: "Resuelve tus dudas sobre nuestros seguros",
      description:
        "Encuentra respuestas sobre los ramos de seguros, cotizaciones, contratación y atención de siniestros.",
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
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
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
        "Información útil para ayudarte a elegir, contratar y dar seguimiento a tu seguro con Kautela.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/kautela/faq-bg.jpg",
        alt: "Preguntas frecuentes Kautela",
      },
      foreground: null,
    },
    items: [
      {
        category: "Sobre Kautela",
        questions: [
          {
            question: "¿Qué es Kautela?",
            answer:
              "Kautela es una agencia asesora productora de seguros con sede en Ibarra, que brinda asesoría especializada en distintos ramos de seguros a nivel nacional e internacional.",
          },
          {
            question: "¿En qué ciudades tienen cobertura?",
            answer:
              "Brindamos atención y asesoría en 17 ciudades del país, con oficinas en Ibarra.",
          },
          {
            question: "¿Trabajan con una sola aseguradora?",
            answer:
              "Como agencia asesora productora de seguros, comparamos opciones entre distintas aseguradoras para recomendar la cobertura más conveniente para cada cliente.",
          },
        ],
      },
      {
        category: "Ramos de seguros",
        questions: [
          {
            question: "¿Qué ramos de seguros maneja Kautela?",
            answer:
              "Trabajamos con 28 productos de seguros, desde vehículos, vida y salud, hasta coberturas empresariales, hogar, viajes y riesgos especializados.",
          },
          {
            question: "¿Puedo contratar más de un ramo?",
            answer:
              "Sí. Podemos asesorarte para combinar distintos ramos según tus necesidades personales, familiares o empresariales.",
          },
        ],
      },
      {
        category: "Cotización y contratación",
        questions: [
          {
            question: "¿Cómo solicito una cotización?",
            answer:
              "Puedes comunicarte desde la página de contacto indicando el ramo de tu interés para recibir orientación personalizada.",
          },
          {
            question: "¿La asesoría tiene algún costo?",
            answer:
              "La asesoría inicial para orientarte sobre el seguro más adecuado no tiene costo.",
          },
        ],
      },
      {
        category: "Siniestros",
        questions: [
          {
            question: "¿Qué hago si tengo un siniestro?",
            answer:
              "Puedes comunicarte directamente a nuestra línea de siniestros para recibir acompañamiento durante todo el proceso de gestión.",
          },
          {
            question: "¿Kautela me acompaña durante el proceso?",
            answer:
              "Sí. Te acompañamos en la gestión y seguimiento de tu reclamo ante la aseguradora correspondiente.",
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
        "Elegir bien tu cobertura hoy te evita preocupaciones financieras mañana.",
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
    id: "faq-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Asesoría Kautela",
      title: "Conversemos sobre tu necesidad",
      description:
        "Te orientamos para elegir el ramo de seguro más adecuado para ti, tu familia o tu empresa.",
    },
    background: {
      type: "image",
      src: "/assets/images/cta/cta-faq-bg.png",
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
];
