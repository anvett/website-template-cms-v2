# <a name="manual-maestro-data.md"></a>04-MANUAL-MAESTRO-DATA.md
# <a name="template-cms-v2"></a>TEMPLATE CMS V2
## <a name="manual-maestro-de-data"></a>MANUAL MAESTRO DE DATA
Versión: 2.0

Estado: OFICIAL

Fecha de consolidación: Junio 2026

-----
# <a name="objetivo-del-documento"></a>1. OBJETIVO DEL DOCUMENTO
Este documento define la arquitectura oficial de la capa DATA utilizada por Template CMS V2.

Su propósito es:

- estandarizar la estructura de datos del sistema;
- definir responsabilidades de cada archivo data;
- garantizar consistencia entre páginas y sections;
- evitar contenido hardcodeado dentro de components, variants o pages;
- facilitar la reutilización de la arquitectura en nuevas instancias;
- preparar el sistema para futura integración CMS;
- permitir automatización futura mediante agentes IA;
- mantener separación clara entre contenido, configuración y presentación.

Este documento prevalece sobre implementaciones anteriores relacionadas con la capa de datos.

-----
# <a name="filosofía-arquitectónica"></a>2. FILOSOFÍA ARQUITECTÓNICA
Template CMS V2 adopta una arquitectura modular basada en:

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

La capa DATA es el punto de partida de toda implementación.

La DATA define:

- qué contenido existe;
- qué páginas existen;
- qué sections usa cada página;
- qué component debe renderizar cada section;
- qué variant debe utilizar cada section;
- qué media, actions, items y configuración debe recibir cada section;
- qué metadata global o específica debe exponerse.

La DATA no debe resolver presentación visual directa.

La DATA describe.

Las PAGES organizan.

Las SECTIONS estructuran.

Los VARIANTS interpretan.

La UI BASE reutiliza.

GLOBALS aporta identidad visual.

-----
# <a name="responsabilidad-general-de-la-data"></a>3. RESPONSABILIDAD GENERAL DE LA DATA
La capa DATA es responsable de:

- contenido;
- configuración;
- assets;
- navegación;
- SEO;
- OpenGraph;
- metadata;
- orden de sections;
- selección de components;
- selección de variants;
- fondos;
- overlays;
- formularios configurables;
- acciones;
- elementos repetitivos;
- configuración visual permitida;
- comportamiento configurable.

La capa DATA no debe contener:

- JSX;
- componentes React;
- imports de UI;
- lógica de render;
- lógica de negocio compleja;
- estilos CSS;
- clases Tailwind como solución visual estructural;
- código específico de una section;
- implementación interna de variants.
-----
# <a name="estructura-oficial-de-data"></a>4. ESTRUCTURA OFICIAL DE DATA
La estructura oficial documentada en este manual comprende únicamente:

src/data/\
\
├─ global/\
│  ├─ site.data.js\
│  └─ navigation.data.js\
│\
├─ pages/\
│  ├─ home.page.data.js\
│  ├─ about-us.page.data.js\
│  ├─ services.page.data.js\
│  ├─ contact.page.data.js\
│  ├─ faq.page.data.js\
│  ├─ products.page.data.js\
│  ├─ installation.page.data.js\
│  ├─ technical-service.page.data.js\
│  ├─ water-pumps.page.data.js\
│  ├─ centralized-gas.page.data.js\
│  ├─ privacy-policy.page.data.js\
│  └─ terms-and-conditions.page.data.js\
│\
└─ sections/\
`   `├─ home.sections.data.js\
`   `├─ about-us.sections.data.js\
`   `├─ services.sections.data.js\
`   `├─ contact.sections.data.js\
`   `├─ faq.sections.data.js\
`   `├─ products.sections.data.js\
`   `├─ installation.sections.data.js\
`   `├─ technical-service.sections.data.js\
`   `├─ water-pumps.sections.data.js\
`   `├─ centralized-gas.sections.data.js\
`   `├─ privacy-policy.sections.data.js\
`   `└─ terms-and-conditions.sections.data.js

Este manual no documenta:

- reusable;
- placeholders;
- proceso de creación de nuevas instancias.

El proceso de creación de instancias será documentado en un manual independiente.

-----
# <a name="capas-data-oficiales"></a>5. CAPAS DATA OFICIALES
La capa DATA se divide en tres grupos principales:

global\
pages\
sections

Cada grupo tiene una responsabilidad distinta.

-----
## <a name="global"></a>5.1 global
Contiene información general del sitio y navegación global.

Archivos oficiales:

site.data.js\
navigation.data.js

-----
## <a name="pages"></a>5.2 pages
Contiene la configuración individual de cada página.

Archivos oficiales:

\*.page.data.js

Ejemplos:

home.page.data.js\
about-us.page.data.js\
services.page.data.js\
installation.page.data.js

-----
## <a name="sections"></a>5.3 sections
Contiene la configuración completa de las sections utilizadas por cada página.

Archivos oficiales:

\*.sections.data.js

Ejemplos:

home.sections.data.js\
about-us.sections.data.js\
services.sections.data.js\
installation.sections.data.js

-----
# <a name="site.data.js"></a>6. SITE.DATA.JS
## <a name="responsabilidad"></a>6.1 Responsabilidad
site.data.js contiene la configuración global del sitio.

Es responsable de:

- identidad base del sitio;
- nombre comercial;
- nombre legal;
- dominio;
- idioma;
- locale;
- branding textual global;
- información de contacto;
- dirección;
- horarios;
- redes sociales;
- SEO global;
- OpenGraph global;
- Twitter metadata;
- iconos;
- manifest;
- theme metadata.

No contiene contenido de sections.

No define orden de página.

No reemplaza los archivos \*.page.data.js.

No reemplaza los archivos \*.sections.data.js.

-----
## <a name="contrato-oficial-sugerido"></a>6.2 Contrato oficial sugerido
**export** **const** siteData = {\
`  `site: {},\
`  `branding: {},\
`  `contact: {},\
`  `address: {},\
`  `businessHours: {},\
`  `social: {},\
`  `seo: {},\
`  `openGraph: {},\
`  `twitter: {},\
`  `icons: {},\
`  `manifest: "",\
`  `themeMeta: {}\
};

-----
## <a name="bloque-site"></a>6.3 Bloque site
Responsable de la identidad técnica principal.

Ejemplo:

site: {\
`  `name: "Instamatic",\
`  `legalName: "Instamatic",\
`  `domain: "https://www.instamatic.com.ec",\
`  `language: "es",\
`  `locale: "es\_EC",\
}

Debe contener:

- name;
- legalName;
- domain;
- language;
- locale.
-----
## <a name="bloque-branding"></a>6.4 Bloque branding
Responsable de la identidad textual global.

Ejemplo:

branding: {\
`  `siteTitle: "Instamatic",\
`  `siteDescription:\
`    `"Calefones a gas eficientes, seguros y duraderos para hogares y negocios en Ecuador.",\
}

Puede utilizarse en:

- layout global;
- metadata;
- footer;
- cabeceras generales;
- fallback de contenido.

No debe reemplazar el contenido específico de sections.

-----
## <a name="bloque-contact"></a>6.5 Bloque contact
Responsable de datos generales de contacto.

Ejemplo:

contact: {\
`  `email: "",\
`  `phone: "",\
`  `whatsapp: "593912345678",\
}

Debe utilizarse para información global del sitio.

Si una section necesita un comportamiento específico de formulario, debe configurarse en meta.form dentro de la section correspondiente.

-----
## <a name="bloque-address"></a>6.6 Bloque address
Responsable de ubicación general.

Ejemplo:

address: {\
`  `country: "Ecuador",\
`  `city: "Quito",\
`  `fullAddress: "Quito, Ecuador",\
}

-----
## <a name="bloque-businesshours"></a>6.7 Bloque businessHours
Responsable de horarios generales.

Ejemplo:

businessHours: {\
`  `weekdays: "Lunes a viernes de 08h00 a 18h00",\
}

-----
## <a name="bloque-social"></a>6.8 Bloque social
Responsable de redes sociales globales.

Ejemplo:

social: {\
`  `facebook: "",\
`  `instagram: "",\
`  `linkedin: "",\
}

-----
## <a name="bloque-seo"></a>6.9 Bloque seo
Responsable de SEO global.

Ejemplo:

seo: {\
`  `defaultTitle: "Instamatic | Calefones a gas en Ecuador",\
`  `titleTemplate: "%s | Instamatic",\
`  `defaultDescription: "",\
`  `defaultKeywords: [],\
`  `canonical: "https://www.instamatic.com.ec",\
`  `robots: {\
`    `index: **true**,\
`    `follow: **true**,\
`  `},\
}

El SEO específico de cada página debe vivir en su archivo \*.page.data.js.

-----
## <a name="bloque-opengraph"></a>6.10 Bloque openGraph
Responsable de metadata social global.

Ejemplo:

openGraph: {\
`  `type: "website",\
`  `locale: "es\_EC",\
`  `url: "https://www.instamatic.com.ec",\
`  `siteName: "Instamatic",\
`  `title: "Instamatic | Calefones a gas en Ecuador",\
`  `description: "",\
`  `images: [\
`    `{\
`      `url: "/assets/images/instamatic/og-instamatic.jpg",\
`      `width: 1200,\
`      `height: 630,\
`      `alt: "Calefones a gas Instamatic en Ecuador",\
`    `},\
`  `],\
}

-----
## <a name="bloque-twitter"></a>6.11 Bloque twitter
Responsable de metadata para Twitter/X.

Ejemplo:

twitter: {\
`  `card: "summary\_large\_image",\
`  `site: "",\
`  `creator: "",\
`  `title: "",\
`  `description: "",\
`  `images: [],\
}

-----
## <a name="bloque-icons"></a>6.12 Bloque icons
Responsable de iconos globales.

Ejemplo:

icons: {\
`  `icon: "/favicon.ico",\
`  `shortcut: "/favicon-16x16.png",\
`  `apple: "/apple-touch-icon.png",\
}

-----
## <a name="bloque-manifest"></a>6.13 Bloque manifest
Responsable de definir el manifest del sitio.

Ejemplo:

manifest: "/site.webmanifest"

-----
## <a name="bloque-thememeta"></a>6.14 Bloque themeMeta
Responsable de metadata visual mínima del navegador.

Ejemplo:

themeMeta: {\
`  `themeColor: "#11418A",\
}

Este bloque no reemplaza globals.css.

La identidad visual principal sigue viviendo en:

globals.css\
variables CSS\
sections\
variants

-----
# <a name="navigation.data.js"></a>7. NAVIGATION.DATA.JS
## <a name="responsabilidad-1"></a>7.1 Responsabilidad
navigation.data.js contiene la navegación global del sitio.

Es responsable de:

- announcement bar;
- navbar;
- menú principal;
- dropdowns;
- CTA del navbar;
- configuración del menú móvil;
- sticky behavior;
- footer navigation;
- grupos de enlaces del footer;
- navegación legal;
- navegación secundaria.

No contiene contenido principal de pages.

No contiene contenido de sections internas.

-----
## <a name="contrato-oficial-sugerido-1"></a>7.2 Contrato oficial sugerido
**export** **const** navigationData = {\
`  `announcement: {},\
`  `navbar: {},\
`  `footerNavigation: {}\
};

-----
## <a name="announcement"></a>7.3 announcement
Responsable de mensajes globales superiores.

Ejemplo:

announcement: {\
`  `enabled: **false**,\
`  `text: "Calefones a gas Instamatic con instalación en Quito y Valles",\
`  `link: {\
`    `label: "Ver productos",\
`    `href: "/products",\
`  `},\
}

Debe contener:

- enabled;
- text;
- link.

Si no se utiliza, debe quedar desactivado mediante:

enabled: **false**

-----
## <a name="navbar"></a>7.4 navbar
Responsable de la navegación principal.

Ejemplo:

navbar: {\
`  `id: "main-navigation",\
`  `enabled: **true**,\
`  `variant: "logo-left-menu-right-dropdown-transparent",\
`  `content: {},\
`  `items: [],\
`  `actions: [],\
`  `meta: {}\
}

Debe contener:

- id;
- enabled;
- variant;
- content;
- items;
- actions;
- meta.
-----
## <a name="navbar.variant"></a>7.5 navbar.variant
El navbar también puede utilizar variants.

Ejemplo:

variant: "logo-left-menu-right-dropdown-transparent"

Esto permite que la navegación global evolucione hacia:

Navbar\
↓\
Router\
↓\
Variant

Ejemplos posibles:

logo-left-menu-right\
logo-left-menu-right-dropdown-transparent\
centered\
with-cta\
transparent

Las variants del navbar deben documentarse y mantenerse controladas.

No deben inventarse nombres sin necesidad real.

-----
## <a name="navbar.content"></a>7.6 navbar.content
Responsable del contenido principal del navbar.

Ejemplo:

content: {\
`  `logo: {\
`    `type: "image",\
`    `label: "Instamatic",\
`    `href: "/",\
`    `image: {\
`      `src: "/assets/images/instamatic/logo.png",\
`      `alt: "Logo Instamatic",\
`    `},\
`  `},\
}

Puede contener:

- logo textual;
- logo imagen;
- href principal;
- alt;
- label.
-----
## <a name="navbar.items"></a>7.7 navbar.items
Responsable de los enlaces principales.

Ejemplo link simple:

{\
`  `id: "nav-home",\
`  `label: "Inicio",\
`  `href: "/",\
`  `type: "link",\
}

Ejemplo dropdown:

{\
`  `id: "nav-services",\
`  `label: "Servicios",\
`  `href: "/services",\
`  `type: "dropdown",\
`  `children: [\
`    `{\
`      `id: "nav-service-installation",\
`      `label: "Instalación de calefones",\
`      `href: "/services/installation",\
`    `}\
`  `],\
}

Tipos permitidos:

link\
dropdown

-----
## <a name="navbar.actions"></a>7.8 navbar.actions
Responsable de acciones principales del navbar.

Ejemplo:

actions: [\
`  `{\
`    `id: "nav-primary-cta",\
`    `label: "Solicitar información",\
`    `href: "/contact",\
`    `variant: "primary",\
`  `},\
]

Debe utilizarse para:

- CTA principal;
- botón destacado;
- contacto;
- enlaces de conversión.
-----
## <a name="navbar.meta"></a>7.9 navbar.meta
Responsable de configuración funcional del navbar.

Ejemplo:

meta: {\
`  `mobileMenuEnabled: **true**,\
`  `sticky: **true**,\
}

Puede contener:

- mobileMenuEnabled;
- sticky;
- comportamiento futuro documentado.

No debe contener contenido principal.

-----
## <a name="footernavigation"></a>7.10 footerNavigation
Responsable de la navegación estructurada del footer.

Ejemplo:

footerNavigation: {\
`  `enabled: **true**,\
`  `groups: []\
}

-----
## <a name="footernavigation.groups"></a>7.11 footerNavigation.groups
Responsable de agrupar enlaces.

Ejemplo:

groups: [\
`  `{\
`    `id: "footer-company",\
`    `title: "Empresa",\
`    `links: [\
`      `{\
`        `id: "footer-home",\
`        `label: "Inicio",\
`        `href: "/",\
`      `}\
`    `],\
`  `}\
]

Cada grupo debe contener:

- id;
- title;
- links.

Cada link debe contener:

- id;
- label;
- href.
-----
# <a name="page-data"></a>8. PAGE DATA
## <a name="responsabilidad-2"></a>8.1 Responsabilidad
Los archivos \*.page.data.js definen páginas.

Son responsables de:

- identificar la página;
- definir slug;
- activar o desactivar la página;
- configurar SEO específico;
- configurar OpenGraph específico;
- definir el orden de sections;
- almacenar metadata propia de la página.

No contienen contenido principal de sections.

No contienen media de sections.

No contienen items de sections.

No contienen actions de sections.

No contienen implementación visual.

-----
## <a name="contrato-oficial-de-page-data"></a>8.2 Contrato oficial de Page Data
Todo archivo \*.page.data.js debe seguir este contrato:

**export** **const** pageData = {\
`  `id: "",\
`  `slug: "",\
`  `enabled: **true**,\
\
`  `seo: {},\
\
`  `openGraph: {},\
\
`  `sections: [],\
\
`  `meta: {}\
};

Ejemplo:

**export** **const** homePageData = {\
`  `id: "home",\
`  `slug: "/",\
`  `enabled: **true**,\
\
`  `seo: {\
`    `title: "Calefones Instamatic | Venta, instalación y mantenimiento en Quito",\
`    `description:\
`      `"Venta de calefones Instamatic, instalación profesional, mantenimiento técnico, sistemas de bombeo y gas centralizado en Quito y Valles.",\
`    `canonical: "https://www.instamatic.ec/",\
`    `robots: {\
`      `index: **true**,\
`      `follow: **true**,\
`    `},\
`  `},\
\
`  `openGraph: {\
`    `title: "Calefones Instamatic | Soluciones de agua caliente",\
`    `description:\
`      `"Más de 20 años ofreciendo calefones, instalación, mantenimiento y soluciones de agua caliente para hogares y negocios.",\
`    `url: "https://www.instamatic.ec/",\
`    `images: [\
`      `{\
`        `url: "/images/instamatic/og-home.jpg",\
`        `width: 1200,\
`        `height: 630,\
`        `alt: "Calefones Instamatic Ecuador",\
`      `},\
`    `],\
`  `},\
\
`  `sections: [\
`    `"home-hero",\
`    `"home-about",\
`    `"home-services-preview",\
`    `"home-products-preview",\
`    `"home-benefits",\
`    `"home-stats",\
`    `"home-cta",\
`  `],\
\
`  `meta: {\
`    `pageType: "marketing",\
`    `language: "es",\
`  `},\
};

-----
## <a name="id"></a>8.3 id
Identificador interno de la página.

Ejemplos:

id: "home"\
id: "about-us"\
id: "services"\
id: "installation"

Reglas:

- usar kebab-case;
- debe ser claro;
- debe representar la página;
- no debe duplicarse.
-----
## <a name="slug"></a>8.4 slug
Ruta pública de la página.

Ejemplos:

slug: "/"\
slug: "/about-us"\
slug: "/services"\
slug: "/services/installation"

Reglas:

- debe coincidir con la ruta real;
- debe iniciar con /;
- debe ser estable;
- no debe duplicarse.
-----
## <a name="enabled"></a>8.5 enabled
Permite activar o desactivar una página.

Ejemplo:

enabled: **true**

o:

enabled: **false**

Una página desactivada no debería quedar disponible en navegación ni renderizado final.

-----
## <a name="seo"></a>8.6 seo
Responsable del SEO específico de la página.

Ejemplo:

seo: {\
`  `title: "Servicios | Instamatic Ecuador",\
`  `description:\
`    `"Conoce nuestros servicios de instalación de calefones, mantenimiento técnico, sistemas de bombeo de agua y gas centralizado en Quito y Valles.",\
`  `canonical: "https://www.instamatic.ec/services",\
`  `robots: {\
`    `index: **true**,\
`    `follow: **true**,\
`  `},\
}

Debe contener:

- title;
- description;
- canonical;
- robots.
-----
## <a name="opengraph"></a>8.7 openGraph
Responsable de metadata social específica de la página.

Ejemplo:

openGraph: {\
`  `title: "Servicios | Instamatic Ecuador",\
`  `description:\
`    `"Soluciones profesionales para instalación, mantenimiento y sistemas complementarios de agua caliente.",\
`  `url: "https://www.instamatic.ec/services",\
`  `images: [\
`    `{\
`      `url: "/images/instamatic/og-services.jpg",\
`      `width: 1200,\
`      `height: 630,\
`      `alt: "Servicios Instamatic Ecuador",\
`    `},\
`  `],\
}

Debe contener:

- title;
- description;
- url;
- images.
-----
## <a name="sections-1"></a>8.8 sections
Define el orden de sections de la página.

Ejemplo:

sections: [\
`  `"services-hero",\
`  `"services-overview",\
`  `"services-grid",\
`  `"services-process",\
`  `"services-quote",\
`  `"services-cta",\
]

Reglas:

- cada id debe existir en el archivo \*.sections.data.js correspondiente;
- el orden del array es el orden de render;
- no se deben duplicar ids;
- no se deben dejar ids inexistentes;
- la page organiza, pero no define contenido interno de sections.
-----
## <a name="meta"></a>8.9 meta
Responsable de metadata propia de la página.

Ejemplo:

meta: {\
`  `pageType: "services",\
`  `language: "es",\
}

Puede contener:

- pageType;
- language;
- metadata futura necesaria.

No debe contener contenido principal de sections.

-----
# <a name="sections-data"></a>9. SECTIONS DATA
## <a name="responsabilidad-3"></a>9.1 Responsabilidad
Los archivos \*.sections.data.js contienen la configuración completa de las sections utilizadas por una página.

Son responsables de:

- contenido principal;
- media;
- items;
- actions;
- component;
- variant;
- surface;
- containerWidth;
- spacing;
- background;
- meta;
- overlays;
- formularios;
- configuración específica de section.
-----
## <a name="contrato-oficial-v2-de-section-data"></a>9.2 Contrato oficial V2 de Section Data
Toda section debe implementar este contrato:

{\
`  `id,\
`  `enabled,\
`  `component,\
`  `variant,\
`  `surface,\
`  `containerWidth,\
`  `spacing,\
`  `background,\
`  `content,\
`  `media,\
`  `items,\
`  `actions,\
`  `meta\
}

Este contrato es OFICIAL V2.

-----
## <a name="forma-completa-recomendada"></a>9.3 Forma completa recomendada
{\
`  `id: "",\
`  `enabled: **true**,\
`  `component: "",\
`  `variant: "",\
\
`  `surface: "base",\
`  `containerWidth: "section",\
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

La propiedad background forma parte obligatoria del contrato V2.

Si una section no utiliza fondo especial, debe declararse:

background: {\
`  `type: "surface",\
`  `variant: **null**,\
}

-----
# <a name="propiedades-del-contrato-section-data"></a>10. PROPIEDADES DEL CONTRATO SECTION DATA
-----
## <a name="id-1"></a>10.1 id
Identificador único de la section.

Ejemplo:

id: "home-hero"

Reglas:

- debe ser único dentro de la página;
- debe coincidir con el id declarado en page.data.js;
- usar kebab-case;
- debe indicar página y propósito.

Ejemplos correctos:

home-hero\
home-about\
services-grid\
installation-process\
about-values

-----
## <a name="enabled-1"></a>10.2 enabled
Controla si la section se renderiza.

Ejemplo:

enabled: **true**

o:

enabled: **false**

Debe usarse para desactivar temporalmente sections sin eliminarlas de la data.

-----
## <a name="component"></a>10.3 component
Define qué section debe utilizarse.

Ejemplo:

component: "Hero"

Componentes de section identificados:

Hero\
About\
Services\
Features\
CTA\
Stats\
Products\
Contact\
Comparison\
DualContent\
FAQ\
Quote\
Testimonials\
Legal

Regla:

component selecciona la familia de section.

No define por sí solo la presentación final.

-----
## <a name="variant"></a>10.4 variant
Define qué variant se utilizará dentro del component.

Ejemplo:

variant: "background-image"

Regla:

variant selecciona la experiencia visual específica dentro de una section.

-----
## <a name="surface"></a>10.5 surface
Define la intención visual base de fondo.

Opciones oficiales:

base\
subtle\
strong

Uso recomendado:

base   → fondo normal\
subtle → fondo suave o alterno\
strong → fondo destacado o de alto contraste

Ejemplo:

surface: "strong"

-----
## <a name="containerwidth"></a>10.6 containerWidth
Define el ancho principal de contenido.

Opciones oficiales:

content\
section\
wide

Uso recomendado:

content → textos centrados, legales, quotes, headers internos\
section → sections normales\
wide    → hero, layouts amplios, composiciones visuales

Ejemplo:

containerWidth: "section"

-----
## <a name="spacing"></a>10.7 spacing
Define la separación vertical de la section.

Opciones oficiales:

compact\
default\
hero

Uso recomendado:

compact → quote, stats, bloques cortos\
default → sections normales\
hero    → apertura o header principal

Ejemplo:

spacing: "default"

-----
## <a name="background"></a>10.8 background
Define el tipo real de fondo.

Contrato oficial:

background: {\
`  `type: "surface",\
`  `variant: **null**,\
}

Opciones oficiales de type:

surface\
gradient\
image

Opciones comunes de variant:

null\
soft\
dark\
brand\
dark-overlay

Regla oficial:

surface = intención visual base\
background = implementación real del fondo

-----
## <a name="content"></a>10.9 content
Contiene contenido textual principal.

Ejemplo:

content: {\
`  `eyebrow: "",\
`  `title: "",\
`  `description: "",\
}

-----
## <a name="media"></a>10.10 media
Contiene imágenes, videos, backgrounds y recursos multimedia.

Ejemplo:

media: {\
`  `background: **null**,\
`  `foreground: **null**,\
}

-----
## <a name="items"></a>10.11 items
Contiene elementos repetitivos.

Ejemplo:

items: []

-----
## <a name="actions"></a>10.12 actions
Contiene botones, enlaces y CTAs.

Ejemplo:

actions: []

-----
## <a name="meta-1"></a>10.13 meta
Contiene configuración adicional, comportamiento y parámetros visuales permitidos.

Ejemplo:

meta: {}

-----
# <a name="bloque-content"></a>11. BLOQUE CONTENT
## <a name="responsabilidad-4"></a>11.1 Responsabilidad
content es responsable de textos principales.

Puede contener:

- eyebrow;
- title;
- subtitle;
- description;
- quote;
- author;
- note;
- textos específicos de la section.

Ejemplo estándar:

content: {\
`  `eyebrow: "Servicios",\
`  `title: "Soluciones completas para agua caliente",\
`  `description:\
`    `"Contamos con servicios técnicos especializados para instalación, mantenimiento y sistemas complementarios.",\
}

Ejemplo Quote:

content: {\
`  `quote:\
`    `"Una instalación correcta es clave para que el calefón trabaje de forma segura.",\
`  `author: "Instamatic Ecuador",\
}

-----
## <a name="reglas"></a>11.2 Reglas
content debe contener:

- textos principales;
- títulos;
- descripciones;
- subtítulos;
- frases;
- contenido editorial.

content no debe contener:

- overlays;
- configuración de formularios;
- comportamiento;
- configuración de layout;
- arrays repetitivos extensos;
- imágenes;
- botones.
-----
# <a name="bloque-media"></a>12. BLOQUE MEDIA
## <a name="responsabilidad-5"></a>12.1 Responsabilidad
media es responsable de recursos multimedia.

Puede contener:

- imágenes de fondo;
- imágenes foreground;
- videos;
- embeds;
- recursos multimedia usados por la section.

Contrato base:

media: {\
`  `background: **null**,\
`  `foreground: **null**,\
}

-----
## <a name="media.background"></a>12.2 media.background
Se utiliza cuando la section necesita una imagen o recurso de fondo.

Ejemplo:

media: {\
`  `background: {\
`    `type: "image",\
`    `src: "/assets/images/instamatic/services-bg.jpg",\
`    `alt: "Servicios técnicos Instamatic",\
`  `},\
`  `foreground: **null**,\
}

Regla:

La imagen real vive en media.background.

El tipo de fondo vive en background.type.

El overlay vive en meta.

-----
## <a name="media.foreground"></a>12.3 media.foreground
Se utiliza cuando la imagen forma parte del contenido visual dentro del layout.

Ejemplo:

media: {\
`  `background: **null**,\
`  `foreground: {\
`    `type: "image",\
`    `src: "/assets/images/instamatic/about-story.jpg",\
`    `alt: "Historia de Instamatic Ecuador",\
`  `},\
}

-----
## <a name="regla-oficial-de-separación"></a>12.4 Regla oficial de separación
Correcto:

background: {\
`  `type: "image",\
`  `variant: "dark-overlay",\
},\
\
media: {\
`  `background: {\
`    `type: "image",\
`    `src: "/assets/images/instamatic/services-bg.jpg",\
`    `alt: "Servicios técnicos Instamatic",\
`  `},\
`  `foreground: **null**,\
},\
\
meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.55,\
}

Incorrecto:

media: {\
`  `background: {\
`    `src: "/assets/images/instamatic/services-bg.jpg",\
`    `overlay: **true**,\
`    `overlayOpacity: 0.55,\
`  `},\
}

-----
# <a name="regla-oficial-de-imágenes-configurables"></a>13. REGLA OFICIAL DE IMÁGENES CONFIGURABLES
Las imágenes deben configurarse desde DATA.

Contrato oficial:

image: {\
`  `src,\
`  `alt,\
`  `ratio,\
`  `fit,\
`  `radius,\
`  `objectPosition,\
`  `className,\
`  `sizes,\
`  `overlay\
}

La instancia decide.

El componente interpreta.

-----
## <a name="ejemplo-oficial"></a>13.1 Ejemplo oficial
image: {\
`  `src: "/assets/images/instamatic/products-combo.jpg",\
`  `alt: "Combos Instamatic 26L",\
`  `ratio: "portrait",\
`  `fit: "contain",\
`  `radius: "none",\
`  `objectPosition: "center center",\
`  `className: "h-[18rem] lg:h-[26rem]",\
`  `sizes: "(min-width: 1024px) 50vw, 100vw",\
`  `overlay: **false**,\
}

-----
## <a name="responsabilidad-de-cada-propiedad"></a>13.2 Responsabilidad de cada propiedad
### <a name="src"></a>src
Ruta del archivo.

Debe preferir:

/assets/...

-----
### <a name="alt"></a>alt
Texto alternativo de la imagen.

Debe ser descriptivo.

-----
### <a name="ratio"></a>ratio
Relación visual esperada.

Ejemplos:

auto\
square\
video\
portrait\
landscape

-----
### <a name="fit"></a>fit
Define comportamiento de ajuste.

Ejemplos:

cover\
contain

-----
### <a name="radius"></a>radius
Define radio visual.

Ejemplos:

none\
sm\
md\
lg\
xl

-----
### <a name="objectposition"></a>objectPosition
Define posición interna de la imagen.

Ejemplo:

objectPosition: "center center"

-----
### <a name="classname"></a>className
Permite ajuste puntual desde la instancia cuando el variant lo soporte.

Debe usarse con control.

No debe convertirse en sustituto de una variant.

-----
### <a name="sizes"></a>sizes
Define comportamiento responsive para imágenes optimizadas.

Ejemplo:

sizes: "(min-width: 1024px) 50vw, 100vw"

-----
### <a name="overlay"></a>overlay
Permite indicar si la imagen requiere overlay propio cuando el componente lo soporte.

Sin embargo, para overlays generales de section se debe usar:

meta.overlay\
meta.overlayOpacity

-----
# <a name="bloque-items"></a>14. BLOQUE ITEMS
## <a name="responsabilidad-6"></a>14.1 Responsabilidad
items contiene elementos repetitivos.

Puede utilizarse para:

- cards;
- features;
- faq;
- estadísticas;
- productos;
- beneficios;
- pasos;
- testimonios;
- comparaciones;
- valores;
- servicios;
- galerías;
- elementos legales repetitivos.

Ejemplo:

items: [\
`  `{\
`    `title: "Instalación de calefones",\
`    `description:\
`      `"Instalación profesional de calefones a gas con verificación del punto.",\
`    `href: "/services/installation",\
`  `},\
]

-----
## <a name="items-con-icon"></a>14.2 Items con icon
Ejemplo:

items: [\
`  `{\
`    `icon: "Flame",\
`    `title: "Instalación de calefones",\
`    `description:\
`      `"Instalación profesional de calefones a gas.",\
`    `href: "/services/installation",\
`  `},\
]

-----
## <a name="items-con-image"></a>14.3 Items con image
Ejemplo:

items: [\
`  `{\
`    `title: "Combos Instamatic 26L",\
`    `description:\
`      `"Combos que pueden incluir calefón, instalación básica y accesorios.",\
`    `href: "/products",\
`    `image: {\
`      `src: "/assets/images/instamatic/products-combo.jpg",\
`      `alt: "Combos Instamatic 26L",\
`      `ratio: "portrait",\
`      `fit: "contain",\
`      `radius: "none",\
`      `objectPosition: "center center",\
`      `className: "h-[18rem] lg:h-[26rem]",\
`      `sizes: "(min-width: 1024px) 50vw, 100vw",\
`      `overlay: **false**,\
`    `},\
`    `features: [\
`      `"Desde $299",\
`      `"Ideal para hasta 2 duchas",\
`      `"Opciones con instalación incluida",\
`    `],\
`  `},\
]

-----
## <a name="items-para-stats"></a>14.4 Items para Stats
Ejemplo:

items: [\
`  `{\
`    `value: "+20",\
`    `label: "años en el mercado",\
`    `description: "Trayectoria en Ecuador",\
`  `},\
]

-----
## <a name="items-para-testimonials"></a>14.5 Items para Testimonials
Ejemplo:

items: [\
`  `{\
`    `image: "/assets/images/instamatic/testimonials/test1.jpg",\
`    `name: "Cliente residencial",\
`    `title: "Hogar en Quito",\
`    `message:\
`      `"Elegimos Instamatic por su buen rendimiento.",\
`  `},\
]

-----
## <a name="reglas-1"></a>14.6 Reglas
items debe contener elementos repetitivos.

items no debe contener configuración general de section.

No usar items para overlays.

No usar items para configuración de formulario.

No usar items para metadata de página.

-----
# <a name="bloque-actions"></a>15. BLOQUE ACTIONS
## <a name="responsabilidad-7"></a>15.1 Responsabilidad
actions contiene botones, enlaces y CTAs.

Ejemplo:

actions: [\
`  `{\
`    `label: "Contactar ahora",\
`    `href: "/contact",\
`    `variant: "primary",\
`  `},\
]

-----
## <a name="propiedades-frecuentes"></a>15.2 Propiedades frecuentes
{\
`  `label: "",\
`  `href: "",\
`  `variant: ""\
}

Puede extenderse con:

id\
target\
rel\
ariaLabel

cuando sea necesario.

-----
## <a name="variants-de-actions"></a>15.3 Variants de actions
Las actions pueden usar variants del componente Button o Link.

Ejemplos:

primary\
secondary\
outline

La action no define la implementación visual interna.

Solo indica la intención del botón o enlace.

-----
## <a name="reglas-2"></a>15.4 Reglas
actions debe contener:

- botones;
- enlaces;
- CTAs.

actions no debe contener:

- cards;
- features;
- imágenes principales;
- contenido editorial;
- configuración de overlay;
- formularios.
-----
# <a name="bloque-meta"></a>16. BLOQUE META
## <a name="responsabilidad-8"></a>16.1 Responsabilidad
meta contiene configuración adicional.

Puede contener:

- overlays;
- formularios;
- alineación;
- comportamiento configurable;
- parámetros visuales permitidos;
- opciones específicas de variant;
- flags funcionales.

Ejemplo:

meta: {}

-----
## <a name="overlay-1"></a>16.2 Overlay
Regla oficial:

Incorrecto:

media.background.overlayOpacity

Correcto:

meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.7,\
}

-----
## <a name="formularios"></a>16.3 Formularios
La configuración de formularios debe vivir en:

meta.form

Ejemplo oficial:

meta: {\
`  `form: {\
`    `whatsappIntro:\
`      `"Hola, deseo más información."\
`  `}\
}

-----
## <a name="alineación"></a>16.4 Alineación
Cuando una variant permita configuración de alineación, puede declararse en meta.

Ejemplo:

meta: {\
`  `align: "right",\
}

Valores posibles según variant:

left\
center\
right

-----
## <a name="reglas-3"></a>16.5 Reglas
meta puede contener configuración.

meta no debe contener contenido principal.

Correcto:

meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.48,\
}

Incorrecto:

meta: {\
`  `title: "Título principal",\
`  `description: "Texto principal",\
}

-----
# <a name="background-oficial-v2"></a>17. BACKGROUND OFICIAL V2
## <a name="responsabilidad-9"></a>17.1 Responsabilidad
background define la implementación real del fondo de una section.

Forma oficial:

background: {\
`  `type: "surface",\
`  `variant: **null**,\
}

-----
## <a name="type"></a>17.2 type
Opciones oficiales:

surface\
gradient\
image

-----
## <a name="type-surface"></a>17.3 type surface
Se utiliza cuando la section usa únicamente la surface base.

Ejemplo:

background: {\
`  `type: "surface",\
`  `variant: **null**,\
}

-----
## <a name="type-gradient"></a>17.4 type gradient
Se utiliza cuando la section usa gradiente.

Ejemplo:

background: {\
`  `type: "gradient",\
`  `variant: "soft",\
}

Ejemplos de variants:

soft\
dark\
brand\
accent

-----
## <a name="type-image"></a>17.5 type image
Se utiliza cuando la section usa imagen de fondo.

Ejemplo:

background: {\
`  `type: "image",\
`  `variant: "dark-overlay",\
}

La imagen real debe vivir en:

media.background

-----
## <a name="imagen-de-fondo-overlay"></a>17.6 Imagen de fondo + overlay
Ejemplo oficial:

background: {\
`  `type: "image",\
`  `variant: "dark-overlay",\
},\
\
media: {\
`  `background: {\
`    `type: "image",\
`    `src: "/assets/images/instamatic/services-bg.jpg",\
`    `alt: "Servicios técnicos Instamatic",\
`  `},\
`  `foreground: **null**,\
},\
\
meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.55,\
}

-----
## <a name="gradiente-sin-imagen"></a>17.7 Gradiente sin imagen
Ejemplo oficial:

background: {\
`  `type: "gradient",\
`  `variant: "soft",\
},\
\
media: {\
`  `background: **null**,\
`  `foreground: **null**,\
},\
\
meta: {}

-----
## <a name="fondo-normal"></a>17.8 Fondo normal
Ejemplo oficial:

background: {\
`  `type: "surface",\
`  `variant: **null**,\
},\
\
media: {\
`  `background: **null**,\
`  `foreground: **null**,\
},\
\
meta: {}

-----
# <a name="sistema-de-variants-desde-data"></a>18. SISTEMA DE VARIANTS DESDE DATA
## <a name="responsabilidad-10"></a>18.1 Responsabilidad
La DATA selecciona qué variant debe utilizarse.

La implementación de la variant vive en la capa SECTIONS / VARIANTS.

Flujo oficial:

Data\
↓\
Section Router\
↓\
Variant\
↓\
UI Base\
↓\
Globals

-----
## <a name="component-variant"></a>18.2 component + variant
La combinación component + variant define qué bloque se renderiza y con qué experiencia visual.

Ejemplo:

component: "Comparison",\
variant: "split"

Interpretación:

ComparisonSection\
↓\
Router\
↓\
ComparisonSplit

-----
## <a name="ejemplos"></a>18.3 Ejemplos
component: "Hero",\
variant: "background-image"

component: "Hero",\
variant: "hero-internal"

component: "Services",\
variant: "cards-with-icons"

component: "Features",\
variant: "process-steps"

component: "CTA",\
variant: "background-image"

component: "Stats",\
variant: "split-highlight"

-----
## <a name="regla-oficial"></a>18.4 Regla oficial
La DATA no implementa variants.

La DATA únicamente declara:

variant: ""

La section debe resolver internamente qué variant cargar.

-----
## <a name="convenciones-de-nombres"></a>18.5 Convenciones de nombres
Los nombres de variants deben ser:

- claros;
- descriptivos;
- estables;
- en kebab-case;
- relacionados con la experiencia visual.

Ejemplos correctos:

background-image\
hero-internal\
cards-with-icons\
process-steps\
two-columns-gradient-image\
split-highlight\
categorized-faq\
content-list

Evitar:

variant1\
new\
test\
blue\
special\
otra-version

-----
## <a name="variants-en-navigation"></a>18.6 Variants en Navigation
Navigation también puede seleccionar variants.

Ejemplo:

navbar: {\
`  `variant: "logo-left-menu-right-dropdown-transparent"\
}

Esto permite evolucionar hacia:

Navbar\
↓\
Router\
↓\
Variant

-----
# <a name="relación-entre-page-data-y-sections-data"></a>19. RELACIÓN ENTRE PAGE DATA Y SECTIONS DATA
## <a name="regla-principal"></a>19.1 Regla principal
Cada id declarado en:

sections: []

dentro de un archivo \*.page.data.js debe existir en el archivo \*.sections.data.js correspondiente.

-----
## <a name="ejemplo-page"></a>19.2 Ejemplo Page
sections: [\
`  `"installation-hero",\
`  `"installation-description",\
`  `"installation-benefits",\
`  `"installation-process",\
`  `"installation-quote",\
`  `"installation-cta",\
]

-----
## <a name="ejemplo-sections"></a>19.3 Ejemplo Sections
{\
`  `id: "installation-hero",\
`  `enabled: **true**,\
`  `component: "Hero",\
`  `variant: "hero-internal",\
}

{\
`  `id: "installation-description",\
`  `enabled: **true**,\
`  `component: "About",\
`  `variant: "image-right",\
}

-----
## <a name="reglas-4"></a>19.4 Reglas
No deben existir:

- ids faltantes;
- ids duplicados;
- ids escritos diferente;
- sections en page que no existan en sections data;
- sections huérfanas sin decisión explícita.
-----
# <a name="ejemplo-completo-de-section-data"></a>20. EJEMPLO COMPLETO DE SECTION DATA
{\
`  `id: "home-services-preview",\
`  `enabled: **true**,\
`  `component: "Services",\
`  `variant: "grid-4",\
\
`  `surface: "subtle",\
`  `containerWidth: "section",\
`  `spacing: "default",\
\
`  `background: {\
`    `type: "image",\
`    `variant: "dark-overlay",\
`  `},\
\
`  `content: {\
`    `eyebrow: "Servicios",\
`    `title: "Soluciones completas para agua caliente, presión y gas",\
`    `description:\
`      `"Contamos con servicios técnicos especializados para instalación, mantenimiento, sistemas de bombeo y gas centralizado.",\
`  `},\
\
`  `media: {\
`    `background: {\
`      `type: "image",\
`      `src: "/assets/images/instamatic/services-bg.jpg",\
`      `alt: "Servicios técnicos Instamatic",\
`    `},\
`    `foreground: **null**,\
`  `},\
\
`  `items: [\
`    `{\
`      `title: "Instalación de calefones",\
`      `description:\
`        `"Instalación profesional de calefones a gas con verificación del punto, adaptación a baja presión y pruebas de funcionamiento.",\
`      `href: "/services/installation",\
`    `},\
`    `{\
`      `title: "Servicio técnico y mantenimiento",\
`      `description:\
`        `"Diagnóstico, reparación, limpieza profunda, revisión de piezas y mantenimiento preventivo o correctivo.",\
`      `href: "/services/technical-service",\
`    `},\
`  `],\
\
`  `actions: [\
`    `{\
`      `label: "Ver todos los servicios",\
`      `href: "/services",\
`      `variant: "primary",\
`    `},\
`  `],\
\
`  `meta: {\
`    `overlay: **true**,\
`    `overlayOpacity: 0.55,\
`  `},\
}

-----
# <a name="convenciones-oficiales"></a>21. CONVENCIONES OFICIALES
## <a name="naming-de-archivos"></a>21.1 Naming de archivos
Usar kebab-case.

Ejemplos:

home.page.data.js\
about-us.page.data.js\
technical-service.page.data.js\
centralized-gas.sections.data.js\
terms-and-conditions.sections.data.js

-----
## <a name="naming-de-exports"></a>21.2 Naming de exports
Usar camelCase descriptivo.

Ejemplos:

**export** **const** homePageData = {};\
**export** **const** aboutUsPageData = {};\
**export** **const** servicesPageData = {};\
**export** **const** installationSectionsData = [];

-----
## <a name="naming-de-ids"></a>21.3 Naming de ids
Usar kebab-case.

Ejemplos:

home-hero\
about-story\
services-grid\
installation-process

-----
## <a name="naming-de-components"></a>21.4 Naming de components
Usar PascalCase conceptual.

Ejemplos:

Hero\
About\
Services\
Features\
CTA\
Contact\
Comparison\
DualContent\
FAQ\
Legal

-----
## <a name="naming-de-variants"></a>21.5 Naming de variants
Usar kebab-case descriptivo.

Ejemplos:

background-image\
hero-internal\
cards-with-icons\
process-steps\
split-highlight\
content-list

-----
# <a name="reglas-oficiales"></a>22. REGLAS OFICIALES
## <a name="regla-data-first"></a>22.1 Regla Data First
Toda nueva implementación debe partir desde data.

No se debe construir una section visual sin antes definir su data mínima.

-----
## <a name="regla-de-contrato-completo"></a>22.2 Regla de contrato completo
Toda section debe respetar el contrato oficial V2.

{\
`  `id,\
`  `enabled,\
`  `component,\
`  `variant,\
`  `surface,\
`  `containerWidth,\
`  `spacing,\
`  `background,\
`  `content,\
`  `media,\
`  `items,\
`  `actions,\
`  `meta\
}

-----
## <a name="regla-de-background-obligatorio"></a>22.3 Regla de background obligatorio
background forma parte obligatoria del contrato V2.

Cuando no exista fondo especial:

background: {\
`  `type: "surface",\
`  `variant: **null**,\
}

-----
## <a name="regla-de-overlay"></a>22.4 Regla de overlay
El overlay debe vivir en meta.

Correcto:

meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.7,\
}

Incorrecto:

media: {\
`  `background: {\
`    `overlay: **true**,\
`    `overlayOpacity: 0.7,\
`  `},\
}

-----
## <a name="regla-de-formularios"></a>22.5 Regla de formularios
La configuración de formularios debe vivir en:

meta.form

Ejemplo:

meta: {\
`  `form: {\
`    `whatsappIntro:\
`      `"Hola, deseo más información."\
`  `}\
}

-----
## <a name="regla-de-page-data"></a>22.6 Regla de Page Data
Las pages solo organizan.

No contienen contenido principal de sections.

-----
## <a name="regla-de-sections-data"></a>22.7 Regla de Sections Data
Las sections contienen contenido y configuración.

No contienen implementación visual interna.

-----
## <a name="regla-de-variants"></a>22.8 Regla de Variants
La DATA selecciona la variant.

La capa VARIANTS implementa la experiencia visual.

-----
# <a name="anti-patrones"></a>23. ANTI-PATRONES
## <a name="prohibido-en-data"></a>Prohibido en DATA
- JSX;
- imports de components;
- lógica de render;
- funciones complejas;
- estilos CSS;
- hardcodes visuales no controlados;
- duplicación innecesaria;
- ids inconsistentes;
- variants inventadas sin aprobación;
- contenido principal dentro de meta;
- overlay dentro de media.background;
- formularios dentro de content;
- actions dentro de content;
- media dentro de content;
- sections sin background declarado.
-----
## <a name="evitar"></a>Evitar
- nombres genéricos;
- ids ambiguos;
- contenido duplicado entre page y sections;
- mezclar SEO global con SEO específico;
- crear demasiadas variants innecesarias;
- usar className como reemplazo de variants;
- usar meta para contenido editorial;
- usar items para configuración general.
-----
# <a name="checklist-de-validación-data"></a>24. CHECKLIST DE VALIDACIÓN DATA
Antes de cerrar la capa DATA de una página, validar:

- site.data.js existe y está completo.
- navigation.data.js existe y está completo.
- Cada página tiene su archivo \*.page.data.js.
- Cada página tiene su archivo \*.sections.data.js.
- Cada page tiene id, slug, enabled, seo, openGraph, sections, meta.
- Cada section respeta el contrato V2 completo.
- Cada section tiene background.
- Cada id en page.sections existe en sections.data.
- No hay ids duplicados.
- No hay JSX.
- No hay imports de UI.
- No hay lógica visual.
- No hay overlays dentro de media.
- No hay formularios fuera de meta.form.
- Las variants están nombradas correctamente.
- Las actions están dentro de actions.
- Los elementos repetitivos están dentro de items.
- Los textos principales están dentro de content.
- Las imágenes están dentro de media o image según corresponda.
-----
# <a name="roadmap-futuro"></a>25. ROADMAP FUTURO
La capa DATA queda preparada para:

- CMS desacoplado;
- panel administrativo;
- multiinstancia;
- generación automática de pages;
- generación automática de sections;
- generación asistida por IA;
- validación automática de contratos;
- migración hacia API;
- migración hacia base de datos;
- edición visual futura;
- administración de variants desde CMS.
-----
# <a name="estado-oficial-del-sistema-data"></a>26. ESTADO OFICIAL DEL SISTEMA DATA

|Elemento|Estado|
| :- | :- |
|site.data.js|Oficial|
|navigation.data.js|Oficial|
|\*.page.data.js|Oficial|
|\*.sections.data.js|Oficial|
|Section Data Contract V2|Oficial|
|background obligatorio|Oficial|
|meta.overlay|Oficial|
|meta.overlayOpacity|Oficial|
|meta.form.whatsappIntro|Oficial|
|component + variant|Oficial|
|reusable|Fuera de este manual|
|placeholders|Fuera de este manual|
|proceso de creación de instancias|Manual 05|

-----
# <a name="cierre-oficial"></a>CIERRE OFICIAL
Este documento establece la arquitectura oficial de la capa DATA en Template CMS V2.

Toda nueva página, section, variant o instancia debe respetar la estructura definida en este manual.

La DATA se consolida como la fuente única de contenido y configuración del sistema.

Regla final:

DATA describe.\
PAGES ordenan.\
SECTIONS estructuran.\
VARIANTS interpretan.\
UI BASE reutiliza.\
GLOBALS estiliza.

La calidad de la DATA determina la velocidad, consistencia y escalabilidad del framework.
