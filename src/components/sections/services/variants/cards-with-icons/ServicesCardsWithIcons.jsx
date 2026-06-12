"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Droplets,
  Wrench,
  Gauge,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/actions/Button";
import { SectionHeader } from "@/components/ui/content/SectionHeader";

const iconMap = {
  Flame,
  Droplets,
  Wrench,
  Gauge,
  ShieldCheck,
  Zap,
};

export function ServicesCardsWithIcons({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const items = data.items || [];
  const actions = data.actions || [];

  return (
    <section
      id={data.id}
      className="relative isolate w-full overflow-hidden bg-[var(--color-bg-soft)] px-[1.5rem] py-[var(--section-spacing)] text-[var(--color-text)]"
    >
      <div className="mx-auto flex w-full max-w-[var(--container-width-wide)] flex-col gap-[3rem]">
        <motion.div
          className="mx-auto w-full max-w-[820px]"
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
          <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 md:gap-[1.5rem] xl:grid-cols-4">
            {items.map((item, index) => {
              const Icon = iconMap[item.icon] || Wrench;

              return (
                <motion.article
                  key={item.title || index}
                  className="group relative flex min-h-full flex-col rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-white)] p-[1.4rem] shadow-[var(--shadow-sm)] transition duration-200 ease-out hover:-translate-y-[4px] hover:border-[rgba(16,64,136,0.28)] hover:shadow-[var(--shadow-md)] md:p-[1.75rem]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                >
                  <div className="mb-[1.35rem] flex h-[5rem] w-[5rem] items-center justify-center rounded-[var(--radius-pill)] bg-[rgba(248,192,24,0.18)] text-[var(--color-primary)] transition duration-200 ease-out group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-text-inverse)]">
                    <Icon className="h-[2.2rem] w-[2.2rem]" aria-hidden="true" />
                  </div>

                  <div className="flex flex-1 flex-col">
                    {item.title ? (
                      <h3 className="font-[var(--font-heading)] text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--color-primary)]">
                        {item.title}
                      </h3>
                    ) : null}

                    {item.description ? (
                      <p className="mt-[0.85rem] text-[1rem] leading-[1.7] text-[var(--color-text-soft)]">
                        {item.description}
                      </p>
                    ) : null}

                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-[1.4rem] inline-flex w-fit items-center gap-[0.4rem] font-[var(--font-body)] text-[0.95rem] font-bold text-[var(--color-primary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                      >
                        Ver más
                        <span aria-hidden="true">→</span>
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : null}

        {actions.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-[0.875rem] sm:flex-row sm:flex-wrap">
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

export default ServicesCardsWithIcons;