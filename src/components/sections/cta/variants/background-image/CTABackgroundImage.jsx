"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/actions/Button";

export function CTABackgroundImage({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const actions = data.actions || [];
  const background = data.media?.background;

  const overlayEnabled = data.meta?.overlay ?? background?.overlay ?? true;
  const overlayOpacity = data.meta?.overlayOpacity ?? 0.18;

  return (
    <section
      id={data.id}
      className="relative isolate flex min-h-[420px] w-full items-center overflow-hidden bg-[var(--color-bg-dark)] px-[1.5rem] py-[var(--section-spacing)] text-[var(--color-text-inverse)]"
    >
      {background?.src ? (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={background.src}
            alt={background.alt || ""}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {overlayEnabled ? (
        <div
          className="absolute inset-0 z-[1] bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      ) : null}

      <div className="relative z-[2] mx-auto w-full max-w-[var(--container-width-content)]">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {content.eyebrow ? (
            <p
              className="section-eyebrow pb-5"
              style={{ color: "var(--color-accent)" }}
            >
              {content.eyebrow}
            </p>
          ) : null}

          {content.title ? (
            <h2
              className="section-title mt-[0.75rem] pb-8"
              style={{ color: "var(--color-text-inverse)" }}
            >
              {content.title}
            </h2>
          ) : null}

          {content.description ? (
            <p
              className="section-description mt-[1rem] max-w-[42rem]"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {content.description}
            </p>
          ) : null}

          {actions.length > 0 ? (
            <div className="section-actions section-actions--center">
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
        </motion.div>
      </div>
    </section>
  );
}

export default CTABackgroundImage;
