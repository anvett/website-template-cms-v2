// Helpers compartidos para que las Variants interpreten el contrato oficial
// de Section Data: background, surface, containerWidth, spacing y el
// overlay estandarizado (meta.overlay / meta.overlayOpacity).
//
// Referencia: docs/v2/03-MANUAL-MAESTRO-SECTIONS_v_2.md
//
// Uso típico dentro de una Variant:
//
//   import {
//     getSurfaceClass,
//     getSpacingClass,
//     getContainerClass,
//     resolveBackground,
//   } from "@/lib/sections/sectionStyle";
//
//   const bg = resolveBackground(data);
//   <section className={[
//     "section-shell",
//     getSpacingClass(data.spacing),
//     bg.hasImage ? "" : bg.surfaceClass,
//   ].join(" ")}>
//     {bg.hasImage && <Image src={bg.image.src} .../>}
//     {bg.hasImage && bg.overlay.enabled && <div style={{opacity: bg.overlay.opacity}} />}
//     <div className={["section-container", getContainerClass(data.containerWidth)].join(" ")}>

export const surfaceClasses = {
  base: "surface-base",
  subtle: "surface-subtle",
  strong: "surface-strong",
};

export const spacingClasses = {
  compact: "section-shell--compact",
  default: "",
  hero: "section-shell--hero",
};

export const containerClasses = {
  content: "section-container--content",
  section: "",
  wide: "section-container--wide",
};

export function getSurfaceClass(surface, fallback = "surface-base") {
  return surfaceClasses[surface] || fallback;
}

export function getSpacingClass(spacing) {
  return spacingClasses[spacing] ?? "";
}

export function getContainerClass(containerWidth) {
  return containerClasses[containerWidth] ?? "";
}

/**
 * Resuelve el bloque `background` + `media.background` + `meta.overlay`
 * de una Section Data en un objeto listo para usar en el render.
 *
 * - background.type === "image"  -> usa media.background.src como imagen,
 *   overlay controlado por meta.overlay / meta.overlayOpacity.
 * - background.type === "gradient" + variant "dark"|"soft" -> clase de
 *   gradiente global (gradient-dark / gradient-soft).
 * - en cualquier otro caso ("surface" o sin definir) -> surface-base /
 *   surface-subtle / surface-strong según `surface`.
 */
export function resolveBackground(data, { defaultSurfaceFallback = "surface-base", defaultOverlayOpacity = 0.55 } = {}) {
  const background = data?.background || {};
  const media = data?.media?.background || null;

  const imageSrc = media?.src || background.src || null;
  const imageAlt = media?.alt || background.alt || "";
  const hasImage = background.type === "image" && Boolean(imageSrc);

  const overlayEnabled = data?.meta?.overlay ?? media?.overlay ?? true;
  const overlayOpacity = data?.meta?.overlayOpacity ?? defaultOverlayOpacity;

  let surfaceClass = "";
  if (!hasImage) {
    if (background.type === "gradient" && background.variant === "dark") {
      surfaceClass = "gradient-dark";
    } else if (background.type === "gradient" && background.variant === "soft") {
      surfaceClass = "gradient-soft";
    } else {
      surfaceClass = getSurfaceClass(data?.surface, defaultSurfaceFallback);
    }
  }

  return {
    hasImage,
    image: { src: imageSrc, alt: imageAlt },
    surfaceClass,
    overlay: {
      enabled: hasImage && overlayEnabled,
      opacity: overlayOpacity,
    },
  };
}
