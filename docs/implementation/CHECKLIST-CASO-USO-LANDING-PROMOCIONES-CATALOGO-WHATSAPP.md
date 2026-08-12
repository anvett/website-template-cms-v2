# Checklist — Promociones editables + Catálogo con Carrito a WhatsApp

Caso de uso: un cliente sobre el CMS + backend ya finalizado (`CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`, Fases 1–6 completas). Necesita:

1. Promociones que el cliente pueda crear y editar desde el CMS, visibles en Home.
2. Catálogo de productos **tipo Shopify** (alcance "Completo", definido 2026-08-07): colecciones/categorías navegables, productos con variantes (ej. talla/color), múltiples imágenes por producto, buscador y filtros, y control de stock por variante que marca "agotado" automáticamente. Con carrito, donde el "checkout" no procesa pago — arma un mensaje y cierra la venta por WhatsApp.

**Aclaración de alcance (2026-08-11):** "Promociones + Catálogo + carrito WhatsApp" es un **paquete de funcionalidad**, no un tipo de sitio. Se agrega sobre un sitio de cualquier tamaño — desde una landing de una sola página hasta un sitio institucional completo con varias páginas (ej. Kautela, usado como banco de pruebas en la Fase 5.4 del cronograma general). La Home de este cliente **no** se reduce a Promociones: sigue llevando las Sections informativas normales de cualquier instancia (Hero, About/Services, etc.), con Promociones como una Section más agregada encima — nunca en reemplazo del contenido institucional. No asumir un mapa de páginas reducido solo porque este caso de uso incluye ecommerce.

**Relación con la Fase 7 (Ecommerce) del roadmap:** con el alcance "Completo", este caso ya **no es liviano** — es funcionalmente equivalente a Fase 7 (Product/Cart con variantes, colecciones, stock) **menos** la pasarela de pago y la facturación integrada; el "cierre de venta" es un mensaje de WhatsApp, no una transacción. Dado el tamaño real de este catálogo, tratarlo directamente como la implementación de referencia de "checkout WhatsApp, sin pago" en el roadmap general, no como un anexo aparte — así el próximo cliente con el mismo pedido no repite este trabajo desde cero (ver Fase 10).

**Actualización 2026-08-07 — esto es una configuración de este cliente, no la única vía del módulo:** el roadmap ahora define pago y facturación como sub-módulos **opcionales por `Site`** (`EcommerceConfig.paymentEnabled` / `invoicingEnabled`, ver Fase 7 de `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`). Este cliente específico elige `paymentEnabled=False` — no porque el sistema no lo soporte, sino porque su modelo de negocio prefiere cerrar la venta por WhatsApp. Si este mismo cliente (u otro con el mismo catálogo) pide más adelante pasarela de pago y/o facturación automática contra su sistema contable, se activa sin rehacer el catálogo/carrito ya construido acá — solo se prende el sub-módulo correspondiente. Vale la pena preguntarlo explícitamente en la Fase 0 de este checklist, no asumir que "sin pago" es una decisión permanente.

Este checklist sigue el Flujo Obligatorio de `CLAUDE.md`: identificar capa → identificar manual → revisar contratos → buscar reutilización → proponer → implementar → validar → documentar. No se salta pasos aunque el caso parezca simple.

---

## Fase 0 — Descubrimiento con el cliente

- [ ] Recolectar información del cliente según manual 05 sección 5 (corporativa, contacto, redes, comercial, legal, multimedia) — incluye el número de WhatsApp de ventas, que es el destino final del carrito.
- [ ] Definir el mapa de páginas (manual 05 sección 6) **igual que en cualquier instancia, sin techo asumido por venir con ecommerce**: Home (con Promociones agregada a sus Sections normales) + página de Catálogo + todas las páginas institucionales que el cliente necesite — puede ser un mapa mínimo o tan completo como el de Kautela.
- [ ] Confirmar con el cliente el criterio de "promoción": ¿tiene fecha de vigencia (desde/hasta)? ¿se oculta sola al vencer o el cliente la desactiva manualmente? ¿puede tener imagen propia distinta a la del producto asociado?
- [ ] Confirmar el criterio de "producto": si el precio es fijo o "a consultar", si hay variantes (talla/color/material/etc. — cuáles atributos aplican, no asumir talla/color por defecto).
- [ ] Definir las **colecciones/categorías**: lista inicial, si un producto puede pertenecer a más de una colección a la vez, y si las colecciones en sí llevan imagen/descripción propia (para una página de colección con hero, no solo un filtro).
- [ ] Definir la **política de stock**: ¿se controla a nivel de producto o a nivel de variante (ej. "Talla M" agotada pero "Talla L" disponible)? ¿Qué debe pasar en el frontend cuando el stock llega a cero — ocultar el producto, mostrarlo tachado/"agotado", o dejar igual pero deshabilitar "agregar al carrito"?
- [ ] Definir el alcance real del **buscador/filtros**: mínimo viable es buscar por texto (título) + filtrar por colección + filtrar por disponibilidad. Filtrar por atributo de variante (ej. "solo talla M") o por rango de precio es más trabajo — confirmar si el cliente lo necesita desde el día 1 o es una iteración futura.
- [ ] Confirmar el flujo de cierre por WhatsApp: ¿un solo mensaje con todo el carrito, o el cliente prefiere un mensaje por producto? ¿Se vacía el carrito al enviar, o queda disponible para seguir agregando? El mensaje debe incluir la variante elegida (ej. "Remera Azul — Talla M x2"), no solo el nombre del producto.
- [ ] Decidir si el negocio quiere **registrar** los carritos/pedidos enviados por WhatsApp (para seguimiento comercial) o si es aceptable que sea efímero y no quede rastro en el backend. Esto determina si hace falta un modelo `Lead`/`Inquiry` (ver Fase 2).
- [ ] Preguntar explícitamente si el cliente prevé necesitar, ahora o a futuro cercano, **pasarela de pago integrada** y/o **facturación electrónica automática contra su sistema contable** (ContiFico, AZUR, u otro) — no asumir que "checkout por WhatsApp" es la respuesta definitiva. Si la respuesta es "no por ahora pero probablemente sí después", vale la pena dejar `EcommerceConfig` creado desde ya con los interruptores en falso, en vez de agregarlo como sorpresa más adelante.
- [ ] **Preguntar si el cliente quiere activar el módulo de envío por reglas fijas** (`ShippingConfig`, resolución 2026-08-11, `decision-log.md`): tarifa plana, envío gratis por monto mínimo, o tabla de costo por zona/ciudad — capturado en el checkout junto con la dirección. Si el cliente no lo activa, el envío sigue coordinándose directamente por WhatsApp, fuera del sistema, igual que antes. Importante: este módulo **no** cotiza transportistas reales ni genera guías/tracking — dejarlo explícito para no generar expectativa de "logística completa".
- [ ] **Preguntar si el cliente entrega el catálogo inicial en CSV** o si prefiere que Anvetcorp cargue solo un lote de ejemplos y el cliente complete el resto desde el CMS (resolución 2026-08-07 sobre carga de catálogo, ver `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md` sección 4) — define si se usa la herramienta de importación CSV (Fase 7.2 del cronograma general) en la Fase 8 de este checklist, o si se cobra el add-on de carga manual completa.
- [ ] Confirmar el canal de **notificación de pedidos**: todo `Inquiry` generado por el carrito dispara un email al cliente además del mensaje de WhatsApp (resolución 2026-08-07, `decision-log.md`) — email es respaldo, no reemplazo. Confirmar la dirección de email de ventas del cliente en este discovery, igual que se confirma el número de WhatsApp.
- [ ] Confirmar que el formulario/checkout de este cliente cumple el paquete base LOPDP (resolución 2026-08-07): si se captura `customerContact` en el `Inquiry` (Fase 2), debe existir un checkbox de consentimiento explícito y **no premarcado**, y el sitio debe tener una política de privacidad real de este cliente (nunca copiada de otro sitio). Esto no reemplaza revisión legal profesional.

**Entregable:** documento de alcance del cliente (igual que cualquier instancia nueva, manual 05), más las decisiones de arriba explícitas por escrito — especialmente atributos de variante, estructura de colecciones, política de stock, alcance de envío y origen del catálogo inicial, porque redefinirlas después de modelar (Fase 2) es caro.

---

## Fase 1 — Decisión de reutilización (obligatoria antes de tocar código)

Regla de `CLAUDE.md`: *"Antes de crear Component/Section/Variant/UI Base, preguntar: ¿ya existe una solución equivalente? Si existe, reutilizar."*

- [ ] Comparar el shape de una **promoción** (imagen, título, descripción, descuento/precio, vigencia, CTA) contra los items ya soportados por `ProductCards` (`items: [{image, price, title, description, details}]`, ver `03-MANUAL-MAESTRO-SECTIONS_v_2.md` sección 16) y contra `Features`/`CTA`.
- [ ] Decidir explícitamente: ¿las Promociones son una **Variant nueva dentro de la Section `Products`** (reutilizando el component existente), o una **Section funcional nueva** (justificada porque manejan vigencia/activación, algo que ninguna Section actual resuelve)? Cualquiera de las dos opciones es válida arquitectónicamente — lo que **no** es válido es decidirlo implícitamente sobre la marcha. Dejarlo escrito en `docs/decisions/decision-log.md` una vez resuelto.
- [ ] Para el **catálogo con carrito**: `ProductCards` cubre el shape básico (imagen, precio, título, descripción, modal de detalles vía `meta.supportsModal`), pero con alcance "Completo" ya **no alcanza tal cual** — faltan: múltiples imágenes por producto, selector de variante, precio que puede variar por variante, badge de "agotado", y una acción por-item tipo "Agregar al carrito" (hoy `actions[0]` es un único CTA de Section compartido por todas las cards, no un botón interactivo por producto). Esto justifica una **Variant nueva** dentro de la misma Section `Products` (ej. `product-cards-shop`), reutilizando lo que ya sirve (grid, modal, tono/tipografía) y extendiendo solo lo que falta — no una Section nueva ni un component paralelo.
- [ ] Evaluar si la **página de producto individual** (con galería, selector de variante y detalle largo) necesita su propia ruta/página además del grid — si es así, es una Page nueva del sitio (manual 05), no una Section nueva; la Section `Products` en su Variant de detalle puede reutilizarse ahí también.
- [ ] Evaluar si "colección" necesita su propia Page (ej. `/catalogo/[coleccion]`) que renderiza la misma Variant de `Products` filtrada por colección, en vez de una Section distinta — es el mismo patrón de reutilización, aplicado a nivel de página.
- [ ] Confirmar que el ícono/patrón de WhatsApp **no se reinventa**: ya existe `FloatingWhatsapp` (`src/components/global/FloatingWhatsapp/FloatingWhatsapp.jsx`) generando links `https://wa.me/{phone}?text=...` desde `siteData.contact.whatsapp`, y el mecanismo oficial `meta.form.whatsappIntro` (manual 03, "Hallazgo importante", Contact) para personalizar el mensaje inicial. El checkout del carrito **debe reutilizar ambos patrones**, no crear un mecanismo de armado de mensaje distinto.

**Entregable:** decisión de reutilización documentada (Variant nueva bajo `Products` vs. Section nueva para Promociones) antes de avanzar a Fase 2.

---

## Fase 2 — Modelado de datos en el backend (Django, sobre el backend multi-tenant ya existente)

Depende de: Fase 1 cerrada, y del backend compartido de content-admin (Fases 1–6 del cronograma general, multi-tenant — ver `CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 6). No se levanta backend nuevo para este cliente: sus datos son filas nuevas en la base de datos compartida, scoped por su `Site`.

- [ ] Modelo `Promotion`: FK a `Site` (obligatoria, igual que todo modelo de contenido en el backend multi-tenant), `title`, `description`, `image`, `discountLabel` o `price`/`originalPrice`, `validFrom`, `validTo`, `active` (bool), `cta` (label/href u opcional link a WhatsApp directo), `order`. Endpoint de lectura debe filtrar automáticamente por `site` **y** `active=True` **y** dentro del rango de vigencia — el cliente no debería tener que acordarse de desactivar una promo vencida a mano, aunque igual puede hacerlo manualmente.
- [ ] Modelo `Collection`: FK a `Site`, `title`, `slug` (único por `Site`, no global), `description`, `image` (para página/hero de colección), `active`, `order`.
- [ ] Modelo `Product`: FK a `Site`, `title`, `slug`, `description`, `collections` (M2M a `Collection`), `images` (lista ordenada — puede ser un modelo `ProductImage` propio con `product` FK + `src`/`alt`/`order`, o un JSONField si no hace falta administrarlas una por una; recomendado modelo propio si el cliente va a reordenar/borrar imágenes seguido desde el Admin), `basePrice` (referencia; el precio real que se muestra sale de la variante seleccionada), `tags` (opcional, para filtros), `details` (JSONField: `{description, includes, specifications, recommendedFor, warranty}` — mismo shape que ya consume el modal de `ProductCards`, no inventar uno nuevo), `active`.
- [ ] Modelo `ProductVariant`: `product` (FK), `title` (ej. "Talla M / Azul", generado o editable), `options` (JSONField: `{size: "M", color: "Azul"}` — atributos definidos en Fase 0, no fijos en el modelo, para no tener que migrar cuando otro cliente use atributos distintos), `sku`, `price` (override de `basePrice` cuando aplica), `stock` (integer), `available` (bool, **derivado**: `stock > 0`, no editable a mano para evitar inconsistencia — recalcular en `save()`/signal).
- [ ] Confirmar contra Fase 0 si el stock se controla a nivel `Product` (sin variantes reales, un solo "variant implícito") o a nivel `ProductVariant` — si el producto no tiene variantes de verdad, igual conviene modelarlo con **una `ProductVariant` por defecto** para no tener dos caminos de código distintos en la API/frontend.
- [ ] **No crear** modelo `Cart` ni `Order` con estados de pago — el checkout es WhatsApp, no una pasarela. Si en Fase 0 se decidió registrar los pedidos: crear modelo `Inquiry` (o `WhatsAppLead`) simple — `items` (JSONField con snapshot de `{productId, variantId, title, variantTitle, price, quantity}`), `customerContact` (opcional, si se captura — requiere el checkbox de consentimiento explícito de Fase 0/LOPDP si se guarda), `consentGiven` (bool, si se captura `customerContact`), `createdAt`, `status` (ej. `sent`/`contacted`/`closed` para seguimiento comercial manual). Agregar `shippingAddress`/`shippingCost` **solo si el cliente activó el módulo de envío** en Fase 0 (`ShippingConfig`, Fase 7.5 del cronograma general) — si no lo activó, no agregar estos campos, el envío sigue siendo un tema de WhatsApp fuera del sistema.
- [ ] Al crear un `Inquiry`, disparar el envío de email de notificación al cliente (servicio de email transaccional de Fase 2.8 del cronograma general) además del mensaje de WhatsApp — mismo principio de "email como respaldo, no único canal" resuelto el 2026-08-07.
- [ ] Aplicar la misma disciplina de validators que el resto de content-admin (Fase 1.7 del cronograma general): rangos de fecha coherentes (`validFrom < validTo` en `Promotion`), `price`/`stock` no negativos, `options` de una `ProductVariant` no puede repetirse dentro del mismo `Product` (dos variantes "Talla M / Azul" del mismo producto es un error de datos, no un caso válido).
- [ ] Migraciones + datos semilla de prueba: 2–3 promociones, 2–3 colecciones, 6–8 productos con **variantes reales** (al menos uno con 2 atributos combinados, ej. talla × color) y al menos un producto/variante con `stock = 0` para probar el estado "agotado" desde el día 1.

**Entregable:** modelos migrados y poblados con datos de prueba que incluyan variantes combinadas y al menos un caso de stock agotado.

---

## Fase 3 — Capa de API

- [ ] `GET /api/v1/sites/{site}/promotions/` — devuelve solo promociones activas y vigentes, ordenadas.
- [ ] `GET /api/v1/sites/{site}/collections/` — lista de colecciones activas.
- [ ] `GET /api/v1/sites/{site}/collections/{slug}/` — detalle de colección + sus productos (para la página de colección).
- [ ] `GET /api/v1/sites/{site}/products/` — con query params: `search` (texto libre sobre título/descripción), `collection`, `available` (solo con stock), y precio mínimo/máximo si se confirmó en Fase 0. Serializar cada producto con sus `images` (ordenadas) y sus `variants` (con `stock`/`available` ya resuelto, no que el frontend tenga que calcularlo).
- [ ] `GET /api/v1/sites/{site}/products/{slug}/` — detalle completo con todas las variantes (para el selector de talla/color y la galería).
- [ ] Definir dónde vive la lógica de búsqueda: para un catálogo chico/mediano, `icontains`/trigram de Postgres alcanza y es lo recomendado para MVP — no traer un motor de búsqueda externo (Algolia/Meilisearch) a menos que el catálogo sea grande o el cliente pida búsqueda difusa/typo-tolerant. Dejarlo anotado como posible mejora futura, no bloquear el MVP por esto.
- [ ] Endpoints de escritura (autenticados, rol `client_editor`) para que el cliente cree/edite/desactive promociones, colecciones, productos, variantes e imágenes — mismo patrón de permisos ya definido en el cronograma general (Fase 2.6). Confirmar que actualizar `stock` de una variante es una operación simple (no requiere editar el producto entero) — es lo que el cliente va a tocar más seguido.
- [ ] Si se decidió registrar pedidos (Fase 2): `POST /api/v1/sites/{site}/inquiries/` — el frontend lo llama justo antes de abrir el link de WhatsApp, como registro de intención (no bloqueante: si esta llamada falla, el link de WhatsApp debe abrirse igual — nunca frenar la venta por un error de logging).

**Entregable:** endpoints documentados en Swagger, probados con datos semilla — incluyendo búsqueda, filtro por colección y disponibilidad.

---

## Fase 4 — CMS Admin para el cliente final

- [ ] Registrar `Promotion` en Django Admin con campos de fecha con selector (no texto libre), toggle de `active`, y preview de imagen — no JSON crudo.
- [ ] Registrar `Collection` en Django Admin, simple (título, slug, imagen, descripción, activa).
- [ ] Registrar `Product` en Django Admin con **`ProductVariant` e `images` como inlines** (edición del producto y sus variantes/imágenes en una sola pantalla, como en Shopify) — no un formulario separado por cada variante. Si `details` es JSON, usar widget estructurado (subcampos separados, no un textarea de JSON).
- [ ] Confirmar que actualizar el `stock` de una variante puntual es rápido desde el listado (ej. edición inline en el `ModelAdmin` de `ProductVariant` o del listado de `Product`) — es la tarea más frecuente del cliente, no debe requerir entrar producto por producto a mano cada vez.
- [ ] Confirmar permisos: el cliente puede crear/editar/desactivar Promociones, Colecciones, Productos, Variantes e Imágenes, pero **no** puede tocar Sections, Pages, ni Site — eso sigue siendo exclusivo de Anvetcorp, igual que en el resto del CMS.
- [ ] Prueba de usuario real (o simulada): alguien no técnico crea un producto nuevo con dos variantes (ej. talla M y L) y sube sus imágenes de punta a punta sin ayuda, siguiendo únicamente el Admin.

**Entregable:** el cliente puede gestionar promociones, colecciones, productos, variantes y stock de forma autónoma.

---

## Fase 5 — Frontend: Promociones en Home

- [ ] Implementar la Variant decidida en Fase 1 (nueva Variant de `Products`, o Section nueva) consumiendo `GET /promotions/` en vez de un array estático `items` — este es el primer caso del template donde una Section deja de ser 100% Data estática y pasa a ser una colección viva. Documentar este patrón en el manual correspondiente al cerrar la fase (ver Fase 9).
- [ ] Confirmar que Promociones se agrega al `sections` de Home **junto a** las demás Sections institucionales definidas en Fase 0 (Hero, About/Services, etc.), respetando el `order` de cada una — nunca construir Home como si Promociones fuera la única Section.
- [ ] Manejar el caso de "cero promociones activas" (la Section debe poder ocultarse limpiamente vía `enabled`, no mostrar un grid vacío).
- [ ] Aplicar `resolveTone`/`resolveTypography`/`resolveBackground` igual que cualquier otra Variant — nada de esto cambia por venir de la API en vez de un archivo estático.
- [ ] Cada promoción con CTA propio: reutilizar `Button` (UI Base) y, si el CTA es "comprar por WhatsApp", el mismo mecanismo de link `wa.me` de Fase 1, no un botón nuevo.

**Entregable:** landing mostrando promociones reales desde el backend, editables en vivo desde el Admin.

---

## Fase 6 — Frontend: Catálogo de productos (alcance Shopify completo)

- [ ] Página de Catálogo consumiendo `GET /products/`, sobre la Variant `product-cards-shop` definida en Fase 1.
- [ ] Navegación por colección: listado de colecciones (home del catálogo) + página por colección (`/catalogo/[coleccion]`) reutilizando la misma Variant filtrada por `collection`, no una vista distinta.
- [ ] Grid de producto con **galería hover-swap**: primera imagen por defecto, segunda imagen del array `images` al hacer hover (patrón visual típico de Shopify) — degradar con gracia en mobile (sin hover: solo la primera imagen, o swipe si se justifica el esfuerzo).
- [ ] Buscador (texto) + filtros (colección, disponibilidad, y precio/atributos si se confirmó en Fase 0) conectados a los query params de `GET /products/` definidos en Fase 3 — evitar filtrar client-side si el catálogo puede crecer, para no traer todo el catálogo a memoria en cada visita.
- [ ] Página/vista de detalle de producto: galería completa, **selector de variante** (ej. talla/color como botones o dropdown, según atributos reales del cliente) que actualiza precio, disponibilidad e imagen si corresponde. Si una combinación de variante no existe o tiene `stock = 0`, deshabilitar esa opción en vez de dejar seleccionarla y fallar después.
- [ ] Badge/estado "Agotado": producto o variante específica con `stock = 0` se muestra deshabilitado para agregar al carrito, con indicación visual clara — nunca se oculta silenciosamente salvo que el cliente haya pedido eso explícitamente en Fase 0.
- [ ] Modal de detalle rápido: reutilizar `ProductDetailsModal` ya existente en `ProductCards.jsx` como base, extendiéndolo para mostrar el selector de variante si el flujo de "agregar rápido desde el grid" lo requiere (a definir junto al cliente si hace falta o si el detalle completo alcanza).

**Entregable:** catálogo navegable por colección, con búsqueda, filtros, selector de variante y estado de stock reflejado en tiempo real, gestionado desde el CMS.

---

## Fase 7 — Carrito (client-side) y checkout por WhatsApp

- [ ] Estado de carrito: Context de React + `localStorage` para persistencia entre visitas (esto es una app Next.js real, no un artifact de chat — `localStorage` es válido acá). Shape mínimo: `[{productId, variantId, productTitle, variantTitle, price, image, quantity}]` — el carrito guarda la variante elegida, no solo el producto.
- [ ] Botón "Agregar al carrito" solo habilitado cuando hay una variante válida seleccionada y con `stock > 0`. Validar cantidad contra `stock` disponible (no dejar pedir 10 unidades de algo con `stock: 3`) — validación en el frontend es suficiente para este caso (no hay pago real de por medio), pero debe existir.
- [ ] Si dos productos sin variantes reales usan la "variante por defecto" (definida en Fase 2), el flujo de agregar al carrito debe ser igual de simple que uno con variantes — no forzar al usuario a "elegir" algo que no tiene opciones.
- [ ] Indicador de carrito (ícono con contador) en Navbar — verificar que no rompe el contrato de `navigation.data.js` (manual 05 sección 9): esto es un elemento de UI global, no contenido editable por Data, así que vive en código, no en el CMS.
- [ ] Drawer o página de "Mi pedido": lista de items, cantidad editable, subtotal, botón final "Enviar pedido por WhatsApp".
- [ ] Constructor del mensaje de WhatsApp: extender el patrón `meta.form.whatsappIntro` ya oficial — ej. `meta.form.cartIntro` como intro configurable desde Data/Site, seguido del detalle de items generado dinámicamente **incluyendo la variante** (ej. "Remera — Talla M / Azul x2 — $XX"). Reutilizar la función de armado de link `wa.me` de `FloatingWhatsapp`, no duplicarla — si hace falta, extraerla a un helper compartido en `src/lib/` para que ambos componentes la usen.
- [ ] Al enviar: si se decidió registrar `Inquiry` (Fase 0/2), disparar el `POST` antes de redirigir a `wa.me` (no bloqueante, ver Fase 3).
- [ ] Definir comportamiento post-envío: ¿se vacía el carrito automáticamente al abrir WhatsApp, o se mantiene por si el cliente vuelve? (Confirmado en Fase 0 — implementar lo decidido).

**Entregable:** flujo completo de agregar productos → revisar pedido → enviar por WhatsApp, sin ningún paso de pago.

---

## Fase 8 — Instanciación del sitio del cliente

- [ ] Clonar el template base (frontend) siguiendo manual 05 de punta a punta: `site.data.js`, `navigation.data.js`, páginas, identidad visual (branding permitido, sección 10).
- [ ] Dar de alta el `Site` de este cliente en el backend compartido (multi-tenant, ver `CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 6) y cargar sus modelos de content-admin + `Promotion`/`Collection`/`Product` scoped a ese `Site` — no se levanta backend ni base de datos nueva.
- [ ] Definir con el cliente, en el discovery, quién es dueño de la cuenta de Vercel (centralizado en Anvetcorp vs. cuenta propia del cliente — el backend siempre es centralizado, no aplica esta decisión ahí) y ejecutar el deploy del frontend siguiendo `docs/implementation/PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md`.
- [ ] Configurar variables de entorno (`NEXT_PUBLIC_CMS_API_URL`, tokens) apuntando al backend de este cliente.
- [ ] Cargar contenido real del cliente (no placeholder) en Promociones y Productos vía Admin, para el QA final. Si en Fase 0 el cliente entregó un CSV: usar la herramienta de importación masiva (Fase 7.2 del cronograma general) en vez de carga manual uno por uno.
- [ ] Publicar la política de privacidad real de este cliente (no copiada de otro sitio) y confirmar que el banner de consentimiento de cookies bloquea el contenedor de GTM (`Site.analytics.gtmContainerId`, Fase 1.2 del cronograma general) hasta que el visitante acepte — paquete base LOPDP, resolución 2026-08-07.

**Entregable:** instancia completa del cliente, funcional de punta a punta con datos reales.

---

## Fase 9 — QA y validación

- [ ] Crear una promoción nueva desde el Admin y confirmar que aparece en la landing sin redeploy (dentro del tiempo de revalidación configurado).
- [ ] Editar/desactivar una promoción y confirmar que desaparece del sitio.
- [ ] Agregar 3+ productos distintos (con variantes distintas) al carrito, editar cantidades, eliminar uno, y confirmar que el mensaje de WhatsApp final refleja exactamente el estado final del carrito — variante, cantidad y precio correctos, no un estado intermedio.
- [ ] Probar el flujo completo con un producto con `stock = 0`: no debe poder agregarse al carrito, y el estado "agotado" debe ser visible tanto en el grid como en el detalle.
- [ ] Probar búsqueda y cada filtro (colección, disponibilidad, y atributo/precio si se implementó) con resultados reales — incluyendo el caso "sin resultados", que no debe verse como un error.
- [ ] Probar en mobile: `wa.me` debe abrir la app de WhatsApp instalada, no solo el navegador (comportamiento nativo del link, verificar que no se está interceptando con JS innecesario).
- [ ] Probar el caso "cero promociones activas" y "catálogo vacío" — el sitio no debe verse roto.
- [ ] Confirmar performance del catálogo con el volumen real de productos del cliente (no solo los 6–8 de prueba) — si el catálogo es grande, revisar paginación en `GET /products/`.
- [ ] Confirmar que ningún componente nuevo hardcodea contenido, imágenes o el número de WhatsApp (debe venir siempre de `siteData.contact.whatsapp` / Site en backend) — anti-patrón explícitamente prohibido por `CLAUDE.md`.
- [ ] Revisión cruzada contra `CLAUDE.md`: ¿algo de lo construido tocó capas por encima de Data sin pasar por el flujo de propuesta/validación? Si sí, corregir antes de entregar.

---

## Fase 10 — Documentación (paso obligatorio, no opcional)

- [ ] Si se creó una Variant nueva bajo `Products`: documentarla en `docs/v2/03-MANUAL-MAESTRO-SECTIONS_v_2.md` sección 16, mismo formato que las existentes.
- [ ] Si se creó una Section nueva para Promociones (en vez de Variant): documentar su contrato completo en el manual 03 y registrar la decisión y su justificación en `docs/decisions/decision-log.md`.
- [ ] Documentar el modelo `Product`/`ProductVariant`/`Collection`/`ProductImage` resultante como la referencia oficial de "catálogo tipo Shopify sin pasarela" en `CMS-BACKEND-ECOMMERCE-ROADMAP.md` (Fase 7), incluyendo qué faltaría agregar si un cliente futuro sí necesita pago real (básicamente: `Order` con estados de pago + integración PayPhone — el resto del modelo ya sirve tal cual).
- [ ] Documentar en el manual interno de Anvetcorp (Fase 6.5 del cronograma general) cómo se le explica al cliente qué puede y qué no puede hacer con Promociones y Productos desde su Admin.

**Entregable final:** instancia del cliente en producción + arquitectura y decisiones documentadas para reutilizar en el próximo cliente con el mismo pedido.
