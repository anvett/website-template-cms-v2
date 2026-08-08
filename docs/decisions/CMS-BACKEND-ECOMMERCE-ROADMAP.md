# CMS + Backend + Módulo Ecommerce — Roadmap Oficial

Estado: **En planificación activa** (reemplaza el diferimiento indicado en `decision-log.md`).

Este documento registra las decisiones y el alcance acordado para la siguiente fase del proyecto: habilitar que las instancias de Template CMS V2 (empezando por sitios informativos tipo Kautela, y luego ecommerce) puedan ser auto-gestionadas por el cliente final, sin depender de Anvetcorp para cambios de contenido.

No es uno de los 8 manuales oficiales de arquitectura frontend (`docs/v2/`). Es un documento de planificación de negocio + backend que debe respetarlos como fuente de verdad para todo lo relacionado a Data/Sections/Variants.

---

## 1. Contexto y motivación real

La necesidad no es "editar el sitio de Anvetcorp". Es **vender instancias de este template a clientes que necesitan auto-gestionar su contenido** después de un período inicial de garantía.

Modelo comercial acordado con cada cliente:

- **Días 1–20**: desarrollo de la instancia.
- **Días 21–110** (90 días desde entrega): garantía y mantenimiento — los cambios de contenido los hace Anvetcorp.
- **Día 110 en adelante**: se habilita al cliente la plataforma de auto-gestión de contenido (CMS).

Esto significa que, desde la firma de un cliente, Anvetcorp tiene **~110 días** para tener el CMS (y, si aplica, el módulo ecommerce) listos y operativos para esa instancia.

Urgencia de negocio (contexto, no requisito técnico): campaña activa de Meta Ads generando leads tanto para sitios informativos como para ecommerce; ambos caminos deben avanzar en paralelo.

---

## 2. Alcance oficial del CMS

**El CMS es únicamente de contenido. No es un constructor de sitios.**

### Permitido (el cliente puede editar):
- Texto (todo el `content` de una Section Data).
- Imágenes.
- Videos (donde `image.type: "video"` ya esté soportado por la Variant).
- Color de texto (vía `meta.tone`).
- Tamaño de texto (vía `meta.typography`).

### Prohibido (el CMS nunca debe permitir):
- Cambiar layouts.
- Crear o eliminar componentes.
- Crear o eliminar Sections.
- Cambiar la tipografía (`font-family`). **Confirmado: la fuente es una decisión a nivel de sitio completo (Globals), no editable por instancia ni por el cliente.**
- Cualquier cosa que implique tocar capas por debajo de DATA (Pages, Sections, Variants, UI Base, Globals) en la arquitectura oficial (`DATA → PAGES → SECTIONS → VARIANTS → UI BASE → GLOBALS`).

Es decir: el CMS opera **exclusivamente sobre la capa DATA**, respetando el contrato oficial de Section Data (`id, enabled, component, variant, surface, containerWidth, spacing, background, content, media, items, actions, meta`). Nunca reinterpreta ni modifica capas superiores.

Posible evolución futura (no en el alcance actual): más funcionalidades de auto-gestión. No definido todavía — no se debe construir nada para esto hasta que se decida explícitamente.

---

## 3. Por qué el template ya está listo para esto

El trabajo de la sesión de tone/typography/MediaFrame (agosto 2026) fue, en el fondo, preparar el contrato de Data para ser "CMS-friendly":

- **`meta.tone`** — color de texto por instancia, sin tocar código de la Variant. Ver `CLAUDE.md` sección "Tono de Texto" y manual 03 sección 7.1.
- **`meta.typography`** — tamaño de texto (`titleSize`, `descriptionSize`) por instancia. Ver `CLAUDE.md` sección "Tamaño de Texto" y manual 03 sección 7.2.
- **`image.type`** (`"image"` | `"video"`) — soporte de video ya resuelto en `MediaFrame` (UI Base) y leído correctamente desde Data en todas las Variants.

Estos tres mecanismos son exactamente los campos que un futuro editor de CMS necesita poder escribir. No se requiere ningún cambio adicional de arquitectura frontend para que el CMS funcione — el CMS solo necesita generar/editar los mismos objetos Data que ya consume Next.js.

---

## 4. Interfaz del CMS

**Decisión: Django Admin como interfaz inicial (MVP) — no como interfaz definitiva ni cerrada.**

Justificación del MVP: dado que el alcance es estrictamente contenido (texto, imagen/video, color y tamaño de texto — nunca layout), un panel de administración tipo formulario (Django Admin, posiblemente con algún tema/plugin visual) cubre el 100% del alcance sin construir un editor visual desde cero. Esto reduce drásticamente tiempo de desarrollo frente a un constructor de páginas, y permite cumplir el timeline de 110 días.

**Requisito explícito: el backend debe quedar abierto para integrar, más adelante, una interfaz propia (custom) con mejor estética/UX, sin tener que rehacer el backend.**

Cómo se garantiza esto (ver también sección 5):
- El backend se diseña **API-first** (Django REST Framework u equivalente) desde el día 1, no "Django Admin directo sobre la base de datos" como único punto de entrada.
- Django Admin es, técnicamente, **el primer cliente de esa API** — no el mecanismo exclusivo de edición. Next.js consume la API en modo lectura para renderizar el sitio; una futura interfaz propia consumiría la misma API en modo lectura/escritura para editar contenido.
- Consecuencia práctica: cuando se decida construir la interfaz propia (React/Next admin panel, por ejemplo), el trabajo es **solo frontend** — consumir los mismos endpoints que ya existen y ya están probados por Django Admin — sin tocar modelos, lógica de negocio ni el contrato de datos.
- No se debe acoplar ninguna lógica de negocio dentro de las vistas de Django Admin (customizaciones, `save_model`, etc.) que no exista también en la capa de API/servicio. Django Admin debe ser una capa delgada sobre la misma lógica que expone la API, nunca un camino paralelo con reglas propias.

---

## 5. Arquitectura de backend propuesta (borrador, no cerrada)

Idea de trabajo, pendiente de validar en detalle:

- **Un proyecto Django por instancia de cliente** (a confirmar vs. alternativa multi-tenant, ver sección 6).
- **Capa de API — obligatoria desde el MVP**: Django REST Framework (u equivalente) expone los modelos de contenido vía endpoints. Toda lectura/escritura de contenido pasa por aquí — Django Admin incluido. Esta capa es la que deja la puerta abierta a una interfaz propia futura (sección 4).
- **Capa base — `content-admin`**: modelos Page / Section que reflejan 1:1 el contrato oficial de Section Data (mismo shape: `id, enabled, component, variant, surface, containerWidth, spacing, background, content, media, items, actions, meta`). Django Admin edita estos modelos a través de la capa de API (no directo contra el ORM sin pasar por ella); un endpoint sirve el JSON resultante para que Next.js lo consuma como si fuera el archivo `*.sections.data.js` actual.
- **Capa opcional — `ecommerce`**: módulo adicional (Product, Cart, Order) que se activa solo si la instancia lo requiere. Pasarela de pago: **PayPhone**. Se expone por la misma capa de API.
- El módulo ecommerce se construye **sobre** la base de content-admin, no en paralelo ni de forma independiente — reutiliza la misma lógica de servir Data a Next.js.

---

## 6. Decisión pendiente (abierta)

**¿Un backend Django por cliente, o un backend multi-tenant que sirve a todos los clientes?**

No resuelto todavía. Trade-offs a evaluar cuando se retome este tema:
- Por-cliente: más simple de aislar y desplegar, pero más instancias que mantener/actualizar.
- Multi-tenant: una sola base de código que mantener, pero mayor complejidad de aislamiento de datos y mayor riesgo si algo falla (afecta a todos los clientes a la vez).

---

## 7. Próximos pasos

1. Cerrar la decisión de la sección 6 (por-cliente vs. multi-tenant).
2. Definir el modelo de datos de `content-admin` en Django a partir del contrato oficial de Section Data (secciones 5 y 6 del manual 03).
3. Definir la capa de API (DRF) sobre esos modelos — el contrato de endpoints es lo que garantiza poder integrar una interfaz propia después sin rehacer backend.
4. Definir el endpoint/mecanismo por el cual Next.js consume el Data servido por Django (reemplazando o complementando los archivos `*.data.js` estáticos actuales).
5. Prototipo mínimo: una Section editable de principio a fin (Django Admin → API → Next.js render) antes de escalar a todas las Sections. El prototipo debe demostrar que Django Admin escribe a través de la API, no directo al modelo.
6. Definir alcance técnico del módulo ecommerce (Product/Cart/Order + integración PayPhone) una vez validado el content-admin base.
7. (Futuro, no priorizado) Evaluar y diseñar la interfaz propia de CMS sobre la API ya existente, cuando el negocio lo requiera.

---

## 8. Relación con `decision-log.md`

Este documento **reemplaza** la entrada `CMS y backend quedan diferidos` de `docs/decisions/decision-log.md`. Esa entrada debe actualizarse para reflejar que el trabajo ya está en planificación activa, con este documento como referencia.
