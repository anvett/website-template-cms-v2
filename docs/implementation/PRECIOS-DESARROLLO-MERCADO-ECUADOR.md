# Precios de Desarrollo por Plan — Investigación de Mercado Ecuador (2026)

Este documento cubre el **precio de desarrollo** (costo único de armar/entregar la instancia — los "días 1-20" del modelo comercial en `CMS-BACKEND-ECOMMERCE-ROADMAP.md`), distinto del **costo/precio mensual de infraestructura** ya cubierto en `COSTOS-INFRAESTRUCTURA-MENSUAL.md`. Agrega además el plan que faltaba: **Landing page sin CMS**.

**Investigación realizada el 2026-08-07** vía búsqueda web. Fuentes al final del documento.

---

## 1. Qué cobra la competencia en Ecuador — resumen de mercado

### Fuente ancla: Tarifario CDPA (Colegio de Diseñadores Profesionales Autónomos del Ecuador)

Es la referencia de precios **mínimos** más oficial que existe en el mercado ecuatoriano (vigente jul 2025 – jul 2026, Acuerdo Ministerial No. 0011). Clasifica clientes en A (empresas grandes/Estado), B (pymes), C (independientes/fundaciones):

| Servicio | Cliente A | Cliente B | Cliente C |
|---|---:|---:|---:|
| Landing page / página única | $240 | $220 | $180 |
| Implementación WordPress/Joomla (solo CMS, sin diseño completo) | $540 | $460 | $380 |
| Sitio HTML5/CSS3, home + 5 secciones | $1,380 | $1,180 | $980 |
| Sitio responsivo, home + 5 secciones | $2,000 | $1,700 | $1,440 |
| Sistema de autogestión PHP (1 sección autoadministrable) | $460 | $400 | $330 |
| SEO básico (mensual, mín. 3 meses) | $120 | $90 | $50 |
| SEO avanzado (mensual, mín. 3 meses) | $240 | $180 | $120 |
| Hora de diseño/consultoría | — | — | $30/hora ($50/hora con IA) |

### Agencias reales (ejemplos verificados)

- **NM Tech Studio** (Guayaquil, +80 proyectos entregados): Sitios Web Corporativos **desde $1,200** (incluye CMS), Tiendas E-Commerce **desde $2,000**, Aplicaciones Web a Medida **desde $6,000**. Incluyen 30 días de soporte post-lanzamiento.
- **Webcorp** (Guayaquil): aplica el tarifario CDPA como base de cotización.

### Rangos generales agregados de múltiples fuentes

- Landing page: **$180–$600** típico, hasta $1,800 en versiones más completas con copywriting/integraciones a medida.
- Sitio informativo completo (multi-página, diseño custom): **$980–$2,000**.
- Tienda online / ecommerce: **$1,200–$4,000** típico; agencias grandes cotizan desde $2,000; catálogos grandes o con pasarela + inventario pueden superar los $4,000-6,000.
- Hosting básico Ecuador: ~$5/mes (1 sitio); intermedio ~$10/mes; alta gama ~$35/mes+.
- Mantenimiento mensual: **$10–$200/mes** según complejidad (validado — esto confirma que el rango de $20-130/mes ya propuesto en `COSTOS-INFRAESTRUCTURA-MENSUAL.md` está dentro de lo normal del mercado ecuatoriano, no por debajo ni exageradamente por encima).

### Dato relevante de contexto para ecommerce (ahora es un add-on, no una limitación permanente)

**Actualización 2026-08-07:** el módulo ecommerce pasó a soportar pago y facturación integrados como sub-módulos **opcionales por cliente** (ver `CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 5 y Fase 7 del cronograma) — ya no es "Anvetcorp solo hace checkout por WhatsApp". Esto cambia cómo se lee el siguiente dato de mercado:

Desde enero de 2026 la facturación electrónica en Ecuador es de **transmisión inmediata (SRI)**. Una tienda con pasarela de pago que no tiene esta integración lista puede recibir multas — y según el mercado, esa integración agrega **$400–$1,200 adicionales** al desarrollo. Eso sigue siendo cierto y sigue siendo la base para cobrar el **add-on de pago + facturación** (sección 3) a los clientes que sí lo pidan. Lo que cambia es que **el checkout por WhatsApp (sin ese costo) ahora es una opción dentro del mismo sistema, no la única alternativa disponible** — el diferenciador real hacia el cliente es poder ofrecer ambos caminos y dejar que el cliente elija cuál le conviene, no vender "no tenemos pago" como ventaja. (Nota: esto no es asesoría legal — antes de activar pago/facturación real para un cliente, revisar el requisito de facturación electrónica con un contador/abogado.)

---

## 2. Los 6 planes — precio de desarrollo sugerido

Con el nuevo plan agregado (Landing sin CMS) y cruzando la investigación de mercado contra el trabajo real que implica cada uno (grounded en lo ya definido en `CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md` y `CHECKLIST-CASO-USO-LANDING-PROMOCIONES-CATALOGO-WHATSAPP.md`):

Los precios de los planes 3-5 son la **base**: catálogo + carrito + checkout por WhatsApp, sin pago ni facturación integrados (`EcommerceConfig.paymentEnabled=False`). Pago y facturación se cotizan aparte, como add-on (sección 3), porque son sub-módulos opcionales que no todo cliente necesita. **La carga de catálogo inicial también se cotiza aparte, desglosada en la sección 4 (resuelto 2026-08-07)** — el precio "todo incluido" ya no es un único número fijo, depende de si el cliente entrega CSV, no entrega nada, o pide que Anvetcorp cargue todo a mano.

| # | Plan | Alcance | Precio de desarrollo sugerido (sistema, sin carga de catálogo) | Posición vs. mercado |
|---|---|---|---:|---|
| 0 | **Landing page sin CMS** | Una sola página, sin CMS, sin backend, export estático a cPanel | **$250–350** | Por encima del piso CDPA Cliente C ($180), por debajo de agencias custom ($500+) — justificado por calidad de template probado, no artesanal desde cero |
| 1 | **Informativo simple (sin CMS)** | Multi-página (Home + 4-5 secciones), sin CMS, cPanel | **$600–900** | Bien por debajo del sitio responsivo CDPA/agencia ($1,440–2,000) — la ventaja del template reusable de Anvetcorp es velocidad de entrega, no calidad reducida |
| 2 | **Informativo con CMS** | Igual al plan 1 + backend multi-tenant, autogestión de contenido desde el día 110 | **$900–1,400** | En línea con el piso de NM Tech Studio ($1,200 con CMS incluido) — competitivo, con el diferencial real de que el CMS es cierto (no una promesa de WordPress genérico) |
| 3 | **Ecommerce ≤200 productos** (sistema base, sin pago/facturación, catálogo cargado por el cliente) | + catálogo, colecciones, variantes, carrito, checkout WhatsApp | **$900–1,100** | Precio del sistema solo; agregar carga de catálogo según sección 4 |
| 4 | **Ecommerce ≤500 productos** (sistema base) | Igual + más volumen de catálogo | **$1,000–1,300** | Precio del sistema solo; agregar carga de catálogo según sección 4 |
| 5 | **Ecommerce ≤1000 productos** (sistema base) | Igual + catálogo grande | **$1,100–1,500** | Precio del sistema solo; agregar carga de catálogo según sección 4 |

**Nota sobre planes 3-5:** el precio del sistema ya no varía tanto entre tiers como antes, porque —igual que ya estaba documentado en `COSTOS-INFRAESTRUCTURA-MENSUAL.md` para infraestructura— la complejidad técnica de soportar 200 o 1000 productos es casi la misma. La diferencia real de precio total al cliente está en la carga de catálogo (sección 4), no en el sistema.

**Nota sobre complejidad del sitio institucional (resolución 2026-08-11):** el precio del sistema de la tabla de arriba asume una complejidad de sitio típica (equivalente al plan 2 — Home + 4-5 secciones institucionales). El paquete de funcionalidad "Promociones + Catálogo + carrito WhatsApp" (`CHECKLIST-CASO-USO-LANDING-PROMOCIONES-CATALOGO-WHATSAPP.md`) se agrega sobre un sitio de cualquier tamaño, no solo sobre una landing — si el cliente pide un sitio institucional notablemente más grande (ej. tipo Kautela, con varias páginas/secciones adicionales), **no hay tabla fija para eso: se cotiza caso por caso**, con el mismo criterio ya usado para pasarelas/sistemas contables nuevos no soportados (sección 3) — depende directamente de la complejidad real del cliente, no de una regla general.

---

## 3. Add-on: pago integrado + facturación electrónica

Aplica sobre cualquiera de los planes 3, 4 o 5 — el precio del add-on no depende del tamaño del catálogo (200/500/1000), depende de qué sub-módulos se activan. Justificación de precio: el mercado ecuatoriano cotiza la integración de pago + cumplimiento SRI en **$400–$1,200 adicionales** (sección 1) — Anvetcorp puede posicionarse en la parte baja de ese rango porque la arquitectura de proveedor plugable (`PaymentProvider`/`AccountingProvider`, Fase 7.3/7.4 del cronograma) ya existe una vez construido el primer cliente que la use; integrar un cliente nuevo con PayPhone + ContiFico es reutilizar adapters ya hechos, no construirlos de cero cada vez — la misma lógica de ventaja por reutilización que ya aplica al resto del template.

| Add-on | Incluye | Precio de desarrollo sugerido |
|---|---|---:|
| Solo pago integrado | `PaymentProvider` (PayPhone u otra pasarela ya soportada), `Order` con estados de pago, checkout en el frontend | **$250–450** |
| Solo facturación electrónica | `AccountingProvider` (ContiFico u otro ya soportado), credenciales cifradas del cliente, trigger de emisión de factura | **$250–450** |
| Pago + facturación (combo) | Ambos, integrados entre sí (factura se dispara al confirmarse el pago) | **$400–700** |
| Pasarela o sistema contable **nuevo**, no soportado todavía | Construir el adapter nuevo (`PaymentProvider`/`AccountingProvider`) desde cero para ese proveedor específico | **$500–900 adicional**, cotizar caso por caso — es trabajo de desarrollo real, no configuración |

**No incluye** la comisión de la pasarela de pago (2.9%-5% + $0.30 por venta según proveedor, verificado en la investigación de mercado) — eso lo cobra el proveedor de pago directamente al cliente final, no es un costo ni un ingreso de Anvetcorp.

### Add-on: módulo de envío por reglas fijas (resolución 2026-08-11)

Aplica sobre cualquiera de los planes 3, 4 o 5, independiente de pago/facturación (un cliente puede activarlo solo, o combinado). A diferencia del add-on de pago/facturación, este **no** integra transportistas reales — es cálculo de costo por reglas configuradas (tarifa plana, envío gratis por monto mínimo, o tabla por zona), sin API externa. Por eso el precio es menor y no requiere el rango "$500-900" reservado para adapters nuevos de pago/contabilidad.

| Add-on | Incluye | Precio de desarrollo sugerido |
|---|---|---:|
| Módulo de envío (reglas fijas) | `ShippingConfig` por `Site`, captura de dirección en checkout, cálculo de costo (flat/zona/gratis por monto mínimo), snapshot en `Order`/`Inquiry` | **$150–250** |

**No incluye** integración con transportistas (cotización real, guías, tracking) — queda fuera de alcance del template por decisión explícita, no es una fase futura pendiente de cotizar.

---

## 4. Carga de catálogo inicial (planes 3-5) — resuelto 2026-08-07

Ya quedó documentado en `COSTOS-INFRAESTRUCTURA-MENSUAL.md` que la infraestructura mensual casi no varía entre un catálogo de 200 y uno de 1000 productos. **En el desarrollo (costo único) sí hay una diferencia real, pero es de tiempo/mano de obra de carga de datos, no de complejidad técnica**: cargar y verificar 1000 productos (título, descripción, precio, variantes, imágenes) lleva más horas que cargar 200, sin importar qué tan barata sea la infraestructura de fondo.

**Resolución (ver `decision-log.md`):** depende de si el cliente entrega un CSV con su catálogo.
- **Con CSV:** Anvetcorp lo importa vía la herramienta de importación masiva (Fase 7.2 del cronograma) — es un servicio de mapeo/validación de datos ya provistos por el cliente, no data entry desde cero. Se cobra el add-on **"Importación vía CSV"**.
- **Sin CSV, por defecto:** Anvetcorp carga solo un lote de productos de ejemplo (plantilla) vía Admin, y el cliente completa el resto desde el CMS una vez entregado el sitio. No se cobra add-on adicional — está incluido en el precio base del sistema (sección 2).
- **Sin CSV, si el cliente pide que Anvetcorp cargue todo a mano:** se cobra el add-on **"Carga manual completa"**, que cubre las horas reales de data entry — este es el escenario que antes estaba implícito en el precio "todo incluido" de la tabla de la sección 2 anterior a esta resolución.

### Precio de desarrollo desglosado — sistema + carga de catálogo

| # | Plan | Precio base del sistema (sección 2) | Add-on "Importación vía CSV" | Add-on "Carga manual completa (sin CSV)" |
|---|---|---:|---:|---:|
| 3 | Ecommerce ≤200 productos | $900–1,100 | **$100–150** | **$300–500** |
| 4 | Ecommerce ≤500 productos | $1,000–1,300 | **$150–250** | **$600–900** |
| 5 | Ecommerce ≤1000 productos | $1,100–1,500 | **$250–400** | **$1,100–1,500** |

Nota de consistencia: Base + "Carga manual completa" reproduce exactamente el precio "todo incluido" que tenía cada plan antes de este desglose ($1,200–1,600 / $1,600–2,200 / $2,200–3,000) — este desglose no es un recorte de precio, es hacer visible al cliente qué está pagando y por qué, y darle la opción de bajar el costo si entrega su catálogo en CSV o lo carga él mismo.

---

## 5. Mantenimiento post-entrega planes 0 y 1 (sin CMS) — resuelto 2026-08-07

Los planes 0 (Landing sin CMS) y 1 (Informativo sin CMS) no tienen backend ni autogestión — cualquier cambio de contenido requiere que Anvetcorp edite el código y redeploye. Sin este punto resuelto, no había ninguna oferta de mantenimiento para estos dos planes, a diferencia de los planes 2-5 que sí tienen CMS.

**Resolución (ver `decision-log.md`):**
- **Días 1–90 desde la entrega:** cambios de contenido ilimitados y gratis — misma ventana que la garantía general del modelo comercial (roadmap, ventana de 110 días), por consistencia.
- **Desde el día 91:** el pago mensual ya definido en `COSTOS-INFRAESTRUCTURA-MENSUAL.md` ($15–25/mes plan 0, $20–30/mes plan 1) pasa a incluir, además del hosting, **hasta 2 cambios simples de contenido por mes** (ej. cambiar un texto, una imagen, un teléfono — no restructurar secciones ni agregar páginas nuevas).
- **Cambios adicionales o más complejos** (más de 2 en el mes, o que impliquen reestructurar secciones/agregar páginas): se cotizan aparte.
  - Cambio simple adicional (fuera de los 2 incluidos): **$15–20 por cambio**.
  - Cambio complejo (nueva sección, nueva página, rediseño parcial): a tarifa de consultoría, **$25–35/hora** — en línea con el piso CDPA de $30/hora (hasta $50/hora con herramientas de IA).

Esto convierte a los planes 0 y 1 en una oferta sostenible para Anvetcorp más allá de los primeros 90 días, sin forzar al cliente de un sitio simple a pagar por un CMS que no necesita.

---

## 6. Fuentes

- [Sistema de facturación electrónica Ecuador — Siigo Contífico](https://contifico.com/facturacion-electronica/) (API pública, integración con tiendas online)
- [Cómo integrar tu tienda en línea con Contifico — Narviz](https://narviz.com/como-integrar-tu-tienda-en-linea-con-contifico/)
- [Sistemas contables para pymes en Ecuador 2026 — Apolo Software](https://apolosoftware.com.ec/blog/sistemas-contables-para-pymes/)
- [Software contable en Ecuador: comparativa 2026 — Anfibius](https://anfibius.net/software-contable-en-ecuador-comparativa-2026/)
- [AZUR — Facturación electrónica y sistema contable SRI Ecuador](https://azur.com.ec/)
- [Tarifario servicios de diseño y digitales en Ecuador — Webcorp](https://webcorp.ec/diseno-web/tarifario-servicios-web-multimedia/) (resumen del Tarifario Modelo CDPA)
- [¿Cuánto cuesta hacer una página web? — Webcorp](https://webcorp.ec/diseno-web/cuanto-cuesta-hacer-una-pagina-web/)
- [Desarrollo Web Ecuador 2026 — NM Tech Studio](https://www.nmtechstudio.com/desarrollo-web)
- [Cuánto Cuesta una Página Web en Ecuador 2026 — NM Tech Studio](https://www.nmtechstudio.com/blog/cuanto-cuesta-pagina-web-ecuador-2026)
- [¿Cuánto cuesta una página web en Ecuador? — Innovacenter](https://www.innovacenter.ec/cuanto-cuesta-una-pagina-web-en-ecuador/)
- [¿Cuánto cuesta una página web en Ecuador en 2026? — Pablo Ronquillo](https://www.pabloronquillo.com/cuanto-cuesta-una-pagina-web-en-ecuador-en-2026/)
- [¿Cuánto cuesta una página web en Ecuador en 2026? — Azirgo](https://azirgo.com/blog/cuanto-cuesta-pagina-web-ecuador/)
- [Cuánto cuesta una página web en Ecuador 2026 — Ecuasites](https://ecuasites.com/cuanto-cuesta-una-pagina-web-en-ecuador-2026/)
- [Cuánto cuesta una página web en Ecuador 2026 — Neolo Blog](https://www.neolo.com/blog/precio-pagina-web-ecuador.php)
- [Guía de precios para páginas web en Ecuador — Fasabri](https://www.fasabri.com/blog/diseno-web/precios-paginas-web-ecuador/)
- [¿Cuánto cuesta una página web en Ecuador? — Insaite](https://insaite.tech/blog/precio-paginas-web-ecuador/)
- [Precio de Diseño Web Ecuador 2026 — Bigredes](https://bigredes.com/precio-de-diseno-de-paginas-web-en-ecuador/)
- [Tienda virtual en Ecuador: cómo lanzar un ecommerce en 2026 — Agencia Digital](https://agenciadigital.com.ec/desarrollo-web/tienda-virtual-en-ecuador-como-lanzar-un-ecommerce-exitoso/)
