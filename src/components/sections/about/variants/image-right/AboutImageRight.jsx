"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/actions/Button";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";

export function AboutImageRight({ data }) {
  if (!data || !data.enabled) return null;

  const { content, media, actions } = data;
  const image = media?.foreground;

  return (
    <section className="gradient-soft py-[var(--section-spacing)] text-[var(--color-text)]">
      <div className="mx-auto grid w-[min(calc(100%-2.5rem),var(--container-width))] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="flex flex-col gap-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h2 className="text-balance text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-[-0.035em] text-[var(--color-primary)]">
              {content.title}
            </h2>
          )}

          {content?.description && (
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-soft)]">
              {content.description}
            </p>
          )}

          {actions?.length > 0 && (
            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
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

        {image?.src && (
          <motion.div
            className="relative overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...defaultTransition, delay: 0.08 }}
          >
            <img
              src={image.src}
              alt={image.alt || ""}
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default AboutImageRight;