"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/actions/Button";

import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import { getSpacingClass, getContainerClass } from "@/lib/sections/sectionStyle";

export function ComparisonSplit({ data }) {
  if (!data || !data.enabled) return null;

  const { id, content, media, items, actions, meta = {} } = data;
  const sectionBackground = data.background || {};
  const background = media?.background;

  const bgSrc = background?.src || sectionBackground.src || null;
  const bgAlt = background?.alt || sectionBackground.alt || "";
  const isImage = sectionBackground.type === "image" && Boolean(bgSrc);
  const isSurface = sectionBackground.type === "surface";

  const overlayEnabled = meta?.overlay ?? background?.overlay ?? true;
  const overlayOpacity = meta?.overlayOpacity ?? 0.7;

  const surfaceClasses = {
    base: "surface-base",
    subtle: "surface-subtle",
    strong: "surface-strong",
  };

  return (
    <section
      id={id}
      className={[
        "section-shell relative overflow-hidden",
        getSpacingClass(data.spacing),
        isImage
          ? "bg-[var(--color-bg-dark)]"
          : isSurface
            ? surfaceClasses[data.surface] || "surface-strong"
            : "bg-[var(--color-bg-dark)]",
        isSurface ? "" : "text-[var(--color-text-inverse)]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isImage ? (
        <img
          src={bgSrc}
          alt={bgAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : !isSurface ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,192,24,0.12),transparent_30%),linear-gradient(135deg,var(--color-primary),var(--color-bg-dark))]"
          aria-hidden="true"
        />
      ) : null}

      {isImage && overlayEnabled ? (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={[
          "section-container relative flex w-full flex-col gap-16",
          getContainerClass(data.containerWidth),
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <p
              className="section-eyebrow"
              style={{ "--section-eyebrow-color": "var(--color-accent)" }}
            >
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h2 className="text-balance text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[var(--color-text-inverse)]">
              {content.title}
            </h2>
          )}

          {content?.description && (
            <p className="max-w-2xl text-[1.1rem] leading-8 text-white/80">
              {content.description}
            </p>
          )}
        </motion.div>

        {items?.length > 0 ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {items.map((item, index) => (
              <motion.div
                key={item.title || index}
                className={[
                  "relative flex flex-col gap-6",
                  index === 0
                    ? "lg:pr-10"
                    : "lg:border-l lg:border-white/15 lg:pl-10",
                ]
                  .filter(Boolean)
                  .join(" ")}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  ...defaultTransition,
                  delay: index * 0.08,
                }}
              >
                {item?.eyebrow && (
                  <p className="text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    {item.eyebrow}
                  </p>
                )}

                {item?.title && (
                  <h3 className="text-balance text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-[-0.035em] text-[var(--color-text-inverse)]">
                    {item.title}
                  </h3>
                )}

                {item?.description && (
                  <p className="text-[1.1rem] leading-8 text-white/80">
                    {item.description}
                  </p>
                )}

                {item?.actions?.length > 0 ? (
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    {item.actions.map((action, actionIndex) => (
                      <Button
                        key={action.label || actionIndex}
                        href={action.href}
                        variant={action.variant || "primary"}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>
        ) : null}

        {actions?.length > 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              ...defaultTransition,
              delay: 0.15,
            }}
          >
            {actions.map((action, index) => (
              <Button
                key={action.label || index}
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

export default ComparisonSplit;