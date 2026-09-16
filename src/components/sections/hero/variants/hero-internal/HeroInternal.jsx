"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/actions/Button";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
  resolveTone,
  getToneTextClass,
  resolveTypography,
  getTitleSizeClass,
  getDescriptionSizeClass,
} from "@/lib/sections/sectionStyle";

/**
 * Hero compacto para páginas internas (Nosotros, Servicios, etc.) — misma
 * idea que `background-image` (Hero de Home) pero con menos altura y
 * contenido centrado, pensado para abrir una página secundaria sin repetir
 * el hero grande de Home.
 *
 * 2026-08-30 — bug corregido: leía `background.src`/`background.alt`
 * directo (nunca `media.background.src`/`alt`, el lugar real donde vive
 * la imagen según el contrato oficial — CLAUDE.md, "Background por
 * Defecto") y no sabía nada de gradientes ni de la jerarquía
 * imagen>gradiente>surface ya cableada en `resolveBackground()`. Se
 * reescribió para usar `resolveBackground`/`resolveTone`, igual que
 * `hero-background-image` y el resto del catálogo — mismo mecanismo,
 * nada nuevo que mantener por separado.
 */
export function HeroInternal({ data }) {
  if (!data || !data.enabled) return null;

  const { content, actions } = data;

  const bg = resolveBackground(data, {
    defaultSurfaceFallback: "surface-strong",
    defaultOverlayOpacity: 0.55,
  });
  const tone = resolveTone(data, bg);
  const { titleSize, descriptionSize } = resolveTypography(data);

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative overflow-hidden",
        getSpacingClass(data.spacing) || "section-shell--hero",
        bg.hasImage ? "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]" : bg.surfaceClass,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {bg.hasImage ? (
        <>
          <Image
            src={bg.image.src}
            alt={bg.image.alt || ""}
            fill
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
            priority
          />
          {bg.overlay.enabled && (
            <div
              className="absolute inset-0 z-1 bg-black"
              style={{ opacity: bg.overlay.opacity }}
              aria-hidden="true"
            />
          )}
        </>
      ) : null}

      <div
        className={[
          "section-container relative z-2 mx-auto flex min-h-105 items-center justify-center py-24 text-center md:min-h-125 md:py-28",
          getContainerClass(data.containerWidth) || "section-container--content",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="flex max-w-full flex-col items-center gap-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <p className={["text-sm font-bold uppercase tracking-[0.16em]", getToneTextClass(tone, "eyebrow")].join(" ")}>
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h1 className={["text-balance", getTitleSizeClass(titleSize) || "text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em]", getToneTextClass(tone, "title")].join(" ")}>
              {content.title}
            </h1>
          )}

          {content?.description && (
            <p className={["max-w-2xl text-balance", getDescriptionSizeClass(descriptionSize) || "text-lg leading-8 md:text-xl", getToneTextClass(tone, "description")].join(" ")}>
              {content.description}
            </p>
          )}

          {actions?.length > 0 && (
            <div className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  href={action.href}
                  variant={action.variant || "primary"}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroInternal;
