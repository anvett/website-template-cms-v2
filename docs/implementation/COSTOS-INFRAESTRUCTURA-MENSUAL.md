# Costos de Infraestructura Mensual — 5 Planes de Cliente

**Actualizado 2026-08-07 — reemplaza la versión anterior de este documento.** La versión anterior asumía "un backend Django + una base de datos de Render por cliente", que escalaba linealmente (~$44-89/mes de infraestructura por cliente) y hacía inviable vender el CMS a ~$50/mes con margen. Esa decisión se revirtió: el backend ahora es **multi-tenant compartido** — una sola app Django + una sola base de datos sirve a todos los clientes (ver `CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 6). Este documento recalcula todo bajo ese modelo.

**Precios verificados el 2026-08-07** en las páginas oficiales de Vercel, Render y Cloudflare — son montos que cambian con el tiempo y con el uso real; este documento es una estimación de referencia, no una factura. Revisar contra el pricing oficial antes de comprometer un precio con un cliente.

Este documento cubre el **costo/precio mensual recurrente** (mantener la plataforma activa). Para el **precio de desarrollo** (costo único de construir cada instancia) cruzado contra precios de la competencia en Ecuador, ver `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md`.

---

## 0. Por qué el costo ya no escala linealmente por cliente

El costo de infraestructura tiene dos partes con comportamiento muy distinto:

1. **Plataforma compartida (Vercel + backend de Render + R2):** es prácticamente **fija** — no se multiplica por cliente. Un mismo Web Service de Django y una misma base de datos de Postgres atienden a todos los clientes a la vez (cada uno scoped por `Site`). Solo hay que subir de *tier* (más RAM/CPU/almacenamiento) cuando el **uso agregado de todos los clientes juntos** lo exige — no cuando se suma un cliente más.
2. **Hosting estático (cPanel) para sitios sin CMS:** también es prácticamente fijo — una cuenta reseller con cPanel aloja una cantidad grande de sitios estáticos por una tarifa plana.

Lo que **casi no cuesta nada agregar** es un cliente más sobre infraestructura que ya existe: una fila `Site` nueva en la base de datos, un Project nuevo en Vercel, algo de storage en R2. Por eso el número de $1,000+/mes para 20 clientes del cálculo anterior era un artefacto de la arquitectura "un backend por cliente", no una realidad inevitable de estos proveedores.

---

## 1. Aclaración: Cloudflare R2 (no "Cloudflare S3")

Cloudflare no tiene un producto llamado "S3" — ese es de AWS. El producto de Cloudflare es **R2**, compatible con la API de S3. Sirve para los dos usos que preguntaste — backups e imágenes — bajo una sola cuenta de Cloudflare, sin costo de plataforma (R2 es 100% pay-as-you-go, sin cuota base):

- **Backups**: dumps periódicos de la base de datos compartida, adicionales a los backups nativos de Render (retención lógica + PITR, incluidos en los planes pagos de Postgres) — R2 es la copia *fuera* de Render.
- **Medios**: imágenes/videos subidos desde el CMS (reemplaza storage local de Django vía `django-storages`).
- **Ventaja de costo real:** egress (descarga) gratis siempre — servir imágenes del catálogo desde R2 en vez de desde Render evita gastar el ancho de banda pago de Render.

---

## 2. Costo de la plataforma compartida (Vercel + Render backend + R2)

| Componente | Escenario inicial | Escenario con margen de crecimiento |
|---|---:|---:|
| Vercel Pro (1 seat, todos los Projects) | $20/mes | $20/mes |
| Render Workspace Pro (una sola vez) | $25/mes | $25/mes |
| Render Web Service (Django, compartido) | Standard — $25/mes | Pro — $85/mes |
| Render PostgreSQL (compartida) | Basic-1gb — $19/mes | Pro-4gb — $55/mes |
| Cloudflare R2 (backups + medios, todos los clientes) | ~$2/mes | ~$8/mes |
| **Total plataforma compartida** | **$91/mes** | **$193/mes** |

Este monto **no se multiplica por cliente** — es el costo de tener la plataforma encendida, sirviendo a cuantos clientes CMS/ecommerce estén activos. Arrancar en "inicial" y subir a "con margen de crecimiento" solo cuando las métricas reales de tráfico/carga lo pidan (Render prorratea por segundo, cambiar de tier no es una decisión cara ni lenta).

**No incluye** hosting estático (sección 3) ni los tiers de ecommerce grandes necesitan, por sí solos, subir este monto — como se ve en la sección 4, el tamaño del catálogo casi no pesa sobre esta cuenta.

---

## 3. Hosting estático (cPanel) — para clientes sin CMS

No usa Vercel, Render ni R2. Una cuenta de hosting reseller con cPanel ilimitado hoy ronda **$10–20/mes en total** (verificado por búsqueda: ResellersPanel desde $9/mes, Stablepoint desde $12.99/mes, Namecheap desde $19.88/mes) y aloja una cantidad grande de sitios estáticos — no por cliente, es una tarifa plana que Anvetcorp ya paga una vez.

---

## 4. Los 6 planes: costo real de infraestructura por tier

Incluye el plan agregado el 2026-08-07: **Landing page sin CMS** (más básico que "Informativo simple" — una sola página, sin backend).

| # | Plan | Usa Vercel/Render/R2 | Costo marginal real por cliente | Qué lo hace más caro/barato |
|---|---|---|---:|---|
| 0 | **Landing page sin CMS** (cPanel, una sola página) | No — solo cPanel | **~$0.5–2/mes** | Misma cuenta reseller que el plan 1, prorrateada — una sola página pesa menos que un sitio multi-página, pero la diferencia de costo real es marginal. |
| 1 | **Informativo simple** (cPanel, sin CMS, multi-página) | No — solo cPanel | **~$1–3/mes** | Parte proporcional de la cuenta reseller ($10-20/mes ÷ cantidad de sitios estáticos activos). Sin backend, sin Vercel. |
| 2 | **Informativo con CMS** | Sí, comparte la plataforma de la sección 2 | **~$5–10/mes** | Un Project de Vercel más + unas pocas filas en la base compartida (Pages/Sections/imágenes livianas: logo, hero, equipo). Prácticamente no le pesa a la base de datos ni al Web Service. |
| 3 | **Ecommerce ≤200 productos** | Sí | **~$8–13/mes** | Igual que el plan 2 + catálogo: con fotos optimizadas (~300KB c/u, 3 por producto), ronda 180MB en R2 — sigue dentro del free tier compartido de R2 en la mayoría de los casos. |
| 4 | **Ecommerce ≤500 productos** | Sí | **~$10–16/mes** | Mismo esquema, ~450MB de imágenes. La base de datos no crece de forma relevante (los datos de producto son texto/precios, livianos) — el catálogo casi no mueve el costo. |
| 5 | **Ecommerce ≤1000 productos** | Sí | **~$13–20/mes** | ~1.2GB de imágenes (con 4 fotos por producto en catálogos grandes). Sigue siendo una fracción chica de la plataforma compartida — la diferencia real de costo entre el plan 3 y el plan 5 es de unos pocos dólares, no de $40-80 como en el modelo anterior. |

**Punto importante y honesto:** la cantidad de productos (200 vs. 500 vs. 1000) casi no afecta el costo real de infraestructura — un catálogo es datos livianos (texto, precios, referencias a imágenes) y las imágenes se mantienen baratas en R2 incluso a 1000 productos. Lo que sí varía con el tamaño del catálogo es el **tráfico esperado** (más productos suele correlacionar con más visitas/ventas) y la **complejidad funcional entregada** (variantes, colecciones, buscador — ver `CHECKLIST-CASO-USO-LANDING-PROMOCIONES-CATALOGO-WHATSAPP.md`), no el costo de hosting en sí. La diferencia de precio entre tiers de ecommerce debería reflejar **valor entregado**, no un costo de infraestructura que en los hechos casi no cambia.

---

## 5. Precio sugerido por plan (orientativo — la decisión comercial final es tuya)

No es una recomendación financiera cerrada, es una referencia cruzando costo real + margen + valor percibido típico de este tipo de servicio. Ajustalo con lo que sepas del mercado/competencia:

| # | Plan | Costo real | Precio sugerido | Margen aproximado |
|---|---|---:|---:|---:|
| 0 | Landing sin CMS (cPanel) | $0.5–2 | $15–25/mes | ~90% |
| 1 | Informativo simple (cPanel) | $1–3 | $20–30/mes | ~90% |
| 2 | Informativo con CMS | $5–10 | $40–55/mes | ~85% |
| 3 | Ecommerce ≤200 productos | $8–13 | $60–75/mes | ~85% |
| 4 | Ecommerce ≤500 productos | $10–16 | $80–100/mes | ~85% |
| 5 | Ecommerce ≤1000 productos | $13–20 | $100–130/mes | ~85% |

Los saltos de precio entre planes 3-4-5 están pensados como **escalón de valor** (más productos, más complejidad de catálogo, negocio más grande del lado del cliente), no como traslado de un costo de infraestructura que en la realidad casi no se mueve.

**Nota sobre pago y facturación (agregado 2026-08-07):** estos son sub-módulos opcionales por cliente (ver `CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 5) que **casi no agregan costo de infraestructura mensual** — siguen corriendo sobre el mismo backend compartido, solo hacen algunas llamadas de API salientes más (a la pasarela de pago, al sistema contable del cliente). El precio de **desarrollo** de estos sub-módulos (costo único, no mensual) está en `PRECIOS-DESARROLLO-MERCADO-ECUADOR.md` sección 3. Importante: la comisión de la pasarela de pago (2.9%-5% + $0.30 por venta) la cobra el proveedor de pago directamente al cliente final — no es un costo de Anvetcorp ni debe mezclarse con los números de este documento.

---

## 6. Respuesta directa: ¿$50/mes por cliente es realista?

**Sí, y con margen amplio — pero solo bajo el modelo multi-tenant compartido, no bajo "un backend por cliente".** $50/mes cubre cómodamente el plan 2 (informativo con CMS, costo real ~$5-10) con ~80-85% de margen, y todavía deja margen razonable en el plan 3 (ecommerce chico). Para los planes 4 y 5, $50/mes se queda corto frente al valor entregado (no frente al costo de infraestructura, que sigue siendo bajo) — ahí conviene cobrar más, no porque cueste más hostear, sino porque es un catálogo más grande y más crítico para el negocio del cliente.

---

## 7. Escenario total con portafolio mixto (verificación con números reales)

| Portafolio | Backend compartido | cPanel | Total infra | Promedio por cliente |
|---|---:|---:|---:|---:|
| 10 clientes (3 plan 1 + 7 en planes 2-5) | $91/mes | $15/mes | $106/mes | $10.6/cliente |
| 20 clientes (5 plan 1 + 15 en planes 2-5) | $193/mes | $15/mes | $208/mes | $10.4/cliente |
| 30 clientes (8 plan 1 + 22 en planes 2-5) | $193/mes | $15/mes | $208/mes | $6.9/cliente |

Con 20 clientes activos (el ejemplo que mencionaste), el costo real de infraestructura ronda **$208/mes total, no $1,000+/mes** — la diferencia completa viene de haber revertido "un backend por cliente" a multi-tenant compartido. Si esos 20 clientes pagaran en promedio $50/mes, la facturación sería $1,000/mes contra ~$208/mes de costo de infraestructura — margen bruto de infraestructura de ~79%, antes de contar tu tiempo, soporte, dominios y demás (sección 8).

---

## 8. Otros costos recurrentes a considerar (fuera de Vercel/Render/R2/cPanel)

- **Email transaccional** (reset de contraseña del Admin, notificaciones): Resend/SendGrid/Postmark. Volumen bajo, normalmente $0 dentro del free tier de cualquiera.
- **Monitoreo de errores del backend** (Sentry u equivalente): free tier suele alcanzar; opcional, ronda $26/mes si hace falta más volumen/retención agregando todos los clientes.
- **Dominios**: ~$10–20/año por dominio — fuera del hosting. Definir por cliente si lo compra/renueva Anvetcorp o el cliente.
- **WhatsApp**: $0 — son links `wa.me`, no la API oficial de WhatsApp Business Platform (que sí cobra por conversación, no aplica hoy).
- **Impuestos/conversión de moneda**: pagos en USD a Vercel/Render/Cloudflare pueden tener cargos locales según banco/tarjeta — no incluido en los números de arriba.
