# `src/lib/cms/`

Capa de fetch contra la Render API del backend (cronograma
`CMS-BACKEND-CRONOGRAMA-IMPLEMENTACION.md`, Fase 3). Reemplazo, para
**instancias con CMS activo**, de los imports estáticos de
`src/data/global/*.data.js` y `src/data/pages/*.page.data.js` +
`src/data/sections/*.sections.data.js`.

## Cuándo usar esto (3.4 — convivencia con Data estático)

**Corte total por instancia, nunca mezclado dentro del mismo sitio**
(decisión ya tomada en el cronograma 3.4, confirmada en
`docs/decisions/decision-log.md` — "Static export + cPanel vs. Vercel
dinámico + ISR"):

- Instancia **sin CMS** (la mayoría — informativa, `output: "export"` en
  `next.config.mjs`, hosteada en cPanel o Vercel estático): sigue usando
  los imports estáticos de `src/data/`, como siempre. **No tocar nada de
  esta carpeta.**
- Instancia **con CMS activo** (Vercel, modo dinámico, sin `output:
  "export"`): reemplaza esos imports por las funciones de acá
  (`fetchSiteData`, `fetchNavigationData`, `fetchPageData`,
  `fetchPageMap`). Un componente/página nunca debe mezclar ambas fuentes
  — o todo el sitio viene de archivos, o todo viene de la API.

Los componentes de Página/Section no cambian en ningún caso — reciben
exactamente el mismo shape de objeto sea cual sea el origen del dato.

## Variables de entorno (3.2)

Ver `.env.example` en la raíz del repo. Tres variables (`CMS_API_URL` no
está en el cronograma original, pero hace falta — ver `env.js`):

- `CMS_API_URL` — URL base del backend Django (ej.
  `https://cms-api.anvetcorp.com`). Server-side; también se acepta
  `NEXT_PUBLIC_CMS_API_URL` como alias si se prefiere ese nombre.
- `CMS_SITE_SLUG` — el slug de ESTA instancia en el backend multi-tenant
  (ej. `kautela`). Server-side, no secreto, pero tampoco necesita
  exponerse al navegador (todo el fetch ocurre en Server Components).
- `CMS_API_TOKEN` — el `SiteReadToken` de este Site (se genera desde
  Django Admin, inline dentro del `Site`). **Nunca con prefijo
  `NEXT_PUBLIC_`** — es un secreto real, aunque de solo lectura.

## Manejo de fallas (3.3)

Ver el docstring de `client.js`. Resumen: en producción, ISR (`next:
{revalidate}`) ya sirve el último HTML bueno si una revalidación falla —
comportamiento nativo de Next.js. En frío (primer build, o `next dev` sin
nada cacheado todavía), `cmsFetch` lanza `CmsApiError` en vez de devolver
un valor vacío/silencioso — un build roto y visible es preferible a una
página vacía publicada sin que nadie lo note.

## Uso típico

```js
// src/app/layout.js (instancia con CMS activo)
import { fetchSiteData, fetchNavigationData } from "@/lib/cms";

export async function generateMetadata() {
  const siteData = await fetchSiteData();
  return { title: siteData.seo.defaultTitle, /* ... */ };
}

export default async function RootLayout({ children }) {
  const [siteData, navigationData] = await Promise.all([
    fetchSiteData(),
    fetchNavigationData(),
  ]);
  // ... igual que hoy, pero con datos que vienen de la API.
}
```

```js
// src/app/[slug]/page.js, o una ruta puntual por página
import { fetchPageData } from "@/lib/cms";
import { mapPageSections } from "@/lib/content/map-page-sections";

export default async function Page() {
  const pageData = await fetchPageData("home");
  const sections = mapPageSections(pageData.sections);
  // ... render igual que con *.sections.data.js estático.
}
```
