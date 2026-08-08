# <a name="manual-creacion-de-instancias.md"></a>05-MANUAL-CREACION-DE-INSTANCIAS.md
# <a name="template-cms-v2"></a>TEMPLATE CMS V2
## <a name="manual-de-creación-de-instancias"></a>Manual de Creación de Instancias
Versión: 2.0

Estado: OFICIAL

Fecha de consolidación: Junio 2026

-----
# <a name="objetivo-del-documento"></a>1. OBJETIVO DEL DOCUMENTO
Este documento define el procedimiento oficial para crear una nueva instancia utilizando Template CMS V2.

Su propósito es:

- estandarizar el proceso de implementación;
- reducir errores;
- evitar deuda técnica;
- garantizar consistencia entre proyectos;
- acelerar la puesta en marcha de nuevas instancias;
- mantener compatibilidad con la arquitectura V2;
- facilitar la futura integración con CMS;
- facilitar automatización mediante agentes IA.

Este documento describe el proceso completo desde la descarga del proyecto base hasta el cierre de la capa DATA.

No documenta:

- implementación interna de sections;
- creación de variants;
- modificación de routers;
- renderizado interno.

Estos temas pertenecen a manuales posteriores.

-----
# <a name="filosofía-de-implementación"></a>2. FILOSOFÍA DE IMPLEMENTACIÓN
Toda nueva instancia debe construirse siguiendo la arquitectura oficial:

DATA\
↓\
PAGES\
↓\
SECTIONS\
↓\
VARIANTS\
↓\
UI BASE\
↓\
GLOBALS

La implementación nunca debe comenzar por:

- CSS;
- Components;
- Variants;
- JSX;
- UI Base.

Siempre debe comenzar por:

Cliente\
↓\
Contenido\
↓\
Arquitectura\
↓\
Data\
↓\
Implementación

Regla fundamental:

La información debe existir primero en DATA.

La presentación viene después.

-----
# <a name="punto-de-partida-oficial"></a>3. PUNTO DE PARTIDA OFICIAL
Toda nueva instancia inicia desde:

ZIP DEL PROYECTO ORIGINAL

Repositorio base:

Template CMS V2

No se recomienda:

- copiar proyectos antiguos;
- reutilizar instancias productivas;
- clonar proyectos modificados;
- iniciar desde implementaciones parciales.

Siempre se debe utilizar la versión oficial más reciente del framework.

-----
# <a name="preparación-del-entorno"></a>4. PREPARACIÓN DEL ENTORNO
## <a name="extraer-proyecto"></a>4.1 Extraer proyecto
Extraer el ZIP en una carpeta nueva.

Ejemplo:

proyectos/\
└── instamatic/

-----
## <a name="instalar-dependencias"></a>4.2 Instalar dependencias
Ejecutar:

npm install

-----
## <a name="levantar-entorno-local"></a>4.3 Levantar entorno local
Ejecutar:

npm run dev

-----
## <a name="validar-proyecto-base"></a>4.4 Validar proyecto base
Antes de modificar contenido verificar:

- el proyecto compila;
- no existen errores;
- Navbar renderiza;
- Footer renderiza;
- Home renderiza;
- Tailwind funciona;
- assets cargan correctamente.

Nunca comenzar modificaciones sobre un proyecto roto.

-----
# <a name="recolección-de-información-del-cliente"></a>5. RECOLECCIÓN DE INFORMACIÓN DEL CLIENTE
Antes de crear un solo archivo Data se debe recopilar toda la información disponible.

-----
## <a name="información-corporativa"></a>5.1 Información corporativa
Mínimo requerido:

- nombre comercial;
- nombre legal;
- actividad económica;
- descripción general;
- años de experiencia;
- propuesta de valor.
-----
## <a name="información-de-contacto"></a>5.2 Información de contacto
Mínimo requerido:

- teléfono;
- WhatsApp;
- email;
- dirección;
- ciudad;
- país.
-----
## <a name="redes-sociales"></a>5.3 Redes sociales
Recopilar:

- Facebook;
- Instagram;
- LinkedIn;
- TikTok;
- YouTube;
- X/Twitter.
-----
## <a name="información-comercial"></a>5.4 Información comercial
Recopilar:

- servicios;
- productos;
- categorías;
- beneficios;
- diferenciadores.
-----
## <a name="información-institucional"></a>5.5 Información institucional
Si existe:

- historia;
- misión;
- visión;
- valores;
- certificaciones.
-----
## <a name="información-legal"></a>5.6 Información legal
Recopilar:

- política de privacidad;
- términos y condiciones;
- avisos legales;
- consentimiento de datos.
-----
## <a name="multimedia"></a>5.7 Multimedia
Solicitar:

- logo SVG;
- logo PNG;
- favicon;
- fotografías;
- imágenes corporativas;
- videos;
- imágenes de productos.
-----
# <a name="definición-de-la-arquitectura-del-sitio"></a>6. DEFINICIÓN DE LA ARQUITECTURA DEL SITIO
Antes de crear Data debe definirse el mapa completo del sitio.

-----
## <a name="definir-páginas"></a>6.1 Definir páginas
Ejemplo:

Home\
About Us\
Services\
Products\
FAQ\
Contact\
Privacy Policy\
Terms and Conditions

-----
## <a name="definir-páginas-internas"></a>6.2 Definir páginas internas
Ejemplo:

Installation\
Technical Service\
Water Pumps\
Centralized Gas

-----
## <a name="clasificar-páginas"></a>6.3 Clasificar páginas
### <a name="institucionales"></a>Institucionales
Home\
About Us\
Contact
### <a name="comerciales"></a>Comerciales
Services\
Products
### <a name="soporte"></a>Soporte
FAQ
### <a name="legales"></a>Legales
Privacy Policy\
Terms and Conditions

-----
# <a name="configuración-global-del-sitio"></a>7. CONFIGURACIÓN GLOBAL DEL SITIO
La primera capa Data que debe configurarse es:

site.data.js

Antes de crear pages.

Antes de crear sections.

-----
# <a name="creación-de-site.data.js"></a>8. CREACIÓN DE SITE.DATA.JS
## <a name="objetivo"></a>8.1 Objetivo
Centralizar toda la configuración global del sitio.

-----
## <a name="contrato-oficial"></a>8.2 Contrato oficial
site\
branding\
contact\
address\
businessHours\
social\
seo\
openGraph\
twitter\
icons\
manifest\
themeMeta

-----
## <a name="configurar-site"></a>8.3 Configurar site
Ejemplo:

site: {\
`  `name: "Instamatic",\
`  `legalName: "Instamatic Ecuador",\
`  `domain: "https://www.instamatic.ec",\
`  `language: "es",\
`  `locale: "es\_EC",\
}

-----
## <a name="configurar-branding"></a>8.4 Configurar branding
Ejemplo:

branding: {\
`  `siteTitle: "Instamatic",\
`  `siteDescription:\
`    `"Soluciones de agua caliente para hogares y empresas.",\
}

-----
## <a name="configurar-contact"></a>8.5 Configurar contact
Ejemplo:

contact: {\
`  `phone: "",\
`  `email: "",\
`  `whatsapp: "",\
}

-----
## <a name="configurar-social"></a>8.6 Configurar social
Ejemplo:

social: {\
`  `facebook: "",\
`  `instagram: "",\
`  `linkedin: "",\
}

-----
## <a name="configurar-seo-global"></a>8.7 Configurar SEO global
Completar:

seo\
openGraph\
twitter

antes de continuar.

-----
# <a name="creación-de-navigation.data.js"></a>9. CREACIÓN DE NAVIGATION.DATA.JS
Una vez completado site.data.js se configura:

navigation.data.js

-----
## <a name="orden-obligatorio"></a>9.1 Orden obligatorio
site.data.js\
↓\
navigation.data.js\
↓\
pages\
↓\
sections

Este orden es oficial.

-----
## <a name="contrato-oficial-1"></a>9.2 Contrato oficial
announcement\
navbar\
footerNavigation

-----
## <a name="configurar-announcement"></a>9.3 Configurar announcement
Si no se utiliza:

enabled: **false**

-----
## <a name="configurar-navbar"></a>9.4 Configurar Navbar
Definir:

id\
enabled\
variant\
content\
items\
actions\
meta

-----
## <a name="configurar-footer"></a>9.5 Configurar Footer
Definir:

groups\
links\
legal\
social

según la estructura aprobada.

-----
# <a name="configuración-de-identidad-visual"></a>10. CONFIGURACIÓN DE IDENTIDAD VISUAL
Una vez cerrada la capa Global Data se configura la identidad visual.

La identidad visual NO se configura en Sections.

La identidad visual NO se configura en Variants.

La identidad visual principal pertenece a:

globals.css

-----
## <a name="elementos-permitidos"></a>10.1 Elementos permitidos
Modificar:

- colores;
- tipografías;
- gradientes;
- spacing;
- containers;
- variables CSS.
-----
## <a name="elementos-prohibidos"></a>10.2 Elementos prohibidos
No modificar:

- Sections;
- Variants;
- UI Base;
- Layouts;
- Router.
-----
## <a name="objetivo-1"></a>10.3 Objetivo
Al finalizar este paso debe existir:

Sitio identificado visualmente\
↓\
Data global configurada\
↓\
Navegación configurada\
↓\
Listo para crear páginas

-----
\-----
# <a name="fin-parte-1"></a><a name="parte-2"></a><a name="creación-de-page-data"></a>11. CREACIÓN DE PAGE DATA
Una vez configurados:

site.data.js\
navigation.data.js\
globals.css

se procede a construir la arquitectura de páginas.

Las páginas representan el mapa estructural del sitio.

No contienen contenido principal.

No contienen diseño.

No contienen implementación visual.

Su responsabilidad es organizar.

-----
# <a name="estructura-oficial-de-page-data"></a>12. ESTRUCTURA OFICIAL DE PAGE DATA
Ubicación:

src/data/pages/

Ejemplos:

home.page.data.js\
about-us.page.data.js\
services.page.data.js\
products.page.data.js\
faq.page.data.js\
contact.page.data.js\
privacy-policy.page.data.js\
terms-and-conditions.page.data.js

-----
# <a name="contrato-oficial-de-page-data"></a>13. CONTRATO OFICIAL DE PAGE DATA
Todo archivo Page Data debe respetar:

{\
`  `id,\
`  `slug,\
`  `enabled,\
\
`  `seo,\
\
`  `openGraph,\
\
`  `sections,\
\
`  `meta\
}

Este contrato es obligatorio.

-----
# <a name="creación-del-mapa-de-páginas"></a>14. CREACIÓN DEL MAPA DE PÁGINAS
Antes de crear archivos debe definirse el mapa completo.

Ejemplo:

Home\
\
About Us\
\
Services\
├─ Installation\
├─ Technical Service\
├─ Water Pumps\
└─ Centralized Gas\
\
Products\
\
FAQ\
\
Contact\
\
Privacy Policy\
\
Terms and Conditions

-----
# <a name="xe95c808e881e16ec4dc1dae98beb51563e4fbcf"></a>15. CREAR TODOS LOS PAGE DATA ANTES DE CREAR SECTIONS
Regla oficial:

Primero:

Crear todos los \*.page.data.js

Después:

Crear los \*.sections.data.js

Nunca al revés.

-----
# <a name="home.page.data.js"></a>16. HOME.PAGE.DATA.JS
Ejemplo base:

**export** **const** homePageData = {\
`  `id: "home",\
\
`  `slug: "/",\
\
`  `enabled: **true**,\
\
`  `seo: {},\
\
`  `openGraph: {},\
\
`  `sections: [],\
\
`  `meta: {},\
};

-----
# <a name="about-us.page.data.js"></a>17. ABOUT-US.PAGE.DATA.JS
Ejemplo base:

**export** **const** aboutUsPageData = {\
`  `id: "about-us",\
\
`  `slug: "/about-us",\
\
`  `enabled: **true**,\
\
`  `seo: {},\
\
`  `openGraph: {},\
\
`  `sections: [],\
\
`  `meta: {},\
};

-----
# <a name="services.page.data.js"></a>18. SERVICES.PAGE.DATA.JS
Ejemplo base:

**export** **const** servicesPageData = {\
`  `id: "services",\
\
`  `slug: "/services",\
\
`  `enabled: **true**,\
\
`  `seo: {},\
\
`  `openGraph: {},\
\
`  `sections: [],\
\
`  `meta: {},\
};

-----
# <a name="páginas-internas-de-servicios"></a>19. PÁGINAS INTERNAS DE SERVICIOS
Ejemplos:

installation.page.data.js\
\
technical-service.page.data.js\
\
water-pumps.page.data.js\
\
centralized-gas.page.data.js

Cada una debe tener:

id\
slug\
enabled\
seo\
openGraph\
sections\
meta

-----
# <a name="completar-seo-de-cada-página"></a>20. COMPLETAR SEO DE CADA PÁGINA
Cada página debe tener:

seo: {\
`  `title,\
`  `description,\
`  `canonical,\
`  `robots\
}

-----
# <a name="completar-opengraph-de-cada-página"></a>21. COMPLETAR OPENGRAPH DE CADA PÁGINA
Cada página debe tener:

openGraph: {\
`  `title,\
`  `description,\
`  `url,\
`  `images\
}

-----
# <a name="definición-del-mapa-de-sections"></a>22. DEFINICIÓN DEL MAPA DE SECTIONS
Una vez creadas todas las páginas se define:

Qué sections utiliza cada página

No se crean todavía.

Primero se diseña el mapa.

-----
# <a name="ejemplo-de-mapa-home"></a>23. EJEMPLO DE MAPA HOME
home-hero\
\
home-about\
\
home-services-preview\
\
home-products-preview\
\
home-benefits\
\
home-stats\
\
home-cta

-----
# <a name="ejemplo-de-mapa-about"></a>24. EJEMPLO DE MAPA ABOUT
about-hero\
\
about-story\
\
about-values\
\
about-benefits\
\
about-cta

-----
# <a name="ejemplo-de-mapa-services"></a>25. EJEMPLO DE MAPA SERVICES
services-hero\
\
services-overview\
\
services-grid\
\
services-process\
\
services-cta

-----
# <a name="regla-de-reutilización"></a>26. REGLA DE REUTILIZACIÓN
Antes de crear una nueva section preguntar:

¿Ya existe una section que cumple el mismo propósito?

Si la respuesta es:

Sí

se reutiliza.

-----
# <a name="no-crear-sections-nuevas-por-contenido"></a>27. NO CREAR SECTIONS NUEVAS POR CONTENIDO
Incorrecto:

HeroEmpresa\
\
HeroServicios\
\
HeroProductos

Correcto:

Hero\
↓\
Data distinta

-----
# <a name="selección-de-components"></a>28. SELECCIÓN DE COMPONENTS
Cada section debe asociarse a un component oficial.

Ejemplos:

Hero\
\
About\
\
Services\
\
Features\
\
Stats\
\
Products\
\
Contact\
\
Comparison\
\
DualContent\
\
FAQ\
\
Quote\
\
Testimonials\
\
CTA\
\
Legal

-----
# <a name="selección-de-variants"></a>29. SELECCIÓN DE VARIANTS
Una vez elegido el component se selecciona la variant.

Ejemplo:

Hero\
↓\
background-image

-----
# <a name="variants-existentes-primero"></a>30. VARIANTS EXISTENTES PRIMERO
Regla oficial:

Siempre buscar primero una variant existente.

No crear variants nuevas durante la fase Data.

-----
# <a name="ejemplo-de-definición-completa"></a>31. EJEMPLO DE DEFINICIÓN COMPLETA
home-hero\
↓\
Hero\
↓\
background-image

home-services-preview\
↓\
Services\
↓\
cards-with-icons

home-stats\
↓\
Stats\
↓\
split-highlight

-----
# <a name="creación-de-sections-data"></a>32. CREACIÓN DE SECTIONS DATA
Ubicación:

src/data/sections/

Ejemplos:

home.sections.data.js\
\
about-us.sections.data.js\
\
services.sections.data.js\
\
contact.sections.data.js\
\
faq.sections.data.js

-----
# <a name="exportación-oficial"></a>33. EXPORTACIÓN OFICIAL
Ejemplo:

**export** **const** homeSectionsData = [];

Toda página debe exportar un array.

-----
# <a name="contrato-oficial-de-section-data"></a>34. CONTRATO OFICIAL DE SECTION DATA
Toda section debe implementar:

{\
`  `id,\
`  `enabled,\
`  `component,\
`  `variant,\
\
`  `surface,\
`  `containerWidth,\
`  `spacing,\
\
`  `background,\
\
`  `content,\
`  `media,\
`  `items,\
`  `actions,\
`  `meta\
}

Contrato obligatorio V2.

-----
# <a name="plantilla-base-de-section"></a>35. PLANTILLA BASE DE SECTION
{\
`  `id: "",\
\
`  `enabled: **true**,\
\
`  `component: "",\
\
`  `variant: "",\
\
`  `surface: "base",\
\
`  `containerWidth: "section",\
\
`  `spacing: "default",\
\
`  `background: {\
`    `type: "surface",\
`    `variant: **null**,\
`  `},\
\
`  `content: {},\
\
`  `media: {\
`    `background: **null**,\
`    `foreground: **null**,\
`  `},\
\
`  `items: [],\
\
`  `actions: [],\
\
`  `meta: {},\
}

-----
# <a name="configurar-content"></a>36. CONFIGURAR CONTENT
Responsable de:

eyebrow\
\
title\
\
subtitle\
\
description

Ejemplo:

content: {\
`  `eyebrow: "Servicios",\
\
`  `title: "Soluciones profesionales",\
\
`  `description:\
`    `"Instalación y mantenimiento especializado.",\
}

-----
# <a name="configurar-media"></a>37. CONFIGURAR MEDIA
Responsable de:

background\
\
foreground\
\
video\
\
multimedia

Ejemplo:

media: {\
`  `background: **null**,\
\
`  `foreground: {\
`    `type: "image",\
\
`    `src: "/assets/images/about.jpg",\
\
`    `alt: "Equipo de trabajo",\
`  `},\
}

-----
# <a name="configurar-items"></a>38. CONFIGURAR ITEMS
Responsable de:

cards\
\
faq\
\
features\
\
stats\
\
productos\
\
servicios

Ejemplo:

items: [\
`  `{\
`    `title: "Servicio",\
\
`    `description: "Descripción",\
`  `},\
]

-----
# <a name="configurar-actions"></a>39. CONFIGURAR ACTIONS
Responsable de:

botones\
\
enlaces\
\
CTA

Ejemplo:

actions: [\
`  `{\
`    `label: "Contactar",\
\
`    `href: "/contact",\
\
`    `variant: "primary",\
`  `},\
]

-----
# 40\. CONFIGURAR META
Responsable de:

overlay\
\
formularios\
\
alineación\
\
configuración adicional

Ejemplo:

meta: {\
`  `overlay: **true**,\
\
`  `overlayOpacity: 0.55,\
}

# <a name="configuración-de-surface"></a>41. CONFIGURACIÓN DE SURFACE
Toda section debe definir:

surface

La surface representa la intención visual base de la sección.

-----
## <a name="opciones-oficiales"></a>41.1 Opciones oficiales
base\
\
subtle\
\
strong

-----
## <a name="uso-recomendado"></a>41.2 Uso recomendado
### <a name="base"></a>base
Uso general.

surface: "base"

Ideal para:

- About
- Services
- FAQ
- Contact
-----
### <a name="subtle"></a>subtle
Separación visual entre bloques.

surface: "subtle"

Ideal para:

- Features
- Benefits
- Secondary Sections
-----
### <a name="strong"></a>strong
Secciones de alto impacto.

surface: "strong"

Ideal para:

- Hero
- CTA
- Stats destacadas
-----
# <a name="configuración-de-containerwidth"></a>42. CONFIGURACIÓN DE CONTAINERWIDTH
Toda section debe definir:

containerWidth

-----
## <a name="opciones-oficiales-1"></a>42.1 Opciones oficiales
content\
\
section\
\
wide

-----
## <a name="content"></a>42.2 content
Uso:

containerWidth: "content"

Ideal para:

- textos legales;
- quotes;
- contenidos extensos;
- documentos.
-----
## <a name="section"></a>42.3 section
Uso:

containerWidth: "section"

Ideal para:

- sections normales;
- cards;
- contenido comercial.
-----
## <a name="wide"></a>42.4 wide
Uso:

containerWidth: "wide"

Ideal para:

- Hero;
- layouts amplios;
- composiciones visuales.
-----
# <a name="configuración-de-spacing"></a>43. CONFIGURACIÓN DE SPACING
Toda section debe definir:

spacing

-----
## <a name="opciones-oficiales-2"></a>43.1 Opciones oficiales
compact\
\
default\
\
hero

-----
## <a name="compact"></a>43.2 compact
Uso:

spacing: "compact"

Ideal para:

- Quote;
- Stats;
- bloques cortos.
-----
## <a name="default"></a>43.3 default
Uso:

spacing: "default"

Ideal para:

- la mayoría de sections.
-----
## <a name="hero"></a>43.4 hero
Uso:

spacing: "hero"

Ideal para:

- Hero principal;
- apertura de página.
-----
# <a name="configuración-de-background"></a>44. CONFIGURACIÓN DE BACKGROUND
Toda section debe definir:

background

La propiedad es obligatoria en V2.

-----
## 44\.1 Contrato oficial
background: {\
`  `type,\
`  `variant,\
}

-----
## <a name="opciones-oficiales-de-type"></a>44.2 Opciones oficiales de type
surface\
\
gradient\
\
image

-----
## <a name="fondo-surface"></a>44.3 Fondo Surface
background: {\
`  `type: "surface",\
\
`  `variant: **null**,\
}

Uso:

- fondo normal;
- secciones estándar.
-----
## <a name="fondo-gradient"></a>44.4 Fondo Gradient
background: {\
`  `type: "gradient",\
\
`  `variant: "soft",\
}

Uso:

- bloques destacados;
- composiciones visuales.
-----
## <a name="fondo-image"></a>44.5 Fondo Image
background: {\
`  `type: "image",\
\
`  `variant: "dark-overlay",\
}

Uso:

- Hero;
- CTA;
- banners.
-----
## <a name="defaults-automáticos"></a>44.6 Defaults automáticos (Corrección 2026-08)
Toda Section Data pasa por `withSectionDefaults`/`withSectionsDefaults` (`src/lib/sections/sectionDefaults.js`) antes de renderizarse, sin importar el `background.type` elegido.

Esto precarga automáticamente:

media: {\
`  `background: { src: "", alt: "" },\
`  `foreground: **null**,\
}

meta: {\
`  `overlay: **true**,\
\
`  `overlayOpacity: 0.6,\
}

Por lo tanto, al crear una nueva instancia **no es necesario** escribir `media.background`/`meta.overlay` a mano si `background.type` es `"surface"` o `"gradient"`. Cambiar luego a `background.type: "image"` solo requiere completar `media.background.src`/`alt` — el overlay ya existe.

-----
# <a name="configuración-de-overlay"></a>45. CONFIGURACIÓN DE OVERLAY
Regla oficial V2.

-----
## <a name="incorrecto"></a>Incorrecto
media.background.overlay

media.background.overlayOpacity

-----
## <a name="correcto"></a>Correcto
meta: {\
`  `overlay: **true**,\
\
`  `overlayOpacity: 0.7,\
}

-----
## <a name="responsabilidad"></a>Responsabilidad
Overlay pertenece a:

meta

No pertenece a:

media

-----
# <a name="configuración-de-imágenes"></a>46. CONFIGURACIÓN DE IMÁGENES
Las imágenes deben configurarse desde DATA.

-----
## Contrato oficial
image: {\
`  `src,\
\
`  `alt,\
\
`  `type,\
\
`  `ratio,\
\
`  `fit,\
\
`  `radius,\
\
`  `objectPosition,\
\
`  `className,\
\
`  `sizes,\
\
`  `overlay,\
}

`type` (Corrección 2026-08): opcional, `"image"` (default) o `"video"`. Soportado por `MediaFrame` (UI Base) — ya renderiza `<video>` con poster/controls/autoplay/loop cuando `type="video"`. Las Variants que usan `MediaFrame` deben leer `image.type` de la instancia, nunca fijarlo en código.

-----
## <a name="ejemplo"></a>Ejemplo
image: {\
`  `src: "/assets/images/about/team.jpg",\
\
`  `alt: "Equipo de trabajo",\
\
`  `ratio: "landscape",\
\
`  `fit: "cover",\
\
`  `radius: "lg",\
\
`  `objectPosition: "center center",\
\
`  `className: "",\
\
`  `sizes: "100vw",\
\
`  `overlay: **false**,\
}

-----
# <a name="configuración-de-formularios"></a>47. CONFIGURACIÓN DE FORMULARIOS
Toda configuración de formularios debe vivir en:

meta.form

-----
## <a name="ejemplo-oficial"></a>Ejemplo oficial
meta: {\
`  `form: {\
`    `whatsappIntro:\
`      `"Hola, deseo más información.",\
`  `},\
}

-----
## <a name="uso"></a>Uso
Permite:

- personalizar mensajes;
- configurar formularios;
- integrar servicios futuros.
-----
# <a name="configuración-de-imágenes-de-fondo"></a>48. CONFIGURACIÓN DE IMÁGENES DE FONDO
Cuando una section utilice imagen de fondo:

-----
## <a name="background"></a>Background
background: {\
`  `type: "image",\
\
`  `variant: "dark-overlay",\
}

-----
## <a name="media"></a>Media
media: {\
`  `background: {\
`    `type: "image",\
\
`    `src: "/assets/images/hero.jpg",\
\
`    `alt: "Hero Background",\
`  `},\
\
`  `foreground: **null**,\
}

-----
## <a name="meta"></a>Meta
meta: {\
`  `overlay: **true**,\
\
`  `overlayOpacity: 0.55,\
}

-----
# <a name="configuración-de-tono-de-texto"></a>48.1 CONFIGURACIÓN DE TONO DE TEXTO (Corrección 2026-08)
Opcional. Permite que dos instancias de la misma Variant tengan colores de texto distintos e independientes entre sí.

meta: {\
`  `tone: "inverse",\
}

Valores oficiales: `"default"`, `"muted"`, `"inverse"`, `"accent"`, `"primary"`, `"secondary"`, `"brandPrimary"`, `"brandSecondary"`, `"brandAccent"`, `"danger"`.

Si se omite, el tono se infiere automáticamente: fondo de imagen o superficie oscura → `"inverse"`; en cualquier otro caso → `"default"`.

Solo aplica al eyebrow/título/descripción principal de la Section (`SectionHeader`/`Heading`/`Text` del header). No aplica a texto de items/cards individuales.

-----
# <a name="configuración-de-tamaño-de-texto"></a>48.2 CONFIGURACIÓN DE TAMAÑO DE TEXTO (Corrección 2026-08)
Opcional, mismo principio que `meta.tone` pero para tamaño en vez de color.

meta: {\
`  `typography: {\
`    `titleSize: "sm" **|** "md" **|** "lg" **|** "xl",\
\
`    `descriptionSize: "sm" **|** "md" **|** "lg",\
`  `},\
}

Si se omite, la Variant conserva su tamaño actual. Si se define, sobreescribe usando la escala tipográfica global de `globals.css` (nunca un valor arbitrario suelto). No controla line-height, tracking ni tipografía — la fuente del sitio es una decisión de Globals, no por instancia.

-----
# <a name="validación-de-ids"></a>49. VALIDACIÓN DE IDS
Una vez completados los archivos Data se deben validar todos los IDs.

-----
## <a name="validar-pages"></a>Validar Pages
Ejemplo:

sections: [\
`  `"home-hero",\
\
`  `"home-about",\
\
`  `"home-services",\
]

-----
## <a name="validar-sections"></a>Validar Sections
Debe existir:

{\
`  `id: "home-hero"\
}

{\
`  `id: "home-about"\
}

{\
`  `id: "home-services"\
}

-----
# <a name="validación-de-contratos"></a>50. VALIDACIÓN DE CONTRATOS
Verificar:

-----
## <a name="page-data"></a>Page Data
id\
slug\
enabled\
seo\
openGraph\
sections\
meta

-----
## <a name="section-data"></a>Section Data
id\
enabled\
component\
variant\
surface\
containerWidth\
spacing\
background\
content\
media\
items\
actions\
meta

-----
# <a name="validación-de-seo"></a>51. VALIDACIÓN DE SEO
Verificar:

-----
## <a name="site-seo"></a>Site SEO
defaultTitle\
\
defaultDescription\
\
canonical

-----
## <a name="page-seo"></a>Page SEO
title\
\
description\
\
canonical\
\
robots

-----
## <a name="opengraph"></a>OpenGraph
title\
\
description\
\
url\
\
images

-----
# <a name="validación-de-navegación"></a>52. VALIDACIÓN DE NAVEGACIÓN
Verificar:

navbar\
\
announcement\
\
footerNavigation

-----
## <a name="revisar"></a>Revisar
- enlaces;
- slugs;
- dropdowns;
- CTA principal.
-----
# <a name="validación-de-contenido"></a>53. VALIDACIÓN DE CONTENIDO
Verificar:

-----
## <a name="content-1"></a>Content
Contiene:

textos

-----
## <a name="media-1"></a>Media
Contiene:

imágenes

-----
## <a name="items"></a>Items
Contiene:

elementos repetitivos

-----
## <a name="actions"></a>Actions
Contiene:

CTA

-----
## <a name="meta-1"></a>Meta
Contiene:

configuración

-----
# <a name="validación-de-variants"></a>54. VALIDACIÓN DE VARIANTS
Antes de cerrar Data verificar:

Todas las variants existen

-----
## <a name="incorrecto-1"></a>Incorrecto
variant: "new-awesome-layout"

sin haber sido implementada.

-----
## <a name="correcto-1"></a>Correcto
Utilizar únicamente variants oficiales.

-----
# <a name="validación-de-backgrounds"></a>55. VALIDACIÓN DE BACKGROUNDS
Verificar:

Todas las sections deben contener:

background

-----
## <a name="incorrecto-2"></a>Incorrecto
{\
`  `component: "Hero"\
}

-----
## <a name="correcto-2"></a>Correcto
{\
`  `component: "Hero",\
\
`  `background: {\
`    `type: "image",\
\
`    `variant: "dark-overlay",\
`  `},\
}

-----
# <a name="anti-patrones"></a>56. ANTI-PATRONES
Prohibido:

-----
## <a name="jsx-en-data"></a>JSX en Data
**<div>**Texto**</div>**

-----
## <a name="imports-de-components"></a>Imports de Components
**import** HeroSection

-----
## <a name="tailwind-en-data"></a>Tailwind en Data
className:\
"text-center bg-red-500"

como mecanismo principal de diseño.

-----
## <a name="crear-variants-innecesarias"></a>Crear Variants innecesarias
Incorrecto:

hero-version-2\
\
hero-version-3\
\
hero-version-4

-----
## <a name="crear-sections-innecesarias"></a>Crear Sections innecesarias
Incorrecto:

HeroEmpresa\
\
HeroServicios\
\
HeroProductos

-----
# <a name="checklist-oficial-de-cierre"></a>57. CHECKLIST OFICIAL DE CIERRE
Antes de cerrar la instancia:

-----
## <a name="global"></a>Global
✔ site.data.js completo

✔ navigation.data.js completo

-----
## <a name="visual"></a>Visual
✔ globals.css configurado

✔ branding aplicado

-----
## <a name="pages"></a>Pages
✔ todos los page.data.js creados

✔ SEO configurado

✔ OpenGraph configurado

-----
## <a name="sections"></a>Sections
✔ todos los sections.data.js creados

✔ contrato respetado

✔ IDs validados

✔ backgrounds definidos

✔ variants definidas

-----
## <a name="contenido"></a>Contenido
✔ textos cargados

✔ imágenes cargadas

✔ CTA configurados

✔ FAQ configuradas

✔ legales configurados

-----
# <a name="criterio-de-cierre-de-instancia"></a>58. CRITERIO DE CIERRE DE INSTANCIA
La instancia se considera correctamente creada cuando:

El sitio puede describirse\
completamente desde DATA\
sin necesidad de modificar\
Sections ni Variants.

-----
# <a name="qué-sigue-después"></a>59. QUÉ SIGUE DESPUÉS
Una vez cerrada la capa Data:

NO se crean nuevas páginas.

NO se modifica contenido.

NO se agregan nuevas sections.

La siguiente etapa es:

Conectar la instancia\
al sistema de renderizado.

-----
# <a name="transición-al-manual-06"></a>60. TRANSICIÓN AL MANUAL 06
Entrada:

Data completa y validada

Salida esperada:

Instancia funcional\
renderizando correctamente.

-----
# <a name="cierre-oficial"></a>CIERRE OFICIAL
El proceso de creación de instancias finaliza cuando:

- la identidad del cliente está configurada;
- la navegación está configurada;
- todas las páginas existen;
- todas las sections existen;
- la arquitectura Data V2 está validada;
- el proyecto está listo para conectarse al sistema de render.

A partir de este punto comienza la etapa documentada en:

06-MANUAL-CONEXION-Y-RENDER.md

