"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Info, Search } from "lucide-react";

import { Button } from "@/components/ui/actions/Button";
import { Accordion } from "@/components/ui/disclosure/Accordion";
import { ProductDetailModal } from "@/components/sections/products/ProductDetailModal";
import { ProductGrid } from "@/components/sections/products/ProductGrid";
import { OutOfStockBadge } from "@/components/sections/products/OutOfStockBadge";
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

// A partir de cuántos items tiene sentido separar en destacados+acordeón
// en vez de mostrar todo en una sola grilla (2026-08-29). Con catálogos
// chicos (otro rubro, pocos productos) el acordeón solo agrega un click
// extra sin resolver nada — se mantiene el comportamiento anterior (todo
// en grilla) hasta que de verdad haga falta.
const ACCORDION_THRESHOLD = 4;

function matchesQuery(item, normalizedQuery) {
  if (!normalizedQuery) return true;
  return [item?.title, item?.description, item?.category]
    .filter(Boolean)
    .some((field) => field.toLowerCase().includes(normalizedQuery));
}

/**
 * Reparte `items` en { featured, rest } para el modo "browse" (sin
 * búsqueda activa). `featured` prioriza los items marcados
 * `item.featured === true` en la Data (curado a mano, ver
 * seed_eurocentro.py FEATURED_ITEM_INDEXES) — si ninguno viene marcado
 * (sitio/instancia que no usa esa convención todavía), cae a los
 * primeros 4 del listado en vez de no mostrar destacados, para que el
 * layout funcione igual sin curación previa.
 */
function splitFeatured(items) {
  if (items.length <= ACCORDION_THRESHOLD) {
    return { featured: items, rest: [] };
  }
  const marked = items.filter((item) => item?.featured === true).slice(0, 4);
  const featured = marked.length > 0 ? marked : items.slice(0, 4);
  const rest = items.filter((item) => !featured.includes(item));
  return { featured, rest };
}

export function PartsGallery({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [query, setQuery] = useState("");

  // Hooks (useState/useMemo/useCatalogOverlay) tienen que correr siempre
  // en el mismo orden en cada render -- por eso `items`/derivados se
  // calculan con fallback seguro ANTES del early return de abajo, en vez
  // de después (que rompería react-hooks/rules-of-hooks apenas `data`
  // sea null/disabled).
  //
  // Fase 5.3: `data.items` ya viene con el catálogo real (mapeado desde
  // `Product`, Fase 3/6) para visitantes anónimos -- lo puso ahí
  // `productos/[categoria]/page.js` en el servidor (SSR, sin precio,
  // cacheado por ISR). `useCatalogOverlay` toma esos items como base y
  // les aplica, 100% client-side, lo que el servidor no puede saber:
  // precio real (si hay sesión de cliente aprobada) y filtro por el
  // vehículo elegido en `VehicleSelector` (universal-o-vehículo-exacto,
  // ver docstring del hook).
  const { items } = useCatalogOverlay({
    baseItems: data?.items || [],
    categoryNodeId: data?.meta?.categoryNodeId || null,
  });
  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const searchResults = useMemo(
    () => (isSearching ? items.filter((item) => matchesQuery(item, normalizedQuery)) : []),
    [isSearching, items, normalizedQuery]
  );

  const { featured, rest } = useMemo(() => splitFeatured(items), [items]);

  if (!data || !data.enabled) return null;

  const { content, actions, meta } = data;
  const supportsModal = meta?.supportsModal === true;

  const bg = resolveBackground(data, { defaultSurfaceFallback: "gradient-soft" });
  const tone = resolveTone(data, bg);
  const { titleSize, descriptionSize } = resolveTypography(data);
  // Mismo patrón que `services/services-detail-cards` y `product-cards`
  // (meta.whatsappNumber vive en la Section, no en site.data.js global).
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
          "section-container relative flex w-full flex-col gap-10",
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

        <VehicleSelector className="mx-auto w-full max-w-3xl" />

        {items.length > ACCORDION_THRESHOLD && (
          <div className="mx-auto w-full max-w-xl">
            <label className="relative block">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-[1.1rem] w-[1.1rem] -translate-y-1/2 text-[var(--color-text-soft)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar en esta categoría..."
                className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-white)] py-3 pl-11 pr-4 text-[0.95rem] text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)]"
              />
            </label>
          </div>
        )}

        {isSearching ? (
          searchResults.length > 0 ? (
            <ProductGrid
              items={searchResults}
              supportsModal={supportsModal}
              onSelect={setSelectedItem}
            />
          ) : (
            <p className="text-center text-[0.95rem] text-[var(--color-text-soft)]">
              No se encontraron productos para &quot;{query}&quot;.
            </p>
          )
        ) : (
          <>
            {featured.length > 0 && (
              <ProductGrid
                items={featured}
                supportsModal={supportsModal}
                onSelect={setSelectedItem}
              />
            )}

            {rest.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[1.1rem] font-bold text-[var(--color-primary)]">
                  Todos los productos ({rest.length})
                </h3>
                <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-white)] px-5">
                  <Accordion
                    items={rest}
                    allowMultiple
                    renderHeader={(item) => (
                      <div className="flex flex-1 items-center gap-4">
                        {item?.image && (
                          <img
                            src={item.image}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-bg-soft)] object-contain p-1"
                          />
                        )}
                        <div className="flex flex-1 flex-col gap-1 text-left">
                          <span className="font-bold text-[var(--color-primary)]">
                            {item.title}
                          </span>
                          {item?.category && (
                            <span className="text-[0.75rem] uppercase tracking-[0.06em] text-[var(--color-text-soft)]">
                              {item.category}
                            </span>
                          )}
                          {item?.isOutOfStock && <OutOfStockBadge />}
                        </div>
                        {item?.price && (
                          <span className="shrink-0 font-bold text-[var(--color-text)]">
                            {item.price}
                          </span>
                        )}
                      </div>
                    )}
                    renderContent={(item) => (
                      <div className="flex flex-col gap-3 py-3 pl-16">
                        {item?.description && (
                          <p className="text-[0.9rem] leading-6 text-[var(--color-text-soft)]">
                            {item.description}
                          </p>
                        )}

                        {supportsModal && item?.details && (
                          <Button
                            variant="primary"
                            onClick={() => setSelectedItem(item)}
                            className="w-fit"
                          >
                            <Info className="h-[1rem] w-[1rem]" aria-hidden="true" />
                            Ver detalle
                          </Button>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {!isSearching && actions?.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {actions.map((action, index) => (
              <Button key={index} href={action.href} variant={action.variant || "primary"}>
                {action.label}
              </Button>
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

export default PartsGallery;
