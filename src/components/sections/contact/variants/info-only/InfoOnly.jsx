"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/content/Card";
import { InfoItem } from "@/components/ui/content/InfoItem";
import { Button } from "@/components/ui/actions/Button";

const surfaceClasses = {
  base: "bg-[var(--color-bg)] text-[var(--color-text)]",
  subtle: "bg-[var(--color-bg-soft)] text-[var(--color-text)]",
  strong: "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]",
};

const gradientClasses = {
  brand: "gradient-dark",
  soft: "gradient-soft",
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

export function InfoOnly({ data }) {
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
  const overlayEnabled = meta?.overlay ?? media?.background?.overlay ?? true;
  const overlayOpacity = meta?.overlayOpacity ?? 0.7;

  const isImageBackground = background?.type === "image" && backgroundImage;

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
          "relative z-10 flex flex-col gap-10",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {content.eyebrow ? (
            <span className="section-eyebrow">{content.eyebrow}</span>
          ) : null}

          {content.title ? (
            <h2
              className="section-title max-w-[52rem]"
              style={{
                "--section-title-color": isImageBackground
                  ? "var(--color-text-inverse)"
                  : "var(--color-primary)",
              }}
            >
              {content.title}
            </h2>
          ) : null}

          {content.description ? (
            <p
              className="section-description max-w-[48rem]"
              style={{
                "--section-description-color": isImageBackground
                  ? "rgba(255,255,255,0.86)"
                  : "var(--color-primary)",
              }}
            >
              {content.description}
            </p>
          ) : null}
        </motion.div>

        {items.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={item.title || index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: index * 0.06,
                }}
              >
                <Card
                  padding="lg"
                  radius="xl"
                  shadow="sm"
                  className="h-full"
                >
                  <InfoItem
                    title={item.title}
                    description={item.description}
                    showIcon={false}
                    align="center"
                    size="md"
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        ) : null}

        {actions.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {actions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant || "secondary"}
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

export default InfoOnly;