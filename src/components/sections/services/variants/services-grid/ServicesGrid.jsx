"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/actions/Button";
import { SectionHeader } from "@/components/ui/content/SectionHeader";

export function ServicesGrid({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const items = data.items || [];
  const actions = data.actions || [];
  const background = data.media?.background;

  const variant = data.variant || "grid-3";

  const gridClasses = {
    "grid-2": "md:grid-cols-2",
    "grid-3": "md:grid-cols-2 xl:grid-cols-3",
    "grid-4": "md:grid-cols-2 xl:grid-cols-4",
  };

  const hasBackgroundImage = background?.src;

  return (
    <section
      id={data.id}
      className="relative isolate w-full overflow-hidden border-t border-[rgba(16,64,136,0.08)] px-[1.5rem] py-[var(--section-spacing)] text-[var(--color-text)]"
    >
      {hasBackgroundImage ? (
        <>
          <Image
            src={background.src}
            alt={background.alt || ""}
            fill
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.72)_45%,rgba(255,255,255,0.64)_100%)]" />
        </>
      ) : null}

      <div className="relative z-[2] mx-auto w-full max-w-[var(--container-width-wide)]">
        <motion.div
          className="mx-auto mb-[2.75rem] max-w-[820px]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
          />
        </motion.div>

        {items.length > 0 ? (
          <div
            className={[
              "grid grid-cols-1 gap-[1rem] md:gap-[1.5rem]",
              gridClasses[variant] || gridClasses["grid-3"],
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {items.map((item, index) => (
              <motion.article
                key={item.title || index}
                className="relative flex min-h-full flex-col gap-[1.4rem] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white/95 p-[1.4rem] shadow-[var(--shadow-sm)] transition duration-200 ease-out hover:-translate-y-[4px] hover:border-[rgba(16,64,136,0.28)] hover:shadow-[var(--shadow-md)] md:p-[1.75rem]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <span className="inline-flex h-[2.35rem] w-[2.35rem] items-center justify-center rounded-[var(--radius-pill)] bg-[rgba(248,192,24,0.18)] font-[var(--font-body)] text-[0.85rem] font-bold text-[var(--color-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  {item.title ? (
                    <h3 className="text-[1.25rem] font-bold leading-[1.2] text-[var(--color-primary)]">
                      {item.title}
                    </h3>
                  ) : null}

                  {item.description ? (
                    <p className="mt-[0.8rem] max-w-[62ch] text-[1rem] leading-[1.7] text-[var(--color-text-soft)]">
                      {item.description}
                    </p>
                  ) : null}
                </div>

                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-auto font-[var(--font-body)] text-[0.95rem] font-bold text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                  >
                    Ver más
                  </a>
                ) : null}
              </motion.article>
            ))}
          </div>
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
      </div>
    </section>
  );
}

export default ServicesGrid;