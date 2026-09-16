"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { ProductDetailModal } from "@/components/sections/products/ProductDetailModal";
import { ProductGrid } from "@/components/sections/products/ProductGrid";
import { VehicleSelector } from "@/components/global/VehicleSelector";
import { useCatalogOverlay } from "@/lib/storefront/useCatalogOverlay";
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

/**
 * Variant `products/catalog-search` (2026-08-29) — buscador de la página
 * principal de Productos, a pedido del dueño del proyecto: "la página
 * principal de productos debe tener un buscador" que busque en TODO el
 * catálogo, no solo en los destacados.
 *
 * Diferencia clave con el resto del catálogo de Sections: `data.items`
 * acá NO viene de un único Section guardado en el backend (a diferencia
 * de cualquier otra Variant) -- lo arma `src/app/productos/page.js`
 * juntando los items de las Page de cada categoría (fetch server-side,
 * ver esa Page para el detalle) y se lo pasa a esta Section sintética.
 * El componente en sí no lo sabe ni le importa: recibe `content`/`items`/
 * `meta` con exactamente la misma forma que cualquier otra Section Data
 * (CLAUDE.md, contrato oficial) -- la agregación es una responsabilidad
 * de la capa Page, no de esta Variant.
 *
 * Sin resultados de búsqueda visibles por default (con ~90 productos,
 * mostrar todo de entrada sería redundante con "Productos destacados" y
 * "Explora por categoría" que ya están más abajo en la misma página) --
 * solo se muestra una grilla cuando hay texto de búsqueda.
 *
 * **Selector de vehículo (2026-09-04, pedido explícito del dueño del
 * proyecto):** embebido acá, arriba del buscador -- es la única pantalla
 * de catálogo con buscador global, así que es el lugar natural para
 * filtrar por vehículo antes de escribir. Reusa `useCatalogOverlay`
 * (mismo hook que `PartsGallery`) sin `categoryNodeId` -- sin eso el
 * overlay de precio se omite en silencio (no hay un único nodo de
 * categoría en esta página agregadora), pero el filtro universal-o-
 * vehículo-exacto sí aplica igual, es 100% en memoria sobre los items ya
 * recibidos. El hook ya estaba pensado para esto (ver su propio
 * docstring, "PartsGallery/ProductCards/CatalogSearch"), solo faltaba
 * conectarlo acá.
 */
export function CatalogSearch({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [query, setQuery] = useState("");

  const { items } = useCatalogOverlay({
    baseItems: data?.items || [],
    categoryNodeId: null,
  });
  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const results = useMemo(() => {
    if (!isSearching) return [];
    return items.filter((item) =>
      [item?.title, item?.description, item?.category]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(normalizedQuery))
    );
  }, [isSearching, items, normalizedQuery]);

  if (!data || !data.enabled) return null;

  const { content, meta } = data;
  const supportsModal = meta?.supportsModal === true;
  const whatsappNumber = meta?.whatsappNumber || "";

  const bg = resolveBackground(data, { defaultSurfaceFallback: "surface-base" });
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
          "section-container relative flex w-full flex-col gap-8",
          getContainerClass(data.containerWidth) || "section-container--wide",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          className="mx-auto flex w-full max-w-2xl flex-col items-center gap-5 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
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
            <h2 className={["text-balance", getTitleSizeClass(titleSize) || "text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em]", getToneTextClass(tone, "title")].join(" ")}>
              {content.title}
            </h2>
          )}

          {content?.description && (
            <p className={[getDescriptionSizeClass(descriptionSize) || "text-[1.05rem] leading-8", getToneTextClass(tone, "description")].join(" ")}>
              {content.description}
            </p>
          )}

          <VehicleSelector className="w-full max-w-3xl" />

          <label className="relative block w-full max-w-xl">
            <Search
              className="pointer-events-none absolute left-5 top-1/2 h-[1.25rem] w-[1.25rem] -translate-y-1/2 text-[var(--color-text-soft)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                items.length > 0
                  ? `Buscar entre ${items.length} productos...`
                  : "Buscar productos..."
              }
              className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] py-4 pl-14 pr-5 text-[1rem] text-[var(--color-text)] shadow-[var(--shadow-sm)] outline-none transition focus:border-[var(--color-primary)]"
            />
          </label>
        </motion.div>

        {isSearching && (
          results.length > 0 ? (
            <ProductGrid
              items={results}
              supportsModal={supportsModal}
              onSelect={setSelectedItem}
            />
          ) : (
            <p className="text-center text-[0.95rem] text-[var(--color-text-soft)]">
              No se encontraron productos para &quot;{query}&quot;.
            </p>
          )
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

export default CatalogSearch;
