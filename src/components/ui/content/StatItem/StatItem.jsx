"use client";

import React from "react";

const sizeClasses = {
  sm: {
    wrapper: "gap-2",
    iconWrap: "size-9",
    iconSize: "size-4",
    value: "text-[1.75rem]",
    label: "text-[0.95rem]",
    description: "text-[0.875rem]",
  },
  md: {
    wrapper: "gap-3",
    iconWrap: "size-11",
    iconSize: "size-5",
    value: "text-[2.25rem]",
    label: "text-[1rem]",
    description: "text-[0.95rem]",
  },
  lg: {
    wrapper: "gap-4",
    iconWrap: "size-13",
    iconSize: "size-6",
    value: "text-[2.75rem]",
    label: "text-[1.125rem]",
    description: "text-[1rem]",
  },
};

const toneClasses = {
  default: {
    value: "text-[var(--color-primary)]",
    label: "text-[var(--color-text)]",
    description: "text-[var(--color-text-soft)]",
    iconWrap:
      "bg-[var(--color-bg-soft)] text-[var(--color-primary)] border border-[var(--color-border)]",
  },
  strong: {
    value: "text-[var(--color-accent)]",
    label: "text-[var(--color-text-inverse)]",
    description: "text-[var(--color-text-inverse)]/75",
    iconWrap: "bg-white/10 text-[var(--color-accent)] border border-white/10",
  },
  accent: {
    value: "text-[var(--color-accent)]",
    label: "text-[var(--color-text)]",
    description: "text-[var(--color-text-soft)]",
    iconWrap:
      "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/25",
  },
};

const alignClasses = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

function renderIcon(icon, className) {
  if (!icon) return null;

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: [icon.props.className, className].filter(Boolean).join(" "),
    });
  }

  const Icon = icon;

  if (typeof Icon === "function") {
    return <Icon className={className} aria-hidden="true" />;
  }

  return <span className={className}>{icon}</span>;
}

/**
 * StatItem UI Base
 *
 * Componente reutilizable para mostrar métricas, indicadores,
 * resultados o datos destacados dentro de sections como Stats,
 * Hero, About, Services o CTA.
 *
 * Depende de variables globales definidas en globals.css.
 *
 * Tones:
 * - default
 * - strong
 * - accent
 *
 * Sizes:
 * - sm
 * - md
 * - lg
 *
 * Reglas:
 * - No hardcodear colores aquí.
 * - No usar tokens legacy como --color-brand-primary.
 * - No usar clases tipográficas genéricas tipo text-xl.
 * - Usar medidas explícitas o variables globales.
 */
export default function StatItem({
  icon = null,
  showIcon = false,
  value,
  label,
  description,
  suffix = "",
  prefix = "",
  align = "center",
  size = "md",
  tone = "default",
  className = "",
}) {
  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentTone = toneClasses[tone] || toneClasses.default;

  if (!value && !label && !description) return null;

  return (
    <div
      className={[
        "flex min-w-0 flex-col",
        currentSize.wrapper,
        alignClasses[align] || alignClasses.center,
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

      {value ? (
        <p
          className={[
            "font-bold leading-none tracking-[-0.04em]",
            currentSize.value,
            currentTone.value,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {prefix}
          {value}
          {suffix}
        </p>
      ) : null}

      {label ? (
        <p
          className={[
            "font-bold leading-[1.35]",
            currentSize.label,
            currentTone.label,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </p>
      ) : null}

      {description ? (
        <p
          className={[
            "leading-[1.65]",
            currentSize.description,
            currentTone.description,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}