"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

import { Card } from "@/components/ui/content/Card";
import { Heading } from "@/components/ui/content/Heading";
import { Text } from "@/components/ui/content/Text";
import { MediaFrame } from "@/components/ui/content/MediaFrame";
import { SectionHeader } from "@/components/ui/content/SectionHeader";

import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
} from "@/lib/sections/sectionStyle";

/**
 * Extrae el prefijo de título profesional (ej. "CPA.", "ABG.", "TGL.") del
 * campo `name`, separando el primer token si contiene un punto.
 * Si no se puede separar limpio, retorna el nombre completo sin badge
 * (fallback seguro).
 */
function extractCredential(fullName) {
  const trimmed = (fullName || "").trim();
  if (!trimmed) return { badge: null, name: "" };

  const spaceIndex = trimmed.indexOf(" ");
  if (spaceIndex === -1) return { badge: null, name: trimmed };

  const firstToken = trimmed.slice(0, spaceIndex);
  if (firstToken.includes(".")) {
    return {
      badge: firstToken,
      name: trimmed.slice(spaceIndex + 1).trim(),
    };
  }

  return { badge: null, name: trimmed };
}

/**
 * Normaliza un número de teléfono ecuatoriano a un href `tel:` válido,
 * anteponiendo +593 cuando el número empieza en 0.
 */
function toTelHref(phone) {
  if (!phone) return null;
  const digits = phone.replace(/[\s-]/g, "");
  if (!digits) return null;
  if (digits.startsWith("0")) {
    return `tel:+593${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}

export function TeamMemberGrid({ data }) {
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
          "section-container relative flex w-full flex-col gap-10",
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

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-[1.5rem] sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const { badge, name } = extractCredential(item.name);
              const telHref = toTelHref(item.phone);
              const mailHref = item.email ? `mailto:${item.email}` : null;

              return (
                <motion.article
                  key={item.name || index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ ...defaultTransition, delay: index * 0.08 }}
                >
                  <Card
                    surface="base"
                    padding="none"
                    radius="lg"
                    shadow="sm"
                    border
                    className="flex h-full flex-col overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                  >
                    {item.image?.src ? (
                      <div className="overflow-hidden rounded-t-[var(--radius-lg)]">
                        <MediaFrame
                          type="image"
                          src={item.image.src}
                          alt={item.image.alt || item.name || ""}
                          ratio="portrait"
                          fit="cover"
                          radius="none"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                    ) : null}

                    <div className="flex flex-1 flex-col gap-[0.85rem] p-[1.5rem]">
                      <div className="flex flex-col gap-[0.45rem]">
                        {badge ? (
                          <span className="inline-flex w-fit items-center rounded-[var(--radius-pill)] border border-[var(--color-accent)] px-[0.6rem] py-[0.2rem] text-[0.7rem] font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">
                            {badge}
                          </span>
                        ) : null}

                        <Heading as="h3" level="h5" tone="primary">
                          {name}
                        </Heading>
                      </div>

                      {item.role ? (
                        <Text
                          as="span"
                          size="sm"
                          tone="muted"
                          className="uppercase tracking-[0.06em]"
                        >
                          {item.role}
                        </Text>
                      ) : null}

                      <div className="mt-[0.4rem] flex flex-col gap-[0.5rem] border-t border-[var(--color-border)] pt-[0.9rem]">
                        {telHref ? (
                          <a
                            href={telHref}
                            className="flex items-center gap-[0.5rem] text-[var(--color-text-soft)] transition-colors duration-200 hover:text-[var(--color-accent)] hover:underline"
                          >
                            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <Text as="span" size="sm" tone="muted">
                              {item.phone}
                            </Text>
                          </a>
                        ) : null}

                        {mailHref ? (
                          <a
                            href={mailHref}
                            className="flex items-center gap-[0.5rem] text-[var(--color-text-soft)] transition-colors duration-200 hover:text-[var(--color-accent)] hover:underline"
                          >
                            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <Text as="span" size="sm" tone="muted">
                              {item.email}
                            </Text>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                </motion.article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default TeamMemberGrid;
