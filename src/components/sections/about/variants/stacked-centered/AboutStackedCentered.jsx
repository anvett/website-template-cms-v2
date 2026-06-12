"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/actions/Button";

export function AboutStackedCentered({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const actions = data.actions || [];

  return (
    <section
      id={data.id}
      className="w-full bg-[var(--gradient-soft)] px-[1.5rem] py-[var(--section-spacing)] text-[var(--color-text)]"
    >
      <motion.div
        className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        {content.eyebrow ? (
          <p className="mb-[0.75rem] text-[0.9rem] pb-5 font-extrabold uppercase leading-[1.45] tracking-[0.08em] text-[var(--color-accent)]">
            {content.eyebrow}
          </p>
        ) : null}

        {content.title ? (
          <h2 className="m-0 font-[var(--font-heading)] text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[var(--color-primary)]">
            {content.title}
          </h2>
        ) : null}

        {content.description ? (
          <p className="mt-[1.25rem] max-w-[720px] text-[1.08rem] leading-[1.75] text-[var(--color-text-soft)]">
            {content.description}
          </p>
        ) : null}

        {actions.length > 0 ? (
          <div className="mt-[1.5rem] flex flex-col items-center justify-center gap-[0.875rem] sm:flex-row sm:flex-wrap">
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
    </section>
  );
}

export default AboutStackedCentered;