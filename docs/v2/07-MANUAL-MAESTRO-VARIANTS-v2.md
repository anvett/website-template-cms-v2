# <a name="manual-maestro-variants.md"></a>07-MANUAL-MAESTRO-VARIANTS.md
# <a name="template-cms-v2"></a>TEMPLATE CMS V2
## <a name="manual-maestro-de-variants"></a>Manual Maestro de Variants
Versión: 2.0

Estado: OFICIAL

Fecha de consolidación: Junio 2026

-----
# <a name="objetivo-del-documento"></a>1. OBJETIVO DEL DOCUMENTO
Este documento define la arquitectura oficial de Variants utilizada por Template CMS V2.

Su propósito es:

- estandarizar la creación de variants;
- evitar duplicación de sections;
- maximizar reutilización;
- mantener consistencia visual;
- controlar evolución del sistema;
- facilitar escalabilidad;
- preparar integración futura con CMS;
- servir como referencia oficial para nuevas implementaciones.

Este documento prevalece sobre implementaciones históricas relacionadas con variants.

-----
# <a name="filosofía-del-sistema"></a>2. FILOSOFÍA DEL SISTEMA
Template CMS V2 adopta la siguiente arquitectura:

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

La Variant representa la capa responsable de transformar una misma intención funcional en distintas experiencias visuales.

-----
# <a name="definición-oficial-de-variant"></a>3. DEFINICIÓN OFICIAL DE VARIANT
Una Variant es una implementación visual específica de una misma Section.

Ejemplo:

Hero\
├─ background-image\
├─ hero-internal\
├─ centered\
├─ split-image

Todas representan:

Hero

pero cada una lo hace de forma distinta.

-----
# <a name="responsabilidades-de-una-variant"></a>4. RESPONSABILIDADES DE UNA VARIANT
Una Variant es responsable de:

- layout;
- composición;
- distribución visual;
- orden visual;
- responsive específico;
- uso de UI Base;
- interpretación de Data.
-----
# <a name="x0da507821592d17e8294611797353fccfcd2fd7"></a>5. RESPONSABILIDADES QUE NO PERTENECEN A UNA VARIANT
Una Variant NO es responsable de:

- contenido;
- SEO;
- navegación;
- branding global;
- metadata;
- lógica de negocio;
- persistencia;
- configuración de página.

Todo eso pertenece a Data.

-----
# <a name="relación-entre-data-y-variants"></a>6. RELACIÓN ENTRE DATA Y VARIANTS
Ejemplo:

{\
`  `component: "Hero",\
`  `variant: "background-image"\
}

Flujo:

Data\
↓\
Hero Section\
↓\
Router\
↓\
HeroBackgroundImage\
↓\
UI Base

-----
# <a name="principio-de-reutilización"></a>7. PRINCIPIO DE REUTILIZACIÓN
Antes de crear una nueva Variant preguntar:

¿Puede resolverse con una Variant existente?

Si la respuesta es:

Sí

no debe crearse una nueva Variant.

-----
# <a name="regla-de-estabilidad"></a>8. REGLA DE ESTABILIDAD
Las Variants deben ser:

- reutilizables;
- predecibles;
- genéricas;
- independientes del contenido.
-----
# <a name="anti-patrón-más-común"></a>9. ANTI-PATRÓN MÁS COMÚN
Incorrecto:

HeroEmpresa\
\
HeroServicios\
\
HeroProductos\
\
HeroInstamatic

Correcto:

Hero\
↓\
background-image

con contenido diferente proveniente de Data.

-----
# <a name="sistema-oficial-de-router"></a>10. SISTEMA OFICIAL DE ROUTER
Toda Section actúa como Router.

Ejemplo:

Hero Section\
↓\
switch(variant)\
↓\
Hero Variant

-----
# <a name="responsabilidad-del-router"></a>11. RESPONSABILIDAD DEL ROUTER
El Router:

- recibe component;
- recibe variant;
- selecciona implementación;
- devuelve Variant correcta.

No contiene contenido.

-----
# <a name="estructura-conceptual"></a>12. ESTRUCTURA CONCEPTUAL
Hero/\
├─ variants/\
│  ├─ BackgroundImage\
│  ├─ HeroInternal\
│  ├─ Centered\
│  └─ SplitImage\
│\
└─ index.js

-----
# <a name="inventario-oficial-de-variants"></a>13. INVENTARIO OFICIAL DE VARIANTS
Las siguientes Variants han sido identificadas durante la auditoría V2 y actualizadas en Junio 2026.

-----
## <a name="hero"></a>Hero
background-image\
\
hero-internal

-----
## <a name="about"></a>About
image-right\
\
stacked-centered

-----
## <a name="services"></a>Services
cards-with-icons\
\
services-grid (soporta grid-2, grid-3, grid-4)

-----
## <a name="features"></a>Features
process-steps\
\
two-columns-gradient-image

-----
## <a name="comparison"></a>Comparison
split

-----
## <a name="faq"></a>FAQ
categorized-faq

-----
## <a name="cta"></a>CTA
background-image

-----
## <a name="stats"></a>Stats
stats-grid\
\
split-highlight

-----
## <a name="products"></a>Products
product-cards\
\
parts-gallery

-----
## <a name="contact"></a>Contact
info-form\
\
info-only

-----
## <a name="dual-content"></a>DualContent
default

-----
## <a name="legal"></a>Legal
content-list

-----
# <a name="responsabilidad-de-hero-background-image"></a>14. RESPONSABILIDAD DE HERO BACKGROUND-IMAGE
Uso:

Hero principal

Características:

- imagen de fondo;
- overlay;
- CTA principal;
- encabezado principal.
-----
# <a name="responsabilidad-de-hero-hero-internal"></a>15. RESPONSABILIDAD DE HERO HERO-INTERNAL
Uso:

Páginas internas

Características:

- encabezado secundario;
- navegación contextual;
- menor protagonismo visual.

# <a name="parte-2"></a>PARTE 2
-----
# <a name="objetivo-de-esta-sección"></a>16. OBJETIVO DE ESTA SECCIÓN
Esta sección define el proceso oficial para crear nuevas Variants dentro de Template CMS V2.

La creación de una nueva Variant debe considerarse una excepción.

El objetivo principal del sistema es:

Maximizar reutilización\
Minimizar variantes\
Mantener consistencia

-----
# <a name="cuándo-crear-una-nueva-variant"></a>17. CUÁNDO CREAR UNA NUEVA VARIANT
Una nueva Variant debe crearse únicamente cuando exista una necesidad visual real que no pueda resolverse mediante:

- Data;
- configuración existente;
- una Variant ya implementada;
- ajustes permitidos mediante meta;
- ajustes permitidos mediante UI Base.
-----
## <a name="correcto"></a>Correcto
Nuevo layout visual\
Nueva distribución\
Nueva composición responsive\
Nueva estructura visual

-----
## <a name="incorrecto"></a>Incorrecto
Cambió el contenido\
\
Cambió el título\
\
Cambió la imagen\
\
Cambió el CTA\
\
Cambió el color

Esos cambios deben resolverse mediante Data.

-----
# <a name="árbol-de-decisión-oficial"></a>18. ÁRBOL DE DECISIÓN OFICIAL
Antes de crear una Variant responder:

-----
## <a name="pregunta-1"></a>Pregunta 1
¿Puede resolverse modificando Data?

Si:

Sí

No crear Variant.

-----
## <a name="pregunta-2"></a>Pregunta 2
¿Existe una Variant similar?

Si:

Sí

Reutilizar Variant.

-----
## <a name="pregunta-3"></a>Pregunta 3
¿La estructura visual cambia realmente?

Si:

Sí

Evaluar creación.

-----
## <a name="pregunta-4"></a>Pregunta 4
¿Será reutilizable?

Si:

No

No crear Variant.

-----
# <a name="requisitos-obligatorios"></a>19. REQUISITOS OBLIGATORIOS
Toda nueva Variant debe ser:

✔ reutilizable

✔ independiente del contenido

✔ responsive

✔ basada en UI Base

✔ compatible con Data Contract V2

✔ compatible con Sections

-----
# <a name="requisitos-prohibidos"></a>20. REQUISITOS PROHIBIDOS
No crear Variants:

✘ para un cliente específico

✘ para una página específica

✘ para una sola instancia

✘ para corregir errores temporales

✘ para evitar refactorización

-----
# <a name="convenciones-de-nomenclatura"></a>21. CONVENCIONES DE NOMENCLATURA
Todas las Variants deben utilizar:

kebab-case

-----
## <a name="correcto-1"></a>Correcto
background-image\
\
hero-internal\
\
cards-with-icons\
\
process-steps\
\
split-highlight\
\
content-list\
\
categorized-faq

-----
## <a name="incorrecto-1"></a>Incorrecto
HeroV2\
\
NewVersion\
\
Variant1\
\
BlueLayout\
\
TestSection\
\
SpecialHero

-----
# <a name="principio-de-nomenclatura"></a>22. PRINCIPIO DE NOMENCLATURA
El nombre debe describir:

Qué hace visualmente

No:

Para quién fue creada

-----
## <a name="correcto-2"></a>Correcto
image-right\
\
image-left\
\
background-image\
\
split-content\
\
three-columns

-----
## <a name="incorrecto-2"></a>Incorrecto
instamatic-layout\
\
cliente-a\
\
versión-final\
\
versión-final-final

-----
# <a name="estructura-recomendada"></a>23. ESTRUCTURA RECOMENDADA
Ejemplo conceptual:

Hero/\
├─ variants/\
│\
├─ BackgroundImage/\
│\
├─ HeroInternal/\
│\
└─ Centered/

-----
# <a name="responsabilidad-de-la-variant"></a>24. RESPONSABILIDAD DE LA VARIANT
La Variant recibe:

content\
\
media\
\
items\
\
actions\
\
meta

y decide cómo presentarlos.

-----
# <a name="contrato-de-entrada"></a>25. CONTRATO DE ENTRADA
Toda Variant debe asumir que recibe:

{\
`  `content,\
`  `media,\
`  `items,\
`  `actions,\
`  `meta\
}

Nunca debe depender de:

Datos hardcodeados

-----
# <a name="contrato-de-salida"></a>26. CONTRATO DE SALIDA
Toda Variant debe devolver:

JSX válido

utilizando:

UI Base

como capa principal.

-----
# <a name="relación-con-ui-base"></a>27. RELACIÓN CON UI BASE
La Variant no debe reinventar UI.

Debe utilizar:

Container\
\
Heading\
\
Text\
\
Button\
\
Card\
\
MediaFrame\
\
SectionHeader\
\
InfoItem

y demás componentes oficiales.

-----
# <a name="regla-de-composición"></a>28. REGLA DE COMPOSICIÓN
La Variant compone.

UI Base construye.

-----
## <a name="flujo"></a>Flujo
Variant\
↓\
Combina\
↓\
UI Base

-----
# <a name="regla-de-contenido"></a>29. REGLA DE CONTENIDO
La Variant nunca debe contener:

Texto comercial\
\
Textos legales\
\
CTA reales\
\
Imágenes reales

Todo proviene de Data.

-----
# <a name="regla-de-imágenes"></a>30. REGLA DE IMÁGENES
La Variant interpreta:

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

No debe redefinir esos valores internamente.

-----
# <a name="regla-de-overlay"></a>31. REGLA DE OVERLAY
La Variant interpreta:

meta.overlay

y

meta.overlayOpacity

No debe inventar overlays.

-----
# <a name="regla-de-formularios"></a>32. REGLA DE FORMULARIOS
La Variant interpreta:

meta.form

No debe contener configuraciones internas.

-----
# <a name="regla-de-surface"></a>33. REGLA DE SURFACE
La Variant interpreta:

surface

No debe reemplazarlo.

-----
# <a name="regla-de-container"></a>34. REGLA DE CONTAINER
La Variant interpreta:

containerWidth

No debe imponer anchos arbitrarios.

-----
# <a name="regla-de-spacing"></a>35. REGLA DE SPACING
La Variant interpreta:

spacing

No debe crear espaciados incompatibles.

-----
# <a name="responsive-obligatorio"></a>36. RESPONSIVE OBLIGATORIO
Toda Variant debe funcionar en:

Mobile\
\
Tablet\
\
Desktop

-----
# <a name="checklist-responsive"></a>37. CHECKLIST RESPONSIVE
Verificar:

✔ Mobile

✔ Tablet

✔ Desktop

✔ UltraWide

-----
# <a name="creación-de-una-nueva-variant"></a>38. CREACIÓN DE UNA NUEVA VARIANT
Proceso oficial:

-----
## <a name="paso-1"></a>Paso 1
Identificar necesidad real.

-----
## <a name="paso-2"></a>Paso 2
Validar reutilización.

-----
## <a name="paso-3"></a>Paso 3
Definir nombre.

-----
## <a name="paso-4"></a>Paso 4
Implementar.

-----
## <a name="paso-5"></a>Paso 5
Conectar al Router.

-----
## <a name="paso-6"></a>Paso 6
Documentar.

-----
## <a name="paso-7"></a>Paso 7
Validar.

-----
# <a name="conexión-con-el-router"></a>39. CONEXIÓN CON EL ROUTER
Toda nueva Variant debe registrarse.

Ejemplo conceptual:

Hero Router\
↓\
background-image\
↓\
BackgroundImage

-----
## <a name="nueva-variant"></a>Nueva Variant
Hero Router\
↓\
centered\
↓\
HeroCentered

-----
# <a name="documentación-obligatoria"></a>40. DOCUMENTACIÓN OBLIGATORIA
Toda Variant nueva debe documentar:

- propósito;
- uso;
- restricciones;
- responsive;
- ejemplos.
-----
# <a name="cuándo-refractorizar"></a>41. CUÁNDO REFRACTORIZAR
Si aparecen:

Variant A\
\
Variant B\
\
Variant C

con diferencias mínimas.

Debe evaluarse:

Fusionar

-----
# <a name="detección-de-deuda-técnica"></a>42. DETECCIÓN DE DEUDA TÉCNICA
Se considera deuda técnica cuando:

- Variants duplican lógica;
- Variants duplican layout;
- Variants difieren únicamente por contenido.
-----
# <a name="anti-patrones"></a>43. ANTI-PATRONES
-----
## <a name="variant-por-cliente"></a>Variant por cliente
Incorrecto:

HeroInstamatic\
\
HeroAnvetly\
\
HeroClienteX

-----
## <a name="variant-por-color"></a>Variant por color
Incorrecto:

HeroBlue\
\
HeroRed\
\
HeroGreen

-----
## <a name="variant-por-contenido"></a>Variant por contenido
Incorrecto:

HeroServicios\
\
HeroProductos\
\
HeroEmpresa

-----
# <a name="anti-patrones-avanzados"></a>44. ANTI-PATRONES AVANZADOS
Incorrecto:

Variant que ignora Data\
\
Variant con textos hardcodeados\
\
Variant con imágenes internas\
\
Variant que no usa UI Base

-----
# <a name="checklist-de-aprobación"></a>45. CHECKLIST DE APROBACIÓN
Antes de aprobar una Variant:

✔ reutilizable

✔ responsive

✔ documentada

✔ conectada al Router

✔ compatible con Data

✔ compatible con UI Base

✔ sin contenido hardcodeado

-----
# <a name="inventario-futuro"></a>46. INVENTARIO FUTURO
Toda nueva Variant aprobada debe agregarse al inventario oficial.

Ejemplo:

Hero\
├─ background-image\
├─ hero-internal\
└─ centered

-----
# <a name="preparación-para-cms"></a>47. PREPARACIÓN PARA CMS
Las Variants deben permitir:

Data\
↓\
CMS\
↓\
Variant

sin modificaciones estructurales.

-----
# <a name="preparación-para-ia"></a>48. PREPARACIÓN PARA IA
Las Variants deben ser interpretables por agentes IA.

Objetivo:

IA\
↓\
Genera Data\
↓\
Variant reutilizable\
↓\
Render correcto

-----
# <a name="estado-oficial-del-sistema"></a>49. ESTADO OFICIAL DEL SISTEMA
La arquitectura oficial queda:

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

-----
# 50\. CIERRE OFICIAL
Las Variants representan la capa de presentación reutilizable de Template CMS V2.

Regla fundamental:

Data describe.\
\
Sections organizan.\
\
Variants interpretan.\
\
UI Base construye.\
\
Globals estiliza.

