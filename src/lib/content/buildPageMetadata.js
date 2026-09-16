/**
 * Arma el objeto `metadata` de Next.js a partir del `seo`/`openGraph` de
 * una Page (contrato oficial CLAUDE.md: `id, slug, enabled, seo,
 * openGraph, sections, meta` — Pages son responsables de SEO/openGraph,
 * nunca las Sections). Reutilizado por cada ruta de página en vez de
 * repetir el mismo mapeo `seo.defaultTitle -> title` once per route.
 *
 * El `title` que devuelve reemplaza el `title.template` del layout raíz
 * (comportamiento estándar de Next.js cuando un segmento hijo define un
 * `title` string en vez de heredar el default) — por eso cada
 * `seo.defaultTitle` en `seed_eurocentro.py` ya viene con el sufijo
 * "— Eurocentro" incluido, no hace falta volver a concatenarlo acá.
 */
export function buildPageMetadata(pageData) {
  const seo = pageData?.seo || {};
  const openGraph = pageData?.openGraph || {};

  return {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    keywords: seo.defaultKeywords,
    robots: seo.robots,
    openGraph: {
      title: openGraph.title || seo.defaultTitle,
      description: openGraph.description || seo.defaultDescription,
      // `type`/`images` NUNCA como `undefined` explícito: Next.js valida
      // `openGraph.type` contra una lista cerrada de literales y trata la
      // clave presente-pero-undefined distinto de la clave ausente (pisa
      // el valor heredado del layout raíz con `undefined` en vez de
      // heredarlo) — de ahí el runtime error "Invalid OpenGraph type:
      // undefined" cuando una Page no trae su propio `openGraph.type`
      // (caso normal: `seed_eurocentro.py` solo puebla `open_graph` a
      // nivel Site, no por Page). Default seguro en vez de indefinido.
      type: openGraph.type || "website",
      images: openGraph.images?.length ? openGraph.images : [],
    },
  };
}
