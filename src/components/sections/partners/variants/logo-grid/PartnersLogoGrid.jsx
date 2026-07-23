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
import styles from "./PartnersLogoGrid.module.css";

function PartnerLogo({ item, index, duplicate }) {
  if (!item.logo?.src) return null;

  return (
    <div
      key={`${item.name || index}-${duplicate ? "dup" : "orig"}`}
      className="flex shrink-0 items-center justify-center px-5"
      aria-hidden={duplicate || undefined}
    >
      <Image
        src={item.logo.src}
        alt={duplicate ? "" : item.logo.alt || item.name || ""}
        width={160}
        height={64}
        className="h-10 w-auto object-contain md:h-14"
      />
    </div>
  );
}

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
            {/* Slide animado continuo: la lista se duplica para crear un loop
                sin costura (translateX de -50% = ancho exacto de un set). */}
            <div
              className={styles.marqueeViewport}
              aria-label="Aseguradoras aliadas de Kautela"
            >
              <div className={styles.marqueeTrack}>
                {items.map((item, index) => (
                  <PartnerLogo key={`orig-${item.name || index}`} item={item} index={index} duplicate={false} />
                ))}
                {items.map((item, index) => (
                  <PartnerLogo key={`dup-${item.name || index}`} item={item} index={index} duplicate={true} />
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export default PartnersLogoGrid;
