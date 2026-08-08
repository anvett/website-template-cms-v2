"use client";

import { motion } from "framer-motion";

import Image from "next/image";

import { Card } from "@/components/ui/content/Card";
import {MediaFrame}  from "@/components/ui/content/MediaFrame";
import { Button } from "@/components/ui/actions/Button";

import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import {
  getToneCssColor,
  resolveTypography,
  getTitleSizeCssValue,
  getDescriptionSizeCssValue,
} from "@/lib/sections/sectionStyle";

const containerClasses = {
  content:
    "mx-auto w-full max-w-[var(--container-width-content)] px-[var(--container-padding)]",
  section:
    "mx-auto w-full max-w-[var(--container-width)] px-[var(--container-padding)]",
  wide:
    "mx-auto w-full max-w-[var(--container-width-wide)] px-[var(--container-padding)]",
  full: "mx-auto w-full",
};

const spacingClasses = {
  compact: "py-[var(--section-spacing-compact)]",
  default: "py-[var(--section-spacing)]",
  hero: "py-[var(--section-spacing-hero)]",
};

const surfaceClasses = {
  base: "surface-base",
  subtle: "surface-subtle",
  strong: "surface-strong",
};

function getSectionClasses({ background, surface, spacing, hasImage }) {
  const base = "relative overflow-hidden";
  const spacingClass = spacingClasses[spacing] || spacingClasses.default;

  if (hasImage) {
    return `${base} ${spacingClass} bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]`;
  }

  if (background?.type === "gradient" && background?.variant === "dark") {
    return `${base} ${spacingClass} gradient-dark`;
  }

  if (background?.type === "gradient" && background?.variant === "soft") {
    return `${base} ${spacingClass} gradient-soft`;
  }

  const surfaceClass = surfaceClasses[surface] || "surface-base";
  return `${base} ${spacingClass} ${surfaceClass}`;
}

export function DualContentDefault({ data }) {
  if (!data || !data.enabled) return null;

  const {
    id,
    containerWidth = "section",
    spacing = "default",
    surface,
    background = {},
    content = {},
    items = [],
    actions = [],
  } = data;

  const media = data.media?.background;
  const hasImage = background?.type === "image" && Boolean(media?.src);

  const isDark =
    hasImage || (background?.type === "gradient" && background?.variant === "dark");

  const overlayEnabled = data.meta?.overlay ?? media?.overlay ?? true;
  const overlayOpacity = data.meta?.overlayOpacity ?? 0.55;
  const tone = data.meta?.tone || (isDark ? "inverse" : "default");
  const { titleSize, descriptionSize } = resolveTypography(data);

  return (
    <section
      id={id}
      className={getSectionClasses({ background, surface, spacing, hasImage })}
    >
      {hasImage ? (
        <>
          <Image
            src={media.src}
            alt={media.alt || ""}
            fill
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          {overlayEnabled ? (
            <div
              className="absolute inset-0 z-[1] bg-black"
              style={{ opacity: overlayOpacity }}
              aria-hidden="true"
            />
          ) : null}
        </>
      ) : isDark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(248,192,24,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.12),transparent_28%)]"
          aria-hidden="true"
        />
      ) : null}

      <div
        className={[
          containerClasses[containerWidth] || containerClasses.section,
          "relative z-10",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="mx-auto mb-[3rem] max-w-[760px] text-center md:mb-[3rem]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={defaultTransition}
        >
          {content.eyebrow ? (
            <p
              className="section-eyebrow"
              style={{ "--section-eyebrow-color": getToneCssColor(tone, "eyebrow") }}
            >
              {content.eyebrow}
            </p>
          ) : null}

          {content.title ? (
            <h2
              className="section-title"
              style={{
                "--section-title-color": getToneCssColor(tone, "title"),
                "--section-title-size": getTitleSizeCssValue(titleSize),
              }}
            >
              {content.title}
            </h2>
          ) : null}

          {content.description ? (
            <p
              className="section-description mt-[1rem]"
              style={{
                "--section-description-color": getToneCssColor(tone, "description"),
                "--section-description-size": getDescriptionSizeCssValue(descriptionSize),
              }}
            >
              {content.description}
            </p>
          ) : null}
        </motion.div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-[1.5rem] md:grid-cols-2">
            {items.map((item, index) => {
              const image = item.image || {};

              return (
                <motion.div
                  key={item.title || index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    ...defaultTransition,
                    delay: index * 0.08,
                  }}
                >
                  <Card
                    as="article"
                    surface="base"
                    padding="none"
                    radius="xl"
                    shadow="lg"
                    border
                    interactive
                    className="overflow-hidden border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(248,250,252,1)_100%)] text-[var(--color-text)]"
                  >
                    {image.src ? (
                      <div className="relative overflow-hidden bg-[var(--color-bg-muted)] p-[1rem]">
                        <MediaFrame
                          type={image.type || "image"}
                          src={image.src}
                          alt={image.alt || item.title || ""}
                          ratio={image.ratio || "portrait"}
                          fit={image.fit || "contain"}
                          radius={image.radius || "none"}
                          objectPosition={image.objectPosition || "center center"}
                          className={image.className || "h-[18rem] lg:h-[26rem]"}
                          sizes={image.sizes || "(min-width: 1024px) 50vw, 100vw"}
                          priority={Boolean(image.priority)}
                        />

                        {image.overlay ? (
                          <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.38)_100%)]"
                            aria-hidden="true"
                          />
                        ) : null}
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-[1.4rem] p-[1.4rem] md:p-[2rem]">
                      <div>
                        {item.title ? (
                          <h3 className="text-[1.45rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--color-primary)]">
                            {item.title}
                          </h3>
                        ) : null}

                        {item.description ? (
                          <p className="mt-[0.85rem] text-[0.98rem] leading-[1.7] text-[var(--color-text-soft)]">
                            {item.description}
                          </p>
                        ) : null}
                      </div>

                      {item.features?.length > 0 ? (
                        <ul className="m-0 grid list-none gap-[0.8rem] rounded-[var(--radius-lg)] bg-[rgba(16,64,136,0.06)] p-[1rem]">
                          {item.features.map((feature) => (
                            <li
                              key={feature}
                              className="relative pl-[1.45rem] text-[0.95rem] font-medium leading-[1.5] text-[var(--color-text)] before:absolute before:left-0 before:top-[0.52em] before:h-[0.5rem] before:w-[0.5rem] before:rounded-[var(--radius-pill)] before:bg-[var(--color-accent)] before:shadow-[0_0_0_4px_rgba(248,192,24,0.18)]"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {item.href ? (
                        <a
                          href={item.href}
                          className="inline-flex w-fit items-center gap-[0.4rem] font-bold text-[var(--color-primary)] transition-colors duration-200 after:content-['→'] hover:text-[var(--color-accent)]"
                        >
                          Ver más
                        </a>
                      ) : null}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : null}

        {actions.length > 0 ? (
          <motion.div
            className="mt-[2.5rem] flex justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={defaultTransition}
          >
            {actions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant || "primary"}
              >
                {action.label}
              </Button>
            ))}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export default DualContentDefault;