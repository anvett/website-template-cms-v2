"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/actions/Button";
import { ProductDetailModal } from "@/components/sections/products/ProductDetailModal";
import { fadeUp } from "@/lib/motion/presets";
import { defaultTransition } from "@/lib/motion/transitions";
import { useCart } from "@/lib/storefront/CartContext";
import { isStorefrontEnabled } from "@/lib/storefront/env";
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
  const { addItem } = useCart();
  const cartEnabled = isStorefrontEnabled();

  if (!data || !data.enabled) return null;

  const { content, items, actions, meta } = data;
  const supportsModal = meta?.supportsModal === true;

  const bg = resolveBackground(data, { defaultSurfaceFallback: "gradient-soft" });
  const tone = resolveTone(data, bg);
  const { titleSize, descriptionSize } = resolveTypography(data);
  // Mismo patrón que `services/services-detail-cards` (meta.whatsappNumber,
  // ver src/components/sections/services/variants/services-detail-cards):
  // el número vive en el meta de esta Section, no en site.data.js global —
  // evita que este componente (Client Component, reutilizado por
  // cualquier instancia) tenga que decidir entre Data estático o CMS.
  const whatsappNumber = data.meta?.whatsappNumber || "";

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
                      <Button
                        variant="primary"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Info className="h-[1rem] w-[1rem]" aria-hidden="true" />
                        Ver detalles
                      </Button>
                    )}

                    {cartEnabled && item?.title && (
                      <Button variant="outline" onClick={() => addItem(item)}>
                        <ShoppingCart className="h-[1rem] w-[1rem]" aria-hidden="true" />
                        Agregar al carrito
                      </Button>
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

      <ProductDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        whatsappNumber={whatsappNumber}
      />
    </section>
  );
}

export default ProductCards;