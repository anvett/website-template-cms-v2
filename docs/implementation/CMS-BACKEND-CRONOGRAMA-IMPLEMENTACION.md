# Cronograma de Implementación — CMS + Backend Django

Este documento traduce `docs/decisions/CMS-BACKEND-ECOMMERCE-ROADMAP.md` en tareas y subtareas ejecutables, con estimación de tiempo. Es un documento de **planificación de implementación**, no de arquitectura: si hay conflicto sobre qué se puede o no construir, manda el roadmap y los manuales de `docs/v2/`.

---

## 0. Supuestos del cronograma

- Equipo: 1 desarrollador full-stack dedicado (o equivalente en horas). Si el equipo es mayor, las fases 3–6 son paralelizables entre frontend/backend; ajustar duración a la baja.
- Unidad de estimación: semanas de trabajo efectivo, no días calendario.
- Se construye **una sola vez** el backend multi-tenant (Fases 1–6): a diferencia de Next.js (que sí se clona por cliente), el backend **no se vuelve a levantar por cliente** — cada cliente nuevo es solo una fila `Site` nueva en la base de datos compartida (provisioning, Fase 6.5 y `docs/implementation/PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md`).
- Decisión ya cerrada (revertida el 2026-08-07 respecto a la versión anterior de este documento): backend **multi-tenant compartido**, no uno por cliente — ver roadmap sección 6 y `docs/implementation/COSTOS-INFRAESTRUCTURA-MENSUAL.md` para la justificación de costo detrás del cambio.
- No incluye el módulo ecommerce en el camino crítico — es una fase separada (Fase 7) que arranca solo cuando content-admin esté validado en producción con al menos un cliente informativo.
- Referencia constante y obligatoria: contrato oficial de Section Data (`CLAUDE.md`, manual 03 sección 5) y estructura de Page Data / Site Data / Navigation Data (manual 05).

**Duración total estimada Fases 1–6 (CMS informativo, sin ecommerce): 9–11 semanas.**

---

## Fase 0 — Decisión de arquitectura (cerrada)

Estado: **completa.** Backend multi-tenant compartido (una app Django + una base de datos para todos los clientes, tenant scoping por `Site`). Ver `CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 6, `decision-log.md` y `COSTOS-INFRAESTRUCTURA-MENSUAL.md`.

---

## Fase 1 — Modelado de datos en Django ("content-admin")

**Objetivo:** modelos Django que reflejen 1:1 el contrato oficial de Data, sin reinterpretarlo.

**Duración estimada: 1.5–2 semanas.**

**Dependencias:** ninguna (puede arrancar de inmediato).

### 1.1 Scaffolding del proyecto backend (uno solo, no por cliente)
- Crear **un único** repo `template-cms-v2-backend`, compartido por todos los clientes — no se vuelve a crear otro backend para el próximo cliente.
- `django-admin startproject` + estructura de apps: `content_admin`, `api`, `core` (config común).
- Configurar `settings` por entorno (local/staging/producción) y variables de entorno (`.env`) desde el día 1 — nunca credenciales hardcodeadas.
- Elegir motor de base de datos (recomendado: PostgreSQL, por soporte nativo de `JSONField`).
- Configurar CORS (`django-cors-headers`) para permitir llamadas desde **todos** los dominios de los sitios Next.js de los clientes — lista de orígenes permitidos, actualizada al dar de alta cada cliente nuevo (no `*` abierto).

### 1.2 Modelo `Site` — es el tenant, no un mirror simple de `site.data.js`
- `Site` deja de representar "el único sitio de este backend" y pasa a ser **la fila que identifica a cada cliente** — habrá tantas filas `Site` como clientes activos en la plataforma.
- Campos: `slug` (identificador único usado en las rutas de API, ej. `kautela`), `name`, `legalName`, branding (`logo`, `favicon`, colores si aplica — confirmar contra manual 05 sección 10 qué es editable vs. Globals), `contact` (dirección, teléfonos, email), `social` (links), `seo` global (title, description, defaults OG), `active` (bool — permite desactivar un cliente sin borrar sus datos), `analytics` (`{gtmContainerId}` — contenedor de Google Tag Manager por `Site`, base en todos los planes 0-5, resolución 2026-08-07 en `decision-log.md`; permite que el cliente agregue Meta Pixel/GA/etc. sin redeploy).
- Regla: **no** incluir aquí nada de tipografía/Globals — eso no es contenido editable (CLAUDE.md, sección "Prohibido").
- **Todo modelo de contenido de acá en adelante (`Page`, `Section`, `NavigationConfig`, `ReusableData`, y en Fase 7 `Promotion`/`Product`/`Collection`) lleva FK a `Site` desde el diseño inicial, no como agregado posterior.** Es el mecanismo central de aislamiento entre clientes dentro de la base de datos compartida.

### 1.3 Modelo `NavigationConfig` (mirror de `navigation.data.js`)
- FK a `Site` (uno por cliente).
- Campos: `announcement` (texto/habilitado), `navbar` (items, orden — orden obligatorio ya definido en manual 05 sección 9.1, no editable por el cliente si implica reestructurar), `footer` (columnas/links/legal).
- Decidir explícitamente: ¿el cliente puede reordenar el navbar, o el orden es fijo y solo edita textos/links? (Definir contra manual 05 9.1 antes de construir el form de Admin — si el orden es arquitectura, no debe ser editable).

### 1.4 Modelo `Page` (mirror de `*.page.data.js`)
- FK a `Site`. Campos: `slug`, `seo` (title, description, keywords), `openGraph` (image, title, description), `sections` (referencia ordenada a `Section`, no contenido embebido).
- Constraint de unicidad: `slug` único **por `Site`**, no global (dos clientes distintos pueden tener ambos una página `/servicios`, sin colisión).

### 1.5 Modelo `Section` (mirror del contrato oficial — el núcleo del sistema)
- Pertenece a un `Page` (que ya está scoped por `Site`) — no necesita FK directa a `Site` propia, se resuelve vía `section.page.site`, pero **todas las queries de la API deben filtrar explícitamente por ese camino**, nunca listar `Section` sin pasar por su `Page`/`Site`.
- Campos exactos del contrato: `id` (slug único **por Page**, no global), `enabled` (bool), `component` (choice: Hero, About, Services, Features, CTA, Stats, Products, Contact, Comparison, Testimonials, FAQ, Team, Partners, Quote, Content/DualContent, Legal — según catálogo real en `src/components/sections/`), `variant` (string, validado contra las variants oficiales de cada component — ver manual 03 catálogo), `surface` (choice: base/subtle/strong), `containerWidth` (choice: content/section/wide), `spacing` (choice: compact/default/hero), `background` (JSONField: `{type, variant}` con `type` en surface/gradient/image), `content` (JSONField libre pero documentado por variant), `media` (JSONField: `{background: {src, alt}, foreground}`), `items` (JSONField, array), `actions` (JSONField, array), `meta` (JSONField: `{overlay, overlayOpacity, tone, typography, form}`).
- Aplicar el equivalente Django de `withSectionsDefaults`: al crear una `Section`, precargar `media.background = {src: "", alt: ""}` y `meta = {overlay: true, overlayOpacity: 0.6, ...}` — **replicar la misma lógica de `sectionDefaults.js`, no reinventarla** (regla explícita de CLAUDE.md: "No reinventar esta lógica dentro de una Variant").
- `order` (integer) dentro de su `Page`, para respetar el mapa de Sections de cada página.

### 1.6 ~~Modelo `ReusableData`~~ (omitido, 2026-08-12)
Confirmado por el dueño del proyecto: el concepto "reusable" (`src/data/reusable/*.data.js`) se creó para no repetir componentes/partes comunes, pero nunca se implementó ni se llegó a usar en el frontend real — el único archivo (`contact-methods.data.js`) está vacío y sin consumidores. Se omite el modelo hasta que exista un caso de uso real. Detalle en `docs/decisions/decision-log.md`.

### 1.7 Capa de aislamiento entre tenants (nueva, específica de multi-tenant)
- Middleware o manager de Django que resuelva el `Site` activo de cada request (por token de API, por header, o por el `slug` en la ruta) y lo inyecte en el contexto — ningún endpoint debe poder "olvidarse" de filtrar por site.
- Regla de oro: usar un manager/queryset base que **fuerce** el filtro por `site` en todos los modelos scoped (ej. sobreescribiendo `objects` para que sea imposible hacer `Section.objects.all()` sin pasar antes por un `Site`) — no confiar en que cada vista individual se acuerde de filtrar a mano.
- Test obligatorio antes de cerrar esta fase: crear dos `Site` de prueba con datos distintos y verificar programáticamente que ninguna combinación de endpoint + credenciales de un `Site` puede leer o escribir datos del otro.

### 1.8 Validación de integridad del contrato
- Validators a nivel de modelo (`clean()` / `full_clean()`) que rechacen:
  - `variant` no perteneciente al catálogo oficial de su `component`.
  - `surface`/`containerWidth`/`spacing`/`background.type` fuera de las opciones oficiales.
  - `meta.tone` fuera de los valores oficiales (`inverse`, `default`, `muted`, `accent`, `primary`, `secondary`, `brandPrimary`, `brandSecondary`, `brandAccent`, `danger`).
  - `meta.typography.titleSize`/`descriptionSize` fuera de la escala oficial (`sm`/`md`/`lg`/`xl` según corresponda).
- Esto es lo que impide que, aunque el CMS sea "solo formularios", alguien termine escribiendo un Data inválido que rompa el render en Next.js.

### 1.9 Migraciones + datos semilla
- `makemigrations` / `migrate`.
- Fixture o management command que cargue como semilla el contenido actual de un `*.sections.data.js` real del template (tomar un ejemplo simple, ej. `hero`) para validar que el modelo puede representarlo sin pérdida de información — cargarlo bajo **dos `Site` de prueba distintos**, no uno solo, para poder validar el aislamiento (1.7) desde el arranque.

**Entregable de la fase:** modelos migrados con `site` FK en todo lo que corresponde, capa de aislamiento por tenant probada, y dos `Site`/Page/Section de ejemplo cargados en la misma base de datos que reproducen fielmente un Data real existente en el repo Next.js, sin filtrarse datos entre ellos.

---

## Fase 2 — Capa de API (Django REST Framework)

**Objetivo:** toda lectura/escritura de contenido pasa por API — Django Admin incluido. Es la pieza que garantiza poder reemplazar la interfaz más adelante sin tocar backend (roadmap sección 4).

**Duración estimada: 1.5 semanas.**

**Dependencias:** Fase 1 completa.

### 2.1 Setup DRF
- Instalar y configurar `djangorestframework`.
- Definir versionado de API desde el día 1 (`/api/v1/...`) — evita romper a Next.js cuando la API evolucione.

### 2.2 Serializers
- `SiteSerializer`, `NavigationConfigSerializer`, `PageSerializer` (con Sections anidadas, ordenadas), `SectionSerializer` (validando los mismos choices/reglas de 1.7 también a nivel de API, no solo de modelo — defensa en profundidad).
- Serializer de **salida agregada por página**: un endpoint que devuelva `Page` + su `sections` ya ordenadas y con defaults resueltos, en el shape exacto que hoy consume Next.js desde `*.page.data.js` + `*.sections.data.js`. Este es el contrato más importante de toda la fase — de él depende no tener que tocar componentes React.

### 2.3 Endpoints de lectura (públicos o con token de servicio, según decisión de seguridad)
- `GET /api/v1/sites/{site}/` — datos globales de sitio.
- `GET /api/v1/sites/{site}/navigation/` — navbar/footer/announcement.
- `GET /api/v1/sites/{site}/pages/{slug}/` — page data + sections resueltas, listo para renderizar.
- `GET /api/v1/sites/{site}/pages/` — mapa de páginas (para generar rutas estáticas/sitemap en Next.js).

### 2.4 Endpoints de escritura (autenticados)
- CRUD estándar de DRF (`ModelViewSet`) para `Section`, `Page`, `NavigationConfig`, `Site`, con permisos por rol (ver 2.6).
- Los endpoints de escritura son los que tanto Django Admin como una futura interfaz propia deben usar — **ninguna vista de Django Admin debe tener lógica de guardado propia que no pase por el serializer/servicio** (regla explícita del roadmap sección 4).

### 2.5 Capa de servicio (opcional pero recomendada)
- Extraer la lógica de "aplicar defaults al crear/editar una Section" (equivalente a `withSectionDefaults`) a una función de servicio compartida, invocada tanto por el serializer de la API como por cualquier signal/save de Admin. Un solo lugar de verdad, igual que en el frontend.

### 2.6 Autenticación y permisos (crítico en multi-tenant, no solo "nice to have")
- Definir mecanismo: token/JWT **por Site** para consumo de Next.js (lectura) — el token del sitio de un cliente nunca debe poder leer datos de otro `Site`, ni por error de configuración. Sesión/token para usuarios humanos (Django Admin / futura interfaz).
- Roles mínimos: `admin_anvetcorp` (acceso a todos los Sites) y `client_editor` (acceso **exclusivamente** a su propio Site — texto, imagen, tone, typography; sin acceso a crear Sections/Pages nuevas si eso se decide reservar a Anvetcorp, y sin ninguna forma de ver o listar otros Sites desde el Admin).
- **Definir explícitamente si el cliente final puede crear/eliminar Sections o solo editar las existentes.** El roadmap dice que el CMS "nunca" permite crear/eliminar Sections — esto debe reflejarse en permisos de API, no solo como convención de UI.
- Esta capa es la que sostiene todo el modelo de negocio multi-tenant: un fallo acá no es un bug de UX, es un cliente viendo o editando el sitio de otro cliente. Cubrir con tests de permisos explícitos, no solo tests funcionales.

### 2.7 Documentación de API
- `drf-spectacular` o similar → OpenAPI/Swagger autogenerado. Es lo que hace posible que una futura interfaz propia se construya sin tener que leer el código del backend.

### 2.8 Servicio de notificación por email (transversal, resolución 2026-08-07)
- Setup de un proveedor de email transaccional (ej. Resend/SendGrid/Postmark — mismo presupuestado en `COSTOS-INFRAESTRUCTURA-MENSUAL.md`), como servicio compartido reutilizable desde cualquier app del backend, no solo ecommerce.
- Este servicio es consumido más adelante por: envío de formulario de contacto (content-admin, ver riesgo si existe modelo de lead genérico — confirmar contra manual aplicable), y por `Inquiry`/`Order` en Fase 7.1. En todos los casos, el email es **respaldo de WhatsApp, no reemplazo** — ver `decision-log.md`.
- Definir plantilla mínima (quién lo recibe, qué datos incluye) antes de escalar a los distintos triggers — un solo formato base, no uno por caso de uso.

### 2.9 Endpoint de exportación/portabilidad de datos (resolución 2026-08-11, `decision-log.md`)
- `GET /api/v1/sites/{site}/export/`, restringido al rol `admin_anvetcorp` (nunca `client_editor` — es una operación de offboarding, no de uso diario del CMS).
- Reutiliza los serializers ya construidos en 2.2 para armar un JSON agregado de `Page`/`Section`/`NavigationConfig` y, si el `Site` tiene ecommerce activo, `Collection`/`Product`/`ProductVariant`/`ProductImage`/`Promotion` — mismo shape del contrato de Section Data, no un formato nuevo.
- Empaqueta además un ZIP con las imágenes reales descargadas de R2 (no alcanza con URLs si el `Site` se va a purgar después de la salida del cliente).
- **Excluye por default** `Inquiry`/`Order`: contienen datos personales de los compradores del cliente, no del cliente en sí — sujetos a la política de retención LOPDP (Fase 6.6). Incluirlos requiere pedido explícito del cliente saliente, documentado como excepción puntual.
- Usado desde el proceso de offboarding, ver `PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md` sección 5.

**Entregable de la fase:** API navegable (Swagger) con endpoints de lectura y escritura probados manualmente (Postman/cURL) contra los datos semilla de la Fase 1, servicio de email transaccional operativo y probado con un envío de prueba, y endpoint de exportación probado generando un bundle completo de un `Site` de prueba.

---

## Fase 3 — Integración con Next.js

**Objetivo:** Next.js consume Data desde la API en vez de (o además de) los archivos estáticos `*.data.js`.

**Duración estimada: 1 semana.**

**Dependencias:** Fase 2 completa.

### 3.1 Definir estrategia de consumo
- Opción recomendada: capa de fetch en `src/lib/` (ej. `src/lib/cms/fetchPageData.js`) que llama a la API y devuelve el mismo shape que hoy exportan los archivos `*.data.js`. Los componentes de Página/Section **no deben enterarse** de si el dato vino de un archivo o de la API — mismo contrato de entrada.
- Definir modo de renderizado: SSG con revalidación (`revalidate`) vs. SSR. Recomendado ISR (`revalidate: N segundos`) para que el cliente vea sus cambios sin necesitar un redeploy, sin pagar el costo de SSR completo.

### 3.2 Variables de entorno por instancia
- `NEXT_PUBLIC_CMS_API_URL` / `CMS_API_TOKEN` (server-side only) por instancia de cliente, siguiendo el mismo patrón de "una instancia = su propia config" que ya existe para branding.

### 3.3 Manejo de fallback / resiliencia
- Definir comportamiento si la API Django está caída en build/request time: ¿usar last-known-good cacheado, o fallar el build? (Afecta disponibilidad del sitio del cliente — no es un detalle menor).

### 3.4 Convivencia transitoria con Data estático
- Durante la migración, decidir si conviven ambos mecanismos (algunas páginas desde archivo, otras desde API) o si el corte es total por instancia. Recomendado: por instancia, no mezclado dentro del mismo sitio — reduce superficie de bugs.

**Entregable de la fase:** una página de prueba (no necesariamente la Fase 4 completa aún) renderizando desde la API en un entorno local, sin cambios en componentes React existentes.

---

## Fase 4 — Prototipo mínimo end-to-end

**Objetivo:** demostrar el ciclo completo Django Admin → API → Next.js con una sola Section real, antes de escalar. Es el gate de validación de todo el diseño anterior.

**Duración estimada: 3–4 días.**

**Dependencias:** Fases 1–3 completas.

### 4.1 Elegir la Section piloto
- Recomendado: `Hero`, por ser la más usada y la que ya tiene reglas de tone/typography/overlay/media completamente resueltas en el frontend (menor riesgo de encontrar un caso no cubierto por el modelo).

### 4.2 Registrar el modelo en Django Admin
- `ModelAdmin` para `Section` con widgets razonables para los JSONField (al menos `django-json-widget` o similar — JSON crudo sin ayuda visual no es aceptable ni para MVP).
- Confirmar que el guardado desde Admin pasa por la capa de servicio de 2.5 (no `save()` directo sin validación).

### 4.3 Editar contenido real desde Admin y verificar en Next.js
- Cambiar texto, imagen, `meta.tone` y `meta.typography` desde Django Admin.
- Confirmar que el sitio Next.js (local, apuntando a la API) refleja el cambio sin tocar código ni redeploy (más allá de la revalidación configurada en 3.1).

### 4.4 Checklist de aceptación del prototipo
- [ ] El cambio se guarda vía API (verificable en logs/Swagger), no directo a la base.
- [ ] El render en Next.js es visualmente idéntico al de la misma Section servida desde archivo estático, con el mismo dato.
- [ ] Cambiar `meta.tone`/`meta.typography` desde Admin produce el mismo resultado que cambiarlo hoy a mano en el archivo `.data.js`.
- [ ] Ningún componente React fue modificado para lograr esto.

**Entregable de la fase:** demo funcional + checklist firmado. Este es el punto de decisión: si el prototipo falla algún ítem, se corrige el diseño de Fases 1–3 antes de escalar (más barato corregir acá que después de migrar 17 tipos de Section).

---

## Fase 5 — Escalar a todo el catálogo de Sections y páginas

**Objetivo:** cubrir el 100% de los components/variants existentes, no solo Hero.

**Duración estimada: 2.5–3 semanas** (depende de cuántas variants por component tengan estructuras `content`/`items` particulares).

**Dependencias:** Fase 4 aprobada.

### 5.1 Inventario de components y variants
- Confirmar contra `src/components/sections/` el catálogo completo a cubrir: About, Comparison, Contact, CTA, Dual-content, FAQ, Features, Footer, Hero, Navbar, Partners, Products, Quote, Services, Stats, Team, Testimonials.
- Para cada uno: documentar el shape esperado de `content`/`items`/`actions` (algunos ya están documentados en manual 03 parte 2; usarlo como fuente, no reinventar).

### 5.2 Ajustar Admin por grupo de Sections
- Agrupar por similitud de estructura (ej. Sections con `items` tipo lista de cards vs. Sections de bloque único) para no repetir configuración de Admin 17 veces desde cero.
- Prioridad sugerida: primero las Sections usadas en toda instancia (Hero, About, Contact, CTA, Footer/Navbar), después las opcionales (Comparison, Testimonials, Team, Partners, Quote).

### 5.3 Validación cruzada por Section
- Para cada component: repetir el checklist de la Fase 4.4 (edición vía Admin → API → render Next.js idéntico al estático).

### 5.4 Migración de una instancia real completa (piloto)
- Tomar una instancia de cliente real (o la base Kautela como banco de pruebas) y migrar **todas** sus páginas/Sections desde archivos estáticos hacia el backend, de punta a punta.
- Validar que el sitio completo renderiza igual, página por página.

**Entregable de la fase:** una instancia completa operando 100% desde Django + API, sin ningún archivo `*.data.js` estático activo.

---

## Fase 6 — Endurecimiento para uso por el cliente final

**Objetivo:** lo construido en Fases 1–5 funciona para un desarrollador; esta fase lo deja usable por una persona no técnica (el cliente), que es el objetivo de negocio real.

**Duración estimada: 1.5–2 semanas.**

**Dependencias:** Fase 5 completa.

### 6.1 UX de Django Admin para no-técnicos
- Reemplazar/mejorar widgets JSON crudos por campos específicos donde sea posible (ej. `meta.tone` como `<select>` con las opciones oficiales, no texto libre; `meta.typography.titleSize` como `<select>`).
- Editor de texto enriquecido solo donde el contrato lo permita (confirmar si `content.description` admite HTML/rich text o es texto plano — definir explícitamente, no asumir).
- Widget de subida/preview de imagen para `media.background.src` e `image.src` (no solo un campo de texto con la URL).

### 6.2 Gestión de medios
- Definir almacenamiento de imágenes/videos subidos por el cliente: S3/Cloudinary/equivalente (no filesystem local del servidor Django en producción).
- Optimización/transformación de imágenes al subir (respetar `ratio`/`fit` ya definidos por la Variant — el CMS no debe permitir subir una imagen que rompa el `aspect-ratio` esperado sin al menos advertir).
- **Compresión/redimensionado automático obligatorio (resolución 2026-08-07, `decision-log.md`):** toda imagen subida vía CMS o vía importación CSV (Fase 7.2) se procesa en el backend a un máximo razonable de peso/dimensión antes de guardarse en R2, sin intervención del cliente ni del `client_editor` — no es una opción, es parte del pipeline de guardado. Protege el costo de storage proyectado en `COSTOS-INFRAESTRUCTURA-MENSUAL.md` y la performance del sitio Next.js.

### 6.3 Permisos y acceso del cliente
- Crear el rol `client_editor` (definido en 2.6) de forma operativa: alta de usuario por cliente, scoping a su propio Site, sin acceso a otros modelos/instancias.
- Página de login simple y clara para el cliente (Django Admin lo resuelve out-of-the-box, pero revisar branding mínimo para que no se vea como panel interno de desarrollador).

### 6.4 Vista previa antes de publicar (evaluar)
- Decidir si el MVP requiere "modo borrador" (guardar sin publicar) o si todo cambio es inmediato. Afecta si se agrega un campo de estado (`draft`/`published`) a `Page`/`Section` — no está en el contrato oficial actual de Data, así que si se agrega, debe quedar documentado como extensión del backend, no como cambio al contrato de Section Data del frontend.

### 6.5 Documentación operativa
- Manual corto para el cliente final: qué puede editar y qué no (basado 1:1 en roadmap sección 2), con capturas.
- Manual interno para Anvetcorp: cómo dar de alta un `Site` nuevo en el backend compartido (provisioning — ya no implica levantar un backend nuevo, ver `PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md`), y cómo dar de alta al usuario del cliente el día 110.

### 6.6 Cumplimiento base LOPDP (resolución 2026-08-07, `decision-log.md`)
- Aplica a **todo** `Site` que capture datos de visitante/comprador (formulario de contacto, `Inquiry`, `Order`, analítica vía GTM) — es decir, prácticamente todos los planes salvo landing sin CMS sin formularios.
- Política de privacidad real por cliente (nunca copiada de otro sitio — riesgo señalado explícitamente por la SPDP como infracción común): campo/página editable en el CMS, no texto fijo en código.
- Banner de consentimiento de cookies para analítica (bloquea GTM/Pixel/GA hasta aceptación explícita, no carga silenciosa).
- Checkboxes de consentimiento explícito y **no premarcado** en formularios de contacto/checkout que capturen datos personales — validar en frontend y backend, no solo visual.
- Política de retención de datos de `Inquiry`/`Order`: definir por cuánto tiempo se conservan y mecanismo de eliminación a pedido del titular (derecho de supresión).
- **Esto es una base técnica razonable, no asesoría legal — no reemplaza revisión por un abogado especializado en LOPDP.** Dejar esto explícito también en el manual operativo de 6.5.

**Entregable de la fase:** CMS listo para entregar a un cliente real sin acompañamiento técnico de Anvetcorp en cada edición, con el paquete base LOPDP activo por defecto en cualquier `Site` con captura de datos.

**Proceso de deploy/provisioning (Vercel + Render) detallado en `docs/implementation/PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md`** — incluye la política de propiedad de cuenta de hosting (mixta, se decide por cliente).

---

## Fase 7 — Módulo Ecommerce (Product / Cart + Pago y Facturación opcionales)

**Estado: no arranca hasta validar Fases 1–6 en producción con al menos un cliente informativo.**

**Duración estimada: 5–7 semanas** (revisada 2026-08-07 al incorporar pago y facturación como sub-módulos plugables — antes era 3-4 semanas asumiendo un solo camino de checkout).

**Decisión de alcance (2026-08-07, extendida 2026-08-11 con envío):** el módulo ecommerce debe soportar **tres configuraciones posibles por `Site`**, no una sola:
1. Catálogo + carrito, checkout por WhatsApp, sin pago ni facturación integrados (caso ya documentado en `CHECKLIST-CASO-USO-LANDING-PROMOCIONES-CATALOGO-WHATSAPP.md`).
2. Catálogo + carrito + **pago integrado** (pasarela), sin facturación automática.
3. Catálogo + carrito + pago integrado + **facturación automática** contra el sistema contable del cliente.

Pago y facturación son **interruptores independientes** entre sí — un cliente puede tener uno sin el otro. Ningún cliente está obligado a tener ninguno de los dos. **Envío (7.5) es un cuarto interruptor independiente de los tres anteriores** — un `Site` puede tener envío activado sin pago integrado (ej. calcula el costo de envío pero igual cierra por WhatsApp), o con pago integrado, según lo que necesite.

### 7.1 Definir alcance técnico exacto (bloqueante, hacer primero)
- Modelo de `Product`/`Collection` — confirmar si reutiliza el component `Products` (ProductCards/PartsGallery) ya existente en el frontend, o si hace falta una Variant nueva (`product-cards-shop`, ya anticipada en el checklist de caso de uso) — no una Section nueva.
- Modelo `EcommerceConfig` por `Site`: `paymentEnabled` (bool), `paymentProvider` (choice, nulo si `paymentEnabled=False`), `invoicingEnabled` (bool), `accountingProvider` (choice, nulo si `invoicingEnabled=False`), `shippingEnabled` (bool, resolución 2026-08-11 — ver 7.5). Este modelo es el que decide, en tiempo de ejecución, qué combinación de sub-módulos aplica a cada cliente.
- `Order` con estados de pago (`pending`/`paid`/`failed`/`refunded`) **solo se crea para `Site` con `paymentEnabled=True`**. Los `Site` sin pago siguen usando `Inquiry` (ya definido en el checklist de caso de uso) — no forzar `Order` donde no aplica. Ambos modelos (`Order` e `Inquiry`) agregan `shippingAddress`/`shippingCost` **solo si `shippingEnabled=True`** (7.5) — no son campos por defecto.

### 7.2 Importación masiva de catálogo vía CSV (resolución 2026-08-07, `decision-log.md`)
- Requisito funcional nuevo: herramienta de importación de `Product`/`Collection`/`ProductVariant` desde un archivo CSV provisto por el cliente, usada por Anvetcorp durante el onboarding cuando el cliente entrega su catálogo en ese formato — no es data entry manual, es mapeo y validación de columnas.
- Definir plantilla oficial de CSV (columnas mínimas: nombre, descripción, precio, SKU, colección, stock, URLs de imágenes) y publicarla como parte del discovery de onboarding (ver `PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md`).
- Validación en la importación: mismos validators de integridad de contrato que en Fase 1.8 (no permitir productos con datos incompletos o fuera de los choices oficiales), con reporte legible de filas rechazadas — no fallar todo el archivo por un solo error.
- Imágenes referenciadas por URL en el CSV pasan por el mismo pipeline de compresión automática de 6.2 al importarse, igual que una subida manual.
- Si el cliente no provee CSV: Anvetcorp carga solo un lote de ejemplos vía Admin y el cliente completa el resto desde el CMS — la carga manual completa por parte de Anvetcorp (sin CSV) es un servicio adicional pago, no parte del alcance base (ver `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md`).

### 7.3 Módulo de pago (opcional, arquitectura de proveedor plugable)
- Definir interfaz `PaymentProvider` (clase base / protocolo) con métodos comunes (`create_charge`, `verify_webhook`, `refund`) — cada pasarela implementa esta interfaz, el resto del sistema no conoce detalles de una pasarela específica.
- Implementar el primer adapter: **PayPhone** (sandbox y producción, webhooks de confirmación de pago).
- Diseño explícito para que agregar una segunda pasarela (Kushki, Datafast, PagoPlux — las que pidan clientes futuros) sea implementar un adapter nuevo, no tocar el resto del sistema.
- Definir manejo de estados intermedios (pago pendiente, fallido, confirmado) y su efecto en `Order`.
- **Comisión de la pasarela (2.9%-5% + $0.30 por venta, según proveedor) es un costo que paga el cliente final, no Anvetcorp** — no confundir con los costos de infraestructura de `COSTOS-INFRAESTRUCTURA-MENSUAL.md`.

### 7.4 Módulo de facturación / integración contable (opcional, arquitectura de proveedor plugable, independiente del pago)
- Definir interfaz `AccountingProvider` (clase base / protocolo) con métodos comunes (`create_invoice`, `get_invoice_status`) — cada sistema contable de cliente implementa esta interfaz.
- Implementar el primer adapter: **ContiFico** (API pública documentada, con precedente real de integración con tiendas online — ver investigación de mercado). Evaluar AZUR/Ciro Contable/Anfibius como siguientes adapters según lo que efectivamente usen los clientes reales, no especular con soporte para todos desde el día 1.
- Credenciales de API del sistema contable de cada cliente: **cifradas en la base de datos** (`django-cryptography` o equivalente), nunca texto plano — es información sensible de terceros, y al ser un backend multi-tenant compartido, una fuga acá expone credenciales de varios clientes a la vez (mismo principio de la Fase 2.6, elevado).
- Trigger de facturación: al confirmar una venta (pago aprobado si `paymentEnabled=True`, o marcado manual desde Django Admin si la venta se cerró por WhatsApp y el cliente igual quiere la factura emitida) — el trigger no depende de que el pago esté integrado en la plataforma.
- Definir manejo de fallos: si la llamada al sistema contable del cliente falla (su API está caída, credenciales vencidas), la venta/orden no debe quedar bloqueada — reintentar o marcar para facturación manual, nunca perder la venta por un error de integración de terceros.

### 7.5 Módulo de envío por reglas fijas (opcional, resolución 2026-08-11, `decision-log.md`)
- **Alcance deliberadamente acotado:** cálculo de costo de envío en el checkout según reglas configuradas por `Site` — **no** integración con transportistas reales (sin cotización dinámica, sin generación de guías, sin tracking). Esa integración queda descartada explícitamente para este módulo, no diferida a una fase futura.
- Modelo `ShippingConfig` (uno por `Site`, ligado a `EcommerceConfig.shippingEnabled`): `mode` (choice `flat`/`zone`), `flatCost` (usado si `mode=flat`), `freeThreshold` (monto de subtotal a partir del cual el envío es gratis, aplica en cualquier `mode`, nulo si no aplica), `zones` (JSONField, lista `{label, cost}`, usado si `mode=zone` — ej. `[{label: "Dentro de la ciudad", cost: 2.00}, {label: "Otras provincias", cost: 5.00}]`).
- Cálculo del costo: función de servicio pura (recibe `subtotal` + `zona seleccionada` si `mode=zone`, devuelve el costo) — reutilizable desde la API y desde cualquier lugar que necesite mostrar el costo antes del checkout final (ej. un resumen de carrito).
- `Order`/`Inquiry` guardan `shippingAddress` (JSONField: dirección/referencia capturada en el checkout) y `shippingCost` como **snapshot** del costo calculado al momento del pedido — no se recalcula retroactivamente si el cliente cambia `ShippingConfig` después.
- Registrar `ShippingConfig` en Django Admin con los mismos criterios de UX no-técnica de la Fase 6.1 (selects para `mode`, no JSON crudo para `zones` si es evitable).
- Cumple el mismo paquete base LOPDP de 6.6: `shippingAddress` es dato personal, sujeto a la misma política de retención que el resto de `Inquiry`/`Order`.

### 7.6 Exposición vía API
- Igual patrón que content-admin: endpoints DRF para catálogo (lectura pública), carrito (autenticado por sesión de comprador, no de cliente-editor), checkout, confirmación de pago (solo si `paymentEnabled`), estado de factura (solo si `invoicingEnabled`), cálculo de costo de envío (solo si `shippingEnabled`, 7.5).
- Endpoint de configuración por `Site`: el frontend debe poder consultar qué combinación de sub-módulos (7.1) aplica al cliente actual, para renderizar el flujo de checkout correcto (WhatsApp vs. pago, con o sin paso de envío) sin hardcodear por cliente en el código de Next.js.

### 7.7 Consumo desde Next.js
- Páginas de catálogo/producto/carrito/checkout en Next.js consumiendo la API de ecommerce, reutilizando UI Base existente (Card, Button, MediaFrame) — nunca componentes nuevos que dupliquen lo ya construido (regla de reutilización, CLAUDE.md).
- El componente de checkout debe ramificar según la configuración del `Site` (7.6): mismo componente base, comportamiento distinto (WhatsApp vs. pasarela, con o sin paso de dirección/envío) — no componentes de checkout paralelos y duplicados por combinación.

### 7.8 Pruebas de flujo end-to-end (todos los caminos, no solo uno)
- Camino WhatsApp (ya cubierto por el checklist de caso de uso): verificar que sigue funcionando sin regresión al agregar pago/facturación/envío.
- Camino con pago: sandbox de PayPhone, compra completa simulada, verificación de webhook, actualización de estado de orden, confirmación visible en frontend.
- Camino con pago + facturación: al confirmarse el pago, verificar que se genera la factura en el sistema contable sandbox del cliente (ContiFico) y que el fallo de esa llamada no bloquea la venta (7.4).
- Camino de importación CSV (7.2): archivo con filas válidas e inválidas mezcladas, confirmar reporte de errores legible y que las imágenes importadas pasan por compresión (6.2).
- Camino con envío (7.5): probar los tres `mode` (flat, zone, y `freeThreshold` cruzando el umbral), confirmar que `shippingCost` queda como snapshot correcto en `Order`/`Inquiry` y no cambia si `ShippingConfig` se edita después.

**Entregable de la fase:** módulo ecommerce operativo con los tres caminos de checkout disponibles y configurables por `Site` — primera instancia real con cada configuración, lista para piloto con un cliente real.

---

## Fase 8 — Interfaz propia de CMS (futuro, no priorizado)

**Estado: explícitamente fuera de alcance hasta que el negocio lo requiera (roadmap sección 7, punto 7).**

Cuando se priorice: es trabajo **solo de frontend** consumiendo la misma API de la Fase 2 (ya documentada vía Swagger), sin tocar modelos ni lógica de negocio del backend — ese es precisamente el motivo por el que la Fase 2 se construyó API-first. No se detalla en subtareas hasta que se abra esta fase.

---

## Resumen de cronograma (vista rápida)

| Fase | Contenido | Duración estimada | Bloquea a |
|---|---|---|---|
| 0 | Decisión por-cliente vs. multi-tenant | Cerrada | — |
| 1 | Modelado de datos Django | 1.5–2 semanas | Fase 2 |
| 2 | API DRF | 1.5 semanas | Fase 3 |
| 3 | Integración Next.js | 1 semana | Fase 4 |
| 4 | Prototipo E2E (Hero) | 3–4 días | Fase 5 |
| 5 | Escalar a todo el catálogo | 2.5–3 semanas | Fase 6 |
| 6 | Endurecimiento para cliente final | 1.5–2 semanas | Entrega CMS |
| 7 | Módulo Ecommerce (incl. importación CSV, pago y facturación opcionales) | 5–7 semanas (post-validación) | Instancias ecommerce |
| 8 | Interfaz propia de CMS | No estimado — futuro | — |

**Total CMS informativo (Fases 1–6): ~9–11 semanas.**

Esto debe leerse contra la ventana de negocio de 110 días por cliente (roadmap sección 1): construido **una vez** como capacidad del template, cada cliente nuevo no vuelve a pagar este costo completo — solo el provisioning de su instancia (parte de 6.5), que debería tomar días, no semanas.

---

## Riesgos a vigilar

- **Deriva de contrato:** si en algún momento el modelo Django o la API terminan aceptando algo que el contrato oficial de Section Data no contempla (campos nuevos, valores fuera de los choices oficiales), el frontend puede romperse silenciosamente. Mitigación: validators de la Fase 1.7 + tests de contrato entre API y componentes React.
- **JSONField sin estructura real:** `content`/`items`/`actions` son JSON libres por diseño (varían por variant), pero eso mismo los vuelve fáciles de corromper desde Admin. Mitigación: widgets específicos (Fase 6.1) antes de dar acceso al cliente final, no solo en el prototipo interno.
- **Rich text fuera de contrato:** si se habilita HTML enriquecido en `content.description` sin definirlo explícitamente contra el manual 03, se corre el riesgo de que el cliente inserte markup que rompa el layout de la Variant. Definir esto explícitamente en 6.1, no dejarlo implícito.
- **Alcance de ecommerce indefinido:** la Fase 7 tiene una duración "preliminar" a propósito — el roadmap la deja abierta. No comprometer fecha de entrega de ecommerce a un cliente hasta cerrar 7.1.
- **Credenciales de terceros en un backend compartido (pago y facturación, Fase 7.3/7.4):** a diferencia del resto del contenido (textos, imágenes), las credenciales de pasarela de pago y de sistemas contables de cada cliente son secretos reales. En un backend multi-tenant, una fuga de la base de datos no expone "solo contenido" — puede exponer credenciales de pago/facturación de varios clientes a la vez. Cifrado en reposo no es opcional acá, y el `client_editor` de un cliente nunca debe poder leer las credenciales configuradas para su propio `Site` una vez guardadas (solo reemplazarlas), y mucho menos las de otro.
