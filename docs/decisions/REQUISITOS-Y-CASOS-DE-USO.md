# Ingeniería de Requerimientos — CMS + Backend + Ecommerce

Pasada liviana de ingeniería de requerimientos sobre todo lo planificado hasta el 2026-08-07 (`CMS-BACKEND-ECOMMERCE-ROADMAP.md`, `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`, `CHECKLIST-CASO-USO-LANDING-PROMOCIONES-CATALOGO-WHATSAPP.md`, `PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md`, `COSTOS-INFRAESTRUCTURA-MENSUAL.md`, `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md`). No es un SRS formal — es una consolidación: reunir requisitos que hoy están dispersos en seis documentos distintos, y usar **casos de uso por plan** para encontrar huecos que ninguno de esos documentos cubre todavía.

Motivo de hacerlo ahora: ya hubo un ciclo de retrabajo real (decisión "backend por cliente" tomada y revertida el mismo día al cruzarla contra costo) por tomar una decisión de arquitectura antes de tener el requisito de negocio completo. Este documento existe para no repetir ese patrón antes de que arranque la Fase 1 de implementación.

---

## 1. Actores del sistema

| Actor | Rol |
|---|---|
| **Anvetcorp (`admin_anvetcorp`)** | Construye y mantiene la plataforma. Acceso a todos los `Site`. Único que puede crear/eliminar Sections y Pages. |
| **Cliente (`client_editor`)** | Dueño del negocio de un `Site`. Edita contenido, catálogo, promociones dentro de su propio Site únicamente. |
| **Visitante / comprador** | Navega el sitio público, arma carrito, cierra por WhatsApp o paga. Anónimo, sin cuenta. |
| **Sistema de pago** (PayPhone y futuros adapters) | Actor externo, confirma/rechaza cobros vía webhook. |
| **Sistema contable del cliente** (ContiFico y futuros adapters) | Actor externo, recibe la orden de emitir factura, responde con estado. |
| **(Futuro) Interfaz propia de CMS** | No es actor todavía — consumidor futuro de la misma API. |

---

## 2. Requisitos no funcionales transversales (aplican a todos los planes con backend)

- **Aislamiento entre tenants es no negociable**: ningún `client_editor` ni ningún token de API de un `Site` puede leer o escribir datos de otro `Site` bajo ninguna combinación de endpoint/credenciales (ya definido en el cronograma, Fase 1.7 y 2.6 — se repite acá porque es el requisito no funcional más crítico de todo el sistema).
- **Disponibilidad**: nada en producción sobre tiers gratuitos que duermen por inactividad (Web Service, Postgres) — un cliente esperando que su sitio cargue no es aceptable.
- **Tiempo de reflejo de cambios de contenido**: el cliente que edita desde el CMS necesita saber, como expectativa explícita (no solo como detalle técnico de ISR), cuánto tarda en verse su cambio en el sitio público.
- **Mobile-first**: la investigación de mercado (`PRECIOS-DESARROLLO-MERCADO-ECUADOR.md`) confirma que 75-80% del tráfico en Ecuador es móvil — ya cubierto por el template (responsive), pero vale como requisito explícito para todo lo nuevo (selector de variante, carrito, checkout).
- **Credenciales de terceros cifradas en reposo** (pago, facturación) — ya señalado como riesgo en el cronograma Fase 7.

---

## 3. Casos de uso por plan

Cada caso de uso incluye, al final, los **requisitos ocultos** que aparecieron al escribirlo — ese es el valor real del ejercicio, no la narración del flujo en sí.

### Plan 0 — Landing sin CMS / Plan 1 — Informativo simple (sin CMS)

**UC-0.1 — Visitante convierte desde la landing**
Actor: Visitante. Precondición: sitio publicado.
Flujo: visitante llega (orgánico o campaña Meta Ads) → lee contenido → hace clic en CTA (WhatsApp o formulario) → se contacta con el cliente.
Requisitos ocultos:
- **Analítica/pixel de marketing no está contemplada en ningún documento hasta ahora.** El roadmap original cita explícitamente "campaña activa de Meta Ads generando leads" como motivación de negocio — pero ningún plan (ni siquiera los con CMS) menciona Meta Pixel / Google Analytics / conversion tracking. Sin esto, el cliente no puede medir el retorno de la campaña que está pagando. Falta decidir si es parte base de todos los planes o un add-on.
- Si el CTA es un formulario (no solo WhatsApp): un sitio sin backend no tiene dónde persistir un envío de formulario — necesita un servicio de terceros (ej. Formspree) o limitarse a `mailto`/WhatsApp. No está resuelto para los planes sin CMS.

**UC-0.2 / UC-1.2 — El cliente pide un cambio de contenido después de la entrega (planes sin CMS)**
Actor: Cliente → Anvetcorp. Precondición: sitio ya entregado y en producción.
Flujo: cliente pide cambiar un texto/imagen → Anvetcorp edita el código/Data → redeploy.
Requisitos ocultos:
- **El modelo comercial de "garantía 90 días → CMS día 110" (`CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 1) fue pensado para clientes con CMS. Los planes 0 y 1 nunca tienen CMS — no hay "día 110" para ellos.** Falta definir su propio modelo de mantenimiento post-entrega: ¿cambios ilimitados incluidos por X meses?, ¿bolsa de horas?, ¿cobro por cambio? Esto es una laguna real entre el modelo comercial general y los dos planes más baratos.

---

### Plan 2 — Informativo con CMS

**UC-2.1 — Cliente edita contenido de una Section**
Actor: Cliente (`client_editor`). Precondición: usuario activo, sesión iniciada.
Flujo: login → selecciona su Site (implícito, es el único al que tiene acceso) → edita texto/imagen/tono/tamaño de una Section → guarda → cambio validado por los validators del contrato de Data → visible en el sitio tras la ventana de revalidación.
Requisitos ocultos:
- **No hay mecanismo de deshacer/versionado de contenido en ningún documento.** Si el cliente borra o rompe contenido por error, hoy la única recuperación es que Anvetcorp restaure desde un backup manual — no hay "deshacer" al alcance del cliente. Vale decidir si el MVP necesita al menos una confirmación antes de guardar cambios destructivos, o un historial simple.

**UC-2.2 — Cliente olvida su contraseña**
Actor: Cliente. Precondición: cuenta ya creada.
Flujo: (sin definir todavía) — ¿autogestionado vía email transaccional (ya presupuestado en `COSTOS-INFRAESTRUCTURA-MENSUAL.md`), o el cliente llama/escribe a Anvetcorp y alguien lo resetea a mano?
Requisitos ocultos: el costo de email transaccional ya está presupuestado, pero el **flujo operativo** (self-service vs. manual) nunca se definió como caso de uso — afecta directamente cuánto soporte humano consume esto a escala, con muchos clientes.

**UC-2.3 — Activación del CMS al cliente (día 110)**
Actor: Anvetcorp → Cliente. Precondición: garantía de 90 días cumplida.
Flujo: Anvetcorp crea el usuario `client_editor` → envía credenciales → ¿capacita al cliente?
Requisitos ocultos: **no existe un caso de uso ni checklist operativo de "handoff"** — el manual del cliente está mencionado (Fase 6.5 del cronograma) como documento a entregar, pero no como proceso (¿llamada de onboarding?, ¿video?, ¿solo el manual escrito y listo?). Con pocos clientes es manejable de forma informal; con 15-20 clientes activos, sin un proceso repetible esto se vuelve un cuello de botella operativo silencioso.

---

### Planes 3, 4, 5 — Ecommerce (≤200 / ≤500 / ≤1000 productos)

**UC-3.1 — Visitante compra y cierra por WhatsApp** (ya cubierto en detalle en `CHECKLIST-CASO-USO-LANDING-PROMOCIONES-CATALOGO-WHATSAPP.md` — no se repite acá, solo el requisito oculto nuevo que aparece al re-mirarlo como caso de uso):
Requisito oculto: el carrito vive en `localStorage`, por lo tanto **no sincroniza entre dispositivos** (el visitante arma el carrito en el celular y no lo ve si abre el sitio en la compu). Es una limitación aceptable para este modelo, pero en ningún documento se dejó explícito que haya que comunicárselo al cliente para que no lo asuma como un bug.

**UC-3.2 — Cliente sube un producto nuevo con imágenes**
Actor: Cliente. Precondición: sesión iniciada, plan con catálogo activo.
Flujo: crea `Product` → sube imágenes → define variantes/stock → publica.
Requisito oculto: **no hay ningún requisito definido de compresión/optimización automática de imágenes al subir.** Todos los cálculos de costo de R2 (`COSTOS-INFRAESTRUCTURA-MENSUAL.md`) asumen fotos ya optimizadas (~300KB c/u) — si un cliente sube fotos de 8-15MB directo del celular sin comprimir, tanto el costo real de R2 como la performance del sitio para sus visitantes cambian sustancialmente respecto a lo calculado. Falta decidir si el backend comprime automáticamente al subir (recomendado) o si queda como responsabilidad del cliente (riesgo).

**UC-3.3 — Visitante paga con pasarela** (solo si `paymentEnabled=True`)
Actor: Visitante, Sistema de pago. Flujo: carrito → checkout → PayPhone → webhook de confirmación → (si `invoicingEnabled`) factura automática.
Requisitos ocultos:
- **Reembolsos/cancelaciones no tienen caso de uso de negocio, solo la función técnica.** El cronograma menciona `refund` como método de la interfaz `PaymentProvider`, pero nunca se definió el flujo real: ¿quién autoriza un reembolso (el cliente desde el Admin, o Anvetcorp)?, ¿hay un caso de "el comprador pide cancelar"? Esto es normal en cualquier ecommerce real — no está cubierto todavía.
- **Reconciliación de fallos de pago**: si el webhook de PayPhone no llega o llega tarde y el dinero sí se descontó al comprador, ¿qué proceso sigue el cliente/Anvetcorp para resolverlo? No es solo un caso técnico (ya cubierto: "no bloquear la venta si falla la factura") — es un proceso operativo de soporte que hoy no existe en ningún documento.

**UC-3.4 — Devoluciones/cambios de producto físico**
No mencionado en ningún documento hasta ahora. No necesariamente hace falta resolverlo para el MVP, pero **debe quedar explícitamente fuera de alcance por decisión, no por omisión silenciosa** — hoy es simplemente un vacío.

---

## 4. Registro consolidado de decisiones abiertas (todas las ya anotadas, reunidas y priorizadas)

| # | Decisión pendiente | Dónde está anotada hoy | Prioridad sugerida |
|---|---|---|---|
| 1 | ~~Analítica/pixel de marketing (Meta Pixel, GA) — ¿parte base o add-on?~~ | Nueva (UC-0.1) | ✅ **Resuelto (2026-08-07)** — base en todos los planes vía contenedor GTM configurable por `Site`. Ver `decision-log.md`. |
| 2 | ~~Modelo de mantenimiento post-entrega para planes sin CMS (0 y 1)~~ | Nueva (UC-0.2/1.2) | ✅ **Resuelto (2026-08-07)** — cambios ilimitados gratis los primeros 90 días; desde el día 91, hasta 2 cambios simples/mes incluidos en el pago mensual, resto se cotiza aparte. Ver `decision-log.md` y `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md`. |
| 3 | ~~¿Quién carga el catálogo inicial — Anvetcorp o el cliente?~~ | `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md` sección 4 | ✅ **Resuelto (2026-08-07)** — depende de si hay CSV: con CSV, Anvetcorp lo importa; sin CSV, Anvetcorp carga solo ejemplos y el cliente completa (carga manual completa por Anvetcorp disponible como add-on pago). Requiere herramienta de importación CSV (Fase 7 cronograma). Ver `decision-log.md`. |
| 4 | ~~Optimización/compresión automática de imágenes al subir~~ | Nueva (UC-3.2) | ✅ **Resuelto (2026-08-07)** — se implementa en el backend de forma automática, no es responsabilidad del cliente. Ver `decision-log.md`. |
| 5 | Tensión CMS dinámico vs. compatibilidad cPanel (manual 01) | `PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md` sección 6 | Media |
| 6 | ¿Navbar reordenable por el cliente o fijo? | `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md` 1.3 | Media |
| 7 | ¿`content.description` admite rich text? | `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md` (riesgos) | Media |
| 8 | Modo borrador/publicado en el CMS | `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md` 6.4 | Media |
| 9 | Flujo de reset de contraseña — ¿self-service o manual? | Nueva (UC-2.2) | Media |
| 10 | Proceso formal de handoff/capacitación día 110 | Nueva (UC-2.3) | Media |
| 11 | Deshacer/versionado de contenido en el CMS | Nueva (UC-2.1) | Media-baja |
| 12 | Proceso de negocio de reembolsos/cancelaciones | Nueva (UC-3.3) | Media (solo si `paymentEnabled`) |
| 13 | Reconciliación de fallos de webhook de pago | Nueva (UC-3.3) | Media (solo si `paymentEnabled`) |
| 14 | ~~Devoluciones/cambios de producto — confirmar fuera de alcance~~ | Nueva (UC-3.4) | ✅ **Resuelto (2026-08-11)** — fuera de alcance del sistema: no se modela ningún flujo de devolución/cambio en `Order`/`Inquiry`. Se maneja fuera de la plataforma (WhatsApp/acuerdo directo cliente-comprador), igual que el envío cuando `shippingEnabled=False`. Ver `decision-log.md`. |
| 15 | ~~Qué pasarelas/sistemas contables priorizar además de PayPhone/ContiFico~~ | `CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 5 | ✅ **Resuelto (2026-08-11)** — no se prioriza ningún adapter adicional de `PaymentProvider`/`AccountingProvider` de forma especulativa; se construye caso por caso solo cuando un cliente real lo pida (ya cotizado como "$500-900 adicional" en `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md` sección 3). Ver `decision-log.md`. |
| 16 | ~~Notificación confiable de leads/pedidos al cliente (no depender solo de que el cliente vea WhatsApp a tiempo)~~ | Nueva (5ª sección, historias de usuario) | ✅ **Resuelto (2026-08-07)** — email como respaldo de WhatsApp en todo `Inquiry`/`Order`/formulario de contacto, mismo servicio de email transaccional ya presupuestado. Ver `decision-log.md`. |
| 17 | Soporte de múltiples usuarios por `Site` con niveles de acceso (hoy el modelo asume un solo `client_editor`) | Nueva (5ª sección) | Media |
| 18 | Reportes básicos de ventas/tráfico visibles para el cliente | Nueva (5ª sección) | Media |
| 19 | Alertas de stock bajo (no solo estado "agotado") | Nueva (5ª sección) | Media |
| 20 | ~~Captura de envío/dirección/costo de envío en el checkout — o confirmar explícitamente que queda fuera del MVP~~ | Nueva (5ª sección) | ✅ **Resuelto (2026-08-11, revisa la resolución del 2026-08-07)** — sub-módulo opcional `ShippingConfig` por `Site` (tarifa plana / envío gratis por monto mínimo / tabla por zona), sin integración con transportistas reales (descartada explícitamente, no diferida). Si no está activado, sigue coordinándose por WhatsApp como antes. Ver `decision-log.md` y `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md` Fase 7.5. |
| 21 | ~~Exportación/portabilidad de datos del cliente al terminar la relación~~ | Nueva (5ª sección) | ✅ **Resuelto (2026-08-11)** — endpoint `GET /api/v1/sites/{site}/export/` (rol `admin_anvetcorp`) que arma un bundle JSON + ZIP de imágenes con el contenido propio del `Site` (Pages/Sections/catálogo); datos personales de compradores (`Inquiry`/`Order`) quedan fuera por default, sujetos a política de retención LOPDP. Ver `decision-log.md` y `PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md` sección 5. |
| 22 | Registro maestro de clientes/planes que cubra también a los planes sin backend (0 y 1) | Nueva (5ª sección) | Media |
| 23 | Sitemap.xml/robots.txt y SSL garantizados en el export estático a cPanel | Nueva (5ª sección) | Media |
| 24 | Backup de los sitios estáticos en cPanel (hoy los backups documentados cubren solo el backend) | Nueva (5ª sección) | Media |
| 25 | ~~Cumplimiento de la Ley Orgánica de Protección de Datos Personales (LOPDP) para datos de comprador/visitante almacenados~~ | Nueva (5ª sección) | ✅ **Resuelto (2026-08-07)** — paquete base: política de privacidad real por cliente, consentimiento de cookies, checkboxes explícitos no premarcados, política de retención de `Inquiry`/`Order`. No reemplaza revisión legal profesional. Ver `decision-log.md` y `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`. |
| 26 | Accesibilidad (WCAG) como estándar a cumplir | Nueva (5ª sección) | Baja-media |
| 27 | Localización del Django Admin a español, con terminología no técnica | Nueva (5ª sección) | Media |

---

## 5. Segunda pasada — 60 historias de usuario por plan (generadas y analizadas internamente)

A pedido explícito, esta pasada se hizo con historias de usuario ("Como [actor], quiero [acción], para [beneficio]") en vez de casos de uso — 10 por plan (60 en total), cubriendo ángulos que la primera pasada no tocó: accesibilidad, cumplimiento legal, logística, multi-usuario, portabilidad de datos, resiliencia del hosting estático. Las historias en sí no se incluyen acá (quedan en el proceso de análisis, no en el entregable) — lo que sigue es lo que salió de analizarlas: requisitos nuevos, no cubiertos por la sección 3 ni por ningún otro documento del proyecto.

### Requisitos funcionales nuevos

- **Notificación confiable de pedidos/leads al cliente.** Tanto el formulario de contacto (planes con CMS) como el pedido de WhatsApp (planes ecommerce) dependen hoy de que el cliente "vea" el mensaje a tiempo, sin ningún canal redundante ni registro que sobreviva si no lo ve. Es el flujo que genera la venta — el de mayor prioridad de todos los encontrados en esta pasada.
- **Captura de envío en el checkout.** Ningún documento del proyecto menciona dirección, costo ni método de envío — el modelo de datos de `Order`/`Inquiry` no lo contempla. Puede ser una decisión válida dejarlo fuera ("el envío se coordina por WhatsApp, fuera de la plataforma"), pero hoy es un vacío, no una decisión.
- **Multi-usuario por `Site`.** Todo el diseño de permisos (`client_editor`) asume un único usuario por cliente. Un cliente con community manager o socio necesitando acceso compartido no está contemplado.
- **Reportes de ventas/tráfico para el cliente.** Ni siquiera un resumen básico ("tus 5 productos más vendidos este mes") está definido — y es información que el cliente va a pedir apenas tenga el catálogo activo.
- **Alertas de stock bajo**, no solo el estado binario "agotado" ya cubierto.
- **Exportación de datos del cliente al finalizar la relación** — relevante especialmente porque el backend es multi-tenant compartido (decisión que ya aceptó menos aislamiento por costo); sin esto, "llevarse los datos" no es técnicamente trivial para el cliente.
- **Registro maestro de clientes/planes** que incluya también a los clientes de planes 0 y 1 (sin backend) — hoy el único lugar donde "existe" un cliente formalmente es el modelo `Site`, y esos dos planes nunca tienen uno.
- **Sitemap.xml/robots.txt garantizados** en el export estático a cPanel (no asumir que Next.js los genera igual en modo estático que en Vercel).

### Requisitos no funcionales nuevos

- **Cumplimiento de la LOPDP (Ley Orgánica de Protección de Datos Personales de Ecuador).** Ningún documento del proyecto la menciona, y ya hay (o va a haber) datos personales de compradores/visitantes almacenados (`Inquiry`, `Order`, formularios de contacto). Es una obligación legal de Ecuador, no una mejora opcional — vale revisar con un abogado antes de almacenar el primer dato real de un comprador.
- **SSL garantizado en hosting cPanel.** Vercel lo automatiza; para los planes 0/1 en cPanel reseller nunca se confirmó que esté garantizado por el proveedor de hosting elegido.
- **Backup de los sitios estáticos en cPanel** — todo lo documentado sobre backups (Postgres, R2) cubre el backend; los planes sin backend no tienen ninguna estrategia de respaldo definida.
- **Accesibilidad (WCAG)** como estándar — no mencionada en ningún documento hasta ahora.
- **Localización del Django Admin** a español con lenguaje no técnico — Django Admin por defecto usa terminología de desarrollador (Section, Slug, etc.), y el `client_editor` es explícitamente "no técnico" en todo el resto de la documentación.
- **Matriz de compatibilidad de navegadores** soportados — no definida.
- **Portabilidad del proveedor de hosting cPanel** (riesgo de vendor lock-in si el reseller elegido cierra o sube precios) — no evaluado.

---

## 6. Requisitos ocultos encontrados — resumen combinado (primera + segunda pasada)

Los ocho más relevantes de las dos pasadas juntas:

1. **Falta tracking de marketing (Meta Pixel/GA)** en todos los planes, pese a que la campaña de Meta Ads es la motivación de negocio original del proyecto.
2. **Notificación confiable de pedidos/leads al cliente** — el flujo que genera la venta depende de un solo canal sin respaldo.
3. **Cumplimiento de la LOPDP** para datos personales de compradores/visitantes — obligación legal no contemplada.
4. **Captura de envío en el checkout** — vacío total en el modelo de datos de ecommerce.
5. **El modelo comercial de 110 días no cubre a los planes sin CMS** — necesitan su propio esquema de mantenimiento.
6. **La compresión de imágenes al subir no es un requisito garantizado**, y toda la proyección de costos de R2 asume que sí lo es.
7. **No hay proceso de negocio para reembolsos ni para fallos de conciliación de pago** — solo la función técnica existe.
8. **No hay proceso repetible de handoff/capacitación al cliente** — funciona informalmente con pocos clientes, no va a escalar.

---

## 7. Próximos pasos sugeridos

- [ ] Priorizar y cerrar los ítems marcados **Alta** en la tabla de la sección 4 antes de arrancar la Fase 1 del cronograma — son los que más cambian precio, arquitectura o exposición legal si se descubren tarde. En particular: notificación de pedidos, LOPDP y captura de envío son nuevos y no triviales.
- [ ] Los ítems de prioridad media/baja pueden cerrarse en paralelo al desarrollo, no son bloqueantes.
- [ ] Una vez cerradas las decisiones de prioridad alta, actualizar `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`, `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md` y `COSTOS-INFRAESTRUCTURA-MENSUAL.md` donde corresponda — este documento es la fuente de verdad de qué falta decidir, esos documentos son donde se refleja la decisión ya tomada.
