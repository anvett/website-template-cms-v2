"use client";

import React from "react";

const sizeClasses = {
  sm: {
    wrapperGap: "gap-2",
    contentGap: "gap-1",
    iconWrap: "size-8",
    iconSize: "size-4",
    title: "text-body-sm font-bold",
    text: "text-body-sm",
  },
  md: {
    wrapperGap: "gap-3",
    contentGap: "gap-1.5",
    iconWrap: "size-10",
    iconSize: "size-5",
    title: "text-body-lg font-bold",
    text: "text-body",
  },
  lg: {
    wrapperGap: "gap-4",
    contentGap: "gap-2",
    iconWrap: "size-12",
    iconSize: "size-6",
    title: "text-h1 font-bold",
    text: "text-body-lg",
  },
};

const directionClasses = {
  vertical: "flex-col",
  horizontal: "flex-row",
};

const toneClasses = {
  default: {
    title: "text-[var(--color-text)]",
    text: "text-[var(--color-text-soft)]",
    iconWrap:
      "bg-[var(--color-bg-soft)] text-[var(--color-primary)] border border-[var(--color-border)]",
  },
  strong: {
    title: "text-[var(--color-text-inverse)]",
    text: "text-white/80",
    iconWrap: "bg-white/10 text-[var(--color-accent)] border border-white/10",
  },
  accent: {
    title: "text-[var(--color-text)]",
    text: "text-[var(--color-text-soft)]",
    iconWrap:
      "bg-[var(--color-accent)]/15 text-[var(--color-primary)] border border-[var(--color-accent)]/25",
  },
};

function renderIcon(icon, className) {
  if (!icon) return null;

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: [icon.props.className, className].filter(Boolean).join(" "),
    });
  }

  const Icon = icon;

  const isComponentLike =
    typeof Icon === "function" ||
    (typeof Icon === "object" && Icon !== null && "$$typeof" in Icon);

  if (isComponentLike) {
    return <Icon className={className} aria-hidden="true" />;
  }

  return <span className={className}>{icon}</span>;
}

/**
 * InfoItem UI Base
 *
 * Componente reutilizable para mostrar información breve con icono,
 * título y descripción.
 *
 * Usos comunes:
 * - beneficios
 * - datos de contacto
 * - features
 * - listas informativas
 * - pasos de proceso
 *
 * Depende de:
 * - Tailwind CSS
 * - variables globales de globals.css
 *
 * Props principales:
 * - icon
 * - showIcon
 * - title
 * - text
 * - description
 * - align
 * - direction
 * - size
 * - tone
 * - className
 *
 * Reglas:
 * - No hardcodear colores.
 * - No usar tokens legacy.
 * - No convertirlo en Card ni en section.
 * - Usar medidas explícitas para tamaños de texto.
 */

export default function InfoItem({
  icon = null,
  showIcon = true,
  title,
  text,
  description,
  align = "left",
  direction = "vertical",
  size = "md",
  tone = "default",
  className = "",
}) {
  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentTone = toneClasses[tone] || toneClasses.default;
  const isHorizontal = direction === "horizontal";
  const isCentered = align === "center";
  const finalText = text || description;

  return (
    <div
      className={[
        "flex min-w-0",
        directionClasses[direction] || directionClasses.vertical,
        isHorizontal
          ? "items-start"
          : isCentered
            ? "items-center text-center"
            : "items-start text-left",
        isHorizontal ? "gap-3" : currentSize.wrapperGap,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcon && icon ? (
        <div
          className={[
            "flex shrink-0 items-center justify-center rounded-[var(--radius-pill)]",
            currentSize.iconWrap,
            currentTone.iconWrap,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {renderIcon(icon, currentSize.iconSize)}
        </div>
      ) : null}

      <div
        className={[
          "flex min-w-0 flex-col",
          currentSize.contentGap,
          isCentered ? "items-center text-center" : "items-start text-left",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {title ? (
          <h3 className={[currentSize.title, currentTone.title].join(" ")}>
            {title}
          </h3>
        ) : null}

        {finalText ? (
          <p className={[currentSize.text, currentTone.text].join(" ")}>
            {finalText}
          </p>
        ) : null}
      </div>
    </div>
  );
}