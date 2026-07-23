"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/content/Card";
import { Heading } from "@/components/ui/content/Heading";
import { Text } from "@/components/ui/content/Text";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import { getSpacingClass, getContainerClass } from "@/lib/sections/sectionStyle";

export function FeaturesProcessSteps({ data }) {
  if (!data || !data.enabled) return null;

  const { content, media, items } = data;
  const sectionBackground = data.background || {};
  const background = media?.background;

  const hasImage = sectionBackground.type === "image" && Boolean(background?.src);

  const overlayEnabled = data.meta?.overlay ?? background?.overlay ?? true;
  const overlayOpacity = data.meta?.overlayOpacity ?? 0.45;

  // Esta variant siempre usa texto claro (tone="inverse") por diseño, por
  // lo que el fondo soportado es imagen o gradiente oscuro; si se define
  // background.type="surface" se mantiene el degradado oscuro por defecto
  // para no romper el contraste de texto.
  const backgroundFallbackClass =
    sectionBackground.type === "gradient" && sectionBackground.variant === "soft"
      ? "gradient-soft-inverse"
      : "bg-[linear-gradient(135deg,var(--color-primary),var(--color-bg-dark))]";

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative overflow-hidden bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]",
        getSpacingClass(data.spacing),
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
      ) : (
        <div className={`absolute inset-0 ${backgroundFallbackClass}`} />
      )}
      {(!hasImage || overlayEnabled) ? (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: hasImage ? overlayOpacity : 0.45 }}
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
              level="h2"
              tone="inverse"
              className="text-[clamp(2rem,5vw,3.7rem)] leading-[1.06] tracking-[-0.04em]"
            >
              {content.title}
            </Heading>
          )}

          {content?.description && (
            <Text
              size="lg"
              tone="inverse"
              className="max-w-xl opacity-80 leading-8"
            >
              {content.description}
            </Text>
          )}
        </motion.div>

        {/* Columna derecha — pasos */}
        {items?.length > 0 && (
          <div className="relative flex flex-col gap-5">
            <div className="absolute bottom-6 left-6 top-6 hidden w-px bg-white/12 md:block" />

            {items.map((item, index) => (
              <motion.div
                key={index}
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
                  className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-5"
                >
                  {/* Ícono de paso */}
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-primary)] text-[var(--color-text-inverse)]">
                    <CheckCircle2 className="size-5" aria-hidden="true" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Text
                      size="sm"
                      tone="primary"
                      className="font-bold uppercase tracking-[0.14em]"
                    >
                      Paso {index + 1}
                    </Text>

                    {item?.title && (
                      <Heading as="h3" level="h3" tone="primary">
                        {item.title}
                      </Heading>
                    )}

                    {item?.description && (
                      <Text size="base" tone="muted">
                        {item.description}
                      </Text>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturesProcessSteps;
