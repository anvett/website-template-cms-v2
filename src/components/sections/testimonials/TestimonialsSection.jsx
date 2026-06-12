"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";

const containerClasses = {
  content:
    "mx-auto w-full max-w-[var(--container-width-content)] px-[var(--container-padding)]",
  section:
    "mx-auto w-full max-w-[var(--container-width)] px-[var(--container-padding)]",
  wide:
    "mx-auto w-full max-w-[var(--container-width-wide)] px-[var(--container-padding)]",
};

export function TestimonialsSection({ data }) {
  if (!data || !data.enabled) return null;

  const {
    containerWidth = "wide",
    content = {},
    media = {},
    items = [],
    meta = {},
  } = data;

  const background = media?.background;

  const overlayEnabled =
    meta?.overlay ??
    background?.overlay ??
    true;

  const overlayOpacity =
    meta?.overlayOpacity ??
    0.65;

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

      {overlayEnabled ? (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={[
          containerClasses[containerWidth] || containerClasses.wide,
          "relative flex flex-col gap-12",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <p
              className="section-eyebrow"
              style={{
                "--section-eyebrow-color": "var(--color-accent)",
              }}
            >
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h2
              className="section-title"
              style={{
                "--section-title-color":
                  "var(--color-text-inverse)",
              }}
            >
              {content.title}
            </h2>
          )}

          {content?.description && (
            <p
              className="section-description"
              style={{
                "--section-description-color":
                  "rgba(255,255,255,0.82)",
              }}
            >
              {content.description}
            </p>
          )}
        </motion.div>

        {items?.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item, index) => (
              <motion.article
                key={index}
                className="flex h-full flex-col justify-between gap-8 rounded-[var(--radius-xl)] border border-white/12 bg-white/10 p-6 shadow-[var(--shadow-sm)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-white/14 hover:shadow-[var(--shadow-md)]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  ...defaultTransition,
                  delay: index * 0.08,
                }}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between gap-4">
                    {item?.image && (
                      <img
                        src={item.image}
                        alt={item.name || ""}
                        className="size-24 rounded-full border-2 border-white/20 object-cover"
                      />
                    )}

                    <div className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)]/20 text-[var(--color-accent)]">
                      <Quote className="size-5" aria-hidden="true" />
                    </div>
                  </div>

                  {item?.message && (
                    <p className="text-base leading-7 text-white/82">
                      “{item.message}”
                    </p>
                  )}
                </div>

                <div className="border-t border-white/12 pt-5">
                  {item?.name && (
                    <h3 className="text-base font-bold text-white">
                      {item.name}
                    </h3>
                  )}

                  {item?.title && (
                    <p className="mt-1 text-sm leading-6 text-white/68">
                      {item.title}
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

export default TestimonialsSection;