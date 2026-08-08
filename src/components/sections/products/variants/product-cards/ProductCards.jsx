"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/actions/Button";
import { Modal } from "@/components/ui/feedback/Modal";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import {
  getSpacingClass,
  getContainerClass,
  resolveBackground,
  resolveTone,
  getToneTextClass,
  getToneCssColor,
  resolveTypography,
  getTitleSizeClass,
  getDescriptionSizeClass,
} from "@/lib/sections/sectionStyle";

export function ProductCards({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (!data || !data.enabled) return null;

  const { content, items, actions, meta } = data;
  const supportsModal = meta?.supportsModal === true;

  const bg = resolveBackground(data, { defaultSurfaceFallback: "gradient-soft" });
  const tone = resolveTone(data, bg);
  const { titleSize, descriptionSize } = resolveTypography(data);

  return (
    <section
      id={data.id}
      className={[
        "section-shell relative overflow-hidden text-[var(--color-text)]",
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
          "section-container relative flex w-full flex-col gap-12",
          getContainerClass(data.containerWidth) || "section-container--wide",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <p
              className="section-eyebrow"
              style={{ "--section-eyebrow-color": getToneCssColor(tone, "eyebrow") }}
            >
              {content.eyebrow}
            </p>
          )}

          {content?.title && (
            <h2 className={["text-balance", getTitleSizeClass(titleSize) || "text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.04em]", getToneTextClass(tone, "title")].join(" ")}>
              {content.title}
            </h2>
          )}

          {content?.description && (
            <p className={["max-w-2xl", getDescriptionSizeClass(descriptionSize) || "text-[1.1rem] leading-8", getToneTextClass(tone, "description")].join(" ")}>
              {content.description}
            </p>
          )}
        </motion.div>

        {items?.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => (
              <motion.article
                key={index}
                className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  ...defaultTransition,
                  delay: index * 0.06,
                }}
              >
                {item?.image && (
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--color-bg-soft)]">
                    <img
                      src={item.image}
                      alt={item.title || ""}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="flex flex-col gap-3">
                    {item?.price && (
                      <p className="text-[1.5rem] font-bold text-[var(--color-text)]">
                        {item.price}
                      </p>
                    )}

                    {item?.title && (
                      <h3 className="section-card-title">{item.title}</h3>
                    )}

                    {item?.description && (
                      <p className="section-card-text">{item.description}</p>
                    )}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-2">
                    {supportsModal && item?.details && (
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-5 text-[0.9rem] font-bold text-[var(--color-primary)] transition hover:border-[var(--color-primary)]"
                      >
                        <Info className="h-[1rem] w-[1rem]" aria-hidden="true" />
                        Ver detalles
                      </button>
                    )}

                    {actions?.[0]?.href && (
                      <Button
                        href={actions[0].href}
                        variant={actions[0].variant || "primary"}
                      >
                        {actions[0].label}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <ProductDetailsModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}

function ProductDetailsModal({ item, isOpen, onClose }) {
  const details = item?.details;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={details?.title || item?.title}
      description={item?.price ? `Precio referencial: ${item.price}` : ""}
      size="lg"
    >
      <div className="flex flex-col gap-5">
        {item?.image && (
          <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)]">
            <img
              src={item.image}
              alt={item.title || ""}
              className="max-h-[320px] w-full object-cover"
            />
          </div>
        )}

        {details?.description && (
          <p className="text-[1rem] leading-7 text-[var(--color-text-soft)]">
            {details.description}
          </p>
        )}

        {details?.includes?.length > 0 && (
          <DetailList title="Incluye" items={details.includes} />
        )}

        {details?.specifications?.length > 0 && (
          <DetailList title="Especificaciones" items={details.specifications} />
        )}

        {details?.recommendedFor && (
          <DetailBlock title="Recomendado para" text={details.recommendedFor} />
        )}

        {details?.warranty && (
          <DetailBlock title="Garantía" text={details.warranty} />
        )}
      </div>
    </Modal>
  );
}

function DetailList({ title, items }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-bold text-[var(--color-primary)]">{title}</h4>
      <ul className="list-disc space-y-1 pl-5 text-[0.9rem] leading-6 text-[var(--color-text-soft)]">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function DetailBlock({ title, text }) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="font-bold text-[var(--color-primary)]">{title}</h4>
      <p className="text-[0.9rem] leading-6 text-[var(--color-text-soft)]">
        {text}
      </p>
    </div>
  );
}

export default ProductCards;