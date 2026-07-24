export const servicesSectionsData = [
  {
    id: "services-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Ramos de seguros",
      title: "Asesoría experta en cada ramo de seguros",
      description:
        "Conoce los 30 productos de seguros en los que te asesoramos, desde vehicular y salud hasta coberturas empresariales especializadas.",
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
    meta: {},
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
      eyebrow: "Ramos y coberturas",
      title: "Un portafolio completo de seguros para personas y empresas",
      description:
        "Te asesoramos en la elección de la póliza adecuada entre nuestros 30 productos de seguros, comparando coberturas de distintas aseguradoras para encontrar la opción que mejor se ajuste a tu necesidad y presupuesto.",
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
      whatsappNumber: "593978717176",
    },
  },

  {
    id: "services-process",
    enabled: true,
    component: "Features",
    variant: "process-steps", //two-columns
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Proceso",
      title: "Asesoría clara y ordenada en cada ramo",
      description:
        "Trabajamos con un proceso práctico para identificar tu necesidad, recomendar la cobertura adecuada y acompañarte durante la vigencia de tu póliza.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        title: "Evaluación inicial",
        description:
          "Revisamos tu necesidad, el bien o riesgo que quieres proteger y tu presupuesto disponible.",
      },
      {
        title: "Recomendación técnica",
        description:
          "Comparamos coberturas entre distintas aseguradoras y te recomendamos la póliza más conveniente.",
      },
      {
        title: "Contratación de la póliza",
        description:
          "Gestionamos la contratación y te explicamos con claridad cada cobertura incluida.",
      },
      {
        title: "Acompañamiento en siniestros",
        description:
          "Te asistimos durante la vigencia de la póliza y en la gestión de cualquier siniestro.",
      },
    ],
    actions: [],
    meta: {},
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
        "Elegir el seguro correcto no es solo comparar precios: es entender qué protege realmente tu patrimonio.",
      author: "Kautela",
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
    id: "services-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Solicita asesoría",
      title: "Encuentra el seguro adecuado para ti o tu empresa",
      description:
        "Te orientamos para elegir la cobertura correcta entre nuestros 30 productos de seguros.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/cta/cta-services-bg.png",
        alt: "Asesoría en seguros Kautela",
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
    ],
    meta: {},
  },
];
