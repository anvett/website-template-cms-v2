// Helper de autoría de Section Data — no forma parte del contrato oficial
// de render (ver sectionStyle.js para eso), sino de cómo se ESCRIBEN los
// archivos *.sections.data.js.
//
// Problema que resuelve: históricamente, cada Section Data solo traía
// poblado el background elegido (surface o gradient) y había que agregar
// `media.background` + `meta.overlay`/`overlayOpacity` a mano cada vez que
// se quería pasar esa section a fondo de imagen. Con este helper, TODA
// Section Data trae esos campos ya presentes desde que se crea — cambiar a
// fondo de imagen es solo cambiar `background.type` a "image" y completar
// `media.background.src`.
//
// Uso obligatorio al exportar Section Data (ver
// 05-MANUAL-CREACION-DE-INSTANCIAS-v2.md):
//
//   import { withSectionsDefaults } from "@/lib/sections/sectionDefaults";
//
//   export const homeSectionsData = withSectionsDefaults([
//     { id: "home-hero", ... },
//     { id: "home-about", ... },
//   ]);

const DEFAULT_BACKGROUND_IMAGE = { src: "", alt: "" };
const DEFAULT_OVERLAY_OPACITY = 0.6;

/**
 * Rellena una Section Data individual con los defaults de media/overlay
 * sin pisar ningún valor que ya venga explícito.
 */
export function withSectionDefaults(section) {
  const media = section?.media || {};
  const meta = section?.meta || {};

  return {
    ...section,
    media: {
      ...media,
      background: { ...DEFAULT_BACKGROUND_IMAGE, ...(media.background || {}) },
      foreground: media.foreground ?? null,
    },
    meta: {
      overlay: true,
      overlayOpacity: DEFAULT_OVERLAY_OPACITY,
      ...meta,
    },
  };
}

/**
 * Azúcar sintáctica para aplicar withSectionDefaults a un array completo
 * de Section Data (el caso de uso real: exportar *.sections.data.js).
 */
export function withSectionsDefaults(sections) {
  return (sections || []).map(withSectionDefaults);
}

export default withSectionDefaults;
