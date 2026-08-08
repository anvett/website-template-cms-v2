"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/content/Card";
import { Heading } from "@/components/ui/content/Heading";
import { Text } from "@/components/ui/content/Text";
import { InfoItem } from "@/components/ui/content/InfoItem";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import {
  getSpacingClass,
  getContainerClass,
  resolveTypography,
  getTitleLevel,
  getDescriptionTextSize,
} from "@/lib/sections/sectionStyle";

export function FeaturesTwoColumnsGradientImage({ data }) {
  if (!data || !data.enabled) return null;

  const { content, media, items } = data;
  const sectionBackground = data.background || {};
  const background = media?.background;

  const hasImage = sectionBackground.type === "image" && Boolean(background?.src);

  const overlayEnabled = data.meta?.overlay ?? background?.overlay ?? true;
  const overlayOpacity = data.meta?.overlayOpacity ?? 0.62;

  // Variant siempre con fondo oscuro por diseño; tone por defecto
  // "inverse", overrideable por instancia vía meta.tone.
  const tone = data.meta?.tone || "inverse";
  const { titleSize, descriptionSize } = resolveTypography(data);

  // Sin imagen usa el gradiente oscuro oficial (gradient-dark) o
  // gradient-soft si se pide.
  const backgroundFallbackClass =
    sectionBackground.type === "gradient" && sectionBackground.variant === "soft"
      ? "gradient-soft-inverse"
      : "gradient-dark";

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative overflow-hidden text-[var(--color-text-inverse)]",
        getSpacingClass(data.spacing),
        hasImage ? "" : backgroundFallbackClass,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Background */}
      {hasImage ? (
        <img
          src={background.src}
          alt={background.alt || ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      {(!hasImage || overlayEnabled) ? (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: hasImage ? overlayOpacity : 0.62 }}
          aria-hidden="true"
        />
      ) : null}

      {/* Layout */}
      <div
        className={[
          "section-container relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16",
          getContainerClass(data.containerWidth) || "section-container--wide",
        ]
          .filter(Boolean)
          .join(" ")}
      >

        {/* Columna izquierda — header sticky */}
        <motion.div
          className="flex flex-col gap-5 lg:sticky lg:top-28"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <Text
              size="sm"
              tone="accent"
              className="font-bold uppercase tracking-[0.16em]"
            >
              {content.eyebrow}
            </Text>
          )}

          {content?.title && (
            <Heading
              as="h2"
              level={getTitleLevel(titleSize) || "h2"}
              tone={tone}
              className={titleSize ? "" : "text-[clamp(2rem,5vw,3.7rem)] leading-[1.06] tracking-[-0.04em]"}
            >
              {content.title}
            </Heading>
          )}

          {content?.description && (
            <Text
              size={getDescriptionTextSize(descriptionSize) || "lg"}
              tone={tone}
              className="max-w-xl opacity-80 leading-8"
            >
              {content.description}
            </Text>
          )}
        </motion.div>

        {/* Columna derecha — grid de features */}
        {items?.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="h-full"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ ...defaultTransition, delay: index * 0.06 }}
              >
                <Card
                  as="article"
                  surface="base"
                  padding="md"
                  radius="xl"
                  shadow="sm"
                  className="h-full"
                >
                  <InfoItem
                    icon={CheckCircle2}
                    showIcon={true}
                    title={item?.title}
                    description={item?.description}
                    direction="vertical"
                    align="left"
                    size="md"
                    tone="accent"
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturesTwoColumnsGradientImage;
