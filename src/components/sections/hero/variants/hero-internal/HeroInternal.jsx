"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/actions/Button";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";

export function HeroInternal({ data }) {
  if (!data || !data.enabled) return null;

  const { content, actions } = data;

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,192,24,0.22),transparent_34%),linear-gradient(135deg,var(--color-primary),var(--color-bg-dark))]" />

      <div className="relative mx-auto flex min-h-[420px] w-[min(calc(100%-2.5rem),var(--container-width-content))] items-center justify-center py-24 text-center md:min-h-[500px] md:py-28">
        <motion.div
          className="flex max-w-3xl flex-col items-center gap-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h1 className="text-balance text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em]">
              {content.title}
            </h1>
          )}

          {content?.description && (
            <p className="max-w-2xl text-balance text-lg leading-8 text-white/85 md:text-xl">
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