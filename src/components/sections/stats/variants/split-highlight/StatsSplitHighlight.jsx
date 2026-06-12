"use client";

import { motion } from "framer-motion";

export function StatsSplitHighlight({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const items = data.items || [];

  const primaryStat = items[0];
  const secondaryStats = items.slice(1);

  return (
    <section
      id={data.id}
      className="section-shell gradient-dark text-[var(--color-text-inverse)]"
    >
      <div className="section-container section-container--wide grid gap-[3.5rem] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-[5rem]">
        <motion.div
          className="flex flex-col gap-[1.25rem]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {content.eyebrow ? (
            <p className="section-eyebrow text-[var(--color-accent)]">
              {content.eyebrow}
            </p>
          ) : null}

          {content.title ? (
            <h2 className="text-balance font-[var(--font-heading)] text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[var(--color-text-inverse)]">
              {content.title}
            </h2>
          ) : null}

          {content.description ? (
            <p className="max-w-[42rem] text-[1.0625rem] leading-[1.75] text-white/80">
              {content.description}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          className="grid gap-[1.5rem]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        >
          {primaryStat ? (
            <div className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-[2rem] backdrop-blur-sm">
              <div className="flex flex-col gap-[0.75rem]">
                {primaryStat.value ? (
                  <span className="text-[clamp(3.75rem,8vw,4.5rem)] font-bold leading-none tracking-[-0.05em] text-[var(--color-accent)]">
                    {primaryStat.value}
                  </span>
                ) : null}

                <div className="flex flex-col gap-[0.25rem]">
                  {primaryStat.label ? (
                    <h3 className="text-[1.5rem] font-bold leading-[1.2] text-[var(--color-text-inverse)]">
                      {primaryStat.label}
                    </h3>
                  ) : null}

                  {primaryStat.description ? (
                    <p className="text-[1rem] leading-[1.7] text-white/75">
                      {primaryStat.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {secondaryStats.length > 0 ? (
            <div className="grid gap-[1.5rem] md:grid-cols-2">
              {secondaryStats.map((item, index) => (
                <div
                  key={item.label || index}
                  className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-[1.5rem] backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-[0.5rem]">
                    {item.value ? (
                      <span className="text-[clamp(2.25rem,5vw,3rem)] font-bold leading-none tracking-[-0.04em] text-[var(--color-accent)]">
                        {item.value}
                      </span>
                    ) : null}

                    {item.label ? (
                      <h3 className="text-[1.25rem] font-bold leading-[1.2] text-[var(--color-text-inverse)]">
                        {item.label}
                      </h3>
                    ) : null}

                    {item.description ? (
                      <p className="text-[0.95rem] leading-[1.6] text-white/70">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSplitHighlight;