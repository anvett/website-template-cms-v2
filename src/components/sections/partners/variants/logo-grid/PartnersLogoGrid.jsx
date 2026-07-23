"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/content/SectionHeader";
import Divider from "@/components/ui/structure/Divider";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
} from "@/lib/sections/sectionStyle";

export function PartnersLogoGrid({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const items = data.items || [];

  const bg = resolveBackground(data, { defaultSurfaceFallback: "surface-base" });

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative isolate w-full overflow-hidden",
        getSpacingClass(data.spacing),
        bg.hasImage ? "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]" : bg.surfaceClass,
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
          "section-container relative flex w-full flex-col gap-8",
          getContainerClass(data.containerWidth) || "section-container--wide",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="mx-auto w-full max-w-[760px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={defaultTransition}
        >
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
          />
        </motion.div>

        <Divider tone="subtle" space="sm" className="w-full" />

        {items.length > 0 ? (
          <motion.div
            className="w-full"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={defaultTransition}
          >
            {/* Mobile: horizontal scroll row, no visible scrollbar */}
            <div className="flex snap-x snap-mandatory gap-x-10 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
              {items.map((item, index) => (
                <motion.div
                  key={item.name || index}
                  className="flex shrink-0 snap-start items-center justify-center"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ ...defaultTransition, delay: index * 0.03 }}
                >
                  {item.logo?.src ? (
                    <Image
                      src={item.logo.src}
                      alt={item.logo.alt || item.name || ""}
                      width={160}
                      height={64}
                      className="h-10 w-auto object-contain grayscale-0"
                    />
                  ) : null}
                </motion.div>
              ))}
            </div>

            {/* Tablet/desktop: static grid, no scroll */}
            <div className="hidden grid-cols-3 items-center justify-items-center gap-x-10 gap-y-8 md:grid md:grid-cols-5">
              {items.map((item, index) => (
                <motion.div
                  key={item.name || index}
                  className="flex items-center justify-center"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ ...defaultTransition, delay: index * 0.03 }}
                >
                  {item.logo?.src ? (
                    <Image
                      src={item.logo.src}
                      alt={item.logo.alt || item.name || ""}
                      width={160}
                      height={64}
                      className="h-10 w-auto object-contain grayscale-0 md:h-14"
                    />
                  ) : null}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export default PartnersLogoGrid;
