"use client";

import Image from "next/image";

const ratioStyles = {
  square: { aspectRatio: "1 / 1" },
  video: { aspectRatio: "16 / 9" },
  portrait: { aspectRatio: "4 / 5" },
  landscape: { aspectRatio: "4 / 3" },
};

const radiusStyles = {
  none: "0px",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
};

const overlayStyles = {
  dark: "rgba(0, 0, 0, 0.45)",
  soft: "rgba(0, 0, 0, 0.25)",
  light: "rgba(255, 255, 255, 0.35)",
};

/**
 * MediaFrame UI Base
 *
 * Componente reutilizable para renderizar medios controlados:
 * imágenes, videos o embeds.
 *
 * Soporta:
 * - image
 * - video
 * - embed
 * - ratios
 * - overlays
 * - radius
 * - object-fit
 * - object-position
 *
 * Depende de:
 * - next/image
 * - Tailwind CSS
 * - variables globales de globals.css
 *
 * Props principales:
 * - type
 * - src
 * - alt
 * - poster
 * - ratio
 * - fit
 * - radius
 * - overlay
 * - overlayTone
 * - interactive
 * - objectPosition
 * - priority
 * - loading
 * - sizes
 * - className
 *
 * Reglas:
 * - Usar para media dentro de layouts.
 * - No usar para backgrounds absolutos complejos; en ese caso resolver desde la section.
 * - Siempre definir alt en imágenes.
 * - No hardcodear estilos de cliente.
 */

export default function MediaFrame({
  type = "image",
  src,
  alt = "",
  poster = "",
  ratio = "auto",
  fit = "cover",
  radius = "md",
  overlay = false,
  overlayTone = "dark",
  interactive = false,
  icon = null,
  showIcon = false,
  objectPosition = "center center",
  controls = true,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  preload = "metadata",
  priority = false,
  loading = "lazy",
  sizes = "100vw",
  className = "",
}) {
  if (!src) return null;

  const isAuto = ratio === "auto";
  const borderRadius = radiusStyles[radius] || radiusStyles.md;
  const overlayColor = overlayStyles[overlayTone] || overlayStyles.dark;
  const objectFit = fit === "contain" ? "contain" : "cover";

  const wrapperClass = [
    "relative w-full overflow-hidden bg-[var(--color-bg-soft)]",
    interactive
      ? "transition-transform duration-300 ease-out hover:scale-[1.02]"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle = {
    borderRadius,
    ...(isAuto ? {} : ratioStyles[ratio] || ratioStyles.video),
  };

  function renderMedia() {
    if (type === "embed") {
      return (
        <iframe
          src={src}
          className={
            isAuto ? "block h-auto w-full" : "absolute inset-0 h-full w-full"
          }
          style={{ border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }

    if (type === "video") {
      return (
        <video
          src={src}
          poster={poster || undefined}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          className={
            isAuto ? "block h-auto w-full" : "absolute inset-0 h-full w-full"
          }
          style={{ objectFit, objectPosition }}
        />
      );
    }

    if (isAuto) {
      return (
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          priority={priority}
          loading={priority ? undefined : loading}
          sizes={sizes}
          className="block h-auto w-full"
          style={{ objectFit, objectPosition }}
        />
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : loading}
        sizes={sizes}
        style={{ objectFit, objectPosition }}
      />
    );
  }

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      {renderMedia()}

      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: overlayColor }}
        />
      )}

      {showIcon && icon && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
  );
}