"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Accordion } from "@/components/ui/disclosure/Accordion";
import { Button } from "@/components/ui/actions/Button";
import {
  resolveTone,
  getToneCssColor,
  resolveTypography,
  getTitleSizeCssValue,
  getDescriptionSizeCssValue,
} from "@/lib/sections/sectionStyle";

const surfaceClasses = {
  base: "bg-[var(--color-bg)] text-[var(--color-text)]",
  subtle: "bg-[var(--color-bg-soft)] text-[var(--color-text)]",
  strong: "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]",
};

const gradientClasses = {
  brand: "gradient-dark",
  dark: "gradient-dark",
  soft: "gradient-soft",
  accent: "gradient-accent",
};

const containerClasses = {
  content:
    "mx-auto w-full max-w-[var(--container-width-content)] px-[var(--container-padding)]",
  section:
    "mx-auto w-full max-w-[var(--container-width)] px-[var(--container-padding)]",
  wide:
    "mx-auto w-full max-w-[var(--container-width-wide)] px-[var(--container-padding)]",
};

const spacingClasses = {
  compact: "py-[var(--section-spacing-compact)]",
  default: "py-[var(--section-spacing)]",
  hero: "py-[var(--section-spacing-hero)]",
};

function getBackgroundClasses(surface, background) {
  if (background?.type === "gradient") {
    return gradientClasses[background.variant] || gradientClasses.brand;
  }

  if (background?.type === "image") {
    return "relative overflow-hidden text-[var(--color-text-inverse)]";
  }

  return surfaceClasses[surface] || surfaceClasses.base;
}

export function CategorizedFAQ({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || !data.enabled) return null;

  const {
    id,
    surface = "base",
    containerWidth = "section",
    spacing = "default",
    background = { type: "surface", variant: null },
    content = {},
    media = {},
    items = [],
    actions = [],
    meta = {},
  } = data;

  const backgroundImage = media?.background?.src;
  const isImageBackground = background?.type === "image" && backgroundImage;
  const activeCategory = items[activeIndex] || items[0];
  const tone = resolveTone(data, { hasImage: isImageBackground });
  const { titleSize, descriptionSize } = resolveTypography(data);

  const overlayEnabled = meta?.overlay ?? media?.background?.overlay ?? true;
  const overlayOpacity = meta?.overlayOpacity ?? 0.7;

  return (
    <section
      id={id}
      className={[
        getBackgroundClasses(surface, background),
        spacingClasses[spacing] || spacingClasses.default,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isImageBackground ? (
        <>
          <img
            src={backgroundImage}
            alt={media?.background?.alt || ""}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {overlayEnabled ? (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
              aria-hidden="true"
            />
          ) : null}
        </>
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
          className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {content.eyebrow ? (
            <span
              className="section-eyebrow"
              style={{ "--section-eyebrow-color": getToneCssColor(tone, "eyebrow") }}
            >
              {content.eyebrow}
            </span>
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
              className="section-description"
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
          <div className="flex flex-col gap-8">
            <motion.div
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            >
              {items.map((category, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={category.category || index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "rounded-[var(--radius-xl)] border p-5 text-left shadow-[var(--shadow-sm)] transition duration-200",
                      isActive
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-text-inverse)]"
                        : "border-[var(--color-border)] bg-[var(--color-bg-white)] text-[var(--color-text)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)]",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {category.category ? (
                      <h3
                        className={[
                          "text-[1.125rem] font-bold leading-[1.25]",
                          isActive
                            ? "text-[var(--color-text-inverse)]"
                            : "text-[var(--color-primary)]",
                        ].join(" ")}
                      >
                        {category.category}
                      </h3>
                    ) : null}

                    {category.description ? (
                      <p
                        className={[
                          "mt-2 text-[0.9rem] leading-6",
                          isActive
                            ? "text-white/80"
                            : "text-[var(--color-text-soft)]",
                        ].join(" ")}
                      >
                        {category.description}
                      </p>
                    ) : null}
                  </button>
                );
              })}
            </motion.div>

            {activeCategory ? (
              <motion.div
                className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-6 shadow-[var(--shadow-sm)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
              >
                {activeCategory.category ? (
                  <h3 className="mb-5 text-[1.5rem] font-bold leading-[1.2] text-[var(--color-primary)]">
                    {activeCategory.category}
                  </h3>
                ) : null}

                <Accordion
                  items={activeCategory.questions || []}
                  allowMultiple={meta?.allowMultiple ?? false}
                />
              </motion.div>
            ) : null}
          </div>
        ) : null}

        {actions.length > 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {actions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant || "primary"}
              >
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default CategorizedFAQ;
