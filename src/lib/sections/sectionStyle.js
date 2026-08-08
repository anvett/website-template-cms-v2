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

/**
 * Resuelve el `tone` de texto (título/descripción/eyebrow) de una Section.
 *
 * Por qué existe: antes, cada Variant decidía el tono de texto puramente
 * a partir del fondo (imagen/oscuro -> inverse, claro -> default), sin
 * forma de que una instancia puntual de Section pidiera un color distinto
 * sin tocar el componente (lo que afectaba a TODAS las sections que usan
 * ese mismo Variant en el sitio). `meta.tone` es un campo oficial y
 * opcional del contrato de Section Data (ver
 * 03-MANUAL-MAESTRO-SECTIONS_v_2.md): si está presente, manda sobre la
 * inferencia automática; si no está, se sigue infiriendo del fondo como
 * antes.
 *
 * Valores válidos de `meta.tone`: cualquier tone soportado por
 * Heading/Text ("default", "inverse", "muted", "accent", "primary",
 * "secondary", "brandPrimary", "brandSecondary", "brandAccent", "danger").
 * SectionHeader además acepta "default"/"inverse" como atajos que fijan
 * un color distinto para título vs. descripción; cualquier otro valor se
 * aplica igual a ambos salvo que la Variant pase `titleTone`/
 * `descriptionTone` explícitos.
 *
 * Uso típico dentro de una Variant:
 *
 *   const bg = resolveBackground(data);
 *   const tone = resolveTone(data, bg);
 *   <SectionHeader tone={tone} ... />
 */
export function resolveTone(data, bg) {
  return data?.meta?.tone || (bg?.hasImage ? "inverse" : "default");
}

// Clases de color de texto por tone, para Variants que NO usan los
// componentes Heading/Text (arman su propio <h2>/<p> con clases Tailwind
// puntuales, por tamaño/tracking a medida). Mismo vocabulario que
// Heading/Text para que `meta.tone` se comporte igual en todas partes.
const toneTextClasses = {
  default: {
    eyebrow: "text-[var(--color-accent)]",
    title: "text-[var(--color-primary)]",
    description: "text-[var(--color-text-soft)]",
  },
  inverse: {
    eyebrow: "text-[var(--color-accent)]",
    title: "text-[var(--color-text-inverse)]",
    description: "text-white/80",
  },
  muted: {
    eyebrow: "text-[var(--color-text-soft)]",
    title: "text-[var(--color-text-soft)]",
    description: "text-[var(--color-text-soft)]",
  },
  accent: {
    eyebrow: "text-[var(--color-accent)]",
    title: "text-[var(--color-accent)]",
    description: "text-[var(--color-accent)]",
  },
  primary: {
    eyebrow: "text-[var(--color-primary)]",
    title: "text-[var(--color-primary)]",
    description: "text-[var(--color-primary)]",
  },
  secondary: {
    eyebrow: "text-[var(--color-secondary)]",
    title: "text-[var(--color-secondary)]",
    description: "text-[var(--color-secondary)]",
  },
  brandPrimary: {
    eyebrow: "text-[var(--color-primary)]",
    title: "text-[var(--color-primary)]",
    description: "text-[var(--color-primary)]",
  },
  brandSecondary: {
    eyebrow: "text-[var(--color-secondary)]",
    title: "text-[var(--color-secondary)]",
    description: "text-[var(--color-secondary)]",
  },
  brandAccent: {
    eyebrow: "text-[var(--color-accent)]",
    title: "text-[var(--color-accent)]",
    description: "text-[var(--color-accent)]",
  },
  danger: {
    eyebrow: "text-[var(--color-danger)]",
    title: "text-[var(--color-danger)]",
    description: "text-[var(--color-danger)]",
  },
};

/**
 * Igual que resolveTone, pero devuelve directamente la clase Tailwind de
 * color para pegar en className, para Variants que arman su propio
 * <h2>/<p> a medida en vez de usar Heading/Text/SectionHeader.
 *
 *   const tone = resolveTone(data, bg);
 *   <h2 className={["text-[clamp(2rem,5vw,3.4rem)] font-bold", getToneTextClass(tone, "title")].join(" ")}>
 */
export function getToneTextClass(tone, role = "title") {
  const entry = toneTextClasses[tone] || toneTextClasses.default;
  return entry[role] || entry.title;
}

// Mismo mapeo que arriba, pero como valor crudo de color (para Variants
// que usan las clases globales .section-title/.section-description/
// .section-eyebrow de globals.css vía inline style, ej.
// style={{ "--section-title-color": getToneCssColor(tone, "title") }}).
const toneCssColors = {
  default: {
    eyebrow: "var(--color-accent)",
    title: "var(--color-primary)",
    description: "var(--color-text-soft)",
  },
  inverse: {
    eyebrow: "var(--color-accent)",
    title: "var(--color-text-inverse)",
    description: "rgba(255,255,255,0.86)",
  },
  muted: {
    eyebrow: "var(--color-text-soft)",
    title: "var(--color-text-soft)",
    description: "var(--color-text-soft)",
  },
  accent: {
    eyebrow: "var(--color-accent)",
    title: "var(--color-accent)",
    description: "var(--color-accent)",
  },
  primary: {
    eyebrow: "var(--color-primary)",
    title: "var(--color-primary)",
    description: "var(--color-primary)",
  },
  secondary: {
    eyebrow: "var(--color-secondary)",
    title: "var(--color-secondary)",
    description: "var(--color-secondary)",
  },
  brandPrimary: {
    eyebrow: "var(--color-primary)",
    title: "var(--color-primary)",
    description: "var(--color-primary)",
  },
  brandSecondary: {
    eyebrow: "var(--color-secondary)",
    title: "var(--color-secondary)",
    description: "var(--color-secondary)",
  },
  brandAccent: {
    eyebrow: "var(--color-accent)",
    title: "var(--color-accent)",
    description: "var(--color-accent)",
  },
  danger: {
    eyebrow: "var(--color-danger)",
    title: "var(--color-danger)",
    description: "var(--color-danger)",
  },
};

export function getToneCssColor(tone, role = "title") {
  const entry = toneCssColors[tone] || toneCssColors.default;
  return entry[role] || entry.title;
}

/**
 * Resuelve `meta.typography` (tamaño de texto independiente por instancia).
 *
 * Por qué existe: igual razón que `meta.tone`, pero para tamaño en vez de
 * color. Es un campo oficial y opcional del contrato de Section Data (ver
 * 03-MANUAL-MAESTRO-SECTIONS_v_2.md). Si no está definido, cada Variant
 * conserva su tamaño actual (cero cambios visuales por default). Si está
 * definido, sobreescribe usando la escala tipográfica global de
 * globals.css (.text-h1...text-body-sm), nunca un valor arbitrario suelto.
 *
 * meta: {
 *   typography: {
 *     titleSize: "sm" | "md" | "lg" | "xl",
 *     descriptionSize: "sm" | "md" | "lg",
 *   }
 * }
 */
export function resolveTypography(data) {
  const typography = data?.meta?.typography || {};
  return {
    titleSize: typography.titleSize || null,
    descriptionSize: typography.descriptionSize || null,
  };
}

// Cada clase global ya empaqueta font-size + line-height + font-weight +
// letter-spacing (ver globals.css). Por eso el override reemplaza el
// bloque tipográfico completo de la Variant (no solo el font-size), para
// no dejar mezclado un leading/tracking/weight viejo con un tamaño nuevo.
const titleSizeClasses = {
  sm: "text-h3",
  md: "text-h2",
  lg: "text-h1",
  xl: "text-display",
};

/**
 * Devuelve la clase de tamaño de TÍTULO si `meta.typography.titleSize` está
 * definido, o `null` si la Variant debe conservar su tamaño por defecto.
 *
 *   const { titleSize } = resolveTypography(data);
 *   const titleSizeClass = getTitleSizeClass(titleSize);
 *   <h2 className={[titleSizeClass || "text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.04em]", toneClass].join(" ")}>
 */
export function getTitleSizeClass(size) {
  return titleSizeClasses[size] || null;
}

const descriptionSizeClasses = {
  sm: "text-body-sm",
  md: "text-body",
  lg: "text-body-lg",
};

/**
 * Igual que getTitleSizeClass, para la descripción de la Section.
 */
export function getDescriptionSizeClass(size) {
  return descriptionSizeClasses[size] || null;
}

// Para Variants que usan SectionHeader/Heading/Text directamente (no arman
// su propio <h2>/<p>): esos componentes ya reciben `level`/`size` como
// prop, así que basta con traducir el vocabulario de meta.typography al
// vocabulario propio de Heading (level) y Text (size).
const titleSizeToHeadingLevel = {
  sm: "h3",
  md: "h2",
  lg: "h1",
  xl: "display",
};

/**
 * Traduce `meta.typography.titleSize` al `level` de Heading/SectionHeader
 * (`titleLevel`). Devuelve `undefined` si no hay override, para que el
 * default propio del componente (normalmente "h2") siga aplicando.
 */
export function getTitleLevel(size) {
  return titleSizeToHeadingLevel[size] || undefined;
}

const descriptionSizeToTextSize = {
  sm: "sm",
  md: "base",
  lg: "lg",
};

/**
 * Traduce `meta.typography.descriptionSize` al `size` de Text/SectionHeader
 * (`descriptionSize`). Devuelve `undefined` si no hay override.
 */
export function getDescriptionTextSize(size) {
  return descriptionSizeToTextSize[size] || undefined;
}

// Para Variants que usan el patrón CSS-var (.section-title/.section-
// description de globals.css vía inline style, ej.
// style={{ "--section-title-color": ... }}). Mismos valores de font-size
// que la escala global (.text-h3/.text-h2/.text-h1/.text-display), pero
// solo el tamaño: line-height/weight/tracking del patrón CSS-var se dejan
// fijos a propósito (no forman parte de lo que el CMS de contenido edita).
const titleSizeCssValues = {
  sm: "clamp(1.5rem, 4vw, 2rem)",
  md: "clamp(2rem, 5vw, 3rem)",
  lg: "clamp(2.5rem, 6vw, 4rem)",
  xl: "clamp(3rem, 8vw, 4.5rem)",
};

/**
 * Devuelve el valor crudo de font-size para `--section-title-size`, o
 * `undefined` si no hay override (deja el fallback de globals.css).
 */
export function getTitleSizeCssValue(size) {
  return titleSizeCssValues[size] || undefined;
}

const descriptionSizeCssValues = {
  sm: "0.9rem",
  md: "1rem",
  lg: "1.1rem",
};

/**
 * Igual que getTitleSizeCssValue, para `--section-description-size`.
 */
export function getDescriptionSizeCssValue(size) {
  return descriptionSizeCssValues[size] || undefined;
}
