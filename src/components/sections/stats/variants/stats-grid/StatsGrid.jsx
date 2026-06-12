"use client";

import { motion } from "framer-motion";

export function StatsGrid({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const items = data.items || [];
  const variant = data.variant || "3-items";

  const gridClasses = {
    "3-items": "md:grid-cols-3",
    "4-items": "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section
      id={data.id}
      className="section-shell section-shell--compact gradient-dark"
      style={{
        "--section-title-color": "var(--color-text-inverse)",
        "--section-description-color": "rgba(255,255,255,0.8)",
      }}
    >
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {content.eyebrow ? (
            <p
              className="section-eyebrow"
              style={{
                "--section-eyebrow-color": "var(--color-accent)",
              }}
            >
              {content.eyebrow}
            </p>
          ) : null}

          {content.title ? (
            <h2 className="section-title">{content.title}</h2>
          ) : null}

          {content.description ? (
            <p className="section-description">{content.description}</p>
          ) : null}
        </motion.div>

        {items.length > 0 ? (
          <div
            className={[
              "grid gap-[1.5rem]",
              gridClasses[variant] || gridClasses["3-items"],
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {items.map((item, index) => (
              <motion.article
                key={item.label || index}
                className="rounded-[var(--radius-xl)] border border-white/15 bg-white/10 p-[1.5rem] text-center backdrop-blur-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                {item.value ? (
                  <p className="text-[clamp(2.75rem,6vw,3.25rem)] font-bold leading-none tracking-[-0.04em] text-[var(--color-accent)]">
                    {item.value}
                  </p>
                ) : null}

                {item.label ? (
                  <h3 className="mt-[1rem] text-[1.15rem] font-bold leading-tight text-[var(--color-text-inverse)]">
                    {item.label}
                  </h3>
                ) : null}

                {item.description ? (
                  <p className="mt-[0.5rem] text-[0.95rem] leading-[1.6] text-white/75">
                    {item.description}
                  </p>
                ) : null}
              </motion.article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default StatsGrid;