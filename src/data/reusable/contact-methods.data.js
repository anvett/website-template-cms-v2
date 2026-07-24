export const contactMethodsData = [
  // Contact Method 01 - Phone
  {
    id: 'contact-phone',
    type: 'phone',
    label: 'Teléfono',
    value: '+593 99 255 9126',
    href: 'tel:+593992559126',
    description: 'Llámanos para información, cotizaciones o coordinación de atención.',
    icon: 'phone',
    enabled: true,
    primary: false,
    meta: {},
  },

  // Contact Method 02 - WhatsApp
  {
    id: 'contact-whatsapp',
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+593 99 255 9126',
    href: 'https://wa.me/593992559126',
    description: 'Escríbenos para cotizaciones, consultas o agendar atención.',
    icon: 'message-circle',
    enabled: true,
    primary: true,
    meta: {},
  },

  // Contact Method 03 - Email
  {
    id: 'contact-email',
    type: 'email',
    label: 'Correo electrónico',
    value: 'info@kautelaseguro.com',
    href: 'mailto:info@kautelaseguro.com',
    description: 'Envíanos tu consulta y te responderemos a la brevedad.',
    icon: 'mail',
    enabled: true,
    primary: false,
    meta: {},
  },

  // Contact Method 04 - Address
  {
    id: 'contact-address',
    type: 'address',
    label: 'Ubicación',
    value: 'Av. Luis Abel Tafur 353 y Juan Francisco Bonilla, Ibarra',
    href: 'https://www.google.com/maps/place/Av.+Luis+Abel+Tafur+353,+Ibarra/@0.3397459,-78.1291287,17z/data=!4m15!1m8!3m7!1s0x8e2a3cc4b7fa5d5d:0xf40c5792cd768dea!2sAv.+Luis+Abel+Tafur+353,+Ibarra!3b1!8m2!3d0.3397405!4d-78.1265538!16s%2Fg%2F11sf0cglnf!3m5!1s0x8e2a3cc4b7fa5d5d:0xf40c5792cd768dea!8m2!3d0.3397405!4d-78.1265538!16s%2Fg%2F11sf0cglnf?entry=ttu&g_ep=EgoyMDI2MDcyMS4wIKXMDSoASAFQAw%3D%3D',
    description: 'Visítanos en nuestra oficina matriz en Ibarra, Ecuador.',
    icon: 'map-pin',
    enabled: true,
    primary: false,
    meta: {},
  },

  // Contact Method 05 - Schedule
  {
    id: 'contact-schedule',
    type: 'schedule',
    label: 'Horario de atención',
    value: 'Lunes a viernes de 09:00 a 18:00',
    href: '',
    description: 'Atención en horario laboral para consultas y coordinación de servicios.',
    icon: 'clock',
    enabled: true,
    primary: false,
    meta: {},
  },
]