"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";

const spacingClasses = {
  compact: "py-[var(--section-spacing-compact)]",
  default: "py-[var(--section-spacing)]",
  hero: "py-[var(--section-spacing-hero)]",
};

const containerClasses = {
  content:
    "mx-auto w-full max-w-[var(--container-width-content)] px-[var(--container-padding)]",
  section:
    "mx-auto w-full max-w-[var(--container-width)] px-[var(--container-padding)]",
  wide:
    "mx-auto w-full max-w-[var(--container-width-wide)] px-[var(--container-padding)]",
};

export function QuoteSection({ data }) {
  if (!data || !data.enabled) return null;

  const {
    containerWidth = "content",
    spacing = "compact",
    content = {},
    meta = {},
  } = data;

  const iconEnabled = meta?.showIcon ?? true;

  return (
    <section
      className={[
        "gradient-soft-inverse text-[var(--color-text)]",
        spacingClasses[spacing] || spacingClasses.compact,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <motion.div
        className={[
          containerClasses[containerWidth] || containerClasses.content,
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