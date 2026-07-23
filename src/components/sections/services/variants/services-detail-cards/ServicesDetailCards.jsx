"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/actions/Button";
import { Card } from "@/components/ui/content/Card";
import { Heading } from "@/components/ui/content/Heading";
import { Text } from "@/components/ui/content/Text";
import { SectionHeader } from "@/components/ui/content/SectionHeader";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
} from "@/lib/sections/sectionStyle";

/**
 * Resuelve el href del botón "Contratar" de cada item:
 * - Si el item tiene href propio (page de ramo) -> usa ese href.
 * - Si no, cae a WhatsApp con meta.whatsappNumber y un mensaje predefinido.
 */
function resolveItemHref(item, whatsappNumber) {
  if (item.href) return item.href;

  const message = item.title
    ? `Hola, deseo más información sobre ${item.title}.`
    : "Hola, deseo más información sobre este seguro.";

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function ServicesDetailCards({ data }) {
  if (!data || !data.enabled) return null;

  const content = data.content || {};
  const items = data.items || [];
  const actions = data.actions || [];
  const whatsappNumber = data.meta?.whatsappNumber || "";

  const bg = resolveBackground(data, { defaultSurfaceFallback: "surface-subtle" });

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative isolate w-full overflow-hidden px-[1.5rem] text-[var(--color-text)]",
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
          "section-container relative flex w-full flex-col gap-[3rem]",
          getContainerClass(data.containerWidth) || "section-container--wide",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="mx-auto w-full max-w-[820px]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
          />
        </motion.div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-[1rem] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => {
              const href = resolveItemHref(item, whatsappNumber);
              const details = item.details || [];

              return (
                <motion.article
                  key={item.title || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: (index % 4) * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <Card
                    surface="base"
                    padding="sm"
                    radius="lg"
                    shadow="sm"
                    border
                    className="flex h-full flex-col border-l-4 border-l-[var(--color-primary)] transition duration-200 ease-out hover:-translate-y-[2px] hover:border-l-[var(--color-accent)] hover:shadow-[var(--shadow-md)]"
                  >
                    {item.title ? (
                      <Heading
                        as="h3"
                        level="h5"
                        tone="primary"
                        align="left"
                        className="font-bold leading-tight"
                      >
                        {item.title}
                      </Heading>
                    ) : null}

                    {details.length > 0 ? (
                      <ul className="mt-[0.9rem] flex flex-col gap-[0.55rem]">
                        {details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-[0.5rem]"
                          >
                            <Check
                              className="mt-[0.15rem] h-[1rem] w-[1rem] shrink-0 text-[var(--color-accent)]"
                              aria-hidden="true"
                            />
                            <Text as="span" size="sm" tone="muted" align="left">
                              {detail}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-auto pt-[1.25rem]">
                      <Button
                        href={href}
                        variant="primary"
                        size="sm"
                        className="w-full justify-center"
                      >
                        Contratar
                      </Button>
                    </div>
                  </Card>
                </motion.article>
              );
            })}
          </div>
        ) : null}

        {actions.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-[0.875rem] sm:flex-row sm:flex-wrap">
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
      </div>
    </section>
  );
}

export default ServicesDetailCards;
