"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/actions/Button";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import {
  getSpacingClass,
  getContainerClass,
  getToneTextClass,
  resolveTypography,
  getTitleSizeClass,
  getDescriptionSizeClass,
} from "@/lib/sections/sectionStyle";

export function HeroInternal({ data }) {
  if (!data || !data.enabled) return null;

  const { content, actions } = data;
  const background = data.background || {};
  const hasBgImage = background.type === "image" && background.src;
  const overlayEnabled = data.meta?.overlay ?? true;
  const overlayOpacity = data.meta?.overlayOpacity ?? 0.55;

  const isStrong = !data.surface || data.surface === "strong";
  const surfaceClasses = { base: "surface-base", subtle: "surface-subtle" };
  // Hero interno asume superficie oscura por defecto (strong/imagen);
  // tone "inverse" salvo que meta.tone la pise. Si surface es base/subtle
  // (claro) sin imagen, cae a "default" automáticamente.
  const tone = data.meta?.tone || (hasBgImage || isStrong ? "inverse" : "default");
  const { titleSize, descriptionSize } = resolveTypography(data);

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative overflow-hidden",
        getSpacingClass(data.spacing) || "section-shell--hero",
        hasBgImage
          ? "text-(--color-text-inverse)"
          : isStrong
            ? "bg-(--color-bg-dark) text-(--color-text-inverse)"
            : surfaceClasses[data.surface] || "surface-strong",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasBgImage ? (
        <>
          <Image
            src={background.src}
            alt={background.alt || ""}
            fill
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
            priority
          />
          {overlayEnabled && (
            <div
              className="absolute inset-0 z-1 bg-black"
              style={{ opacity: overlayOpacity }}
              aria-hidden="true"
            />
          )}
        </>
      ) : isStrong ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,192,24,0.22),transparent_34%),linear-gradient(135deg,var(--color-primary),var(--color-bg-dark))]" />
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