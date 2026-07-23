"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/actions/Button";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
} from "@/lib/sections/sectionStyle";

export function CTABackgroundImage({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const actions = data.actions || [];

  const bg = resolveBackground(data, {
    defaultSurfaceFallback: "surface-strong",
    defaultOverlayOpacity: 0.18,
  });

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative isolate flex min-h-160 w-full items-center overflow-hidden px-6",
        getSpacingClass(data.spacing),
        bg.hasImage ? "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]" : bg.surfaceClass,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {bg.hasImage ? (
        <img
          src={bg.image.src}
          alt={bg.image.alt || ""}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      ) : null}

      {bg.overlay.enabled ? (
        <div
          className="absolute inset-0 z-1 bg-black"
          style={{ opacity: bg.overlay.opacity }}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={[
          "section-container relative z-2 mx-auto w-full",
          getContainerClass(data.containerWidth),
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {content.eyebrow ? (
            <p
              className="section-eyebrow pb-5"
              style={{ color: "var(--color-accent)" }}
            >
              {content.eyebrow}
            </p>
          ) : null}

          {content.title ? (
            <h2
              className="section-title mt-3 pb-8"
              style={{ color: "var(--color-text-inverse)" }}
            >
              {content.title}
            </h2>
          ) : null}

          {content.description ? (
            <p
              className="section-description mt-4 max-w-2xl"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {content.description}
            </p>
          ) : null}

          {actions.length > 0 ? (
            <div className="section-actions section-actions--center">
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
        </motion.div>
      </div>
    </section>
  );
}

export default CTABackgroundImage;
