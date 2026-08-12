# Proceso de Deploy y Provisioning por Instancia (Vercel + Render)

Responde a la pregunta operativa de cómo se pone en producción cada instancia de cliente una vez que el CMS + backend (`CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`) esté implementado. Complementa la Fase 8 de ese documento ("Instanciación del sitio del cliente"), que la menciona pero no la detalla.

---

## 1. Qué se provisiona por cliente y qué no (actualizado — backend multi-tenant, 2026-08-07)

**Importante:** este documento se escribió originalmente asumiendo "un Web Service + una base de datos de Render por cliente". Esa decisión se revirtió (`CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 6, `COSTOS-INFRAESTRUCTURA-MENSUAL.md`) por costo: escalaba linealmente y hacía inviable vender el CMS a un precio con margen razonable. El backend ahora es **multi-tenant compartido**. Esto cambia qué se repite por cliente y qué no:

- **Vercel:** sigue siendo **un Project por cliente** (mapeado a su repo Next.js) — esto no cambió. Aislamiento total entre proyectos aunque compartan Team.
- **Render:** ya **no** es un Web Service + una base de datos por cliente. Es **un solo Web Service + una sola base de datos, compartidos por todos los clientes** — cada cliente nuevo es una fila `Site` dentro de esa misma base de datos, no un servicio nuevo. Ver sección 4.

Esto significa que dar de alta un cliente nuevo ya no implica "levantar infraestructura" en Render — implica registrar un `Site` en infraestructura que ya existe. La pregunta original de si hace falta cuenta propia por cliente sigue teniendo la misma respuesta técnica (no hace falta, las plataformas están pensadas para muchos proyectos/servicios bajo una cuenta), pero ahora aplica **solo a Vercel** — para Render, la pregunta ni se plantea, porque el backend es uno solo por diseño.

---

## 2. Política de propiedad de cuenta: aplica solo a Vercel (frontend)

**El backend de Render es siempre centralizado en Anvetcorp, sin excepción** — no puede ser de propiedad del cliente porque el mismo Web Service y la misma base de datos sirven a todos los demás clientes a la vez. Entregarle a un cliente acceso de dueño a esa cuenta implicaría darle acceso potencial a infraestructura de otros clientes. Si algún cliente puntual exige tener su propio backend por contrato/compliance, es un caso excepcional fuera de este proceso (ver `CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 6, "no descartado a futuro").

Lo que sigue siendo una decisión real de negocio, caso por caso, es **quién es dueño de la cuenta de Vercel** (el frontend, que sí sigue siendo un Project independiente por cliente):

- [ ] Agregar esta pregunta al discovery de todo cliente nuevo: **¿quién es dueño del Project de Vercel — Anvetcorp centraliza y factura, o el cliente crea y paga su propia cuenta?**
- [ ] Registrar la respuesta junto con el resto de la información del cliente (igual que el número de WhatsApp, dominio, etc.).
- [ ] Si el cliente no tiene preferencia, aplicar el default recomendado: **centralizado en Anvetcorp** (más simple de operar, más rápido de dar de alta).

### Camino A — Vercel centralizado en Anvetcorp (default)
- El Team de Vercel es de Anvetcorp. Cada cliente nuevo es un Project más adentro.
- Anvetcorp factura el hosting del frontend como parte del servicio (mensual/anual, junto con mantenimiento).
- Ventaja: alta de cliente nuevo en minutos, un solo lugar donde ver costos y logs de todos los clientes.
- Desventaja: si el cliente corta relación, Anvetcorp debe transferir el Project a una cuenta del cliente (sección 5). El acceso al backend (lectura de su API, vía token de su `Site`) se revoca aparte — el cliente nunca fue dueño de esa parte.

### Camino B — Vercel con cuenta propia del cliente
- El cliente crea su propia cuenta de Vercel (Pro, por uso comercial — ver nota de licencia en sección 6). El cliente invita a Anvetcorp como colaborador con permisos de deploy.
- Ventaja: el cliente es dueño de su frontend desde el día 1.
- Desventaja: alta más lenta, Anvetcorp pierde visibilidad centralizada de costos de frontend de ese cliente. El backend sigue siendo de Anvetcorp igual que en Camino A — esto no cambia entre caminos.

---

## 3. Provisioning del frontend (Vercel) — pasos comunes

Aplican igual en Camino A o B, solo cambia **quién** es el dueño del Team/cuenta donde se crea el Project.

- [ ] Confirmar que el repo Next.js de la instancia ya existe (clonado del template, manual 05) y está en el remoto Git correspondiente (GitHub/GitLab bajo la organización de Anvetcorp o del cliente, según lo acordado).
- [ ] Crear el **Project** en Vercel apuntando a ese repo.
- [ ] Configurar variables de entorno del Project: `NEXT_PUBLIC_CMS_API_URL` (misma URL de API para todos los clientes, es el backend compartido), `CMS_API_TOKEN` (server-only, **token propio de este `Site`** — nunca reutilizar el token de otro cliente ni un token "admin" genérico acá), y cualquier otra ya definida en la Fase 3.2 del cronograma general — separadas por entorno (`Production`/`Preview`/`Development`), nunca un solo set compartido.
- [ ] Confirmar el modo de renderizado configurado (ISR con `revalidate`, Fase 3.1 del cronograma general) — Vercel soporta ISR nativamente, no requiere configuración adicional más allá de lo que ya define Next.js.
- [ ] Conectar el dominio del cliente (DNS): apuntar el dominio (o subdominio) del cliente al Project vía registros `CNAME`/`A` según indique Vercel. Si el dominio lo administra el cliente, coordinar el cambio de DNS con tiempo — la propagación puede tardar horas.
- [ ] Verificar certificado SSL automático (Vercel lo emite solo al conectar el dominio — confirmar que quedó activo, no asumir).
- [ ] Confirmar el branch de producción (`main`) y si se quiere Preview Deploys automáticos por PR (recomendado: sí, permite revisar cambios de contenido/código antes de mergear).

**Entregable:** sitio Next.js de la instancia accesible en su dominio final, sirviendo contenido desde la API del backend.

---

## 4. Provisioning del backend (Render) — una sola vez, no por cliente

### 4a. Setup inicial del backend compartido (se hace una sola vez, no se repite)

- [ ] Confirmar que el repo Django **único y compartido** ya existe (Fase 1.1 del cronograma general).
- [ ] Crear el **Web Service** en Render apuntando a ese repo (build command, start command — típicamente `gunicorn` para Django).
- [ ] Crear **una sola PostgreSQL instance** de Render — es la base de datos de todos los clientes, con tenant scoping por `Site` (Fase 1.7 del cronograma general).
- [ ] Configurar variables de entorno del Web Service: `DATABASE_URL` (la provee Render automáticamente al conectar la DB), `SECRET_KEY`, `DEBUG=False` en producción, `ALLOWED_HOSTS`, credenciales de almacenamiento de medios (S3/R2, Fase 6.2 del cronograma general), y credenciales de PayPhone si/cuando se active el módulo ecommerce.
- [ ] CORS: mantener una lista explícita de orígenes permitidos (los dominios Vercel/custom domain de cada cliente activo) — se actualiza en cada alta de cliente (sección 4b), nunca `*` abierto.
- [ ] Ejecutar migraciones en el primer deploy (`python manage.py migrate`) — configurar como *release command* de Render para que corra automáticamente en cada deploy, no a mano.
- [ ] Crear superusuario de Django Admin para Anvetcorp (`createsuperuser`) — es el único que ve todos los `Site`.
- [ ] Configurar backups automáticos de la base de datos (Render los ofrece nativamente en sus planes de PostgreSQL — confirmar que están activos, no asumir el default). Al ser una sola base de datos compartida por todos los clientes, este backup es más crítico que antes — evaluar además un backup adicional periódico a Cloudflare R2 (`COSTOS-INFRAESTRUCTURA-MENSUAL.md` sección 0), independiente del proveedor.
- [ ] Confirmar el plan de Render elegido: no dejar el Web Service en el tier gratuito (duerme por inactividad, lo cual rompe el sitio de **todos** los clientes a la vez, no solo de uno).

**Entregable:** backend compartido operativo, con base de datos persistente, backups activos y Django Admin operativo — listo para recibir clientes.

### 4b. Alta de cliente nuevo en el backend compartido (repetible, corto)

Esto reemplaza lo que antes era "crear un Web Service y una DB nuevos" — ahora es solo trabajar sobre infraestructura que ya existe:

- [ ] Crear la fila `Site` del cliente (Django Admin o management command), con su `slug` único.
- [ ] Generar el token de API de lectura scoped a ese `Site` (para la variable `CMS_API_TOKEN` del Project de Vercel del cliente, sección 3).
- [ ] Agregar el dominio del Project de Vercel de este cliente a la lista de orígenes CORS permitidos (4a).
- [ ] Configurar `Site.analytics.gtmContainerId` (contenedor de Google Tag Manager de este cliente, Fase 1.2 del cronograma general) — es base en todos los planes, no add-on, resolución 2026-08-07.
- [ ] Crear el usuario `client_editor` correspondiente al cliente, scoped exclusivamente a su `Site` (Fase 6.3 del cronograma general) — puede crearse ahora o el día 110, según el modelo comercial (`CMS-BACKEND-ECOMMERCE-ROADMAP.md` sección 1).
- [ ] **Publicar la política de privacidad real de este cliente** (nunca copiada/plantilla de otro sitio — infracción común señalada por la SPDP) y confirmar que el banner de consentimiento de cookies está activo y bloquea el contenedor de GTM hasta la aceptación explícita del visitante (paquete base LOPDP, Fase 6.6 del cronograma general, resolución 2026-08-07 en `decision-log.md`). Esto es un ítem de provisioning obligatorio para todo `Site` que capture datos de visitante/comprador, no un extra opcional — y no reemplaza revisión legal profesional.
- [ ] Verificar (no asumir) que el nuevo `Site` no puede leer ni escribir datos de ningún otro `Site` — repetir el test de aislamiento de la Fase 1.7 del cronograma general con datos reales de este cliente.

**Entregable:** cliente nuevo operativo sobre el backend existente, sin haber tocado infraestructura de Render — esto es lo que hace que dar de alta un cliente tome minutos, no el proceso de un deploy nuevo.

---

## 5. Handoff / fin de relación con un cliente

- [ ] **Vercel** (Camino A → cliente pide pasar a Camino B, o corta relación): transferir el Project a la cuenta/Team del cliente (Vercel soporta transferencia de Project entre cuentas sin perder historial de deploys ni dominio).
- [ ] **Backend (Render) — exportación de datos (resuelto 2026-08-11, ver `decision-log.md`):** antes de desactivar el `Site`, generar el bundle de exportación vía `GET /api/v1/sites/{site}/export/` (rol `admin_anvetcorp`, endpoint definido en Fase 2.9 del cronograma general) y entregárselo al cliente. El bundle incluye JSON estructurado (Pages/Sections/NavigationConfig, y Collections/Products/Variants/Images/Promotions si tiene ecommerce) + un ZIP con las imágenes reales bajadas de R2 — nunca solo URLs, porque dejan de servir una vez purgado el `Site`. **No incluye por default** `Inquiry`/`Order` (datos personales de los compradores del cliente, no del cliente) — se agregan solo si el cliente los pide explícitamente y asume la responsabilidad de esos datos al recibirlos.
- [ ] Revocar el token de API de su `Site` y sacar su dominio de la lista de orígenes CORS.
- [ ] Desactivar el `Site` (`active = False`) — **no purgar de inmediato**: conservar los datos 30-90 días antes de eliminación definitiva, para dar margen a un pedido de export tardío y ser consistente con el derecho de supresión LOPDP (ítem #25 resuelto). Pasado ese plazo, purgar sus datos de contenido y, si se incluyeron con consentimiento del cliente, sus `Inquiry`/`Order`.
- [ ] No hay transferencia del backend en sí — el backend nunca fue del cliente, es infraestructura compartida (sección 1).
- [ ] Actualizar DNS si cambia algo del lado del dominio (Vercel).
- [ ] Revocar accesos de Anvetcorp al Project de Vercel que ya no correspondan (si el cliente pidió terminar la relación) o dejarlos como colaborador (si sigue habiendo mantenimiento).

---

## 6. Notas y riesgos a no perder de vista

- **Licencia de uso comercial en Vercel:** el plan Hobby (gratuito) de Vercel está pensado para proyectos personales/no comerciales según sus términos — para sitios de clientes reales (comerciales), corresponde plan **Pro** (ya sea del Team de Anvetcorp en Camino A, o del cliente en Camino B). No usar Hobby como atajo de costos en producción.
- **Tensión con la compatibilidad oficial "Vercel + static export + cPanel" (manual 01, sección 11):** el manual maestro del sistema declara compatibilidad dual obligatoria con Vercel, static export y cPanel. Esa garantía valía para el template 100% estático (Data en archivos `.js`). Una vez que una instancia consume contenido dinámico desde el backend vía API (CMS activo), **static export puro deja de reflejar cambios de contenido sin un rebuild** — cPanel ya no sirve una experiencia "CMS en vivo" salvo que se agregue un mecanismo de rebuild-on-change (ej. webhook desde el backend que dispara un `next build && export` y sube el resultado por FTP/SSH a cPanel cada vez que el cliente edita contenido). Esto es una **decisión pendiente, no resuelta por este documento**: definir si (a) las instancias con CMS activo quedan exclusivamente en Vercel/Node hosting, o (b) se construye el mecanismo de rebuild-on-change para mantener cPanel como alternativa real. Anotarlo en `CMS-BACKEND-ECOMMERCE-ROADMAP.md` cuando se cierre.
- **El backend SÍ mezcla instancias, a propósito:** a diferencia de Vercel (un Project por cliente, aislado), el backend de Render es deliberadamente compartido entre todos los clientes — es lo que mantiene el costo bajo (ver `COSTOS-INFRAESTRUCTURA-MENSUAL.md`). La contrapartida es que la disciplina de tenant scoping (Fase 1.7 del cronograma general) no es opcional: un error ahí no es un bug aislado, es un cliente viendo datos de otro.
- **Costo del backend compartido crece con el uso agregado, no con la cantidad de clientes:** a medida que crecen los clientes en la plataforma, lo que hay que vigilar es el tier del Web Service y de la base de datos de Render (tráfico y carga total, no una cuenta por cliente) — subir de tier cuando las métricas lo pidan, no antes ni después.
- **Costo del Project de Vercel sí crece con la cantidad de clientes (moderadamente):** cada Project nuevo se suma al Team, y el uso (edge requests, data transfer) se agrupa entre todos — igual, para sitios de tráfico bajo-medio, el crédito incluido del plan Pro suele alcanzar para varios clientes.
