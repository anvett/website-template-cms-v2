export const productsSectionsData = [
  {
    id: "products-hero",
    enabled: true,
    component: "Hero",
    variant: "hero-internal",
    surface: "strong",
    containerWidth: "content",
    spacing: "hero",
    content: {
      eyebrow: "Productos",
      title: "Calefones, combos y repuestos Instamatic",
      description:
        "Conoce nuestros calefones Instamatic, combos completos, accesorios y repuestos para mantener tu equipo funcionando correctamente.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [],
    actions: [
      {
        label: "Solicitar cotización",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {},
  },

  {
    id: "products-overview",
    enabled: true,
    component: "About",
    variant: "stacked-centered",
    surface: "base",
    containerWidth: "content",
    spacing: "default",
    content: {
      eyebrow: "Opciones disponibles",
      title: "Equipos, combos y repuestos para tu calefón",
      description:
        "Instamatic cuenta con calefones de 26 litros, combos completos con instalación, accesorios y repuestos para mantenimiento o reparación.",
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
    id: "products-categories",
    enabled: true,
    component: "Comparison",
    variant: "split",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Categorías",
      title: "Elige la opción ideal para tu hogar o negocio",
      description:
        "Puedes escoger entre combos completos, equipos individuales o repuestos según la necesidad de instalación, mantenimiento o reparación.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/products/products-categories-bg.png",
        alt: "Productos Instamatic",
      },
      foreground: null,
    },
    items: [
      {
        eyebrow: "Solución completa",
        title: "Combos Instamatic 26L",
        description:
          "Opciones que incluyen calefón Instamatic 26L, instalación básica, kit de accesorios y complementos adicionales según el combo.",
      },
      {
        eyebrow: "Equipo y mantenimiento",
        title: "Calefones y repuestos",
        description:
          "Equipos clásicos y reforzados, además de repuestos disponibles para mantenimiento, reparación y soporte técnico.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "products-combos",
    enabled: true,
    component: "Products",
    variant: "product-cards",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Combos",
      title: "Súper combos Instamatic 26L",
      description:
        "Opciones completas para adquirir tu calefón con instalación y accesorios.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        image: "/assets/images/instamatic/products/combos/combo-1.jpg",
        title: "Súper Combo 1 – Instamatic 26L",
        description:
          "Incluye calefón Instamatic 26L, instalación básica y kit de accesorios.",
        price: "$299",
        details: {
          title: "Súper Combo 1 – Instamatic 26L",
          description:
            "Combo ideal para quienes necesitan un calefón Instamatic 26L con instalación básica y accesorios esenciales para su funcionamiento.",
          includes: [
            "Calefón Instamatic 26L",
            "Instalación básica",
            "Kit de accesorios",
            "Pruebas de funcionamiento",
          ],
          recommendedFor:
            "Hogares que necesitan agua caliente para hasta 2 duchas al mismo tiempo.",
          warranty: "Garantía según condiciones del producto.",
        },
      },
      {
        image: "/assets/images/instamatic/products/combos/combo-2.jpg",
        title: "Súper Combo 2 – Instamatic 26L",
        description:
          "Incluye todo lo del Combo 1 más cilindro de gas nuevo vacío.",
        price: "$330",
        details: {
          title: "Súper Combo 2 – Instamatic 26L",
          description:
            "Opción práctica para quienes desean adquirir el calefón con instalación, accesorios y cilindro de gas nuevo vacío.",
          includes: [
            "Calefón Instamatic 26L",
            "Instalación básica",
            "Kit de accesorios",
            "Cilindro de gas nuevo vacío",
            "Pruebas de funcionamiento",
          ],
          recommendedFor:
            "Clientes que necesitan una solución lista para instalar y empezar a usar.",
          warranty: "Garantía según condiciones del producto.",
        },
      },
      {
        image: "/assets/images/instamatic/products/combos/combo-3.jpg",
        title: "Súper Combo 3 – Instamatic 26L",
        description:
          "Incluye todo lo del Combo 1 más protector metálico para calefón.",
        price: "$345",
        details: {
          title: "Súper Combo 3 – Instamatic 26L",
          description:
            "Combo recomendado para quienes desean proteger mejor el calefón y mejorar su durabilidad frente a condiciones externas.",
          includes: [
            "Calefón Instamatic 26L",
            "Instalación básica",
            "Kit de accesorios",
            "Protector metálico para calefón",
            "Pruebas de funcionamiento",
          ],
          recommendedFor:
            "Instalaciones donde se busca mayor protección física del equipo.",
          warranty: "Garantía según condiciones del producto.",
        },
      },
      {
        image: "/assets/images/instamatic/products/combos/combo-4.jpg",
        title: "Súper Combo 4 – Instamatic 26L completo",
        description:
          "Incluye calefón, instalación, accesorios, cilindro de gas y protector metálico.",
        price: "$369",
        details: {
          title: "Súper Combo 4 – Instamatic 26L completo",
          description:
            "El combo más completo, pensado para quienes desean una solución integral con calefón, instalación, accesorios, cilindro y protección.",
          includes: [
            "Calefón Instamatic 26L",
            "Instalación básica",
            "Kit de accesorios",
            "Cilindro de gas nuevo vacío",
            "Protector metálico para calefón",
            "Pruebas de funcionamiento",
          ],
          recommendedFor:
            "Clientes que buscan una solución completa y recomendada.",
          warranty: "Garantía según condiciones del producto.",
        },
      },
    ],
    actions: [
      {
        label: "Cotizar combo",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {
      supportsModal: true,
    },
  },

  {
    id: "products-heaters",
    enabled: true,
    component: "Products",
    variant: "product-cards",
    surface: "subtle",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Solo calefón",
      title: "Calefones Instamatic 26L",
      description:
        "Equipos disponibles para quienes necesitan únicamente el calefón.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      {
        image:
          "/assets/images/instamatic/products/heaters/instamatic-26l-clasico.jpg",
        title: "Instamatic 26L clásico",
        description:
          "Equipo de uso doméstico, ideal para hasta 2 duchas simultáneas.",
        price: "$299",
        details: {
          title: "Instamatic 26L clásico",
          description:
            "Calefón de uso doméstico, ideal para hogares que necesitan agua caliente eficiente y segura.",
          specifications: [
            "Capacidad 26L",
            "Hasta 2 duchas simultáneas",
            "Encendido automático",
            "Estructura metálica",
          ],
          recommendedFor:
            "Casas, departamentos y negocios con consumo doméstico habitual.",
          warranty: "2 años",
        },
      },
      {
        image:
          "/assets/images/instamatic/products/heaters/instamatic-26l-reforzado.jpg",
        title: "Instamatic 26L reforzado",
        description:
          "Equipo de uso doméstico y semi industrial, recomendado para alto uso.",
        price: "$319",
        details: {
          title: "Instamatic 26L reforzado",
          description:
            "Modelo reforzado para clientes que necesitan mayor resistencia interna y mejor desempeño en condiciones de alto uso.",
          specifications: [
            "Capacidad 26L",
            "Uso doméstico y semi industrial",
            "Encendido automático",
            "Mayor resistencia interna",
          ],
          recommendedFor:
            "Negocios, hidromasajes, hogares con mayor demanda o uso frecuente.",
          warranty: "3 años",
        },
      },
    ],
    actions: [
      {
        label: "Solicitar información",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {
      supportsModal: true,
    },
  },

  {
    id: "products-parts",
    enabled: true,
    component: "Products",
    variant: "parts-gallery",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Repuestos",
      title: "Repuestos para calefones Instamatic",
      description:
        "Disponemos de repuestos para mantenimiento, reparación y soporte técnico de calefones Instamatic.",
    },
    media: {
      background: null,
      foreground: null,
    },
    items: [
      // Encendido
      {
        image: "/assets/images/instamatic/products/parts/battery-check.jpg",
        title: "Battery Check",
        category: "Encendido",
        price: "$10,00",
        description: "Módulo de revisión o control de batería para calefón.",
        details: {
          title: "Battery Check",
          description:
            "Repuesto utilizado para revisión o control del sistema de batería del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a disponibilidad.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/micro-switch.jpg",
        title: "Micro switch",
        category: "Encendido",
        price: "$9,00",
        description: "Interruptor interno para activación del sistema.",
        details: {
          title: "Micro switch",
          description:
            "Interruptor interno utilizado para activar funciones del calefón según el flujo o condición de operación.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a revisión técnica.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/kit-encendido.jpg",
        title: "Kit de encendido",
        category: "Encendido",
        price: "$19,00",
        description: "Kit completo para sistema de encendido.",
        details: {
          title: "Kit de encendido",
          description:
            "Kit de componentes para el sistema de encendido del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Instalación recomendada por técnico.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/porta-pilas.jpg",
        title: "Porta pilas",
        category: "Encendido",
        price: "$5,00",
        description: "Porta pilas para alimentación del sistema.",
        details: {
          title: "Porta pilas",
          description:
            "Compartimento para pilas utilizado en el sistema de alimentación del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a disponibilidad.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/bujia-encendido.jpg",
        title: "Bujía de encendido",
        category: "Encendido",
        price: "$5,00",
        description: "Bujía para generación de chispa de encendido.",
        details: {
          title: "Bujía de encendido",
          description:
            "Componente encargado de generar chispa para el encendido del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Instalación técnica recomendada.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/micro-switch-2.jpg",
        title: "Micro switch 2",
        category: "Encendido",
        price: "$9,00",
        description: "Micro switch alternativo para activación interna.",
        details: {
          title: "Micro switch 2",
          description:
            "Interruptor interno alternativo para activación del sistema del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a revisión técnica.",
        },
      },

      // Gas
      {
        image: "/assets/images/instamatic/products/parts/caneria-gas.jpg",
        title: "Cañería de gas",
        category: "Gas",
        price: "$12,00",
        description: "Cañería para conexión interna de gas.",
        details: {
          title: "Cañería de gas",
          description:
            "Repuesto utilizado para conexión o conducción de gas dentro del sistema del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Instalación técnica recomendada.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/valvula-selenoide.jpg",
        title: "Válvula selenoide",
        category: "Gas",
        price: "$28,00",
        description: "Válvula para control automático de paso de gas.",
        details: {
          title: "Válvula selenoide",
          description:
            "Componente utilizado para controlar automáticamente el paso de gas durante el funcionamiento del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Debe ser instalada por personal técnico.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/cuerpo-gas.jpg",
        title: "Cuerpo de gas",
        category: "Gas",
        price: "$45,00",
        description: "Cuerpo principal de control de gas.",
        details: {
          title: "Cuerpo de gas",
          description: "Componente principal del sistema de gas del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Requiere diagnóstico e instalación técnica.",
        },
      },

      // Agua
      {
        image: "/assets/images/instamatic/products/parts/hidro-valvula.jpg",
        title: "Hidro válvula",
        category: "Agua",
        price: "$65,00",
        description: "Válvula hidráulica para control de paso de agua.",
        details: {
          title: "Hidro válvula",
          description:
            "Componente hidráulico utilizado para el control del paso de agua dentro del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a revisión técnica.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/diafragma.jpg",
        title: "Diafragma",
        category: "Agua",
        price: "$5,00",
        description: "Diafragma para sistema hidráulico del calefón.",
        details: {
          title: "Diafragma",
          description:
            "Repuesto del sistema hidráulico utilizado para activar el funcionamiento del calefón mediante presión de agua.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a disponibilidad.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/palanca-flujo.jpg",
        title: "Palanca de flujo",
        category: "Agua",
        price: "$5,00",
        description: "Palanca para activación o control de flujo.",
        details: {
          title: "Palanca de flujo",
          description:
            "Repuesto relacionado con el sistema de flujo de agua del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a revisión técnica.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/diafragma-28l.jpg",
        title: "Diafragma 28L",
        category: "Agua",
        price: "$8,00",
        description: "Diafragma para calefón de mayor capacidad.",
        details: {
          title: "Diafragma 28L",
          description:
            "Diafragma utilizado en sistemas hidráulicos de calefones de mayor capacidad.",
          compatibility: "Calefones compatibles de 28L",
          notes: "Confirmar compatibilidad antes de instalar.",
        },
      },

      // Seguridad
      {
        image: "/assets/images/instamatic/products/parts/sensor-llama.jpg",
        title: "Sensor llama",
        category: "Seguridad",
        price: "$10,00",
        description: "Sensor para detección de llama en el calefón.",
        details: {
          title: "Sensor llama",
          description:
            "Repuesto encargado de detectar la presencia de llama durante el funcionamiento del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Instalación recomendada por técnico.",
        },
      },

      // Electrónica
      {
        image:
          "/assets/images/instamatic/products/parts/modulo-electronico.jpg",
        title: "Módulo electrónico",
        category: "Electrónica",
        price: "$35,00",
        description: "Módulo electrónico de control para calefón.",
        details: {
          title: "Módulo electrónico",
          description:
            "Componente electrónico de control para el funcionamiento del sistema de encendido y operación.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Requiere diagnóstico previo.",
        },
      },

      // Combustión
      {
        image: "/assets/images/instamatic/products/parts/quemador.jpg",
        title: "Quemador",
        category: "Combustión",
        price: "$35,00",
        description: "Quemador principal para calefón a gas.",
        details: {
          title: "Quemador",
          description:
            "Componente principal de combustión encargado de generar la llama para calentar el agua.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Requiere instalación técnica.",
        },
      },

      // Temperatura
      {
        image: "/assets/images/instamatic/products/parts/termostato.jpg",
        title: "Termostato",
        category: "Temperatura",
        price: "$8,00",
        description: "Termostato para control o protección térmica.",
        details: {
          title: "Termostato",
          description:
            "Componente relacionado con el control o protección de temperatura del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Requiere diagnóstico previo.",
        },
      },

      // Sellado
      {
        image: "/assets/images/instamatic/products/parts/juego-orings.jpg",
        title: "Juego de orings",
        category: "Sellado",
        price: "$2,00",
        description: "Juego de empaques tipo oring para sellado.",
        details: {
          title: "Juego de orings",
          description:
            "Conjunto de empaques utilizados para sellado en conexiones o componentes internos.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a disponibilidad.",
        },
      },
      {
        image: "/assets/images/instamatic/products/parts/empaque-quemador.jpg",
        title: "Empaque quemador",
        category: "Sellado",
        price: "$5,00",
        description: "Empaque para zona de quemador.",
        details: {
          title: "Empaque quemador",
          description:
            "Empaque utilizado en el área del quemador para sellado o ajuste del componente.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a disponibilidad.",
        },
      },

      // Conexión
      {
        image: "/assets/images/instamatic/products/parts/adaptador-hj.jpg",
        title: "Adaptador H-J",
        category: "Conexión",
        price: "$5,00",
        description: "Adaptador para conexión del sistema.",
        details: {
          title: "Adaptador H-J",
          description:
            "Adaptador utilizado para conexión o acople dentro del sistema del calefón.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a disponibilidad.",
        },
      },

      // Estructura
      {
        image: "/assets/images/instamatic/products/parts/soporte.jpg",
        title: "Soporte",
        category: "Estructura",
        price: "$5,00",
        description: "Soporte metálico para montaje o fijación.",
        details: {
          title: "Soporte",
          description:
            "Pieza metálica de soporte utilizada para fijación o montaje interno del equipo.",
          compatibility: "Calefones Instamatic compatibles",
          notes: "Sujeto a disponibilidad.",
        },
      },
    ],
    actions: [
      {
        label: "Consultar repuesto",
        href: "/contact",
        variant: "primary",
      },
    ],
    meta: {
      supportsModal: true,
    },
  },

  {
    id: "products-benefits",
    enabled: true,
    component: "Features",
    variant: "two-columns-gradient-image",
    surface: "base",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Beneficios",
      title: "Ventajas de elegir Instamatic",
      description:
        "Equipos diseñados para ofrecer agua caliente de forma eficiente, segura y confiable.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/products/products-benefits-bg.jpg",
        alt: "Beneficios de elegir Instamatic",
      },
      foreground: null,
    },
    items: [
      {
        title: "Hasta 2 duchas simultáneas",
        description:
          "Los modelos destacados están pensados para cubrir necesidades habituales de hogares y negocios.",
      },
      {
        title: "Encendido automático",
        description:
          "Mayor comodidad de uso diario con un sistema práctico y funcional.",
      },
      {
        title: "Estructura metálica",
        description:
          "Diseño resistente para mejorar la durabilidad del equipo.",
      },
      {
        title: "Garantía según modelo",
        description:
          "Opciones con garantía de 2 o 3 años, de acuerdo con el calefón elegido.",
      },
    ],
    actions: [],
    meta: {},
  },

  {
    id: "products-quote",
    enabled: true,
    component: "Quote",
    variant: "default",
    surface: "subtle",
    containerWidth: "content",
    spacing: "compact",
    content: {
      quote:
        "Un buen calefón debe ofrecer rendimiento, seguridad, respaldo y disponibilidad de repuestos.",
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
    id: "products-cta",
    enabled: true,
    component: "CTA",
    variant: "background-image",
    surface: "strong",
    containerWidth: "section",
    spacing: "default",
    content: {
      eyebrow: "Cotiza tu calefón",
      title: "Encuentra el combo, equipo o repuesto ideal",
      description:
        "Te asesoramos para elegir entre combos completos, calefones clásicos, modelos reforzados o repuestos según tu necesidad.",
    },
    media: {
      background: {
        type: "image",
        src: "/assets/images/instamatic/cta/products-cta-bg.jpg",
        alt: "Cotiza productos Instamatic",
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
    ],
    meta: {},
  },
];
