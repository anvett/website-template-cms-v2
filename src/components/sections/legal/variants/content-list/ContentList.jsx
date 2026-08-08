// "use client";

// import { motion } from "framer-motion";

// import { Card } from "@/components/ui/content/Card";

// const surfaceClasses = {
//   base: "bg-[var(--color-bg)] text-[var(--color-text)]",
//   subtle: "bg-[var(--color-bg-soft)] text-[var(--color-text)]",
//   strong: "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]",
// };

// const gradientClasses = {
//   brand: "gradient-dark",
//   dark: "gradient-dark",
//   soft: "gradient-soft",
//   accent: "gradient-accent",
// };

// const containerClasses = {
//   content:
//     "mx-auto w-[min(calc(100%-2.5rem),var(--container-width-content))]",
//   section: "mx-auto w-[min(calc(100%-2.5rem),var(--container-width))]",
//   wide: "mx-auto w-[min(calc(100%-2.5rem),var(--container-width-wide))]",
// };

// const spacingClasses = {
//   compact: "py-[var(--section-spacing-compact)]",
//   default: "py-[var(--section-spacing)]",
//   hero: "py-[var(--section-spacing-hero)]",
// };

// function getBackgroundClasses(surface, background) {
//   if (background?.type === "gradient") {
//     return gradientClasses[background.variant] || gradientClasses.brand;
//   }

//   if (background?.type === "image") {
//     return "relative overflow-hidden text-[var(--color-text-inverse)]";
//   }

//   return surfaceClasses[surface] || surfaceClasses.base;
// }

// export function ContentList({ data }) {
//   const {
//     id,
//     surface = "base",
//     containerWidth = "content",
//     spacing = "default",
//     background = { type: "surface", variant: null },
//     content = {},
//     media = {},
//     items = [],
//   } = data;

//   const backgroundImage = media?.background?.src;

//   return (
//     <section
//       id={id}
//       className={[
//         getBackgroundClasses(surface, background),
//         spacingClasses[spacing] || spacingClasses.default,
//       ]
//         .filter(Boolean)
//         .join(" ")}
//     >
//       {background?.type === "image" && backgroundImage && (
//         <>
//           <img
//             src={backgroundImage}
//             alt={media?.background?.alt || ""}
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 bg-slate-950/70" />
//         </>
//       )}

//       <div
//         className={[
//           containerClasses[containerWidth] || containerClasses.content,
//           "relative z-10 flex flex-col gap-8",
//         ]
//           .filter(Boolean)
//           .join(" ")}
//       >
//         <div className="flex flex-col gap-4">
//           {content.eyebrow && (
//             <span className="text-[0.875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
//               {content.eyebrow}
//             </span>
//           )}

//           {content.title && (
//             <h2 className="text-[2.25rem] font-bold leading-[1.12] text-[var(--color-primary)]">
//               {content.title}
//             </h2>
//           )}

//           {content.description && (
//             <p className="text-[1.05rem] leading-[1.8] text-[var(--color-text-soft)]">
//               {content.description}
//             </p>
//           )}
//         </div>

//         {items.length > 0 && (
//           <div className="flex flex-col gap-4">
//             {items.map((item, index) => (
//               <motion.div
//                 key={item.title || index}
//                 initial={{ opacity: 0, y: 18 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{
//                   duration: 0.4,
//                   ease: "easeOut",
//                   delay: index * 0.04,
//                 }}
//               >
//                 <Card padding="lg" radius="xl" shadow="sm">
//                   <div className="flex flex-col gap-2">
//                     {item.title && (
//                       <h3 className="text-[1.25rem] font-bold leading-[1.3] text-[var(--color-primary)]">
//                         {item.title}
//                       </h3>
//                     )}

//                     {item.description && (
//                       <p className="text-[1rem] leading-[1.75] text-[var(--color-text-soft)]">
//                         {item.description}
//                       </p>
//                     )}
//                   </div>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default ContentList;

"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/content/Card";
import {
  resolveTone,
  getToneCssColor,
  resolveTypography,
  getTitleSizeCssValue,
  getDescriptionSizeCssValue,
} from "@/lib/sections/sectionStyle";

const surfaceClasses = {
  base: "bg-[var(--color-bg)] text-[var(--color-text)]",
  subtle: "bg-[var(--color-bg-soft)] text-[var(--color-text)]",
  strong: "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]",
};

const gradientClasses = {
  brand: "gradient-dark",
  dark: "gradient-dark",
  soft: "gradient-soft",
  accent: "gradient-accent",
};

const containerClasses = {
  content:
    "mx-auto w-full max-w-[var(--container-width-content)] px-[var(--container-padding)]",
  section:
    "mx-auto w-full max-w-[var(--container-width)] px-[var(--container-padding)]",
  wide:
    "mx-auto w-full max-w-[var(--container-width-wide)] px-[var(--container-padding)]",
};

const spacingClasses = {
  compact: "py-[var(--section-spacing-compact)]",
  default: "py-[var(--section-spacing)]",
  hero: "py-[var(--section-spacing-hero)]",
};

function getBackgroundClasses(surface, background) {
  if (background?.type === "gradient") {
    return gradientClasses[background.variant] || gradientClasses.brand;
  }

  if (background?.type === "image") {
    return "relative overflow-hidden text-[var(--color-text-inverse)]";
  }

  return surfaceClasses[surface] || surfaceClasses.base;
}

export function ContentList({ data }) {
  if (!data || !data.enabled) return null;

  const {
    id,
    surface = "base",
    containerWidth = "content",
    spacing = "default",
    background = { type: "surface", variant: null },
    content = {},
    media = {},
    items = [],
    meta = {},
  } = data;

  const backgroundImage = media?.background?.src;
  const isImageBackground = background?.type === "image" && backgroundImage;

  const overlayEnabled = meta?.overlay ?? media?.background?.overlay ?? true;
  const overlayOpacity = meta?.overlayOpacity ?? 0.7;
  const tone = resolveTone(data, { hasImage: isImageBackground });
  const { titleSize, descriptionSize } = resolveTypography(data);

  return (
    <section
      id={id}
      className={[
        getBackgroundClasses(surface, background),
        spacingClasses[spacing] || spacingClasses.default,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isImageBackground ? (
        <>
          <img
            src={backgroundImage}
            alt={media?.background?.alt || ""}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {overlayEnabled ? (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
              aria-hidden="true"
            />
          ) : null}
        </>
      ) : null}

      <div
        className={[
          containerClasses[containerWidth] || containerClasses.content,
          "relative z-10 flex flex-col gap-8",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex flex-col gap-4">
          {content.eyebrow ? (
            <span
              className="section-eyebrow"
              style={{ "--section-eyebrow-color": getToneCssColor(tone, "eyebrow") }}
            >
              {content.eyebrow}
            </span>
          ) : null}

          {content.title ? (
            <h2
              className="section-title"
              style={{
                "--section-title-color": getToneCssColor(tone, "title"),
                "--section-title-size": getTitleSizeCssValue(titleSize),
              }}
            >
              {content.title}
            </h2>
          ) : null}

          {content.description ? (
            <p
              className="section-description"
              style={{
                "--section-description-color": getToneCssColor(tone, "description"),
                "--section-description-size": getDescriptionSizeCssValue(descriptionSize),
              }}
            >
              {content.description}
            </p>
          ) : null}
        </div>

        {items.length > 0 ? (
          <div className="flex flex-col gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item.title || index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.04,
                }}
              >
                <Card padding="lg" radius="xl" shadow="sm">
                  <div className="flex flex-col gap-2">
                    {item.title ? (
                      <h3 className="text-[1.25rem] font-bold leading-[1.3] text-[var(--color-primary)]">
                        {item.title}
                      </h3>
                    ) : null}

                    {item.description ? (
                      <p className="text-[1rem] leading-[1.75] text-[var(--color-text-soft)]">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default ContentList;