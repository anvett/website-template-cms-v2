export const termsAndConditionsSectionsData = [
  {
    id: "terms-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Términos y condiciones",
      title: "Condiciones generales de uso",
      description:
        "Consulta las condiciones relacionadas con el uso del sitio web y los servicios de asesoría de seguros ofrecidos por Kautela.",
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
    id: "terms-content",
    enabled: true,
    component: "Legal",
    variant: "content-list",
    surface: "base",
    containerWidth: "content",
    spacing: "default",
    background: {
      type: "surface",
      variant: null,
    },
    content: {
      eyebrow: "Condiciones",
      title: "Información general sobre nuestros servicios",
      description:
        "El contenido publicado en este sitio tiene fines informativos y comerciales. Las coberturas, condiciones, requisitos y vigencias de las pólizas dependen de cada aseguradora y deberán confirmarse al momento de la cotización o contratación.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Uso del sitio web",
        description:
          "El usuario se compromete a utilizar la información del sitio de forma responsable y con fines relacionados con la consulta de los servicios de asesoría de Kautela.",
      },
      {
        title: "Naturaleza del servicio",
        description:
          "Kautela actúa como agencia asesora productora de seguros, intermediando entre el cliente y las aseguradoras para recomendar la cobertura más adecuada.",
      },
      {
        title: "Información de coberturas",
        description:
          "Las coberturas, beneficios y condiciones mostradas en este sitio son referenciales y están sujetas a las condiciones particulares de cada póliza y aseguradora.",
      },
      {
        title: "Cotizaciones",
        description:
          "Toda cotización deberá ser confirmada por los canales oficiales de atención antes de considerarse definitiva.",
      },
      {
        title: "Gestión de siniestros",
        description:
          "El acompañamiento en la gestión de siniestros se realiza conforme a los procedimientos y plazos establecidos por cada aseguradora.",
      },
      {
        title: "Actualización de condiciones",
        description:
          "Kautela podrá actualizar esta información conforme cambien sus servicios, procesos o condiciones comerciales.",
      },
    ],
    actions: [],
    meta: {
      overlay: false,
      overlayOpacity: 0.5,
    },
  },

  {
    id: "terms-contact",
    enabled: true,
    component: "Contact",
    variant: "info-only",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    background: {
      type: "gradient",
      variant: "soft",
    },
    content: {
      eyebrow: "Consultas",
      title: "¿Necesitas aclarar alguna condición?",
      description:
        "Puedes comunicarte con Kautela para confirmar información sobre ramos de seguros, coberturas o condiciones de atención.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Ramos de seguros",
        description:
          "Consulta condiciones, coberturas y requisitos vigentes para cada ramo.",
      },
      {
        title: "Siniestros",
        description:
          "Solicita aclaración sobre el proceso de gestión y seguimiento de reclamos.",
      },
    ],
    actions: [
      {
        label: "Ir a contacto",
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
