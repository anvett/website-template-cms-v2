# <a name="xbaf13fe28a6d44c8b5382367f52d82ec5841809"></a>08-GUIA-OFICIAL-IA-Y-ASISTENTES-DE-DESARROLLO.md
# <a name="template-cms-v2"></a>TEMPLATE CMS V2
## <a name="x84f954201069706b45b6cd6e76698e332b451e7"></a>Guía Oficial para IA y Asistentes de Desarrollo
Versión: 2.0

Estado: OFICIAL

Fecha de consolidación: Junio 2026

-----
# <a name="objetivo-del-documento"></a>1. OBJETIVO DEL DOCUMENTO
Este documento establece las reglas oficiales que deben seguir los asistentes de desarrollo basados en Inteligencia Artificial al trabajar sobre Template CMS V2.

Aplica a:

ChatGPT\
\
Claude\
\
Claude Code\
\
Cursor\
\
Copilot\
\
Windsurf\
\
Cline\
\
Aider\
\
OpenHands\
\
y futuros asistentes

Su propósito es:

- proteger la arquitectura;
- evitar deuda técnica;
- mantener consistencia;
- preservar contratos oficiales;
- acelerar desarrollo;
- facilitar mantenimiento;
- permitir evolución controlada.
-----
# <a name="filosofía-fundamental"></a>2. FILOSOFÍA FUNDAMENTAL
Regla principal:

La IA NO diseña arquitectura.\
\
La IA implementa arquitectura.

La arquitectura oficial ya está definida.

La IA no debe:

- reinventarla;
- modificarla;
- simplificarla;
- reinterpretarla.

Debe respetarla.

-----
# <a name="arquitectura-oficial-del-sistema"></a>3. ARQUITECTURA OFICIAL DEL SISTEMA
Toda IA debe asumir que Template CMS V2 utiliza:

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

Esta arquitectura es obligatoria.

-----
# <a name="principio-de-jerarquía"></a>4. PRINCIPIO DE JERARQUÍA
Cada capa tiene responsabilidades específicas.

-----
## <a name="data"></a>DATA
Describe.

-----
## <a name="pages"></a>PAGES
Organiza.

-----
## <a name="sections"></a>SECTIONS
Estructura.

-----
## <a name="variants"></a>VARIANTS
Interpreta.

-----
## <a name="ui-base"></a>UI BASE
Construye.

-----
## <a name="globals"></a>GLOBALS
Estiliza.

-----
# <a name="regla-de-separación-de-responsabilidades"></a>5. REGLA DE SEPARACIÓN DE RESPONSABILIDADES
La IA nunca debe mezclar capas.

Ejemplo incorrecto:

Contenido dentro de Variant\
\
Contenido dentro de UI Base\
\
Lógica visual dentro de Data

-----
## <a name="correcto"></a>Correcto
Contenido → Data\
\
Layout → Variant\
\
Componente → UI Base

-----
# <a name="manuales-oficiales-obligatorios"></a>6. MANUALES OFICIALES OBLIGATORIOS
Antes de realizar cambios la IA debe conocer:

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
07-MANUAL-MAESTRO-VARIANTS.md

Si existe conflicto:

La documentación oficial prevalece.

-----
# <a name="regla-de-conservación-arquitectónica"></a>7. REGLA DE CONSERVACIÓN ARQUITECTÓNICA
La IA debe asumir:

La arquitectura actual es correcta.

No debe proponer:

- nuevas arquitecturas;
- nuevas capas;
- nuevos flujos;
- nuevos contratos.

salvo aprobación explícita.

-----
# <a name="qué-puede-modificar-una-ia"></a>8. QUÉ PUEDE MODIFICAR UNA IA
Está permitido:

✔ contenido

✔ textos

✔ imágenes

✔ assets

✔ Data

✔ Variants existentes

✔ Sections existentes

✔ SEO

✔ navegación

✔ formularios

✔ responsive

-----
# <a name="qué-no-puede-modificar-una-ia"></a>9. QUÉ NO PUEDE MODIFICAR UNA IA
No puede modificar sin autorización:

✘ arquitectura

✘ contratos oficiales

✘ estructura de capas

✘ flujo del framework

✘ responsabilidades oficiales

✘ sistema de render

-----
# <a name="regla-data-first"></a>10. REGLA DATA FIRST
Toda modificación debe comenzar por Data.

Proceso:

Data\
↓\
Variant\
↓\
UI

Nunca al revés.

-----
# <a name="regla-de-no-hardcore"></a>11. REGLA DE NO HARDCORE
La IA no debe introducir:

Textos hardcodeados\
\
Imágenes hardcodeadas\
\
CTA hardcodeados\
\
Datos comerciales hardcodeados

Todo debe provenir de Data.

-----
# <a name="principio-de-reutilización"></a>12. PRINCIPIO DE REUTILIZACIÓN
Antes de crear algo nuevo preguntar:

¿Ya existe?

Si existe:

Reutilizar.

-----
# <a name="regla-de-mínima-complejidad"></a>13. REGLA DE MÍNIMA COMPLEJIDAD
La IA debe preferir:

Reutilizar\
↓\
Configurar\
↓\
Extender\
↓\
Crear

Nunca:

Crear\
↓\
Duplicar\
↓\
Complicar

-----
# <a name="responsabilidad-sobre-data"></a>14. RESPONSABILIDAD SOBRE DATA
La IA debe respetar:

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

Contrato oficial V2.

-----
# <a name="regla-de-background"></a>15. REGLA DE BACKGROUND
Toda Section debe contener:

background

Incluso cuando utilice:

surface

-----
# <a name="regla-de-overlay"></a>16. REGLA DE OVERLAY
Correcto:

meta: {\
`  `overlay: **true**,\
`  `overlayOpacity: 0.55\
}

Incorrecto:

media.background.overlay

-----
# <a name="regla-de-formularios"></a>17. REGLA DE FORMULARIOS
Toda configuración debe vivir en:

meta.form

-----
# <a name="regla-de-imágenes"></a>18. REGLA DE IMÁGENES
Toda imagen debe ser configurable desde Data.

La IA no debe:

Insertar imágenes directamente en Variants

-----
# <a name="regla-de-page-data"></a>19. REGLA DE PAGE DATA
Page Data:

✔ organiza

✔ ordena

✔ define SEO

No contiene contenido principal.

-----
# <a name="regla-de-sections-data"></a>20. REGLA DE SECTIONS DATA
Sections Data:

✔ contiene contenido

✔ contiene configuración

No contiene implementación visual.

-----
-----
# <a name="responsabilidad-sobre-sections"></a>21. RESPONSABILIDAD SOBRE SECTIONS
La IA debe entender que una Section representa una familia funcional.

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
FAQ\
\
CTA\
\
Contact\
\
Products\
\
Comparison\
\
Legal

-----
## <a name="regla-fundamental"></a>Regla fundamental
Una Section define:

Qué hace

Una Variant define:

Cómo se ve

-----
# <a name="regla-de-no-duplicar-sections"></a>22. REGLA DE NO DUPLICAR SECTIONS
La IA no debe crear:

HeroEmpresa\
\
HeroProductos\
\
HeroServicios\
\
HeroCorporativo

-----
## Correcto
Hero\
↓\
Variants

con contenido diferente desde Data.

-----
# <a name="regla-de-responsabilidad-de-section"></a>23. REGLA DE RESPONSABILIDAD DE SECTION
Las Sections:

✔ reciben Data

✔ seleccionan Variants

✔ coordinan render

No deben:

✘ contener contenido

✘ contener imágenes comerciales

✘ contener SEO

-----
# <a name="reglas-para-variants"></a>24. REGLAS PARA VARIANTS
Las Variants representan implementaciones visuales reutilizables.

-----
## <a name="la-ia-debe-asumir"></a>La IA debe asumir
Variant\
≠\
Contenido

-----
## <a name="variant"></a>Variant
Es:

Layout\
\
Composición\
\
Distribución visual

-----
# <a name="cuándo-crear-una-variant"></a>25. CUÁNDO CREAR UNA VARIANT
Antes de crear una Variant la IA debe preguntar:

¿La diferencia es visual?

-----
## <a name="si-la-respuesta-es-no"></a>Si la respuesta es NO
No crear Variant.

Resolver mediante Data.

-----
## <a name="si-la-respuesta-es-sí"></a>Si la respuesta es SÍ
Evaluar creación.

-----
# <a name="cuándo-no-crear-una-variant"></a>26. CUÁNDO NO CREAR UNA VARIANT
No crear una Variant porque:

Cambió el título\
\
Cambió la imagen\
\
Cambió el CTA\
\
Cambió el contenido\
\
Cambió el cliente

-----
# <a name="regla-de-nomenclatura-de-variants"></a>27. REGLA DE NOMENCLATURA DE VARIANTS
Siempre utilizar:

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
content-list

-----
## <a name="incorrecto"></a>Incorrecto
HeroV2\
\
NewHero\
\
VersionFinal\
\
ClienteA

-----
# <a name="responsabilidad-sobre-ui-base"></a>28. RESPONSABILIDAD SOBRE UI BASE
La IA debe entender que UI Base es la capa más reutilizable del sistema.

-----
## <a name="componentes-ui-base"></a>Componentes UI Base
Ejemplos:

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
InfoItem\
\
SectionHeader

-----
# <a name="regla-de-no-reinventar-ui"></a>29. REGLA DE NO REINVENTAR UI
Si existe un componente UI Base:

Debe reutilizarse.

-----
## <a name="incorrecto-1"></a>Incorrecto
Crear:

CustomButton\
\
SpecialCard\
\
NewHeading

sin necesidad real.

-----
# <a name="regla-de-composición"></a>30. REGLA DE COMPOSICIÓN
La IA debe construir:

Variant\
↓\
UI Base

No:

Variant\
↓\
HTML directo

como estrategia principal.

-----
# <a name="regla-de-globals"></a>31. REGLA DE GLOBALS
La identidad visual pertenece a:

globals.css

-----
## <a name="globals-controla"></a>Globals controla
✔ colores

✔ tipografías

✔ gradientes

✔ spacing global

✔ containers

✔ variables CSS

-----
# <a name="lo-que-no-pertenece-a-globals"></a>32. LO QUE NO PERTENECE A GLOBALS
No pertenece:

✘ contenido

✘ estructura

✘ layout específico

✘ configuración de páginas

-----
# <a name="regla-de-tokens"></a>33. REGLA DE TOKENS
La IA debe utilizar:

Variables CSS\
\
Tokens\
\
Clases oficiales

antes de crear valores arbitrarios.

-----
# <a name="regla-de-containers"></a>34. REGLA DE CONTAINERS
La IA debe respetar:

content\
\
section\
\
wide

-----
## <a name="incorrecto-2"></a>Incorrecto
Crear anchos arbitrarios.

-----
## <a name="correcto-2"></a>Correcto
Utilizar el sistema oficial.

-----
# <a name="regla-de-spacing"></a>35. REGLA DE SPACING
La IA debe respetar:

compact\
\
default\
\
hero

-----
## <a name="incorrecto-3"></a>Incorrecto
Inventar escalas paralelas.

-----
## <a name="correcto-3"></a>Correcto
Utilizar escalas oficiales.

-----
# <a name="regla-de-surface"></a>36. REGLA DE SURFACE
La IA debe respetar:

base\
\
subtle\
\
strong

-----
# 37\. REGLA DE BACKGROUND
La IA debe respetar:

surface\
\
gradient\
\
image

-----
# 38\. REGLA DE IMÁGENES
La IA debe utilizar:

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
## <a name="incorrecto-4"></a>Incorrecto
Valores internos ocultos.

-----
## <a name="correcto-4"></a>Correcto
Valores provenientes de Data.

-----
# <a name="regla-de-responsive"></a>39. REGLA DE RESPONSIVE
Toda implementación debe validar:

Mobile\
\
Tablet\
\
Desktop

-----
# <a name="responsabilidad-de-accesibilidad"></a>40. RESPONSABILIDAD DE ACCESIBILIDAD
La IA debe verificar:

✔ alt

✔ contraste

✔ headings

✔ navegación

✔ formularios

-----
# <a name="anti-patrón-hardcore"></a>41. ANTI-PATRÓN: HARDCORE
Incorrecto:

Texto comercial en Variant\
\
Texto comercial en UI\
\
Texto comercial en Section

-----
## <a name="correcto-5"></a>Correcto
Texto\
↓\
Data

-----
# <a name="anti-patrón-duplicación"></a>42. ANTI-PATRÓN: DUPLICACIÓN
Incorrecto:

Dos Variants iguales\
\
Dos Sections iguales\
\
Dos Components iguales

-----
## <a name="correcto-6"></a>Correcto
Reutilizar.

-----
# <a name="anti-patrón-crecimiento-descontrolado"></a>43. ANTI-PATRÓN: CRECIMIENTO DESCONTROLADO
La IA no debe generar:

HeroV2\
\
HeroV3\
\
HeroV4\
\
HeroFinal

-----
## <a name="correcto-7"></a>Correcto
Refactorizar.

-----
# <a name="anti-patrón-arquitectura-para-clientes"></a>44. ANTI-PATRÓN: ARQUITECTURA PARA CLIENTES
Incorrecto:

VariantClienteA\
\
VariantClienteB\
\
VariantClienteC

-----
## <a name="correcto-8"></a>Correcto
Variants genéricas.

-----
# <a name="anti-patrón-lógica-en-data"></a>45. ANTI-PATRÓN: LÓGICA EN DATA
Incorrecto:

Funciones\
\
Render\
\
JSX\
\
Imports UI

dentro de Data.

-----
# <a name="anti-patrón-ui-acoplada"></a>46. ANTI-PATRÓN: UI ACOPLADA
Incorrecto:

Variant dependiente de un cliente

-----
## <a name="correcto-9"></a>Correcto
Variant reutilizable

-----
# <a name="flujo-oficial-de-trabajo-para-ia"></a>47. FLUJO OFICIAL DE TRABAJO PARA IA
Toda IA debe seguir:

Analizar\
↓\
Consultar manuales\
↓\
Validar arquitectura\
↓\
Proponer\
↓\
Implementar\
↓\
Validar\
↓\
Documentar

-----
# <a name="proceso-de-decisión"></a>48. PROCESO DE DECISIÓN
Antes de modificar cualquier elemento:

¿Existe ya?

Si:

Sí

Reutilizar.

-----
# <a name="proceso-de-implementación"></a>49. PROCESO DE IMPLEMENTACIÓN
Antes de crear:

Component\
\
Section\
\
Variant\
\
UI

verificar si existe una alternativa oficial.

-----
# <a name="checklist-previo-a-cualquier-cambio"></a>50. CHECKLIST PREVIO A CUALQUIER CAMBIO
La IA debe verificar:

✔ Arquitectura

✔ Contratos

✔ Data

✔ Sections

✔ Variants

✔ UI Base

✔ Globals

-----
# <a name="checklist-de-entrega"></a>51. CHECKLIST DE ENTREGA
Antes de finalizar:

✔ No se rompió arquitectura

✔ No se rompieron contratos

✔ Responsive correcto

✔ SEO intacto

✔ Navegación intacta

✔ Data intacta

✔ Reutilización máxima

-----
# <a name="preparación-para-cms"></a>52. PREPARACIÓN PARA CMS
Toda modificación debe considerar:

CMS futuro

-----
# <a name="preparación-para-multiinstancia"></a>53. PREPARACIÓN PARA MULTIINSTANCIA
Toda modificación debe funcionar para:

Múltiples clientes

-----
# <a name="preparación-para-ia-generativa"></a>54. PREPARACIÓN PARA IA GENERATIVA
La IA debe producir estructuras predecibles.

Objetivo:

Data consistente\
↓\
Render consistente

-----
# <a name="regla-de-documentación"></a>55. REGLA DE DOCUMENTACIÓN
Toda modificación estructural debe actualizar:

Manual correspondiente

-----
# <a name="regla-de-trazabilidad"></a>56. REGLA DE TRAZABILIDAD
La IA debe poder justificar:

Por qué se realizó el cambio

-----
# <a name="regla-de-conservación"></a>57. REGLA DE CONSERVACIÓN
Cuando exista duda:

Conservar arquitectura

-----
# <a name="principio-de-evolución-controlada"></a>58. PRINCIPIO DE EVOLUCIÓN CONTROLADA
La evolución debe ocurrir mediante:

Data\
\
Variants\
\
UI Base

Nunca rompiendo capas existentes.

-----
# <a name="criterio-de-aprobación"></a>59. CRITERIO DE APROBACIÓN
Una modificación se considera aprobada cuando:

✔ respeta manuales

✔ respeta contratos

✔ respeta arquitectura

✔ mantiene reutilización

✔ mantiene escalabilidad

-----
# <a name="cierre-oficial"></a>60. CIERRE OFICIAL
Toda IA que trabaje sobre Template CMS V2 debe actuar como implementador de una arquitectura existente y no como diseñador de una nueva arquitectura.

Regla fundamental:

La arquitectura ya está resuelta.\
\
La IA debe respetarla,\
aplicarla,\
extenderla con control\
y documentarla correctamente.

-----

-----
61\. OBJETIVO DE ESTA SECCIÓN

Esta sección define el contexto mínimo obligatorio que debe recibir cualquier asistente de desarrollo antes de trabajar sobre Template CMS V2.

Su propósito es:

- evitar pérdida de contexto;
- evitar reinterpretaciones;
- evitar cambios arquitectónicos innecesarios;
- garantizar continuidad entre conversaciones;
- permitir trabajo consistente entre múltiples asistentes IA.
-----
<a name="objetivo-de-esta-sección"></a>62. PRINCIPIO DE CONTINUIDAD

Toda IA debe asumir:

\```txt id=“z6l7a8” La arquitectura ya fue auditada.

La arquitectura ya fue aprobada.

La arquitectura no debe ser rediseñada.

\
\---\
\
\# 63. REGLA DE ARRANQUE\
\
Antes de proponer cambios la IA debe identificar:\
\
\```txt id="v1m8r4"\
Versión del proyecto\
\
Manuales disponibles\
\
Estado actual\
\
Objetivo solicitado

-----
<a name="principio-de-continuidad"></a>64. CONTEXTO MÍNIMO OBLIGATORIO

Toda conversación nueva debe incluir:

\```txt id=“f8d4w9” Proyecto: Template CMS V2

Arquitectura: DATA ↓ PAGES ↓ SECTIONS ↓ VARIANTS ↓ UI BASE ↓ GLOBALS

\
\
y la indicación explícita:\
\
\```txt id="x5r7q2"\
No reinterpretar arquitectura.\
\
No proponer nuevas arquitecturas.\
\
Respetar manuales oficiales.

-----
<a name="contexto-mínimo-obligatorio"></a>65. DOCUMENTACIÓN DE REFERENCIA

Toda IA debe considerar como documentación oficial:

\```txt id=“g9n4k1” 01-MANUAL-MAESTRO-SISTEMA.md

02-MANUAL-MAESTRO-UI-BASE.md

03-MANUAL-MAESTRO-SECTIONS.md

04-MANUAL-MAESTRO-DATA.md

05-MANUAL-CREACION-DE-INSTANCIAS.md

06-MANUAL-CONEXION-Y-RENDER.md

07-MANUAL-MAESTRO-VARIANTS.md

08-GUIA-OFICIAL-IA-Y-ASISTENTES-DE-DESARROLLO.md

\
\---\
\
\# 66. REGLA DE VALIDACIÓN PREVIA\
\
Antes de modificar código la IA debe verificar:\
\
✔ Qué capa está siendo modificada\
\
✔ Qué manual regula esa capa\
\
✔ Qué contratos existen\
\
✔ Qué dependencias tiene\
\
✔ Qué impacto puede producir\
\
\---\
\
\# 67. INSTRUCCIONES PARA CHATGPT\
\
ChatGPT debe actuar como:\
\
\```txt id="s3v9x5"\
Arquitecto documental\
\
Revisor técnico\
\
Implementador controlado

-----
ChatGPT NO debe

\```txt id=“y2q7n1” Inventar arquitectura

Cambiar contratos

Eliminar capas

Simplificar estructura aprobada

\
\---\
\
\# 68. INSTRUCCIONES PARA CLAUDE\
\
Claude debe actuar como:\
\
\```txt id="t6j5f8"\
Analista técnico\
\
Implementador\
\
Documentador

-----
<a name="chatgpt-no-debe"></a>Claude NO debe

\```txt id=“p7w2r6” Crear flujos alternativos

Cambiar responsabilidades

Modificar contratos sin autorización

\
\---\
\
\# 69. INSTRUCCIONES PARA CLAUDE CODE\
\
Claude Code debe asumir:\
\
\```txt id="h4c1y7"\
La documentación es la fuente de verdad.

-----
<a name="claude-no-debe"></a>Flujo esperado

txt id="a5m8d2" Leer documentación ↓ Analizar solicitud ↓ Implementar ↓ Validar ↓ Reportar

-----
<a name="flujo-esperado"></a><a name="documentación-de-referencia"></a>70. INSTRUCCIONES PARA CURSOR

Cursor debe trabajar bajo el principio:

txt id="u9r3v1" Modificar lo mínimo necesario.

-----
<a name="prioridades"></a>Prioridades

1. Reutilizar
1. Configurar
1. Extender
1. Crear
-----
<a name="instrucciones-para-cursor"></a>71. INSTRUCCIONES PARA COPILOT

Copilot debe limitarse a:

\```txt id=“k8f6q4” Autocompletado

Refactorización menor

Implementaciones locales

\
\---\
\
\## No debe\
\
\```txt id="m2t9b7"\
Tomar decisiones arquitectónicas

-----
<a name="instrucciones-para-copilot"></a>72. INSTRUCCIONES PARA WINDSURF

Windsurf debe seguir:

txt id="n5j4x8" Manual ↓ Contexto ↓ Implementación

Nunca:

txt id="d3v8k2" Implementación ↓ Arquitectura

-----
<a name="instrucciones-para-windsurf"></a>73. INSTRUCCIONES PARA CLINE

Cline debe asumir:

txt id="w7f1m5" Los contratos oficiales son obligatorios.

-----
<a name="instrucciones-para-cline"></a>74. INSTRUCCIONES PARA OPENHANDS

OpenHands debe actuar como:

txt id="r2c8y4" Ejecutor técnico

No como diseñador del framework.

-----
<a name="instrucciones-para-openhands"></a><a name="x824841de684543d5d0bba13c16cb62c6aa55c06"></a>75. PROCEDIMIENTO OFICIAL PARA INICIAR UN CHAT NUEVO

Cuando se abra una conversación nueva debe entregarse:

\```txt id=“q4x7n9” Nombre del proyecto

Objetivo

Manual aplicable

Contexto actual

\
\---\
\
\# 76. PROMPT MAESTRO DE CONTINUIDAD\
\
Plantilla recomendada:\
\
\```txt id="m8v2p6"\
Estamos trabajando en Template CMS V2.\
\
La arquitectura oficial es:\
\
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
\
Los manuales oficiales ya fueron aprobados.\
\
No reinterpretar arquitectura.\
\
No proponer nuevas arquitecturas.\
\
No resumir documentación.\
\
Respetar contratos oficiales.\
\
Antes de proponer cambios identificar:\
\- capa afectada\
\- manual aplicable\
\- impacto arquitectónico\
\
Trabajar únicamente sobre el alcance solicitado.

-----
77\. PROMPT PARA REVISIÓN DE CÓDIGO

\```txt id=“b6n1r3” Analiza el código respetando la arquitectura oficial de Template CMS V2.

No propongas nuevas arquitecturas.

Identifica:

- incumplimientos de contratos
- duplicaciones
- hardcodeos
- violaciones de separación de responsabilidades

Propón únicamente correcciones compatibles con los manuales oficiales.

\
\---\
\
\# 78. PROMPT PARA CREACIÓN DE SECTION\
\
\```txt id="c9m4w8"\
Crear una nueva Section respetando:\
\
01 Sistema\
02 UI Base\
03 Sections\
04 Data\
07 Variants\
\
No crear variantes innecesarias.\
\
No hardcodear contenido.\
\
Utilizar contratos oficiales.

-----
<a name="prompt-para-revisión-de-código"></a>79. PROMPT PARA CREACIÓN DE VARIANT

\```txt id=“e5q7z1” Crear una nueva Variant únicamente si no existe una solución reutilizable.

La Variant debe:

- ser genérica
- ser reutilizable
- usar UI Base
- respetar contratos oficiales
- no contener contenido hardcodeado

\
\---\
\
\# 80. PROMPT PARA AUDITORÍA\
\
\```txt id="j2r6k9"\
Audita esta implementación utilizando exclusivamente los manuales oficiales de Template CMS V2.\
\
Identifica:\
\
\- incumplimientos\
\- deuda técnica\
\- duplicaciones\
\- oportunidades de reutilización\
\
No propongas cambios arquitectónicos.

-----
<a name="prompt-para-creación-de-variant"></a>81. PROCEDIMIENTO DE CONTINUIDAD ENTRE CHATS

Cuando un chat alcance su límite:

-----
Paso 1

Actualizar documentación.

-----
<a name="paso-1"></a>Paso 2

Registrar decisiones arquitectónicas.

-----
<a name="paso-2"></a>Paso 3

Generar prompt de continuidad.

-----
<a name="paso-3"></a>Paso 4

Abrir nuevo chat.

-----
<a name="paso-4"></a>Paso 5

Entregar:

\```txt id=“v4y8m2” Contexto

Objetivo

Manual aplicable

Estado actual

\
\---\
\
\# 82. CRITERIOS DE ACEPTACIÓN DE CAMBIOS\
\
Todo cambio debe cumplir:\
\
✔ Arquitectura intacta\
\
✔ Contratos intactos\
\
✔ Reutilización máxima\
\
✔ Responsive correcto\
\
✔ Documentación actualizada\
\
\---\
\
\# 83. CRITERIOS DE RECHAZO\
\
Un cambio debe rechazarse cuando:\
\
✘ rompe arquitectura\
\
✘ rompe contratos\
\
✘ introduce duplicación\
\
✘ introduce hardcodeo\
\
✘ mezcla responsabilidades\
\
✘ crea deuda técnica\
\
\---\
\
\# 84. PREPARACIÓN PARA FUTURAS FASES\
\
La documentación actual prepara el framework para:\
\
\```txt id="l8c4q7"\
CMS\
\
Supabase\
\
Panel administrativo\
\
Multiinstancia\
\
Automatización\
\
IA generativa

-----
<a name="paso-5"></a><a name="procedimiento-de-continuidad-entre-chats"></a>85. PRINCIPIO DE EVOLUCIÓN DEL FRAMEWORK

Toda evolución debe producirse mediante:

txt id="n1w5f3" Extensión controlada

Nunca mediante:

txt id="p7k2v8" Reescritura completa

-----
<a name="principio-de-evolución-del-framework"></a>86. FUENTE OFICIAL DE VERDAD

La fuente oficial de verdad del proyecto es:

txt id="x3m6r1" Documentación oficial aprobada

No:

\```txt id=“g9t4b5” Suposiciones

Memoria parcial

Implementaciones históricas

\
\---\
\
\# 87. REGLA FINAL PARA IA\
\
Toda IA debe asumir:\
\
\```txt id="r5n8y2"\
Primero entender.\
\
Luego proponer.\
\
Después implementar.

Nunca al revés.

-----
<a name="fuente-oficial-de-verdad"></a>88. CIERRE OFICIAL

Template CMS V2 dispone de una arquitectura documentada, auditada y aprobada.

Los asistentes IA deben actuar como implementadores de esa arquitectura y no como diseñadores de una nueva.

Regla definitiva:

\```txt id=“k7v1m4” La documentación define el sistema.

La IA ejecuta el sistema. ```

