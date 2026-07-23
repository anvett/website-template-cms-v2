"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/actions/Button";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
} from "@/lib/sections/sectionStyle";

export function HeroBackgroundImage({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const actions = data.actions || [];

  const align = data.meta?.align || "left";

  const bg = resolveBackground(data, {
    defaultSurfaceFallback: "surface-strong",
    defaultOverlayOpacity: 0.38,
  });

  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center mx-auto",
    right: "items-start text-left md:items-end md:text-right md:ml-auto",
  };

  const actionAlignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-start md:justify-end",
  };

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative flex min-h-[520px] items-center overflow-hidden py-[3rem] md:min-h-[clamp(600px,80vh,760px)] lg:min-h-[clamp(680px,85vh,820px)]",
        getSpacingClass(data.spacing),
        bg.hasImage ? "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]" : bg.surfaceClass,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {bg.hasImage ? (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={bg.image.src}
            alt={bg.image.alt || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {bg.overlay.enabled ? (
        <div
          className="absolute inset-0 z-[1] bg-black"
          style={{ opacity: bg.overlay.opacity }}
          aria-hidden="true"
        />
      ) : null}

      <div className="relative z-[2] w-full px-[1.5rem] md:px-[clamp(2rem,5vw,4rem)]">
        <div
          className={[
            "section-container",
            getContainerClass(data.containerWidth) || "section-container--wide",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <motion.div
            className={[
              "flex max-w-[640px] flex-col gap-[1.25rem] md:max-w-[720px]",
              alignClasses[align] || alignClasses.left,
            ]
              .filter(Boolean)
              .join(" ")}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {content.eyebrow ? (
              <p className="m-0 font-[var(--font-body)] text-[clamp(0.9rem,1.5vw,1.1rem)] font-bold leading-[1.45] text-[var(--color-accent)]">
                {content.eyebrow}
              </p>
            ) : null}

            {content.title ? (
              <h1 className="m-0 font-[var(--font-heading)] text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-[var(--color-text-inverse)]">
                {content.title}
              </h1>
            ) : null}

            {content.description ? (
              <p className="m-0 max-w-[680px] font-[var(--font-body)] text-[clamp(1.05rem,2vw,1.3rem)] leading-[1.6] text-[var(--color-text-inverse)]">
                {content.description}
              </p>
            ) : null}

            {actions.length > 0 ? (
              <div
                className={[
                  "mt-[0.5rem] flex flex-col gap-[0.75rem] sm:flex-row sm:flex-wrap",
                  actionAlignClasses[align] || actionAlignClasses.left,
                ]
                  .filter(Boolean)
                  .join(" ")}
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
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroBackgroundImage;