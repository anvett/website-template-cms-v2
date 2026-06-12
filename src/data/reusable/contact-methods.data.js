export const contactMethodsData = [
  // Contact Method 01 - Phone
  {
    id: 'contact-phone',
    type: 'phone',
    label: 'Teléfono',
    value: '+593 99 999 9999',
    href: 'tel:+593999999999',
    description: 'Llámanos para información, revisión o coordinación de servicio.',
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
    value: '+593 99 999 9999',
    href: 'https://wa.me/593999999999',
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
    value: 'info@placeholder-site.com',
    href: 'mailto:info@placeholder-site.com',
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
    value: 'Quito, Ecuador',
    href: 'https://maps.google.com/?q=Quito,Ecuador',
    description: 'Atención en Quito y zonas cercanas, según cobertura del servicio.',
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
    value: 'Lunes a viernes de 08:00 a 18:00',
    href: '',
    description: 'Atención en horario laboral para consultas y coordinación de servicios.',
    icon: 'clock',
    enabled: true,
    primary: false,
    meta: {},
  },
]