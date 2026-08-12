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

## 5. Arquitectura de backend

- **Un solo proyecto Django + una sola base de datos, multi-tenant**, sirviendo a todos los clientes CMS/ecommerce (ver decisión sección 6). Cada cliente es una fila del modelo `Site` (el tenant), no un backend separado.
- **Tenant scoping obligatorio**: todo modelo de contenido (`Page`, `Section`, `NavigationConfig`, `Promotion`, `Product`, `Collection`, etc.) tiene un FK a `Site`. Ninguna query de lectura o escritura puede ejecutarse sin filtrar por `site` — esto no es opcional ni "se agrega después", es la base de que el modelo compartido sea seguro. Ver `docs/implementation/CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md` Fase 1 para el detalle de cómo se aplica esto en los modelos y en la capa de permisos.
- **Capa de API — obligatoria desde el MVP**: Django REST Framework (u equivalente) expone los modelos de contenido vía endpoints, todos con el `site` como parte de la ruta (`/api/v1/sites/{site}/...`) — este diseño ya estaba pensado así desde el inicio, así que la reversión de "por cliente" a "multi-tenant" no rompe el contrato de API ya definido, solo cambia qué hay del otro lado (una tabla filtrada por `site`, no una base de datos entera). Toda lectura/escritura de contenido pasa por aquí — Django Admin incluido. Esta capa es la que deja la puerta abierta a una interfaz propia futura (sección 4).
- **Capa base — `content-admin`**: modelos Page / Section que reflejan 1:1 el contrato oficial de Section Data (mismo shape: `id, enabled, component, variant, surface, containerWidth, spacing, background, content, media, items, actions, meta`), cada uno con su `site` FK. Django Admin edita estos modelos a través de la capa de API (no directo contra el ORM sin pasar por ella); un endpoint sirve el JSON resultante para que Next.js lo consuma como si fuera el archivo `*.sections.data.js` actual.
- **Capa opcional — `ecommerce`**: módulo adicional (Product, Cart) que se activa solo si la instancia lo requiere, también scoped por `site`. El módulo ecommerce se construye **sobre** la base de content-admin, no en paralelo ni de forma independiente — reutiliza la misma lógica de servir Data a Next.js.
- **Pago y facturación son dos sub-módulos opcionales, independientes entre sí, configurables por `Site` (decisión 2026-08-07):** no todo cliente de ecommerce necesita pasarela de pago (ver `CHECKLIST-CASO-USO-LANDING-PROMOCIONES-CATALOGO-WHATSAPP.md`, checkout por WhatsApp sin pago) ni todo cliente con pago necesita la misma pasarela ni el mismo sistema contable. Por eso:
  - **Pago:** `Order` con estados de pago solo existe para los `Site` que activan `paymentEnabled=True`. Arquitectura de proveedor plugable (`PaymentProvider`), no atado a una sola pasarela — arranca con **PayPhone**, extensible a Kushki/Datafast/PagoPlux según lo pida cada cliente. Los clientes sin pago siguen usando el modelo `Inquiry` (checkout por WhatsApp) del caso de uso ya documentado.
  - **Facturación:** módulo de integración con el **sistema contable que ya use cada cliente** (ContiFico, AZUR, Ciro Contable, Anfibius u otro), no un sistema de facturación propio de Anvetcorp. Arquitectura de proveedor plugable (`AccountingProvider`), scoped por `Site`, credenciales de API propias de cada cliente. Arranca con **ContiFico** (tiene API pública documentada y precedente real de integración con tiendas online). Independiente del sub-módulo de pago: un cliente puede querer facturación electrónica sin tener pago integrado en la plataforma (factura manual disparada al confirmar una venta por WhatsApp), o pago sin facturación automática si su contador la hace aparte.
  - Detalle de tareas: ver Fase 7 de `docs/implementation/CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`.
- **Frontend Next.js no cambia por esto**: cada cliente sigue siendo su propio repo/Project de Vercel, apuntando a la misma API compartida con su `site` identificador propio (token/slug). El aislamiento por cliente sigue existiendo en la capa de frontend/hosting; lo que se comparte es el backend.

---

## 6. Decisión: backend multi-tenant compartido

**Resuelto (2026-08-07, revirtiendo la decisión "por cliente" del mismo día): un solo proyecto Django + una sola base de datos**, multi-tenant, sirve a todos los clientes CMS/ecommerce.

Motivo del cambio: al cruzar "backend por cliente" contra el costo real de infraestructura (ver `docs/implementation/COSTOS-INFRAESTRUCTURA-MENSUAL.md`), un backend + base de datos por cliente en Render escala **linealmente** (~$44-89/mes de infraestructura por cliente en tiers de producción real). Eso hace inviable vender el CMS a ~$50/mes por cliente con margen razonable, especialmente en los tiers de ecommerce grande. Multi-tenant compartido baja el costo real a ~$5-13/cliente, porque un solo Web Service y una sola base de datos (que se escalan de tamaño, no se multiplican en cantidad) sirven a todos los clientes a la vez.

Contrapartida aceptada conscientemente:
- **Menos aislamiento entre clientes**: un incidente de datos, un bug de scoping, o una caída del backend afecta potencialmente a todos los clientes a la vez, no a uno solo. Se mitiga (no se elimina) con scoping por `site` obligatorio en todo modelo/query, tests que verifiquen que un tenant nunca puede leer/escribir datos de otro, y monitoreo reforzado (un solo punto de falla que hay que cuidar más, no menos).
- Reemplaza la consistencia previa "un cliente = una carpeta/repo, igual en frontend y backend" — ahora esa simetría solo aplica al frontend (Next.js sigue siendo un repo/Project por cliente); el backend es la excepción intencional.

No descartado a futuro: si un cliente puntual exige aislamiento total (por contrato, compliance, o volumen que satura el backend compartido), se puede evaluar sacarlo a su propio backend dedicado como caso excepcional — no como regla general.

---

## 7. Próximos pasos

1. ~~Cerrar la decisión de la sección 6 (por-cliente vs. multi-tenant).~~ Resuelto 2026-08-07 — multi-tenant compartido (revertida la decisión "por cliente" del mismo día, ver sección 6).
2. Definir el modelo de datos de `content-admin` en Django a partir del contrato oficial de Section Data (secciones 5 y 6 del manual 03), con `site` FK en cada modelo desde el diseño inicial — no agregarlo después.
3. Definir la capa de API (DRF) sobre esos modelos, con `site` en la ruta — el contrato de endpoints es lo que garantiza poder integrar una interfaz propia después sin rehacer backend.
4. Definir el endpoint/mecanismo por el cual Next.js consume el Data servido por Django (reemplazando o complementando los archivos `*.data.js` estáticos actuales).
5. Prototipo mínimo: una Section editable de principio a fin (Django Admin → API → Next.js render) **con al menos dos `Site` de prueba**, para validar desde el prototipo que el scoping por tenant funciona y que un cliente no puede ver/editar datos del otro — no dejarlo para después.
6. Definir alcance técnico del módulo ecommerce (Product/Cart/Order + integración PayPhone) una vez validado el content-admin base.
7. (Futuro, no priorizado) Evaluar y diseñar la interfaz propia de CMS sobre la API ya existente, cuando el negocio lo requiera.

Detalle de tareas y subtareas de los puntos 2–6: ver `docs/implementation/CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`.

---

## 8. Relación con `decision-log.md`

Este documento **reemplaza** la entrada `CMS y backend quedan diferidos` de `docs/decisions/decision-log.md`. Esa entrada debe actualizarse para reflejar que el trabajo ya está en planificación activa, con este documento como referencia.
