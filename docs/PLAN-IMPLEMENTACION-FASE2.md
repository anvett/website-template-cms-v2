# Plan de Implementación — Fase 2 Kautela V3

Estado: **Pendiente de implementación en Claude Code**
Logos ya copiados a: `public/assets/images/partners/`

---

## Reglas obligatorias antes de implementar

### 1. Usar UI Base components
Todos los componentes nuevos (ServicesDetailCards, PartnersLogoGrid, TeamMemberGrid) deben construirse **exclusivamente con los componentes de UI Base existentes**. No crear elementos visuales desde cero si ya existe un componente base equivalente.

UI Base disponibles en `src/components/ui/`:
- `content/Heading` — todos los títulos
- `content/Text` — párrafos y descripciones
- `content/Card` — cards con surface, padding, radius, shadow configurables
- `content/SectionHeader` — eyebrow + title + description centrado/alineado
- `content/Button` — todos los CTAs y botones
- `content/MediaFrame` — imágenes con ratio, fit, radius, objectPosition
- `content/InfoItem` — items con icono + título + descripción
- `content/StatItem` — stats con valor + label
- `actions/Button` — botones de acción

Flujo obligatorio antes de crear cualquier elemento visual:
1. Revisar si existe un UI Base que lo resuelva
2. Si existe → reutilizar
3. Si no existe → crear en `src/components/ui/` antes de usarlo en la variant

### 2. Usar la skill frontend-design
Antes de implementar el diseño visual de cada variante nueva, invocar `/frontend-design` para asegurar que las decisiones estéticas sean coherentes, elegantes y no se vean como defaults genéricos del template.

Esto aplica especialmente a:
- `ServicesDetailCards` — layout de cards con bullets y CTA
- `PartnersLogoGrid` — presentación de logos de aseguradoras
- `TeamMemberGrid` — cards de equipo con foto, nombre, cargo, contacto

### 3. Respetar arquitectura Template CMS V2
- Leer `CLAUDE.md` antes de cualquier cambio
- Leer el manual correspondiente en `/docs/architecture/` según la capa afectada
- Nunca hardcodear contenido en variantes
- Nunca mezclar DATA y UI
- Paleta de colores: usar siempre variables CSS de `globals.css` (--color-primary, --color-accent, etc.)

---

## TAREA 1 — Nueva variante ServicesDetailCards

### Objetivo
Crear una nueva variante para ServicesSection que muestre cada producto como una card con nombre, lista de detalles (bullets) y botón "Contratar".

### Archivo a crear
`src/components/sections/services/variants/services-detail-cards/ServicesDetailCards.jsx`

### Comportamiento del botón "Contratar"
- Si el item tiene `href` definido → enlaza a esa URL (page propia del ramo)
- Si el item NO tiene `href` → enlaza a WhatsApp usando `meta.whatsappNumber` del data

### Estructura del item en data
```js
{
  title: "Nombre del seguro",
  details: [
    "Detalle 1",
    "Detalle 2",
    "Detalle 3",
  ],
  href: "/services/vehicular", // solo si tiene page propia, omitir si va a WhatsApp
}
```

### Registro
- Agregar case `"services-detail-cards"` en `ServiceSection.jsx` (el dispatcher)
- Exportar desde `src/components/sections/services/index.js`

### Actualizar services.sections.data.js
Cambiar el bloque `services-grid` a variant `"services-detail-cards"` con los 30 productos:

**Con href (page propia):**
1. Seguro de Vehículos → href: "/services/vehicular"
2. Seguro de Vida Individual y Colectiva → href: "/services/vida"
3. Seguro de Asistencia Médica → href: "/services/salud"
4. Seguro Multiriesgo Hogar → href: "/services/hogar"
5. Seguro de Viajes → href: "/services/viajes"
6. Seguro Empresarial → href: "/services/empresarial"

**Sin href (WhatsApp):**
7. Seguro de Equipo y Maquinaria
8. Seguros de Accidentes Personales
9. Seguro Bancos e Instituciones Financieras (BBB)
10. Seguro Multiriesgo Industrial
11. Seguro Multiriesgo Comercial
12. Seguro de Incendio y Líneas Aliadas
13. Seguro de Lucro Cesante a consecuencia de incendio y líneas aliadas
14. Seguro Equipo Electrónico
15. Seguro de Transporte
16. Seguro de Aviación
17. Seguro de Robo
18. Seguro de Fidelidad
19. Seguro Dinero y Valores
20. Seguro de Responsabilidad Civil
21. Seguro Rotura de Maquinaria
22. Pérdida de Beneficios por Rotura de Maquinaria
23. Seguro Marítimo
24. Seguro Agropecuario
25. Seguro de Crédito
26. Seguro de Riesgos Especiales
27. Seguro Todo Riesgo Para Contratista
28. Seguro Montaje de Maquinaria
29. Seguro Obras Civiles Terminadas
30. Seguro Todo Riesgo Petrolero

**Nota:** El número de WhatsApp va en `meta.whatsappNumber` del bloque de data.
WhatsApp Kautela: `+593992559126`
Link generado: `https://wa.me/593992559126?text=Hola%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20este%20seguro.`

---

## TAREA 2 — Nueva PartnersSection (slide de logos)

### Objetivo
Mostrar los logos de las 9 aseguradoras con las que trabaja Kautela en el home.

### Archivos a crear
```
src/components/sections/partners/
  PartnersSection.jsx       ← dispatcher
  index.js                  ← barrel: export { PartnersSection }
  variants/
    logo-grid/
      PartnersLogoGrid.jsx  ← variante visual
```

### Variante: logo-grid
Grid responsivo de logos centrados, fondo neutro, sin texto por item.
Layout sugerido: fila scrollable en mobile, grid 3-4 columnas en desktop.

### Logos disponibles (ya en public/)
```
/assets/images/partners/bmi.png
/assets/images/partners/sweaden.png
/assets/images/partners/aseguradora-del-sur.png
/assets/images/partners/seguros-alianza.png
/assets/images/partners/humana.png
/assets/images/partners/confiamed.png
/assets/images/partners/interoceanica.png
/assets/images/partners/zurich.png
/assets/images/partners/bupa.png
```

### Bloque en home.sections.data.js
Insertar entre `home-stats` y `home-cta`:
```js
{
  id: "home-partners",
  enabled: true,
  component: "Partners",
  variant: "logo-grid",
  surface: "base",
  containerWidth: "wide",
  spacing: "compact",
  content: {
    eyebrow: "Nuestras alianzas",
    title: "Trabajamos con las principales aseguradoras del país",
  },
  media: { background: null, foreground: null },
  items: [
    { name: "BMI Igualas Médicas", logo: { src: "/assets/images/partners/bmi.png", alt: "BMI Igualas Médicas" } },
    { name: "Sweaden", logo: { src: "/assets/images/partners/sweaden.png", alt: "Sweaden Compañía de Seguros" } },
    { name: "Aseguradora del Sur", logo: { src: "/assets/images/partners/aseguradora-del-sur.png", alt: "Aseguradora del Sur" } },
    { name: "Seguros Alianza", logo: { src: "/assets/images/partners/seguros-alianza.png", alt: "Seguros Alianza" } },
    { name: "Humana", logo: { src: "/assets/images/partners/humana.png", alt: "Humana" } },
    { name: "Confiamed", logo: { src: "/assets/images/partners/confiamed.png", alt: "Confiamed" } },
    { name: "Interoceanica", logo: { src: "/assets/images/partners/interoceanica.png", alt: "Interoceanica Compañía Anónima de Seguros" } },
    { name: "Zurich", logo: { src: "/assets/images/partners/zurich.png", alt: "Zurich Seguros" } },
    { name: "Bupa Seguros", logo: { src: "/assets/images/partners/bupa.png", alt: "Bupa Seguros" } },
  ],
  actions: [],
  meta: { overlay: false, overlayOpacity: 0.5 },
}
```

### Registro en home/page.js
Agregar import y case "Partners".

---

## TAREA 3 — Nueva TeamSection (equipo en about-us)

### Objetivo
Mostrar el equipo de trabajo de Kautela en la page about-us.

### Archivos a crear
```
src/components/sections/team/
  TeamSection.jsx       ← dispatcher
  index.js              ← barrel: export { TeamSection }
  variants/
    member-grid/
      TeamMemberGrid.jsx ← variante visual
```

### Variante: member-grid
Cards con: foto, nombre con título académico, cargo, celular, email.
Layout: grid 3 columnas en desktop, 1 en mobile.

### Datos del equipo (para about-us.sections.data.js)
Insertar antes del bloque `about-cta`:
```js
{
  id: "about-team",
  enabled: true,
  component: "Team",
  variant: "member-grid",
  surface: "base",
  containerWidth: "section",
  spacing: "default",
  content: {
    eyebrow: "Nuestro equipo",
    title: "Las personas detrás de cada asesoría",
    description: "Un equipo comprometido con la protección y bienestar de cada cliente.",
  },
  media: { background: null, foreground: null },
  items: [
    {
      name: "CPA. Paulina Figueroa",
      role: "CEO & Gerente General",
      phone: "0992559126",
      email: "gerencia@kautelaseguro.com",
      image: {
        src: "/assets/images/team/paulina-figueroa.jpg",
        alt: "CPA. Paulina Figueroa — CEO & Gerente General de Kautela",
      },
    },
    {
      name: "ABG. Samantha Gaona",
      role: "Asesor de Seguros",
      phone: "0978717176",
      email: "asesor@kautelaseguro.com",
      image: {
        src: "/assets/images/team/samantha-gaona.jpg",
        alt: "ABG. Samantha Gaona — Asesor de Seguros en Kautela",
      },
    },
    {
      name: "TGL. Fabricio Yépez",
      role: "Gerente de Siniestros",
      phone: "0992753560",
      email: "gerencia@kautelaseguro.com",
      image: {
        src: "/assets/images/team/fabricio-yepez.jpg",
        alt: "TGL. Fabricio Yépez — Gerente de Siniestros en Kautela",
      },
    },
  ],
  actions: [],
  meta: { overlay: false, overlayOpacity: 0.5 },
}
```

### Registro en about-us/page.js
Agregar import y case "Team".

### Nota sobre imágenes
Las fotos del equipo deben guardarse en `public/assets/images/team/`. El usuario las proveerá.
Usar imagen placeholder hasta que estén disponibles.

---

## TAREA 4 — Restructura de pages de ramos

### Mapa de cambios

| Acción | Slug actual | Slug nuevo |
|--------|-------------|-----------|
| Conservar | `vehicular` | `vehicular` |
| Eliminar + dividir | `vida-y-salud` | `vida` + `salud` (2 nuevas) |
| Renombrar carpeta | `empresarial-y-consorcio` | `empresarial` |
| Renombrar carpeta | `vivienda-hogar-familia` | `hogar` |
| Eliminar | `ahorro-acumulativo` | — |
| Eliminar | `transporte` | — |
| Eliminar | `desgravamen` | — |
| Crear nueva | — | `viajes` |

### Pasos detallados

1. **Renombrar carpetas** en `src/app/services/`:
   - `empresarial-y-consorcio/` → `empresarial/`
   - `vivienda-hogar-familia/` → `hogar/`

2. **Eliminar carpetas**:
   - `ahorro-acumulativo/`
   - `transporte/`
   - `desgravamen/`
   - `vida-y-salud/`

3. **Crear nuevas pages**:
   - `src/app/services/vida/page.js`
   - `src/app/services/salud/page.js`
   - `src/app/services/viajes/page.js`

4. **Crear nuevos data files**:
   - `src/data/sections/vida.sections.data.js`
   - `src/data/sections/salud.sections.data.js`
   - `src/data/sections/viajes.sections.data.js`
   - Actualizar: `empresarial.sections.data.js` (renombrar archivo)
   - Actualizar: `hogar.sections.data.js` (renombrar archivo)

5. **Actualizar links internos** en todos los data files que referencien las URLs antiguas:
   - `home.sections.data.js`
   - `services.sections.data.js`
   - Cualquier otro que tenga href a los slugs eliminados

6. **Actualizar page.data.js** de las pages renombradas con su nuevo slug.

### Contenido de nuevas pages (vida, salud, viajes)
Derivar estructura de una page de ramo existente (ej. vehicular).
Cada una necesita: hero interno, about con descripción, features/coberturas, CTA.

---

## Orden de ejecución recomendado

1. Tarea 1 → ServicesDetailCards (JSX + data)
2. Tarea 4 → Restructura de ramos (antes de que los hrefs del data apunten a URLs inexistentes)
3. Tarea 2 → PartnersSection (JSX + data home)
4. Tarea 3 → TeamSection (JSX + data about-us)

---

## Archivos de imagen — TODOS LISTOS ✓

```
public/assets/images/team/paulina-figueroa.jpg   ✓
public/assets/images/team/samantha-gaona.jpg      ✓
public/assets/images/team/fabricio-yepez.jpg      ✓
public/assets/images/partners/bmi.png             ✓
public/assets/images/partners/sweaden.png         ✓
public/assets/images/partners/aseguradora-del-sur.png ✓
public/assets/images/partners/seguros-alianza.png ✓
public/assets/images/partners/humana.png          ✓
public/assets/images/partners/confiamed.png       ✓
public/assets/images/partners/interoceanica.png   ✓
public/assets/images/partners/zurich.png          ✓
public/assets/images/partners/bupa.png            ✓
```

WhatsApp Kautela: `+593992559126`
Link WhatsApp para botón "Contratar": `https://wa.me/593992559126?text=Hola%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20este%20seguro.`
