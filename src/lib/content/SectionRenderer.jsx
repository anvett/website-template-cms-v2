import { sectionRegistry } from "./section-registry";

/**
 * Despacha cada Section Data (ya resuelta y ordenada — venga de
 * `*.sections.data.js` estático o de `fetchPageData` vía la Render API,
 * cronograma Fase 3) al componente registrado para su `component` en
 * `sectionRegistry`. No existía un despachador genérico en el template
 * base (las páginas hand-authored importaban cada componente directo) —
 * hace falta uno real para que una Page armada dinámicamente desde datos
 * (CMS o no) pueda renderizar una lista arbitraria de Sections sin que
 * cada página tenga que importar y switchear sus componentes a mano.
 *
 * Section sin `component` registrado: se omite (con warning en consola
 * en desarrollo), nunca rompe el render de las demás — mismo criterio de
 * resiliencia que el resto del sistema (una Section con datos
 * incompletos no debe tumbar la página entera).
 */
export function SectionRenderer({ sections = [] }) {
  return sections.map((section) => {
    const Component = sectionRegistry[section.component];

    if (!Component) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[SectionRenderer] No hay componente registrado para component="${section.component}" ` +
            `(section id="${section.id}"). Ver src/lib/content/section-registry.js.`
        );
      }
      return null;
    }

    return <Component key={section.id} data={section} />;
  });
}
