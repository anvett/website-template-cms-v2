import { fetchPageData } from "@/lib/cms";
import { SectionRenderer } from "@/lib/content/SectionRenderer";

/**
 * Ruta del prototipo mínimo end-to-end (cronograma Fase 4): Django Admin
 * -> Render API -> esta página, con UNA Section real (Hero) y sin tocar
 * ningún componente React existente. No es parte del sitio de ninguna
 * instancia — sirve solo para validar el mecanismo antes de escalar
 * (Fase 5). Requiere `CMS_API_URL`/`CMS_SITE_SLUG`/`CMS_API_TOKEN` en
 * `.env.local` (ver `src/lib/cms/README.md`).
 *
 * Funciona con `next dev` sin tocar `next.config.mjs`. Para `next build`
 * hace falta además quitar `output: "export"` (static export no puede
 * prerenderizar una ruta que depende de un fetch server-side en tiempo
 * de request) — no aplica todavía porque esta ruta es de validación
 * local, no de una instancia real desplegada.
 *
 * Borrar esta carpeta antes de entregar cualquier instancia real al
 * cliente — es un banco de pruebas, no una página del sitio.
 */
export default async function CmsPreviewPage() {
  const pageData = await fetchPageData("home");

  return (
    <main>
      <SectionRenderer sections={pageData.sections} />
    </main>
  );
}
