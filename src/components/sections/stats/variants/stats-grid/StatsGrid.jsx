"use client";

import { motion } from "framer-motion";
import {
  resolveBackground,
  resolveTone,
  getToneCssColor,
  resolveTypography,
  getTitleSizeCssValue,
  getDescriptionSizeCssValue,
} from "@/lib/sections/sectionStyle";

export function StatsGrid({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const items = data.items || [];
  const variant = data.variant || "3-items";

  const gridClasses = {
    "3-items": "md:grid-cols-3",
    "4-items": "md:grid-cols-2 lg:grid-cols-4",
  };

  const bg = resolveBackground(data, { defaultSurfaceFallback: "gradient-dark" });
  // Esta variant siempre usa fondo oscuro por diseño (gradiente o imagen);
  // meta.tone permite forzar otro tono si una instancia lo necesita.
  const tone = data.meta?.tone || "inverse";
  const { titleSize, descriptionSize } = resolveTypography(data);

  return (
    <section
      id={data.id}
      className={[
        "section-shell section-shell--compact relative isolate overflow-hidden",
        bg.hasImage ? "bg-[var(--color-bg-dark)]" : bg.surfaceClass,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--section-title-color": getToneCssColor(tone, "title"),
        "--section-description-color": getToneCssColor(tone, "description"),
        "--section-title-size": getTitleSizeCssValue(titleSize),
        "--section-description-size": getDescriptionSizeCssValue(descriptionSize),
      }}
    >
      {bg.hasImage ? (
        <img
          src={bg.image.src}
          alt={bg.image.alt || ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {bg.hasImage && bg.overlay.enabled ? (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: bg.overlay.opacity }}
          aria-hidden="true"
        />
      ) : null}

      <div className="section-container relative">
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