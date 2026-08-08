"use client";

import { motion } from "framer-motion";

import { Heading } from "@/components/ui/content/Heading";
import { Text } from "@/components/ui/content/Text";
import { StatItem } from "@/components/ui/content/StatItem";
import { Card } from "@/components/ui/content/Card";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
  resolveTypography,
  getTitleLevel,
  getDescriptionTextSize,
} from "@/lib/sections/sectionStyle";

export function StatsSplitHighlight({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const items = data.items || [];

  const primaryStat = items[0];
  const secondaryStats = items.slice(1);

  const bg = resolveBackground(data, { defaultSurfaceFallback: "gradient-dark" });
  // Esta variant siempre usa fondo oscuro por diseño (gradiente o imagen);
  // meta.tone permite forzar otro tono si una instancia lo necesita.
  const tone = data.meta?.tone || "inverse";
  const { titleSize, descriptionSize } = resolveTypography(data);

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative overflow-hidden text-[var(--color-text-inverse)]",
        getSpacingClass(data.spacing),
        bg.hasImage ? "bg-[var(--color-bg-dark)]" : bg.surfaceClass,
      ]
        .filter(Boolean)
        .join(" ")}
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

      <div
        className={[
          "section-container relative grid gap-[3.5rem] lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-[5rem]",
          getContainerClass(data.containerWidth) || "section-container--wide",
        ]
          .filter(Boolean)
          .join(" ")}
      >

        {/* Columna izquierda — header */}
        <motion.div
          className="flex flex-col gap-[1.25rem]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {content.eyebrow && (
            <Text
              size="sm"
              tone="accent"
              className="font-bold uppercase tracking-[0.08em]"
            >
              {content.eyebrow}
            </Text>
          )}

          {content.title && (
            <Heading
              as="h2"
              level={getTitleLevel(titleSize) || "h2"}
              tone={tone}
              className={titleSize ? "" : "text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.045em]"}
            >
              {content.title}
            </Heading>
          )}

          {content.description && (
            <Text
              size={getDescriptionTextSize(descriptionSize) || "lg"}
              tone={tone}
              className="max-w-[42rem] opacity-80"
            >
              {content.description}
            </Text>
          )}
        </motion.div>

        {/* Columna derecha — stats */}
        <motion.div
          className="grid gap-[1.5rem]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
        >
          {/* Stat principal */}
          {primaryStat && (
            <Card
              surface="base"
              padding="lg"
              radius="xl"
              shadow="none"
              border={false}
              className="border border-white/15 bg-white/10 backdrop-blur-sm"
            >
              <StatItem
                value={primaryStat.value}
                label={primaryStat.label}
                description={primaryStat.description}
                size="lg"
                tone="strong"
                align="left"
              />
            </Card>
          )}

          {/* Stats secundarias */}
          {secondaryStats.length > 0 && (
            <div className="grid gap-[1.5rem] md:grid-cols-2">
              {secondaryStats.map((item, index) => (
                <Card
                  key={item.label || index}
                  surface="base"
                  padding="md"
                  radius="xl"
                  shadow="none"
                  border={false}
                  className="border border-white/15 bg-white/10 backdrop-blur-sm"
                >
                  <StatItem
                    value={item.value}
                    label={item.label}
                    description={item.description}
                    size="md"
                    tone="strong"
                    align="left"
                  />
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSplitHighlight;
