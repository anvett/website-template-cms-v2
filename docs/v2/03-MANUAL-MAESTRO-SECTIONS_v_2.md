# <a name="manual-maestro-sections.md"></a>03-MANUAL-MAESTRO-SECTIONS.md
# <a name="template-cms-v2"></a>TEMPLATE CMS V2
## <a name="manual-maestro-de-sections"></a>Manual Maestro de Sections
Versión: 2.0

Estado: OFICIAL

Fecha de consolidación: Junio 2026

-----
# <a name="objetivo-del-documento"></a>1. OBJETIVO DEL DOCUMENTO
Este documento define la arquitectura oficial de Sections utilizada por Template CMS V2.

Su propósito es:

- Estandarizar la construcción de nuevas sections.
- Garantizar consistencia visual.
- Garantizar consistencia estructural.
- Evitar deuda técnica.
- Facilitar la creación de nuevas instancias.
- Facilitar la evolución futura hacia CMS dinámico.

Este documento prevalece sobre implementaciones anteriores.

-----
# <a name="filosofía-arquitectónica"></a>2. FILOSOFÍA ARQUITECTÓNICA
Template CMS V2 adopta una arquitectura modular basada en:

DATA ↓ PAGES ↓ SECTIONS ↓ VARIANTS ↓ UI BASE ↓ GLOBALS

Cada capa tiene una responsabilidad claramente definida.

-----
# <a name="responsabilidades-del-sistema"></a>3. RESPONSABILIDADES DEL SISTEMA
## <a name="data"></a>DATA
Responsable de:

- contenido
- configuración
- assets
- comportamiento configurable

No contiene lógica visual.

-----
## <a name="pages"></a>PAGES
Responsable de:

- ensamblar páginas
- seleccionar sections
- ordenar sections

No contiene diseño.

-----
## <a name="sections"></a>SECTIONS
Responsables de:

- composición
- estructura
- layout general

Las sections no deben contener la implementación visual completa.

-----
## <a name="variants"></a>VARIANTS
Responsables de:

- experiencia visual
- distribución interna
- estilos específicos
- animaciones
- personalización visual

La mayor parte de la UI debe residir aquí.

-----
## <a name="ui-base"></a>UI BASE
Responsable de:

- componentes reutilizables

Ejemplos:

- Button
- Card
- Heading
- Text
- SectionHeader
- MediaFrame
- InfoItem
- Container
- Grid
- Accordion
- Modal
- Table
-----
## <a name="globals"></a>GLOBALS
Responsable de:

- tokens
- tipografía
- spacing
- containers
- helpers
- superficies
- gradientes
-----
# <a name="patrón-oficial-de-implementación"></a>4. PATRÓN OFICIAL DE IMPLEMENTACIÓN
Toda nueva section deberá seguir:

Section ↓ Router ↓ Variant ↓ UI Base

-----
## <a name="ejemplo"></a>Ejemplo
HeroSection ↓ HeroInternal

AboutSection ↓ AboutVariant

ComparisonSection ↓ ComparisonSplit

DualContentSection ↓ DualContentDefault

FAQSection ↓ CategorizedFAQ

-----
# <a name="contrato-oficial-de-section-data"></a>5. CONTRATO OFICIAL DE SECTION DATA
Toda section debe implementar el siguiente contrato:

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

Este contrato se considera OFICIAL V2.

-----
# <a name="responsabilidad-de-cada-bloque"></a>6. RESPONSABILIDAD DE CADA BLOQUE
## <a name="content"></a>content
Contiene:

- títulos
- subtítulos
- descripciones
- textos

Ejemplo:

content: {\
`  `eyebrow,\
`  `title,\
`  `description\
}

-----
## <a name="media"></a>media
Contiene:

- imágenes
- videos
- backgrounds
- recursos multimedia

Ejemplo:

media: {\
`  `background,\
`  `foreground\
}

-----
## <a name="items"></a>items
Contiene:

- cards
- features
- faq
- estadísticas
- productos
- elementos repetitivos
-----
## <a name="actions"></a>actions
Contiene:

- botones
- enlaces
- CTAs
-----
## <a name="meta"></a>meta
Contiene:

- configuración
- comportamiento
- overlays
- formularios
- parámetros visuales

Nunca contenido principal.

-----
# <a name="regla-oficial-de-overlay"></a>7. REGLA OFICIAL DE OVERLAY
Overlay queda estandarizado.

Incorrecto:

media.background.overlayOpacity

Correcto:

meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.7\
}

Implementado durante la auditoría en:

- Hero
- CTA
- Contact
- Comparison
- FAQ
- Legal
-----
# <a name="regla-oficial-de-tono-de-texto"></a>7.1 REGLA OFICIAL DE TONO DE TEXTO (Corrección 2026-08)
El color de texto del header principal de una Section (eyebrow/título/descripción) queda estandarizado vía `meta.tone`.

Incorrecto:

Hardcodear `tone="primary"` (o una clase de color fija) dentro de la Variant para el título/descripción principal.

Correcto:

meta: {\
`  `tone: "inverse"\
}

Resuelto por `resolveTone(data, bg)` en `@/lib/sections/sectionStyle.js`: usa `meta.tone` si está definido; si no, infiere `"inverse"` cuando hay imagen de fondo o superficie oscura, y `"default"` en el resto de los casos.

Motivo: antes, el color de texto de una Variant era fijo en el componente, por lo que cambiarlo afectaba a **todas** las instancias de esa Variant en el sitio. Con `meta.tone`, cada instancia (misma Variant, distinta Section Data) puede tener su propio color de texto sin afectar a las demás.

Complementa a `withSectionDefaults`/`withSectionsDefaults` (`@/lib/sections/sectionDefaults.js`), que precarga `media.background` y `meta.overlay`/`overlayOpacity` en toda Section Data, para que activar un fondo de imagen sea un cambio de una sola línea.

Implementado durante la auditoría de 2026-08 en las 22 Variants oficiales (Hero, About, Services, Features, CTA, Stats, Products, Contact, Comparison, DualContent, Legal, Partners, Team, Quote, Testimonials). Ver "Corrección 2026-08" en cada Section del catálogo.

Bugs reales encontrados y corregidos en el mismo pase:

- `ComparisonSplit`: forzaba texto claro (`inverse`) sin importar si el fondo resuelto era claro u oscuro.
- `PartnersLogoGrid`: `SectionHeader` se invocaba sin ningún `tone`, por lo que una instancia con imagen de fondo habría renderizado texto oscuro sobre imagen (invisible).
- `InfoOnly`: la descripción usaba `var(--color-primary)` en vez de `var(--color-text-soft)` en el caso sin imagen.

-----
# <a name="regla-oficial-de-tamaño-de-texto"></a>7.2 REGLA OFICIAL DE TAMAÑO DE TEXTO (Corrección 2026-08)
Mismo mecanismo que `meta.tone` (7.1), pero para tamaño de texto en vez de color: `meta.typography.titleSize`/`descriptionSize` (ver contrato completo en 05-MANUAL-CREACION-DE-INSTANCIAS-v2.md, sección 48.2). Resuelto por `resolveTypography(data)` en `sectionStyle.js`, con tres formas de aplicarlo según cómo la Variant arme su header, todas conviviendo en el mismo archivo:

- `getTitleSizeClass`/`getDescriptionSizeClass`: para Variants con `<h2>`/`<p>` propio (swap del bloque tipográfico completo — tamaño+peso+interlineado+tracking — nunca solo el font-size suelto, porque las clases globales `.text-h1`...`.text-body-sm` ya empaquetan las cuatro propiedades juntas).
- `getTitleLevel`/`getDescriptionTextSize`: para Variants que usan `SectionHeader`/`Heading`/`Text` — traduce el vocabulario de `meta.typography` al `level`/`size` que esos componentes ya aceptan.
- `getTitleSizeCssValue`/`getDescriptionSizeCssValue`: para Variants con el patrón CSS-var (`.section-title`/`.section-description` de `globals.css` vía inline style) — aquí sí es solo font-size, a propósito: ese patrón mantiene line-height/weight/tracking fijos porque no forman parte de lo que el CMS de contenido edita.

Implementado en las 22 Variants oficiales + Quote + Testimonials, igual alcance que 7.1. No agregado a los 8 archivos de `PartnersLogoGrid`/`TeamMemberGrid` item-level ni a categorías de FAQ (fuera de alcance — solo header principal de la Section).

-----
# <a name="regla-oficial-de-imágenes"></a>8. REGLA OFICIAL DE IMÁGENES
Las imágenes deben configurarse desde DATA.

Ejemplo:

image: {\
`  `src,\
`  `alt,\
`  `type,\
`  `ratio,\
`  `fit,\
`  `radius,\
`  `objectPosition,\
`  `className,\
`  `sizes,\
`  `overlay\
}

`type` (Corrección 2026-08): opcional, `"image"` (default) o `"video"`. `MediaFrame` ya soporta `type="video"` (poster/controls/autoplay/loop) — el gap era que las Variants que lo usan (`DualContentDefault`, `TeamMemberGrid`) no leían `image.type` de la instancia (una fijaba `type="image"` en código, la otra no pasaba `type` en absoluto). Ambas corregidas para leer `image.type || "image"`.

La instancia decide.

El componente interpreta.

-----
# <a name="mediaframe"></a>9. MEDIAFRAME
MediaFrame se considera el componente oficial para manejo de imágenes.

Preferencia:

MediaFrame ↓ img

Siempre que sea viable.

Su uso fue consolidado durante la auditoría de DualContent.

# <a name="parte-2-catálogo-oficial-de-sections"></a>PARTE 2 — CATÁLOGO OFICIAL DE SECTIONS
-----
# <a name="hero"></a>10. HERO
## <a name="estado"></a>Estado
OFICIAL V2

-----
## <a name="situación-inicial"></a>Situación inicial
Hero mantenía una arquitectura heredada basada en:

- HeroSection.css
- lógica visual dentro de HeroSection
- fuerte dependencia de CSS local
-----
## <a name="resultado-de-auditoría"></a>Resultado de auditoría
Migrado a:

HeroSection ↓ Router ↓ HeroInternal ↓ UI Base

-----
## <a name="responsabilidades"></a>Responsabilidades
HeroSection:

- selección de variant
- router

HeroInternal:

- implementación visual
- responsive
- composición
-----
## <a name="observaciones"></a>Observaciones
Se eliminó la dependencia principal de CSS local.

Los overlays pasaron a utilizar:

js id="fxfmh7" meta.overlay meta.overlayOpacity

Corrección 2026-06: `HeroBackgroundImage` mostraba la imagen de fondo siempre que `media.background.src` existiera, sin verificar `background.type === "image"`, e ignoraba `surface`/`containerWidth`/`spacing`. `HeroInternal` tenía el degradado oscuro y el ancho de contenedor (`content`) fijos en código, ignorando `surface`/`containerWidth`/`spacing` (esta variant usa siempre texto claro por diseño; `surface: "strong"` conserva el degradado decorativo). Ambas ahora respetan el contrato oficial completo.

Corrección 2026-08: ambas variants ahora resuelven `meta.tone` (ver [Regla Oficial de Tono de Texto](#regla-oficial-de-tono-de-texto)) en vez de forzar `"inverse"` sin posibilidad de override.

-----
# <a name="about"></a>11. ABOUT
## <a name="estado-1"></a>Estado
OFICIAL V2

-----
## <a name="situación-inicial-1"></a>Situación inicial
About mantenía:

- AboutSection.css
- lógica visual mezclada
-----
## <a name="resultado"></a>Resultado
AboutSection ↓ Router ↓ Variants

-----
## <a name="observaciones-1"></a>Observaciones
Las variants se convierten en responsables de:

- layout
- visualización
- composición

Corrección 2026-06: `AboutImageRight` y `AboutStackedCentered` tenían `surface`, `containerWidth` y `spacing` fijos en código (no leían el contrato). Ahora ambas usan el helper compartido `@/lib/sections/sectionStyle` para resolver `surface`/`background`/`spacing`/`containerWidth`. En `AboutStackedCentered` se mantuvo el bloque de texto centrado con `max-w-[760px]` anidado dentro del `section-container`, para no perder el diseño angosto original al introducir el ancho de contenedor del contrato.

Corrección 2026-08: ambas variants resuelven `meta.tone` vía `resolveTone`/`getToneTextClass` para el color del eyebrow/título/descripción.
-----
# <a name="services"></a>12. SERVICES
## <a name="estado-2"></a>Estado
OFICIAL V2

-----
## <a name="variant-principal"></a>Variant principal
ServicesCardsWithIcons

-----
## <a name="observaciones-2"></a>Observaciones
Durante la auditoría se consolidó como:

- reusable
- responsive
- alineada a UI Base

Corrección 2026-06: `ServicesCardsWithIcons` tenía `surface` (bg-soft), `containerWidth` (wide) y `spacing` fijos en código. Ahora usa `resolveBackground`/`getSpacingClass`/`getContainerClass` y soporta `background.type === "image"` con `meta.overlay`/`meta.overlayOpacity` igual que el resto del catálogo.

Corrección 2026-08: el `<SectionHeader>` se invocaba sin `tone`, lo que dejaba el título con color fijo (invisible sobre imagen de fondo). Ahora recibe `tone={resolveTone(data, bg)}`.

-----
## <a name="servicesgrid"></a>ServicesGrid (grid-2 / grid-3 / grid-4)
Variant alternativa para listados sin íconos.

Corrección 2026-06: ignoraba por completo `background`, `surface`, `containerWidth`, `spacing` y `meta.overlay` (forzaba un overlay blanco fijo sobre la imagen). Ahora respeta el contrato oficial: `background.type` ("image" | "gradient" | "surface") decide el fondo, y el overlay sobre imagen usa `meta.overlay` / `meta.overlayOpacity` igual que Hero/CTA/Comparison.

Corrección 2026-08: mismo caso que `ServicesCardsWithIcons` — `<SectionHeader>` sin `tone`. Corregido con `tone={resolveTone(data, {hasImage: hasBackgroundImage})}`.
-----
# <a name="features"></a>13. FEATURES
## <a name="estado-3"></a>Estado
OFICIAL V2

-----
## <a name="variants-oficiales"></a>Variants oficiales
### <a name="process-steps"></a>process-steps
Implementación orientada a procesos.

-----
### <a name="two-columns-gradient-image"></a>two-columns-gradient-image
Implementación orientada a:

- texto
- imagen
- gradiente
-----
### <a name="two-columns"></a>two-columns
Grid de 2 columnas de items con ícono (UI Base: iconos lucide-react mapeados desde `items[].icon`), sin imagen de fondo obligatoria.

Alias legacy soportado por el router: `icon-list` (mismo componente, mismo layout).

Corrección 2026-06: el componente vivía como implementación inline dentro de `FeaturesSection.jsx` (violación de capa Section/Variant) e ignoraba `background`, `surface`, `containerWidth`, `spacing` y `meta.overlay`. Se extrajo a `features/variants/two-columns/FeaturesTwoColumns.jsx` y ahora respeta el contrato oficial completo.

-----
## <a name="observaciones-3"></a>Observaciones
Features fue identificado como uno de los mejores ejemplos de la arquitectura V2.

Requiere únicamente:

- containers V2
- overlay V2
- tipografía V2

Corrección 2026-06: `process-steps` y `two-columns-gradient-image` mostraban la imagen de fondo solo si `media.background.src` existía (sin validar `background.type`) y tenían el overlay fijo en código (`bg-black/45` y `bg-black/62`), ignorando `meta.overlay`/`meta.overlayOpacity`, además de `containerWidth`/`spacing` fijos. Ambas variants (siempre con texto claro por diseño) ahora respetan `background.type === "image"` + overlay oficial, y `containerWidth`/`spacing` del contrato.

Corrección 2026-08: el tono de texto (antes `tone="inverse"` fijo en `Heading`/`Text`) ahora es `data.meta?.tone || "inverse"`, permitiendo override por instancia sin perder el default oscuro por diseño.
-----
# <a name="cta"></a>14. CTA
## <a name="estado-4"></a>Estado
OFICIAL V2

-----
## <a name="variant-oficial"></a>Variant oficial
background-image

-----
## <a name="hallazgos"></a>Hallazgos
Durante la auditoría se consolidó:

js id="jlm1pk" meta.overlay meta.overlayOpacity

como estándar.

-----
## <a name="responsabilidades-1"></a>Responsabilidades
La variant controla:

- background
- overlay
- responsive
- CTA

Corrección 2026-06: `CTABackgroundImage` ignoraba `surface`/`containerWidth`/`spacing` (fondo oscuro y ancho `content` fijos en código); el overlay ya usaba `meta.overlay`/`meta.overlayOpacity` correctamente. Ahora usa el helper compartido `resolveBackground` y respeta el contrato completo.

Corrección 2026-08: `tone` pasó de estar implícito a `data?.meta?.tone || "inverse"` explícito, consistente con el resto del catálogo (esta variant siempre usa fondo oscuro por diseño).
-----
# <a name="stats"></a>15. STATS
## <a name="estado-5"></a>Estado
OFICIAL V2

-----
## <a name="variants-oficiales-1"></a>Variants oficiales
### <a name="statsgrid"></a>StatsGrid
Visualización basada en grid.

-----
### <a name="statssplithighlight"></a>StatsSplitHighlight
Visualización destacada.

Corrección 2026-06: usaba clases canónicas (`section-shell`, `section-container--wide`) pero con `surface` (gradient-dark), `containerWidth` y `spacing` fijos en código en lugar de leerlos de la instancia. Ahora resuelve `background`/`surface`/`containerWidth`/`spacing` con el helper compartido, incluyendo soporte de `background.type === "image"` con `meta.overlay`/`meta.overlayOpacity`.

Corrección 2026-08: `Heading`/`Text` del header usaban `tone="inverse"` fijo; ahora usan `data.meta?.tone || "inverse"`.

-----
## <a name="observaciones-4"></a>Observaciones
Completamente alineado con:

- UI Base
- Containers V2
- Typography V2

Corrección 2026-06: StatsGrid leía la cantidad de columnas desde `meta.grid` (campo no documentado) en lugar de `data.variant` ("3-items" | "4-items"), y forzaba `gradient-dark` ignorando `background`/`surface`/`containerWidth`/`spacing`. Ahora el grid lo decide `variant` (se mantiene `meta.grid` como alias legacy) y el fondo respeta el contrato oficial, incluyendo `meta.overlay`/`meta.overlayOpacity` cuando `background.type` es `"image"`.

Corrección 2026-08: `StatsGrid` no tenía ninguna ruta de imagen de fondo (className hardcodeado a `gradient-dark`, sin `resolveBackground`). Se alineó al patrón estándar (imagen + overlay + `resolveTone`/`getToneCssColor` para título/descripción vía variables CSS).
-----
# <a name="products"></a>16. PRODUCTS
## <a name="estado-6"></a>Estado
OFICIAL V2

-----
## <a name="variants-oficiales-2"></a>Variants oficiales
### <a name="productcards"></a>ProductCards
Cards de producto.

-----
### <a name="partsgallery"></a>PartsGallery
Galería visual.

-----
## <a name="hallazgos-1"></a>Hallazgos
Correcciones realizadas:

- containers V2
- tipografía V2
- normalización de variables

Corrección 2026-06: `ProductCards` y `PartsGallery` tenían `surface` (gradient-soft), `containerWidth` (wide) y `spacing` fijos en código, sin soporte de `background.type === "image"`. Ahora ambas usan `resolveBackground`/`getSpacingClass`/`getContainerClass` y soportan imagen de fondo con `meta.overlay`/`meta.overlayOpacity`.

Corrección 2026-08: eyebrow/título/descripción de ambas ahora usan `resolveTone(data, bg)` + `getToneTextClass`/`getToneCssColor` en lugar de color fijo (`text-[var(--color-primary)]`/`text-[var(--color-text-soft)]`).
-----
# <a name="contact"></a>17. CONTACT
## <a name="estado-7"></a>Estado
OFICIAL V2

-----
## <a name="variants-oficiales-3"></a>Variants oficiales
### <a name="infoform"></a>InfoForm
Formulario + información.

-----
### <a name="infoonly"></a>InfoOnly
Información sin formulario.

-----
## <a name="hallazgo-importante"></a>Hallazgo importante
Se definió:

js id="zyh37x" meta.form.whatsappIntro

como mecanismo oficial para personalizar el mensaje inicial enviado por WhatsApp.

-----
## Ejemplo
js id="zyqltw" meta: {   form: {     whatsappIntro:       "Hola, deseo más información."   } }

-----
## <a name="corrección-2026-08"></a>Corrección 2026-08
`InfoForm` e `InfoOnly` ahora resuelven `meta.tone` para el eyebrow/título/descripción. En `InfoOnly` se corrigió además un bug real: la descripción usaba `var(--color-primary)` en el caso sin imagen de fondo, en vez de `var(--color-text-soft)` (color equivocado, no solo falta de independencia por instancia).

-----
# <a name="comparison"></a>18. COMPARISON
## <a name="estado-8"></a>Estado
OFICIAL V2

-----
## <a name="variant-oficial-1"></a>Variant oficial
ComparisonSplit

-----
## <a name="resultado-de-auditoría-1"></a>Resultado de auditoría
Comparison pasó de:

Implementación única

a:

ComparisonSection ↓ Router ↓ ComparisonSplit

-----
## <a name="observaciones-5"></a>Observaciones
Overlay alineado a:

js id="n3dxtl" meta.overlay meta.overlayOpacity

Corrección 2026-06: `ComparisonSplit` ignoraba `surface`/`containerWidth`/`spacing` (fondo oscuro y ancho `wide` fijos en código); el overlay sobre imagen ya usaba `meta.overlay`/`meta.overlayOpacity`. Ahora `background.type === "surface"` habilita las clases `surface-base`/`subtle`/`strong`, y `containerWidth`/`spacing` se leen de la instancia.

Corrección 2026-08 (bug real): el texto se forzaba a `inverse` (blanco) sin importar si el fondo resuelto era claro (`surface-base`/`subtle`) u oscuro — en superficies claras el texto quedaba ilegible. Ahora usa `resolveTone(data, { hasImage: !isSurface })`.

-----
# <a name="dual-content"></a>19. DUAL CONTENT
## <a name="estado-9"></a>Estado
OFICIAL V2

-----
## <a name="variant-oficial-2"></a>Variant oficial
DualContentDefault

-----
## <a name="hallazgo-más-importante"></a>Hallazgo más importante
Se estableció la regla oficial para imágenes configurables desde DATA.

-----
## <a name="configuración"></a>Configuración
js id="cnj36q" image: {   src,   alt,   ratio,   fit,   radius,   objectPosition,   className,   sizes,   overlay }

-----
## <a name="resultado-1"></a>Resultado
La instancia controla.

El componente interpreta.

Corrección 2026-06: `DualContentDefault` ya leía `containerWidth`/`spacing` correctamente, pero no soportaba `surface` (siempre `bg-[var(--color-bg)]` cuando `background.type` no era `gradient`) ni `background.type === "image"` (no existía ninguna ruta de renderizado de imagen de fondo). Ahora soporta `surface` y la imagen de fondo con `meta.overlay`/`meta.overlayOpacity`.

Corrección 2026-08: el header de la Section (no las cards internas, que siguen sobre fondo blanco fijo) ahora usa `data.meta?.tone || (isDark ? "inverse" : "default")` vía variables CSS en vez de color fijo.

-----
# <a name="faq"></a>20. FAQ
## <a name="estado-10"></a>Estado
OFICIAL V2

-----
## <a name="variant-oficial-3"></a>Variant oficial
CategorizedFAQ

-----
## <a name="resultado-de-auditoría-2"></a>Resultado de auditoría
Se aprobó una nueva UX.

-----
## <a name="situación"></a>Situación
La nueva implementación no replica exactamente la UX histórica.

Sin embargo:

- mantiene funcionalidad
- mejora estructura
- mejora experiencia
-----
## <a name="decisión-oficial"></a>Decisión oficial
Nueva UX aprobada.

Corrección 2026-08: el header principal de `CategorizedFAQ` ahora usa `resolveTone(data, { hasImage: isImageBackground })` (los botones de categoría activos son un estilo distinto, fuera de este alcance).

-----
# <a name="quote"></a>21. QUOTE
## <a name="estado-11"></a>Estado
OFICIAL V2

-----
## <a name="arquitectura"></a>Arquitectura
Implementación única.

-----
## <a name="observación"></a>Observación
Actualmente no requiere variants.

Si aparecen múltiples estilos de Quote:

QuoteSection ↓ Router ↓ Variants

-----
## <a name="prioridad"></a>Prioridad
Baja.

Corrección 2026-06: `QuoteSection` tenía `surface` fijo en código (`gradient-soft-inverse`), sin soporte de `background.type === "image"`. `containerWidth`/`spacing` ya se leían de la instancia. Ahora usa el helper compartido `resolveBackground` y soporta imagen de fondo con `meta.overlay`/`meta.overlayOpacity`.

Corrección 2026-08 (bug real): la cita (`blockquote`) y el autor tenían color fijo `text-[var(--color-primary)]`/`text-[var(--color-text-soft)]` sin importar el fondo — sobre `surface: "strong"` o imagen habría quedado ilegible. Ahora usan `resolveTone(data, bg)` + `getToneTextClass`.

-----
# <a name="testimonials"></a>22. TESTIMONIALS
## <a name="estado-12"></a>Estado
OFICIAL V2

-----
## <a name="arquitectura-actual"></a>Arquitectura actual
Implementación única.

-----
## <a name="observación-1"></a>Observación
Actualmente no requiere separación en variants.

-----
## <a name="evolución-futura"></a>Evolución futura
Cuando exista una segunda presentación:

TestimonialsSection ↓ Router ↓ Variants

-----
## <a name="prioridad-1"></a>Prioridad
Media.

Corrección 2026-06: `TestimonialsSection` mostraba la imagen de fondo siempre que `media.background.src` existiera, sin validar `background.type === "image"`, y tenía `spacing` fijo en código (`containerWidth` y el overlay ya usaban el contrato correctamente). Ahora la imagen solo se muestra cuando `background.type === "image"`, y `spacing` se lee de la instancia.

Corrección 2026-08: título/descripción del header usaban valores de color fijos en las variables CSS (`--section-title-color`/`--section-description-color`). Ahora se resuelven con `meta?.tone || "inverse"` (esta variant siempre usa fondo oscuro por diseño) vía `getToneCssColor`.

-----
# <a name="legal"></a>23. LEGAL
## <a name="estado-13"></a>Estado
OFICIAL V2

-----
## <a name="variant-oficial-4"></a>Variant oficial
ContentList

-----
## <a name="responsabilidad"></a>Responsabilidad
Visualización de:

- políticas
- términos
- documentos legales
-----
## <a name="hallazgos-2"></a>Hallazgos
Migrado a:

- containers V2
- overlays V2
- typography V2

Corrección 2026-08: `ContentList` resuelve `meta.tone` para el eyebrow/título/descripción vía `getToneCssColor`. Nota: el archivo conserva ~146 líneas de una implementación anterior comentada por completo (dead code), fuera de alcance de esta corrección — pendiente de limpieza en una futura pasada.
-----
# <a name="partners"></a>23.1 PARTNERS (agregado 2026-08 — no cubierto por la auditoría original)
## Estado
OFICIAL V2

-----
## Variant oficial
logo-grid (`PartnersLogoGrid`)

-----
## Observaciones
Marquee de logos de marcas/clientes aliadas.

Corrección 2026-08 (bug real): el `<SectionHeader>` se invocaba sin `tone`, por lo que una instancia con imagen de fondo habría renderizado el título/descripción con color oscuro sobre imagen (ilegible). Corregido con `tone={resolveTone(data, bg)}`.

-----
# <a name="team"></a>23.2 TEAM (agregado 2026-08 — no cubierto por la auditoría original)
## Estado
OFICIAL V2

-----
## Variant oficial
member-grid (`TeamMemberGrid`)

-----
## Observaciones
Grid de tarjetas de miembros del equipo (foto, credencial, teléfono, email).

Corrección 2026-08: mismo patrón que Partners — `<SectionHeader>` sin `tone`. Corregido con `tone={resolveTone(data, bg)}`. Las tarjetas individuales (nombre/rol/contacto) permanecen sobre fondo blanco fijo (`Card surface="base"`), fuera del alcance de `meta.tone` (solo aplica al header principal de la Section).

-----
# <a name="navbar"></a>24. NAVBAR
## <a name="estado-14"></a>Estado
OFICIAL V2

-----
## <a name="observación-importante"></a>Observación importante
Navbar es considerado:

Layout Global

No Section.

-----
## <a name="situación-actual"></a>Situación actual
Funcionalmente estable.

No requiere cambios inmediatos.

-----
## <a name="arquitectura-objetivo"></a>Arquitectura objetivo
Navbar ↓ Router ↓ Variants

Ejemplo:

NavbarDefault

NavbarTransparentDropdown

-----
## <a name="prioridad-2"></a>Prioridad
Baja.

-----
# <a name="footer"></a>25. FOOTER
## <a name="estado-15"></a>Estado
OFICIAL V2

-----
## <a name="clasificación"></a>Clasificación
Layout Global

-----
## <a name="hallazgos-3"></a>Hallazgos
Footer ya se encontraba:

- data driven
- reusable
- desacoplado
-----
## <a name="correcciones-realizadas"></a>Correcciones realizadas
- containers V2
- copyright dinámico
- normalización de bordes
-----
## <a name="observación-2"></a>Observación
No requiere variants actualmente.

-----
# <a name="estado-final-de-auditoría"></a>26. ESTADO FINAL DE AUDITORÍA
## <a name="sections-auditadas"></a>Sections auditadas
✔ Hero

✔ About

✔ Services

✔ Features

✔ CTA

✔ Stats

✔ Products

✔ Contact

✔ Comparison

✔ DualContent

✔ FAQ

✔ Quote

✔ Testimonials

✔ Legal

✔ Partners (2026-08)

✔ Team (2026-08)

-----
## <a name="layout-global-auditado"></a>Layout Global auditado
✔ Navbar

✔ Footer

-----
# <a name="resultado-final"></a>27. RESULTADO FINAL
Template CMS V2 queda oficialmente consolidado bajo una arquitectura basada en:

Section ↓ Router ↓ Variant ↓ UI Base ↓ Globals

Con todas las sections principales auditadas, corregidas y alineadas a los lineamientos definidos durante la revisión integral del framework.

