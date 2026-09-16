# Catálogo Avanzado: Taxonomía Vehicular, Cuentas de Cliente y Carrito por WhatsApp — Roadmap

Estado: **En construcción (empezado 2026-09-02).** Fases 0-6 implementadas y validadas, sin pendientes explícitos — ver `decision-log.md` (Fases 5 y 6 se hicieron juntas en la misma sesión: Fase 6 primero, como prerequisito de contenido para que el cambio de fuente de datos de la Fase 5 no vaciara el catálogo visible; los dos pendientes de Fase 5 — `product-cards`/`catalog-search` a la API real y el link a `/cuenta` — y el detalle menor de sincronizar el selector de vehículo con la URL se cerraron el mismo día, 2026-09-02/03). Fase 7 (validación end-to-end final + documentación) sigue pendiente como cierre formal, aunque cada fase ya quedó validada y documentada individualmente en `decision-log.md`.

Relación con otros documentos: extiende y especializa la fase "Catálogo tipo Shopify" ya prevista en `docs/implementation/CHECKLIST-CASO-USO-LANDING-PROMOCIONES-CATALOGO-WHATSAPP.md` (carrito sin pasarela de pago, cierre por WhatsApp, `ProductVariant.options` como atributos libres) — la diferencia es que acá el "atributo" es compatibilidad vehicular (marca/modelo/año/motorización) en vez de talla/color, y se generaliza para que sirva a cualquier rubro, no solo repuestos. No reemplaza los 8 manuales oficiales de `docs/v2/` — cualquier implementación debe seguir respetándolos como fuente de verdad para Data/Sections/Variants.

---

## 1. Contexto y motivación real

El catálogo actual de Eurocentro (90 productos, seed en `backend/content_admin/management/commands/seed_eurocentro.py`) es contenido de demo genérico: los nombres/precios son plausibles, pero el campo `details.compatibility` es texto decorativo que rota entre 6 frases fijas (`BRAND_GROUPS`) — nunca se investigó ni se corresponde a compatibilidad real por vehículo. Tampoco es buscable (ni `PartsGallery` ni `CatalogSearch` indexan ese campo).

El dueño del proyecto pidió agregar marca/modelo real al catálogo, y durante el análisis quedó claro que el pedido real es más grande: quiere que el sitio de Eurocentro pueda convertirse en un producto vendible a otros negocios de venta de repuestos (y potencialmente cualquier rubro, dado que el template ya es multi-tenant) — no solo agregar contenido a la demo actual.

---

## 2. Decisión central: productos específicos por vehículo, no un filtro sobre un catálogo genérico

Confirmado explícitamente: un mismo tipo de repuesto (ej. "kit de embrague") es un producto **distinto** según marca+modelo+año — no el mismo ítem genérico con una etiqueta de compatibilidad encima. Esto descarta la opción más liviana (filtro de texto sobre `Section.items` actual) y obliga a un modelo de datos real donde el producto se define, entre otras cosas, por a qué vehículo(s) aplica.

---

## 3. Motor de taxonomía genérico (no un modelo fijo Marca/Modelo/Año)

**Decisión:** no se construyen modelos Django llamados literalmente `Brand`/`VehicleModel`/`Year`. Se construye un motor genérico de árboles de clasificación, reusable por cualquier rubro futuro (mismo principio ya usado en el proyecto para `surface`/`tone`/categorías: mecanismo genérico en código, semántica específica en Data por tenant).

- **`Taxonomy`**: un árbol con nombre, asociable a uno o más `Site` — o **compartido/global** (ver siguiente punto).
- **`TaxonomyNode`**: los valores dentro del árbol, autorreferenciado (`parent`), sin límite de profundidad fijo en el modelo.

**Instancia concreta para Eurocentro — 4 niveles:**
Marca → Modelo → Año (nodo individual, no rango de texto) → Motorización/versión.

Justificación de año como nodo individual (no `"2010-2013"` como string): permite responder "¿qué aplica al 2011?" directamente y modelar discontinuidades reales (un repuesto puede aplicar 2010-2012 y de nuevo 2015-2017 por un rediseño, sin que 2013-2014 quede mal representado en un rango de texto).

Justificación de motorización como 4to nivel: en autopartes reales, la motorización (1.6 vs 2.0, gasolina/diésel, manual/automática) cambia la compatibilidad tanto como el año — quedó fuera del diseño original y se incorporó tras la ronda de verificación.

**Categoría (Motor, Frenos, Suspensión...) también se unifica dentro de este mismo motor de taxonomía** — como un segundo árbol de 1 nivel, en vez de quedar como campo simple aparte. Decisión explícita: más consistente a largo plazo aunque implique migrar algo que ya funciona.

**Catálogo vehicular compartido entre tenants:** el árbol Marca/Modelo/Año/Motorización no se recrea por cada negocio — es un catálogo maestro reusable (si dos vendedores de repuestos ambos venden para Toyota Corolla, comparten los mismos nodos). Esto es lo que permite revender el catálogo a otros negocios sin que cada uno tenga que cargar su propia taxonomía vehicular desde cero. Cambia el modelo: `Taxonomy`/`TaxonomyNode` necesita soportar nodos globales de solo-referencia además de árboles propios por Site (para rubros no vehiculares).

**Administración:**
- Django Admin no maneja árboles bien de forma nativa — se necesita una librería (`django-mptt` sugerida) para que gestionar la taxonomía sea usable.
- Acción masiva en Admin para etiquetar varios productos contra un nodo a la vez (no uno por uno).
- **Alta de datos por dos caminos, ninguno excluye al otro:** importación por CSV (necesaria — cargar cientos de combinaciones a mano no es viable) **y** creación manual completa desde el Admin (el cliente puede no tener un CSV).

---

## 4. Modelo `Product` real (reemplaza `Section.items` para el component `products`)

- Deja de vivir embebido como JSON dentro de una `Section` — pasa a ser un modelo real, scoped por `Site`.
- Se etiqueta contra **cualquier combinación de nodos, de cualquier árbol de taxonomía** (ej. "Motor" + "Renault > Sandero > 2015 > 1.6 manual").
- Campos como hoy (título, precio referencial, imagen, descripción) más `details` como JSON libre para lo variable (incluye/especificaciones/garantía) — no vale la pena modelar eso campo por campo.
- **Deben poder existir productos "universales"** sin ninguna etiqueta vehicular (ej. un ambientador para auto) — siguen visibles en su categoría sin requerir que el visitante elija un vehículo.
- Las Sections que hoy muestran productos (Hero/Quote/CTA de cada categoría, ya construidos esta sesión) no se pierden — solo cambia de dónde saca los productos la Section de galería: en vez de `data.items` estático, consulta productos por nodo de taxonomía en tiempo de render (mismo espíritu que ya usa hoy el buscador global de `/productos`, generalizado a mecanismo oficial).

### Inventario (simple, deliberadamente abierto a futuro)

- `stock` (número, **opcional**): si se deja vacío, no se trackea esa pieza y no aparece ninguna etiqueta.
- Si `stock == 0`, aparece una etiqueta roja "Sin stock" en la card, el modal y la página de producto.
- **Sin lógica de descuento automático, sin movimientos de inventario, sin alertas de reposición** — explícitamente fuera de alcance ahora, a pedido directo del dueño del proyecto ("el manejo de inventario real debe quedar abierto para implementación en el futuro, no debe estar cerrado para eso"). El campo queda listo para conectarse a algo más real después, sin rehacer el modelo.
- **Confirmado (2026-09-02):** agregar al carrito un producto con `stock == 0` no se bloquea — solo se advierte con la etiqueta roja.

---

## 5. Página de producto individual + SEO

- Hoy no existe ninguna página de detalle por producto — todo el detalle vive en un modal (`ProductDetailModal.jsx`), sin URL propia, invisible para buscadores. Confirmado contra el código: el único route dinámico bajo `/productos` es `[categoria]`, no hay `[producto]`.
- **Se construye una página de producto individual con URL propia**, necesaria para que el catálogo sea indexable — confirmado como requisito, no opcional, dado el objetivo de vender esto a otros negocios.
- **Datos estructurados JSON-LD (Schema.org Product)** en cada página — precio, disponibilidad (ligado al campo `stock`), marca — para que Google pueda mostrar resultados enriquecidos.
- **Sitemap dinámico** que liste automáticamente todas las páginas de producto y combinaciones marca/modelo a medida que se agregan.

---

## 6. Cuentas de cliente + precio oculto real

Hoy no existe ningún login para visitantes/compradores del sitio — lo que existe (`SiteEditor`/`SiteReadToken`) es exclusivamente para quien edita el CMS, un actor distinto.

- **Alta de cuentas: aprobación del vendedor**, no autorregistro abierto. El visitante solicita acceso (formulario); el vendedor aprueba manualmente desde el Admin antes de que esa cuenta pueda ver precios. Decisión explícita, pensada para venta mayorista a talleres/mecánicos conocidos.
- **Ocultamiento de precio real, a nivel de servidor** — no solo visual. El campo `price` no debe viajar en la respuesta de la API de lectura si no hay sesión de cliente aprobada activa; ocultarlo solo en el frontend no alcanza (sería visible inspeccionando la red del navegador). Esto obliga a que la API de lectura (no solo React) conozca el estado de sesión del visitante.
- **"Mis pedidos"**: historial de pedidos enviados, visible para el cliente logueado — casi gratis dado que los pedidos ya van a quedar registrados en el backend (ver sección 7).
- **Anónimo por el momento**: el registro de pedido (sección 7) no captura nombre/teléfono del comprador — decisión explícita, revisar si cambia más adelante (implicaría agregar checkbox de consentimiento LOPDP explícito, ya establecido como estándar del proyecto para cualquier formulario que capture datos personales — ver `decision-log.md`, resolución 2026-08-07).

---

## 7. Carrito + WhatsApp + registro de pedido

- Botón "Agregar al carrito" en cards, modal y página de producto; cantidad ajustable; ícono de carrito con contador (mismo patrón visual que el `FloatingWhatsapp` que ya existe hoy).
- **Confirmado (2026-09-02):** un visitante anónimo puede agregar productos al carrito y enviarlo como cotización por WhatsApp sin necesidad de cuenta (el vendedor conoce el precio real y cotiza por chat) — pero:
  - No ve precios en ningún momento (mismo gating del punto 6).
  - **No puede ver el carrito completo** — la vista completa (con precios y total) es exclusiva de clientes registrados y aprobados. El anónimo ve una versión parcial: los ítems y cantidades que agregó, sin precio ni total, suficiente para armar y enviar la cotización por WhatsApp.
- El botón de WhatsApp arma un **mensaje consolidado** con todos los ítems del carrito (no un mensaje por producto).
- **El mensaje de WhatsApp incluye el vehículo elegido** (marca/modelo/año/motorización), si el visitante lo seleccionó — para que el vendedor no tenga que volver a preguntar.
- **Se registra en el backend** (modelo nuevo, tipo `Inquiry`/`Pedido`, mismo espíritu que el `Inquiry` ya previsto en el roadmap general) — anónimo por ahora (ver punto 6).
- **Dispara email de respaldo además del mensaje de WhatsApp** — no es una decisión nueva, es aplicar el estándar que el proyecto ya sigue para cualquier envío de formulario (`decision-log.md`, resolución 2026-08-07: "email como respaldo de WhatsApp, no un único canal").

---

## 8. Selector de vehículo persistente

El visitante elige su vehículo (marca/modelo/año/motorización) una vez y esa elección se recuerda entre páginas (ej. `localStorage`) — no debería tener que re-elegirlo en cada página de categoría o producto que visite.

---

## 9. Hallazgos de la ronda de verificación (50 historias / 50 casos / 30 escenarios)

Resumen de lo que cambió el diseño original tras el ejercicio de reverificación pedido explícitamente por el dueño del proyecto (ya incorporado en las secciones de arriba, listado acá para trazabilidad):

- Año como nodo individual, no rango de texto (sección 3).
- Motorización como 4to nivel de taxonomía (sección 3).
- Catálogo vehicular compartido entre negocios, no recreado por cada tenant (sección 3).
- Falta de página de producto individual para SEO (sección 5).
- Necesidad de import masivo (CSV) además de carga manual (sección 3).
- Selector de vehículo persistente (sección 8).
- Productos universales sin etiqueta vehicular (sección 4).
- Mensaje de WhatsApp con contexto del vehículo (sección 7).
- Etiquetado masivo en Admin (sección 3).

**Descartado explícitamente por ahora** (no construir sin pedido explícito posterior): búsqueda por placa/VIN, multi-moneda, analítica de búsquedas sin resultado, alertas de "avísame cuando haya stock".

---

## 10. Contenido: lo actual no es real

Confirmado: los 90 productos actuales de Eurocentro **no corresponden a compatibilidad real verificada** — son contenido de demo con texto decorativo. Para Renault (alcance inicial: Stepway, Sandero, Duster y Logan — 4 modelos, confirmado) hay que **redactar contenido nuevo** con compatibilidad real por año y motorización, no reetiquetar lo que ya existe.

---

## 11. Plan de fases

1. **Fase 0** ✅ — Cuentas de cliente (aprobación del vendedor) + precio oculto real en la API de lectura.
2. **Fase 1** ✅ — Carrito + WhatsApp + registro de pedido (anónimo, con email de respaldo automático).
3. **Fase 2** ✅ — Motor de taxonomía genérico (`Taxonomy`/`TaxonomyNode`, nodos compartibles entre Sites) + Admin con árbol (`django-mptt`) + import CSV + carga manual. (Acción masiva de etiquetado queda para la Fase 3, junto con `ProductAdmin` — no hay `Product` todavía contra qué etiquetar.)
4. **Fase 3** ✅ — Modelo `Product` real (reemplaza `Section.items` para `products` a partir de la Fase 4/5), con `stock` opcional. (La etiqueta roja "Sin stock" es frontend, Fase 5 — el modelo ya expone `is_out_of_stock`.)
5. **Fase 4** ✅ — API de lectura: árbol de taxonomía por Site, productos filtrados por nodo(s) (AND), producto individual por slug — todo respetando el gating de precio de la Fase 0.
6. **Fase 5** ✅ — Frontend: rutas dinámicas por marca/modelo/año/motorización, página de producto individual con JSON-LD, sitemap dinámico, selector de vehículo persistente, "Mis pedidos". Las 3 variants de `products` (`parts-gallery`, `product-cards`, `catalog-search`) ya consumen la API real. El selector de vehículo persistente se sincroniza automáticamente al aterrizar en una URL de vehículo específica — ver "Cierre de los pendientes de Fase 5" y "Cierre del último pendiente del roadmap" en `decision-log.md`.
7. **Fase 6** ✅ — Contenido: migrar los 90 productos actuales de Eurocentro al modelo nuevo (como productos universales) + redactar contenido real de Renault (Stepway/Sandero/Duster/Logan) con compatibilidad por año y motorización (25 productos nuevos, `seed_catalog_v2.py`).
8. **Fase 7** — Validación end-to-end (mismo patrón usado en toda la sesión: copia descartable de la base, `check`/`migrate`/`seed`, ESLint/build) + actualizar `decision-log.md` por cada pieza implementada.

Este es un desarrollo de varias sesiones, no de una sola — el alcance creció significativamente desde el pedido original ("agregar marca y modelo") a lo largo de esta conversación de diseño.

---

## 12. Diseño cerrado

Confirmado en su totalidad (2026-09-02) — no quedan supuestos abiertos en las Fases 0-1. Sin más ajustes pendientes, el diseño queda listo para empezar a construirse cuando el dueño del proyecto lo indique.
