"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
} from "@/lib/sections/sectionStyle";

export function QuoteSection({ data }) {
  if (!data || !data.enabled) return null;

  const {
    containerWidth = "content",
    content = {},
    meta = {},
  } = data;

  const iconEnabled = meta?.showIcon ?? true;

  const bg = resolveBackground(data, { defaultSurfaceFallback: "gradient-soft-inverse" });

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative overflow-hidden text-[var(--color-text)]",
        getSpacingClass(data.spacing) || "section-shell--compact",
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
        />
      ) : null}

      {bg.hasImage && bg.overlay.enabled ? (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: bg.overlay.opacity }}
          aria-hidden="true"
        />
      ) : null}
      <motion.div
        className={[
          "section-container relative",
          getContainerClass(containerWidth) || "section-container--content",
          "flex flex-col items-center gap-6 text-center",
        ]
          .filter(Boolean)
          .join(" ")}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={defaultTransition}
      >
        {iconEnabled ? (
          <div className="flex size-14 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)]/18 text-[var(--color-primary)]">
            <Quote className="size-6" aria-hidden="true" />
          </div>
        ) : null}

        {content?.quote ? (
          <blockquote className="text-balance text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-[-0.035em] text-[var(--color-primary)]">
            “{content.quote}”
          </blockquote>
        ) : null}

        {content?.author ? (
          <p className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            {content.author}
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}

export default QuoteSection;