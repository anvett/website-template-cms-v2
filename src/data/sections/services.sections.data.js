export const servicesSectionsData = [
  {
    id: "services-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    background: {
      type: "image",
      src: "/assets/images/hero/hero-services-bg.png",
      alt: "Asesoría en ramos de seguros Kautela",
    },
    content: {
      eyebrow: "Ramos de seguros",
      title: "Asesoría especializada en seguros",
      description:
        "Te acompañamos en la elección, contratación y gestión de la póliza adecuada en cada uno de nuestros 7 ramos de seguros.",
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
    ],
    meta: {
      overlay: true,
      overlayOpacity: 0.05,
    },
  },

  {
    id: "services-overview",
    enabled: true,
    component: "About",
    variant: "stacked-centered",
    surface: "base",
    containerWidth: "content",
    spacing: "default",
    content: {
      eyebrow: "Soluciones personalizadas",
      title: "Cobertura adecuada para cada necesidad",
      description:
        "Nuestra asesoría está orientada a identificar el riesgo, comparar opciones entre aseguradoras y recomendar la póliza que mejor protege tu patrimonio, tu salud o tu negocio.",
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
    id: "services-grid",
    enabled: true,
    component: "Services",
    variant: "services-detail-cards",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Ramos principales",
      title: "Elige el ramo que necesitas",
      description:
        "Contamos con asesoría especializada en los siguientes ramos de seguros.",
    },
    background: {
      type: "image",
      src: "/assets/images/kautela/services-grid-bg.jpg",
      alt: "Ramos de seguros Kautela",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Seguro de Vehículos",
        details: [
          "Cobertura ante daños, robo y colisión",
          "Asistencia vial y grúa las 24 horas",
          "Responsabilidad civil frente a terceros",
        ],
        href: "/services/vehicular",
      },
      {
        title: "Seguro de Vida Individual y Colectiva",
        details: [
          "Protección económica para tus beneficiarios",
          "Planes individuales y para empresas",
          "Cobertura por muerte natural o accidental",
        ],
        href: "/services/vida",
      },
      {
        title: "Seguro de Asistencia Médica",
        details: [
          "Cobertura hospitalaria y ambulatoria",
          "Red de clínicas y médicos afiliados",
          "Planes individuales, familiares y corporativos",
        ],
        href: "/services/salud",
      },
      {
        title: "Seguro Multiriesgo Hogar",
        details: [
          "Protección ante incendio, robo y daños",
          "Cobertura de contenidos y edificación",
          "Responsabilidad civil familiar incluida",
        ],
        href: "/services/hogar",
      },
      {
        title: "Seguro de Viajes",
        details: [
          "Asistencia médica en el exterior",
          "Cobertura por pérdida de equipaje",
          "Amparo por cancelación y demora de vuelos",
        ],
        href: "/services/viajes",
      },
      {
        title: "Seguro Empresarial",
        details: [
          "Protección integral de activos del negocio",
          "Cobertura ante incendio, robo y responsabilidad civil",
          "Planes a la medida de cada industria",
        ],
        href: "/services/empresarial",
      },
      {
        title: "Seguro de Equipo y Maquinaria",
        details: [
          "Cobertura ante daños y rotura",
          "Protección de maquinaria fija y móvil",
          "Amparo por robo y actos malintencionados",
        ],
      },
      {
        title: "Seguros de Accidentes Personales",
        details: [
          "Indemnización por incapacidad o muerte accidental",
          "Cobertura de gastos médicos por accidente",
          "Planes individuales y colectivos",
        ],
      },
      {
        title: "Seguro Bancos e Instituciones Financieras (BBB)",
        details: [
          "Cobertura ante infidelidad de empleados",
          "Protección ante fraude y falsificación",
          "Amparo de valores dentro y fuera de bóveda",
        ],
      },
      {
        title: "Seguro Multiriesgo Industrial",
        details: [
          "Protección integral de plantas industriales",
          "Cobertura de maquinaria, edificios e inventario",
          "Amparo ante incendio, explosión y rotura",
        ],
      },
      {
        title: "Seguro Multiriesgo Comercial",
        details: [
          "Cobertura de locales y mercadería",
          "Protección ante incendio, robo y rotura de vidrios",
          "Amparo de equipos e instalaciones",
        ],
      },
      {
        title: "Seguro de Incendio y Líneas Aliadas",
        details: [
          "Cobertura ante incendio y explosión",
          "Amparo por daños de la naturaleza",
          "Protección de edificaciones y contenidos",
        ],
      },
      {
        title:
          "Seguro de Lucro Cesante a consecuencia de incendio y líneas aliadas",
        details: [
          "Cobertura de ingresos no percibidos",
          "Amparo de gastos fijos tras el siniestro",
          "Complementa la póliza de incendio",
        ],
      },
      {
        title: "Seguro Equipo Electrónico",
        details: [
          "Protección de equipos de cómputo y oficina",
          "Cobertura ante daños eléctricos y sobrevoltaje",
          "Amparo por robo y manipulación indebida",
        ],
      },
      {
        title: "Seguro de Transporte",
        details: [
          "Cobertura de mercadería en tránsito",
          "Protección terrestre, marítima y aérea",
          "Amparo ante robo, colisión y volcamiento",
        ],
      },
      {
        title: "Seguro de Aviación",
        details: [
          "Cobertura de aeronaves y responsabilidad civil",
          "Protección ante accidentes en tierra y vuelo",
          "Amparo para tripulación y pasajeros",
        ],
      },
      {
        title: "Seguro de Robo",
        details: [
          "Cobertura ante robo y asalto",
          "Protección de bienes muebles y mercadería",
          "Amparo por daños ocurridos durante el hecho",
        ],
      },
      {
        title: "Seguro de Fidelidad",
        details: [
          "Cobertura ante deshonestidad de empleados",
          "Protección de dinero y valores de la empresa",
          "Amparo por apropiación indebida",
        ],
      },
      {
        title: "Seguro Dinero y Valores",
        details: [
          "Cobertura dentro y fuera de oficina",
          "Protección durante el transporte de valores",
          "Amparo ante robo, asalto y hurto",
        ],
      },
      {
        title: "Seguro de Responsabilidad Civil",
        details: [
          "Cobertura por daños causados a terceros",
          "Protección ante reclamos por lesiones o pérdidas",
          "Amparo de responsabilidad civil general y profesional",
        ],
      },
      {
        title: "Seguro Rotura de Maquinaria",
        details: [
          "Cobertura ante fallas mecánicas y eléctricas",
          "Protección de equipos en operación",
          "Amparo por errores de manejo u operación",
        ],
      },
      {
        title: "Pérdida de Beneficios por Rotura de Maquinaria",
        details: [
          "Cobertura de ingresos tras la avería",
          "Amparo de gastos fijos durante la reparación",
          "Complementa la póliza de rotura de maquinaria",
        ],
      },
      {
        title: "Seguro Marítimo",
        details: [
          "Cobertura de casco y mercadería transportada",
          "Protección ante naufragio y varamiento",
          "Amparo de responsabilidad civil naviera",
        ],
      },
      {
        title: "Seguro Agropecuario",
        details: [
          "Cobertura de cultivos y cosechas",
          "Protección ante plagas, sequía e inundación",
          "Amparo de ganado e infraestructura agrícola",
        ],
      },
      {
        title: "Seguro de Crédito",
        details: [
          "Cobertura ante impago de clientes",
          "Protección de cuentas por cobrar",
          "Amparo ante insolvencia comercial",
        ],
      },
      {
        title: "Seguro de Riesgos Especiales",
        details: [
          "Cobertura para riesgos de alta complejidad",
          "Protección a la medida del negocio",
          "Amparo diseñado con respaldo de reaseguro",
        ],
      },
      {
        title: "Seguro Todo Riesgo Para Contratista",
        details: [
          "Cobertura de la obra durante la construcción",
          "Protección ante daños materiales imprevistos",
          "Amparo de maquinaria y equipo de construcción",
        ],
      },
      {
        title: "Seguro Montaje de Maquinaria",
        details: [
          "Cobertura durante la instalación y pruebas",
          "Protección ante errores de montaje",
          "Amparo de equipos hasta su puesta en marcha",
        ],
      },
      {
        title: "Seguro Obras Civiles Terminadas",
        details: [
          "Cobertura de infraestructura ya finalizada",
          "Protección ante daños estructurales",
          "Amparo de responsabilidad civil post construcción",
        ],
      },
      {
        title: "Seguro Todo Riesgo Petrolero",
        details: [
          "Cobertura de operaciones de exploración y producción",
          "Protección ante daños a pozos e instalaciones",
          "Amparo de responsabilidad civil por contaminación",
        ],
      },
    ],
    actions: [],
    meta: {
      overlay: true,
      overlayOpacity: 0.15,
      whatsappNumber: "593992559126",
    },
  },

  {
    id: "services-process",
    enabled: true,
    component: "Features",
    variant: "process-steps",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Modelo de servicio",
      title: "Asesoría clara y ordenada en cada etapa",
      description:
        "Acompañamos al cliente con apoyo técnico, staff profesional y soporte administrativo y postventa.",
    },
    background: {
      type: "image",
      src: "/assets/images/kautela/services/process-bg.jpg",
      alt: "Modelo de servicio de Kautela",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/kautela/services/process-bg.jpg",
        alt: "Modelo de servicio de Kautela",
      },
      foreground: null,
    },
    items: [
      {
        title: "Evaluación de riesgos",
        description:
          "Identificamos la necesidad del cliente y el riesgo que se busca cubrir.",
      },
      {
        title: "Apoyo técnico especializado",
        description:
          "Comparamos opciones entre aseguradoras y recomendamos la cobertura más conveniente.",
      },
      {
        title: "Contratación y staff profesional",
        description:
          "Gestionamos la contratación de la póliza con un equipo capacitado en cada ramo.",
      },
      {
        title: "Apoyo administrativo y postventa",
        description:
          "Acompañamos el seguimiento de la póliza, renovaciones y gestión de reclamos.",
      },
    ],
    actions: [],
    meta: {
      overlay: true,
      overlayOpacity: 0.45,
    },
  },

  {
    id: "services-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Una buena asesoría no solo vende una póliza: identifica el riesgo real y acompaña al cliente hasta resolverlo.",
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
    id: "services-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Solicita asesoría",
      title: "Encuentra el seguro adecuado para tu necesidad",
      description:
        "Te orientamos para elegir la cobertura correcta entre nuestros 7 ramos de seguros.",
    },
    
    background: {
      type: "image",
      src: "/assets/images/cta/cta-services-bg.png",
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
      overlay: true,
      overlayOpacity: 0.05,
    },
  },
];
