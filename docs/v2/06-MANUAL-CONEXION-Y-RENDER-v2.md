# <a name="manual-conexion-y-render.md"></a>06-MANUAL-CONEXION-Y-RENDER.md
# <a name="template-cms-v2"></a>TEMPLATE CMS V2
## <a name="manual-de-conexión-y-render"></a>Manual de Conexión y Render
Versión: 2.0

Estado: OFICIAL

Fecha de consolidación: Junio 2026

-----
# <a name="objetivo-del-documento"></a>1. OBJETIVO DEL DOCUMENTO
Este documento define el procedimiento oficial para conectar una instancia ya creada mediante DATA al sistema real de renderizado de Template CMS V2.

El objetivo es:

- conectar Pages con Sections;
- conectar Sections con Components;
- validar el flujo completo de render;
- verificar Navbar y Footer;
- verificar Layout global;
- validar SEO;
- validar Assets;
- validar navegación;
- preparar la instancia para producción.

Este manual inicia cuando la instancia ya ha completado satisfactoriamente el proceso descrito en:

05-MANUAL-CREACION-DE-INSTANCIAS.md

-----
# <a name="filosofía-de-conexión"></a>2. FILOSOFÍA DE CONEXIÓN
Una instancia correctamente creada ya contiene:

site.data.js\
\
navigation.data.js\
\
\*.page.data.js\
\
\*.sections.data.js\
\
assets\
\
globals.css

Todavía no se considera funcional.

La instancia se considera funcional únicamente cuando:

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
GLOBALS\
↓\
RENDER

ha sido validado completamente.

-----
# <a name="entrada-oficial-del-proceso"></a>3. ENTRADA OFICIAL DEL PROCESO
La entrada oficial es:

Data validada

Lo que implica:

✔ Site Data completo

✔ Navigation Data completo

✔ Page Data completo

✔ Sections Data completo

✔ Assets cargados

✔ Branding configurado

✔ SEO configurado

-----
# <a name="resultado-esperado"></a>4. RESULTADO ESPERADO
Al finalizar este proceso la instancia debe:

✔ Renderizar correctamente

✔ Navegar correctamente

✔ Mostrar metadata correcta

✔ Compilar correctamente

✔ Generar build sin errores

✔ Estar lista para despliegue

-----
# <a name="arquitectura-de-render-oficial"></a>5. ARQUITECTURA DE RENDER OFICIAL
Flujo oficial:

Page Data\
↓\
Sections Data\
↓\
Section Router\
↓\
Variant\
↓\
UI Base\
↓\
Globals\
↓\
Render

-----
# <a name="responsabilidad-de-layout.js"></a>6. RESPONSABILIDAD DE LAYOUT.JS
layout.js es responsable de:

- metadata global;
- providers globales;
- Navbar;
- Footer;
- Floating WhatsApp;
- estructura principal del sitio.

No contiene contenido de páginas.

No contiene contenido de sections.

No contiene contenido comercial.

-----
# <a name="validación-de-layout.js"></a>7. VALIDACIÓN DE LAYOUT.JS
Verificar:

Navbar\
Footer\
FloatingWhatsapp\
children\
metadata

-----
## <a name="checklist"></a>Checklist
✔ Navbar renderiza

✔ Footer renderiza

✔ WhatsApp renderiza

✔ Metadata carga

✔ No existen errores de compilación

-----
# <a name="responsabilidad-de-page.js"></a>8. RESPONSABILIDAD DE PAGE.JS
page.js representa el punto de entrada del renderizado.

Su responsabilidad es:

- obtener Sections Data;
- recorrer sections;
- enviar props a los Components;
- renderizar en orden.

No contiene contenido.

No contiene datos de negocio.

-----
# <a name="flujo-de-page.js"></a>9. FLUJO DE PAGE.JS
Flujo esperado:

Sections Data\
↓\
map()\
↓\
section.component\
↓\
Component\
↓\
Render

-----
# <a name="validación-del-orden-de-render"></a>10. VALIDACIÓN DEL ORDEN DE RENDER
Verificar que el orden definido en:

\*.page.data.js

sea exactamente el orden visual observado.

Ejemplo:

Hero\
\
About\
\
Services\
\
Stats\
\
CTA

Debe coincidir con:

sections:[]

-----
# <a name="validación-de-ids"></a>11. VALIDACIÓN DE IDS
Todo ID declarado en:

sections:[]

debe existir en:

\*.sections.data.js

-----
## <a name="incorrecto"></a>Incorrecto
sections:[\
` `"home-services"\
]

sin que exista:

id:"home-services"

-----
## <a name="correcto"></a>Correcto
Coincidencia exacta.

-----
# <a name="validación-de-components"></a>12. VALIDACIÓN DE COMPONENTS
Cada section debe apuntar a un component válido.

Ejemplo:

component:"Hero"

component:"Services"

component:"FAQ"

-----
## <a name="verificar"></a>Verificar
✔ Component existe

✔ Component exporta correctamente

✔ Component renderiza

-----
# <a name="responsabilidad-del-section-router"></a>13. RESPONSABILIDAD DEL SECTION ROUTER
El Section Router recibe:

component\
variant

y decide qué implementación cargar.

Flujo:

Section Data\
↓\
Component\
↓\
Variant

-----
# <a name="validación-del-router"></a>14. VALIDACIÓN DEL ROUTER
Verificar:

✔ Todos los components son reconocidos

✔ No existen components huérfanos

✔ No existen imports rotos

✔ No existen rutas inexistentes

-----
# <a name="validación-de-variants"></a>15. VALIDACIÓN DE VARIANTS
Toda variant declarada debe existir.

Ejemplo:

variant:"background-image"

Debe existir una implementación real.

-----
## <a name="incorrecto-1"></a>Incorrecto
variant:"hero-awesome"

sin implementación.

-----
## <a name="correcto-1"></a>Correcto
Variant existente y documentada.

-----
# <a name="validación-de-props"></a>16. VALIDACIÓN DE PROPS
Cada section debe recibir:

content\
\
media\
\
items\
\
actions\
\
meta

según corresponda.

-----
## <a name="verificar-1"></a>Verificar
✔ content llega

✔ media llega

✔ items llegan

✔ actions llegan

✔ meta llega

-----
# <a name="validación-de-content"></a>17. VALIDACIÓN DE CONTENT
Comprobar:

✔ títulos visibles

✔ subtítulos visibles

✔ descriptions visibles

✔ textos completos

-----
# <a name="validación-de-media"></a>18. VALIDACIÓN DE MEDIA
Comprobar:

✔ imágenes cargan

✔ imágenes optimizadas

✔ alt presentes

✔ rutas correctas

-----
# <a name="validación-de-items"></a>19. VALIDACIÓN DE ITEMS
Comprobar:

✔ cards renderizan

✔ FAQ renderiza

✔ Stats renderiza

✔ Features renderiza

✔ Productos renderizan

-----
# <a name="validación-de-actions"></a>20. VALIDACIÓN DE ACTIONS
Comprobar:

✔ botones visibles

✔ enlaces funcionales

✔ CTA correctos

✔ target correcto

-----
# <a name="fin-parte-1"></a>FIN PARTE 1
La Parte 2 continuará con:

- validación de meta;
- overlays;
- formularios;
- Navbar;
- Footer;
- SEO;
- OpenGraph;
- navegación;
- build y despliegue.


-----
# <a name="validación-de-meta"></a>21. VALIDACIÓN DE META
El bloque:

meta

contiene configuración adicional utilizada por la section.

-----
## Verificar
✔ meta llega correctamente

✔ valores son interpretados

✔ no existen errores de lectura

✔ la section responde a la configuración

-----
# <a name="validación-de-overlays"></a>22. VALIDACIÓN DE OVERLAYS
Regla oficial V2:

Overlay pertenece a:

meta

-----
## <a name="ejemplo-correcto"></a>Ejemplo correcto
meta: {\
`  `overlay: **true**,\
\
`  `overlayOpacity: 0.55,\
}

-----
## Verificar
✔ overlay visible

✔ opacidad correcta

✔ overlay no tapa contenido

✔ contraste adecuado

-----
# <a name="validación-de-formularios"></a>23. VALIDACIÓN DE FORMULARIOS
Toda configuración de formularios debe provenir desde:

meta.form

-----
## <a name="ejemplo"></a>Ejemplo
meta: {\
`  `form: {\
`    `whatsappIntro:\
`      `"Hola, deseo más información."\
`  `}\
}

-----
## <a name="verificar-2"></a>Verificar
✔ mensaje correcto

✔ enlaces correctos

✔ datos correctos

✔ comportamiento esperado

-----
# <a name="validación-de-surface"></a>24. VALIDACIÓN DE SURFACE
Toda section debe responder a:

surface

-----
## <a name="verificar-3"></a>Verificar
### <a name="base"></a>base
Renderiza correctamente.
### <a name="subtle"></a>subtle
Presenta diferencia visual.
### <a name="strong"></a>strong
Presenta énfasis visual.

-----
# <a name="validación-de-containerwidth"></a>25. VALIDACIÓN DE CONTAINERWIDTH
Toda section debe responder a:

containerWidth

-----
## <a name="verificar-4"></a>Verificar
### <a name="content"></a>content
Ancho reducido.
### <a name="section"></a>section
Ancho estándar.
### <a name="wide"></a>wide
Ancho expandido.

-----
# <a name="validación-de-spacing"></a>26. VALIDACIÓN DE SPACING
Toda section debe responder a:

spacing

-----
## <a name="verificar-5"></a>Verificar
### <a name="compact"></a>compact
Espaciado corto.
### <a name="default"></a>default
Espaciado normal.
### <a name="hero"></a>hero
Espaciado amplio.

-----
# <a name="validación-de-background"></a>27. VALIDACIÓN DE BACKGROUND
Toda section debe responder a:

background

-----
## <a name="verificar-6"></a>Verificar
### <a name="surface"></a>surface
Renderiza correctamente.
### <a name="gradient"></a>gradient
Gradiente correcto.
### <a name="image"></a>image
Imagen correcta.

-----
# <a name="validación-de-imágenes-de-fondo"></a>28. VALIDACIÓN DE IMÁGENES DE FONDO
Cuando exista:

media.background

verificar:

✔ imagen carga

✔ ruta correcta

✔ responsive

✔ rendimiento correcto

-----
## <a name="verificar-además"></a>Verificar además
✔ overlay funciona

✔ contraste correcto

✔ texto legible

-----
# <a name="validación-de-imágenes-foreground"></a>29. VALIDACIÓN DE IMÁGENES FOREGROUND
Cuando exista:

media.foreground

verificar:

✔ carga

✔ proporción

✔ calidad

✔ responsive

✔ posición correcta

-----
# <a name="validación-del-contrato-image"></a>30. VALIDACIÓN DEL CONTRATO IMAGE
Verificar:

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

-----
## <a name="revisar"></a>Revisar
✔ src

✔ alt

✔ ratio

✔ fit

✔ radius

✔ objectPosition

✔ sizes

-----
# <a name="validación-de-responsive"></a>31. VALIDACIÓN DE RESPONSIVE
Verificar:
### <a name="mobile"></a>Mobile
320px\
375px\
390px\
414px

-----
### <a name="tablet"></a>Tablet
768px\
820px\
1024px

-----
### <a name="desktop"></a>Desktop
1280px\
1440px\
1920px

-----
# <a name="responsabilidad-de-navbar"></a>32. RESPONSABILIDAD DE NAVBAR
Navbar debe renderizar utilizando:

navigation.data.js

-----
## <a name="verificar-7"></a>Verificar
✔ logo

✔ menú

✔ dropdown

✔ CTA

✔ mobile menu

-----
# <a name="validación-de-navbar-variant"></a>33. VALIDACIÓN DE NAVBAR VARIANT
Si existe:

navbar.variant

verificar:

✔ variant reconocida

✔ variant implementada

✔ variant funcional

-----
# <a name="validación-de-menú-móvil"></a>34. VALIDACIÓN DE MENÚ MÓVIL
Verificar:

✔ abre

✔ cierra

✔ scroll correcto

✔ accesibilidad correcta

✔ navegación correcta

-----
# <a name="validación-de-dropdowns"></a>35. VALIDACIÓN DE DROPDOWNS
Verificar:

✔ despliegue

✔ navegación

✔ enlaces

✔ responsive

-----
# <a name="validación-de-cta-principal"></a>36. VALIDACIÓN DE CTA PRINCIPAL
Verificar:

✔ texto correcto

✔ href correcto

✔ estilo correcto

✔ comportamiento correcto

-----
# <a name="responsabilidad-de-footer"></a>37. RESPONSABILIDAD DE FOOTER
Footer utiliza:

navigation.data.js

y:

site.data.js

-----
## <a name="verificar-8"></a>Verificar
✔ branding

✔ navegación

✔ legales

✔ redes sociales

✔ copyright

-----
# <a name="validación-de-enlaces-internos"></a>38. VALIDACIÓN DE ENLACES INTERNOS
Verificar:

✔ Home

✔ About

✔ Services

✔ Contact

✔ FAQ

✔ Products

✔ Legales

-----
# <a name="validación-de-enlaces-externos"></a>39. VALIDACIÓN DE ENLACES EXTERNOS
Verificar:

✔ WhatsApp

✔ Facebook

✔ Instagram

✔ LinkedIn

✔ YouTube

✔ TikTok

-----
# <a name="validación-de-floating-whatsapp"></a>40. VALIDACIÓN DE FLOATING WHATSAPP
Verificar:

✔ aparece

✔ abre conversación

✔ número correcto

✔ mensaje correcto

-----
# <a name="validación-de-metadata-global"></a>41. VALIDACIÓN DE METADATA GLOBAL
Verificar que layout.js genere correctamente:

title\
\
description\
\
icons\
\
openGraph\
\
twitter

-----
# <a name="validación-de-site-data"></a>42. VALIDACIÓN DE SITE DATA
Comprobar:

✔ site

✔ branding

✔ contact

✔ social

✔ seo

✔ openGraph

✔ twitter

-----
# <a name="validación-de-page-seo"></a>43. VALIDACIÓN DE PAGE SEO
Cada página debe generar:

✔ title

✔ description

✔ canonical

✔ robots

-----
# <a name="validación-de-opengraph"></a>44. VALIDACIÓN DE OPENGRAPH
Verificar:

✔ título

✔ descripción

✔ imagen

✔ URL

-----
# <a name="validación-de-twitter"></a>45. VALIDACIÓN DE TWITTER
Verificar:

✔ card

✔ title

✔ description

✔ image

-----
# <a name="validación-de-favicons"></a>46. VALIDACIÓN DE FAVICONS
Verificar:

✔ favicon

✔ apple-touch-icon

✔ manifest

✔ iconos cargados

-----
# <a name="validación-de-indexación"></a>47. VALIDACIÓN DE INDEXACIÓN
Verificar:

robots\
canonical

correctamente configurados.

-----
# <a name="validación-de-rendimiento"></a>48. VALIDACIÓN DE RENDIMIENTO
Verificar:

✔ imágenes optimizadas

✔ assets correctos

✔ tamaños adecuados

✔ sin errores de consola

-----
# <a name="validación-de-accesibilidad"></a>49. VALIDACIÓN DE ACCESIBILIDAD
Verificar:

✔ alt en imágenes

✔ contraste

✔ navegación teclado

✔ labels

✔ jerarquía de headings

-----
# 50\. VALIDACIÓN FUNCIONAL GENERAL
Recorrer completamente el sitio.

Verificar:

✔ navegación

✔ imágenes

✔ formularios

✔ CTA

✔ contenido

✔ SEO

✔ responsive

