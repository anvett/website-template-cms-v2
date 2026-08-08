# <a name="claude.md"></a>CLAUDE.md
# <a name="template-cms-v2"></a>TEMPLATE CMS V2
## <a name="estado-del-proyecto"></a>Estado del Proyecto
La arquitectura de Template CMS V2 está cerrada, auditada y aprobada.

No debe ser reinterpretada.

No debe ser simplificada.

No debe ser reemplazada.

Claude debe trabajar respetando la documentación oficial del proyecto.

-----
# <a name="arquitectura-oficial"></a>Arquitectura Oficial
DATA ↓ PAGES ↓ SECTIONS ↓ VARIANTS ↓ UI BASE ↓ GLOBALS

-----
# <a name="principio-fundamental"></a>Principio Fundamental
La arquitectura ya está resuelta.

Claude no diseña arquitectura.

Claude implementa arquitectura.

-----
# <a name="fuente-oficial-de-verdad"></a>Fuente Oficial de Verdad
Toda decisión debe basarse en la documentación oficial ubicada en:

docs/\
\
01-MANUAL-MAESTRO-SISTEMA.md\
\
02-MANUAL-MAESTRO-UI-BASE.md\
\
03-MANUAL-MAESTRO-SECTIONS.md\
\
04-MANUAL-MAESTRO-DATA.md\
\
05-MANUAL-CREACION-DE-INSTANCIAS.md\
\
06-MANUAL-CONEXION-Y-RENDER.md\
\
07-MANUAL-MAESTRO-VARIANTS.md\
\
08-GUIA-OFICIAL-IA-Y-ASISTENTES-DE-DESARROLLO.md

Si existe conflicto entre código y documentación:

La documentación prevalece.

-----
# <a name="responsabilidades-oficiales"></a>Responsabilidades Oficiales
## <a name="data"></a>DATA
Describe contenido y configuración.

Responsable de:

- content
- media
- items
- actions
- meta

Nunca implementación visual.

-----
## <a name="pages"></a>PAGES
Organizan el sitio.

Responsables de:

- slug
- seo
- openGraph
- sections

Nunca contenido principal.

-----
## <a name="sections"></a>SECTIONS
Representan familias funcionales.

Ejemplos:

- Hero
- About
- Services
- Features
- FAQ
- CTA
- Contact
- Comparison
- Content

Las Sections organizan.

No contienen contenido hardcodeado.

-----
## <a name="variants"></a>VARIANTS
Interpretan visualmente una Section.

Las Variants:

- reciben Data
- utilizan UI Base
- construyen layouts

Nunca contienen contenido comercial.

Nunca contienen imágenes reales del cliente.

Nunca contienen textos hardcodeados.

-----
## <a name="ui-base"></a>UI BASE
Construye componentes reutilizables.

Ejemplos:

- Container
- Heading
- Text
- Button
- Card
- MediaFrame
- SectionHeader
- InfoItem

Nunca contiene contenido del cliente.

-----
## <a name="globals"></a>GLOBALS
Controla:

- colores
- tipografías
- gradientes
- spacing
- containers
- variables CSS

No controla contenido.

-----
# <a name="contrato-oficial-de-section-data"></a>Contrato Oficial de Section Data
Toda Section debe respetar:

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

No alterar este contrato.

-----
# <a name="reglas-oficiales"></a>Reglas Oficiales
## <a name="overlay"></a>Overlay
Incorrecto:

media.background.overlay

Correcto:

meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.7\
}

-----
## <a name="background-por-defecto"></a>Background por Defecto
Toda Section Data debe pasar por `withSectionDefaults` / `withSectionsDefaults` (`src/lib/sections/sectionDefaults.js`) al construirse.

Esto garantiza que **toda** instancia, sin importar el `background.type` elegido, ya tenga precargado:

media: {\
`  `background: { src: "", alt: "" }\
}

meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.6\
}

Objetivo: cambiar una Section a fondo de imagen debe ser un cambio de una sola línea (`background.type: "image"` + `media.background.src`), nunca requerir agregar overlay o estructura desde cero.

No eliminar estos defaults al crear nuevas Sections Data. No reinventar esta lógica dentro de una Variant: la resuelve `resolveBackground` en `sectionStyle.js`.

-----
## <a name="formularios"></a>Formularios
Siempre:

meta.form

Ejemplo:

meta: {\
`  `form: {\
`    `whatsappIntro:\
`      `"Hola, deseo más información."\
`  `}\
}

-----
## <a name="imágenes"></a>Imágenes
Siempre configurables desde Data.

Contrato:

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

`type` es opcional: `"image"` (default si se omite) o `"video"` — soportado por `MediaFrame` (UI Base). Si una Variant usa `MediaFrame`, debe leer `image.type` de la instancia (`type={image.type || "image"}`), nunca fijarlo en código.

-----
## <a name="surface"></a>Surface
Opciones oficiales:

base\
subtle\
strong

-----
## <a name="containerwidth"></a>ContainerWidth
Opciones oficiales:

content\
section\
wide

-----
## <a name="spacing"></a>Spacing
Opciones oficiales:

compact\
default\
hero

-----
## <a name="background"></a>Background
background: {\
`  `type,\
`  `variant\
}

Tipos oficiales:

surface\
gradient\
image

-----
## <a name="tono-de-texto"></a>Tono de Texto (meta.tone)
El color del texto (eyebrow/título/descripción) de una Section **nunca** debe estar hardcodeado dentro de la Variant. Debe resolverse por instancia, vía:

meta: {\
`  `tone: "inverse" **|** "default" **|** "muted" **|** "accent" **|** "primary" **|** "secondary" **|** "brandPrimary" **|** "brandSecondary" **|** "brandAccent" **|** "danger"\
}

Comportamiento:

- Si `meta.tone` está definido: se usa ese tono, sin importar el background.
- Si `meta.tone` no está definido: se infiere automáticamente (`resolveTone` en `sectionStyle.js`) — fondo de imagen o superficie oscura → `"inverse"`, en cualquier otro caso → `"default"`.
- Variants que por diseño siempre usan fondo oscuro (ej. Testimonials, StatsSplitHighlight) infieren `"inverse"` como base, pero igual respetan `meta.tone` si se especifica.

Esto permite que dos instancias de la misma Variant (ej. Services/cards-with-icons en dos páginas distintas) tengan colores de texto independientes, sin que cambiar una afecte a la otra.

No hardcodear `text-[var(--color-primary)]` ni `tone="primary"` fijo en una Variant para el título/descripción principal de la Section. Usar `resolveTone(data, bg)` + `getToneTextClass`/`getToneCssColor`, o pasar `tone` a `SectionHeader`/`Heading`/`Text`.

Item-level (título/descripción dentro de cards individuales sobre fondo blanco fijo) queda fuera de este mecanismo — solo aplica al header principal de la Section.

-----
## <a name="tamaño-de-texto"></a>Tamaño de Texto (meta.typography)
Igual mecanismo que `meta.tone`, pero para tamaño en vez de color. Campo oficial y opcional del contrato:

meta: {\
`  `typography: {\
`    `titleSize: "sm" **|** "md" **|** "lg" **|** "xl",\
`    `descriptionSize: "sm" **|** "md" **|** "lg"\
`  `}\
}

Si no está definido, cada Variant conserva su tamaño actual (sin cambios). Si está definido, sobreescribe usando la escala tipográfica global (`text-h1`...`text-body-sm` en `globals.css`), nunca un valor arbitrario suelto. Se resuelve con `resolveTypography(data)` + `getTitleSizeClass`/`getDescriptionSizeClass` (Variants con `<h2>`/`<p>` propio), `getTitleLevel`/`getDescriptionTextSize` (Variants que usan `SectionHeader`/`Heading`/`Text`), o `getTitleSizeCssValue`/`getDescriptionSizeCssValue` (Variants con el patrón CSS-var `.section-title`/`.section-description`) en `sectionStyle.js`.

Solo controla tamaño de título/descripción principal de la Section — no line-height, tracking, ni tipografía (la fuente es decisión de sitio completo, vía Globals, no por instancia).

-----
# <a name="reglas-de-reutilización"></a>Reglas de Reutilización
Antes de crear:

- Component
- Section
- Variant
- UI Base

preguntar:

¿Ya existe una solución equivalente?

Si existe:

Reutilizar.

-----
# <a name="prohibiciones"></a>Prohibiciones
No crear:

- HeroEmpresa
- HeroServicios
- HeroProductos

No crear:

- HeroV2
- HeroV3
- HeroFinal

No crear:

- VariantClienteA
- VariantClienteB

No crear componentes UI duplicados sin justificación arquitectónica.

-----
# <a name="anti-patrones"></a>Anti-Patrones
Prohibido:

- Hardcodear contenido
- Hardcodear imágenes
- Hardcodear CTA
- Mezclar Data y UI
- Mezclar Variant y contenido
- Duplicar Sections
- Duplicar Variants
- Romper contratos
- Inventar arquitectura
-----
# <a name="flujo-obligatorio"></a>Flujo Obligatorio
Antes de realizar cambios:

1. Identificar la capa afectada.
1. Identificar el manual aplicable.
1. Revisar contratos oficiales.
1. Buscar reutilización.
1. Proponer.
1. Implementar.
1. Validar.
1. Documentar.

Nunca implementar primero.

-----
# <a name="regla-final"></a>Regla Final
Data describe.

Pages organizan.

Sections estructuran.

Variants interpretan.

UI Base construye.

Globals estiliza.

La documentación define el sistema.

Claude implementa el sistema.
