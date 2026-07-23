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
      eyebrow: "Servicios",
      title: "Servicios técnicos Instamatic",
      description:
        "Instalación de calefones, mantenimiento técnico, sistemas de bombeo de agua y gas centralizado para hogares, edificios y negocios.",
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
      eyebrow: "Soluciones profesionales",
      title: "Todo lo que necesitas para agua caliente, presión y gas",
      description:
        "Nuestros servicios están orientados a garantizar instalaciones seguras, equipos funcionando correctamente y soluciones adaptadas a las condiciones reales de cada hogar o negocio.",
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
      eyebrow: "Servicios principales",
      title: "Elige la solución que necesitas",
      description:
        "Contamos con atención técnica para instalación, mantenimiento, presión de agua y sistemas de gas centralizado.",
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
      whatsappNumber: "593992559126",
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
      title: "Atención técnica clara y ordenada",
      description:
        "Trabajamos con un proceso práctico para identificar la necesidad, recomendar la solución adecuada y validar el funcionamiento final.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/services/process-bg.jpg",
        alt: "Proceso técnico Instamatic",
      },
      foreground: null,
    },
    items: [
      {
        title: "Evaluación inicial",
        description:
          "Revisamos la necesidad del cliente, el punto de instalación, la presión de agua y las condiciones del espacio.",
      },
      {
        title: "Recomendación técnica",
        description:
          "Definimos el equipo, servicio o solución más conveniente según el uso, el lugar y el presupuesto disponible.",
      },
      {
        title: "Ejecución del servicio",
        description:
          "Realizamos la instalación, mantenimiento o adecuación correspondiente con criterio técnico y cuidado del sistema.",
      },
      {
        title: "Pruebas de funcionamiento",
        description:
          "Verificamos encendido, presión, temperatura, conexiones y seguridad antes de entregar el trabajo.",
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
        "Un buen servicio técnico no solo instala: verifica, prueba y deja el sistema funcionando correctamente.",
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
    id: "services-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Solicita asesoría",
      title: "Encuentra el servicio adecuado para tu hogar o negocio",
      description:
        "Te orientamos para elegir la mejor solución en instalación, mantenimiento, presión de agua o gas centralizado.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/cta/services-cta-bg.jpg",
        alt: "Servicios técnicos Instamatic",
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
    meta: {},
  },
];
