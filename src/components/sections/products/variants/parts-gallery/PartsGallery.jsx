"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/actions/Button";
import { Modal } from "@/components/ui/feedback/Modal";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";

export function PartsGallery({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (!data || !data.enabled) return null;

  const { content, items, actions, meta } = data;
  const supportsModal = meta?.supportsModal === true;

  return (
    <section className="gradient-soft py-[var(--section-spacing)] text-[var(--color-text)]">
      <div className="mx-auto flex w-full max-w-[var(--container-width-wide)] flex-col gap-12 px-[var(--container-padding)]">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={defaultTransition}
        >
          {content?.eyebrow && (
            <p className="section-eyebrow">{content.eyebrow}</p>
          )}

          {content?.title && (
            <h2 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--color-primary)]">
              {content.title}
            </h2>
          )}

          {content?.description && (
            <p className="max-w-2xl text-[1.1rem] leading-8 text-[var(--color-text-soft)]">
              {content.description}
            </p>
          )}
        </motion.div>

        {items?.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => (
              <motion.article
                key={index}
                className="group overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  ...defaultTransition,
                  delay: index * 0.025,
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  {item?.image && (
                    <img
                      src={item.image}
                      alt={item.title || ""}
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  {item?.category && (
                    <span className="absolute left-3 top-3 rounded-[var(--radius-pill)] bg-[var(--color-primary)] px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[var(--color-text-inverse)]">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4 p-5">
                  <div className="flex flex-col gap-2">
                    {item?.price && (
                      <p className="text-[1.25rem] font-bold text-[var(--color-text)]">
                        {item.price}
                      </p>
                    )}

                    {item?.title && (
                      <h3 className="text-[1.125rem] font-bold leading-tight text-[var(--color-primary)]">
                        {item.title}
                      </h3>
                    )}

                    {item?.description && (
                      <p className="text-[0.9rem] leading-6 text-[var(--color-text-soft)]">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {supportsModal && item?.details && (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-4 text-[0.9rem] font-bold text-[var(--color-primary)] transition hover:border-[var(--color-primary)]"
                    >
                      <Info className="h-[1rem] w-[1rem]" aria-hidden="true" />
                      Ver detalle
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {actions?.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {actions.map((action, index) => (
              <Button
                key={index}
                href={action.href}
                variant={action.variant || "primary"}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <PartDetailsModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}

function PartDetailsModal({ item, isOpen, onClose }) {
  const details = item?.details;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={details?.title || item?.title}
      description={item?.price ? `Precio referencial: ${item.price}` : ""}
      size="md"
    >
      <div className="flex flex-col gap-5">
        {item?.image && (
          <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-soft)]">
            <img
              src={item.image}
              alt={item.title || ""}
              className="max-h-[280px] w-full object-contain p-4"
            />
          </div>
        )}

        {details?.description && (
          <p className="text-[1rem] leading-7 text-[var(--color-text-soft)]">
            {details.description}
          </p>
        )}

        {details?.compatibility && (
          <div>
            <h4 className="font-bold text-[var(--color-primary)]">
              Compatibilidad
            </h4>
            <p className="mt-1 text-[0.9rem] leading-6 text-[var(--color-text-soft)]">
              {details.compatibility}
            </p>
          </div>
        )}

        {details?.notes && (
          <div>
            <h4 className="font-bold text-[var(--color-primary)]">Notas</h4>
            <p className="mt-1 text-[0.9rem] leading-6 text-[var(--color-text-soft)]">
              {details.notes}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default PartsGallery;