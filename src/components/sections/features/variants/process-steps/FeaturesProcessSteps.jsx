"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";

export function FeaturesProcessSteps({ data }) {
  if (!data || !data.enabled) return null;

  const { content, media, items } = data;
  const background = media?.background;

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-dark)] py-[var(--section-spacing)] text-[var(--color-text-inverse)]">
      {background?.src ? (
        <img
          src={background.src}
          alt={background.alt || ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-primary),var(--color-bg-dark))]" />
      )}

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto grid w-[min(calc(100%-2.5rem),var(--container-width-wide))] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <motion.div
          className="flex flex-col gap-5 lg:sticky lg:top-28"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h2 className="text-balance text-[clamp(2rem,5vw,3.7rem)] font-bold leading-[1.06] tracking-[-0.04em] text-white">
              {content.title}
            </h2>
          )}

          {content?.description && (
            <p className="max-w-xl text-lg leading-8 text-white/80">
              {content.description}
            </p>
          )}
        </motion.div>

        {items?.length > 0 && (
          <div className="relative flex flex-col gap-5">
            <div className="absolute bottom-6 left-6 top-6 hidden w-px bg-white/12 md:block" />

            {items.map((item, index) => (
              <motion.article
                key={index}
                className="relative grid gap-4 rounded-[var(--radius-xl)] border border-white/12 bg-white p-6 shadow-[var(--shadow-sm)] md:grid-cols-[auto_1fr] md:gap-5"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  ...defaultTransition,
                  delay: index * 0.06,
                }}
              >
                <div className="relative z-10 flex size-12 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-primary)] text-[var(--color-text-inverse)]">
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
                    Paso {index + 1}
                  </p>

                  {item?.title && (
                    <h3 className="text-xl font-bold leading-tight text-[var(--color-primary)]">
                      {item.title}
                    </h3>
                  )}

                  {item?.description && (
                    <p className="text-base leading-7 text-[var(--color-text-soft)]">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturesProcessSteps;